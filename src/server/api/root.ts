import { postRouter } from "~/server/api/routers/post";
import { transactionRouter } from "~/server/api/routers/transaction";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/userregister";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  transaction: transactionRouter,
  userregister: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
