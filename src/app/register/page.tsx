"use client";

import { FcGoogle } from "react-icons/fc";
import LogoButton from "../_components/LoginButton";
import TextBox from "../_components/TextBox";
import { FaApple, FaGithub } from "react-icons/fa6";
import Link from "next/link";
import SubmitButton from "../_components/SignInButton";
import { ChangeEvent, useState } from "react";
import SignUpButton from "../_components/SignUpButton";
import Lottie from "lottie-react";
import expenseLogo from "public/assets/expense-logo.json";

const page = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      setemail(event.target.value);
    } else if (event.target.name === "password") {
      setpassword(event.target.value);
    } else if (event.target.name === "name") {
      setname(event.target.value);
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
            <h1 className="m-2  text-center text-lg font-bold text-black dark:text-white sm:text-2xl">
              Wallet
            </h1>
          </div>
          <TextBox
            name={"name"}
            handleChange={handleChange}
            label="Name"
            placeholder="Enter your name"
            value={name}
            type="text"
            pattern=".{2,}"
            errorMessage="Please enter atleast 2 letters"
          />
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
          <SignUpButton
            value="Sign up"
            email={email}
            password={password}
            name={name}
          />
        </form>

        <p className="mt-2 text-center text-sm font-normal text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <span className="cursor-pointer hover:text-black dark:hover:text-white  ">
            <Link href={"/signin"}>Sign in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default page;
