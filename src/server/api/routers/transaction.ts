import { error } from "console";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getTransactionsById: protectedProcedure.query(({ ctx }) => {
    return ctx.db.transaction.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }),
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    let totalIncome: number = 0,
      totalExpense: number = 0,
      balance: number = 0,
      monthlySavings: number = 0,
      savingsPerMonth: { [key: string]: number } = {};
    transactions.map((transaction) => {
      const monthString = transaction.createdAt.toLocaleString("default", {
        month: "short",
      });
      const yearString = transaction.createdAt.getFullYear().toString();
      const dateString: string = monthString.concat(" ", yearString);
      if (transaction.type === "Income") {
        totalIncome += transaction.amount;
        if (dateString in savingsPerMonth) {
          savingsPerMonth[dateString] += transaction.amount;
        } else {
          savingsPerMonth[dateString] = transaction.amount;
        }
      } else {
        totalExpense += transaction.amount;
        if (dateString in savingsPerMonth) {
          savingsPerMonth[dateString] -= transaction.amount;
        } else {
          savingsPerMonth[dateString] = -transaction.amount;
        }
      }
    });

    balance = totalIncome - totalExpense;

    const numberOfMonths =
      Object.keys(savingsPerMonth).length === 0
        ? 1
        : Object.keys(savingsPerMonth).length;
    monthlySavings = balance / numberOfMonths;
    return { balance, monthlySavings, totalIncome, totalExpense };
  }),
  getSavingsData: protectedProcedure
    .input(z.object({ duration: z.string() }))
    .query(async ({ ctx, input }) => {
      let savingsPerMonth: { [key: string]: number } = {};
      let lteDate = new Date();
      let gteDate = new Date();

      gteDate.setDate(1);

      let savingsInDuration: number = 0;
      let incomeInDuration: number = 0;
      let expenseInDuration: number = 0;
      if (input.duration === "Last Year") {
        gteDate.setFullYear(lteDate.getFullYear() - 1);
        console.log(lteDate, gteDate);
      } else if (input.duration === "Last 6 months") {
        gteDate.setMonth(lteDate.getMonth() - 6);

        console.log(lteDate, gteDate);
      } else if (input.duration === "Last 3 months") {
        gteDate.setMonth(lteDate.getMonth() - 3);

        console.log(lteDate, gteDate);
      } else {
        lteDate = new Date();
        gteDate = new Date();
      }

      const transactions = await ctx.db.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          createdAt: {
            lte: lteDate,
            gte: gteDate,
          },
        },
        orderBy: [
          {
            createdAt: "asc",
          },
        ],
      });
      transactions.map((transaction) => {
        const monthString = transaction.createdAt.toLocaleString("default", {
          month: "short",
        });
        const yearString = transaction.createdAt.getFullYear().toString();
        const dateString: string = monthString.concat(" ", yearString);
        if (transaction.type === "Income") {
          incomeInDuration += transaction.amount;

          if (dateString in savingsPerMonth) {
            savingsPerMonth[dateString] += transaction.amount;
          } else {
            savingsPerMonth[dateString] = transaction.amount;
          }
        } else {
          expenseInDuration += transaction.amount;
          if (dateString in savingsPerMonth) {
            savingsPerMonth[dateString] -= transaction.amount;
          } else {
            savingsPerMonth[dateString] = -transaction.amount;
          }
        }
      });

      let monthValueArray: number[] = Object.values(savingsPerMonth);
      let savingArrayPercent: number[] = [];
      for (let i = 0; i + 1 < Object.keys(monthValueArray).length; i++) {
        const monthSaving1 = monthValueArray[i] as number;
        const monthSaving2 = monthValueArray[i + 1] as number;
        savingArrayPercent[i] = (monthSaving2 - monthSaving1) / monthSaving1;
      }
      let avgSavingPercent: number = 0;
      savingArrayPercent.forEach((num) => (avgSavingPercent += num));
      avgSavingPercent = Number(avgSavingPercent.toFixed(2));
      savingsInDuration = incomeInDuration - expenseInDuration;
      savingsInDuration = savingsInDuration >= 0 ? savingsInDuration : 0;
      return {
        savingsPerMonth,
        savingsInDuration,
        incomeInDuration,
        expenseInDuration,
        avgSavingPercent,
      };
    }),
  getTransactionsGraphDataById: protectedProcedure
    .input(z.object({ duration: z.string() }))
    .query(async ({ ctx, input }) => {
      let incomePerMonth: { [key: string]: number } = {},
        expensePerMonth: { [key: string]: number } = {};
      let lteDate: Date, gteDate: Date;
      if (input.duration === "Last Year") {
        lteDate = new Date();
        gteDate = new Date();
        gteDate.setFullYear(lteDate.getFullYear() - 1);
        console.log(lteDate, gteDate);
      } else if (input.duration === "Last Month") {
        lteDate = new Date();
        gteDate = new Date();
        gteDate.setMonth(lteDate.getMonth() - 1);
        console.log(lteDate, gteDate);
      } else if (input.duration === "Last Week") {
        lteDate = new Date();
        gteDate = new Date();
        gteDate.setDate(lteDate.getDate() - 7);
        console.log(lteDate, gteDate);
      } else {
        lteDate = new Date();
        gteDate = new Date();
      }
      const transactions = await ctx.db.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          createdAt: {
            lte: lteDate,
            gte: gteDate,
          },
        },
        orderBy: [
          {
            createdAt: "asc",
          },
        ],
      });
      // console.log(transactions);
      transactions.map((transaction) => {
        let dateString: string;
        const dayString = transaction.createdAt.getDate().toString();
        const monthString = transaction.createdAt.toLocaleString("default", {
          month: "short",
        });
        const yearString = transaction.createdAt.getFullYear().toString();
        if (input.duration === "Last Week") {
          dateString = dayString.concat(" ", monthString);
        } else if (input.duration === "Last Month") {
          dateString = dayString.concat(" ", monthString);
        } else {
          dateString = monthString.concat(" ", yearString);
        }
        if (transaction.type === "Income") {
          if (dateString in incomePerMonth) {
            incomePerMonth[dateString] += transaction.amount;
          } else {
            incomePerMonth[dateString] = transaction.amount;
          }
          if (!(dateString in expensePerMonth)) {
            expensePerMonth[dateString] = 0;
          }
        } else {
          if (dateString in expensePerMonth) {
            expensePerMonth[dateString] += transaction.amount;
          } else {
            expensePerMonth[dateString] = transaction.amount;
          }
          if (!(dateString in incomePerMonth)) {
            incomePerMonth[dateString] = 0;
          }
        }
      });
      console.log(expensePerMonth);
      return { incomePerMonth, expensePerMonth };
    }),
  createTransaction: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        type: z.string(),
        amount: z.number(),
        userId: z.string(),
        createdAt: z.date(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction.create({
        data: {
          title: input.title,
          type: input.type,
          amount: input.amount,
          createdAt: input.createdAt,
          userId: input.userId,
        },
      });
    }),
  modifyTransaction: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        type: z.string(),
        amount: z.number(),
        createdAt: z.date(),
        userId: z.string(),
        transactionId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction.update({
        data: {
          title: input.title,
          type: input.type,
          amount: input.amount,
          createdAt: input.createdAt,
        },
        where: {
          id: input.transactionId,
          userId: input.userId,
        },
      });
    }),
  deleteTransaction: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
