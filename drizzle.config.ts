import type { Config } from "drizzle-kit"

export default {
  schema: "./src/backend/db/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  schemaFilter: ['public'],
} satisfies Config
