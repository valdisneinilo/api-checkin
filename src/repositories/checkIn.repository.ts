import { Prisma, Checkin } from "@prisma/client";

export interface ICheckInsRepository {
  findByIdUserOnDate(userId: string, date: Date): Promise<Checkin | null>;
  findManyByIdUser(userId: string, page: number): Promise<Checkin[]>;
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
}
