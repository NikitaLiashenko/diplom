import { type DefaultSession } from 'next-auth'


export type ExtendedUser = DefaultSession['user'] & {
	id: string;
	name: string;
	emailVerified: Date | null;
	weight: number | null;
	height: number | null;
	gender: Gender | null;
	birthDate: Date | null;
	activityLevel: number | null;
	goal: Goal | null;
	isOAuth: boolean;
}

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser
	}

	interface User {
		id: string;
		emailVerified: Date | null;
		weight: number | null;
		height: number | null;
		gender: Gender | null;
		birthDate: Date | null;
		activityLevel: number | null;
		goal: Goal | null;
	}

	interface JWT {
		emailVerified: Date | null;
		weight: number | null;
		height: number | null;
		gender: Gender | null;
		birthDate: Date | null;
		activityLevel: number | null;
		goal: Goal | null;
	}
}
