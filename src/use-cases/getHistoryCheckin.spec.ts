import { beforeEach, describe, expect, it } from "vitest";
import { GetHistoryCheckinUseCase } from "./getHistoryCheckin.useCase";
import { InMemoryCheckInRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-checkIn-repository";
import { randomUUID } from "crypto";

let repository: InMemoryCheckInRepositoryTest;
let useCase: GetHistoryCheckinUseCase;

describe("History Check In Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryCheckInRepositoryTest();
    useCase = new GetHistoryCheckinUseCase(repository);
  });

  it("should be able to get history of checkins", async () => {
    repository.bd = [
      {
        id: randomUUID(),
        created_at: new Date(),
        validated_at: new Date(),
        user_id: "userId-1",
        gym_id: "gymId-1",
      },
      {
        id: randomUUID(),
        created_at: new Date(),
        validated_at: new Date(),
        user_id: "userId-1",
        gym_id: "gymId-1",
      },
      {
        id: randomUUID(),
        created_at: new Date(),
        validated_at: new Date(),
        user_id: "userId-2",
        gym_id: "gymId-2",
      },
    ];
    const { checkIns } = await useCase.execute({ userId: "userId-1", page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: "userId-1",
        }),
        expect.objectContaining({
          user_id: "userId-1",
        }),
      ])
    );
  });

  it("should be able to get history of checkins with pagination", async () => {
    for (let i = 1; i <= 12; i++) {
      repository.bd.push({
        id: randomUUID(),
        created_at: new Date(),
        validated_at: new Date(),
        user_id: "userId-1",
        gym_id: "gymId-1",
      });
    }

    const { checkIns } = await useCase.execute({ userId: "userId-1", page: 1 });
    expect(checkIns).toHaveLength(10);

    const { checkIns: checkIns2 } = await useCase.execute({
      userId: "userId-1",
      page: 2,
    });
    expect(checkIns2).toHaveLength(2);
  });
});
