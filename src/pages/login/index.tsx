import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const handleLogin = async () => {
		await signIn("auth0");
		await router.push("/app");
	};

	useEffect(() => {
		if (session) {
			void router.push("/app");
		}
	}, [session, router]);

	return (
		<div>
			<h1>Login</h1>
			<button onClick={() => void handleLogin()}>Sign In</button>
		</div>
	);
};

export default Login;