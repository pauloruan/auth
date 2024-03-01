import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  PORT: z.string(),
  HOST: z.string(),
  JWT_SECRET: z.string(),
  POSTGRES_URL: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_URL_NO_SSL: z.string(),
  POSTGRES_PRISMA_URL: z.string(),
  POSTGRES_URL_NON_POOLING: z.string()
})

export const env = envSchema.parse(process.env)
