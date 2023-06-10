import { ImageProompt } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

const ProomptImage = () => {
	const router = useRouter();
	const img = router.query.img;
	const { data, isLoading, error } = api.image.getImageProompt.useQuery({
		img: img as string,
	}, {
		enabled: !!img,
	});

	return (
		<div>
			<h1>Proompt Image</h1>
		</div>
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
