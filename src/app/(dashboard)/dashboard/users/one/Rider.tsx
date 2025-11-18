import React from "react";

const Rider = () => {
  return (
    <>
      <div className="flex items-start justify-between gap-12">
        <div className="w-[47%] flex flex-col gap-8 items-start justify-start">
          <span className="text-base font-normal text-brand-main">
            RIDER PROFILE
          </span>
          <div className="w-full flex items-center justify-between gap-4">
            <span className="text-base font-normal text-brand-ash">
              RIDER NAME:
            </span>
            <span className="text-base font-normal text-brand-dark">
              MarveBC
            </span>
          </div>
          <div className="w-full flex items-center justify-between gap-4">
            <span className="text-base font-normal text-brand-ash">
              COMPLETED RIDES:
            </span>
            <span className="text-base font-normal text-brand-dark">13</span>
          </div>
          <div className="w-full flex items-center justify-between gap-4">
            <span className="text-base font-normal text-brand-ash">
              EARNING SUMMARY:
            </span>
            <span className="text-base font-normal text-brand-dark">
              N65,000
            </span>
          </div>
          <div className="w-full flex items-center justify-between gap-4">
            <span className="text-base font-normal text-brand-ash">
              RIDER RATINGS:
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

export default Rider;
