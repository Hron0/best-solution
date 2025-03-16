'use server'
import * as React from 'react';
import Image from "next/image";

export const Second = async () => {
    return (
        <section className="mx-auto container w-full relative grid lg:grid-cols-2 items-start gap-12 lg:px-24 py-12">
            <Image src={"/img/mainPage/img1.png"}
                   alt={'Pic'}
                   width={578}
                   height={334}
                   className={"hidden lg:block"}/>

            <div className={"relative flex items-start justify-start h-full lg:pl-20 bg-romb bg-contain md:px-24 lg:px-0 bg-center bg-repeat-x"}>

                <h3 className={"text-black text-lg md:text-2xl font-light break-words text-center px-2 lg:px-0"}>Мы профессионально выполняем свою работу и с
                    уверенностью можем отстоять свою
                    экспертную позицию в суде!
                    Кроме того, мы готовы представлять ваши интересы в суде в качестве
                    представителей или стать вашим консультантом при подготовке к процессу.</h3>
            </div>

        </section>
    );
};