import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps, type AppType } from "next/app";
import type { NextComponentType  } from "next";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import AuthGuard from "~/components/Providers/AuthGuard";

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
