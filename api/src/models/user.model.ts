import { pool } from '../db/connection';
import { RowDataPacket } from 'mysql2/promise';
import { User } from '../types/Users.interface';

export const findUsers = async (): Promise<User[]> => {
    const [rows] = await pool.query<any>('SELECT * FROM users');
    return rows;
};

export const findUser = async (id: number): Promise<User> => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users where id = ?', [id]);
    if (rows.length === 0) {
        return {} as User;
    }

    return rows[0] as User;
}
