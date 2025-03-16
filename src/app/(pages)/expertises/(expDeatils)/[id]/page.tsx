"use server"
import React from 'react';
import TitleHeader from "@/components/shared/TitleHeader";
import {ExpertiseDetailed} from "@/components/shared/expertiseDetailed/ExpertiseDetailed";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {getItem} from "@/app/(pages)/expertises/(expDeatils)/[id]/getItem";
import {isEmptyArray} from "is-what";

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{
        id: string
    }>
}): Promise<Metadata> {
    const {id} = await params
    const item: any = await getItem(id)

    if (isEmptyArray(item)) {
        return {}
    }

    return {
        title: `${item[0].title}`,
        description: `Ознакомптесь с ифнормацией по делу №${item[0].case}`,
        keywords: ["экспертизы", "оценка", "профессиональная экспертиза", "Лучшее решение", `${item[0].case}`],
        authors: [{name: "АНО Лучшее Решение"}],
        openGraph: {
            title: `${item[0].title}`,
            description: `Ознакомптесь с ифнормацией по делу №${item[0].case}`,
            type: "website",
            locale: "ru_RU",
        },
    }
}

export async function generateStaticParams() {
    const expertises = await fetch(process.env["NEXT_PUBLIC_URL"] + '/api/expertises/all', {method: "GET"}).then((res) => res.json())

    return expertises.map((item: any) => ({
        id: item.id.toString()
    }))
}

async function Page({params}: { params: { id: any } }) {
    const id = params.id
    const response = await fetch(process.env["NEXT_PUBLIC_URL"] + `/api/expertise/${id}`, {method: "GET"})
    if (!response.ok) {
        notFound()
    }

    const data = await response.json()

    return (
        <div className={"flex flex-col w-full relative overflow-hidden"}>
            <section className="mx-auto w-full bg-secondary relative">
                <div className={'container grid grid-rows-2 lg:pt-16 pb-6 px-6'}>
                    <TitleHeader title={'Экспертизы'} color={''} cClass={"row-start-2"}/>
                </div>
            </section>

            <ExpertiseDetailed expertise={data}/>

        </div>
    )
}

export default Page;