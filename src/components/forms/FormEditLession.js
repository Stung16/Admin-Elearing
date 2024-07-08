import React, { useEffect, useState } from "react";

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
  Textarea,
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
import { editLession } from "@/services/course.service";
const FormEditLession = ({ dataLession, chapter, id }) => {
  const [form, setForm] = useState({
    description: "",
    content: "",
    link_video: "",
    type_lession: "text",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editLession(form, id);
    console.log(res);
    if (res.data?.status === 200) {
      toast.success("update success!!!");
    } else {
      toast.error("An error has occurred!");
    }
  };
  useEffect(() => {
    setForm({
      description: dataLession?.description,
      content: dataLession?.content,
      link_video: dataLession?.link_video,
      type_lession: dataLession?.type_lession,
    });
  }, [dataLession, chapter]);
  return (
    <div className="form_lession px-3 pt-10">
      <section className="relative">
        <form action="">
          <div className="flex gap-5 flex-col">
            <div className="flex-1 ">
              <Select
                isDisabled
                label="Chương học *"
                placeholder="Select an animal"
                defaultSelectedKeys={["title"]}
                className="max-w-xs"
              >
                <SelectItem key={"title"}>{chapter?.title}</SelectItem>
              </Select>
            </div>
            <div className="flex-1 flex">
              <div className="flex-1">
                <Textarea
                  label="Description"
                  placeholder="Enter your description"
                  value={form?.description}
                  className="max-w-xs"
                  onChange={(e) => {
                    setForm((prevform) => ({
                      ...prevform,
                      description: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex-1">
                <RadioGroup
                  label="Loại bài học"
                  orientation="horizontal"
                  value={form.type_lession}
                  onChange={(e) => {
                    setForm((prevform) => ({
                      ...prevform,
                      type_lession: e.target.value,
                    }));
                  }}
                >
                  <Radio value="text">Lý thuyết</Radio>
                  <Radio value="video">video</Radio>
                </RadioGroup>
              </div>
            </div>

            <div>
              {form?.type_lession === "video" ? (
                <Textarea
                  label="Link video"
                  placeholder="Enter your link video"
                  className="max-w-xs"
                  value={form?.link_video}
                  onChange={(e) => {
                    setForm((prevform) => ({
                      ...prevform,
                      link_video: e.target.value,
                    }));
                  }}
                />
              ) : (
                <EditForm form={form} setForm={setForm} errs={{}} />
              )}
            </div>
          </div>
          <button
            className="bg-red-800 absolute top-0 right-5 p-5 rounded-[99px] text-white"
            onClick={handleSubmit}
          >
            submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormEditLession;
