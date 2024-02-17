"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

import { BiDownArrow } from "react-icons/bi";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { LuBarChartHorizontalBig } from "react-icons/lu";
import { api } from "~/trpc/react";
const fmt = require("indian-number-format");
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = () => {
  const [duration, setduration] = useState("Last Year");
  const [months, setmonths] = useState<string[]>([]);
  const [savingsseries, setsavingsseries] = useState<number[]>([]);
  const [savingsinduration, setsavingsinduration] = useState<number>(0);
  const [incomeinduration, setincomeinduraation] = useState<number>(0);
  const [expenseinduration, setexpenseinduration] = useState<number>(0);
  const [savingspercent, setsavingspercent] = useState<number>(0);

  const {
    data: savingsData,
    isLoading,
    isSuccess,
    isRefetching,
  } = api.transaction.getSavingsData.useQuery({
    duration: duration,
  });

  useEffect(() => {
    if (!isLoading && !isRefetching) {
      setmonths(Object.keys(savingsData!.savingsPerMonth));
      setsavingsseries(Object.values(savingsData!.savingsPerMonth));
      setsavingsinduration(savingsData!.savingsInDuration);
      setincomeinduraation(savingsData!.incomeInDuration);
      setexpenseinduration(savingsData!.expenseInDuration);
      setsavingspercent(savingsData!.avgSavingPercent);
    }
  }, [isSuccess, isRefetching]);

  let options: ApexOptions = {
    chart: {
      sparkline: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: "auto",
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 5,
        barHeight: "30%",
        // distributed: true,
        dataLabels: {
          position: "top",
          maxItems: 12,
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: function (value) {
          return "₹" + value;
        },
      },
      categories: months,
      type: "category",
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        rotate: 330,

        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20,
      },
    },
  };

  let seriesData: ApexAxisChartSeries = [
    {
      name: "Savings",
      data: savingsseries,
      color: "#1E90FF",
    },
  ];

  return (
    <div className="mx-4 pt-2">
      <div className="flex flex-col">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Savings
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-start text-2xl font-semibold text-gray-700 dark:text-white">
            {"₹" + fmt.format(savingsinduration)}
          </div>
          {savingspercent >= 0 ? (
            <div className="badge gap-2 border-0 bg-green-500 text-white">
              {savingspercent} % <FaArrowCircleUp />
            </div>
          ) : (
            <div className="badge gap-2 border-0 bg-red-500 text-white">
              {savingspercent} % <FaArrowCircleDown />
            </div>
          )}
        </div>
      </div>
      <div className="divider mb-0 mt-2 h-0 py-0  dark:divider-neutral"></div>
      <div className="my-2 flex flex-row items-center justify-around">
        <div className="flex flex-col">
          <div className="text-md font-light text-gray-600 dark:text-gray-400">
            Income
          </div>
          <div className="text-lg font-bold text-green-600">
            {"₹" + fmt.format(incomeinduration)}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-md font-light  text-gray-600 dark:text-gray-400">
            Expense
          </div>
          <div className="text-lg font-bold text-red-600">
            {"₹" + fmt.format(expenseinduration)}
          </div>
        </div>
      </div>
      <div className="divider mb-0 mt-2 h-0 py-0  dark:divider-neutral"></div>
      {savingsseries.length === 0 && months.length === 0 ? (
        <>
          <div className="mb-14 flex h-64 w-full flex-row items-center justify-center gap-2 text-gray-500 dark:text-gray-600">
            <LuBarChartHorizontalBig className="rounded-lg text-4xl" />
            <p className="text-lg ">Add your first transaction</p>
          </div>
        </>
      ) : (
        <>
          {typeof window !== undefined && (
            <Chart
              options={options}
              series={seriesData}
              height={"300"}
              width={"100%"}
              type="bar"
            />
          )}
        </>
      )}
      <div className="dropdown dropdown-top dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="flex flex-row items-center justify-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-400  dark:border dark:border-gray-700  dark:text-gray-500 hover:dark:bg-gray-800 hover:dark:text-white"
        >
          {duration}{" "}
          <span>
            <BiDownArrow />
          </span>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-gray-50 p-2 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
        >
          <li>
            <a
              onClick={() => {
                setduration("Last Year");
              }}
            >
              Last Year
            </a>
          </li>
          <li>
            <a onClick={() => setduration("Last 6 months")}>Last 6 months</a>
          </li>
          <li>
            <a onClick={() => setduration("Last 3 months")}>Last 3 months</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BarChart;
