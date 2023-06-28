import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.useCase";
import { compare } from "bcryptjs";
import { InMemoryUsersRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-user-repository-test";
import { EmailAlreadyExistsErro } from "./errors/register.error";

let repository: InMemoryUsersRepositoryTest;
let useCase: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepositoryTest();
    useCase = new RegisterUseCase(repository);
  });

  it("should be able to register a new user", async () => {
    const { user } = await useCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(await user).toEqual({
      id: expect.any(String),
      name: "John Doe",
      email: "johndoe@example.com",
      password: expect.any(String),
      created_at: expect.any(Date),
    });
  });

  it("should verify if password is a hash correctly", async () => {
    const { user } = await useCase.execute({
      name: "John Doe",
      email: "test@example.com",
      password: "123456",
    });

    const passwordIsHashCorrectly = await compare(
      "123456",
      (
        await user
      ).password
    );

    expect(passwordIsHashCorrectly).toBe(true);
  });

  it("should not be able to register a new user with an email already exists", async () => {
    const email = "jhondoe@example.com";

    await useCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(
      useCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsErro);
  });
});
