import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../db/prisma"
import { comparePassword } from "../lib/hash"

export async function loginRoute(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const body = bodySchema.parse(request.body)

    let verifyUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (!verifyUser) {
      return reply.status(400).send({ error: "User not found" })
    }

    const isPasswordValid = comparePassword(body.password, verifyUser.password)

    if (!isPasswordValid) {
      return reply.status(400).send({ error: "Invalid credentials" })
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: verifyUser.id
      }
    })

    if (!profile) {
      return reply.status(400).send({ error: "Profile not found" })
    }

    const token = app.jwt.sign(
      {
        userId: verifyUser.id,
        name: verifyUser.name,
        role: profile.role
      },
      {
        sub: profile.id,
        expiresIn: "30 days"
      }
    )

    const user = {
      id: profile.id,
      name: verifyUser.name,
      email: verifyUser.email,
      enrollment: profile.enrollment,
      role: profile.role
    }

    return reply.status(200).send({ token, user })
  })
}
