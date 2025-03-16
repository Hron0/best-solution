import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FileText, MoreVertical} from "lucide-react";
import Image from "next/image";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useDeletePost} from "@/lib/hooks/useBlog";
import {useUpdatedSession} from "@/lib/hooks/useUpdateSession";
import Link from "next/link";

interface Post {
    id: number
    heading: string
    text: string
    imgUrl?: string
    createdAt: string
    files?: Array<{
        id: number
        fileUrl: string
        fileName: string
    }>
}

const MyComponent = ({data}: { data: Post }) => {
    const {session} = useUpdatedSession()

    const deleteMutation = useDeletePost(data.id)

    const handleDelete = () => {
        if (window.confirm(`Вы уверены что хоитите удалить запись: ${data.heading}`)) {
            deleteMutation.mutate()
        }
    }


    return (
        <Card className="w-[98%] relative mx-2">
            <CardHeader>
                <div className={'flex items-center justify-between'}>
                    <CardTitle className={'lg:text-2xl'}>{data.heading}</CardTitle>
                    { session?.user?.role === "ADMIN" &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4"/>
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link href={`/blog/edit/${data.id}`}>Редактировать запись</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                                Удалить запись
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    }
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.imgUrl && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
                        <Image src={data.imgUrl || "/placeholder.svg"} alt={data.heading} fill className="object-cover"
                               priority/>
                    </div>
                )}
                <div className="space-y-4 text-black text-wrap break-words lg:text-xl">
                    {data.text.split("\n").map((paragraph: string, index: number) => (
                        <h2 key={index} className={'indent-4 lg:indent-12'}>{paragraph}</h2>
                    ))}
                </div>
                {data.files && data.files.length > 0 && (
                    <div className="space-y-2 pt-4 border-t">
                        {data.files.map((file: any, index: number) => (
                            <Button key={index} variant="outline" className="w-full justify-start gap-2" asChild>
                                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                                    <FileText className="h-5 w-5"/>
                                    {file.fileName}
                                </a>
                            </Button>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MyComponent;
