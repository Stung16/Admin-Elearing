import React, { useEffect, useState } from "react";
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
  Input,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { addUser } from "@/services/user.service";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import useSWR from "swr";
import { fetcher } from "@/utils/helpers";
import { addPermisiion } from "@/services/role.service";

const BtnAddRole = ({ id }) => {
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR(`/api/admin/permission/${id}`, fetcher);
  const listRoles = data?.data?.roles;
  const [selected, setSelected] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ids: selected,
      userId: id,
    };
    const res = await addPermisiion(payload);
    if (res?.data?.status === 200) {
      toast.success("Thêm thành công");
      mutate(`/api/admin/permission/${id}`)
      onClose();
    } else {
      toast.error(`${res?.data?.message}`);
      onClose();
    }
  };
  useEffect(() => {
    setSelected(data?.data?.user?.roles?.map((item) => item?.id));
  }, [id, data, isOpen]);
  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Phân quyền
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm quyền
              </ModalHeader>
              <ModalBody>
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3">
                    <CheckboxGroup
                      color="warning"
                      value={selected}
                      onValueChange={setSelected}
                    >
                      {listRoles?.map((item) => {
                        return (
                          <Checkbox
                            value={item?.id}
                            key={item?.id}
                          >
                            {item?.name}
                          </Checkbox>
                        );
                      })}
                    </CheckboxGroup>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Huỷ
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                  Lưu
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default BtnAddRole