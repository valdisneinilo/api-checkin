import { Gym } from "@prisma/client";
import { IGymRepository } from "../gym.repository";

export class InMemoryGymRepositoryTest implements IGymRepository {
  public bd: Gym[] = [];

  async findGymById(id: string) {
    const gym = this.bd.find((gym) => gym.id === id);
    if (!gym) return null;
    return gym;
  }
}
