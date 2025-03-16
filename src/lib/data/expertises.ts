'use server'
import {ExpertiseSchema} from "@/schemas";
import {z} from "zod";
import {db} from "@/backend/db";
import {ExpertiseDoc, Expertises, Files} from "@/backend/db/schema";
import {revalidatePath} from "next/cache";
import {put} from "@vercel/blob";

export const CreateExpertise = async (values: FormData) => {
    const title = values.get("title") as string
    const name = values.get("name") as string
    const against = values.get("against") as string
    const casee = values.get("case") as string
    const city = values.get("city") as string
    const address = values.get("address") as string
    const questions = values.get("questions") as string
    const types = values.get("types") as string
    const files = values.getAll("file") as File[]

    const validatedFiled = ExpertiseSchema.safeParse({
        title,
        name,
        against,
        case: casee,
        city,
        address,
        questions,
        types,
        file: files instanceof File ? files : undefined,
    })

    if (!validatedFiled.success) {
        return { error: 'Ошибка валидации. Пожалуйста, проверьте введенные данные.' }
    }

    if (validatedFiled.success) {
        try {
            const [Expertise] = await db.insert(Expertises).values({title, name, against, case: casee, city, address, questions, types}).returning()

            const filePromises = files.map(async (file) => {
                if (file.size > 0) {
                    const {url} = await put(file.name, file, {access: "public"})
                    return db.insert(ExpertiseDoc).values({
                        expertiseId: Expertise.id,
                        fileUrl: url,
                        fileName: file.name,
                    })
                }
            })

            await Promise.all(filePromises)

            revalidatePath('/expertises')
            revalidatePath(`/expertises/${Expertise.id}`)

            return {
                success: "Экспертиза успешно создана, вы будуте перенаправлены на страницу через секунду..."
            }
        } catch (e) {
            const currentTime = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            console.error(`ERROR CREATING EXPERTISE ON ${currentTime} : `, e)
            return {error: `Непредвиденная ошибка... ${e}`}
        }
    } else {
        return {error: "Неверные значения полей."}
    }

}