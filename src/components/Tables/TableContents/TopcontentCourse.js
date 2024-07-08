"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { useDebouncedCallback } from "use-debounce";
import { PlusIcon } from "@/components/icons/PlusIcon";
import Link from "next/link";

const TopcontentCourse = ({ courses }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
        />
        <div className="flex gap-3">
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onClick={() => router.push("/courses/add")}
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">{`Total ${courses} course`}</span>
      </div>
    </div>
  );
};

export default TopcontentCourse;
