import { createNextPageApiHandler } from "uploadthing/next-legacy";

import { fileRouter } from "~/server/uploadthing";
// TODO: remove or make use of this
const handler = createNextPageApiHandler({
	router: fileRouter,
});

export default handler;
