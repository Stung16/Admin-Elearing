"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Select,
  SelectItem,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loadings/Loading";
import { useSWRConfig } from "swr";
import { Schema } from "@/utils/helpers";
import UpLoadImage from "@/components/boxs/courseFreecontent/upLoadImage";
import Client from "@/config/Client";
import EditForm from "@/components/boxs/courseFreecontent/editForm/EditForm";

const AddCoursePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [files, setFiles] = useState([]);
  const [errs, setErrs] = useState({});
  const [form, setForm] = useState({
    title: "",
    descriptions: "",
    content: "",
    price: 0,
    sale: 0,
    isPublic: false,
    isComming: true,
    type: "free",
    thumb:
      "https://res.cloudinary.com/dtht61558/image/upload/v1712810599/avatar_upload/avatar_upload_UvDux3.jpg",
  });
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const errs = Schema(form);
    console.log(errs);
    try {
      if (!Object.keys(errs)?.length) {
        if (files?.length) {
          const formData = new FormData();
          files.forEach((file) => formData.append("file", file));
          const res = await fetch(`http://localhost:5000/api/admin/upload`, {
            method: "POST",
            body: formData,
          }).then((res) => res.json());
          if (res.status === 201) {
            form.thumb = res?.data?.url;
          } else {
            toast.error("An error has occurred!");
          }
        }
        const ress = await Client.post("/api/admin/courses", form);
        if (ress?.data?.status === 201) {
          mutate("/api/admin/courses");
          router.push(`/courses/${form.type}`);
          toast.success("Thêm thành công!!!");
        }
      } else {
        setErrs(errs);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred!");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col">
      <section>
        <div className="flex py-5 justify-between">
          <div className="flex flex-col">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link href={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem isDisabled>courses</BreadcrumbItem>
              <BreadcrumbItem>add</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      {/* userTable */}
      <section className="relative">
        <form action="">
          <div className="flex mb-6 gap-4 items-center justify-end">
            <span>Avatar Courses</span>
            <UpLoadImage
              userInfo={form.thumb}
              onFiles={setFiles}
              files={files}
            />
          </div>
          <div className="flex gap-5 flex-col">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  key={"1"}
                  type="title"
                  name="title"
                  value={form.title}
                  isRequired
                  label="Name courses"
                  labelPlacement={"outside"}
                  onChange={handleChange}
                />
                {errs?.title && <p className="text-red-600">{errs?.title}</p>}
              </div>
              <div className="flex-1">
                <Input
                  key={"2"}
                  type="descriptions"
                  label="Descriptions"
                  value={form.descriptions}
                  name="descriptions"
                  isRequired
                  labelPlacement={"outside"}
                  onChange={handleChange}
                />
                {errs?.descriptions ? (
                  <p className="text-red-600">{errs?.descriptions}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  key={"3"}
                  type="number"
                  label="Price"
                  datatype="price"
                  value={form.price}
                  onChange={handleChange}
                  defaultValue={form.price}
                  min={0}
                  name="price"
                  labelPlacement={"outside"}
                />
                {errs?.price && <p className="text-red-600">{errs?.price}</p>}
              </div>
              <div className="flex-1">
                <Input
                  key={"4"}
                  type="number"
                  label="Sale"
                  name="sale"
                  value={form.sale}
                  defaultValue={form.sale}
                  onChange={handleChange}
                  labelPlacement={"outside"}
                />
                {errs?.sale && <p className="text-red-600">{errs?.sale}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <RadioGroup
                  label="Types course"
                  orientation={"horizontal"}
                  value={form.type}
                  onValueChange={(e) => {
                    setForm({ ...form, ["type"]: e });
                  }}
                >
                  <Radio value="free">free</Radio>
                  <Radio value="pro">pro</Radio>
                  <Radio value="offline">offline</Radio>
                </RadioGroup>
                {errs?.type && <p className="text-red-600">{errs?.type}</p>}
              </div>

              <div>
                <RadioGroup
                  label="Is comming"
                  value={form.isComming}
                  onValueChange={(e) => {
                    setForm({ ...form, ["isComming"]: e });
                  }}
                  orientation={"horizontal"}
                  className="flex"
                >
                  <Radio value={true}>true</Radio>
                  <Radio value={false}>false</Radio>
                </RadioGroup>
                {errs?.isComming && (
                  <p className="text-red-600">{errs?.isComming}</p>
                )}
              </div>
              <div>
                <RadioGroup
                  label="Is public"
                  value={form.isPublic}
                  onValueChange={(e) => {
                    setForm({ ...form, ["isPublic"]: e });
                  }}
                  orientation={"horizontal"}
                  className="flex"
                >
                  <Radio value={true}>true</Radio>
                  <Radio value={false}>false</Radio>
                </RadioGroup>
                {errs?.isPublic && (
                  <p className="text-red-600">{errs?.isPublic}</p>
                )}
              </div>
            </div>
            <div>
              <EditForm form={form} setForm={setForm} errs={errs} />
            </div>
          </div>
          <button className="bg-red-800" onClick={handleSubmit}>
            submit
          </button>
        </form>
        {loading && <Loading />}
      </section>
    </div>
  );
};

export default AddCoursePage;
