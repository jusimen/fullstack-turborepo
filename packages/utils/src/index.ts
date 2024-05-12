export class Utils {
	generateRandomToken(len: number): string {
		let sRnd = '';
		const sChrs =
			'0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
		for (let i = 0; i < len; i++) {
			const randomPoz = Math.floor(Math.random() * sChrs.length);
			sRnd += sChrs.substring(randomPoz, randomPoz + 1);
		}
		return sRnd;
	}

	slugify(string: string): string {
		return string
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^\w\s-]/g, '') // Remove special characters except hyphen and whitespace
			.replace(/\s+/g, '-') // Replace spaces with hyphens
			.replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
			.toLowerCase();
	}
}
