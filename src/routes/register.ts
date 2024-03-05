import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../db/prisma"
import { createProfile } from "../profile/create-profile"
import { createUser } from "../user/create-user"

export async function registerRoute(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
    })

    const body = bodySchema.parse(request.body)

    let verifyUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (verifyUser) {
      return reply.status(400).send({ error: "Email already in use" })
    }

    const newUser = await createUser({
      ...body
    })

    const profile = await createProfile(newUser.id)

    if (!profile) {
      return reply.status(400).send({ error: "Profile not found" })
    }

    const token = app.jwt.sign(
      {
        userId: newUser.id,
        name: newUser.name,
        role: profile.role
      },
      {
        sub: profile.id,
        expiresIn: "30 days"
      }
    )

    const user = {
      id: profile.id,
      name: newUser.name,
      email: newUser.email,
      enrollment: profile.enrollment,
      role: profile.role
    }

    return reply.status(200).send({ token, user })
  })
}
