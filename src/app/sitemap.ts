import type {MetadataRoute} from 'next'
import {siteConfig} from "../../config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const res = await fetch(`https://best-solution.vercel.app/api/expertises/short`)
    const expertises = await res.json()

    const expertisesEntries = expertises.map((exp: any) => ({
        url: `https://${siteConfig.domain}/expertises/${exp.id}`,
        lastModified: 'monthly',
        priority: 0.7,
    }))

    return [
        {
            url: `https://${siteConfig.domain}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `https://${siteConfig.domain}/community`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `https://${siteConfig.domain}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `https://${siteConfig.domain}/expertises`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        ...expertisesEntries
    ]
}