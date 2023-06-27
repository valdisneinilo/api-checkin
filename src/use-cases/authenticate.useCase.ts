import { IUsersRepository } from "@/repositories/user.repository";
import { InvalidCredentialsError } from "./errors/authenticate.error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
interface IAuthenticateResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
