import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUsersRepositoryTest } from "@/repositories/inMemoryRepositoryTests/user-repository-test";
import { GetUserProfileUseCase } from "./getUserProfile.useCase";
import { NotFound } from "./errors/notFound.error";

let repository: InMemoryUsersRepositoryTest;
let useCase: GetUserProfileUseCase;

describe("Get user by id Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepositoryTest();
    useCase = new GetUserProfileUseCase(repository);
  });

  it("should be able find a user by id", async () => {
    const userCreated = await repository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const { user } = await useCase.execute({
      id: userCreated.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.id).toEqual(userCreated.id);
  });

  it("should not be able to find a user by id if wrong id", async () => {
    await expect(
      useCase.execute({
        id: "wrongId",
      })
    ).rejects.toBeInstanceOf(NotFound);
  });
});
