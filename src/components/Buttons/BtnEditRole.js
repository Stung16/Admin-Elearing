import {
    Button,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableRow,
    TableBody,
    TableCell,
    CheckboxGroup,
    Checkbox,
  } from "@nextui-org/react";
  import useSWR from "swr";
  import { fetcher } from "@/utils/helpers";
  import { useSelector } from "react-redux";
  import React, { useEffect, useState } from "react";
  import { useSWRConfig } from "swr";
  import { HandleEditRole } from "@/services/role.service";
  const columns = [
    { name: "Quyền", uid: "permissions" },
    { name: "Chức năng", uid: "missions" },
  ];
  import toast from "react-hot-toast";
  const BtnEditRole = ({ idRole }) => {
    const { mutate } = useSWRConfig();
    const [name, setName] = useState("");
    const [selected, setSelected] = useState([]);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { data: roleIntance, isLoading } = useSWR(
      `/api/admin/role/${idRole}`,
      fetcher
    );
    const actions = useSelector((state) => state.roleData.actionsa);
    const renderCell = React.useCallback(
      (user, columnKey) => {
        const ListActions = user?.actions.split(",");
        const cellValue = user[columnKey];
  
        switch (columnKey) {
          case "permissions":
            return <span>Quản lý {user.name}</span>;
          case "missions":
            return (
              <div className="relative flex justify-start items-center gap-2">
                <CheckboxGroup
                  className="gap-1"
                  orientation="horizontal"
                  defaultValue={selected}
                  onValueChange={setSelected}
                >
                  {ListActions?.map((item, index) => {
                    return (
                      <Checkbox value={item} key={index} defaultSelected>
                        {item?.split(".")?.[1]}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              </div>
            );
          default:
            return cellValue;
        }
      },
      [roleIntance, idRole, isOpen]
    );
    const handleEdit = async (id) => {
      const payload = {
        name: name,
        permissions: selected,
      };
      const res = await HandleEditRole(id, payload);
      if (res.data?.status === 200) {
        toast.success("Cập nhật thành công");
        mutate(`/api/admin/role/${idRole}`);
        mutate(`/api/admin/role`);
        onClose();
      } else {
        toast.error("Cần ít nhất 1 chức năng");
      }
    };
    useEffect(() => {
      setName(roleIntance?.data?.data?.name);
      setSelected(
        roleIntance?.data?.data?.permissions?.map((item) => item?.value)
      );
    }, [roleIntance, idRole, isOpen]);
    return (
      <div>
        <Button color="warning" onClick={() => onOpen()}>
          Sửa
        </Button>
        <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit role
                </ModalHeader>
                <ModalBody>
                  <form action="" className="flex gap-2 flex-col">
                    <Input
                      size={"sm"}
                      type="text"
                      label="Name role"
                      defaultValue={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      name="name"
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
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      handleEdit(idRole);
                      // onClose();
                    }}
                  >
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
  
  export default BtnEditRole;
  