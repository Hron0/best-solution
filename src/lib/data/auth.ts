'use server'
import {db} from "@/backend/db";
import {DEFAULT_LOGIN_REDIRECT} from "../../../routes";
import {LoginSchema, RegisterSchema} from "@/schemas";
import {eq} from 'drizzle-orm';
import {AuthError} from 'next-auth';
import {z} from 'zod';
import {auth, signIn} from "@/auth";
import {user} from "@/backend/db/schema";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";


export const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedField = LoginSchema.safeParse(values)

    if (validatedField.success) {
        const {login, password} = validatedField.data;
        try {
            await signIn("credentials", {
                login,
                password,
                redirect: true,
                redirectTo: DEFAULT_LOGIN_REDIRECT,
            })
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return {error: "Неверные данные"}
                    default:
                        return {error: "Something went wrong"}
                }
            }

            throw error
        }
    }

    return {error: "Invalid data"}
}

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (validatedFields.success) {
        const {login, email, password} = validatedFields.data;
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await db.query.user.findFirst({
            where: eq(user.email, email)
        })

        if (existingUser) {
            return {error: "Email is already taken. Try different one or Login into your account."}
        }

        type NewUser = typeof user.$inferInsert

        await db.insert(user).values({
            login: login,
            email: email,
            password: hashedPassword
        })


        return {success: "User created successfully, now Log into your account, you will be redirected in a second."}
    }
    return {error: "Invalid data"}
}


export const getServerSession = async () => {
    const session = await auth()

    return session
}