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
    const checkIn = await this.repository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
