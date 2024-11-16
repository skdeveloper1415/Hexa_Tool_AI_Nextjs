"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Assignments() {
  const products = [
    {
      assignment: "Basic Additions",
      dateAssigned: "15/08/2023",
      duedate: "17/08/2023",
      submissionDate: "08/04/2024",
      submissionStatus: "Not Submitted",
      grade: "0/10",
      classAverage: "-",
    },
    {
      assignment: "Addition and Subtraction",
      dateAssigned: "15/08/2023",
      duedate: "17/08/2023",
      submissionDate: "08/04/2024",
      submissionStatus: "On Time Submission",
      grade: "0/10",
      classAverage: "-",
    },
    {
      assignment: "Arithmetic Operations Quiz",
      dateAssigned: "15/08/2023",
      duedate: "17/08/2023",
      submissionDate: "08/04/2024",
      submissionStatus: "Not Submitted",
      grade: "0/10",
      classAverage: "-",
    },
    {
      assignment: "Identifying Numbers 1 through 10",
      dateAssigned: "15/08/2023",
      duedate: "17/08/2023",
      submissionDate: "08/04/2024",
      submissionStatus: "On Time Submission",
      grade: "0/10",
      classAverage: "-",
    },
  ];

  const links = (
    <div>
      <Link href={""}>
        <i className="hexatoolcopy-link text-[#FF8B1A] text-[16px] 3xl:text-[0.833vw]"></i>
      </Link>
    </div>
  );

  return (
    <>
      <div className="border border-[#C8CBD0] p-[20px] 3xl:p-[1.042vw] rounded-[8px] 3xl:rounded-[0.417vw]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[5px] 3xl:gap-[0.26vw]">
          <div className="col">
            <div className="bg-[#F9FAFB] border border-[#C8CBD0] px-[10px] 3xl:px-[0.521vw] py-[8px] 3xl:py-[0.417vw] rounded-[6px] 3xl:rounded-[0.313vw] flex items-center justify-between">
              <div className="flex items-center gap-[15px] 3xl:gap-[1.771vw]">
                <div className="text-[#5F88C7]">
                  <i className="hexatoollike text-[24px] 3xl:text-[1.25vw]"></i>
                </div>
                <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium">
                  Assigned
                </div>
              </div>
              <div className="bg-[#5F88C7] flex items-center justify-center w-[48px] 3xl:w-[2.5vw] h-[36px] 3xl:h-[1.875vw] text-[18px] 3xl:text-[0.938vw] text-white font-semibold rounded-[4px] 3xl:rounded-[0.208vw]">
                4
              </div>
            </div>
          </div>
          <div className="col">
            <div className="bg-[#F9FAFB] border border-[#C8CBD0] px-[10px] 3xl:px-[0.521vw] py-[8px] 3xl:py-[0.417vw] rounded-[6px] 3xl:rounded-[0.313vw] flex items-center justify-between">
              <div className="flex items-center gap-[15px] 3xl:gap-[1.771vw]">
                <div className="text-[#1570EF]">
                  <i className="hexatoolunlike text-[24px] 3xl:text-[1.25vw]"></i>
                </div>
                <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium">
                  On time Submission
                </div>
              </div>
              <div className="bg-[#1570EF] flex items-center justify-center w-[48px] 3xl:w-[2.5vw] h-[36px] 3xl:h-[1.875vw] text-[18px] 3xl:text-[0.938vw] text-white font-semibold rounded-[4px] 3xl:rounded-[0.208vw]">
                2
              </div>
            </div>
          </div>
          <div className="col">
            <div className="bg-[#F9FAFB] border border-[#C8CBD0] px-[10px] 3xl:px-[0.521vw] py-[8px] 3xl:py-[0.417vw] rounded-[6px] 3xl:rounded-[0.313vw] flex items-center justify-between">
              <div className="flex items-center gap-[15px] 3xl:gap-[1.771vw]">
                <div className="text-[#039855]">
                  <i className="hexatoolright-tick text-[12px] 3xl:text-[0.625vw]"></i>
                </div>
                <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium">
                  In Progress
                </div>
              </div>
              <div className="bg-[#039855] flex items-center justify-center w-[48px] 3xl:w-[2.5vw] h-[36px] 3xl:h-[1.875vw] text-[18px] 3xl:text-[0.938vw] text-white font-semibold rounded-[4px] 3xl:rounded-[0.208vw]">
                0
              </div>
            </div>
          </div>
          <div className="col">
            <div className="bg-[#F9FAFB] border border-[#C8CBD0] px-[10px] 3xl:px-[0.521vw] py-[8px] 3xl:py-[0.417vw] rounded-[6px] 3xl:rounded-[0.313vw] flex items-center justify-between">
              <div className="flex items-center gap-[15px] 3xl:gap-[1.771vw]">
                <div className="text-[#FDB022]">
                  <i className="hexatoolright-tick text-[12px] 3xl:text-[0.625vw]"></i>
                </div>
                <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium">
                  Late Submission
                </div>
              </div>
              <div className="bg-[#FDB022] flex items-center justify-center w-[48px] 3xl:w-[2.5vw] h-[36px] 3xl:h-[1.875vw] text-[18px] 3xl:text-[0.938vw] text-white font-semibold rounded-[4px] 3xl:rounded-[0.208vw]">
                0
              </div>
            </div>
          </div>
          <div className="col">
            <div className="bg-[#F9FAFB] border border-[#C8CBD0] px-[10px] 3xl:px-[0.521vw] py-[8px] 3xl:py-[0.417vw] rounded-[6px] 3xl:rounded-[0.313vw] flex items-center justify-between">
              <div className="flex items-center gap-[15px] 3xl:gap-[1.771vw]">
                <div className="text-[#D92D20]">
                  <i className="hexatoolclose text-[12px] 3xl:text-[0.625vw]"></i>
                </div>
                <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium">
                  Not Submitted
                </div>
              </div>
              <div className="bg-[#D92D20] flex items-center justify-center w-[48px] 3xl:w-[2.5vw] h-[36px] 3xl:h-[1.875vw] text-[18px] 3xl:text-[0.938vw] text-white font-semibold rounded-[4px] 3xl:rounded-[0.208vw]">
                2
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[30px] 3xl:mt-[1.563vw] studentDetailsTable">
          <DataTable value={products} tableStyle={{ width: "100%" }}>
            <Column
              field="assignment"
              header="Assignment"
              style={{ minWidth: "20rem" }}
            ></Column>
            <Column
              field="dateAssigned"
              header="Date Assigned"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="duedate"
              header="Due Date"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="submissionDate"
              header="Submission Date"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="submissionStatus"
              header="Submission Status"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="grade"
              header="Grade"
              style={{ minWidth: "10rem" }}
            ></Column>
            <Column
              field="classAverage"
              header="Class  Average"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="quantity"
              header="Link"
              body={links}
              style={{ minWidth: "4rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
}
