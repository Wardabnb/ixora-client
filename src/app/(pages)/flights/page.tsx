"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { useGetFlights } from "@/api/flights/get";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const { data: flights } = useGetFlights(currentPage);
  console.log("flights", flights);

  const numPages = 10;

  return (
    <div className="pt-5 text-black">
      <h1 className="text-center font-extrabold  text-[#004D40] text-3xl">
        Your Flights
      </h1>

      <div className="grid  grid-cols-3  gap-4 p-10  ">
        {flights?.map((flight: any, index: any) => (
          <Link
            href={`/flights/${flight._id}`}
            className="font-bold text-center mt-2"
            key={flight._id}
          >
            <div className="flex flex-col  items-center border rounded-lg  group-hover:bg-slate-400 w-[500px]">
              <Image
                src={flight.image}
                height={100}
                width={100}
                alt="image"
                className="w-full border-b   object-cover  bg-gray-300 h-[400px] "
              />
              <h1 className="font-bold text-md text-[#FF5722] text-center p-5 ">
                {flight?.airplane}
              </h1>
              <div className="flex  justify-around w-full">
                <p className="text-gray-400 ">
                  <span className="text-black">From: </span>
                  {flight?.from}
                </p>
                <p className="text-gray-400 ">
                  <span className="text-black">From: </span>
                  {flight?.to}
                </p>
              </div>

              <div className="flex  justify-around w-full">
                <p className="text-gray-400 ">
                  <span className="text-black">Departure: </span>
                  {flight?.departure}
                </p>
                <p className="text-gray-400 ">
                  <span className="text-black">Arrive: </span>
                  {flight?.arrive}
                </p>
              </div>
              <p>Price: {flight?.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/flights?page=${Math.max(1, Number(currentPage) - 1)}`}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: numPages }, (_, i) => (
              <PaginationLink href={`/flights?page=${i + 1}`} key={i}>
                {i + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/flights?page=${Math.min(
                numPages,
                Number(currentPage) + 1
              )}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default page;
