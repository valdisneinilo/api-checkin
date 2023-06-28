import { ICheckInsRepository } from "@/repositories/checkIn.repository";
import { Checkin } from "@prisma/client";

interface IChecInRequest {
  userId: string;
  gymId: string;
}
interface IChecInResponse {
  checkIn: Checkin;
}

export class CheckInUseCase {
  constructor(private repository: ICheckInsRepository) {}

  async execute({ userId, gymId }: IChecInRequest): Promise<IChecInResponse> {
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
