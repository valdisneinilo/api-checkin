import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { EmailAlreadyExistsErro } from "@/use-cases/errors/register.error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register.factorie";

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
    const useCase = makeRegisterUseCase();
    await useCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsErro)
      return reply.status(409).send(error.message);
    throw error;
  }

  return reply.status(201).send("😁 User created");
}
