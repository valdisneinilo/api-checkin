import { Prisma, Checkin } from "@prisma/client";
import { ICheckInsRepository } from "../checkIn.repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";
import { GetResult } from "@prisma/client/runtime";

export class InMemoryCheckInRepositoryTest implements ICheckInsRepository {
  public bd: Checkin[] = [];

  async findByIdUserOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");

    const checkIn = this.bd.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);
      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkIn) return null;
    return checkIn;
  }

  async findManyByIdUser(userId: string, page: number) {
    const checkIns = this.bd
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 10, page * 10);

    return checkIns;
  }

  async getCheckInsCount(userId: string) {
    const checkInsCount = this.bd.filter(
      (checkIn) => checkIn.user_id === userId
    ).length;

    return checkInsCount;
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
