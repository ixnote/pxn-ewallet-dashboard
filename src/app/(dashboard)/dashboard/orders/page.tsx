"use client";
import React, { useState } from "react";
import {
  Bike,
  ChevronLeft,
  ChevronRight,
  Flag,
  Store,
  User,
} from "lucide-react";
import OneOrderModal from "./OneOrderModal";

const Wallets = () => {
  const [selected, setSelected] = useState("All");
  const [oneOrderId, setOneOrderId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggleOptions = [
    { label: "All" },
    { label: "Confirmed" },
    { label: "Pending" },
    { label: "Processing" },
    { label: "Canceled" },
  ];

  const gotoOrder = (id: string) => {
    setOneOrderId(id);
    setShowModal(true);
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-start justify-start pb-8">
        {/* top */}
        <div className="w-full flex justify-between items-center">
          {/* Toggle switch */}
          <div className="flex items-center">
            <div className="relative flex items-center bg-[#F1F2F6] border border-[#E9E7FD] rounded-full h-8 w-[450px]">
              {/* Toggle Background */}
              <div
                className="absolute h-full bg-brand-main rounded-full shadow-xl transition-all duration-300"
                style={{
                  width: `${100 / toggleOptions.length}%`,
                  left: `${
                    (toggleOptions.findIndex((opt) => opt.label === selected) /
                      toggleOptions.length) *
                    100
                  }%`,
                }}
              />

              {/* Buttons Container */}
              <div className="relative flex w-full">
                {toggleOptions.map(({ label }) => (
                  <button
                    key={label}
                    className={`w-1/5 text-center font-medium text-sm transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3 ${
                      selected === label ? "text-brand-white" : "text-brand-ash"
                    }`}
                    onClick={() => setSelected(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* top right */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-brand-white p-1 px-2 rounded-lg">
              {/* <Search className="text-brand-ash" /> */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5311 15.6998L9.05397 10.2227C8.59564 10.5588 8.09308 10.8224 7.54628 11.0133C6.99949 11.2043 6.41756 11.2998 5.80049 11.2998C4.27226 11.2998 2.97342 10.7651 1.90397 9.69564C0.834527 8.62619 0.299805 7.32758 0.299805 5.7998C0.299805 4.27203 0.834527 2.97342 1.90397 1.90397C2.97342 0.834527 4.27203 0.299805 5.7998 0.299805C7.32758 0.299805 8.62619 0.834527 9.69564 1.90397C10.7651 2.97342 11.2998 4.27226 11.2998 5.80049C11.2998 6.41756 11.2043 6.99949 11.0133 7.54628C10.8224 8.09308 10.5588 8.59564 10.2227 9.05397L15.6998 14.5311L14.5311 15.6998ZM5.7998 9.6498C6.86925 9.6498 7.77828 9.2755 8.52689 8.52689C9.2755 7.77828 9.6498 6.86925 9.6498 5.7998C9.6498 4.73036 9.2755 3.82133 8.52689 3.07272C7.77828 2.32411 6.86925 1.9498 5.7998 1.9498C4.73036 1.9498 3.82133 2.32411 3.07272 3.07272C2.32411 3.82133 1.9498 4.73036 1.9498 5.7998C1.9498 6.86925 2.32411 7.77828 3.07272 8.52689C3.82133 9.2755 4.73036 9.6498 5.7998 9.6498Z"
                  fill="#8B909A"
                />
              </svg>

              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search User"
                className="outline-none rounded-md px-2 py-1 text-brand-dark text-sm hover:outline hover:outline-brand-main placeholder:text-brand-ash"
              />
            </div>
            <span className="group border-1 border-brand-main rounded-lg px-4 cursor-pointer text-sm font-normal flex items-center text-brand-main gap-2 h-8 hover:bg-brand-main">
              <span className="group-hover:text-brand-white">Filter</span>
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#115D8B] group-hover:fill-brand-white"
              >
                <path d="M0.299805 9.9498V8.2998H5.7998V9.9498H0.299805ZM0.299805 5.8248V4.1748H10.1998V5.8248H0.299805ZM0.299805 1.6998V0.0498047H15.6998V1.6998H0.299805Z" />
              </svg>
            </span>
          </div>
        </div>
        {/* body */}
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm font-normal text-brand-ash uppercase">
              <tr className="border-b border-brand-ash/20">
                <th scope="col" className="px-6 py-3">
                  ORDER ID
                </th>
                <th scope="col" className="px-6 py-3">
                  CONSUMER NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  PHONE
                </th>
                <th scope="col" className="px-6 py-3">
                  VENDOR ID
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  RIDER ID
                </th>
                <th scope="col" className="px-6 py-3">
                  STATUS
                </th>
                <th scope="col" className="px-6 py-3">
                  TOTAL
                </th>
                <th scope="col" className="px-6 py-3">
                  PAYMENT
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Bank Transfer</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-red-200 text-red-600">
                    Canceled
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Card</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Bank Transfer</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-red-200 text-red-600">
                    Canceled
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Card</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-yellow-200 text-yellow-600">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Bank Transfer</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-red-200 text-red-600">
                    Canceled
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Card</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-sm font-normal bg-brand-white border-b border-brand-ash/20">
                <td className="px-6 py-4">8135315532</td>
                <td className="px-6 py-4">Marvel Blessed</td>
                <td className="px-6 py-4">+2348135315532</td>
                <td className="px-6 py-4">EstherBakare24</td>
                <td className="px-6 py-4">28/01/25, 08:01 AM</td>
                <td className="px-6 py-4">MarveBC</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-xl bg-green-200 text-green-600">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4">N20,000</td>
                <td className="px-6 py-4">Wallet</td>
                <td className="px-6 py-4 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <span className="text-brand-dark hover:text-brand-main">
                        <span>:</span>
                      </span>
                      <div className="absolute top-0 right-0 hidden flex-col rounded-lg bg-brand-ashbg z-100 w-max shadow-lg border border-brand-ash/30 group-hover:flex">
                        <span
                          onClick={() => gotoOrder("Eddy123")}
                          className="border-b border-brand-ash/20 p-2 px-4 text-left cursor-pointer hover:bg-brand-ash/10"
                        >
                          View Details
                        </span>
                        <span className="border-b border-brand-ash/20 p-2 px-4 hover:bg-brand-ash/10 text-left">
                          Reverse Transaction
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="w-full px-6 py-4 bg-[#F1F2F6] border-1 border-[#E9E7FD] flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-ash">
              Showing
              <select name="perPage" id="perPage">
                <option value="#">10</option>
                <option value="#">20</option>
                <option value="#">30</option>
                <option value="#">40</option>
                <option value="#">50</option>
              </select>
              of 100
            </div>
            <div className="group flex items-center gap-2 text-brand-ash">
              <ChevronLeft className="transition-fx cursor-pointer hover:animate-bounce" />
              <span className="transition-fx p-1 px-4 rounded-lg cursor-pointer bg-brand-main text-brand-white">
                1
              </span>
              <span className="transition-fx p-1 px-4 rounded-lg cursor-pointer hover:bg-brand-main hover:text-brand-white">
                2
              </span>
              <span className="transition-fx p-1 px-4 rounded-lg cursor-pointer hover:bg-brand-main hover:text-brand-white">
                3
              </span>
              <span className="transition-fx p-1 px-4 rounded-lg cursor-pointer hover:bg-brand-main hover:text-brand-white">
                4
              </span>
              <span className="transition-fx p-1 px-4 rounded-lg cursor-pointer hover:bg-brand-main hover:text-brand-white">
                5
              </span>
              <ChevronRight className="transition-fx cursor-pointer hover:animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <OneOrderModal
        id={oneOrderId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Wallets;
