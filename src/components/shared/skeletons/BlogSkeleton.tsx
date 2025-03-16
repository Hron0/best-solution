import {Skeleton} from "@/components/ui/skeleton";

function BlogSkeleton() {
    return (
        <>
            <Skeleton
                className="w-[98%] relative mx-2 rounded-xl border text-card-foreground shadow py-5 px-3 space-y-4">
                <Skeleton className={'flex flex-col space-y-1.5 p-4 w-1/4'}/>
                <Skeleton className={'p-2 pt-0 space-y-4 aspect-[12/5] w-full '}/>
                <Skeleton className={'w-1/3 h-5'}/>
                <Skeleton className={'w-1/6 h-5'}/>
                <Skeleton className={'w-full h-1'}/>
                <Skeleton className={'w-full h-5'}/>
            </Skeleton>
            <Skeleton
                className="w-[98%] relative mx-2 rounded-xl border text-card-foreground shadow py-5 px-3 space-y-4">
                <Skeleton className={'flex flex-col space-y-1.5 p-4 w-1/4'}/>
                <Skeleton className={'p-2 pt-0 space-y-4 aspect-[12/5] w-full '}/>
                <Skeleton className={'w-1/3 h-5'}/>
                <Skeleton className={'w-1/6 h-5'}/>
                <Skeleton className={'w-full h-1'}/>
                <Skeleton className={'w-full h-5'}/>
            </Skeleton>
        </>
    )
}

export {BlogSkeleton}

