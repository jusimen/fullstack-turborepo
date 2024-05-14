import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	console.log('🧹 Cleaning database 🧹');
	await prisma.user.deleteMany();

	console.log('🌱 Starting seed 🌱');
	const password = await bcrypt.hash('password', 12);

	//Create 9 users with random data
	for (let i = 0; i < 10; i++) {
		await prisma.user.create({
			data: {
				email: i === 0 ? 'test@mail.com' : faker.internet.email(),
				passwordHash: password,
				UserProfile: {
					create: {
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						avatar: faker.image.avatar(),
					},
				},
				session: {
					create: {
						sessionToken: 'sessionToken' + i,
						expires: new Date(),
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
