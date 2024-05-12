import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Starting seed 🌱');
	const password = await bcrypt.hash('password', 12);

	for (let i = 0; i < 10; i++) {
		await prisma.user.create({
			data: {
				email: faker.internet.email(),
				passwordHash: password,
				UserProfile: {
					create: {
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						avatar: faker.image.avatar(),
					},
				},
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
