import {type Metadata} from "next"
import {First} from "@/components/shared/staticSections/mainPage/First";
import {Second} from "@/components/shared/staticSections/mainPage/Second";
import {Third} from "@/components/shared/staticSections/mainPage/Third";
import Fourth from "@/components/shared/staticSections/mainPage/Fourth";
import Fifth from "@/components/shared/staticSections/mainPage/Fifth";
import Sixth from "@/components/shared/staticSections/mainPage/Sixth";
import Seventh from "@/components/shared/staticSections/mainPage/Seventh";

export const metadata: Metadata = {
    description: "Центр независимых исследований",
}

export default async function HomePage() {
    return (
        <div className={"flex flex-col w-full overflow-hidden"}>
            <First/>
            <Second/>
            <Third/>
            <Fourth/>
            <Fifth/>
            <Sixth/>
            <Seventh/>
        </div>
    )
}
