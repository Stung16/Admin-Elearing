"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import { IoIosBookmarks } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import NavCourses from "./nav/NavCourses";
import { FaUser } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
const SideBar = () => {
  // const isFull = useSelector((state) => state.help.isFull);
  const pathname = usePathname();
  return (
    // <div className={`sidebar ${isFull && 'sidebarHide'} max-h-screen top-0 h-screen bg-gray-800 text-blue-100 w-64 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out z-501 `}>
    <div
      className={`sidebar max-h-screen top-0 h-screen bg-gray-800 text-blue-100 w-64 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out z-501 `}
    >
      <header className=" h-[64px] py-2 shadow-lg px-4 md:sticky top-0 bg-gray-800 z-40">
        <Link
          href="/"
          className={` text-white flex items-center space-x-2 group hover:text-white`}
        >
          <div>
            <svg
              className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-45 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div>
            <span className="text-2xl font-extrabold">F8</span>
            <span className="text-xs block">Project Management</span>
          </div>
        </Link>
      </header>

      <nav className="px-4 pt-4 scroller  max-h-[calc(100vh-64px)]">
        <ul className="flex flex-col ">
          {/* dashboard */}
          <li className="text-sm select-none text-gray-500">
            <Link
              href="/"
              className={`${
                pathname === "/" && "bg-gray-700 text-white"
              } flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700`}
            >
              <div className="pr-2">
                <i className="fa-solid fa-desktop pl-[2px]"></i>
              </div>
              <div>Dashboard </div>
            </Link>
          </li>
          <li className="text-sm select-none text-gray-500">
            <Link
              href="/roles"
              className={`${
                pathname === "/roles" && "bg-gray-700 text-white"
              } flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700`}
            >
              <div className="pr-2">
                <FaUserShield />
              </div>
              <div>Roles</div>
            </Link>
          </li>

          {/*quản lý user và quyền  */}
          <div>
            <div className="section border-b pt-4 mb-4 text-xs text-gray-600 border-gray-700 pb-1 pl-3">
              Managment
            </div>
            {/* admin */}
            <li className="text-sm select-none text-gray-500 ">
              <Link
                href={"/admins"}
                className={`${
                  pathname === "/admins" && "bg-gray-700 text-white"
                } flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700 `}
              >
                <div className="pr-2">
                  <FaUserSecret />
                </div>
                <div>Admins </div>
              </Link>
            </li>
            {/* users */}
            <li className="text-sm select-none text-gray-500 ">
              <Link
                href={"/users"}
                className={`${
                  pathname === "/users" && "bg-gray-700 text-white"
                } flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700 `}
              >
                <div className="pr-2">
                  <FaUser />
                </div>
                <div>Users </div>
              </Link>
            </li>
          </div>

          {/*Quản lý   */}
          <div>
            <div className="section border-b pt-4 mb-4 text-xs text-gray-600 border-gray-700 pb-1 pl-3">
              KHOÁ HỌC & THẢO LUẬN
            </div>
            <NavCourses />
            <li
              className="text-sm select-none text-gray-500 "
              onClick={() => {
                // setHide(true);
              }}
            >
              <Link
                href="#"
                className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700"
              >
                <div className="pr-2">
                  <IoIosBookmarks />
                </div>
                <div>Post</div>
                <div className="absolute right-1.5 transition-transform duration-300">
                  <FaAngleRight />
                </div>
              </Link>


              <div
                className={`pl-4 pr-2 overflow-hidden transition-all transform translate duration-300 max-h-0`}
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
            <li
              className="text-sm select-none text-gray-500 "
              onClick={() => {
                // setHide(true);
              }}
            >
              <Link
                href="#"
                className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700"
              >
                <div className="pr-2">
                  <IoIosBookmarks />
                </div>
                <div>Video</div>
                <div className="absolute right-1.5 transition-transform duration-300">
                  <FaAngleRight />
                </div>
              </Link>

              <div
                className={`pl-4 pr-2 overflow-hidden transition-all transform translate duration-300 max-h-0`}
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
            <li
              className="text-sm select-none text-gray-500 "
              onClick={() => {
                // setHide(true);
              }}
            >
              <Link
                href="#"
                className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700"
              >
                <div className="pr-2">
                  <IoIosBookmarks />
                </div>
                <div>Banner</div>
                <div className="absolute right-1.5 transition-transform duration-300">
                  <FaAngleRight />
                </div>
              </Link>

              <div
                className={`pl-4 pr-2 overflow-hidden transition-all transform translate duration-300 max-h-0`}
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
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
