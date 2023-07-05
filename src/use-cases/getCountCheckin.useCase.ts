import { ICheckInsRepository } from "@/repositories/checkIn.repository";

interface ICountCheckinRequest {
  userId: string;
}
interface ICountCheckinResponse {
  checkIns: number;
}

export class GetCountCheckinUseCase {
  constructor(private repository: ICheckInsRepository) {}

  async execute({
    userId,
  }: ICountCheckinRequest): Promise<ICountCheckinResponse> {
    const checkIns = await this.repository.getCheckInsCount(userId);

    return { checkIns };
  }
}
