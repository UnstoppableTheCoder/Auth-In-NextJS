"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordClient = () => {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken);
  }, [searchParams]);

  useEffect(() => {
    setDisabledBtn(!(password.length > 0 && confirmPassword.length > 0));
  }, [password, confirmPassword]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabledBtn(true);
    try {
      if (password === confirmPassword) {
        const response = await axios.post("/api/users/reset-password", {
          token,
          password,
          confirmPassword,
        });
        toast.success(response.data.message);
        setPasswordReset(true);
      } else {
        toast.error("Passwords don't match");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setDisabledBtn(false);
    }
  };

  return (
    <div>
      {passwordReset ? (
        <div className="flex flex-col items-center justify-center h-screen gap-y-3">
          <div className="p-2 text-xl bg-green-700 rounded animate-bounce">
            Your password has been reset!
          </div>
          <Link
            href="/login"
            className="px-4 py-2 font-bold bg-blue-500 rounded cursor-pointer active:bg-blue-600"
          >
            Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-screen gap-y-5"
        >
          <h1 className="text-4xl font-bold">Create New Password</h1>
          <label className="flex flex-col w-1/3 space-y-1 text-gray-300">
            Enter New Password:
            <input
              type="password"
              className="p-2 text-black bg-white rounded"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="flex flex-col w-1/3 space-y-1 text-gray-300">
            Confirm Password:
            <input
              type="password"
              className="p-2 text-black bg-white rounded"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={disabledBtn}
            className={`px-4 py-2 text-xl font-bold rounded-lg cursor-pointer text-black ${
              disabledBtn ? "bg-gray-300" : "bg-white"
            }`}
          >
            {disabledBtn ? "Disabled" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordClient;
