// @ts-nocheck
"use client"
import React from 'react';
import TitleHeader from "@/components/shared/TitleHeader";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import {AspectRatio} from "@/components/ui/aspect-ratio";

const data = [
    {name: 'Суды общей юрисдикции.', img: '/img/mainPage/img3.png'},
    {name: 'Арбитражные суды.', img: '/img/mainPage/img4.png'},
    {name: 'МВД.', img: '/img/mainPage/img5.png'},
]

function Seventh() {
    return (
        <section
            className="bg-secondary relative mx-auto w-full bg-romb bg-contain bg-center bg-repeat-x">
            <div className={'container relative flex flex-col items-start gap-10 text-white px-6 md:px-10 py-4 md:py-8'}>

                <TitleHeader title={'Наши партнёры'}/>
                <div className={'relative w-full z-30'}>

                    <Carousel
                        className="w-full"
                        opts={{
                            align: 'start',
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}>
                        <CarouselContent className={"-ml-6"}>
                            {data.map((item, index) => (
                                <CarouselItem key={index} className={"pl-6 md:basis-1/2 lg:basis-1/3"}>
                                    <div className={"flex flex-col items-center justify-start gap-2 relative"}>
                                        <div className={"w-[130px] md:w-[200px] lg:w-[330px]"}>
                                            <AspectRatio ratio={15 / 16}>
                                                <Image src={item.img}
                                                       alt={"Суды общей юрисдикции"}
                                                       fill={true}
                                                       className={"object-cover"}
                                                />
                                            </AspectRatio>
                                        </div>

                                        <h1 className={"text-white text-lg lg:text-2xl font-bold text-center z-20"}>{item.name}</h1>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                </div>
                {/*<div className={"flex flex-row w-full gap-4 items-start justify-evenly"}>

                <div className={"flex flex-col items-center gap-2"}>
                    <Image src={'/img/mainPage/img4.png'}
                           alt={"Суды общей юрисдикции"}
                           width={327}
                           height={307}
                    />

                    <h1 className={"text-white text-2xl font-bold text-center"}>Суды общей юрисдикции</h1>
                </div>
                <div className={"flex flex-col items-center gap-2"}>
                    <Image src={'/img/mainPage/img5.png'}
                           alt={"Суды общей юрисдикции"}
                           width={514}
                           height={307}
                    />

                    <h1 className={"text-white text-2xl font-bold text-center"}>Суды общей юрисдикции</h1>
                </div>
            </div>*/}

                {/* Background image Fill */}
                {/*<Image*/}
                {/*    src="/img/mainPage/bg3.png"*/}
                {/*    fill={true}*/}
                {/*    alt="Picture of the author"*/}
                {/*    className={"opacity-80 z-0"}*/}
                {/*/>*/}
            </div>
        </section>
    );
}

export default Seventh;