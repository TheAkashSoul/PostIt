"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setErrorMessage("Invalid credentials");
        return;
      }
      router.push("/");
    } catch (error) {
      console.log("errror in sign in page", error);
    }
  };
  return (
    <div className="h-screen w-screen bg-neutral-400 flex items-center justify-center p-6">
      <div className="md:w-96 w-full max-w-lg bg-background flex flex-col md:p-12 p-6">
        <div className="flex flex-col">
          <h2 className="font-bold text-4xl">Sign In</h2>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            <p className="md:text-base text-sm text-gray-600">
              Don&apos;t have an account?
            </p>
            <Link
              href="/signup"
              className="font-medium md:text-base text-sm transition-all duration-200 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="mt-8">
          <div className="flex flex-col space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            {errorMessage && (
              <p className="font-medium text-sm text-red-600">{errorMessage}</p>
            )}
            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-foreground px-3 py-3 font-semibold leading-7 text-background hover:bg-foreground/80"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
