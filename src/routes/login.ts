import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../db/prisma"

export async function loginRoute(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const body = bodySchema.parse(request.body)

    let user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (!user) {
      return reply.status(400).send({ error: "User not found" })
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id
      }
    })

    if (!profile) {
      return reply.status(400).send({ error: "Profile not found" })
    }

    const token = app.jwt.sign(
      {
        userId: user.id,
        name: user.name,
        role: profile.role
      },
      {
        sub: profile.id,
        expiresIn: "30 days"
      }
    )

    return reply.status(200).send({ token })
  })
}
