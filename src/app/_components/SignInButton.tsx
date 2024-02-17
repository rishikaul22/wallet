import { signIn } from "next-auth/react";

const SignInButton = ({
  value,
  email,
  password,
}: {
  value: string;
  email: string;
  password: string;
}) => {
  return (
    <div className="mt-2 flex w-full flex-row justify-center">
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          signIn("credentials", {
            email: email,
            password: password,
          });
        }}
        className="w-full rounded-2xl bg-blue-500 p-2 text-sm text-white hover:bg-blue-600 group-invalid:pointer-events-none group-invalid:opacity-30"
      >
        {value}
      </button>
    </div>
  );
};

export default SignInButton;
