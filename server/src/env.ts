import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  MARKET_API_TOKEN: z.string(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

export const ENV = envSchema.parse(process.env)
