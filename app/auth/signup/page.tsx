"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, avatar }),
      });
      console.log(res.ok);
      if (res.ok) {
        router.push("/auth/signin");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong");
      }
      // const result = await signIn("credentials", {
      //   redirect: false,
      //   credentials: {
      //     name,
      //     email,
      //     password,
      //     avatar,
      //   },
      // });
      // console.log(result);
      // if (result?.error) {
      //   setError(result.error);
      // } else {
      //   router.push("/auth/signin");
      // }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4 lg:w-[50%] p-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-extrabold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 bg-white border-2 p-2"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-extrabold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 bg-white border-2 p-2"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-extrabold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 bg-white border-2 p-2"
          />
        </div>
        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-extrabold text-gray-700"
          >
            Avatar URL
          </label>
          <input
            type="url"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12 bg-white border-2 p-2"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
        <a href="/auth/signin" className="mt-10">
          Already have an account?
        </a>
      </form>
    </div>
  );
}
