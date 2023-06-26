import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../user-repository";

export class PrismaUsersRepository implements IUsersRepository {
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
