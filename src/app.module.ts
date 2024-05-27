import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
