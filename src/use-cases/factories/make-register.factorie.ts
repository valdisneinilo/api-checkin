import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { RegisterUseCase } from "@/use-cases/register.useCase";

export function makeRegisterUseCase() {
  const repository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(repository);

  return useCase;
}
