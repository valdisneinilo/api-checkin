import { ICheckInsRepository } from "@/repositories/checkIn.repository";
import { IGymRepository } from "@/repositories/gym.repository";
import { Checkin } from "@prisma/client";
import { NotFound } from "./errors/notFound.error";
import { getDistanceBetweenCoordinates } from "../utils/distance-between";

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

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInRequest): Promise<ICheckInResponse> {
    const gym = await this.gymRepository.findGymById(gymId);
    if (!gym) {
      throw new NotFound("Gym");
    }

    const checkInExistsAlready = await this.repository.findByIdUserOnDate(
      userId,
      new Date()
    );
    if (checkInExistsAlready) {
      throw new Error("😉 User already checked today");
    }

    const distant = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );

    const maxDistanceKM = 0.1;
    if (distant > maxDistanceKM) {
      throw new Error("🤭 You are too far from the gym");
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
