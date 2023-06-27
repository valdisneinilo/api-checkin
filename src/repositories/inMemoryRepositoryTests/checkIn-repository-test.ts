import { Prisma, Checkin } from "@prisma/client";
import { ICheckInsRepository } from "../checkIn.repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepositoryTest implements ICheckInsRepository {
  public bd: Checkin[] = [];

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
