import {QueryProvider} from "@/components/providers/query-provider"
import {siteConfig} from "../../config/site"
import {Toaster} from "@/components/ui/sonner"
import type {Metadata} from "next"
import "@/globals.css"
import {SpeedInsights} from "@vercel/speed-insights/next"
import React from "react";
import {SessionProvider} from "next-auth/react";
import {cn} from "@/lib/utils";
import {Inter} from "../../public/fonts/fonts";
import {MobileDrawer} from "@/components/shared/Nav/MobileDrawer";
import {Navbar} from "@/components/shared/Nav/Navbar";


export const metadata: Metadata = {
    title: {
        default: siteConfig.title,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
    },
    icons: {
        icon: "/img/logo.svg",
    },
}

export default function RootLayout({children}: {
    children: React.ReactNode,
}) {

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
        </head>
        <body className={cn("bg-background w-full flex flex-col items-center", Inter.className)}>
        <SessionProvider>
            <QueryProvider>
                    <main className={"flex flex-col justify-between items-center w-full overflow-x-hidden"}>
                        <MobileDrawer />
                        <Navbar />
                        {children}
                        <Toaster/>
                    </main>
            </QueryProvider>
        </SessionProvider>
        <SpeedInsights/>
        </body>
        </html>
    )
}