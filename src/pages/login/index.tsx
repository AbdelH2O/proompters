import { signIn } from "next-auth/react";

const Login = () => {

	const handleLogin = () => {
		void signIn("auth0", {
			callbackUrl: "/api/auth/callback/auth0",
		});
	};

	return (
		<div>
			<h1>Login</h1>
			<button onClick={handleLogin}>Sign In</button>
		</div>
	);
};

export default Login;