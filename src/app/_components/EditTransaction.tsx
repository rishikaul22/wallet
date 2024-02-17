"use client";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import TextBox from "./TextBox";
import Datepicker from "tailwind-datepicker-react";
import { api } from "~/trpc/react";

const EditTransaction = ({
  userId,
  createType,
  isOpenProp,
  transactionTitle,
  transactionAmount,
  transactionType,
  transactionDate,
  transactionId,
  setOpenModal,
}: {
  userId: string;
  createType: string;
  isOpenProp: boolean;
  transactionTitle?: string;
  transactionAmount?: string;
  transactionType?: string;
  transactionDate?: Date;
  transactionId?: number;
  setOpenModal: (e: boolean) => void;
}) => {
  let [isOpen, setIsOpen] = useState(isOpenProp);
  const [title, settitle] = useState(
    transactionTitle != undefined ? transactionTitle : "",
  );
  const [amount, setamount] = useState(
    transactionAmount != undefined ? transactionAmount : "",
  );
  const [type, settype] = useState(
    transactionType != undefined ? transactionType : "",
  );
  const [date, setdate] = useState(
    transactionDate != undefined ? transactionDate : new Date(),
  );

  const utils = api.useUtils();

  const editTransaction = api.transaction.modifyTransaction.useMutation({
    onSuccess(data, variables, context) {
      setOpenModal(false);
      settitle("");
      setamount("");
      settype("");
      setdate(new Date());
      utils.transaction.getTransactionsById.invalidate();
      utils.transaction.getTransactionsGraphDataById.invalidate();
      utils.transaction.getSavingsData.invalidate();
      utils.transaction.getStats.invalidate();
    },
  });

  const deleteTransaction = api.transaction.deleteTransaction.useMutation({
    onSuccess(data, variables, context) {
      setOpenModal(false);
      settitle("");
      setamount("");
      settype("");
      setdate(new Date());
      utils.transaction.getTransactionsById.invalidate();
      utils.transaction.getTransactionsGraphDataById.invalidate();
      utils.transaction.getSavingsData.invalidate();
      utils.transaction.getStats.invalidate();
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "title") {
      settitle(event.target.value);
    } else if (event.target.name === "amount") {
      setamount(event.target.value);
    }
  };

  function closeModal() {
    setOpenModal(false);
    // setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [show, setShow] = useState(false);
  const handleDateChange = (selectedDate: Date) => {
    console.log(selectedDate);
    setdate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-fit w-full max-w-sm transform rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-900 sm:max-w-sm">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Edit Transaction
                  </Dialog.Title>
                  <div className="mt-2 flex h-fit w-full flex-col items-center justify-center">
                    <TextBox
                      name="title"
                      label="Title"
                      placeholder="Salary, Pizza, Phone..."
                      value={title}
                      type="text"
                      handleChange={handleChange}
                    />

                    <TextBox
                      name="amount"
                      label="Amount"
                      placeholder="250"
                      value={amount}
                      type="number"
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="mt-2 flex w-full flex-col gap-2">
                    <label className="text-xs font-medium text-gray-800 dark:text-slate-300 sm:text-sm">
                      Type
                    </label>
                    <div className="flex flex-row gap-2">
                      <button
                        type="button"
                        className={`inline-flex w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${type === "Income" ? "border-3 border-green-500 bg-green-500 text-white dark:bg-green-200 dark:text-green-500" : "border-transparent bg-white text-black dark:bg-slate-600 dark:text-gray-200"}`}
                        onClick={() => settype("Income")}
                      >
                        Income
                      </button>
                      <button
                        type="button"
                        className={`inline-flex w-full items-center justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium ${type === "Expense" ? "border-3 border-red-500 bg-red-500 text-white dark:bg-red-200 dark:text-red-500" : "border-transparent bg-white text-black dark:bg-slate-600 dark:text-gray-200"}`}
                        onClick={() => settype("Expense")}
                      >
                        Expense
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 flex w-full flex-row">
                    <div className="flex w-full flex-col gap-2">
                      <label className="text-xs font-medium text-gray-800 dark:text-slate-300 sm:text-sm">
                        Date
                      </label>
                      <Datepicker
                        value={date}
                        onChange={handleDateChange}
                        show={show}
                        setShow={handleClose}
                      />
                    </div>
                  </div>

                  {title !== "" &&
                    amount !== "" &&
                    type !== "" &&
                    date !== undefined && (
                      <div className="mt-6 flex w-full flex-row items-center justify-center gap-4 transition delay-150 ease-in-out ">
                        <button
                          type="button"
                          onClick={() => {
                            console.log(title, amount, type, date);

                            editTransaction.mutate({
                              title,
                              type,
                              amount: parseFloat(amount),
                              createdAt: date,
                              userId,
                              transactionId: transactionId!,
                            });
                          }}
                          className="w-full rounded-full bg-blue-500 p-2 text-sm text-white hover:bg-blue-600"
                        >
                          Edit {type}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            console.log("del called");

                            deleteTransaction.mutate({
                              id: transactionId!,
                            });
                          }}
                          className="w-full rounded-full  bg-red-500 p-2 text-sm text-white hover:bg-red-600"
                        >
                          Delete {type}
                        </button>
                      </div>
                    )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditTransaction;
