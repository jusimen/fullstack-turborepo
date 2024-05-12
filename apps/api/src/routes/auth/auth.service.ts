import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { SignInDto, SignUpDto } from '@repo/models';
import { PrismaError } from 'prisma-error-enum';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UtilsService } from 'src/services/utils/utils.service';
import { UserEntity } from '@repo/models';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private utils: UtilsService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  /**
   * Validates a session token.
   * @param sessionToken - The session token to validate.
   * @returns A promise that resolves to a boolean indicating whether the session token is valid or not.
   */
  async validateSessionToken(sessionToken: string): Promise<boolean> {
    const session = await this.prisma.session.findUnique({
      where: { sessionToken },
    });

    if (session) {
      return true;
    }

    return false;
  }

  /**
   * Signs in a user with the provided email and password.
   * @param signInDto - The sign-in data transfer object containing the email and password.
   * @returns An object containing the session token and the user information.
   * @throws UnauthorizedException if the email or password is invalid.
   * @throws InternalServerErrorException if an error occurs while signing in.
   */
  async signIn(
    signInDto: SignInDto,
  ): Promise<{ sessionToken: string; user: UserEntity }> {
    try {
      const { email, password } = signInDto;

      const user = await this.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException(
          'Invalid email or password. Please try again.',
        );
      }

      const sessionToken = randomBytes(256).toString('base64');

      //Delete old session
      await this.prisma.session.deleteMany({
        where: {
          userId: user.id,
        },
      });

      await this.prisma.session.create({
        data: {
          userId: user.id,
          sessionToken: sessionToken,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        },
      });

      return {
        sessionToken: sessionToken,
        user: user,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        message: 'Something went wrong while signing in.',
        error: e,
      });
    }
  }

  /**
   * Creates a new user account with the provided email and password.
   * @param signInDto - The sign up data containing the email and password.
   * @returns A promise that resolves to the created user entity.
   * @throws ConflictException if a user with the same email already exists.
   */
  async signUp(signInDto: SignUpDto): Promise<UserEntity> {
    const { email, password } = signInDto;

    const passwordHash = await bcrypt.hash(password, 10);
    try {
      return await this.prisma.user.create({
        data: {
          email: email,
          passwordHash: passwordHash,
        },
      });
    } catch (error) {
      if (error.code === PrismaError.UniqueConstraintViolation) {
        throw new ConflictException(
          `A User with the email "${email}" already exists.`,
        );
      }
    }
  }

  /**
   * Signs out a user session.
   * @param sessionToken - The session token of the user.
   * @returns A promise that resolves when the session is successfully deleted.
   */
  async signOut(sessionToken: string) {
    return await this.prisma.session.delete({
      where: {
        sessionToken: sessionToken,
      },
    });
  }
}
