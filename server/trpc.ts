import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { prisma } from "./db";
import superjson from "superjson";

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  req,
  res,
  prisma,
});
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});
export const router = t.router;
export const publicProcedure = t.procedure;
