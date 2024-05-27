import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UsersService, User } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by email', async () => {
    const email = 'julio@gmail.com';
    const user = await service.findOne(email);
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  it('should return undefined for non-existing email', async () => {
    const email = 'nonexistent@gmail.com';
    const user = await service.findOne(email);
    expect(user).toBeUndefined();
  });

  it('should find a user by id', async () => {
    const id = 1;
    const user = await service.findById(id);
    expect(user).toBeDefined();
    expect(user.id).toBe(id);
  });

  it('should return undefined for non-existing id', async () => {
    const id = 999;
    const user = await service.findById(id);
    expect(user).toBeUndefined();
  });
});
