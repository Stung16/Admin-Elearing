import React, { useState } from "react";
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
} from "@nextui-org/react";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { addUser } from "@/services/user.service";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

const BtnCreateAdmin = () => {
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [err, setErr] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);
  const handleAddUser = async () => {
    try {
      Object.assign(form, {
        types: "admin",
      });
      const res = await addUser(form);
      if (res?.data?.status === 400) {
        setErr(...err, data?.errors);
      }
      if (res?.data?.status === 201) {
        mutate("/api/admin/admins");
        toast.success("Thêm thành công");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
                Add new admin
              </ModalHeader>
              <ModalBody>
                <section className="relative">
                  <form action="">
                    <div className="flex mb-6 gap-4 items-center justify-end">
                      <span>Avatar User</span>
                      <UpLoadImage
                        userInfo={
                          "http://res.cloudinary.com/dtht61558/image/upload/v1712810599/avatar_upload/avatar_upload_UvDux3.jpg"
                        }
                        onFiles={setFiles}
                        files={files}
                      />
                    </div>
                    <div className="flex gap-5 flex-col">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Input
                            key={"outside"}
                            type="userName"
                            name="name"
                            isRequired
                            label="User Name"
                            labelPlacement={"outside"}
                            onChange={handleChange}
                          />
                          <span className="text-red-600">
                            {err?.name && err?.name}
                          </span>
                        </div>
                        <div className="flex-1">
                          <Input
                            value={value}
                            key={"outside"}
                            type="email"
                            label="Email"
                            name="email"
                            isInvalid={isInvalid}
                            isRequired
                            color={isInvalid && "danger"}
                            errorMessage={isInvalid && "Vui lòng nhập email"}
                            onValueChange={setValue}
                            labelPlacement={"outside"}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Input
                            key={"outside"}
                            type="phone"
                            label="Phone"
                            datatype=""
                            onChange={handleChange}
                            name="phone"
                            labelPlacement={"outside"}
                          />
                          <span className="text-red-600">
                            {err?.phonehone && err?.phone}
                          </span>
                        </div>
                        <div className="flex-1">
                          <Input
                            key={"outside"}
                            type="password"
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            isRequired
                            labelPlacement={"outside"}
                          />
                          <span className="text-red-600">
                            {err?.password && err?.password}
                          </span>
                        </div>
                      </div>
                      <div>
                        {/* <EditForm form={form} setForm={setForm} errs={errs} /> */}
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-1 w-full">
                          <CheckboxGroup
                            color="warning"
                            value={form.courses}
                            label="Danh sách khoá học"
                            onValueChange={(e) => {
                              setForm({ ...form, ["courses"]: e });
                            }}
                            className="max-h-[200px]"
                          >
                            {dataCourse?.map((course) => {
                              return (
                                <Checkbox value={course?.id} key={course?.id}>
                                  {course?.title}
                                </Checkbox>
                              );
                            })}
                          </CheckboxGroup>

                          {/* <p className="mt-4 ml-1 text-default-500">
                          Selected: {groupSelected.join(", ")}
                        </p> */}
                        </div>
                      </div>
                    </div>

                    {/* <button className="bg-red-800">submit</button> */}
                  </form>
                  {/* {loading && <Loading />} */}
                </section>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleAddUser}>
                  Save Contact
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BtnCreateAdmin;
