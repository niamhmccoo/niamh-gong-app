import { DATABASE_URL } from '../constants';
import type { User } from '../types';

const POISON_ARRAY = [156, 33, 64, 137, 105, 107, 7, 7, 126, 68, 14, 219, 130, 224, 73, 226, 127, 240, 166, 172, 223, 76, 217, 16, 219, 114, 221, 237, 198, 119, 112, 172];

function make32(inputString: string): number[] {
    const targetLength = 32;
    let resultString = "";
    while (resultString.length < targetLength) {
        resultString += inputString;
    }
    resultString = resultString.substring(0, targetLength);
    return Array.from(resultString, (char) => char.charCodeAt(0));
}

function encode(email: string, password: string): string {
    const emailChars = make32(email);
    const passwordChars = make32(password);
    let encodedResult = "";
    for (let i = 0; i < 32; ++i) {
        const index = (emailChars[i] ^ passwordChars[i]) & 0xff;
        const value = POISON_ARRAY[index];
        encodedResult += value.toString(16).padStart(2, "0").toUpperCase();
    }
    return encodedResult;
}

export const loginUser = async (email: string, password: string): Promise<User | null> => {
    // 1. Encode the password
    const secret = encode(email, password);
    
    // 2. Fetch users from the database
    try {
        const response = await fetch(DATABASE_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch database');
        }

        const data = await response.json();
        
        // 3. Find user with matching email and encoded password
        const loggedInUser = Object.values(data.users).find((user: any) => data.secrets[user.id] === secret);

        return loggedInUser as User || null

    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}