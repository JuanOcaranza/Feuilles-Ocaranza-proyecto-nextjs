import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import type { User } from '../definitions';


export async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
