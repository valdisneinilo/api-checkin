import type { Gym, Prisma } from "@prisma/client";

export interface IGymRepository {
  findGymById(id: string): Promise<Gym | null>;
  searchMany(name: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
