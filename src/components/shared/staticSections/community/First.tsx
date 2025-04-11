"use server"
import * as React from 'react';
import Image from "next/image";

export const First = async () => {
    return (
        <section
            className="mx-auto w-full bg-secondary relative">
            <div
                className={"container relative flex flex-col lg:grid lg:grid-rows-4 items-center justify-items-start md:justify-start lg:justify-center text-white aspect-video gap-2 lg:gap-16 pt-4 lg:pt-24 pb-8 px-2 md:px-24"}>

                <div className={"aspect-square w-1/3 relative z-40 bg-background rounded-full lg:hidden mb-2 md:mb-6"}>
                    <Image
                        src={'/img/logo.png'}
                        fill={true}
                        alt={"Логотип"}
                        className={'p-2'}
                    />
                </div>

                <div className={"flex flex-col gap-2 lg:gap-16 lg:row-span-3 lg:self-end px-0 lg:px-32"}>
                    <h1 className={"text-xl lg:text-4xl font-bold uppercase z-10 text-center"}>Система добровольной сертификации
                    "профессионал"</h1>
                    <h3 className={"text-lg md:text-xl lg:text-2xl text-center font-extralight z-10 whitespace-pre-line break-words self-center"}>
                        Приглашает вас присоединиться к новому
                        профессиональному сообществу, которое создано для
                        повышения конкурентоспособности частнопрактикующих
                        специалистов и организаций, реализующих свои услуги в
                        различных отраслях.</h3>
                </div>

            </div>
            {/* Background image Fill */}
            <Image
                src="/img/Community/img1.png"
                fill
                alt="Picture of the author"
                className={"opacity-95 z-0 object-cover"}
            />
        </section>
    );
};