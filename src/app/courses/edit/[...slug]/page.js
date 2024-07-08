"use client";
import Loading from "@/components/Loadings/Loading";
import { fetcher } from "@/utils/helpers";
import React from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

import FormEditLession from "@/components/forms/FormEditLession";

const CoursesEidt = ({ params }) => {
  const { data, isLoading } = useSWR(
    `/api/admin/courses/${params?.slug[0]}/${params?.slug[1]}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  const dataLession = data?.data?.data?.chapters?.[0]?.lessions?.[0];
  const isLoadings = useSelector((state) => state.usersData.loading);
  return (
    <div className=" max-w-[calc(100%-278px)] absolute right-0 left-[278px]">
      <FormEditLession
        dataLession={dataLession}
        chapter={data?.data?.data?.chapters?.[0]}
        id={params?.slug[1]}
      />
      {(isLoadings || isLoading) && <Loading />}
    </div>
  );
};

export default CoursesEidt;
