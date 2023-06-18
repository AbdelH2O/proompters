import { z } from "zod";
import {
	createTRPCRouter,
	// publicProcedure,
	protectedProcedure,
} from "~/server/api/trpc";
import { observable } from "@trpc/server/observable";

// import { utapi } from "uploadthing/server";

export const imageRouter = createTRPCRouter({
	getImageProompt: protectedProcedure
		.input(z.object({ img: z.string().cuid() }))
		.query(async ({ input, ctx }) => {
			const img = await ctx.prisma.imageProompt.findUnique({
				where: {
					id: input.img,
				},
			});
			if (!img) {
				return {
					img: null,
					message: "Image not found",
				};
			}
			return {
				img: img,
				message: "Success",
			};
		}),

	generateImageProompt: protectedProcedure
		.input(
			z.object({
				img: z.string().cuid(),
				positivePrompt: z.string(),
				negativePrompt: z.string(),
				seed: z.number().optional(),
			})
		)
		.subscription(({ input, ctx }) => {
			return observable((obs) => {
				// const img = await ctx.prisma.imageProompt.findUnique({
				// 	where: {
				// 		id: input.img,
				// 	},
				// });
				// if (!img) {
				// 	obs.next({
				// 		img: null,
				// 		message: "Image not found",
				// 	});
				// }
				// obs.next({
				// 	img: img,
				// 	message: "Success",
				// });
			});
		})

	// getImageProompts: protectedProcedure
});
