"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import useSWR from "swr";
import { fetcher } from "@/utils/helpers";
import AdminList from "../../../components/Tables/ListTable/adminList";
import queryString from "query-string";
import NoRole from "@/components/Customs/NoRole";
import Loading from "@/components/Loadings/Loading";
import LoadingMax from "@/components/Loadings/LoadingMax";

const Admins = () => {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const query = {
    page,
    limit: 5,
    q: search,
  };
  const queryStringified = queryString.stringify(query);
  const { data, isLoading } = useSWR(
    `/api/admin/admins?${queryStringified}`,
    fetcher
  );
  const pages = useMemo(() => {
    return data?.data?.data?.count
      ? Math.ceil(data?.data?.data?.count / query.limit)
      : 0;
  }, [data, query.limit]);
  const adminsData = data?.data?.data?.admins;
  const idList = adminsData?.map((m) => m?.id);
  const roles = data?.data?.data?.permissions;
  if (!roles?.length || !roles.includes("user.read")) {
    return (
      <>
        <NoRole />
        {isLoading && <LoadingMax />}
      </>
    );
  }
  return (
    <div className="flex flex-col">
      <section>
        <div className="flex py-5 justify-between">
          <div className="flex flex-col">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>admins</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      {/* adminsTable */}

      <AdminList
        adminsData={adminsData}
        idList={idList}
        pages={pages}
        page={page}
        onPage={setPage}
        onSearch={setSearch}
        roles={roles}
        queryMutate={`/api/admin/admins?${queryStringified}`}
      />
    </div>
  );
};

export default Admins;
