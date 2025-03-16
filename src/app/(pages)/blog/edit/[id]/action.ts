"use server"

import {del, put} from "@vercel/blob";
import {postSchema} from "@/schemas";
import {db} from "@/backend/db";
import {eq} from "drizzle-orm";
import {Posts, Files} from "@/backend/db/schema";
import {revalidatePath} from "next/cache";

export const UpdatePost = async (postId: number, values: FormData) => {
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
            const existingPost = await db.query.Posts.findFirst({
                where: eq(Posts.id, postId),
                with: {
                    files: true,
                },
            })

            if (!existingPost) {
                return {error: "Пост не найден."}
            }

            let imgUrl = existingPost.imgUrl
            if (image instanceof File) {
                if (existingPost.imgUrl) {
                    await del(existingPost.imgUrl)
                }
                const {url} = await put(image.name, image, {access: "public"})
                imgUrl = url
            } else if (image === null) {
                if (existingPost.imgUrl) {
                    await del(existingPost.imgUrl)
                }
                imgUrl = null
            }

            await db.update(Posts).set({heading, text, imgUrl}).where(eq(Posts.id, postId))

            const existingFiles = existingPost.files || []

            if (files && Array.isArray(files)) {
                const newFileNames = files.map((file) => file.name)

                for (const existingFile of existingFiles) {
                    //@ts-ignore
                    if (!newFileNames.includes(existingFile.fileName)) {
                        //@ts-ignore
                        await del(existingFile.fileUrl)
                        await db.delete(Files).where(eq(Files.id, existingFile.id))
                    }
                }

                const filePromises = files.map(async (file) => {
                    if (!existingFiles.some((ef) => ef.fileName === file.name)) {
                        const {url} = await put(file.name, file, {access: "public"})
                        return db.insert(Files).values({
                            postId: postId,
                            fileUrl: url,
                            fileName: file.name,
                        })
                    }
                })

                await Promise.all(filePromises)
            }

            revalidatePath("/blog")
            return {success: "Пост успешно обновлен, вы будете перенаправлены на страницу постов через секунду..."}

        } catch (e) {
            const currentTime = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            console.error(`ERROR EDITING POST ON ${currentTime} : `, e)
            return {error: "Что-то пошло не так..."}
        }
    }
}