import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  Checkbox,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { roleSlice } from "@/redux/slice/roleSlice";
const { upadateActions } = roleSlice.actions;
import { PlusIcon } from "@/components/icons/PlusIcon";
import { addRole, getAllModel } from "@/services/role.service";
import { useDispatch, useSelector } from "react-redux";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

const BtnCreateRole = () => {
  const { mutate } = useSWRConfig();
  const dispatch = useDispatch();
  const actions = useSelector((state) => state.roleData.actionsa);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllModel();
        if (res?.data?.status === 200) {
          dispatch(upadateActions(res?.data?.data?.rows));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const [name, setName] = useState({
    name: "",
  });
  const [permissionss, setPermissionss] = useState({
    permissions: [],
  });
  const columns = [
    { name: "Quyền", uid: "permissions" },
    { name: "Chức năng", uid: "missions" },
  ];
  const renderCell = React.useCallback((user, columnKey) => {
    const ListActions = user?.actions.split(",");
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "permissions":
        return <span>Quản lý {user.name}</span>;
      case "missions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            {ListActions?.map((item, index) => {
              return (
                <Checkbox
                  name="permissions"
                  key={index}
                  value={item}
                  color="primary"
                  onChange={(e) => {
                    if (e.target.checked) {
                      const updatedForm = { ...permissionss };
                      updatedForm.permissions.push(e.target.value);
                      setPermissionss(updatedForm);
                    }
                  }}
                >
                  {item?.split(".")?.[1]}
                </Checkbox>
              );
            })}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (name.name === "") {
      toast.error("Name không được để trống!!!");
    } else {
      const payload = {};
      Object.assign(payload, {
        name: name.name,
        permissions: permissionss.permissions,
      });
      const res = await addRole(payload);
      console.log(res);
      setName({ name: "" });
      setPermissionss({ permissions: [] });
      if (res?.data?.status === 201) {
        mutate("/api/admin/role");
        toast.success("Thêm thành công!!!");
      } else {
        toast.error(`${res?.data?.message}!!!`);
      }
      onClose();
    }
  };
  return (
    <div>
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new role
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleAdd} className="flex gap-2 flex-col">
                  <Input
                    size={"sm"}
                    type="text"
                    label="Name role"
                    name="name"
                    value={name.name}
                    onChange={(e) => {
                      const updatedForm = { ...name };
                      // Thêm phần tử mới vào mảng permissions trong bản sao
                      updatedForm.name = e.target.value;
                      // Cập nhật state với bản sao mới
                      setName(updatedForm);
                    }}
                  />
                  <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    classNames={{
                      wrapper: "max-h-[382px]",
                    }}
                  >
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn key={column.uid}>
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody emptyContent={"No users found"} items={actions}>
                      {(item) => (
                        <TableRow key={item.id}>
                          {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setName({ name: "" });
                    setPermissionss({ permissions: [] });
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button color="primary" onClick={handleAdd}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BtnCreateRole;
