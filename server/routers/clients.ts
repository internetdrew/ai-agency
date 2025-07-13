import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const clientsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.client.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const client = await ctx.prisma.client.create({
        data: { name: input.name },
      });
      return client;
    }),
});
