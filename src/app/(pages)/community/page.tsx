import {First} from "@/components/shared/staticSections/community/First";
import Second from "@/components/shared/staticSections/community/Second";
import {Third} from "@/components/shared/staticSections/community/Third";
import Fourth from "@/components/shared/staticSections/community/Fourth";
import {Fifth} from "@/components/shared/staticSections/community/Fifth";
import Sixth from "@/components/shared/staticSections/community/Sixth";
import {Seventh} from "@/components/shared/staticSections/community/Seventh";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Сообщество",
    description: "Присоединяйтесь к нашему сообществу профессионалов и экспертов",
    keywords: ["сообщество", "профессионалы", "эксперты", "Лучшее решение"],
    authors: [{ name: "АНО Лучшее Решение" }],
    openGraph: {
        title: "Сообщество",
        description: "Присоединяйтесь к нашему сообществу профессионалов и экспертов",
        type: "website",
        locale: "ru_RU",
    },
}

export default function Page() {
    return (
        <div className={"flex flex-col w-full overflow-hidden"}>
            <First />
            <Second />
            <Third />
            <Fourth />
            <Fifth />
            <Sixth />
            <Seventh />
        </div>
    );
}