"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {postSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormError,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {CreatePost} from "@/app/(pages)/blog/create/action";
import {Button} from "@/components/ui/button";
import {TextFieldArea} from "@/components/extras/text-area";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {InteractiveImageInput} from "@/app/(pages)/blog/create/InputWithPreview";
import {FileUpload} from "@/app/(pages)/blog/create/FileUpload";

export default function Page() {
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [files, setFiles] = useState<File[]>([])

    const router = useRouter()

    // @ts-ignore
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            heading: "",
            image: undefined,
            text: "",
            files: [],
        }
    })

    const handleLogin = (values: any) => {
        setError("")
        const formData = new FormData()

        formData.append("heading", values.heading)
        formData.append("text", values.text)
        formData.append("image", values.image)

        files.forEach((file: File) => formData.append("files", file, encodeURI(file.name)))
        startTransition(() => {
            CreatePost(formData)
                .then((data) => {
                    setError(data?.error)
                    if (data.success) {
                        toast.success(data?.success)
                        setTimeout(() => {
                            router.push('/blog')
                        }, 1200)
                    }
                    if (data.error) toast.error(data?.error)
                })

        })
    }

    return (
        <div className={"lg:mt-64 mt-9 mb-4 flex flex-col items-center gap-2 w-full"}>
            <Card className="w-[95%] lg:w-[600px] shadow-md p-1">
                <CardHeader>
                    <CardTitle>
                        Создание поста.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleLogin)}
                            className="space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="heading"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Заголовок"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({field: {value, onChange, ...field}}) => (
                                        <FormItem>
                                            <FormControl>
                                                <InteractiveImageInput
                                                    onImageChange={(file) => onChange(file)} {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="text"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <TextFieldArea
                                                    {...field}
                                                    placeholder="Содержание"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="files"
                                    render={({field: {value, onChange, ...field}}) => (
                                        <FormItem>
                                            <FormLabel>Файлы</FormLabel>
                                            <FormControl>
                                                <FileUpload files={files} setFiles={setFiles}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error}/>
                            <Button type="submit" className="w-full" disabled={isPending}>
                                Создать
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
