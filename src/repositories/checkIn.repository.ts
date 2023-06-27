import { Prisma, Checkin } from "@prisma/client";

export interface ICheckInsRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
}
