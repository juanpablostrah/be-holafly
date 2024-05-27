import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService, private readonly jwtService: JwtService,) {}
  

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllCards() {
    return this.cardsService.getAllCards();
  }

  @Get('/for/:id')
  getByUserId(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id, 10);
    return this.cardsService.findByuserId(userId);
  }

  @Post('/for')
  async getByUserToken(@Body('token') token: string): Promise<any> {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub; // Assuming 'sub' contains the user ID

      return this.cardsService.findByuserId(userId);
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
