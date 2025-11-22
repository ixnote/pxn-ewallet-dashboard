"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Bike, User, X } from "lucide-react";

const OneOrderModal = ({ id, setShowModal, showModal }: any) => {
  // console.log({ id });
  // if (!id) {
  //   return (
  //     <div className="p-8 w-full flex flex-col gap-8 items-center justify-center text-brand-main bg-brand-white rounded-lg">
  //       <span className="text-3xl font-extrabold">
  //         No transaction ID provided {id}
  //       </span>
  //       <Link href={"/dashboard/wallets"}>Go back</Link>
  //     </div>
  //   );
  // }
  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-ash/45 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 m-4 overflow-auto h-[90%]"
            >
              <div className="gap-8 pb-8 flex flex-col items-center justify-start">
                {/* Top */}
                <div className="w-full flex items-center justify-between">
                  <span className="text-lg font-semibold text-brand-main">
                    ORDER DETAILS
                  </span>
                  <X
                    onClick={() => setShowModal(false)}
                    className="transition-fx font-bold cursor-pointer text-brand-ash hover:text-brand-main"
                  />
                </div>
                {/* Mid */}
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
                  {/* Left Section */}
                  <div className="w-full flex flex-col gap-3 min-h-[515px] bg-brand-graybg rounded-xl p-8 lg:w-[48%]">
                    <span className="text-base font-medium text-brand-main">
                      SENDER INFO
                    </span>
                    {[
                      ["USER ID:", "8135315532"],
                      ["USER NAME:", "@MarveBC"],
                      ["EMAIL:", "marvebc@gmail.com"],
                      ["PHONE:", "+2348135315532"],
                      ["DATE OF BIRTH:", "28 Jan, 1993"],
                      ["USER SINCE:", "28 Jan, 2025"],
                      ["GENDER:", "Male"],
                      [
                        "ADDRESS:",
                        "211 Rock Haven, Jos, Plateau State, Nigeria",
                      ],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="w-full flex justify-between gap-4"
                      >
                        <span className="text-base text-brand-ash">
                          {label}
                        </span>
                        <span className="text-base text-brand-dark">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Section */}
                  <div className="w-[48%] min-h-[515px] bg-brand-graybg rounded-xl p-8 flex items-start flex-col gap-3">
                    <span className="text-base font-medium text-brand-main">
                      TRANSACTION INFO
                    </span>
                    {[
                      ["USER ID:", "8135315532"],
                      ["USER NAME:", "@MarveBC"],
                      ["EMAIL:", "marvebc@gmail.com"],
                      ["PHONE:", "+2348135315532"],
                      ["DATE OF BIRTH:", "28 Jan, 1993"],
                      ["USER SINCE:", "28 Jan, 2025"],
                      ["GENDER:", "Male"],
                      [
                        "ADDRESS:",
                        "211 Rock Haven, Jos, Plateau State, Nigeria",
                      ],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="w-full flex justify-between gap-4"
                      >
                        <span className="text-base text-brand-ash">
                          {label}
                        </span>
                        <span className="text-base text-brand-dark">
                          {value}
                        </span>
                      </div>
                    ))}
                    <div className="w-full bg-brand-white rounded-lg p-2">
                      {[
                        ["AMOUNT:", "N20,000"],
                        ["FEE:", "N50"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="w-full flex justify-between gap-4 my-2"
                        >
                          <span className="text-base text-brand-ash">
                            {label}
                          </span>
                          <span className="text-base text-brand-dark">
                            {value}
                          </span>
                        </div>
                      ))}
                      <hr />
                      <div className="w-full flex justify-between gap-4 my-2">
                        <span className="text-base text-brand-ash">TOTAL</span>
                        <span className="text-base text-brand-dark">
                          N20,050
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
                  {/* Left Section */}
                  <div className="w-full flex flex-col gap-3 bg-brand-graybg rounded-xl p-8 lg:w-[48%]">
                    <span className="text-base font-medium text-brand-main flex items-end gap-2">
                      <Store /> VENDER INFO
                    </span>
                    {[
                      ["USER ID:", "8135315532"],
                      ["USER NAME:", "@MarveBC"],
                      ["EMAIL:", "marvebc@gmail.com"],
                      ["PHONE:", "+2348135315532"],
                      ["DATE OF BIRTH:", "28 Jan, 1993"],
                      ["USER SINCE:", "28 Jan, 2025"],
                      ["GENDER:", "Male"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="w-full flex justify-between gap-4"
                      >
                        <span className="text-base text-brand-ash">
                          {label}
                        </span>
                        <span className="text-base text-brand-dark">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Mid Section */}
                  <div className="w-full flex flex-col gap-3 bg-brand-graybg rounded-xl p-8 lg:w-[48%]">
                    <span className="text-base font-medium text-brand-main flex items-end gap-2">
                      <Bike /> RIDER INFO
                    </span>
                    {[
                      ["USER ID:", "8135315532"],
                      ["USER NAME:", "@MarveBC"],
                      ["EMAIL:", "marvebc@gmail.com"],
                      ["PHONE:", "+2348135315532"],
                      ["DATE OF BIRTH:", "28 Jan, 1993"],
                      ["USER SINCE:", "28 Jan, 2025"],
                      ["GENDER:", "Male"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="w-full flex justify-between gap-4"
                      >
                        <span className="text-base text-brand-ash">
                          {label}
                        </span>
                        <span className="text-base text-brand-dark">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Section */}
                  <div className="w-full flex flex-col gap-3 bg-brand-graybg rounded-xl p-8 lg:w-[48%]">
                    <span className="text-base font-medium text-brand-main flex items-end gap-2">
                      <User /> CONSUNMER INFO
                    </span>
                    {[
                      ["USER ID:", "8135315532"],
                      ["USER NAME:", "@MarveBC"],
                      ["EMAIL:", "marvebc@gmail.com"],
                      ["PHONE:", "+2348135315532"],
                      ["DATE OF BIRTH:", "28 Jan, 1993"],
                      ["USER SINCE:", "28 Jan, 2025"],
                      ["GENDER:", "Male"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="w-full flex justify-between gap-4"
                      >
                        <span className="text-base text-brand-ash">
                          {label}
                        </span>
                        <span className="text-base text-brand-dark">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OneOrderModal;
