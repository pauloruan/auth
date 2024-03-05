import { prisma } from "../db/prisma"

interface ICreateVideo {
  title: string
  description: string
  url: string
}

export async function createVideo(video: ICreateVideo) {
  return await prisma.video.create({
    data: {
      ...video
    }
  })
}
