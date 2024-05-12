import { UserEntity } from '@repo/models';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';

async function getUsers(): Promise<UserEntity[]> {
	const url = 'http://localhost:8000/users';
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}

	return response.json();
}

async function UsersPage() {
	const users = await getUsers();
	return (
		<div className="p-6">
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
				{users.map((user) => (
					<Card className="group">
						<CardContent className="p-6 flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<div className="text-lg">
									Email: {user.email}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default UsersPage;
