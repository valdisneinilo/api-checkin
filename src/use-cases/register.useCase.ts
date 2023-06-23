import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export const registerUseCase = async (
  name: string,
  email: string,
  password: string
) => {
  const password_hash = await hash(password, 6);
  const emailUnique = await prisma.user.findUnique({
    where: { email },
  });
  if (emailUnique) {
    throw new Error("😒 Email already exists");
  }

  const prismaUsersRepository = new PrismaUsersRepository();
  prismaUsersRepository.create({
    name,
    email,
    password: password_hash,
  });
};
