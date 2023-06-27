import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Bad Request - Invalid body request",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    //Here we should send log to a log external service, ex: Sentry, datadog, prometheus ,etc
  }

  return reply.status(500).send("Internal server error");
});
