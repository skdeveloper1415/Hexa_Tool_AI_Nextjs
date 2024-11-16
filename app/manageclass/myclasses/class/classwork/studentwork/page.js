"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE } from "../../../../../../components/helper/enum";
import { Dropdown } from "primereact/dropdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ScrollPanel } from "primereact/scrollpanel";
import Studentsubmission from "./studentsubmission/page";
import moment from "moment";
import { NoDataMsg } from "../../../../../common/NoDatamsg";

export default function Studentwork({ rowdata, setViewStudentWork, viewStudentWork }) {
  console.log("rowdata123", rowdata);
  const image = "/images/student-profile/1.png";
  const [grade, setGrade] = useState();
  // Array of card data with images
  const cardData = [
    {
      content: "Kathryn Murphy",
      image: "/images/student-profile/1.png",
    },
    {
      content: "Devon Lane",
      image: "/images/student-profile/2.png",
    },
    {
      content: "Cody Fisher",
      image: "/images/student-profile/3.png",
    },
    {
      content: "Bessie Cooper",
      image: "/images/student-profile/4.png",
    },
    {
      content: "Theresa Webb",
      image: "/images/student-profile/5.png",
    },
    {
      content: "Floyd Miles",
      image: "/images/student-profile/6.png",
    },
    {
      content: "Ronald Richards",
      image: "/images/student-profile/7.png",
    },
    {
      content: "Jane Cooper",
      image: "/images/student-profile/8.png",
    },
    {
      content: "Kathryn Murphy",
      image: "/images/student-profile/1.png",
    },
    {
      content: "Devon Lane",
      image: "/images/student-profile/2.png",
    },
    {
      content: "Cody Fisher",
      image: "/images/student-profile/3.png",
    },
    {
      content: "Bessie Cooper",
      image: "/images/student-profile/4.png",
    },
    {
      content: "Theresa Webb",
      image: "/images/student-profile/5.png",
    },
    {
      content: "Floyd Miles",
      image: "/images/student-profile/6.png",
    },
    {
      content: "Ronald Richards",
      image: "/images/student-profile/7.png",
    },
    {
      content: "Jane Cooper",
      image: "/images/student-profile/8.png",
    },
    {
      content: "Kathryn Murphy",
      image: "/images/student-profile/1.png",
    },
    {
      content: "Devon Lane",
      image: "/images/student-profile/2.png",
    },
    {
      content: "Cody Fisher",
      image: "/images/student-profile/3.png",
    },
    {
      content: "Bessie Cooper",
      image: "/images/student-profile/4.png",
    },
    {
      content: "Theresa Webb",
      image: "/images/student-profile/5.png",
    },
    {
      content: "Floyd Miles",
      image: "/images/student-profile/6.png",
    },
    {
      content: "Ronald Richards",
      image: "/images/student-profile/7.png",
    },
    {
      content: "Jane Cooper",
      image: "/images/student-profile/8.png",
    },
  ];

  const [showStudentWork, setShowStudentWork] = useState(false);
  useEffect(() => {
    if (viewStudentWork == false) {
      setShowStudentWork(false)
    }
  }, [viewStudentWork])
  const turnedInSubmissions = rowdata?.studentList?.filter(
    (item) => item.state === "TURNED_IN"
  );
  const assignedSubmissions = rowdata?.studentList?.filter(
    (item) => item.state === "CREATED"
  );
  const gradedSubmissions = rowdata?.studentList?.filter(
    (item) => item.state === "RETURNED"
  );
  const dueDate = (dateObj) => {
    if (dateObj) {
      const { year, month, day } = dateObj;

      const date = moment({ year: year, month: month - 1, day: day });

      const formattedDate = date.format("DD MMM, YYYY");

      return formattedDate;
    } else {
      return "-";
    }
  };
  const [studentInfo, setStudentInfo] = useState("");

  return (
    <>
      {showStudentWork == false ? (
        <div>
          {/*row*/}
          <div className="mt-[30px] 3xl:mt-[1.563vw]">
            <div className="bg-white border border-[#C8CBD0] rounded-lg p-5 3xl:p-[1.042vw] space-y-5 3xl:space-y-[1.042vw]">
              {/*col*/}
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center gap-2.5 3xl:gap-[0.521vw]">
                  <div className="text-[#000000] text-xl font-medium leading-8 3xl:text-[1.042vw] 3xl:leading-[1.563vw]">
                    {rowdata?.assignment?.title}
                  </div>
                  <div className="bg-[#98A2B3] rounded 3xl:rounded-[0.208vw] p-1.5 3xl:p-[0.313vw] text-[#FFFFFF] text-xs font-normal leading-[18px] 3xl:text-[0.625vw] 3xl:leading-[0.938vw]">
                    {rowdata?.assignment?.maxPoints}
                  </div>
                </div>
                <div className="flex items-center gap-6 3xl:gap-[1.25vw] text-[#98A2B3] text-sm font-normal leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]">
                  <div>Due Date: {dueDate(rowdata?.assignment?.dueDate)}</div>
                  <div>
                    <i className="hexatoolthree-dots"></i>
                  </div>
                </div>
              </div>
              {/*col*/}
              <div className="bg-[#FFFCF8] border border-[#FFF2E5] rounded-lg 3xl:rounded-[0.417vw] p-2.5 3xl:p-[0.521vw]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 3xl:gap-[0.521vw]">
                  {/*col*/}
                  <div className="flex justify-between items-center bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-2 px-2.5 3xl:py-[0.417vw] 3xl:px-[0.521vw]">
                    <div className="text-[#DC6803] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw] flex items-center gap-1">
                      <i className="hexatoolrefresh-circule text-xl 3xl:text-[1.042vw]"></i>
                      <span>Turned In</span>
                    </div>
                    <div className="border border-[#DC6803] rounded-md 3xl:rounded-[0.313vw] px-2 3xl:p-[0.417vw] text-[#DC6803] text-lg font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]">
                      {turnedInSubmissions?.length}
                    </div>
                  </div>
                  {/*col*/}
                  <div className="flex justify-between items-center bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-2 px-2.5 3xl:py-[0.417vw] 3xl:px-[0.521vw]">
                    <div className="text-[#344054] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw] flex items-center gap-1">
                      <i className="hexatoolthumb-circule-fill text-xl 3xl:text-[1.042vw]"></i>
                      <span>Assigned</span>
                    </div>
                    <div className="border border-[#344054] bg-[#344054] text-white rounded-md 3xl:rounded-[0.313vw] px-2 3xl:p-[0.417vw] text-lg font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]">
                      {rowdata?.pendingCount || "0"}
                    </div>
                  </div>
                  {/*col*/}
                  <div className="flex justify-between items-center bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-2 px-2.5 3xl:py-[0.417vw] 3xl:px-[0.521vw]">
                    <div className="text-[#039855] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw] flex items-center gap-1">
                      <i className="hexatoolright-circlue-ouline text-xl 3xl:text-[1.042vw]"></i>
                      <span>Graded</span>
                    </div>
                    <div className="border border-[#039855] bg-[#039855] text-white rounded-md 3xl:rounded-[0.313vw] px-2 3xl:p-[0.417vw] text-lg font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]">
                      {gradedSubmissions?.length}
                    </div>
                  </div>
                </div>
              </div>
              {/*col*/}
              <div className="flex flex-wrap items-center justify-between border-t border-[#E4E7EC] pt-6 3xl:pt-[1.25vw]">
                <div className="text-[#667085] text-base font-normal leading-6 3xl:text-[0.833vw] 3xl:leading-[1.25vw] flex items-center gap-5 3xl:gap-[1.042vw]">
                  <div>
                    <span className="text-[#344054] font-medium">Group:</span>{" "}
                    {rowdata?.assignment?.title}
                  </div>
                  <div>
                    <span className="text-[#344054] font-medium">Folder:</span>{" "}
                    -
                  </div>
                </div>
                {/* <div>
                  <Link
                    href={""}
                    className="text-[#1B55AF] text-base font-medium leading-5 3xl:text-[0.833vw] 3xl:leading-[1.042vw] border border-[#1B55AF] rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] inline-block"
                  >
                    Import Grades
                  </Link>
                </div> */}
              </div>
            </div>
          </div>

          {/*row*/}
          <div className="3xl:mt-[1.771vw] mt-8">
            <Tabs className={"studenttabview"}>
              <div className="flex justify-between items-center">
                <div>
                  <TabList>
                    <Tab>Assigned </Tab>
                    <Tab>Turned In</Tab>
                    <Tab>Graded</Tab>
                  </TabList>
                </div>
                <div>
                  <Dropdown
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    filter
                    options={GRADE}
                    optionLabel="name"
                    placeholder="All Status"
                    className="w-full md:w-[231px] xl:w-[160px] 3xl:w-[12.031vw]"
                  />
                </div>
              </div>

              <div className="3xl:mt-[1.875vw] mt-9">
                <TabPanel>
                  <ScrollPanel
                    style={{
                      width: "100%",
                      height: "clamp(200px, 18.281vw, 500px)",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5 3xl:gap-[0.521vw]">
                      {/*col*/}

                      {rowdata?.studentList &&
                        rowdata.studentList.length > 0 ? (
                        rowdata.studentList.map((data, index) =>{if(data.state=='CREATED'){
                          return(
                            <div key={index}>
  
                              <Card
                                className="3xl:py-[0.781vw] py-4 px-5 3xl:px-[1.042vw] bg-[#F2F4F7] hover:bg-[#1570EF] rounded-md 3xl:rounded-[0.313vw] flex flex-col items-center gap-3 3xl:gap-[0.625vw] text-[#344054] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw] hover:text-white transition-all cursor-pointer cardui_none"
                                onClick={() => {
                                  setShowStudentWork(true);
                                  setStudentInfo(data);
                                  setViewStudentWork(true)
                                }}
                              >
                                <Image
                                  src={`https:${data?.userProfile?.photoUrl}`}
                                  alt={data.userProfile?.name?.fullName}
                                  width={88}
                                  height={88}
                                />
                                <div>{data.userProfile?.name?.fullName}</div>
                              </Card>
                            </div>
                          )
                        } })
                      ) : (
                        <div className="col-span-12">
                          <NoDataMsg />
                        </div>
                      )}
                    </div>
                  </ScrollPanel>
                </TabPanel>
                <TabPanel>
                  <ScrollPanel
                    style={{
                      width: "100%",
                      height: "clamp(200px, 18.281vw, 500px)",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5 3xl:gap-[0.521vw]">
                      {/*col*/}
                      {turnedInSubmissions && turnedInSubmissions.length > 0 ? (
                        turnedInSubmissions.map((data, index) => (
                          <div key={index}>
                            <Card
                              className="3xl:py-[0.781vw] py-4 px-5 3xl:px-[1.042vw] bg-[#F2F4F7] hover:bg-[#1570EF] rounded-md 3xl:rounded-[0.313vw] flex flex-col items-center gap-3 3xl:gap-[0.625vw] text-[#344054] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw] hover:text-white transition-all cursor-pointer cardui_none"
                              onClick={() => {
                                setShowStudentWork(true);
                                setStudentInfo(data);
                              }}
                            >
                              <Image
                                src={`https:${data?.userProfile?.photoUrl}`}
                                alt={data.userProfile?.name?.fullName}
                                width={88}
                                height={88}
                              />
                              <div>{data.userProfile?.name?.fullName}</div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-12">
                          <NoDataMsg />
                        </div>
                      )}
                    </div>
                  </ScrollPanel>
                </TabPanel>
                <TabPanel>
                  <ScrollPanel
                    style={{
                      width: "100%",
                      height: "clamp(200px, 18.281vw, 500px)",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5 3xl:gap-[0.521vw]">
                      {/*col*/}
                      {gradedSubmissions && gradedSubmissions.length > 0 ? (
                        gradedSubmissions.map((data, index) => (
                          <div key={index}>
                            <Card className="3xl:py-[0.781vw] py-4 px-5 3xl:px-[1.042vw] bg-[#F2F4F7] hover:bg-[#1570EF] rounded-md 3xl:rounded-[0.313vw] flex flex-col items-center gap-3 3xl:gap-[0.625vw] text-[#344054] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw] hover:text-white transition-all cursor-pointer cardui_none"
                             onClick={() => {
                              setShowStudentWork(true);
                              setStudentInfo(data);
                            }}
                            >
                            <Image
                                src={`https:${data?.userProfile?.photoUrl}`}
                                alt={data.userProfile?.name?.fullName}
                                width={88}
                                height={88}
                              />
                              <div>{data.userProfile?.name?.fullName}</div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-12">
                          <NoDataMsg />
                        </div>
                      )}
                    </div>
                  </ScrollPanel>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      ) : null}
      {showStudentWork == true && (
        <Studentsubmission rowdata={rowdata} studentInfo={studentInfo} />
      )}
    </>
  );
}
