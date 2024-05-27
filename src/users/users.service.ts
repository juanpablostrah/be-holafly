import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export type User = {
  id: number,
  name: string,
  email: string,
  password: string
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'julio',
      email: 'julio@gmail.com',
      password: bcrypt.hashSync('password123', 10),
    },
    {
      id: 2,
      name: 'maria',
      email: 'maria@gmail.com',
      password: bcrypt.hashSync('password123', 10),
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}
