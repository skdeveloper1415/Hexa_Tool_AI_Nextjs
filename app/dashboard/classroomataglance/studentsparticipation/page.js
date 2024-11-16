"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Layout from "../../../../layouts/pagelayout";
import { Dropdown } from "primereact/dropdown";
import ClassDetails from "../../../../components/popup/dashboardpopups/classdetails";

export default function StudentsParticipation() {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const Instructor = [
    { name: "Jhon", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "Peter", code: "LDN" },
    { name: "Smith", code: "IST" },
  ];
  const Class = [
    { name: "Grade1", code: "NY" },
    { name: "Grade2", code: "RM" },
    { name: "PK", code: "LDN" },
  ];
  // data
  const items = [
    {
      createdate:'18th Mar, 10:30 AM',
      classname:'ELA Math Class',
      studentcapacity:'20',
      assignmentsubmissionrate:'26.67%',
      classaverage:'100',
      quizsubmissionrate:'58.82%',
      classaverage1:'100',
      createdbyname:'Darrell Steward'
    },
    {
      createdate:'20th Mar, 11:30 AM',
      classname:'ELA Math Class',
      studentcapacity:'20',
      assignmentsubmissionrate:'26.67%',
      classaverage:'100',
      quizsubmissionrate:'58.82%',
      classaverage1:'100',
      createdbyname:'Jane Cooper'
    },
    {
      createdate:'20th Mar, 11:30 AM',
      classname:'ELA Math Class',
      studentcapacity:'20',
      assignmentsubmissionrate:'26.67%',
      classaverage:'100',
      quizsubmissionrate:'58.82%',
      classaverage1:'100',
      createdbyname:'Marvin McKinney'
    },
    {
      createdate:'20th Mar, 11:30 AM',
      classname:'ELA Math Class',
      studentcapacity:'20',
      assignmentsubmissionrate:'26.67%',
      classaverage:'100',
      quizsubmissionrate:'58.82%',
      classaverage1:'100',
      createdbyname:'Eleanor Pena'
    },
    {
      createdate:'20th Mar, 11:30 AM',
      classname:'ELA Math Class',
      studentcapacity:'20',
      assignmentsubmissionrate:'26.67%',
      classaverage:'100',
      quizsubmissionrate:'58.82%',
      classaverage1:'100',
      createdbyname:'Eleanor Pena'
    },
    {
      createdate:'20th Mar, 11:30 AM',
      classname:'ELA Math Class',
      studentcapacity:'20',
      assignmentsubmissionrate:'26.67%',
      classaverage:'100',
      quizsubmissionrate:'58.82%',
      classaverage1:'100',
      createdbyname:'Eleanor Pena'
    },
    {
      createdate:'20th Mar, 11:30 AM',
      classname:'ELA Math Class',
      studentcapacity:'20',
      assignmentsubmissionrate:'26.67%',
      classaverage:'100',
      quizsubmissionrate:'58.82%',
      classaverage1:'100',
      createdbyname:'Marvin McKinney'
    },
  ];

  const [classDetailsPopupShow, setClassDetailsPopupShow] = useState(false);
  return (
    <>
      <Layout topShow={true}>
        <div className="mx-auto 3xl:px-[6.771vw] xl:px-[100px] px-[20px]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]">
              <Link
                href={"/dashboard"}
                className="flex items-center 3xl:text-[0.833vw] 2xl:text-[0.729vw] xl:text-[14px] text-[#1B55AF] font-normal border border-[#1B55AF] rounded-lg xl:px-[0.729vw] px-[14px] lg:px-[14px] xl:py-[0.417vw] py-[8px] justify-center"
              >
                <i
                  className="pi pi-angle-double-left mr-2"
                  style={{ fontSize: "0.8rem" }}
                ></i>
                
                Back to Classroom At a Glance
              </Link>
            </div>
          </div>
          <div className="mt-[24px] xl:mt-[24px] 3xl:mt-[1.25vw] flex justify-between items-center">
            <div>
              <h3 className="3xl:text-[1.042vw] 2xl:text-[1.042vw] xl:text-[20px] text-[#101828] font-semibold">
                Students Participation
              </h3>
              <p className="3xl:text-[0.833vw] 2xl:text-[0.833vw] xl:text-[16px] text-[#667085] font-light">
                This dashboard provides key details on the Classes created by
                the Instructors.
              </p>
            </div>

            <div className="flex gap-[15px] xl:gap-[15px] 3xl:gap-[0.781vw]">
              <Dropdown
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.value)}
                options={Instructor}
                filter
                optionLabel="name"
                placeholder="Sort by Instructor"
                className="w-full md:w-[231px] xl:w-[220px] 3xl:w-[12.031vw] h-auto"
              />
              <Dropdown
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.value)}
                options={Class}
                filter
                optionLabel="name"
                placeholder="Sort by Class"
                className="w-full md:w-[231px] xl:w-[220px] 3xl:w-[12.031vw] h-auto"
              />
            </div>
          </div>
          <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
            <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-[24px] xl:gap-[24px] 3xl:gap-[1.25vw]">
            {items.map((item, index) => (
              <div key={index} className="border border-[#C8CBD0] rounded-[10px] 3xl:rounded-[0.521vw]  bg-white">
                <div className="relative">
                  <div className="absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw] cursor-pointer">
                    <div className="h-[36px] xl:h-[34px] 3xl:h-[1.875vw] w-[36px] xl:w-[34px] 3xl:w-[1.875vw] rounded-full bg-white flex items-center justify-center">
                      <i className="hexatoolthree-dots text-[#98A2B3] text-[20px] xl:text-[18px] 3xl:text-[0.9vw]"></i>
                    </div>
                  </div>
                  <Image
                    width={400}
                    height={140}
                    src="/images/classroom/math.svg"
                    className="rounded-t-[10px] 3xl:rounded-t-[0.521vw] w-full h-[140px] xl:h-[200px] 3xl:h-[7.292vw] object-cover"
                    alt="Math"
                  />
                  <div className="absolute bottom-[17px] left-[17px] 3xl:bottom-[0.885vw] 3xl:left-[0.885vw]">
                    <div className="flex items-center gap-2 bg-[#FFFAEB] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw] p-[4px] pr-[10px] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-medium">
                      <div className="text-[#fff] bg-[#DC6803] px-[8px] py-[2px] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw]">
                        Created On
                      </div>
                      <div className="text-[#B54708] inline-block align-middle">
                        {item.createdate}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                <div className="py-[15px] xl:py-[13px] 3xl:py-[0.781vw] px-[20px] xl:px-[20px] 3xl:px-[1.042vw]">
                  <div className="flex items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw]">
                    <div className="text-[#101828] font-semibold text-[20px] xl:text-[18px] 3xl:text-[1.042vw]">
                    {item.classname}
                    </div>

                    <div className="text-[#344054] bg-[#F2F4F7] font-medium text-[12px] xl:text-[11px] 3xl:text-[0.625vw] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw] py-[3px] px-[8px] inline-block align-middle">
                    {item.studentcapacity} Students
                    </div>
                  </div>
                  <div className="mt-[20px] xl:mt-[20px] 3xl:mt-[1.042vw]">
                    <div className="border border-[#E4E7EC] rounded-md bg-[#FCFCFD] py-[8px] xl:py-[8px] 3xl:py-[0.417vw] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] mb-[8px]">
                       <div className="flex gap-[10px] xl:gap-[10px] 3xl:gap-[0.521vw]">
                        <div className="w-[170px] xl:w-[170px] 3xl:w-[8.854vw]">
                          <h6 className="text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium"> {item.assignmentsubmissionrate}</h6>
                          <p className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">Assignment Submission Rate</p>
                        </div>
                        <div>
                          <h6 className="text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium"> {item.classaverage}</h6>
                          <p className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">Class Average</p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-[#E4E7EC] rounded-md bg-[#FCFCFD] py-[8px] xl:py-[8px] 3xl:py-[0.417vw] px-[16px] xl:px-[16px] 3xl:px-[0.833vw] mb-[8px]">
                       <div className="flex gap-[10px] xl:gap-[10px] 3xl:gap-[0.521vw]">
                       <div className="w-[170px] xl:w-[170px] 3xl:w-[8.854vw]">
                          <h6 className="text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium"> {item.quizsubmissionrate}</h6>
                          <p className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">Quiz Submission Rate</p>
                        </div>
                        <div>
                          <h6 className="text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium"> {item.classaverage1}</h6>
                          <p className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">Class Average</p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className="border-t-2 border-[#E4E7EC] pb-1">
                  <div className="py-[15px] xl:py-[13px] 3xl:py-[0.781vw] px-[20px] xl:px-[20px] 3xl:px-[1.042vw]">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <Image
                        width={40}
                        height={40}
                        src="/images/user_img1.png"
                        className="h-[40px] xl:w-[40px] 3xl:h-[2.083vw] 3xl:w-[2.083vw]"
                        alt="profile"
                      />
                      <div>
                      <p className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">Created by</p>
                      <h6 className="text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium"> {item.createdbyname}</h6>
                      </div>
                    </div>
                    <Link href='' className="3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-normal border border-[#1B55AF] rounded-lg
                     xl:px-[16px] px-[14px] 3xl:px-[0.833vw] lg:px-[16px] 3xl:py-[0.521vw] xl:py-[10px] py-[10px] leading-tight"   onClick={() => setClassDetailsPopupShow(true)}>More</Link>
                  </div>
                  </div>
                </div>
                </div>
              </div>


            ))}
            </div>
          </div>
        </div>
      </Layout>
      <ClassDetails visible={classDetailsPopupShow}
                onHides={() => setClassDetailsPopupShow(false)} />
    </>
  );
}
