import { beforeEach, describe, it, expect } from "vitest";
import { CreateGymUseCase } from "./createGym.useCase";
import { InMemoryGymRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-gym-repository";

let repository: InMemoryGymRepositoryTest;
let useCase: CreateGymUseCase;

describe("Create gym Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryGymRepositoryTest();
    useCase = new CreateGymUseCase(repository);
  });

  it("should be able to register a new gym", async () => {
    const { gym } = await useCase.execute({
      name: "Academia",
      description: "Academia de musculação",
      phone: "123456789",
      latitude: -12.3456,
      longitude: -12.3453,
    });
    expect(gym).toMatchObject({
      id: expect.any(String),
      name: "Academia",
    });
  });
});
