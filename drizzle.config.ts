import { type Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    database: 'news',
    user: 'postgres',
    password: 'postgres',
  },
  tablesFilter: ["news_*"],
} satisfies Config;
