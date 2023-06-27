import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ICheckInsRepository } from "../checkIn.repository";

export class PrismaCheckInRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = await prisma.checkin.create({
      data,
    });
    return checkIn;
  }
}
