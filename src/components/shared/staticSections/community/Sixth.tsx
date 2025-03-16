import TitleHeader from "@/components/shared/TitleHeader";
import Image from "next/image";
import * as React from "react";

export default function Sixth() {
    return (
        <section
            className={'container relative px-2 md:px-6 lg:px-16 py-4 lg:py-8  h-min text-black'}>
            <div
                className={"flex flex-col items-start relative w-full h-full"}>
                <TitleHeader title={'Защита от недовольных клиентов'} color={'orange'} cClass={'md:w-fit lg:pr-8 h-fit min-h-12'} isHidden/>

                <div
                    className={"relative w-full flex flex-col gap-16 py-6 md:py-16 md:pr-24 lg:pr-[28%] items-start justify-start text-black text-xl lg:text-4xl font-extralight"}>

                    <h1>Становясь участником профессионального
                        сообщества вы получаете право на защиту
                        в спорной ситуации с вашими клиентами.
                        Пропишите оговорку в вашем договоре о том,
                        что все спорные вопросы решаются путем
                        обязательной подачи претензии в Правление
                        системы добровольной сертификации,
                        членом которой вы являетесь, а мы
                        приложим все усилия, чтобы урегулировать
                        данный вопрос с вашим недовольным
                        клиентом.
                    </h1>


                    <Image src={'/img/mainPage/rectangle.png'} alt={'.'} fill className={'object-contain'}/>
                </div>
            </div>
        </section>
    );
}