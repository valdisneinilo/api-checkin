import { hash } from "bcryptjs";
import { IUsersRepository } from "@/repositories/user.repository";
import { EmailAlreadyExistsErro } from "./errors/register.error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);
    const emailUnique = await this.repository.findUserByEmail(email);

    if (emailUnique) {
      throw new EmailAlreadyExistsErro();
    }

    const user = await this.repository.create({
      name,
      email,
      password: password_hash,
    });

    return { user };
  }
}
