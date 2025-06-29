"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("User loggedin: ", response.data);
      router.push("/profile");
      toast.success(response.data.message);
    } catch (error: unknown) {
      let message = "An unknown error occurred";

      if (axios.isAxiosError(error) && error.response) {
        message = error.message;
      }

      console.log(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-5 text-xl text-center bg-gray-500 rounded-lg w-1/3 space-y-3">
        <h1 className="">{isLoading ? "Processing..." : "Login"}</h1>
        <div className="space-y-3">
          <div className="flex flex-col ">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              className="bg-white text-black rounded-lg pl-4 py-2"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              className="bg-white text-black rounded-lg pl-4 py-2"
            />
          </div>
          <button
            onClick={onLogin}
            className="bg-white text-black px-3 py-2 rounded-lg active:bg-gray-300 cursor-pointer mt-2"
          >
            {disabledButton ? "No Login" : "Login here"}
          </button>
        </div>
        <Link
          href={"/signup"}
          className="underline text-lg text-gray-900 hover:text-white transition duration-300"
        >
          Visit signup page
        </Link>
        <Link
          href={"/forgot-password"}
          className="block mt-3 text-xs text-blue-900 underline hover:text-white"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
