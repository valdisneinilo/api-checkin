import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../user.repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepositoryTest implements IUsersRepository {
  public bd: User[] = [];

  async findUserById(id: string) {
    const user = this.bd.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.bd.find((user) => user.email === email);
    if (!user) return null;
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    };

    this.bd.push(user);

    return user;
  }
}
