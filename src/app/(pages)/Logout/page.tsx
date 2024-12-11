"use client";

import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  localStorage.removeItem("user");
  redirect("/users");
  return <div></div>;
};

export default Page;
