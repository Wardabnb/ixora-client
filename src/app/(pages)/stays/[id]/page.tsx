"use client";
import { useGetOneStay } from "@/api/stays/get-one";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { id } = useParams();
  const { data: stay } = useGetOneStay(id as string);
  console.log("id", id);
  console.log("stay", stay);
  function handelAddTocard() {
    localStorage.removeItem("cart");
    // Récupère le panier actuel depuis le localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Vérifie si l'élément existe déjà dans le panier
    const itemFound = cart.find((item: any) => item._id === stay._id);

    // Si l'élément existe, on le retire du panier
    const updatedCart = itemFound
      ? cart.filter((item: any) => item._id !== stay._id)
      : cart;

    // Ajoute la nouvelle instance de l'élément dans le panier
    const newCart = [...updatedCart, { ...stay, quantity: 1 }];

    // Met à jour le localStorage avec le panier modifié
    localStorage.setItem("cart", JSON.stringify(newCart));
    const userId = JSON.parse(localStorage.getItem("user") || "[]").data.user
      ._id;
    console.log("userIdCart", userId);

    redirect("/cartStay?userId=" + userId);
  }

  return (
    <div className="flex flex-col  items-center pt-9 text-black pb-40">
      <h1 className="text-center text-4xl font-extrabold p-5 text-red-600">
        {stay?.name}
      </h1>
      <div className="flex justify-center gap-20 w-full items-center">
        {" "}
        {stay?.image ? (
          <Image
            src={stay.image}
            width={100} // Adjust these dimensions as needed
            height={100}
            alt="Stay image"
            className="rounded-lg pt-10 w-[450px] h-[350px]"
          />
        ) : (
          <p>No image available</p> // Fallback message if there's no image
        )}
        <div className="flex flex-col ">
          <div>
            {" "}
            <p className="text-center w-[500px] ">{stay?.description}</p>
            <div className="flex pt-14 justify-around">
              {" "}
              <p>
                <span className="font-bold">Localisation: </span>{" "}
                {stay?.location}
              </p>
              <p>
                <span className="font-bold">Ranting: </span>
                {stay?.ranting}/10
              </p>
            </div>
          </div>

          <p className="text-center p-3">
            <span className="font-bold">Price: </span>
            {stay?.price}DA
          </p>
          <Button
            className="bg-green-600 text-white flex mt-6 text-lg font-bold"
            onClick={() => handelAddTocard()}
          >
            Reservation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
