import prismaClient from "../prisma";

class GetLastMessagesService {
  async execute() {
    try {
      const messages = await prismaClient.message.findMany({
        take: 3,
        orderBy: {
          created_at: "desc",
        },
        include: {
          user: true,
        },
      });

      return messages;
    } catch (error) {
      return error;
    }
  }
}

export { GetLastMessagesService };
