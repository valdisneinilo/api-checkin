import { hash } from "bcryptjs";
import { IUsersRepository } from "@/repositories/user-repository";
import { EmailAlreadyExistsErro } from "./errors/register.error";

interface UsersProps {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ name, email, password }: UsersProps) {
    const password_hash = await hash(password, 6);

    const emailUnique = await this.repository.findUserByEmail(email);

    if (emailUnique) {
      throw new EmailAlreadyExistsErro();
    }

    this.repository.create({
      name,
      email,
      password: password_hash,
    });
  }
}
