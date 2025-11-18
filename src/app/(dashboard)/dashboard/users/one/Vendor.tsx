"use client";

import React, { useState } from "react";
import Image from "next/image";
import user_image from "@/assets/images/nav/user_avatar.png";

const Vendor = () => {
  const [selectedDisplay, setSelectedDisplay] = useState("vendor");

  return (
    <>
      <div className="flex items-start justify-between gap-12">
        <div className="w-[47%] flex flex-col items-start justify-start">
          <div className="w-full p-4 flex items-center gap-4 justify-between">
            <span
              onClick={() => setSelectedDisplay("vendor")}
              className={`transition-fx w-1/2 cursor-pointer text-base font-normal ${
                selectedDisplay === "vendor"
                  ? "text-brand-main"
                  : "text-brand-ash/80"
              }  hover:text-brand-main`}
            >
              VENDOR PROFILE
            </span>
            <span
              onClick={() => setSelectedDisplay("store")}
              className={`transition-fx w-1/2 cursor-pointer text-base font-normal ${
                selectedDisplay === "store"
                  ? "text-brand-main"
                  : "text-brand-ash/80"
              }  hover:text-brand-main`}
            >
              STORE USERS
            </span>
          </div>
          {selectedDisplay === "vendor" && (
            <div className="w-full flex flex-col gap-6 items-start justify-start bg-brand-white p-4 rounded-xl">
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  STORE NAME:
                </span>
                <span className="text-base font-normal text-brand-dark">
                  Marve’s Closet
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  ROLE:
                </span>
                <span className="px-2 py-1 rounded-xl bg-blue-200 text-blue-600">
                  Owner
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  PRODUCTS:
                </span>
                <span className="text-base font-normal text-brand-dark">
                  Clothes, Shoes, Accessories
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  TOTAL SALES:
                </span>
                <span className="text-base font-normal text-brand-dark">
                  13
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  EARNING SUMMARY:
                </span>
                <span className="text-base font-normal text-brand-dark">
                  N65,400
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <span className="text-base font-normal text-brand-ash">
                  VENDOR RATINGS:
                </span>
                <span className="text-base font-normal text-brand-dark flex items-center gap-2">
                  4.5{" "}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_483_7847"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                    >
                      <rect width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_483_7847)">
                      <path
                        d="M5.0625 17L6.375 11.4583L2 7.72917L7.75 7.22917L10 2L12.25 7.25L18 7.72917L13.625 11.4583L14.9375 17L10 14.0625L5.0625 17Z"
                        fill="#FFC600"
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          )}
          {selectedDisplay === "store" && (
            <div className="w-full flex flex-col gap-4 items-start justify-start bg-brand-white p-4 rounded-xl">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex gap-4 justify-center items-center w-9 h-9">
                    <Image src={user_image} alt="avr" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-base font-normal text-brand-dark">
                      Alexander Sarr
                    </span>
                    <span className="text-base font-normal text-brand-ash">
                      alexandersarr@gmail.com
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-xl bg-blue-200 text-blue-600">
                  Owner
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex gap-4 justify-center items-center w-9 h-9">
                    <Image src={user_image} alt="avr" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-base font-normal text-brand-dark">
                      Alexander Sarr
                    </span>
                    <span className="text-base font-normal text-brand-ash">
                      alexandersarr@gmail.com
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-xl bg-blue-200 text-blue-600">
                  Owner
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex gap-4 justify-center items-center w-9 h-9">
                    <Image src={user_image} alt="avr" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-base font-normal text-brand-dark">
                      Alexander Sarr
                    </span>
                    <span className="text-base font-normal text-brand-ash">
                      alexandersarr@gmail.com
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-xl bg-blue-200 text-blue-600">
                  Owner
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex gap-4 justify-center items-center w-9 h-9">
                    <Image src={user_image} alt="avr" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-base font-normal text-brand-dark">
                      Alexander Sarr
                    </span>
                    <span className="text-base font-normal text-brand-ash">
                      alexandersarr@gmail.com
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-xl bg-blue-200 text-blue-600">
                  Owner
                </span>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex gap-4 justify-center items-center w-9 h-9">
                    <Image src={user_image} alt="avr" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <span className="text-base font-normal text-brand-dark">
                      Alexander Sarr
                    </span>
                    <span className="text-base font-normal text-brand-ash">
                      alexandersarr@gmail.com
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-xl bg-blue-200 text-blue-600">
                  Owner
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="w-full bg-brand-white rounded-xl p-4 flex flex-col gap-4 items-start">
          <span className="text-base font-normal text-brand-main uppercase">
            RECENT DELIVERIES
          </span>
          <div className="h-76 overflow-auto w-full">
            <table className="relative w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="sticky top-0 text-sm font-normal text-brand-ash uppercase bg-brand-graybg">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    TRANSACTION NO.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TYPE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    STATUS
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  // onClick={() => gotoUser("123")}
                  className="text-sm font-normal bg-brand-white border-b border-brand-ash/20"
                >
                  <td className="px-6 py-4">#117365737322</td>
                  <td className="px-6 py-4">Order</td>
                  <td className="px-6 py-4">28 Jan, 08:40:57</td>
                  <td className="px-6 py-4">N20,000,00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-main cursor-pointer hover:underline">
                    View Details
                  </td>
                </tr>
                <tr
                  // onClick={() => gotoUser("123")}
                  className="text-sm font-normal bg-brand-white border-b border-brand-ash/20"
                >
                  <td className="px-6 py-4">#117365737322</td>
                  <td className="px-6 py-4">Order</td>
                  <td className="px-6 py-4">28 Jan, 08:40:57</td>
                  <td className="px-6 py-4">N20,000,00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-main cursor-pointer hover:underline">
                    View Details
                  </td>
                </tr>
                <tr
                  // onClick={() => gotoUser("123")}
                  className="text-sm font-normal bg-brand-white border-b border-brand-ash/20"
                >
                  <td className="px-6 py-4">#117365737322</td>
                  <td className="px-6 py-4">Order</td>
                  <td className="px-6 py-4">28 Jan, 08:40:57</td>
                  <td className="px-6 py-4">N20,000,00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-main cursor-pointer hover:underline">
                    View Details
                  </td>
                </tr>
                <tr
                  // onClick={() => gotoUser("123")}
                  className="text-sm font-normal bg-brand-white border-b border-brand-ash/20"
                >
                  <td className="px-6 py-4">#117365737322</td>
                  <td className="px-6 py-4">Order</td>
                  <td className="px-6 py-4">28 Jan, 08:40:57</td>
                  <td className="px-6 py-4">N20,000,00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-main cursor-pointer hover:underline">
                    View Details
                  </td>
                </tr>
                <tr
                  // onClick={() => gotoUser("123")}
                  className="text-sm font-normal bg-brand-white border-b border-brand-ash/20"
                >
                  <td className="px-6 py-4">#117365737322</td>
                  <td className="px-6 py-4">Order</td>
                  <td className="px-6 py-4">28 Jan, 08:40:57</td>
                  <td className="px-6 py-4">N20,000,00</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-main cursor-pointer hover:underline">
                    View Details
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendor;
