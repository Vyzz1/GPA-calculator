import { RootState } from "@/store";
import { DownloadIcon } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
const Download = () => {
  const file = useSelector((state: RootState) => state.cumulative);

  const handleOnClick = () => {
    const tableName = "GPA.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(file);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GPA");

    const buf = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    const blob = new Blob([buf], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = tableName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  return (
    <button
      onClick={handleOnClick}
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        Download <DownloadIcon className="w-5 h-5 ml-2" />
      </span>
    </button>
  );
};

export default Download;
