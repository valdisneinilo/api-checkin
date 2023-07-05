import { Checkin } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/checkIn.repository";

interface IGetHistoryCheckinRequest {
  userId: string;
  page: number;
}
interface IGetHistoryCheckinResponse {
  checkIns: Checkin[];
}

export class GetHistoryCheckinUseCase {
  constructor(private repository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IGetHistoryCheckinRequest): Promise<IGetHistoryCheckinResponse> {
    const checkIns = await this.repository.findManyByIdUser(userId, page);

    return { checkIns };
  }
}
