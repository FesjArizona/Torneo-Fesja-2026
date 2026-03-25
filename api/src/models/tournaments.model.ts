import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../db/connection';
import { Tournament } from '../types/Tournaments.interface';

export async function findTournaments() {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT
      t.id,
      t.name,
      t.description,
      t.format,
      t.status,
      t.max_teams,
      t.start_date,
      t.end_date,
      t.location,
      t.created_at,
      s.id   AS sport_id,
      s.name AS sport_name,
      s.slug AS sport_slug
    FROM tournaments t
    JOIN sports s ON s.id = t.sport_id
    ORDER BY t.created_at DESC
  `);
  return rows;
}

// Trae un torneo por id con número de equipos inscritos
export async function findTournament(id: number) {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT
      t.id,
      t.name,
      t.description,
      t.format,
      t.status,
      t.max_teams,
      t.start_date,
      t.end_date,
      t.location,
      t.created_at,
      s.id   AS sport_id,
      s.name AS sport_name,
      s.slug AS sport_slug,
      COUNT(tt.team_id) AS teams_registered
    FROM tournaments t
    JOIN sports s ON s.id = t.sport_id
    LEFT JOIN tournament_teams tt
      ON tt.tournament_id = t.id AND tt.status = 'confirmed'
    WHERE t.id = ?
    GROUP BY t.id
  `, [id]);
  return rows[0] || null;
}

// Inserta un torneo nuevo y devuelve el id generado
export async function createTournament(data: Tournament) {
  const [result] = await pool.query<ResultSetHeader>(`
    INSERT INTO tournaments (sport_id, name, description, format, max_teams, start_date, end_date, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.sport_id,
    data.name,
    data.description || null,
    data.format,
    data.max_teams || 16,
    data.start_date || null,
    data.end_date || null,
    data.location || null,
  ]);
  return result.insertId;
}

// Actualiza solo los campos recibidos usando SET dinámico
export async function updateTournament(id: number, fields: any) {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  const set = keys.map(k => `${k} = ?`).join(', ');
  await pool.query(`UPDATE tournaments SET ${set} WHERE id = ?`, [...values, id]);
}

// Elimina un torneo por id
export async function deleteTournament(id: number) {
  await pool.query('DELETE FROM tournaments WHERE id = ?', [id]);
}