"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Register = () => {
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: fullName,
      username: userName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/api/user", {
        method: "POSt",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.err) {
        if (data.err.emailErr) {
          setEmailError(data.err.emailErr);
        } else {
          setEmailError("");
        }
        if (data.err.userErr) {
          setUsernameError(data.err.userErr);
        } else {
          setUsernameError("");
        }
        if (data.err.passwordErr) {
          setPasswordError(data.err.passwordErr);
        } else {
          setPasswordError("");
        }
      } else {
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen bg-neutral-400 flex items-center justify-center p-6">
      <div className="md:w-96 w-full max-w-lg bg-background flex flex-col md:p-12 p-6">
        <div className="flex flex-col">
          <h2 className="font-bold text-4xl">Sign up</h2>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            <p className="md:text-base text-sm text-gray-600">
              Already have an account?
            </p>
            <Link
              href="/signin"
              className="font-medium md:text-base text-sm transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="mt-8">
          <div className="flex flex-col space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="text-base font-medium text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  placeholder="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {usernameError && (
                  <p className="font-medium text-sm text-red-600">
                    {usernameError}
                  </p>
                )}
              </div>
            </div>

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
                {emailError && (
                  <p className="font-medium text-sm text-red-600">
                    {emailError}
                  </p>
                )}
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
                {passwordError && (
                  <p className="font-medium text-sm text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-foreground px-3 py-3 font-semibold leading-7 text-background hover:bg-foreground/80"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
