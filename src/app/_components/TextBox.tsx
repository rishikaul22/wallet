import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  pattern?: string;
  errorMessage?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextBox = ({
  name,
  label,
  placeholder,
  value,
  type,
  pattern,
  errorMessage,
  handleChange,
}: Props) => {
  return (
    <div className="my-2 flex w-full flex-col">
      <label className="mb-1 flex flex-col gap-1 text-xs font-medium text-gray-800 dark:text-slate-300 sm:text-sm">
        <span className="">{label}</span>
        <input
          name={name}
          className={
            "peer h-8 w-full rounded-md border border-gray-300 px-2 text-sm font-normal text-gray-500 after:ml-0.5 after:text-red-500 after:content-['*']  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:h-10 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
          }
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={(e) => handleChange(e)}
          required
          pattern={pattern}
        />
        <span className="mt-1 hidden text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          * {errorMessage}
        </span>
      </label>
    </div>
  );
};

export default TextBox;
