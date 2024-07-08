"use client";
import React, { useState } from "react";
import { useSWRConfig } from "swr";
import {
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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/DeleteIcon ";
import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon";
import { IoIosWarning } from "react-icons/io";
import { deleteAllUser, deleteUser } from "@/services/user.service";
import toast from "react-hot-toast";
import { isCan } from "@/services/role.service";
import TopContentAdmin from "@/components/Tables/TableContents/TopContentAdmin";
import BtnAddRole from "@/components/Buttons/BtnAddRole";
const statusColorMap = {
  active: "success",
  block: "danger",
};
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PHONE", uid: "phone", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "Phân Quyền", uid: "role" },
  { name: "JOIN ON", uid: "joinOn", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
const INITIAL_VISIBLE_COLUMNS = ["name", "email", "status", "actions", "role"];
const AdminList = ({
  adminsData,
  idList,
  onPage,
  page,
  pages,
  onSearch,
  roles,
  queryMutate
}) => {
  let admins = adminsData || [];
  const { mutate } = useSWRConfig();
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [userSelected, setUserSelected] = useState(null);
  const [listIds, setListIds] = useState(idList || []);
  const [isDel, setIsDel] = useState(false);
  const ids = Array.from(selectedKeys).map((id) => id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(INITIAL_VISIBLE_COLUMNS).includes(column.uid)
    );
  }, [INITIAL_VISIBLE_COLUMNS]);

  const renderCell = React.useCallback((admin, columnKey) => {
    const cellValue = admin[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: admin.avatar }}
            description={admin.email}
            name={cellValue}
          >
            {admin.email}
          </User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[admin.status]}
            size="sm"
            variant="flat"
          >
            {`${cellValue}`}
          </Chip>
        );
      case "role":
        return <BtnAddRole id={admin?.id} />;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem>View</DropdownItem>
                {isCan(roles, "user.delete") && (
                  <DropdownItem
                    onClick={() => {
                      handleOpenDeleteUser(admin?.id);
                    }}
                  >
                    Delete
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      onPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      onPage(page - 1);
    }
  }, [page]);


  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${admins?.length} selected`}
        </span>
        {pages > 0 ? (
          <div className="flex justify-center w-full">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => onPage(page)}
            />
          </div>
        ) : null}
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, admins?.length, page, pages]);
  //
  const handleOpenModalDelete = () => {
    setIsDel(true);
    if (selectedKeys !== "all") {
      setListIds(ids);
    } else {
      setListIds(idList);
    }
    onOpen();
  };

  const handleRemoveAll = async () => {
    try {
      const res = await deleteAllUser({ ids: listIds });
      console.log(res);
      if (res?.data?.status === 200) {
        mutate("/api/admin/admins");
        toast.success("Xoá thành công!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDeleteUser = (id) => {
    setIsDel(false);
    setUserSelected(id);
    onOpen();
  };
  const handleDeleteUser = async () => {
    try {
      const res = await deleteUser(userSelected);
      if (res?.data?.status === 200) {
        mutate("/api/admin/admins");
        toast.success("Xoá thành công!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="relative">
        {selectedKeys?.size > 1 || selectedKeys === "all" ? (
          <span className="absolute top-[119px] left-[60px] z-20">
            {isCan(roles, "user.delete") && (
              <span
                className="text-xl cursor-pointer text-danger active:opacity-50"
                onClick={handleOpenModalDelete}
              >
                <DeleteIcon />
              </span>
            )}
          </span>
        ) : (
          ""
        )}
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[380px]",
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          topContent={
            isCan(roles, "user.create") && (
              <TopContentAdmin admins={admins} onSearch={onSearch} queryMutate={queryMutate}/>
            )
          }
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={admins}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* model xoá nhiều user */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-start gap-1">
                  <IoIosWarning fontSize={"1.6rem"} color="red" />
                  Confirm
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="bordered" onPress={onClose}>
                    Close
                  </Button>
                  {isDel && (
                    <Button
                      color="danger"
                      onPress={onClose}
                      variant="bordered"
                      onClick={handleRemoveAll}
                    >
                      Remove all to trash
                    </Button>
                  )}
                  {!isDel && (
                    <Button
                      color="danger"
                      onPress={onClose}
                      variant="bordered"
                      onClick={handleDeleteUser}
                    >
                      Remove
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </>
  );
};

export default AdminList;
