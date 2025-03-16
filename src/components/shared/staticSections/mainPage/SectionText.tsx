"use client"

import * as React from "react";

function SectionText() {
    return (
        <>
            <div
                className={"bg-black/40 border-accent border-2 px-6 py-10 flex flex-col items-center gap-12 justify-evenly"}>
                <div className={"bg-accent aspect-square w-1/2"}></div>
                <h1 className={"text-white font-light text-3xl text-center w-min"}>
                    Производство внесудебных исследований
                </h1>
            </div>
            <div
                className={"bg-black/40 border-accent border-2 px-6 py-10 flex flex-col items-center gap-12 justify-evenly"}>
                <div className={"bg-accent aspect-square w-1/2"}></div>
                <h1 className={"text-white font-light text-3xl text-center w-min"}>
                    Производство судебных экспертиз
                </h1>
            </div>

            <div
                className={"bg-black/40 border-accent border-2 px-6 py-10 flex flex-col items-center gap-12 justify-evenly"}>
                <div className={"bg-accent aspect-square w-1/2"}></div>
                <h1 className={"text-white font-light text-3xl text-center w-min"}>
                    Консультация и подготовка к процессу
                </h1>
            </div>

        </>
    )
}

export default SectionText;