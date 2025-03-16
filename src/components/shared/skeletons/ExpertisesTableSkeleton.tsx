import {Skeleton} from "@/components/ui/skeleton";
import * as React from "react";


export function ExpertisesTableSkeleton() {
    return (
        <div className={'w-full flex flex-col gap-3'}>
            <div className={'flex flex-row items-center justify-between'}>
                <div className="flex items-center">
                    <Skeleton className={'h-9 w-[400px] rounded-md px-3 py-1 shadow-sm '}/>
                </div>
                <Skeleton className={'h-9 w-[130px]'}/>
            </div>
            <div className="rounded-md border">
                <div className={'h-[615] py-2 px-2 flex flex-col gap-4'}>
                    <div className={'pb-2 w-full border-b border-gray-200 transition-colors'}>
                        <Skeleton className={'w-[140px] h-6'}/>
                    </div>
                    <div className={'w-full flex flex-col items-start gap-2'}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div className={'w-full flex flex-row gap-2 items-center'} key={index}>
                                <Skeleton className={'w-12 h-12'}/>
                                <Skeleton className={'h-7 w-[460px]'}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'w-full flex flex-row justify-end'}>
                <div className={'flex flex-row gap-4'}>
                    <Skeleton className={'h-9 w-[200px]'}/>
                    <Skeleton className={'h-9 w-[150px]'}/>
                </div>
            </div>
        </div>
    );
}