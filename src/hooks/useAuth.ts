import { useSession } from "next-auth/react";

export function useAuth() {
	const { data: session, status } = useSession();

	if(status === "loading") {
		return {
			session: null,
			isLoading: true,
			isAuthenticated: false,
		};
	}

	if(session === null) {
		return {
			session: null,
			isLoading: false,
			isAuthenticated: false,
		};
	}
	return {
		session,
		isLoading: false,
		isAuthenticated: true,
	};
}
