import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { useDebouncedCallback } from "use-debounce";
import BtnCreateUser from "@/components/Buttons/BtnCreateUser";
import useSWR from "swr";
import { fetcher } from "@/utils/helpers";

const TopContentAdmin = ({ admins, onSearch, queryMutate}) => {
  const { data, isLoading } = useSWR(`/api/admin/courses`, fetcher);
  const [searchValue, setSearchValue] = useState("");
  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };
  const debounced = useDebouncedCallback((value) => {
    onSearch(value?.toLowerCase()?.trim());
  }, 1000);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    debounced(e.target.value);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          onClear={handleClear}
          onChange={handleChange}
          value={searchValue}
        />
        <div className="flex gap-3">
          <BtnCreateUser dataCourse={data?.data?.data?.courses} queryMutate={queryMutate} type={'admin'}/>
          <div></div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">{`Total ${admins?.length} user`}</span>
      </div>
    </div>
  );
};

export default TopContentAdmin;
