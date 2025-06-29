"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuLoaderPinwheel } from "react-icons/lu";
import { useSession } from "next-auth/react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifyToken = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("User is verified");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center space-y-5">
      {isLoading ? (
        <h1 className="font-bold text-4xl flex flex-col items-center">
          <LuLoaderPinwheel className="mb-4 animate-spin" /> Verifying your
          email
          {token.length === 0 && (
            <p className="bg-red-500 text-white p-2 mt-5 rounded-lg">
              Token Not Found
            </p>
          )}
        </h1>
      ) : (
        <div className="w-1/2 wrap-break-word text-center">
          <h1 className="font-bold text-4xl bg-blue-500 p-2 rounded-lg text-black">
            Your token: <span className="text-white">{token}</span>
          </h1>

          {verified && (
            <div>
              <h2 className="bg-green-500 text-xl p-2 rounded-lg animate-bounce">
                Your email is verified
              </h2>
              <Link
                className="bg-blue-700 text-white underline p-2 text-xl rounded-lg"
                href={"/login"}
              >
                Login
              </Link>
            </div>
          )}

          {error && (
            <h2 className="bg-red-500 text-xl p-2 rounded-lg animate-bounce mt-5">
              Error verifying the user
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
