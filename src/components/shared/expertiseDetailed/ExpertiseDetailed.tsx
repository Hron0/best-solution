"use client"

import type {ExpertiseType} from "@/lib/types/expertises"
import {AspectRatio} from "@/components/ui/aspect-ratio"
import React, {useRef, useState, useEffect} from "react"
import {Skeleton} from "@/components/ui/skeleton"
import {Button} from "@/components/ui/button"
import {ChevronDown, ChevronUp} from "lucide-react"
import Link from "next/link";
import {cn} from "@/lib/utils";

type Props = {
    expertise?: ExpertiseType
}

export const ExpertiseDetailed: React.FC<Props> = ({expertise}) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const [isOverflowing, setIsOverflowing] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const checkOverflow = () => {
            if (contentRef.current) {
                const element = contentRef.current
                setIsOverflowing(element.scrollHeight > element.clientHeight)
            }
        }

        checkOverflow()
        window.addEventListener("resize", checkOverflow)
        return () => window.removeEventListener("resize", checkOverflow)
    }, [])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }


    return (
        <section className="container py-3 px-2 flex flex-col lg:flex-row items-start gap-16 relative">
            <div className="w-[90vw] lg:w-[452px] relative">
                <AspectRatio ratio={9 / 16} className="">

                    {expertise?.document ? (
                        <Link href={`${expertise?.document.fileUrl}`} target="_blank">
                            <Skeleton
                                className={cn('w-full h-full', expertise?.document.fileUrl && 'border-2 border-blue-400/50 animate-pulse')}/>
                        </Link>
                    ) : (
                        <Skeleton
                            className={'w-full h-full'}/>
                    )}


                </AspectRatio>
                <h1 className="text-xl font-extralight text-center break-words absolute top-20 w-full px-5">
                    {expertise?.title}
                </h1>
            </div>

            <div className="flex flex-col w-full h-full relative">
                <div
                    ref={contentRef}
                    className={`flex flex-col items-center justify-start w-full gap-2 relative ${
                        isExpanded ? "h-auto" : "h-[550px] overflow-y-hidden"
                    }`}
                >
                    <h1 className="text-center text-3xl font-extralight">Арбитражный суд</h1>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="grid grid-cols-3 justify-items-center">
                            <span className="text-base font-extralight justify-self-start">{expertise?.name}</span>
                            <span className="text-base font-extralight">против</span>
                            <span className="text-base font-extralight justify-self-end">{expertise?.against}</span>
                        </div>
                        <h1 className="text-xl font-black uppercase">АРБИТРАЖНЫЙ СУД МОСКОВСКОЙ ОБЛАСТИ</h1>
                        <h3 className="text-base font-extralight">Дело N{expertise?.case}</h3>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
            <span className="flex flex-col gap-1">
              <h1 className="text-xl font-black uppercase">Город</h1>
              <h3 className="text-base font-extralight">{expertise?.city}</h3>
            </span>
                        <span className="flex flex-col gap-1">
              <h1 className="text-xl font-black uppercase">Адрес</h1>
              <h3 className="text-base font-extralight">{expertise?.address}</h3>
            </span>
                    </div>
                    <div className="flex flex-col w-full">
                        <h1 className="text-xl font-black uppercase">Вопросы на экспертизу</h1>
                        <div>
                            <h3 className="text-base font-extralight break-words whitespace-pre-wrap">{expertise?.questions}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="text-xl font-black uppercase">Вид экспертизы</h1>
                        <h3 className="text-base font-extralight break-words whitespace-pre-wrap">{expertise?.types}</h3>
                    </div>
                </div>
                {(isOverflowing || isExpanded) && (
                    <div className="absolute bottom-0 bg-white pt-2 w-full flex justify-center">
                        <Button
                            variant="ghost"
                            onClick={toggleExpand}
                            className="text-base font-extralight text-blue-400 hover:text-blue-600 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp className="mr-2 h-4 w-4"/>
                                    Свернуть
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="mr-2 h-4 w-4"/>
                                    Развернуть
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ExpertiseDetailed

