import { Gym } from "@prisma/client";
import { IGymRepository } from "@/repositories/gym.repository";

interface ISearchGynsRequest {
  name: string;
  page: number;
}

interface ISearchGynsResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private repository: IGymRepository) {}

  async execute({
    name,
    page,
  }: ISearchGynsRequest): Promise<ISearchGynsResponse> {
    const gyms = await this.repository.searchMany(name, page);

    return {
      gyms,
    };
  }
}
