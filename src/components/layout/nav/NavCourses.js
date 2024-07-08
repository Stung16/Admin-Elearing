import React, { useState } from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import { IoIosBookmarks } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

import { usePathname } from "next/navigation";

const NavCourses = () => {
  const pathname = usePathname();

  const [hide, setHide] = useState(false);
  // const { data, isLoading } = useSWR(`/api/admin/courses`, fetcher);
  // const listcourses = data?.data?.data?.courses;
  // console.log(listcourses);
  return (
    <li
      className="text-sm select-none text-gray-500 "
      onClick={() => {
        setHide(true);
      }}
    >
      <Link
        href="#"
        className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700"
      >
        <div className="pr-2">
          <IoIosBookmarks />
        </div>
        <div>Courses</div>
        <div className="absolute right-1.5 transition-transform duration-300">
          {hide ? <FaAngleDown /> : <FaAngleRight />}
        </div>
      </Link>

      <div
        className={`pl-4 pr-2 overflow-hidden transition-all transform translate duration-300 ${
          hide ? "max-h-fit" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col mt-2 pl-2 text-gray-500 border-l border-gray-700 space-y-1 text-xs">
          <li className="text-sm select-none text-gray-500 ">
            <Link
              href="/courses/free"
              className={`${
                pathname === "/courses/free" && "bg-gray-700 text-white"
              } flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700`}
            >
              <div>Course Free</div>
            </Link>
          </li>
          <li className="text-sm select-none text-gray-500 ">
            <Link
              href="/courses/pro"
              className={`${
                pathname === "/courses/pro" && "bg-gray-700 text-white"
              } flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700`}
            >
              <div>Course Pro</div>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default NavCourses;
