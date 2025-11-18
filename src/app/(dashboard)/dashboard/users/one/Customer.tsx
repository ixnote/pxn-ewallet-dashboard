import React from "react";

const Customer = () => {
  return (
    <>
      <div className="w-full bg-brand-white rounded-xl p-4 flex flex-col gap-4 items-start">
        <span className="text-base font-normal text-brand-main uppercase">
          Recent transactions
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
                <td className="px-6 py-4">Airtime</td>
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
                <td className="px-6 py-4">Deposit</td>
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
                <td className="px-6 py-4">Deposit</td>
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
                <td className="px-6 py-4">Deposit</td>
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
                <td className="px-6 py-4">Deposit</td>
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
                <td className="px-6 py-4">Deposit</td>
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
                <td className="px-6 py-4">Deposit</td>
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
    </>
  );
};

export default Customer;
