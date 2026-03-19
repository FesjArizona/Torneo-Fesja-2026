import { pool } from '../db/connection';

export const findTournanments = async (): Promise<any> => {
    const [rows] = await pool.query<any>('SELECT * FROM users');
    return rows;

};
