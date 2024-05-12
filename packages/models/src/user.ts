import { User, UserProfile } from '@repo/database';

export class UserEntity implements User {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	emailVerified: Date | null;
	passwordHash: string;
}

export class UserProfileEntity implements UserProfile {
	id: string;
	firstName: string | null;
	lastName: string | null;
	avatar: string | null;
	userId: string;
}

export class UserWithProfile extends UserEntity {
	UserProfile: UserProfileEntity;
}
