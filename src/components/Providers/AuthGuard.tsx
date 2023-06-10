import { useAuth } from "~/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!isAuthenticated) {
			void router.push("/login");
		}
	}, [isAuthenticated, router]);

	return <>{children}</>;
};

export default AuthGuard;