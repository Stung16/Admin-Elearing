"use client";
import React, { Fragment, useCallback, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import "../../styles/sidebarCourse.css";
import { FaPlus } from "react-icons/fa";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/helpers";
import Chapter from "./item/Chapter";
import Loading from "../Loadings/Loading";
import { usePathname } from "next/navigation";
const sideBarCourse = () => {
  const pathname = usePathname();
  const parts = useCallback(() => {
    return pathname.split("/");
  }, [pathname]);
  const { data, isLoading } = useSWR(
    `/api/admin/courses/${parts()?.[3]}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  const dataChapter = data?.data?.data;
  // console.log(dataChapter);

  // const [isShow, setIsShow] = useState(false);
  // const handleEllipsisClick = () => {
  //   // Đảo ngược giá trị của isShow để hiển thị/ẩn dropdown
  //   setIsShow(!isShow);
  // };
  return (
    <section className=" w-[278px] bg-[#333] pb-[2px] fixed top-0 left-0 bottom-0">
      {isLoading && <Loading />}
      <a href="/" className="flex items-center pl-[15px] min-h-[67px]">
        <img
          className="h-[32px] w-[32px] rounded-[8px] p-0 m-0 border-[0px]"
          src="/images/f8-icon.18cd71cfcfa33566a22b.png"
          alt="logo"
        />
        <div className="text-[19px] font-medium text-[#fff] pl-[7px]">
          <p>F8 Admin</p>
        </div>
      </a>
      <div className="pl-[6px] text-[#fff] flex flex-col h-[100%] w-[100%] mb-0 ">
        <p className="">Fullstack NodeJS</p>
        {/* List */}
        <div className="pb-10">
          {/* 1. */}
          <div className="flex flex-col flex-wrap overflow-y-auto overflow-x-hidden">
            {dataChapter?.chapters?.map((chap) => {
              return (
                <Fragment key={chap?.id}>
                  <Chapter
                    data={chap}
                    queryString={`/api/admin/courses/${parts()?.[3]}`}
                  />
                </Fragment>
              );
            })}
          </div>
          {/* 2. */}
        </div>
      </div>
    </section>
  );
};

export default sideBarCourse;
