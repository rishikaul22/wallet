"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { TbChartAreaLineFilled } from "react-icons/tb";
import { api } from "~/trpc/react";
const fmt = require("indian-number-format");
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaChart = () => {
  const [duration, setduration] = useState("Last Year");
  const {
    data: graphData,
    isLoading,
    isSuccess,
    isRefetching,
  } = api.transaction.getTransactionsGraphDataById.useQuery({
    duration: duration,
  });
  const [categories, setcategories] = useState<string[]>([]);
  const [expenseseries, setexpenseseries] = useState<number[]>([]);
  const [incomeseries, setincomeseries] = useState<number[]>([]);

  useEffect(() => {
    if (!isLoading && !isRefetching) {
      setcategories(Object.keys(graphData!.incomePerMonth));
      setexpenseseries(Object.values(graphData!.expensePerMonth));
      setincomeseries(Object.values(graphData!.incomePerMonth));
      //   console.log(expenseseries, categories);
    }
  }, [isSuccess, isRefetching]);

  let options: ApexOptions = {
    chart: {
      zoom: { enabled: false },
      type: "area",
      fontFamily: "Inter, sans-serif",

      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,

      x: {
        show: true,
      },
      marker: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    legend: {
      show: true,
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },

    xaxis: {
      categories: categories,
      tooltip: {
        enabled: false,
      },
      labels: {
        show: true,
        style: {
          colors: [],
          fontSize: "1rem",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        formatter: function (value: number) {
          return "₹" + value;
          // return "₹" + fmt.format(value);
        },
        style: {
          colors: [],
          fontSize: "1rem",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        offsetX: -10,
        offsetY: 0,
        rotate: 330,
      },
    },
    noData: {
      text: "No data to show",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "1rem",
        fontFamily: "Helvetica, Arial, sans-serif",
      },
    },
  };
  let seriesData: ApexAxisChartSeries = [
    {
      name: "Income",
      data: incomeseries,
      color: "#32CD32",
    },
    {
      name: "Expense",
      data: expenseseries,
      color: "#DC143C",
    },
  ];

  return (
    <div className="mx-4 pt-4">
      <div className="mb-4 flex flex-row justify-between">
        <div className="text-start text-2xl font-semibold text-gray-700 dark:text-white">
          Income vs Expense
        </div>
        <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="flex flex-row items-center justify-center gap-2 rounded-md bg-transparent px-4 py-2 text-sm text-gray-500 hover:bg-gray-50  hover:text-gray-400 dark:border dark:border-gray-700 dark:text-gray-500 hover:dark:bg-gray-800 hover:dark:text-white"
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
                  setduration("Last Week");
                }}
              >
                Last Week
              </a>
            </li>
            <li>
              <a onClick={() => setduration("Last Month")}>Last Month</a>
            </li>
            <li>
              <a onClick={() => setduration("Last Year")}>Last Year</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="divider mb-0 mt-2 h-0  py-0"></div>
      {incomeseries.length == 0 &&
      expenseseries.length == 0 &&
      categories.length == 0 ? (
        <>
          <div className="flex h-96 w-full flex-row items-center justify-center gap-2 text-gray-500 dark:text-gray-600">
            <TbChartAreaLineFilled className="rounded-lg text-4xl" />
            <p className="text-lg ">Add your first transaction</p>
          </div>
        </>
      ) : (
        <>
          {typeof window != undefined && (
            <Chart
              options={options}
              series={seriesData}
              height={"400"}
              width={"100%"}
              type="area"
            />
          )}
        </>
      )}
      {/* <div className="divider"></div> */}
    </div>
  );
};

export default AreaChart;
