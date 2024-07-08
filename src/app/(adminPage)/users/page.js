"use client";
import React, { useState, useMemo } from "react";

import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Loading from "@/components/Loadings/Loading";
import useSWR from "swr";
import queryString from "query-string";
import { fetcher } from "@/utils/helpers";
import NoRole from "@/components/Customs/NoRole";
import UserList from "@/components/Tables/ListTable/UserList";

const Userspage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const query = {
    page,
    limit: 5,
    q: search,
  };
  const queryStringified = queryString.stringify(query);
  const { data, isLoading } = useSWR(
    `/api/admin/user?${queryStringified}`,
    fetcher
  );

  const pages = useMemo(() => {
    return data?.data?.data?.count
      ? Math.ceil(data?.data?.data?.count / query.limit)
      : 0;
  }, [data, query.limit]);

  const usersData = data?.data?.data?.users;
  const roles = data?.data?.data?.permissions;
  if (!roles?.length || !roles.includes('user.read')) {
    return (
      <>
        <NoRole />
        {isLoading && <Loading />}
      </>
    );
  }
  const idList = usersData?.map((m) => m?.id);
  return (
    <div className="flex flex-col">
      <section>
        <div className="flex py-5 justify-between">
          <div className="flex flex-col">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>users</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      {/* userTable */}
      <UserList
        usersData={usersData}
        idList={idList}
        pages={pages}
        page={page}
        onPage={setPage}
        onSearch={setSearch}
        roles={roles}
        queryMutate={`/api/admin/user?${queryStringified}`}
      />

    </div>
  );
};

export default Userspage;
