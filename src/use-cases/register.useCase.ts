import { hash } from "bcryptjs";
import { IUsersRepository } from "@/repositories/user-repository";

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
      throw new Error("😒 Email already exists");
    }

    this.repository.create({
      name,
      email,
      password: password_hash,
    });
  }
}
