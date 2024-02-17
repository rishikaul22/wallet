"use client";

import TextBox from "../_components/TextBox";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { BsFillExclamationOctagonFill } from "react-icons/bs";
import { ChangeEvent, useState } from "react";
import LogoButton from "../_components/LoginButton";
import Link from "next/link";
import SignInButton from "../_components/SignInButton";
import Lottie from "lottie-react";
import expenseLogo from "public/assets/expense-logo.json";

const page = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      setemail(event.target.value);
    } else if (event.target.name === "password") {
      setpassword(event.target.value);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-fit w-80 flex-col rounded-md bg-white p-4 shadow-md shadow-slate-300 dark:bg-gray-900 dark:shadow-gray-950 ">
        <form className="group" noValidate>
          <div className="ml-16 flex flex-row items-center justify-start">
            <Lottie
              animationData={expenseLogo}
              style={{ height: 37, width: 37 }}
              loop={true}
            />
            <h1 className="m-2 text-center text-lg font-bold text-black dark:text-white sm:text-2xl">
              Wallet
            </h1>
          </div>
          <TextBox
            name={"email"}
            handleChange={handleChange}
            label="Email"
            placeholder="Ex: rishi@gmail.com"
            value={email}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            errorMessage="Please enter a valid email address"
          />
          {/* <span className="text-red-600 text-left items-start text-xs font-semibold "><BsFillExclamationOctagonFill className='text-red-600'/> Not Allowed</span> */}
          <TextBox
            name={"password"}
            handleChange={handleChange}
            label="Password"
            placeholder="Enter your password"
            value={password}
            type="password"
            pattern=".{6,}"
            errorMessage="Your password must be at least 6 characters long"
          />
          <SignInButton value="Sign In" email={email} password={password} />
        </form>
        <div className="divider text-sm font-light text-gray-500 dark:divider-neutral dark:text-gray-400">
          or continue with
        </div>
        {/* <p className="m-4 text-sm font-light text-gray-400">Or sign in with</p> */}
        <div className="mb-4 grid w-full grid-cols-2 gap-3">
          <LogoButton icon={<FcGoogle />} text="Google" provider="google" />
          {/* <LogoButton icon={<FaApple />} text="Apple" provider="apple" /> */}
          <LogoButton icon={<FaGithub />} text="GitHub" provider="github" />
        </div>
        <p className="text-center text-sm font-normal text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <span className="cursor-pointer hover:text-black dark:hover:text-white ">
            <Link href={"/register"}>Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default page;
