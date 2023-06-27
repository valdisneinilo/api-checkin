import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { GetUserProfileUseCase } from "../getUserProfile.useCase";

export function makeGetUserProfileUseCase() {
  const repository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(repository);

  return useCase;
}
