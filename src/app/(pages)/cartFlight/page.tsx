"use client";

import { useGetUser } from "@/api/user/get";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: user, isLoading, isError, error } = useGetUser();
  const router = useRouter();

  const [classe, setClasse] = useState("business");

  const [cartItems, setCartItems] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartFlight") || "")
      : ""
  );
  // const userId = JSON.parse(localStorage.getItem("user")!)?._id;

  console.log("Cart Items:", cartItems);

  const userId = JSON.parse(localStorage.getItem("user")!)?.data.user._id;
  console.log("serch id", userId);
  useEffect(() => {
    if (userId) {
      console.log("User ID:", userId);
    }
  }, [userId]);

  const subTotal = cartItems.reduce(
    (acc: number, flight: any) => acc + flight.price,
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
            classe: classe, // utilisation de nbrRoom global ici
          })),
        }
      );
      const createFlight = await axios.post(
        "http://localhost:4000/reservationFlight/add",
        {
          userId: userId,
          flight: cartItems,
          classe: classe,
          price: subTotal,
        }
      );
      router.push(response.data.checkout_url);
    } catch (error: any) {
      console.error(
        "Error during checkout:",
        error?.response?.data || error.message
      );
      alert("An error occurred while processing your checkout.");
    }
  }

  return (
    <div className="text-black">
      <div className="flex justify-center  py-10 pb-56">
        <div className="max-w-[1200px] w-full">
          <h1 className="text-6xl font-bold mb-10">Checkout</h1>
          <div className="flex gap-10 justify-between">
            <div className="flex flex-col gap-5">
              <div className="w-full">Flight</div>
              {cartItems.length > 0 ? (
                cartItems.map((flight: any) => (
                  <div key={flight._id}>
                    <div className="flex gap-5 items-center">
                      <Image
                        src={flight.image || "/placeholder.png"}
                        height={100}
                        width={100}
                        alt={flight.name || "Stay"}
                        className="w-[500px] h-[200px]"
                      />
                      <div className="font-bold text-xl w-full text-red-700 flex flex-col gap-7">
                        {flight.airplane}
                        <div className="text-black">
                          <span className="font-bold">Price: </span>
                          {flight.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No flights in cart</div>
              )}
            </div>
            <div>
              <div>
                <Label>Class</Label>
                <select
                  defaultValue={classe}
                  onChange={(e) => setClasse(e.target.value)}
                >
                  <option value="business">Business</option>
                  <option value="economic">Economic</option>
                </select>
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
              <Button onClick={handelToClick}>Proceed to checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
