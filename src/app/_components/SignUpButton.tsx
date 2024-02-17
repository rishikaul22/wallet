"use client";

import { redirect, useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const SignUpButton = ({
  value,
  email,
  password,
  name,
}: {
  value: string;
  email: string;
  password: string;
  name: string;
}) => {
  const router = useRouter();
  const userSignUp = api.userregister.signUpUser.useMutation({
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
    onSuccess(data, variables, context) {
      router.push("/signin");
    },
  });

  return (
    <div className="mt-2 flex w-full flex-row justify-center">
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          userSignUp.mutate({
            name,
            email,
            password,
          });
        }}
        className="w-full rounded-2xl bg-blue-500 p-2 text-sm text-white hover:bg-blue-600 group-invalid:pointer-events-none group-invalid:opacity-30"
      >
        {value}
      </button>
    </div>
  );
};

export default SignUpButton;
