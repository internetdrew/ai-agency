import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { router, createContext } from "./trpc";
import dotenv from "dotenv";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import { clientsRouter } from "./routers/clients";
import { personasRouter } from "./routers/personas";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const appRouter = router({
  clients: clientsRouter,
  personas: personasRouter,
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

export type AppRouter = typeof appRouter;
