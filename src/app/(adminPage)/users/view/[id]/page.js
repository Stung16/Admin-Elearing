"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Input,
  Breadcrumbs,
  BreadcrumbItem,
  RadioGroup,
  Radio,
  CheckboxGroup,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import UpLoadImage from "@/components/boxs/courseFreecontent/upLoadImage";
import { CustomCheckbox } from "../../../../../components/Customs/customCheckbox";
import { useParams } from "next/navigation";
import { getUserById, updateUser } from "@/services/user.service";
import { getAllCourses } from "@/services/course.service";
import Link from "next/link";
const ProfileUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "active",
    phone: "",
    courses: [],
    avatar:
      "http://res.cloudinary.com/dtht61558/image/upload/v1712810599/avatar_upload/avatar_upload_UvDux3.jpg",
  });
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getUserById(id);
      if (res?.data?.status === 200) {
        const resCorses = await getAllCourses();
        if (resCorses?.data?.status === 200) {
          setCourses(resCorses?.data?.data?.courses);
        }
        setForm({
          name: res?.data?.data?.user?.name,
          email: res?.data?.data?.user?.email,
          phone: res?.data?.data?.user?.phone || undefined,
          status: res?.data?.data?.user?.status,
          avatar: res?.data?.data?.user?.avatar,
          courses:
            res?.data?.data?.user?.courses?.map((item) => item?.id) || [],
        });
      }
    };
    fetch();
  }, [id]);
  const [files, setFiles] = useState([]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      if (files?.length) {
        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));
        const res = await fetch(`http://localhost:5000/api/admin/upload`, {
          method: "POST",
          body: formData,
        }).then((res) => res.json());
        if (res.status === 201) {
          form.avatar = res?.data?.url;
        }
      }
      const ress = await updateUser(id, form);
      if (ress?.data?.status === 200) {
        toast.success("Thêm thành công!!!");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!!!");
    }
  };
  return (
    <div className="flex flex-col">
      <section>
        <div className="flex py-5 justify-between">
          <div className="flex flex-col">
            <Breadcrumbs>
              <BreadcrumbItem><Link href={"/"}>Home</Link></BreadcrumbItem>
              <BreadcrumbItem><Link href={"/users"}>user</Link></BreadcrumbItem>
              <BreadcrumbItem isDisabled>view</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </div>
      </section>
      {/* adminsTable */}
      <div>
        <section className="relative">
          <form action="">
            <div className="flex mb-6 gap-4 items-center justify-end">
              <span>Avatar User</span>
              <UpLoadImage
                userInfo={form?.avatar}
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
                    name="name"
                    value={form?.name}
                    isRequired
                    label="User Name"
                    labelPlacement={"outside"}
                    onChange={handleChange}
                  />
                  {/* {errs?.title && <p className="text-red-600">{errs?.title}</p>} */}
                </div>
                <div className="flex-1">
                  <Input
                    key={"2"}
                    type="descriptions"
                    label="Email"
                    value={form?.email}
                    name="email"
                    isRequired
                    labelPlacement={"outside"}
                    onChange={handleChange}
                  />
                  {/* {errs?.descriptions ? (
                    <p className="text-red-600">{errs?.descriptions}</p>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    key={"3"}
                    type="number"
                    label="Phone"
                    datatype="price"
                    value={form?.phone}
                    // onChange={handleChange}
                    // defaultValue={form.price}
                    name="phone"
                    labelPlacement={"outside"}
                  />
                  {/* {errs?.price && <p className="text-red-600">{errs?.price}</p>} */}
                </div>
                <div className="flex-1">
                  <RadioGroup
                    label="Status"
                    value={form?.status}
                    onValueChange={(e) => {
                      setForm({ ...form, ["status"]: e });
                    }}
                    orientation={"horizontal"}
                    className="flex"
                  >
                    <Radio value={"active"}>active</Radio>
                    <Radio value={"block"}>block</Radio>
                  </RadioGroup>
                  {/* {errs?.sale && <p className="text-red-600">{errs?.sale}</p>} */}
                </div>
              </div>
              <div>
                {/* <EditForm form={form} setForm={setForm} errs={errs} /> */}
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <CheckboxGroup
                    label="Danh sách khoá học"
                    value={form.courses}
                    onValueChange={(e) => {
                      setForm({ ...form, ["courses"]: e });
                    }}
                    classNames={{
                      base: "w-full",
                    }}
                  >
                    {courses?.map((course) => {
                      return (
                        <Fragment key={course?.id}>
                          <CustomCheckbox
                            value={course?.id}
                            user={{
                              name: course?.title,
                              avatar: course?.thumb,
                              role: "TYPE",
                              status: course?.type,
                            }}
                            statusColor="success"
                          />
                        </Fragment>
                      );
                    })}
                  </CheckboxGroup>
                </div>
              </div>
            </div>

            <Button color="primary" onClick={handleSubmit}>
              submit
            </Button>
          </form>
          {/* {loading && <Loading />} */}
        </section>
      </div>
    </div>
  );
};

export default ProfileUser;
