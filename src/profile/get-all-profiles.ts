import { prisma } from "../db/prisma"

export async function getAllProfiles() {
  const profiles = await prisma.profile.findMany({
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

  return profiles
}
