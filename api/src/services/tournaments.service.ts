
import * as tournamentsModel from '../models/tournaments.model';

export const fetchExample = async () => {
    return await tournamentsModel.findTournanments()
};