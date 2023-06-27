import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/authenticate.error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate.factorie";

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
    const useCase = makeAuthenticateUseCase();
    await useCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(400).send(error.message);
    throw error;
  }

  return reply.status(202).send("😁 User authenticated");
}
