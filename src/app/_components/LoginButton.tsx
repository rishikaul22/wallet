import { signIn } from "next-auth/react";

interface Props {
  icon: JSX.Element;
  text: string;
  provider: string;
}

const LogoButton = ({ icon, text, provider }: Props) => {
  return (
    <button
      onClick={() => signIn(provider)}
      className="flex w-full flex-row justify-center gap-2 rounded-md border-2 border-gray-100 p-2 transition ease-in-out dark:border-gray-800 md:hover:scale-105 md:hover:border-gray-200 md:hover:dark:border-gray-700 "
    >
      <div className="text-center text-xl dark:text-gray-300">{icon}</div>
      <div className="hidden sm:block sm:text-sm sm:font-normal sm:text-gray-400 ">
        {text}
      </div>
    </button>
  );
};

export default LogoButton;
