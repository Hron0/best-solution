import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export function ExpertiseSkel() {
    return (
        <section className={'container py-7 px-16 flex flex-row items-start gap-16 relative overflow-y-hidden'}>
            <div className={'w-[452px] relative'}>
                <AspectRatio ratio={9 / 16} className={""}>
                    <Skeleton className={'h-full w-full'}/>
                </AspectRatio>
                <Skeleton className={'h-4 w-[150px] bg-secondary absolute top-20 left-1/4 px-10'}/>
            </div>

            <div className={'flex flex-col w-full h-full relative'}>
                <div
                    className={'flex flex-col items-center justify-start w-full gap-2 relative overflow-y-hidden h-[95%]'}>
                    <h1 className={'text-center text-3xl font-extralight'}>Арбитражный суд</h1>
                    <div className={'flex flex-col gap-1 w-full'}>
                        <div className={'grid grid-cols-3 justify-items-center'}>
                            <Skeleton className={'h-4 w-[220px] justify-self-start'}/>
                            <span className={'text-base font-extralight'}>против</span>
                            <Skeleton className={'h-4 w-[120px] justify-self-end'}/>
                        </div>
                        <h1 className={'text-xl font-black uppercase'}>АРБИТРАЖНЫЙ СУД МОСКОВСКОЙ ОБЛАСТИ</h1>
                        <Skeleton className={'h-4 w-[420px]'}/>
                    </div>
                    <div className={'flex flex-col gap-4 w-full'}>
                        <span className={'flex flex-col gap-1'}>
                            <h1 className={'text-xl font-black uppercase'}>Город</h1>
                            <Skeleton className={'h-4 w-[120px]'}/>
                        </span>
                        <span className={'flex flex-col gap-1'}>
                            <h1 className={'text-xl font-black uppercase'}>Адрес</h1>
                            <Skeleton className={'h-4 w-[420px]'}/>
                        </span>
                    </div>
                    <div className={'flex flex-col w-full'}>
                        <h1 className={'text-xl font-black uppercase'}>Вопросы на экспертизу</h1>
                        <ul className={'text-base font-extralight flex flex-col gap-3'}>
                            {Array.from({length: 3}).map((_, index) => (
                                <li key={index} className={'list-inside'}>
                                    <Skeleton className={'h-4 w-[120px]'}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={'flex flex-col gap-4 w-full'}>
                        <h1 className={'text-xl font-black uppercase'}>Вид экспертизы</h1>
                        <Skeleton className={'h-4 w-[120px]'}/>
                    </div>
                </div>
                {/* Кнопка разворота */}
                <div className={'absolute bottom-2 right-1/2'}>
                    <span className={'text-base font-extralight text-blue-400'}>Выберете экспертизу из списка.</span>
                </div>
            </div>
        </section>
    )
}