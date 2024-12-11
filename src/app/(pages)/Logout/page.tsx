"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("user");
    router.push("/users");
  }, [router]);

  return <div></div>;
};

export default Page;
