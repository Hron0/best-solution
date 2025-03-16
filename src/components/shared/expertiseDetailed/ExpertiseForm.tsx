"use client"
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ExpertiseSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormError,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormSuccess,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {CreateExpertise} from "@/lib/data/expertises";
import CardWrapper from "../cardWrapperComps/CardWrapper";
import {useRouter} from 'next/navigation'
import {toast} from "sonner"
import {TextFieldArea} from "@/components/extras/text-area";
import {FileUpload} from "@/app/(pages)/blog/create/FileUpload";

export default function ExpertiseForm() {
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [file, setFile] = useState<File[]>([])

    const router = useRouter()

    const form = useForm<z.infer<typeof ExpertiseSchema>>({
        resolver: zodResolver(ExpertiseSchema),
        defaultValues: {
            title: "",
            name: "",
            against: "",
            case: "",
            city: "",
            address: "",
            questions: "",
            types: "",
            file: [],
        }
    })

    const handleCreateExpertise = (values: z.infer<typeof ExpertiseSchema>) => {
        setError("")

        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("name", values.name)
        formData.append("against", values.against)
        formData.append("case", values.case)
        formData.append("city", values.city)
        formData.append("address", values.address)
        formData.append("questions", values.questions)
        formData.append("types", values.types)

        file.forEach((file: File) => formData.append("file", file, encodeURI(file.name)))

        startTransition(() => {
            CreateExpertise(formData)
                .then((data) => {
                    setError(data?.error)
                    if (data.success) {
                        toast.success(data?.success)
                        setTimeout(() => {
                            router.push('/expertises')
                        }, 1200)
                    }
                    if (data.error) toast.error(data?.error)
                })

        })
    }


    return (
        <CardWrapper label="Создание экспертизы" backBtn={false}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateExpertise)}
                      className="space-y-6">
                    <div className={'space-y-4'}>
                        <FormField
                            name={"title"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Название экспертизы</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Экспертиза "
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/> <FormField
                        name={"name"}
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Контрагент</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Иванов Иван Иванович"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField
                            name={"against"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Против кого</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="АО Банк1"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name={"case"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Номер</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="00000000-12345678"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name={"city"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Город</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Москва"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name={"address"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Адрес</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Московская область, Москва, г. Москва"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name={"questions"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Вопросы на экспертизу</FormLabel>
                                    <FormControl>
                                        <TextFieldArea
                                            {...field}
                                            placeholder="Вопрос1, текст текст. Вопрос2 текст."
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name={"types"}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Вид экспертизы</FormLabel>
                                    <FormControl>
                                        <TextFieldArea
                                            {...field}
                                            placeholder="Вид1, вид2, ..."
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name={"file"}
                            control={form.control}
                            render={({field: {value, onChange, ...field}}) => (
                                <FormItem>
                                    <FormLabel>Документ</FormLabel>
                                    <FormControl>
                                        <FileUpload files={file} setFiles={setFile} single />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </div>
                    <FormError message={error}/>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        Создать экспертизу
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};