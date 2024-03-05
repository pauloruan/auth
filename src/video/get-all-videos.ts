import { prisma } from "../db/prisma"

interface IVideo {
  id: string
  title: string
  description: string
  url: string
}

export async function getAllVideos() {
  return await prisma.video.findMany()
}
