import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const clientsRouter = router({
  getClients: publicProcedure.query(async () => {
    return ["client1", "client2", "client3"];
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return `Created client ${input.name}`;
    }),
});
