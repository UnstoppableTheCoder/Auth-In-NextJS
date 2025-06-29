"use client";

import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabledBtn(true);
    try {
      const response = await axios.post("/api/users/forgot-password", {
        email,
      });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setDisabledBtn(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl">Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="mt-3 w-full flex justify-center">
        <input
          type="email"
          placeholder="Enter your Email"
          className="bg-white text-black placeholder:text-black p-2 rounded-l-lg font-bold outline-none w-1/3"
          value={email}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="p-2 bg-green-400 font-bold rounded-r-lg"
          disabled={disabledBtn}
        >
          {disabledBtn ? "Disabled" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
