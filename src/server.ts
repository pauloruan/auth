import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import fastify, { FastifyInstance } from "fastify"
import { env } from "./lib/env"
import { loginRoute } from "./routes/login"
import { registerRoute } from "./routes/register"

const app: FastifyInstance = fastify({ logger: true })

app.register(cors)
app.register(jwt, { secret: env.JWT_SECRET })

app.register(loginRoute)
app.register(registerRoute)

async function start() {
  try {
    await app.listen({ port: Number(env.PORT), host: env.HOST })
    app.log.info(`🚀 HTTP server running on ${app.server.address()}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
