import { describe, expect, it } from "vitest";
import { InMemoryUsersRepositoryTest } from "@/repositories/inMemoryRepositoryTests/user-repository-test";
import { AuthenticateUseCase } from "./authenticate.useCase";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/authenticate.error";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate a user", async () => {
    const repository = new InMemoryUsersRepositoryTest();
    const useCase = new AuthenticateUseCase(repository);
    const passwordParams = "123456";

    await repository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash(passwordParams, 6),
    });

    const { user } = await useCase.execute({
      email: "johndoe@example.com",
      password: passwordParams,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate a user if wrong email", async () => {
    const repository = new InMemoryUsersRepositoryTest();
    const useCase = new AuthenticateUseCase(repository);

    await expect(
      useCase.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate a user if wrong password", async () => {
    const repository = new InMemoryUsersRepositoryTest();
    const useCase = new AuthenticateUseCase(repository);

    await repository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    await expect(
      useCase.execute({
        email: "johndoe@example.com",
        password: "654321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
