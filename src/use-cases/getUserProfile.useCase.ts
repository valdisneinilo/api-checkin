import { IUsersRepository } from "@/repositories/user.repository";
import { User } from "@prisma/client";
import { NotFound } from "./errors/notFound.error";

interface IGetUserProfileRequest {
  id: string;
}
interface IGetUserProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({
    id,
  }: IGetUserProfileRequest): Promise<IGetUserProfileResponse> {
    const user = await this.repository.findUserById(id);

    if (!user) {
      throw new NotFound("User");
    }

    return {
      user,
    };
  }
}
