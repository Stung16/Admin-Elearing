"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher } from "@/utils/helpers";
import Loading from "@/components/Loadings/Loading";
import CourseListFree from "./courseListFree";
import { useSelector } from "react-redux";
const CoursesFree = () => {
  const isLoadings = useSelector((state) => state.usersData.loading);
  const { data, isLoading } = useSWR(`/api/admin/courses`, fetcher, {
    keepPreviousData: true,
  });
  const listcourses = data?.data?.data?.courses?.filter(
    (item) => item?.type === "free"
  );
  const idList = listcourses?.map((m) => m?.id);
  return (
    <div className="flex flex-col">
      <section>
        <div className="flex py-5 justify-between">
          <div className="flex flex-col">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem isDisabled>courses</BreadcrumbItem>
              <BreadcrumbItem>free</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-5">Danh sách khoá học</h2>
      </section>
      {/* adminsTable */}

      {(isLoading || isLoadings) && <Loading />}
      <CourseListFree courseData={listcourses} idList={idList} />
    </div>
  );
};

export default CoursesFree;
