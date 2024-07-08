import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@nextui-org/input";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { addLession } from "@/services/course.service";

const BtnAddNewLession = ({ chapter_id, queryString }) => {
  const { mutate } = useSWRConfig();
  const [title, setTitle] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleCreateLession = async () => {
    try {
      const res = await addLession({
        title,
        chapter_id,
      });
      if (res?.data?.status === 200) {
        toast.success("Success");
        onClose();
        mutate(queryString);
        setTitle("");
      } else {
        toast.error("An error has occurred!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred!");
    }
  };
  return (
    <div>
      <div
        className="lession_item"
        onClick={() => {
          onOpen();
          console.log(chapter_id);
        }}
      >
        <div className="flex items-center">
          <span className="pr-[7px] text-[#f05123]">
            <FaPlus />
          </span>
          <p className="leading-[19px] opacity-60">Thêm bài học!</p>
        </div>
      </div>
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm bài học mới
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Title"
                  placeholder="Enter your title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  //   onPress={onClose}
                  onClick={() => {
                    handleCreateLession();
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BtnAddNewLession;
