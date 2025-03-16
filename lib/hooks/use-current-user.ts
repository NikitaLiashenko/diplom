'use client';

import { useSession } from 'next-auth/react';

/**
 * Used for client components
 * @returns
 */

export const useCurrentUser = () => {
	const { data: session } = useSession({
		required: true
	});
	return session?.user;
}
