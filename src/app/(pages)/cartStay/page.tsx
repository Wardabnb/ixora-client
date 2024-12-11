"use client";

import { useGetUser } from "@/api/user/get";
import Navbar from "@/components/navbar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

type Props = {};

export default function Page({}: Props) {
  const { data: user, isLoading, isError, error } = useGetUser();
  const router = useRouter();
  const [nbrRoom, setNbrRoom] = useState(1);
  const [nbrPerson, setNbrPerson] = useState(1);
  const [floor, setFloor] = useState(1);
  // Vérification si `window` est défini pour éviter les erreurs SSR
  const [cartItems, setCartItems] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "")
      : ""
  );
  // const userId = JSON.parse(localStorage.getItem("user")!)?._id;

  console.log("Cart Items:", cartItems);
  const searchParams = useSearchParams();
  const userId = JSON.parse(localStorage.getItem("user")!)?.data.user._id;
  console.log("serch id", userId);
  useEffect(() => {
    if (userId) {
      console.log("User ID:", userId);
    }
  }, [userId]);

  // Gestion du chargement et des erreurs
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error: {error?.message}</div>;
  // }

  // if (!user) {
  //   return <div>No user data found</div>;
  // }

  // Calcul du sous-total en fonction du nombre de chambres
  const subTotal = cartItems.reduce(
    (acc: number, stay: any) => acc + stay.price * nbrRoom,
    0
  );

  async function handelToClick() {
    try {
      const response = await axios.post(
        "http://localhost:4000/checkouts/create",
        {
          subTotal: subTotal,
          items: cartItems.map((item: any) => ({
            price: item?.chargilyId,
            nbrRoom: nbrRoom, // utilisation de nbrRoom global ici
            nbrPerson: item?.nbrPerson,
          })),
        }
      );
      const createStays = await axios.post(
        "http://localhost:4000/reservationStay/add",
        {
          userId: userId,
          stay: cartItems,
          nbrRoom: nbrRoom,
          nbrPerson: nbrPerson,
          floor: floor,
          price: subTotal,
        }
      );
      // localStorage.setItem("ReservationId", createStays.data.cart._id);
      router.push(response.data.checkout_url);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  }

  return (
    <div className="text-black">
      <div className="flex justify-center  py-10 pb-56">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-6xl font-bold mb-10">Checkout</h1>
          <div className="flex gap-10 justify-between">
            <div className="flex flex-col gap-5">
              <div className="w-full">Stay</div>
              {cartItems.map((stay: any) => (
                <div key={stay._id}>
                  <div className="flex gap-5 items-center">
                    <Image
                      src={stay.image || "/placeholder.png"}
                      height={100}
                      width={100}
                      alt={stay.name || "Stay"}
                      className="w-[500px] h-[200px]"
                    />
                    <div className="font-bold text-xl w-full text-red-700 flex flex-col gap-7">
                      {stay.name}
                      <div className="text-black">
                        <span className="font-bold">Price: </span>
                        {stay.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div>
                <Label>Floor</Label>
                <Input
                  type="Number"
                  defaultValue={1}
                  onChange={(e) => setFloor(parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Number of Room</Label>
                <Input
                  type="Number"
                  value={nbrRoom}
                  onChange={(e) => setNbrRoom(parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Number of Person</Label>
                <Input
                  type="Number"
                  defaultValue={1}
                  onChange={(e) => setNbrPerson(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="border border-gray-200 flex gap-5 flex-col p-10 w-full max-w-[400px]">
              <div className="flex justify-between">
                <div className="text-xl font-semibold">Subtotal</div>
                <div>{subTotal}DA</div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <div className="text-xl font-semibold">Grand Total</div>
                <div>{subTotal}DA</div>
              </div>
              <Button onClick={() => handelToClick()}>
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
