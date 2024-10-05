"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import client from "@/services/apolloClient";
import { GET_MY_PROFILE } from "@/graphql/query";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    client: client,
    context: {
      headers: {
        authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("access_token")}`
            : "",
      },
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/auth/signin");
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/auth/signin");
    } else {
      console.log(data);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const user = data?.myProfile;

  return (
    <div className="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12 dark:bg-slate-900">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome to your Dashboard
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Hello, {user.name}!</p>
                <p>Your email: {user.email}</p>
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-20 h-20 rounded-full"
                  />
                )}
              </div>
            </div>
          </div>{" "}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 text-white rounded-full bottom-4 right-4 absolute hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
