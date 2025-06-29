"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState("Nothing");
  const [readyToSend, setReadyToSend] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setUser(response.data.user);
      toast.success(response.data.message);
      setReadyToSend(true);
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const verifyEmail = async () => {
    try {
      if (user !== "Nothing") {
        setIsSending(true);
        await axios.get(`/api/users/send-verification-email/${user._id}`);
        toast.success("User email sent successfully");
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setIsSending(false);
      setReadyToSend(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center relative">
      <h1 className="font-bold text-5xl">Profile</h1>
      <p className="bg-blue-500 font-bold px-4 py-2 rounded-lg mt-5 cursor-pointer ">
        {user === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${user._id}`}>{user?._id}</Link>
        )}
      </p>
      <button
        onClick={getUserData}
        className="px-4 py-2 mt-5 font-bold transition duration-200 ease-in bg-green-700 rounded-lg cursor-pointer hover:bg-green-900"
      >
        Get User Data
      </button>
      <button
        onClick={logout}
        className="bg-gray-500 px-4 py-2 rounded font-bold hover:bg-gray-600 absolute top-5 right-10 cursor-pointer"
      >
        Logout
      </button>
      {!user.isVerified && readyToSend && (
        <button
          onClick={verifyEmail}
          className="bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600 absolute top-5 right-50 cursor-pointer"
        >
          {isSending ? <span>Sending</span> : <span>Verify your email</span>}
        </button>
      )}
    </div>
  );
};

export default Profile;
