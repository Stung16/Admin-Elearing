import React, { useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { isCan } from "@/services/role.service";
import { IoIosWarning } from "react-icons/io";
import { deleRole } from "@/services/role.service";
import TopContentRole from "@/components/Tables/TableContents/TopContentRole";
import BtnEditRole from "@/components/Buttons/BtnEditRole";

const columns = [
  { name: "STT", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "ACTIONS", uid: "actions" },
];

const RoleList = ({ roleData, roles }) => {
  let data = roleData?.rows || [];
  const idRef = useRef(1)
  const { mutate } = useSWRConfig();
  const [id, setId] = useState();
  const [keyid, setKeyId] = useState(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "permissions":
        return <span>Quản lý {user.name}</span>;
      case "missions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            {user.name}
          </div>
        );
      case "id":
        return <span>{idRef.current}</span>;

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            {isCan(roles, "role.update") && <BtnEditRole idRole={user.id} />}
            {isCan(roles, "role.update") && (
              <Button
                color="danger"
                onClick={() => {
                  setId(user.id);
                  onOpen();
                }}
              >
                Xoá
              </Button>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const handleDeleteRole = async (id) => {
    try {
      const res = await deleRole(id);
      if (res.data.status === 200) {
        toast.success("Xoá thành công");
        mutate("/api/admin/role");
      }
    } catch (error) {}
  };

  return (
    <section className="relative">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        topContent={isCan(roles, "role.create") && <TopContentRole />}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
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
                <Button
                  color="danger"
                  onPress={onClose}
                  variant="bordered"
                  onClick={() => {
                    handleDeleteRole(id);
                  }}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default RoleList;
