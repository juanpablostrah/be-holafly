import { ExecutionContext } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testSecret', // Configura el secreto JWT para las pruebas
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'AuthGuard',
          useValue: {
            canActivate: (context: ExecutionContext) => {
              const request = context.switchToHttp().getRequest();
              request.user = { userId: 1 }; // Simula un usuario autenticado
              return true;
            },
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user profile', async () => {
    const user = { id: 1, name: 'julio', email: 'julio@gmail.com', password: bcrypt.hashSync('password123', 10) };
    jest.spyOn(service, 'findById').mockResolvedValue(user);

    const result = await controller.getProfile({ user: { userId: 1 } });
    expect(result).toEqual({ id: user.id, name: user.name });
  });
});
