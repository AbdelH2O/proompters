import { z } from "zod";
import {
	createTRPCRouter,
	// publicProcedure,
	protectedProcedure,
} from "~/server/api/trpc";
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
			if(!img) {
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

	// getImageProompts: protectedProcedure
		
});
