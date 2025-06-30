import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    port: 5432,
    user: "postgres.hxwgowcesfnzgmoqhmxe",
    password: "Samuelindrabastian12345678",
    database: "postgres",
    ssl: "require",
  },
  dialect: "postgresql",
} satisfies Config;
