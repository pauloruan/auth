import { prisma } from "../src/db/prisma"

async function main() {
  const ana = await prisma.user.create({
    data: {
      name: "Ana",
      email: "ana@email.com",
      password: "password",
      profile: {
        create: {
          role: "USER",
          enrollment: "123456"
        }
      }
    }
  })

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@email.com",
      password: "password",
      profile: {
        create: {
          role: "USER",
          enrollment: "654321"
        }
      }
    }
  })

  const video1 = await prisma.video.create({
    data: {
      title: "Video 1",
      description: "Descrição gerada para o vídeo 1 pelo usuário admin.",
      url: "https://www.youtube.com/watch?v=8AgOxHOAV9Y"
    }
  })

  const video2 = await prisma.video.create({
    data: {
      title: "Video 2",
      description: "Descrição gerada para o vídeo 2 pelo usuário admin.",
      url: "https://www.youtube.com/watch?v=dml7nKi9WI0"
    }
  })

  const video3 = await prisma.video.create({
    data: {
      title: "Video 3",
      description: "Descrição gerada para o vídeo 3 pelo usuário admin.",
      url: "https://www.youtube.com/watch?v=aKzN6sQqDrQ"
    }
  })

  const video4 = await prisma.video.create({
    data: {
      title: "Video 4",
      description: "Descrição gerada para o vídeo 4 pelo usuário admin.",
      url: "https://www.youtube.com/watch?v=7SaA3HCOc4c"
    }
  })

  const video5 = await prisma.video.create({
    data: {
      title: "Video 5",
      description: "Descrição gerada para o vídeo 5 pelo usuário admin.",
      url: "https://www.youtube.com/watch?v=QXiPY6WAefo"
    }
  })

  console.log({ ana, bob })
  console.log({ video1, video2, video3, video4, video5 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
