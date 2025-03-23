import type { MetadataRoute } from 'next'
import {siteConfig} from "../../config/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `https://${siteConfig.domain}/sitemap.xml`,
    }
}