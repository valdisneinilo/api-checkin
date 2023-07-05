import { Gym } from "@prisma/client";
import { IGymRepository } from "@/repositories/gym.repository";

interface CreateGymUseCaseRequest {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private repository: IGymRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.repository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
