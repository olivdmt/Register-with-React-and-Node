import { defineConfig } from "prisma/config";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
