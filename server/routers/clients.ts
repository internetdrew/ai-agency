import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const clientsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    try {
      const clients = await ctx.prisma.client.findMany();
      return clients;
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong listing the clients",
      });
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const client = await ctx.prisma.client.create({
          data: { name: input.name },
        });
        return client;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong creating the client",
        });
      }
    }),
});
