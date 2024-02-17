"use client";

import { api } from "~/trpc/react";
const fmt = require("indian-number-format");

type GradientStyle = {
  bg: string;
  iconBg: string;
};

type Gradients = {
  //   key: GradientStyle;
  red: GradientStyle;
  blue: GradientStyle;
  green: GradientStyle;
  yellow: GradientStyle;
};

const gradients: Gradients = {
  red: {
    bg: "w-full h-32 px-7 flex flex-row items-center justify-between rounded-md shadow-sm shadow-gray-300 dark:shadow-red-800 bg-white dark:bg-gradient-to-r from-red-700 to-rose-800",
    iconBg:
      "text-4xl text-white flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-rose-600 dark:bg-none p-2",
  },
  blue: {
    bg: "w-full h-32 px-7 flex flex-row items-center justify-between rounded-md shadow-sm shadow-gray-300 dark:shadow-blue-800 bg-white dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900",
    iconBg:
      "text-4xl text-white flex items-center justify-center h-16 w-16 rounded-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-blue-600 to-gray-700 dark:bg-none p-2",
  },
  green: {
    bg: "w-full h-32 px-7 flex flex-row items-center justify-between rounded-md shadow-sm shadow-gray-300 dark:shadow-green-800 bg-white dark:bg-gradient-to-br from-green-700 via-green-900 to-black",
    iconBg:
      "text-4xl text-white flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-500 via-green-700 to-black dark:bg-none p-2",
  },
  yellow: {
    bg: "w-full h-32 px-7 flex flex-row items-center justify-between rounded-md shadow-sm shadow-gray-300 dark:shadow-yellow-700 bg-white dark:bg-gradient-to-tr from-yellow-400 via-yellow-600 to-yellow-700",
    iconBg:
      "text-4xl text-white flex items-center justify-center h-16 w-16 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-400 via-yellow-500 to-yellow-600 dark:bg-none p-2",
  },
};

interface Props {
  darkGradient: string;
  titleText: string;
  value: string;
  icon: JSX.Element;
}

const Card = ({ darkGradient, titleText, value, icon }: Props) => {
  const gradientKey = darkGradient as keyof Gradients;

  const {
    data: stats,
    isSuccess,
    isRefetching,
    isLoading,
  } = api.transaction.getStats.useQuery();

  const cardData = () => {
    if (value == "balance") {
      return stats?.balance;
    } else if (value == "income") {
      return stats?.totalIncome;
    } else if (value == "expense") {
      return stats?.totalExpense;
    } else if (value == "savings") {
      return stats?.monthlySavings;
    }
  };

  return (
    <div className={gradients[gradientKey].bg}>
      <div className="flex flex-col items-start justify-center">
        <span className="font-medium text-gray-400 dark:text-gray-300">
          {titleText}
        </span>
        <span className="text-4xl font-bold text-gray-800 dark:text-white">
          {isLoading ? (
            <span className="loading loading-spinner text-neutral"></span>
          ) : (
            "₹" + fmt.formatFixed(cardData(), 2)
          )}
        </span>
      </div>

      <div className={gradients[gradientKey].iconBg}>{icon}</div>
    </div>
  );
};

export default Card;
