"use client";
import { useGetOneFlight } from "@/api/flights/get-one";
import { useGetOneStay } from "@/api/stays/get-one";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { id } = useParams();
  const { data: flight } = useGetOneFlight(id as string);
  console.log("id", id);
  console.log("flight", flight);
  function handelAddTocard() {
    localStorage.removeItem("cartFlight");
    // Récupère le panier actuel depuis le localStorage
    const cart = JSON.parse(localStorage.getItem("cartFlight") || "[]");

    // Vérifie si l'élément existe déjà dans le panier
    const itemFound = cart.find((item: any) => item._id === flight._id);

    // Si l'élément existe, on le retire du panier
    const updatedCart = itemFound
      ? cart.filter((item: any) => item._id !== flight._id)
      : cart;

    // Ajoute la nouvelle instance de l'élément dans le panier
    const newCart = [...updatedCart, { ...flight, quantity: 1 }];

    // Met à jour le localStorage avec le panier modifié
    localStorage.setItem("cartFlight", JSON.stringify(newCart));
    const userId = JSON.parse(localStorage.getItem("user") || "[]").data.user
      ._id;
    console.log("userIdCart", userId);

    redirect("/cartFlight?userId=" + userId);
  }
  return (
    <div className="flex flex-col justify-center items-center  text-black">
      {flight?.image ? (
        <Image
          src={flight.image}
          width={500} // Adjust these dimensions as needed
          height={300}
          alt="Stay image"
          className="rounded-lg pt-10"
        />
      ) : (
        <p>No image available</p> // Fallback message if there's no image
      )}
      <h1 className="text-center text-4xl font-extrabold p-5 text-red-600">
        {flight?.airplane}
      </h1>{" "}
      <div className="flex  justify-around w-[20%]">
        {" "}
        <p>
          <span className="font-bold">From: </span> {flight?.from}
        </p>
        <p>
          <span className="font-bold">To: </span>
          {flight?.to}
        </p>
      </div>
      <div className="flex pt-4 justify-around w-[20%]">
        {" "}
        <p>
          <span className="font-bold">Departure: </span> {flight?.departure}
        </p>
        <p>
          <span className="font-bold">Arrive: </span>
          {flight?.arrive}
        </p>
      </div>
      <p className="text-center p-3">
        <span className="font-bold">Price: </span>
        {flight?.price}DA
      </p>
      <Button
        className="bg-green-600 text-white flex mt-6 text-lg font-bold"
        onClick={() => handelAddTocard()}
      >
        Reservation
      </Button>
    </div>
  );
};

export default Page;
