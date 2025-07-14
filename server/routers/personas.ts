import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const personasRouter = router({
  list: publicProcedure
    .input(z.object({ clientId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const personas = await ctx.prisma.persona.findMany({
          where: {
            clientId: input.clientId,
          },
        });
        return personas;
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
        description: z.string(),
        clientId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const persona = await ctx.prisma.persona.create({
          data: {
            name: input.name,
            description: input.description,
            clientId: input.clientId,
          },
        });
        return persona;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong creating the client",
        });
      }
    }),
});
