import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUsersRepositoryTest } from "@/repositories/inMemoryRepositoryTests/user-repository-test";
import { AuthenticateUseCase } from "./authenticate.useCase";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/authenticate.error";

let repository: InMemoryUsersRepositoryTest;
let useCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepositoryTest();
    useCase = new AuthenticateUseCase(repository);
  });

  it("should be able to authenticate a user", async () => {
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
    await expect(
      useCase.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate a user if wrong password", async () => {
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
