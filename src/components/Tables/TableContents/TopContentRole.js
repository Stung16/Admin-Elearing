import React from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { usersSlice } from "@/redux/slice/usersSlice";
import BtnCreateRole from "@/components/Buttons/BtnCreateRole";
const { upadateUsers, upadateLoading } = usersSlice.actions;

const TopContentRole = ({ rolesData }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          //   value={filterValue}
          //   onClear={() => onClear()}
          //   onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <BtnCreateRole rolesData={rolesData} />
          <div></div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">{`Total ${rolesData?.count} users`}</span>
      </div>
    </div>
  );
};

export default TopContentRole;
