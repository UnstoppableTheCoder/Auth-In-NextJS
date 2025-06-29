"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isloading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success: ", response.data);
      router.push("/login");
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
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-5 text-xl text-center bg-gray-500 rounded-lg w-1/3 space-y-3">
        <h1 className="">{isloading ? "Processing" : "Signup"}</h1>
        <div className="space-y-3">
          <div className="flex flex-col ">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="username"
              id="username"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
              className="bg-white text-black rounded-lg pl-4 py-2"
            />
          </div>
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
            onClick={onSignup}
            className="bg-white text-black px-3 py-2 rounded-lg active:bg-gray-300 cursor-pointer mt-2"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "No signup" : "Signup here"}
          </button>
        </div>
        <Link
          href={"/login"}
          className="underline text-lg text-gray-900 hover:text-white transition duration-300"
        >
          Visit login page
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
