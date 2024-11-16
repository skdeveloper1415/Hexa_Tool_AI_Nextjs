"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ScoreCard from "../../studentcard/studentcard";


export default function StudentView() {
  const [scoreCard, setScoreCard] = useState(false);
  const products = [
    {
      id: "11467",
      schoolName: "Acequia Madre Elementary",
      schooltype: "Elementary School",
      gender: "Male",
      grade: "GR1",
      ethnicity: "American",
      city: "San Francisco",
      deviceUse: "80%",
      submissions: "24%",
    },
    {
      id: "41734",
      schoolName: "Acequia Madre Elementary",
      schooltype: "Elementary School",
      gender: "Female",
      grade: "GR2",
      ethnicity: "American",
      city: "San Francisco",
      deviceUse: "80%",
      submissions: "15%",
    },
    {
      id: "51823",
      schoolName: "Acequia Madre Elementary",
      schooltype: "Elementary School",
      gender: "Male",
      grade: "GR3",
      ethnicity: "American",
      city: "San Francisco",
      deviceUse: "80%",
      submissions: "10%",
    },
    {
      id: "61912",
      schoolName: "Acequia Madre Elementary",
      schooltype: "Elementary School",
      gender: "Female",
      grade: "GR4",
      ethnicity: "American",
      city: "San Francisco",
      deviceUse: "80%",
      submissions: "12%",
    },
    {
      id: "72001",
      schoolName: "Acequia Madre Elementary",
      schooltype: "Elementary School",
      gender: "Male",
      grade: "GR5",
      ethnicity: "American",
      city: "San Francisco",
      deviceUse: "80%",
      submissions: "7%",
    },
    {
      id: "82090",
      schoolName: "Acequia Madre Elementary",
      schooltype: "Elementary School",
      gender: "Female",
      grade: "GR6",
      ethnicity: "American",
      city: "San Francisco",
      deviceUse: "80%",
      submissions: "22%",
    },
  ];

  const links = (
    <div className="flex items-center gap-[8px] 3xl:gap-[0.417vw]">
      <div className="col">
        <div className="min-w-[40px] 3xl:min-w-[2.083vw]">
          <Image
            src={"/images/post-img1.png"}
            width={"40"}
            height={"40"}
            className="rounded-full w-[40px] 3xl:w-[2.083vw] h-[40px] 3xl:h-[2.083vw]"
          />
        </div>
      </div>
      <div className="col">
        <div
          
          onClick={() => setScoreCard(true)}
          className="inline-block text-[14px] 3xl:text-[0.729vw] text-[#344054]"
        >
          Paul Scholes
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="border border-[#C8CBD0] p-[20px] 3xl:p-[1.042vw] rounded-[8px] 3xl:rounded-[0.417vw]">
        <div className="col studentDetailsTable">
          <DataTable value={products} tableStyle={{ width: "100%" }}>
            <Column
              field="id"
              header="Student ID"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="studentName"
              header="Student Name"
              sortable
              style={{ minWidth: "10rem" }}
              body={links}
            ></Column>
            <Column
              field="schoolName"
              header="School Name"
              style={{ minWidth: "15rem" }}
            ></Column>
            <Column
              field="schooltype"
              header="School Type"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="gender"
              header="Gender"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="grade"
              header="Grade"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="ethnicity"
              header="Ethnicity"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="city"
              header="City"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="deviceUse"
              header="Courses Enrolled"
              style={{ minWidth: "8rem" }}
            ></Column>
            <Column
              field="submissions"
              header="Assignments Allocated"
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>
      </div>
      <ScoreCard visible={scoreCard} onHide={() => setScoreCard(false)} />
    </>
  );
}
