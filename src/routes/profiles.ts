import { getAllProfiles } from "../profile/get-all-profiles"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../db/prisma"

interface IProfile {
  id: string
  title: string
  description: string
  url: string
}

export async function profileRoute(app: FastifyInstance) {
  app.get("/profile", async (_request, reply) => {
    const profiles = await getAllProfiles()

    return reply.status(200).send(profiles)
  })

  app.get("/profile/:id", async (request, reply) => {
    const bodySchema = z.object({
      id: z.string()
    })

    const body = bodySchema.parse(request.body)

    const profile = await prisma.profile.findUnique({
      where: {
        id: body.id
      },
      select: {
        id: true,
        enrollment: true,
        role: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!profile) {
      return reply.status(404).send({ message: "Profile not found" })
    }

    return reply.status(200).send(profile)
  })
}
