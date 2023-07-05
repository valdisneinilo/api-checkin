import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymUseCase } from "./searchGyns.useCase";
import { InMemoryGymRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-gym-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime";

let repository: InMemoryGymRepositoryTest;
let useCase: SearchGymUseCase;

describe("Search Gym by Name Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryGymRepositoryTest();
    useCase = new SearchGymUseCase(repository);
  });

  it("should be able to get gym by name whit pagination", async () => {
    repository.bd.push(
      {
        id: randomUUID(),
        name: "JavaScript Gym",
        description: "Gym description",
        phone: "123456789",
        created_at: new Date(),
        latitude: new Decimal(123),
        longitude: new Decimal(123 + 1),
      },
      {
        id: randomUUID(),
        name: "TypeScript Gym",
        description: "Gym description",
        phone: "123456789",
        created_at: new Date(),
        latitude: new Decimal(123),
        longitude: new Decimal(123 + 1),
      }
    );

    const { gyms } = await useCase.execute({
      name: "TypeScript Gym",
      page: 1,
    });

    expect(gyms.length).toBe(1);

    expect(gyms).toEqual([
      expect.objectContaining({
        name: "TypeScript Gym",
      }),
    ]);
  });

  it("should be able to get gym by name whit pagination", async () => {
    for (let index = 1; index <= 12; index++) {
      repository.bd.push({
        id: randomUUID(),
        name: `Gym-${index}`,
        description: `Gym description ${index}`,
        phone: "123456789",
        created_at: new Date(),
        latitude: new Decimal(index),
        longitude: new Decimal(index + 1),
      });
    }

    const { gyms } = await useCase.execute({
      name: "Gym",
      page: 1,
    });
    expect(gyms.length).toBe(10);

    const { gyms: gyms2 } = await useCase.execute({
      name: "Gym-1",
      page: 1,
    });
    expect(gyms2.length).toBe(4);

    const { gyms: gyms3 } = await useCase.execute({
      name: "Gym-12",
      page: 1,
    });
    expect(gyms3.length).toBe(1);

    const { gyms: gyns4 } = await useCase.execute({
      name: "Gym",
      page: 2,
    });
    expect(gyns4.length).toBe(2);
  });
});
