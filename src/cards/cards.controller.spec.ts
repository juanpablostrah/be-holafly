import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { JwtService } from '@nestjs/jwt';

describe('CardsController', () => {
  let cardsController: CardsController;
  let cardsService: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        CardsService,
        JwtService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('signed-token'),
            verify: jest.fn().mockReturnValue({ userId: 1 }),
          },
        },
        {
          provide: CardsService,
          useValue: {
            getAllCards: jest.fn().mockResolvedValue([]),
            findByuserId: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    cardsController = module.get<CardsController>(CardsController);
    cardsService = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(cardsController).toBeDefined();
  });
});
