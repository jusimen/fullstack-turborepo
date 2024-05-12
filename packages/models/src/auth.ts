import { Session } from '@repo/database';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
	@IsEmail()
	@ApiProperty()
	readonly email: string;

	@IsString()
	@ApiProperty()
	readonly password: string;
}

export class SignUpDto {
	@IsEmail()
	@ApiProperty()
	readonly email: string;

	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	@ApiProperty()
	readonly password: string;
}

export class UpdatePasswordDto {
	@IsString()
	@ApiProperty()
	readonly oldPassword: string;

	@IsString()
	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	@ApiProperty()
	readonly newPassword: string;
}

export class SessionEntity implements Session {
	readonly id: string;
	readonly sessionToken: string;
	readonly userId: string;
	readonly expires: Date;
}
