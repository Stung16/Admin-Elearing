import React, { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import "../../../styles/sidebarCourse.css";

import Lession from "./Lession";
import BtnAddNewLession from "@/components/Buttons/BtnAddNewLession";

const Chapter = ({ data,queryString }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <div
        className="chapter_item"
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <h3>
          {data?.id}. {data?.title}
        </h3>
        {isShow ? (
          <FaChevronDown className="text-[14px] ml-auto mr-2" />
        ) : (
          <FaChevronRight className="text-[14px] ml-auto mr-2" />
        )}
      </div>
      {isShow && (
        <div className="lession_list">
          {data?.lessions?.map((lession) => {
            return (
              <Fragment key={lession?.id}>
                <Lession lession={lession}  />
              </Fragment>
            );
          })}
          <BtnAddNewLession chapter_id={data?.id} queryString={queryString}/>
        </div>
      )}
    </div>
  );
};

export default Chapter;
