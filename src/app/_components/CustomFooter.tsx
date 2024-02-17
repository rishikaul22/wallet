import Image from "next/image";
import nextLogo from "../../../public/assets/nextlogo3.png";
import trpcLogo from "../../../public/assets/trpc.svg";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const CustomFooter = () => {
  return (
    <div className="dark:to-bg-gray-900 mt-14 bg-gradient-to-b from-gray-200 to-white p-5 text-neutral-content dark:bg-gradient-to-b dark:from-black">
      <div className=" flex flex-row items-center justify-center gap-4 ">
        <h6 className=" text-gray-700 dark:text-gray-300">
          Developed by <span className="font-bold">Rishi Kaul</span>
        </h6>
      </div>
    </div>
  );
};

export default CustomFooter;
