import React, { useCallback } from "react";
import { FaFileLines } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";
import {} from "next/navigation";
const Lession = ({ lession }) => {
  const pathname = usePathname();
  const parts = useCallback(() => {
    return pathname.split("/");
  }, [pathname]);
  const router = useRouter();
  return (
    <div
      className="lession_item"
      onClick={() => {
        router.push(`/courses/edit/${parts()[3]}/${lession?.id}`);
      }}
    >
      <div className="flex items-center ">
        <span className="pr-[7px] text-[#f05123]">
          <FaFileLines />
        </span>
        <p className="leading-[19px]">{lession?.title}</p>
      </div>
    </div>
  );
};

export default Lession;
