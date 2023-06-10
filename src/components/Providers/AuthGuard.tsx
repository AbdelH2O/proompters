import { useAuth } from "~/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			void router.push("/login");
		}
		if(isAuthenticated && !isLoading && router.pathname === "/login") {
			void router.push("/dashboard");
		}
	}, [isAuthenticated, isLoading, router]);

	return <>{children}</>;
};

export default AuthGuard;