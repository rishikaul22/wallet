import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
const { hash } = require("bcrypt");

export const userRouter = createTRPCRouter({
  signUpUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const password = await hash(input.password, 12);
      console.log("pas", password);
      return ctx.db.user.create({
        data: {
          name: input.name,
          password: password,
          email: input.email,
        },
      });
    }),
});
