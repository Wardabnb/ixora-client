"use client";
import { useGetUser } from "@/api/user/get";
import React, { use, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGetRelatedStay } from "@/api/stays/related";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetRelatedFlights } from "@/api/flights/related";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Définir un type pour l'utilisateur
type User = {
  name: string;
  email: string;
  image: string;
};

type Props = {};

const Page = (props: Props) => {
  const { data: user, isLoading, isError, error } = useGetUser();
  console.log("user dash", user);

  const { data: stays } = useGetRelatedStay();
  const { data: flights } = useGetRelatedFlights();
  console.log("stays Related", stays);

  const searchParams = useSearchParams(); // Récupérer les paramètres de l'URL
  const userId = searchParams.get("userId"); // Extraire le userId des paramètres de recherche

  useEffect(() => {
    if (userId) {
      // Lancer la requête pour récupérer les données de l'utilisateur avec l'ID
      // Vérifie que tu envoies correctement l'ID dans la requête API côté serveur
      console.log("User ID:", userId);
    }
  }, [userId]);

  // Gestion du chargement et des erreurs
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <div className="bg-[url('/bg1.png')] bg-cover bg-no-repeat h-[700px] bg-center text-white font-bold flex justify-center items-center">
        <h1 className="relative left-11 w-[600px] text-5xl leading-[90px] pb-7">
          Welcome{" "}
          <span className="text-[#41EAD4] font-extrabold ">
            {user.user.username}
          </span>
          <span className="whitespace-pre-line"> To IXORA Travel Service</span>
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-3xl  pt-5 text-red-700">
          Our Stays
        </h1>
        <div className="grid  grid-cols-3  gap-4 p-10 text-black">
          {stays?.map((stay: any, index: any) => (
            <div
              className="flex flex-col  items-center border rounded-lg  group-hover:bg-slate-400 w-[500px]"
              key={stay?._id}
            >
              <Image
                src={stay?.image}
                height={100}
                width={100}
                alt="image"
                className="w-full border-b rounded-lg  object-cover  bg-gray-300 h-[400px] "
              />
              <h1 className="font-bold text-lg text-[#457B9D] text-center p-5">
                {stay?.name}
              </h1>
              <p className="text-gray-400 ">{stay?.location}</p>
              <p className="text-center p-5">{stay?.description}</p>
              <div className="flex justify-center gap-11 items-center w-full">
                <p>{stay?.price}DA</p>
                <p>{stay?.ranting}/10</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-[30em] border border-[#333333] p-6 text-[#333333] font-bold text-lg ">
          <Link href={`/stays?userId=${userId}?page=1`}>Show More</Link>
        </Button>
      </div>
      <Separator className="my-4 bg-gray-100  " />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-3xl  pt-5 text-red-700">
          Our Flights
        </h1>
        <div className="grid  grid-cols-3  gap-4 p-10  text-black">
          {flights?.map((flight: any, index: any) => (
            <div
              className="flex flex-col  items-center border rounded-lg  group-hover:bg-slate-400 w-[500px]"
              key={flight._id}
            >
              <Image
                src={flight.image}
                height={100}
                width={100}
                alt="image"
                className="w-full border-b rounded-lg  object-cover  bg-gray-300 h-[400px] "
              />
              <h1 className="font-bold text-lg text-[#457B9D] text-center p-5">
                {flight?.airplane}
              </h1>
              <div className="flex justify-between px-5 items-center w-full">
                <p className="text-gray-400 ">From: {flight?.from}</p>
                <p className="text-gray-400 ">To: {flight?.to}</p>
              </div>

              <div className="flex justify-between px-5 items-center w-full">
                <p>departure: {flight?.departure}</p>
                <p>arrive: {flight?.arrive}</p>
              </div>
              <p>{flight?.price}</p>
            </div>
          ))}
        </div>
        <Button className="w-[30em] border border-[#333333] p-6 text-[#333333] font-bold text-lg ">
          <Link href={`/stays?userId=${userId}?page=1`}>Show More</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
