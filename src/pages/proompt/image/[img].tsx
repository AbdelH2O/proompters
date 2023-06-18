// import { ImageProompt } from "@prisma/client";
import Lottie from "lottie-react";
import Image from "next/image";
import { useRouter } from "next/router";
import AppLayout from "~/components/AppLayout";
// import { useState } from "react";
import { api } from "~/utils/api";

import loading from "../../../static/loading.json";
import empty from "../../../static/empty.json";
import ClosableInput from "~/components/ClosableInput";
import { useEffect } from "react";

const ProomptImage = () => {
	const router = useRouter();
	const img = router.query.img;
	const { data, isLoading } = api.image.getImageProompt.useQuery(
		{
			img: img as string,
		},
		{
			enabled: !!img,
		}
	);

	useEffect(() => {
		if(!data?.img && !isLoading) {
			void router.push("/");
		}
	}, [data, isLoading, router]);

	return (
		<AppLayout>
			{/* <div>
				<h1 className="text-white">Proompt Image</h1>
				{
					isLoading || !data || !data.img ? <p>Loading...</p> :
						<Image
							src={`https://uploadthing.com/f/ ${data?.img?.utID}`}
							alt="Picture of the author"
							width={500}
							height={500}
						/>
				}
			</div> */}
			<div className="grid min-h-[calc(100vh-56px)] w-full grid-cols-8">
				<div className="col-span-2 h-full w-full bg-primary-900 shadow-inner flex flex-col justify-between">
					<div className="h-full w-full">
						<div className="mb-4 flex h-10 w-full items-center justify-between bor der-r border-primary-900 bg-primary-800 p-1">
							<p className="tex t-lg font-bold">Proompt Lab</p>
						</div>
						<div className="flex flex-col items-start justify-start h-fit gap-4 border-b border-primary-800 pb-4">
							<div className="ml-4 relative">
								<div className="absolute top-0 -left-4 w-1 h-full bg-indigo-900"></div>
								<p className="font-regular text-sm">Text prompt:</p>
								<p className="text-primary-600 text-xs">
									Describe the image you want to generate.
								</p>
							</div>
							<ClosableInput 
								title="Positive Prompt"
								handleColor="#22c55e"
								placeHolder="What do you see in this image?"
							/>
							<ClosableInput
								title="Negative Prompt"
								handleColor="#ef4444"
								placeHolder="What do you NOT want to see in this image?"
							/>
						</div>
						<div className="flex flex-col items-start justify-start h-fit gap-4 border-b border-primary-800 p-4">
							<div className="relative">
								<p className="font-regular text-sm">Seed: <span className="text-indigo-600 text-xs">
									Advanced
								</span></p>
								<div className="absolute top-0 -left-4 w-1 h-full bg-indigo-900"></div>
								<p className="text-primary-600 text-xs">
									Leave blank for random.
								</p>
							</div>
							<input
								className="h-10 w-full rounded-md border-0 bg-primary-800 p-2 text-sm focus:outline-none focus:ring-0 text-stone-100"
								type="text"
								placeholder="Enter a seed"
							/>
						</div>
					</div>
					<button className="h-16 bg-indigo-800 flex justify-center items-center font-bold text-xl text-white hover:brightness-105 transition-all duration-100 ease-in-out rounded-b-md">
						Generate <span className="font-semibold text-base text-primary-200">&nbsp;(⌘ + ENTER)</span>
						{/* <button className="font-bold text-lg hover:brightness-105 transition-all duration-200 ease-in-out text-white rounded-md px-4 py-2"
						>Generate</button> */}
					</button>
				</div>
				<div className="col-span-3 flex h-full flex-col border-l border-primary-800">
					<div className="mb-2 flex h-10 w-full items-center justify-between bo rder-r border-primary-900 bg-primary-800 p-1">
						<p className="tex t-lg font-bold">Proompted Image</p>
						{/* <p className="text-sm text-primary-400">
							500px by 500px
						</p> */}
					</div>
					<div className="mx-auto min-h-[60%]">

						<div className="h-full w-96 bor der border-primary-700">
							<Lottie
								animationData={empty}
								className="w-full h-full"
							/>
							<p className="text-center text-primary-400">
								No proompted image yet. Generate one!
							</p>
						</div>
					</div>
				</div>
				<div className="col-span-3 flex h-full flex-col border-l border-primary-800">
					<div className="mb-2 flex h-10 w-full items-center justify-between bg-primary-800 p-1">
						<p className="tex t-lg font-bold">Target</p>
						<p className="text-sm text-primary-400">
							500px by 500px
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center min-h-[60%]">
						{isLoading || !data || !data.img ? (
							<Lottie
								animationData={loading}
								className="w-20 h-20"
							/>
						) : (
							<Image
								src={`https://uploadthing.com/f/${data?.img?.utID}`}
								alt="Picture of the author"
								className="rounded-md border-4 border-primary-700"
								width={500}
								height={500}
							/>
						)}
					</div>
					<div className="grow p-4">
						<div className="flex items-center justify-center">
							<p className="font-bold">Hint keywords:</p>
							<div className="ml-4 h-0 grow border-t border-primary-800" />
						</div>
						<div className="flex items-center justify-center">
							<p className="text-sm text-primary-400">
								{data?.img?.hints}
							</p>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

ProomptImage.auth = true;

export default ProomptImage;

// This is the code for the upload button to add a test image challenge
// import { UploadButton } from "@uploadthing/react";

// import type { fileRouter } from "~/server/uploadthing";
// // You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
// import "@uploadthing/react/styles.css";

// export default function Home() {
// 	return (
// 		<main className="flex min-h-screen flex-col items-center justify-between p-24">
// 			<UploadButton<fileRouter>
// 				endpoint="imageUploader"
// 				onClientUploadComplete={(res) => {
// 					// Do something with the response
// 					console.log("Files: ", res);
// 					alert("Upload Completed");
// 				}}
// 				onUploadError={(error: Error) => {
// 					// Do something with the error.
// 					alert(`ERROR! ${error.message}`);
// 				}}
// 			/>
// 		</main>
// 	);
// }
