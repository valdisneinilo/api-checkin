import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./checkIn.useCase";
import { InMemoryCheckInRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-checkIn-repository";
import { randomUUID } from "crypto";

let repository: InMemoryCheckInRepositoryTest;
let useCase: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryCheckInRepositoryTest();
    useCase = new CheckInUseCase(repository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await useCase.execute({
      userId: randomUUID(),
      gymId: randomUUID(),
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 21, 0, 0));

    await useCase.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    await expect(
      useCase.execute({
        userId: "user-01",
        gymId: "gym-01",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in but on diferents days", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 21, 0, 0));

    await useCase.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    vi.setSystemTime(new Date(2023, 0, 2, 21, 0, 0));

    await expect(
      useCase.execute({
        userId: "user-01",
        gymId: "gym-01",
      })
    ).resolves.toBeTruthy();
  });
});
