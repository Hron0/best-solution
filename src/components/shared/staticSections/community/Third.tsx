// @ts-nocheck
// Я не буду ебаться с типами для этого Автоплея на карусели мне похуй
'use client'
import * as React from 'react';
import Image from "next/image";
import TitleHeader from "@/components/shared/TitleHeader";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export const Third = () => {
    let delay = 4000

    const items = [
        {title: 'Членство в профессиональном сообществе', img: '/img/mainPage/group.svg'},
        {title: 'Повышение личной компетенции и уровня профессиональной деятельности', img: '/img/mainPage/files.svg'},
        {title: 'Защиту от недовольных клиентов внесудебных исследований', img: '/img/mainPage/suitcase.svg'},
    ]

    return (
        <section
            className="w-full bg-secondary relative ">
            <div className={'container relative flex flex-col items-start gap-6 md:gap-16 px-6 lg:px-16 py-4 lg:py-8 text-wite aspect-video'}>
                <TitleHeader title={'ЧТО МЫ ПРЕДЛАГАЕМ:'} color={''} cClass={"self-start"}/>

                {/* Lol */}
                <div
                    className={"flex relative w-full z-10"}>

                    <Carousel
                        className="w-full"
                    >
                        <CarouselContent className={"-ml-12"}>
                            {items.map((item, index) => (
                                <CarouselItem key={index} className="pl-12 md:basis-1/3">
                                    <div
                                        className={"bg-black/40 w-max border-accent border-2 px-3 lg:px-6 py-3 lg:py-6 flex flex-col items-center gap-6 lg:gap-12 md:justify-start"}>
                                        <div className={"relative aspect-square w-[72%] md:w-[120px]"}>
                                            <Image src={item.img}
                                                   alt={'Pic'}
                                                   fill={true}/>
                                        </div>
                                        <h1 className={"text-white font-light text-xl md:text-2xl lg:text-3xl text-center"}>
                                            {item.title}
                                        </h1>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>


                </div>


                {/* Background image Fill */
                }
            </div>
            <Image
                src="/img/Community/img2.png"
                fill
                alt="Picture of the author"
                className={"opacity-95 z-0 object-cover"}
            />
        </section>
    );
};