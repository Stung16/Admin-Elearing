import React, { useState } from "react";
import {
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
// import UpLoadImage from "../../coursesPage/free/content/upLoadImage";
import Loading from "@/components/Loadings/Loading";
import UpLoadImage from "../boxs/courseFreecontent/upLoadImage";
const BtnCreateUser = ({ dataCourse, queryMutate, type }) => {
  const { mutate } = useSWRConfig();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    courses: [],
  });
  const [err, setErr] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([]);

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);
  const handleAddUser = async () => {
    try {
      if (form.name === "" || form.email === "" || form.password === "") {
        return alert("Vui lòng nhập thông tin");
      }
      Object.assign(form, {
        types: type,
      });
      if (files?.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));
        setLoading(true);
        const ress = await fetch(`http://localhost:5000/api/admin/upload`, {
          method: "POST",
          body: formData,
        }).then((ress) => ress.json());
        console.log(ress);
        if (ress?.status === 201) {
          console.log(123);
          Object.assign(form, {
            avatar: ress?.data?.url,
          });
        }
      }
      const res = await addUser(form);
      if (res?.data?.status === 400) {
        setErr(res?.data?.errors);
      }
      if (res?.data?.status === 201) {
        mutate(queryMutate);
        toast.success("Thêm thành công");
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {loading && <Loading />}
      <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
        Add New
      </Button>
      <Modal
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={"3xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new user
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

export default BtnCreateUser;
