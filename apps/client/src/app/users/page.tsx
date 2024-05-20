export const dynamic = 'force-dynamic';

import { UserWithProfile } from '@repo/models';
import { Avatar, AvatarImage } from '@repo/ui/components/ui/avatar';
import { Card } from '@repo/ui/components/ui/card';

async function getUsers(): Promise<UserWithProfile[]> {
	const url = process.env.NEXT_PUBLIC_API_URL + '/users?profile=true';
	const response = await fetch(url, {
		cache: 'no-cache',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}

	return response.json();
}

async function UsersPage() {
	const users = await getUsers();
	return (
		<div className="p-6 flex flex-col gap-4">
			<h1 className="text-3xl">Users</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
				{users.map((user) => (
					<Card className="p-4" key={user.id}>
						<div className="flex gap-4 items-center">
							<Avatar>
								<AvatarImage
									src={user.UserProfile?.avatar || ''}
								/>
							</Avatar>
							<div className="flex flex-col">
								<div className="text-lg">
									{user.UserProfile?.firstName}{' '}
									{user.UserProfile?.lastName}
								</div>
								<span className="text-slate-500 text-sm">
									{user.email}
								</span>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

export default UsersPage;
