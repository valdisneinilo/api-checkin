import { beforeEach, describe, expect, it } from "vitest";
import { GetCountCheckinUseCase } from "./getCountCheckin.useCase";
import { InMemoryCheckInRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-checkIn-repository";
import { randomUUID } from "crypto";

let repository: InMemoryCheckInRepositoryTest;
let useCase: GetCountCheckinUseCase;

describe("Count Total Check In Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryCheckInRepositoryTest();
    useCase = new GetCountCheckinUseCase(repository);
  });

  it("should be able to get total checkins", async () => {
    for (let i = 1; i <= 12; i++) {
      repository.bd.push({
        id: randomUUID(),
        created_at: new Date(),
        validated_at: new Date(),
        user_id: "userId-1",
        gym_id: "gymId-1",
      });
    }
    console.log(repository.bd.length);
    const { checkIns } = await useCase.execute({ userId: "userId-1" });
    expect(checkIns).toBe(12);
  });
});
