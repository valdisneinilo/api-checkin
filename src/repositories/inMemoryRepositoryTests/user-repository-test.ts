import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../user-repository";

export class InMemoryUsersRepositoryTest implements IUsersRepository {
  public bd: User[] = [];

  async findUserByEmail(email: string) {
    const user = this.bd.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "any_id",
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    };

    this.bd.push(user);

    return user;
  }
}
