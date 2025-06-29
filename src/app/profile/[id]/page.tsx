"use client";

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const UserProfile = ({ params }: ProfilePageProps) => {
  const router = useRouter();
  const { id } = params;

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      } else {
        console.log("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-5xl font-bold">UserProfile</h1>
      <button className="px-4 py-2 mt-5 font-bold transition duration-200 ease-in bg-green-700 rounded-lg cursor-pointer hover:bg-green-900">
        UserId: {id}
      </button>
      <button
        onClick={logout}
        className="absolute px-4 py-2 font-bold bg-gray-500 rounded cursor-pointer hover:bg-gray-600 top-5 right-10"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
