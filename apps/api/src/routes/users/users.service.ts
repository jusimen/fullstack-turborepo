import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '@repo/models';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find all users
   * @param page - Page number
   * @param perPage - Number of items per page
   * @returns - List of users
   */
  async findAll(page: number = 1, perPage: number = 50): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.user.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
