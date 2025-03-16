"use client"
import {useEffect, useState} from "react"
import {useInView} from "react-intersection-observer"
import {useGetBlogs} from "@/lib/hooks/useBlog"
import {SearchBar} from "@/app/(pages)/blog/FilterBar"
import PostComponent from "@/app/(pages)/blog/PostComponent"
import {useUpdatedSession} from "@/lib/hooks/useUpdateSession"
import Link from "next/link"
import {Plus} from "lucide-react"
import {isEmptyArray} from "is-what"
import {BlogSkeleton} from "@/components/shared/skeletons/BlogSkeleton";

type Filters = {
    search: string
    startDate: string | undefined
    endDate: string | undefined
}

export default function Page() {
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState<Filters>({search: "", startDate: undefined, endDate: undefined})
    const [allPosts, setAllPosts] = useState<any[]>([])

    const {session, status} = useUpdatedSession()

    const {ref, inView} = useInView()

    const {data: newPosts, isLoading, isFetching, refetch} = useGetBlogs(page, filters)

    const handleFilterChange = (search: string, startDate?: string, endDate?: string) => {
        setFilters({search, startDate, endDate})
        setPage(1)
        setAllPosts([])
    }

    useEffect(() => {
        if (newPosts) {
            setAllPosts((prev) => [...prev, ...newPosts])
        }
    }, [newPosts])

    useEffect(() => {
        if (inView && !isLoading && !isFetching && newPosts?.length === 10) {
            setPage((prevPage) => prevPage + 1)
        }
    }, [inView, isLoading, isFetching, newPosts])

    useEffect(() => {
        void refetch()
    }, [refetch])

    return (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center lg:mt-64 mt-10 lg:mb-10 container">
            <div className="relative flex flex-row items-center w-full justify-center px-3 gap-2 md:gap-3 lg:gap-6">
                <SearchBar
                    onSearch={handleFilterChange}
                    initialSearch={filters.search}
                    initialStartDate={filters.startDate}
                    initialEndDate={filters.endDate}
                />

                {session?.user?.role === "ADMIN" && (
                    <Link href="/blog/create" className="self-end">
                        <div
                            className="group relative overflow-hidden bg-white rounded-full border w-9 h-9 transition-all duration-300 hover:border-primary hover:shadow-md">
                            <div className="flex items-center justify-center w-full h-full">
                                <Plus
                                    className="transition-transform duration-300 group-hover:rotate-90 group-hover:text-primary"/>
                            </div>
                            <div
                                className="absolute inset-0 bg-primary/10 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"/>
                        </div>
                    </Link>
                )}
            </div>

            <div className="flex flex-col items-center gap-8 text-white w-full container mx-2 mb-6">
                {isLoading ? (
                    <BlogSkeleton />
                ) : isEmptyArray(allPosts) ? (
                    <p className="text-black text-center py-4">Нет результатов поиска.</p>
                ) : (
                    <>
                        {allPosts.map((item, index) => (
                            <PostComponent data={item} key={`post-${item.id}-${index}`}/>
                        ))}

                        {isFetching && (
                            <div className="w-[98%] mx-2 my-4">
                                <BlogSkeleton />
                            </div>
                        )}
                        <div ref={ref} className="h-10"/>
                    </>
                )}
            </div>
        </div>
    )
}

