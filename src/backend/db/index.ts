import * as schema from "@/backend/db/schema"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// connection by url
const sql = neon(process.env.DATABASE_URL!)
// database
export const db = drizzle(sql, {schema})
