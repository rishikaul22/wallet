"use client";

import expenseLogo from "public/assets/expense-logo.json";
import Lottie from "lottie-react";
import { FiMenu } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const Nav = ({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true));
  console.log(image);

  return (
    <nav className="mb-4 text-white dark:text-white">
      <div className="flex w-full flex-wrap items-center justify-between p-4">
        <div className="flex flex-row items-center justify-center">
          <Lottie
            animationData={expenseLogo}
            style={{ height: 37, width: 37 }}
            loop={true}
          />
          <span className="select-none text-2xl font-semibold">Wallet</span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="flex flex-row items-center justify-center gap-4">
            <li>
              <button
                className="text-md swap swap-rotate"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                // selectedtheme={resolvedTheme}
              >
                {mounted && resolvedTheme === "dark" ? (
                  <svg
                    className="swap-off h-6 w-6 rotate-45 fill-current hover:text-yellow-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                ) : (
                  <svg
                    className="swap-off h-6 w-6  fill-current hover:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                )}
              </button>
            </li>
            <li>
              <div className="dropdown dropdown-end dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="h-10 w-10  rounded-full bg-black transition ease-in-out hover:scale-110 dark:bg-gray-800"
                >
                  {image == null || image == undefined ? (
                    <>
                      <div className="text-center text-3xl">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    </>
                  ) : (
                    <img
                      src={image}
                      className="h-full w-full rounded-full"
                      alt="Profile"
                    />
                  )}
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] w-52 rounded-box bg-white p-4 text-black shadow dark:bg-gray-900 dark:text-gray-200"
                >
                  <li>
                    <h3 className="card-title mb-2  ">{name}</h3>
                  </li>
                  <li>{email}</li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="mt-2 w-full rounded-md border-2 border-red-500 border-transparent bg-red-500 py-1 text-white hover:bg-red-600 dark:border-red-700 dark:bg-transparent dark:text-red-600 hover:dark:bg-red-700 hover:dark:text-gray-200"
                    >
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden">
          <FiMenu />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
