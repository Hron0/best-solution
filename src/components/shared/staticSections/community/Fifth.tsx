"use server"
import * as React from 'react';
import TitleHeader from "@/components/shared/TitleHeader";

export const Fifth = async () => {
    return (
        <section
            className={'mx-auto w-full bg-secondary relative'}>
            <div
                className={"container px-2 md:px-6 lg:px-16 py-4 lg:py-8 text-white h-min aspect-video flex flex-col items-start gap-6 md:gap-32 relative w-full"}>
                <TitleHeader title={'Повышение личной компетенции и уровня профессиональной деятельности'}
                             color={'orange'} cClass={'md:w-[700px]'} isHidden/>

                <div
                    className={"relative flex flex-col gap-8 lg:gap-24 md:pr-24 lg:pr-[22%] items-start justify-start text-xl lg:text-4xl font-extralight"}>
                    <h1>
                        Неформальное общение и обмен
                        опытом между участниками
                        профессионального сообщества – это
                        путь к приобретению новых навыков.
                    </h1>
                    <h1>
                        А повышение квалификации под
                        руководством именитых специалистов
                        – это путь к профессиональной
                        грамотности!
                    </h1>
                </div>
            </div>
        </section>
    );
};