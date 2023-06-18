import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { classNames } from "uploadthing/client";
import { useAuth } from "~/hooks/useAuth";
import Image from "next/image";
import Lottie from "lottie-react";

import loading from "../static/loading.json";

const userNavigation = [
	// { name: "Your Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Sign out", href: "#" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading, session } = useAuth();
	const router = useRouter();
	console.log(session);

	return (
		<div className="min-h-screen bg-primary-950">
			<div className="flex items-center justify-between bg-primary-950 px-4 py-2">
				<div className="flex w-full flex-row items-center justify-between gap-4">
					<button
						onClick={() => void router.push("/")}
						className="cursor-pointer rounded-sm bg-indigo-800 p-1 font-ibm text-2xl font-semibold text-white transition-all duration-100 hover:scale-[1.02] hover:brightness-110"
					>
						Proompters
					</button>
					<div className="flex gap-4 text-sm text-primary-400">
						{isLoading ? (
							<Lottie
								animationData={loading}
								className="h-16 w-16"
							/>
						) : isAuthenticated && !!session ? (
							<div className="flex items-center gap-4">
								<div className="flex flex-row gap-1 border border-primary-700 rounded-md p-1 px-2 group hover:bg-primary-900 cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										enableBackground="new 0 0 47.5 47.5"
										viewBox="0 0 47.5 47.5"
										id="droplet"
										className="h-5 w-5"
									>
										<defs>
											<clipPath id="a">
												<path d="M0 38h38V0H0v38Z"></path>
											</clipPath>
										</defs>
										<g
											clipPath="url(#a)"
											transform="matrix(1.25 0 0 -1.25 0 47.5)"
										>
											<path
												fill="#3730a3"
												d="m0 0-10.195 16.678L-19.644.113c-2.2-3.509-2.391-8.074-.081-11.853 3.286-5.373 10.364-7.098 15.811-3.858C1.532-12.357 3.285-5.377 0 0"
												transform="translate(29.344 19.232)"
											></path>
										</g>
									</svg>
									<span className="text-primary-300 whitespace-nowrap select-none group-hover:text-white group-hover:underline">
										{`${session.user.credits} Credits`}
									</span>
									{/* <p className="text-primary-300 text-sm">
										{session.user.name}
									</p>
									<p className="text-primary-400 text-xs">
										{session.user.email}
									</p> */}
								</div>
								<Menu
									as="div"
									className="relative ml-4 flex-shrink-0"
								>
									<div>
										<Menu.Button className="flex rounded-full bg-primary-800 text-sm ring-2 ring-primary-600 ring-opacity-20 focus:outline-none focus:ring-opacity-100">
											<span className="sr-only">
												Open user menu
											</span>
											<Image
												width={32}
												height={32}
												className="h-8 w-8 rounded-full"
												src={
													session?.user?.image ||
													`https://api.dicebear.com/6.x/shapes/svg?seed=${session.user.id}`
												}
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute -right-2 z-40 mt-2 w-48 origin-top-right rounded-md bg-primary-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{userNavigation.map((item) => (
												<Menu.Item key={item.name}>
													{({ active }) => (
														<a
															href={item.href}
															className={classNames(
																active
																	? "bg-primary-700"
																	: "",
																"block px-4 py-2 text-sm text-primary-300"
															)}
														>
															{item.name}
														</a>
													)}
												</Menu.Item>
											))}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						) : (
							<>
								<button
									onClick={() => void router.push("/signup")}
									className="bg-pri mary-700 rounded-sm p-1 px-2 text-base text-primary-400 transition-all duration-100 hover:scale-[1.02] hover:text-white"
								>
									Sign Up
								</button>
								<button
									onClick={() => void router.push("/login")}
									className="rounded-sm bg-indigo-900 p-1 px-2 text-base text-primary-400 transition-all duration-100 hover:scale-[1.02] hover:text-white"
								>
									Login
								</button>
							</>
						)}
					</div>
				</div>
			</div>
			{children}
		</div>
	);
};

export default AppLayout;
