import { FastifyInstance } from "fastify"
import { z } from "zod"
import { createVideo } from "../video/create-video"
import { getAllVideos } from "../video/get-all-videos"

export async function videoRoute(app: FastifyInstance) {
  app.get("/videos", async (_request, reply) => {
    const videos = await getAllVideos()

    return reply.status(200).send(videos)
  })

  app.post("/videos", async (request, reply) => {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      url: z.string().url()
    })

    const body = bodySchema.parse(request.body)

    const video = await createVideo(body)

    return reply.status(200).send(video)
  })
}
