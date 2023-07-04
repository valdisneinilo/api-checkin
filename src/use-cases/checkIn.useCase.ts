import { ICheckInsRepository } from "@/repositories/checkIn.repository";
import { IGymRepository } from "@/repositories/gym.repository";
import { Checkin } from "@prisma/client";
import { NotFound } from "./errors/notFound.error";
import { Decimal } from "@prisma/client/runtime/library";

interface ICheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckInResponse {
  checkIn: Checkin;
}

export class CheckInUseCase {
  constructor(
    private repository: ICheckInsRepository,
    private gymRepository: IGymRepository
  ) {}

  async execute({ userId, gymId }: ICheckInRequest): Promise<ICheckInResponse> {
    const gymExists = await this.gymRepository.findGymById(gymId);

    if (!gymExists) {
      throw new NotFound("Gym");
    }

    const checkInExists = await this.repository.findByIdUserOnDate(
      userId,
      new Date()
    );

    if (checkInExists) {
      throw new Error("😉 User already checked in today");
    }

    const checkIn = await this.repository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
