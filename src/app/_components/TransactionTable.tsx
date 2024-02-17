"use client";

import { api } from "~/trpc/react";
import { FiArrowUpLeft, FiArrowDownRight, FiSearch } from "react-icons/fi";
import { ChangeEvent, useEffect, useState } from "react";
import { RouterOutputs } from "~/trpc/shared";
import { FaTable } from "react-icons/fa";
import EditTransaction from "./EditTransaction";
const fmt = require("indian-number-format");

const TransactionTable = ({ userId }: { userId: string }) => {
  type Transaction = RouterOutputs["transaction"]["getTransactionsById"][0];
  const [searchText, setsearchText] = useState("");
  const [selectedRowData, setSelectedRowData] = useState<Transaction>();
  const [openModal, setOpenModal] = useState(false);

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchText(e.target.value);
    filterTransactions(e.target.value);
  };
  const {
    data: transactions,
    refetch: refetchTransactions,
    isSuccess,
    isLoading,
    isFetched,
    isRefetching,
  } = api.transaction.getTransactionsById.useQuery();

  const filterTransactions = (searchString: string) => {
    if (!isLoading && searchString.length > 0) {
      const ft: Transaction[] = transactions!.filter((transaction) => {
        return (
          transaction.amount
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          transaction.title
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          transaction.createdAt
            .toDateString()
            .includes(searchString.toLowerCase()) ||
          transaction.type.toLowerCase().includes(searchString.toLowerCase())
        );
      });
      setFilteredTransactions(ft);
    } else if (!isLoading && searchString.length === 0) {
      setFilteredTransactions(transactions!);
    }
  };
  useEffect(() => {
    filterTransactions("");
  }, [isSuccess, isRefetching]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4 overflow-y-scroll p-4">
        <div className="skeleton h-20 w-full bg-gray-800"></div>
        <div className="skeleton h-20 w-full bg-gray-800"></div>
        <div className="skeleton h-20 w-full bg-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-1 pt-4">
      {openModal === true ? (
        <EditTransaction
          createType="Edit"
          setOpenModal={setOpenModal}
          isOpenProp={openModal}
          userId={userId}
          transactionAmount={selectedRowData?.amount.toString()}
          transactionDate={selectedRowData?.createdAt}
          transactionTitle={selectedRowData?.title}
          transactionType={selectedRowData?.type}
          transactionId={selectedRowData?.id}
        />
      ) : (
        <></>
      )}

      <div className="mb-4 ml-4 flex flex-row items-baseline justify-between">
        <div className="text-start text-2xl font-semibold text-gray-700 dark:text-white">
          Past Transactions
        </div>

        <label className="mr-1 flex flex-row items-center justify-center gap-1 rounded-full border-2 px-1 py-2 text-sm text-gray-500  dark:border-gray-800 ">
          <FiSearch className="text-md text-gray-500 " />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            className="h-full w-full bg-transparent text-gray-500 focus:outline-none active:border-none"
            onChange={handleSearch}
            disabled={transactions === undefined}
          />
        </label>
      </div>

      <div className="divider mb-0 mt-2 h-0  py-0"></div>
      {transactions?.length === 0 ? (
        <>
          <div className="mb-14 flex h-full w-full flex-row items-center justify-center gap-2 text-gray-500 dark:text-gray-600">
            <FaTable className="rounded-lg text-4xl" />
            <p className="text-lg ">No transactions to show</p>
          </div>
        </>
      ) : (
        <div className=" overflow-y-auto">
          <table className="table w-full border-0 dark:border-0">
            <thead className="bg-gray-200 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <tr className="text-md border-none">
                <th>Type</th>
                <th>Details</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="mx-auto">
              {filteredTransactions?.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className=" cursor-pointer border-none hover:rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setOpenModal(false);
                    setSelectedRowData(filteredTransactions[index]);
                    setOpenModal(true);
                  }}
                >
                  <td>
                    {transaction.type === "Income" ? (
                      <FiArrowDownRight className="text-2xl text-green-500" />
                    ) : (
                      <FiArrowUpLeft className="text-2xl text-red-500" />
                    )}
                  </td>
                  <td>
                    <div className="flex flex-col items-start justify-center">
                      <div className="text-md font-semibold text-gray-700 dark:text-gray-200 ">
                        {transaction.title}
                      </div>
                      <div className="text-sm text-gray-500 ">{`${transaction.createdAt.getDate()} / ${transaction.createdAt.getMonth() + 1} / ${transaction.createdAt.getFullYear()}`}</div>
                    </div>
                  </td>
                  <td className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    {"₹" + fmt.format(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
