import {
  Controller,
  Response,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto } from '@repo/models';
import { Response as Res } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Response() res: Res,
    @Body(ValidationPipe) signInDto: SignInDto,
  ) {
    const signIn = await this.authService.signIn(signInDto);
    res.header('Set-Cookie', `sessionToken=${signIn.sessionToken}`);
    res.send(signIn.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body(ValidationPipe) signInDto: SignUpDto) {
    return this.authService.signUp(signInDto);
  }

  @UseGuards(AuthGuard)
  @Post('sign-out')
  async signOut(@Response() res: Res) {
    //remove sessionToken from cookie
    res.clearCookie('sessionToken');
    return 'sign-out';
  }
}
