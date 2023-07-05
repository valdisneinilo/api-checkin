import { Gym, Prisma } from "@prisma/client";
import { IGymRepository } from "../gym.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryGymRepositoryTest implements IGymRepository {
  public bd: Gym[] = [];

  async findGymById(id: string) {
    const gym = this.bd.find((gym) => gym.id === id);
    if (!gym) return null;
    return gym;
  }

  async searchMany(name: string, page: number) {
    return this.bd
      .filter((gym) => gym.name.includes(name))
      .slice((page - 1) * 10, page * 10);
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.bd.push(gym);

    return gym;
  }
}
