import {Metadata} from 'next'
import React from "react";

export const metadata: Metadata = {
    title: 'Новости',
    description: 'Читайте последние новости, статьи и обзоры от наших экспертов',
    keywords: ['блог', 'новости', 'статьи', 'обзоры', 'Лучшее решение'],
    authors: [{name: 'АНО Лучшее Решение'}],
    openGraph: {
        title: 'Новости',
        description: 'Читайте последние новости, статьи и обзоры от наших экспертов',
        type: 'website',
        locale: 'ru_RU',
    },
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
