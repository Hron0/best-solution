import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";

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


export const useGetBlogs = (page: number, filters?: { search?: string; startDate?: string; endDate?: string }) => {
    return useQuery<Post[]>({
        queryKey: ["Posts", page, filters],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: page.toString(),
                ...(filters?.search && { search: filters.search }),
                ...(filters?.startDate && { startDate: filters.startDate }),
                ...(filters?.endDate && { endDate: filters.endDate }),
            })
            const res = await fetch(`/api/blog/posts?${params.toString()}`)
            if (!res.ok) {
                throw new Error("Network response was not ok")
            }
            return res.json()
        },
        select: (data) => {
            return data.map((post) => ({
                ...post,
                files: post.files?.map((file) => ({
                    ...file,
                    fileName: decodeURI(file.fileName),
                })),
            }))
        },
    })
}

export const getPost = async (id: string) => {
    const res = await fetch(`/api/blog/get/${id}`, {
        method: "GET"
    })
    return res.json()
}

export const useDeletePost = (id: number) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`/api/blog/delete/${id}`, {
                method: "DELETE",
            })
            if (!response.ok) throw new Error("Failed to delete post")
            return response.json()
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["Posts", 1] })
            toast.success("Запись удалена")
        },
        onError: () => {
            toast.error("Что-то пошло не так...")
        },
    })
}