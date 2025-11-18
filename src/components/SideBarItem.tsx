"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SideBarItemProps = {
  link: string;
  title: string;
  icon: React.ReactNode;
};

const SideBarItem = ({ link, title, icon }: SideBarItemProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={`group transition-fx flex items-center w-full p-2 py-4 pl-4 gap-2 cursor-pointer rounded-lg font-geistsans font-normal text-sm text-brand-ash hover:pl-8 hover:text-brand-white hover:bg-brand-main ${
        link === pathname && `text-brand-white bg-brand-main pl-8`
      }`}
    >
      <span>{icon}</span>
      {title}
    </Link>
  );
};

export default SideBarItem;

// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";

// type SideBarItemProps = {
//   link: string;
//   title: string;
//   icon: React.ReactNode;
// };

// const SideBarItem = ({ link, title, icon }: SideBarItemProps) => {
//   const pathname = usePathname();

//   const handleNavigation = (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>
//   ) => {
//     e.preventDefault();
//     if (link !== pathname) {
//       // Trigger a full page reload for a new link
//       window.location.href = link;
//     }
//   };

//   return (
//     <div
//       onClick={handleNavigation}
//       className={`group transition-fx flex items-center w-full p-2 py-4 pl-4 gap-2 cursor-pointer rounded-lg font-geistsans font-normal text-sm text-brand-ash hover:pl-8 hover:text-brand-white hover:bg-brand-main ${
//         link === pathname && `text-brand-white bg-brand-main`
//       }`}
//     >
//       <span>{icon}</span>
//       {title}
//     </div>
//   );
// };

// export default SideBarItem;
