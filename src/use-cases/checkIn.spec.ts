import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./checkIn.useCase";
import { InMemoryCheckInRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-checkIn-repository";
import { InMemoryGymRepositoryTest } from "@/repositories/inMemoryRepositoryTests/memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

let repository: InMemoryCheckInRepositoryTest;
let gymRepository: InMemoryGymRepositoryTest;
let useCase: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    repository = new InMemoryCheckInRepositoryTest();
    gymRepository = new InMemoryGymRepositoryTest();
    useCase = new CheckInUseCase(repository, gymRepository);
    vi.useFakeTimers();

    //fazendo criação de academina de forma direta no memory-bd via push para teste
    gymRepository.bd.push({
      id: "gym-01",
      name: "Gym 01",
      created_at: new Date(),
      description: "Gym 01",
      phone: "123456789",
      latitude: new Decimal(-7.2034877), //new Decimal(0) é para converter o valor para decimal, é um tipo específico do prisma
      longitude: new Decimal(-48.2277983),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await useCase.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -7.2034877,
      userLongitude: -48.2277983,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 21, 0, 0));

    await useCase.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -7.2034877,
      userLongitude: -48.2277983,
    });

    await expect(
      useCase.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -7.2034877,
        userLongitude: -48.2277983,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in but on diferents days", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 21, 0, 0));

    await useCase.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -7.2034877,
      userLongitude: -48.2277983,
    });

    vi.setSystemTime(new Date(2023, 0, 2, 21, 0, 0));

    await expect(
      useCase.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -7.2034877,
        userLongitude: -48.2277983,
      })
    ).resolves.toBeTruthy();
  });

  it("should not be able to check in on distant gym", async () => {
    gymRepository.bd.push({
      id: "gym-02",
      name: "Gym 02",
      created_at: new Date(),
      description: "Gym 02",
      phone: "123456789",
      latitude: new Decimal(-7.2034877), //new Decimal(0) é para converter o valor para decimal, é um tipo específico do prisma
      longitude: new Decimal(-48.2277983),
    });

    await expect(
      useCase.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -27.2034877,
        userLongitude: -49.2277983,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
