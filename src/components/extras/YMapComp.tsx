'use client'
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import React from "react";

const YMapComp = () => {

    return (
        <>
            <YMaps>
                <div className={'w-full h-full'}>
                    <Map defaultState={{center: [59.961161, 30.331355], zoom: 17}} className="w-full h-full">
                        <Placemark geometry={[59.961161, 30.331355]}/>
                    </Map>
                </div>
            </YMaps>
        </>
    )
}

export default YMapComp;