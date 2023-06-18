import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps, type AppType } from "next/app";
import type { NextComponentType  } from "next";
import { api } from "~/utils/api";
import AuthGuard from "~/components/Providers/AuthGuard";
import Loader from "~/components/Loader";
import "~/styles/globals.css";

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps<{ session: Session | null}> & {
  Component: NextComponentType & {auth?: boolean} // add auth type
}

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}: CustomAppProps) => {
	return (
		<SessionProvider session={session}>
			<Loader />
			{
				Component.auth ? (
					<AuthGuard>
						<Component {...pageProps} />
					</AuthGuard>
				) : (
					<Component {...pageProps} />
				)
			}
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
