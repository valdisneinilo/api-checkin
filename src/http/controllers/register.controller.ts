import { RegisterUseCase } from "@/use-cases/register.useCase";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { EmailAlreadyExistsErro } from "@/use-cases/errors/register.error";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { name, email, password } = bodySchema.parse(request.body);

  try {
    const repository = new PrismaUsersRepository();
    const useCase = new RegisterUseCase(repository);
    await useCase.execute({ name, email, password });
  } catch (error: unknown) {
    if (error instanceof EmailAlreadyExistsErro)
      return reply.status(409).send(error.message);
    return reply.status(500).send("Internal server error");
  }

  return reply.status(201).send("😁 User created");
}
