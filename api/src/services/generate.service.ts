import * as generateModel from './../models/generate.model';

export async function generate(tournamentId: number) {
    // ── 1. Cargar torneo ────────────────────────────────────────────────────────
    const tournament = await generateModel.findTournament(tournamentId);
    if (!tournament) {
        // const err = new Error('Torneo no encontrado');
        // err.statusCode = 404;
        // throw err;
        return false
    }

    if (tournament.status !== 'registration' && tournament.status !== 'draft') {
        // const err = new Error(`No se puede generar un torneo con status '${tournament.status}'. Debe estar en 'draft' o 'registration'`);
        // err.statusCode = 409;
        // throw err;
        return false
    }

    // Evitar regenerar si ya tiene rondas
    const existingRounds = await generateModel.countRounds(tournamentId);
    if (existingRounds > 0) {
        // const err = new Error('Este torneo ya tiene rondas generadas. Elimínalas antes de regenerar');
        // err.statusCode = 409;
        // throw err;
        return false
    }

    // ── 2. Cargar equipos inscritos ordenados por seed ──────────────────────────
    const teams = await generateModel.findTeams(tournamentId);
    if (teams.length < 2) {
        // const err = new Error('Se necesitan al menos 2 equipos inscritos para generar el torneo');
        // err.statusCode = 409;
        // throw err;
        return false
    }

    // ── 3. Generar bracket ──────────────────────────────────────────────────────
    const resultado = await generarBracket(tournamentId, teams);

    // ── 4. Cambiar status del torneo a in_progress ──────────────────────────────
    await generateModel.updateTournamentStatus(tournamentId, 'in_progress');

    return {
        tournament_id: Number(tournamentId),
        equipos: teams.length,
        ...resultado,
    };
}

// ─── GENERADOR DE BRACKET ────────────────────────────────────────────────────

async function generarBracket(tournamentId: number, teams: any) {
    const numEquipos = teams.length;

    // Calcular la siguiente potencia de 2 y cuántos BYEs se necesitan
    let bracketSize = 2;
    while (bracketSize < numEquipos) bracketSize *= 2;
    const numByes = bracketSize - numEquipos;

    // Calcular cuántas rondas totales habrá
    const totalRondas = Math.log2(bracketSize);
    const nombresRondas = generarNombresRondas(totalRondas);

    // ── Crear TODAS las rondas desde el inicio ──────────────────────────────────
    // La primera queda in_progress, las siguientes pending
    const rondas = [];
    for (let i = 0; i < totalRondas; i++) {
        const roundId = await generateModel.insertRound(tournamentId, {
            name: nombresRondas[i],
            round_order: i + 1,
            type: 'bracket',
            status: i === 0 ? 'in_progress' : 'pending',
        });
        rondas.push({ id: roundId, name: nombresRondas[i], round_order: i + 1 });
    }

    const roundId = rondas[0].id;

    // ── Armar slots: los mejores seeds reciben BYE ──────────────────────────────
    // teams ya viene ordenado por seed ASC (seed 1 = mejor)
    // Los primeros numByes equipos reciben BYE
    const slotsConBye = teams.slice(0, numByes);
    const slotsConPartido = teams.slice(numByes);

    // ── Crear partidos BYE como finished automáticamente ───────────────────────
    const byesRegistrados = [];
    for (const team of slotsConBye) {
        await generateModel.registerBye(tournamentId, team.team_id);
        byesRegistrados.push({
            team: team.team_name,
            team_id: team.team_id,
            seed: team.seed,
            pasa_a: rondas[1]?.name || 'Siguiente ronda',
        });
    }

    // ── Crear partidos reales: mejor seed vs peor seed ──────────────────────────
    const partidos = [];
    const mitad = slotsConPartido.length / 2;

    for (let i = 0; i < mitad; i++) {
        const home = slotsConPartido[i];
        const away = slotsConPartido[slotsConPartido.length - 1 - i];

        const matchId = await generateModel.insertMatch(tournamentId, {
            round_id: roundId,
            home_team_id: home.team_id,
            away_team_id: away.team_id,
        });

        partidos.push({
            match_id: matchId,
            ronda: rondas[0].name,
            home_team: home.team_name,
            away_team: away.team_name,
        });
    }

    // ── Inicializar standings en 0 para todos ──────────────────────────────────
    for (const team of teams) {
        await generateModel.initStanding(tournamentId, null, team.team_id);
    }

    return {
        bracket_size: bracketSize,
        byes: numByes,
        rondas_creadas: rondas.length,
        partidos_creados: partidos.length + byesRegistrados.length,
        rondas,
        partidos,
        pases_directos: byesRegistrados,
        nota: numByes > 0
            ? `${numByes} equipo(s) con BYE pasan directo a ${rondas[1]?.name || 'la siguiente ronda'}`
            : 'Bracket perfecto — sin BYEs necesarios',
    };
}

// ─── Nombres de rondas según el total ───────────────────────────────────────

function generarNombresRondas(total: number) {
    const nombres = [
        'Final',
        'Semifinales',
        'Cuartos de Final',
        'Octavos de Final',
        'Dieciseisavos de Final',
    ];
    const resultado = [];
    for (let i = 0; i < total; i++) {
        resultado.unshift(nombres[i] || `Ronda ${total - i}`);
    }
    return resultado;
}

module.exports = { generate };