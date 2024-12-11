"use client";
import { useGetStays } from "@/api/stays/get";
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

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const user = JSON.parse(localStorage.getItem("user") || "[]");

  const { data: stays } = useGetStays(currentPage);
  console.log("stays data", stays);

  const numPages = 10;

  return (
    <div className="pt-5 text-black">
      <h1 className="text-center font-extrabold  text-[#004D40] text-3xl">
        Your Stays
      </h1>

      <div className="grid  grid-cols-3   p-10  ">
        {stays?.map((stay: any, index: any) => (
          <Link
            href={`/stays/${stay._id}`}
            className="font-bold text-center mt-2"
            key={stay._id}
          >
            <div className="flex flex-col  gap-0 border rounded-lg  group-hover:bg-slate-400 w-[500px]">
              <Image
                src={stay.image}
                height={100}
                width={100}
                alt="image"
                className="w-full border-b   object-cover  bg-gray-300 h-[400px] "
              />
              <h1 className="font-bold text-md text-[#FF5722] text-center p-5 ">
                {stay?.name}
              </h1>
              <p className="text-gray-400 pt-0">{stay?.location}</p>
              <p className="text-center p-5 w-full">{stay?.description}</p>
              <div className="flex justify-center gap-11 items-center w-full">
                <p>{stay?.price}DA</p>
                <p>{stay?.ranting}/10</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/stays?userId=${user._id}?page=${Math.max(
                1,
                Number(currentPage) - 1
              )}`}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: numPages }, (_, i) => (
              <PaginationLink
                href={`/stays?userId=${user._id}?page=${i + 1}`}
                key={i}
              >
                {i + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/stays?userId=${user._id}?page=${Math.min(
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
