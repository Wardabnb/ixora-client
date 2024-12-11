"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUser } from "@/api/user/get";

type Props = {};

const Navbar = (props: Props) => {
  const { data: user, isLoading, isError, error } = useGetUser();
  console.log("user nav", user);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to fetch user data: {error.message}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between pt-5 px-10 border pb-5 bg-[#E8E8E8]">
      <Image
        src="/logo.jpg"
        height={60}
        width={60}
        alt="Logo"
        className="rounded-full"
      />
      <nav className="flex gap-5 text-black">
        <Link href={`/dashboard?userId=${user.user._id}`}>Home</Link>
        <Link href={`/stays?userId=${user.user._id}&page=1`}>Stays</Link>
        <Link href={`/flights?userId=${user.user._id}&page=1`}>Flights</Link>
        <Link href="#contact">Contact</Link>
        <Link href="/Logout">Logout</Link>
      </nav>
    </div>
  );
};

export default Navbar;
