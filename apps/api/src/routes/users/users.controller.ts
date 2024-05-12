import { Controller, Get, UseGuards } from '@nestjs/common';
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
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
