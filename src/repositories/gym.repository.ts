import type { Gym, Prisma } from "@prisma/client";

export interface IGymRepository {
  findGymById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
