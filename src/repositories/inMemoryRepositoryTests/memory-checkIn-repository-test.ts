import { Prisma, Checkin } from "@prisma/client";
import { ICheckInsRepository } from "../checkIn.repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepositoryTest implements ICheckInsRepository {
  public bd: Checkin[] = [];

  async findByIdUserOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.bd.find((item) => item.user_id === userId);

    if (!checkInOnSameDate) {
      return null;
    }
    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date() : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    };

    this.bd.push(checkIn);

    return checkIn;
  }
}
