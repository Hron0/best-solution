"use server"

import {postSchema} from "@/schemas";
import {put} from "@vercel/blob";
import {db} from "@/backend/db";
import {Files, Posts} from "@/backend/db/schema";
import {revalidatePath} from "next/cache";

export const CreatePost = async (values: FormData) => {
    const heading = values.get("heading") as string
    const image = values.get("image") as File
    const text = values.get("text") as string
    const files = values.getAll("files") as File[]

    const validatedFields = postSchema.safeParse({
        heading,
        image: image instanceof File ? image : undefined,
        text,
        files: files instanceof File ? files : undefined
    })


    if (validatedFields.success) {
        try {
            let imgUrl = ""
            if (image && image.size > 0) {
                const {url} = await put(image.name, image, {access: "public"})
                imgUrl = url
            }
            const [Post] = await db.insert(Posts).values({heading, text, imgUrl}).returning()

            const filePromises = files.map(async (file) => {
                if (file.size > 0) {
                    const {url} = await put(file.name, file, {access: "public"})
                    return db.insert(Files).values({
                        postId: Post.id,
                        fileUrl: url,
                        fileName: file.name,
                    })
                }
            })

            await Promise.all(filePromises)
            revalidatePath("/blog")
            return {success: "Пост успешно создан, вы будете перенаправлены на страницу постов через секунду..."}
        } catch (e) {
            const currentTime = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            console.error(`ERROR CREATING POST ON ${currentTime} : `, e)
            return {error: "Что-то пошло не так..."}
        }
    } else {
        return {error: "Неверные значения полей."}
    }
}
