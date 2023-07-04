import type { Gym } from "@prisma/client";

export interface IGymRepository {
  findGymById(id: string): Promise<Gym | null>;
}
