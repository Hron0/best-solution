import TitleHeader from "@/components/shared/TitleHeader";
import * as React from "react";

export default function Second() {
    return (
        <section
            className={'container relative px-2 lg:px-6 lg:px-16 py-4 lg:py-8  h-min text-black md:aspect-video'}>
            <div className={"flex flex-col items-start gap-6 md:gap-24 bg-romb bg-center bg-contain bg-no-repeat relative w-full h-full"}>
                <TitleHeader title={'Основными целями создания и функционирования Системы\n' +
                    'являются:'} color={'orange'} cClass={'md:w-fit pr-8'} isHidden/>

                <div
                    className={"relative flex items-start justify-start"}>

                    <ul className={'list-none list-inside text-xl lg:text-4xl font-extralight lg:indent-8'}>
                        <li className={"mb-3 lg:mb-6"}>Содействие потребителям в компетентном выборе исполнителей услуг;</li>
                        <li className={"mb-3 lg:mb-6"}>Повышение конкурентоспособности организаций и частнопрактикующих
                            специалистов, реализующих услуги в различных отраслях;
                        </li>
                        <li>Повышение доверия потребителей к услугам конкретных исполнителей;</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}