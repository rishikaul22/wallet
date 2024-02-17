import { getServerAuthSession } from "~/server/auth";
import BigCard from "../_components/BigCard";
import Card from "../_components/Card";
import CreateTransaction from "../_components/CreateTransaction";
import Nav from "../_components/Nav";
import React from "react";
import { FaCoins } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { redirect } from "next/navigation";
import TransactionTable from "../_components/TransactionTable";
import AreaChart from "../_components/AreaChart";
import BarChart from "../_components/BarChart";
import { MdSavings } from "react-icons/md";
import { FaMoneyBillTransfer, FaMoneyCheck, FaWallet } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import CustomFooter from "../_components/CustomFooter";

const Dashboard = async () => {
  const session = await getServerAuthSession();

  if (session === undefined || session === null) {
    console.log("redirect to sign in");
    redirect("/signin");
  }
  const name = session.user.name as string;
  const email = session.user.email as string;
  const userId = session.user.id as string;
  const image = session.user.image as string;

  return (
    <div>
      <div className="h-fit w-screen animate-gradient-x bg-sky-500 from-gray-800 via-gray-950 to-black pb-20 dark:bg-gradient-to-r dark:text-white">
        <Nav name={name} email={email} image={image} />
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-4">
          <Card
            darkGradient="blue"
            titleText="WALLET BALANCE"
            value="balance"
            icon={<IoWallet />}
          />
          <Card
            darkGradient="green"
            titleText="TOTAL INCOME"
            value="income"
            icon={<FaMoneyCheck />}
          />
          <Card
            darkGradient="red"
            titleText="TOTAL EXPENSE"
            value="expense"
            icon={<FaMoneyBillTransfer />}
          />
          <Card
            darkGradient="yellow"
            titleText="AVG. MONTHLY SAVINGS"
            value="savings"
            icon={<MdSavings />}
          />
        </div>
      </div>
      <div className="-mt-16 grid grid-cols-12 gap-8 px-8">
        <div className="col-span-12 md:col-span-5">
          <BigCard component={<AreaChart />} />
        </div>
        <div className="col-span-12 md:col-span-3">
          <BigCard component={<BarChart />} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <BigCard component={<TransactionTable userId={userId} />} />
        </div>
      </div>
      <CreateTransaction isOpenProp={false} createType="Add" userId={userId} />
      <CustomFooter />
    </div>
  );
};

export default Dashboard;
