import { Prisma, Checkin } from "@prisma/client";

export interface ICheckInsRepository {
  findByIdUserOnDate(userId: string, date: Date): Promise<Checkin | null>;
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
}
