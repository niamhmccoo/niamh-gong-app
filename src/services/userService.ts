import type { User } from '../types';
import { DATABASE_URL } from '../constants';

export const fetchAllUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${DATABASE_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}