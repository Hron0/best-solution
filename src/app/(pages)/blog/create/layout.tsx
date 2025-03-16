import {Metadata} from 'next'
import React from "react";

export const metadata: Metadata = {
    title: 'Создание поста',
}

export default function BlogLayout({
children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
