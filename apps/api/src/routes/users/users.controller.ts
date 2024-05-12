import {
  Controller,
  Get,
  ParseBoolPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Select page',
    required: false,
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    description: 'Select per page',
    required: false,
  })
  @ApiQuery({
    name: 'profile',
    type: Boolean,
    description: 'Include User profile?',
    required: false,
  })
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 50,
    @Query('profile', ParseBoolPipe) profile: boolean = false,
  ) {
    return this.usersService.findAll(+page, +perPage, profile);
  }
}
