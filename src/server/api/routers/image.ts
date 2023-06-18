import { z } from "zod";
import { env } from "~/env.mjs";
import {
	createTRPCRouter,
	// publicProcedure,
	protectedProcedure,
} from "~/server/api/trpc";
// import { observable } from "@trpc/server/observable";

export const imageRouter = createTRPCRouter({
	getImageProompt: protectedProcedure
		.input(z.object({ img: z.string().cuid() }))
		.query(async ({ input, ctx }) => {
			const img = await ctx.prisma.imageProompt.findUnique({
				where: {
					id: input.img,
				},
				include: {
					submissions: {
						select: {
							id: true,
							positivePrompt: true,
							negativePrompt: true,
							seed: true,
							createdAt: true,
							base64: true,
						},
						// limit: 1,
						orderBy: {
							createdAt: "desc",
						},
						take: 3,
					}
				}
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
		.mutation(async ({ input, ctx }) => {
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
			console.log(input);

			const prompts = [
				{
					text: input.positivePrompt,
					weight: 1,
				},
			];

			if (input.negativePrompt) {
				prompts.push({
					text: input.negativePrompt,
					weight: -1,
				});
			}

			console.log(prompts);
			
			
			const imgPrompt = await fetch(
				`${env.STABILITY_HOST}/v1/generation/stable-diffusion-512-v2-1/text-to-image`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${env.STABILITY_API_KEY}`,
					},
					body: JSON.stringify({
						text_prompts: prompts,
						samples: 1,
						width: img.width,
						height: img.height,
						cfg_scale: 30,
						seed: input.seed ?? 0,
					}),
				}
			);
			const imgPromptJson = (await imgPrompt.json()) as StabilityResponse;
			console.log(imgPromptJson);
			
			if(!imgPromptJson.artifacts[0]) {
				return {
					imgPromptJson: null,
					message: "Image not found",
				};
			}
			const submission = await ctx.prisma.imageSubmission.create({
				data: {
					base64: imgPromptJson.artifacts[0].base64,
					seed: imgPromptJson.artifacts[0].seed,
					imageProomptId: img.id,
					utID: img.utID,
					negativePrompt: input.negativePrompt,
					positivePrompt: input.positivePrompt,
				},
			});
			return {
				imgPromptJson,
				submission,
				message: "Success",
			};
		}),

	// getImageProompts: protectedProcedure
});
