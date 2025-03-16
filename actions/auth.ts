import { auth } from '@/auth'
import { UnauthorizedError } from '@/error'
import { User } from 'next-auth'
import { getLocale, getMessages } from 'next-intl/server'

/**
 * Used for server components to get user or undefined
 * Anything which is server-side
 * @returns
 */
export const currentUserOptional = async (): Promise<User | undefined> => {
	const session = await auth()
	return session?.user
}

/**
 * Used for server components to get user or throw error if user doesn't exist
 * Anything which is server-side
 * @returns
 */
export const currentUser = async (): Promise<User> => {
	const session = await auth();
	const locale = await getLocale();
	const messages = await getMessages();

	if (!session?.user?.id || !session.user.id) {
		throw new UnauthorizedError(locale, messages);
	}
	return session.user;
}