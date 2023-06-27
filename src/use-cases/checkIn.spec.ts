import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./checkIn.useCase";
import { InMemoryCheckInRepositoryTest } from "@/repositories/inMemoryRepositoryTests/checkIn-repository-test";
import { randomUUID } from "crypto";

let repository: InMemoryCheckInRepositoryTest;
let useCase: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryCheckInRepositoryTest();
    useCase = new CheckInUseCase(repository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await useCase.execute({
      userId: randomUUID(),
      gymId: randomUUID(),
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
