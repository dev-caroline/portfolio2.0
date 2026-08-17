import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// Next.js stores secrets in .env.local, but the Prisma CLI only auto-loads .env.
// Load .env.local explicitly so `prisma generate`/`migrate`/`db push` can read DATABASE_URL.
config({ path: '.env.local' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
