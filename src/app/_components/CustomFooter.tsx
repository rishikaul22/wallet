import Image from "next/image";
import nextLogo from "../../../public/assets/nextlogo3.png";
import trpcLogo from "../../../public/assets/trpc.svg";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const CustomFooter = () => {
  return (
    <div className="dark:to-bg-gray-900 mt-14 bg-gradient-to-b from-gray-200 to-white p-5 text-neutral-content dark:bg-gradient-to-b dark:from-black">
      <div className="mx-2 flex flex-row items-center justify-center gap-4">
        <h6 className=" text-gray-700 dark:text-gray-300">
          Developed by <span className="font-bold">Rishi Kaul</span>
        </h6>
        <div className="divider divider-horizontal mb-0 mt-2 h-0 py-0 dark:divider-neutral"></div>

        <h6 className="font-semibold uppercase text-gray-900 dark:text-gray-300">
          Stack
        </h6>

        <a
          href="https://www.nextjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            className=" scale-110 rounded-full"
            height={50}
            width={50}
            src={nextLogo}
            alt="Next JS"
          />
        </a>
        <a href="https://www.trpc.io" rel="noopener noreferrer" target="_blank">
          <Image
            className=""
            height={30}
            width={30}
            src={trpcLogo}
            alt="trpc"
          />
        </a>
        <div className="divider divider-horizontal mb-0 mt-2 h-0 py-0"></div>

        <h6 className="font-semibold uppercase text-gray-900 dark:text-gray-300">
          Social
        </h6>

        <a
          href="https://x.com/rishikaul22"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaXTwitter className="text-2xl text-black dark:text-white" />
        </a>
        <a
          href="https://www.linkedin.com/in/rishikaul22"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaLinkedin className="scale-125 text-2xl text-linkedin_blue dark:fill-white" />
        </a>
      </div>
    </div>
  );
};

export default CustomFooter;
