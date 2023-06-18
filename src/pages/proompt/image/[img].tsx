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
import { useCallback, useEffect, useState } from "react";
import { type ImageSubmission } from "@prisma/client";

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
	const { mutateAsync, isLoading: generation } =
		api.image.generateImageProompt.useMutation();

	const [submissions, setSubmissions] = useState<Partial<ImageSubmission>[]>(
		[]
	);

	const [selectedSubmission, setSelectedSubmission] =
		useState<Partial<ImageSubmission>>();

	const [positivePrompt, setPositivePrompt] = useState("");
	const [negativePrompt, setNegativePrompt] = useState("");
	const [seed, setSeed] = useState(0);

	useEffect(() => {
		if (!data?.img && !isLoading) {
			void router.push("/");
		}
		if (data?.img) {
			setSubmissions(data.img.submissions);
			setSelectedSubmission(data.img.submissions[0]);
		}
	}, [data, isLoading, router]);

	const handleSubmit = useCallback(async () => {
		if (!data?.img) return;
		const { imgPromptJson, submission, message } = await mutateAsync({
			img: data.img.id,
			positivePrompt,
			negativePrompt,
			seed,
		});
		console.log(imgPromptJson, submission, message);

		if (!!submission) setSubmissions((prev) => [...prev, submission]);
		setSelectedSubmission(submission);

		// mutate(generatedData);
	}, [data?.img, mutateAsync, positivePrompt, negativePrompt, seed]);

	// capture the cmd + enter keypress
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" && e.metaKey) {
				void handleSubmit();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleSubmit]);

	return (
		<AppLayout>
			<div className="grid min-h-[calc(100vh-56px)] w-full grid-cols-8">
				<div className="col-span-2 flex h-full w-full flex-col justify-between bg-primary-900 shadow-inner">
					<div className="h-full w-full">
						<div className="bor der-r mb-4 flex h-10 w-full items-center justify-between border-primary-900 bg-primary-800 p-1">
							<p className="tex t-lg font-bold">Proompt Lab</p>
						</div>
						<div className="flex h-fit flex-col items-start justify-start gap-4 border-b border-primary-800 pb-4">
							<div className="relative ml-4">
								<div className="absolute -left-4 top-0 h-full w-1 bg-indigo-900"></div>
								<p className="font-regular text-sm">
									Text prompt:
								</p>
								<p className="text-xs text-primary-600">
									Describe the image you want to generate.
								</p>
							</div>
							<ClosableInput
								title="Positive Prompt"
								handleColor="#22c55e"
								placeHolder="What do you see in this image?"
								value={positivePrompt}
								setValue={setPositivePrompt}
							/>
							<ClosableInput
								title="Negative Prompt"
								handleColor="#ef4444"
								placeHolder="What do you NOT want to see in this image?"
								value={negativePrompt}
								setValue={setNegativePrompt}
							/>
						</div>
						<div className="flex h-fit flex-col items-start justify-start gap-4 border-b border-primary-800 p-4">
							<div className="relative">
								<p className="font-regular text-sm">
									Seed:{" "}
									<span className="text-xs text-indigo-600">
										Advanced
									</span>
								</p>
								<div className="absolute -left-4 top-0 h-full w-1 bg-indigo-900"></div>
								<p className="text-xs text-primary-600">
									Leave blank for random (range: 0-4294967295)
								</p>
							</div>
							<input
								className="h-10 w-full rounded-md border border-primary-700 bg-primary-800 p-2 text-sm text-stone-100 focus:outline-none focus:ring-0"
								type="number"
								placeholder="Enter a seed"
								value={seed}
								max={4294967295}
								onChange={(e) =>
									setSeed(parseInt(e.target.value))
								}
							/>
						</div>
					</div>
					<button
						onClick={() => void handleSubmit()}
						className="flex h-16 items-center justify-center rounded-b-md bg-indigo-800 text-xl font-bold text-white transition-all duration-100 ease-in-out hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={generation || !positivePrompt}
					>
						{!generation ? (
							<>
								Generate{" "}
								<span className="text-base font-semibold text-primary-200">
									&nbsp;(⌘ + ENTER)
								</span>
							</>
						) : (
							<div className="flex items-center justify-center">
								<Lottie
									animationData={loading}
									className="h-16 w-16"
								/>
								{/* <p className="ml-2">Generating...</p> */}
							</div>
						)}
						{/* <button className="font-bold text-lg hover:brightness-105 transition-all duration-200 ease-in-out text-white rounded-md px-4 py-2"
						>Generate</button> */}
					</button>
				</div>
				<div className="col-span-3 flex h-full flex-col border-l border-primary-800">
					<div className="bo rder-r mb-2 flex h-10 w-full items-center justify-between border-primary-900 bg-primary-800 p-1">
						<p className="tex t-lg font-bold">Proompted Image</p>
						{/* <p className="text-sm text-primary-400">
							500px by 500px
						</p> */}
					</div>
					<div className="mx-auto flex min-h-[60%] items-center justify-center">
						{isLoading ? (
							<div className="flex h-full w-96 items-center justify-center">
								<Lottie
									animationData={loading}
									className="h-20 w-20"
								/>
							</div>
						) : !selectedSubmission ? (
							<div className="h-full w-96">
								<Lottie
									animationData={empty}
									className="h-full w-full"
								/>
								<p className="text-center text-primary-400">
									No proompted image yet. Generate one!
								</p>
							</div>
						) : (
							<div className="relative flex h-full w-96 flex-col items-center justify-center">
								{/* <div className=" h-10 w-full flex justify-center items-center rounded-t-md" style={{
										background: `linear-gradient(90deg, ${40 < 50 ? "#ef4444" : "#22c55e"} ${40}%, #1f2937 ${40}%)`
									}}>
										<p className="text-sm font-bold text-primary-200 bg-primary-800 p-1 px-2 rounded-md">
											{/* {selectedSubmission.score} * /}
											100%
										</p>
									</div> */}
								{/* eslint-disable-next-line @next/next/no-img-element*/}
								<img
									src={
										selectedSubmission.base64
											? `data:image/png;base64,${selectedSubmission.base64}`
											: ""
									}
									width={512}
									height={512}
									alt="Generated Image"
									className="object-contain"
								/>
								{/* Score */}
							</div>
						)}
					</div>
					<div className="grow p-4">
						<div className="flex items-center justify-center">
							<p className="font-bold">Last Submission Details:</p>
							<div className="ml-4 h-0 grow border-t border-primary-800" />
						</div>
						<div className="flex flex-col items-start justify-center gap-4">
							<div className="relative mt-2">
								<div className="absolute -left-4 top-0 h-full w-1 bg-green-900" />
								<p className="text-sm text-primary-400">
									{selectedSubmission?.positivePrompt}
								</p>
							</div>
							<div className="relative">
								<div className="absolute -left-4 top-0 h-full w-1 bg-red-900" />
								<p className="text-sm text-primary-400">
									{selectedSubmission?.negativePrompt}
								</p>
							</div>
							{/* <div className="mx-4 h-0 border-t border-primary-800 w-11/12" /> */}
							{/* Seed */}

							<div className="relative">
								<div className="absolute -left-4 top-0 h-full w-1 bg-indigo-900" />
								<p className="text-sm text-primary-400">
									<span className="font-bold">Seed:</span>{" "}
									{selectedSubmission?.seed?.toString(10)}
								</p>
							</div>


							<p className="text-sm text-primary-400 bg-indigo-800 p-2 px-4 rounded-md">
								<span className="font-bold">
									Submission Score:
								</span>{" "}
								{selectedSubmission?.score}
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
					<div className="flex min-h-[60%] w-full flex-col items-center justify-center">
						{isLoading || !data || !data.img ? (
							<Lottie
								animationData={loading}
								className="h-20 w-20"
							/>
						) : (
							// <Image
							// 	// src={`https://uploadthing.com/f/${data?.img?.utID}`}
							// 	src={data?.img?.base64}
							// 	alt="Picture of the author"
							// 	className="rounded-md border-4 border-primary-700"
							// 	width={500}
							// 	height={500}
							// />
							<Image
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								src={
									data?.img?.base64
										? data?.img?.base64
										: `https://uploadthing.com/f/${data?.img?.utID}`
								}
								alt="Picture of the author"
								// className="rounded-md"
								width={512}
								height={512}
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
