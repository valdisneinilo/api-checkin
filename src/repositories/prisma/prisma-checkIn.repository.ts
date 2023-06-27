import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ICheckInRepository } from "../checkIn.repository";

export class PrismaCheckInRepository implements ICheckInRepository {
  async create(data: Prisma.CheckinUncheckedCreateInput) {
    const checkIn = await prisma.checkin.create({
      data,
    });
    return checkIn;
  }
}
