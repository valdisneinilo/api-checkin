import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticateUseCase } from "@/use-cases/authenticate.useCase";
import { InvalidCredentialsError } from "@/use-cases/errors/authenticate.error";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = bodySchema.parse(request.body);

  try {
    const repository = new PrismaUsersRepository();
    const useCase = new AuthenticateUseCase(repository);
    await useCase.execute({ email, password });
  } catch (error: unknown) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(400).send(error.message);
    return reply.status(500).send("Internal server error");
  }

  return reply.status(202).send("😁 User authenticated");
}
