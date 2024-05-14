import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { UtilsModule } from 'src/services/utils/utils.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UtilsModule, PrismaModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
