import { prisma } from "../db/prisma";

export async function createProfile(userId: string) {

  const verifyUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if (!verifyUser) {
    throw new Error('User not found');
  }

  const newProfile = await prisma.profile.create({
    data: {
      enrollment: '123456',
      role: 'USER',
      user: {
        connect: {
          id: userId
        }
      }
    }
  });

  return newProfile;
}
