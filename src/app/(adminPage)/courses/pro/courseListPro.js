"use client";
import React, { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { mutate } from "swr";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Image,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon ";
import TopcontentCourse from "@/components/Tables/TableContents/TopcontentCourse";
import { useDispatch } from "react-redux";
import { usersSlice } from "@/redux/slice/usersSlice";
const { upadateLoading } = usersSlice.actions;
import toast from "react-hot-toast";
import { deletCourse, deleteCourses } from "@/services/course.service";

const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "TYPE", uid: "type" },
  { name: "COMMING SOON", uid: "commingsoon", sortable: true },
  { name: "PUBLIC", uid: "public", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
const statusColorMap = {
  free: "success",
  pro: "danger",
};
const CourseListPro = ({ courseData, idList }) => {
  const dispatch = useDispatch();
  let courses = courseData || [];
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [courseSelected, setCourseSelected] = useState(null);
  const [listIds, setListIds] = useState(idList || []);
  const [isDel, setIsDel] = useState(false);
  const ids = Array.from(selectedKeys).map((id) => id);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenModalDelete = () => {
    setIsDel(true);
    if (selectedKeys !== "all") {
      setListIds(ids);
    } else {
      setListIds(idList);
    }
    onOpen();
  };
  const handleOpenDeleteUser = (id) => {
    setIsDel(false);
    setCourseSelected(id);
    onOpen();
  };
  const handleDeleteCourses = async () => {
    try {
      dispatch(upadateLoading(true));
      const res = await deleteCourses({ ids: listIds });
      if (res?.data?.status === 200) {
        mutate("/api/admin/courses");
        toast.success("Success!");
      } else {
        toast.error("An error has occurred!");
      }
    } catch (error) {
      toast.error("An error has occurred!");
      console.error(error);
    } finally {
      dispatch(upadateLoading(false));
    }
  };

  const handleDeleteCourse = async () => {
    try {
      dispatch(upadateLoading(true));
      const res = await deletCourse(courseSelected);
      if (res?.data?.status === 200) {
        mutate("/api/admin/courses");
        toast.success("Success!");
      } else {
        toast.error("An error has occurred!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error has occurred!");
    } finally {
      dispatch(upadateLoading(false));
    }
  };
  const renderCell = React.useCallback(
    (course, columnKey) => {
      const cellValue = course[columnKey];
      switch (columnKey) {
        case "type":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[course.type]}
              size="sm"
              variant="flat"
            >
              {`${cellValue}`}
            </Chip>
          );
        case "name":
          return course.title;

        case "commingsoon":
          const status = course.isComming;
          return <span>{!status ? "Đã mở" : "Sắp diễn ra"}</span>;
        case "public":
          const publics = course.status;
          return <span>{!publics ? "Private" : "Public"}</span>;
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              {/* {isCan(roles, "user.delete") && ( */}
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem textValue="view">View</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      handleOpenDeleteUser(course?.id);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* )} */}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [courseData]
  );
  return (
    <>
      <section className="relative">
        {selectedKeys?.size > 1 || selectedKeys === "all" ? (
          <span className="absolute top-[118px] left-[60px] z-20">
            {/* {isCan(roles, "user.delete") && ( */}
            <span
              className="text-xl cursor-pointer text-danger active:opacity-50"
              onClick={handleOpenModalDelete}
            >
              <DeleteIcon />
            </span>
            {/* )} */}
          </span>
        ) : (
          ""
        )}
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[380px]",
          }}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          topContent={<TopcontentCourse courses={courses?.length} />}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={columns} key={"table_header"}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No users found"}
            items={courses}
            key={"table_body"}
          >
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
                  {isDel && (
                    <Button
                      color="danger"
                      onPress={onClose}
                      variant="bordered"
                      onClick={handleDeleteCourses}
                    >
                      Delete all to trash
                    </Button>
                  )}
                  {!isDel && (
                    <Button
                      color="danger"
                      onPress={onClose}
                      variant="bordered"
                      onClick={handleDeleteCourse}
                    >
                      Delete
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </>
  );
};

export default CourseListPro;
