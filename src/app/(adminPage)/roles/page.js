"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/utils/helpers";
import RoleList from "../../../components/Tables/ListTable/roleList";
import NoRole from "@/components/Customs/NoRole";
import LoadingMax from "@/components/Loadings/LoadingMax";

const Roles = () => {
  const { data, isLoading } = useSWR("/api/admin/role", fetcher);
  const rolesData = data?.data?.data.roles;
  const roles = data?.data?.data.permissions;
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
              <BreadcrumbItem>roles</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      {/* roleTable */}
      <RoleList roleData={rolesData} roles={roles} />

    </div>
  );
};

export default Roles;
