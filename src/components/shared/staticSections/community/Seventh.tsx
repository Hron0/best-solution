"use server"
import * as React from 'react';
import TitleHeader from "@/components/shared/TitleHeader";
import Image from "next/image";

export const Seventh = async () => {
    return (
        <section
            className={'mx-auto w-full bg-secondary relative'}>
            <div
                className={"container px-4 lg:px-16 py-4 lg:py-8 pt-8 lg:pt-14 text-white h-min flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-32 relative w-full"}>

                <div
                    className={"relative bg-background w-[80vw] lg:w-[1000px] aspect-square px-1 py-2 rounded-md flex flex-col items-center justify-start gap-2 shadow-xl text-black"}>
                    <div className={'relative w-[60%] aspect-square'}>
                        <Image
                            src={'/img/logo.png'}
                            fill
                            alt={"Логотип"}
                        />
                    </div>
                    <div className={"flex flex-col items-center text-center pb-3 absolute bottom-1"}>
                        <h1 className={"text-xl"}>ЛУЧШЕЕ РЕШЕНИЕ</h1>
                        <h3 className={"text-center text-base font-extralight"}>Центр независимых исследований.</h3>
                    </div>
                </div>

                <h1 className={'text-xl lg:text-4xl font-normal text-white text-center'}>
                    Достижение целей Системы обеспечивается
                    за счет объективности и достоверности
                    результатов сертификации участников
                    системы, оформляемых органами по
                    добровольной сертификации
                </h1>
            </div>
        </section>
    );
};