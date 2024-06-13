import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from './lib/definitions';
import { db } from '@/drizzle/db';
import { users } from './drizzle/schema';
import { eq} from 'drizzle-orm';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
        
        return user[0]
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(5) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    if (password === user.password) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});