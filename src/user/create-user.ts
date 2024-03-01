import { prisma } from "../db/prisma";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export async function createUser(user: ICreateUser) {

  const verifyUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });

  if (verifyUser) {
    throw new Error('User already exists');
  }

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    }
  });

  return newUser;
}
