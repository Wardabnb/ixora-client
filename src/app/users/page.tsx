"use client";
import Carousel from "@/components/carsoule";
import { Button } from "@/components/ui/button";
import { getGoogleOAuthUrl } from "@/utils/getGoogleUrl";
import Image from "next/image";

export default function Login() {
  const images = [
    "/scope1.jpg",
    "/scope2.jpg",
    "/scope3.jpg",
    "/scope4.jpg",
    "/scope5.jpg",
    "/scope6.jpg",
  ];
  return (
    <div className="flex   justify-around py-12 text-black m-0 pt-20 h-screen dark:brightness-[0.9]  brightness-[0.8] bg-[#F5F5F5]">
      <div className="flex flex-col  gap-48 p-28 w-[50%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-5xl text-blue-500 text-center">
            Welcome To Ixora Travel Service
          </h1>
          <p className="font-medium text-lg text-center text-gray-600">
            Ixora is glad to see you , welcome to our agency
          </p>
        </div>
        <a
          href={getGoogleOAuthUrl()}
          className="flex  items-center justify-center gap-28"
        >
          <Button
            className="flex items-center h-14 bg-red-500 text-white font-bold"
            variant="destructive"
           
          >
            <Image src="/google.png" alt="" width={30} height={30} />
            SignUp with google
          </Button>
          <Button className="bg-green-500 h-14 text-white font-bold">
            <Image src="/google.png" alt="" width={30} height={30} /> Login with
            Google
          </Button>
        </a>
      </div>
      <div className="w-[700px] ">
        <Carousel images={images} />
      </div>
    </div>
  );
}
