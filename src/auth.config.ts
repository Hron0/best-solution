import {getUserByEmail, getUserById, getUserByLogin} from "@/lib/data/user";
import { LoginSchema } from "@/schemas";
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [Credentials({
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (validatedFields.success) {
                const { login, password } = validatedFields.data;

                const user = await getUserByLogin(login)
                if (!user || !user.password) {
                    console.log("NO user LoL!!")
                    return null
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                )

                if (passwordMatch) return user
            }

            return null
        },
    })],
    callbacks: {
        async session({ token, session, user }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as "USER" | "ADMIN";
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token

            token.role = existingUser.role

            return token
        }
    },
} satisfies NextAuthConfig