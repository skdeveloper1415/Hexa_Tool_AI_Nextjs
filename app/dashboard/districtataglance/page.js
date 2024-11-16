"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MeterGroup } from "primereact/metergroup";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ProgressSnapshot from "../../../components/popup/dashboardpopups/progresssnapshot/progresssnapshotpopup";

export default function DistrictAtaGlance() {
  const [activeTab, setActiveTab] = useState(1);
  //   Below 50%
  const level1 = [{ color: "#FF4537", value: 30 }];
  const level2 = [{ color: "#FF4537", value: 45 }];

  //   50 to 75%
  const level3 = [{ color: "#12B76A", value: 24 }];
  const level4 = [{ color: "#12B76A", value: 50 }];
  // Above 75%
  const level5 = [{ color: "#3166B7", value: 24 }];
  const level6 = [{ color: "#3166B7", value: 50 }];
  const [progressSnapshotPopupShow, setProgressSnapshotPopupShow] = useState(false);

  return (
    <>
      <div className="text-[#101828] text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold">
        District Dashboard
      </div>
      <div className="text-[#667085] text-[16px] xl:text-[14px] 3xl:text-[0.729vw] font-normal">
        This dashboard provides main facts on the classroom usage.
      </div>
      <div className="mt-[34px] xl:mt-[1.771vw]">
        <div className="grid 3xl:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 gap-[10px] xl:gap-[0.833vw]">
        {/* Progress */}
          <div className="bg-[#fff] p-[22px] xl:p-[24px] 3xl:p-[1.25vw] shadow2 rounded-lg">
            <div className="flex justify-between items-center mb-[18px] xl:mb-[18px] 3xl:mb-[0.938vw]">
              <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                <div className="bg-[#FFF2E5] w-[60px] h-[60px] xl:w-[64px] xl:h-[64px] 3xl:w-[3.333vw] 3xl:h-[3.333vw] rounded-full flex justify-center items-center">
                  <i className="hexatoolright-tick-circlue-ouline text-[#1570EF] font-medium text-[35px]"></i>
                </div>
                <div>
                  <h6 className="text-[#101828] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                    Progress
                  </h6>
                  <p className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-light">
                    Lorem Ipsum is simply dummy text{" "}
                  </p>
                </div>
              </div>
              <Link
                href=""
                onClick={() => setProgressSnapshotPopupShow(true)}
                className="inline-flex 3xl:text-[0.729vw] 2xl:text-[0.729vw] xl:text-[14px] text-white font-medium border border-[#E57200] bg-[#E57200] rounded-lg xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw] h-auto"
              >
                <i className="hexatoollink-export"></i> Explore
              </Link>
            </div>
            <div className="flex justify-between items-center mb-[6px] xl:mb-[6px] 3xl:mb-[0.313vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Classroom Adoption{" "}
                <span className="text-[#039855] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold ml-2">
                  76.50%
                </span>
              </h3>
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Total
                <span className="text-[#039855] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold ml-2">
                  263
                </span>
              </h3>
            </div>
            <div className="flex justify-between items-center mb-[18px] xl:mb-[18px] 3xl:mb-[0.938vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
                No. of Teachers
                <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                  174
                </span>
              </h3>
              <div className="flex gap-2">
                <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
                  Schools
                  <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                    21
                  </span>
                </h3>
                <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
                  Classroom
                  <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                    242
                  </span>
                </h3>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Below 50%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level1}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      11%{" "}
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level1}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      11%{" "}
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (143)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                50 to 75%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level3}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level4}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (432)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Above 75%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level5}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      07%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level6}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (432)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid 3xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-[10px] xl:gap-[0.833vw] divide-x mb-[16px]">
              <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                Improved
                <span className="text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-semibold ml-2">
                  7{" "}
                  <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[9px] 3xl:text-[0.425vw] mr-2"></i>
                  <span className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">
                    Indicators
                  </span>
                </span>
              </p>

              <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full pl-2">
                Declined
                <span className="text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-semibold ml-2">
                  3{" "}
                  <i className="hexatoolrectangle-down text-[#FF3030] text-[9px] xl:text-[9px] 3xl:text-[0.425vw] mr-1"></i>
                  <span className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">
                    Indicators
                  </span>
                </span>
              </p>
            </div>
            <div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                  # of Assignments created
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    <span>524</span>
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                  # of Assignments created per week
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    5{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                  % of students submitted all Assignments
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    75%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                  # of Students not submitted more than 4 Assignments
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    1524{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                  % of students submitted all Assignments (Quiz)
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    75%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                  # of Students not submitted more than 4 Assignments (Quiz){" "}
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    1524{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* Engagement */}
          <div className="bg-[#fff] p-[22px] xl:p-[24px] 3xl:p-[1.25vw] shadow2 rounded-lg">
            <div className="flex justify-between items-center mb-[18px] xl:mb-[18px] 3xl:mb-[0.938vw]">
              <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                <div className="bg-[#FFF2E5] w-[60px] h-[60px] xl:w-[64px] xl:h-[64px] 3xl:w-[3.333vw] 3xl:h-[3.333vw] rounded-full flex justify-center items-center">
                  <i className="hexatoolengagement text-[#1570EF] font-medium text-[35px]"></i>
                </div>
                <div>
                  <h6 className="text-[#101828] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                  Engagement
                  </h6>
                  <p className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-light">
                    Lorem Ipsum is simply dummy text{" "}
                  </p>
                </div>
              </div>
              <Link
                href=""
                className="inline-flex 3xl:text-[0.729vw] 2xl:text-[0.729vw] xl:text-[14px] text-white font-medium border border-[#E57200] bg-[#E57200] rounded-lg xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw] h-auto"
              >
                <i className="hexatoollink-export"></i> Explore
              </Link>
            </div>
            <div className="flex justify-between items-center mb-[6px] xl:mb-[6px] 3xl:mb-[0.313vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
              Student Enrollment{" "}
                <span className="text-[#039855] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold ml-2">
                86.50% <span className="text-[#101828] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">LY Var <span className="text-[#FF4537]">2%</span></span>
                </span>
              </h3>
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Total
                <span className="text-[#039855] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold ml-2">
                  263
                </span>
              </h3>
            </div>
            <div className="flex justify-between items-center mb-[18px] xl:mb-[18px] 3xl:mb-[0.938vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
              No. of Student Enrollment
                <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                  174
                </span>
              </h3>
              <div className="flex gap-2">
                <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
                  Schools
                  <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                    21
                  </span>
                </h3>
                <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
                Student Enroll
                  <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                  10740
                  </span>
                </h3>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Below 50%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level1}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      11%{" "}
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level1}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      11%{" "}
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (143)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                50 to 75%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level3}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level4}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (432)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Above 75%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level5}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      07%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level6}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (432)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid 3xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-[10px] xl:gap-[0.833vw] divide-x mb-[16px]">
              <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                Improved
                <span className="text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-semibold ml-2">
                  7{" "}
                  <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[9px] 3xl:text-[0.425vw] mr-2"></i>
                  <span className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">
                    Indicators
                  </span>
                </span>
              </p>

              <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full pl-2">
                Declined
                <span className="text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-semibold ml-2">
                  3{" "}
                  <i className="hexatoolrectangle-down text-[#FF3030] text-[9px] xl:text-[9px] 3xl:text-[0.425vw] mr-1"></i>
                  <span className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">
                    Indicators
                  </span>
                </span>
              </p>
            </div>
            <div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                # of Students submitted Assignment
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    524{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                Avg Time Spent - Students
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    5{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                # of Students submitted Quizzes
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    75%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                # of Posts created by Teachers
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    1524{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                # of Apps used by the Teacher
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    75%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                Avg Time spent per Teacher in an App
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                    1524{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* Proficiency */}
          <div className="bg-[#fff] p-[22px] xl:p-[24px] 3xl:p-[1.25vw] shadow2 rounded-lg">
            <div className="flex justify-between items-center mb-[18px] xl:mb-[18px] 3xl:mb-[0.938vw]">
              <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                <div className="bg-[#FFF2E5] w-[60px] h-[60px] xl:w-[64px] xl:h-[64px] 3xl:w-[3.333vw] 3xl:h-[3.333vw] rounded-full flex justify-center items-center">
                  <i className="hexatoolproficiency text-[#1570EF] font-medium text-[35px]"></i>
                </div>
                <div>
                  <h6 className="text-[#101828] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                  Proficiency
                  </h6>
                  <p className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-light">
                    Lorem Ipsum is simply dummy text{" "}
                  </p>
                </div>
              </div>
              <Link
                href=""
                className="inline-flex 3xl:text-[0.729vw] 2xl:text-[0.729vw] xl:text-[14px] text-white font-medium border border-[#E57200] bg-[#E57200] rounded-lg xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw] h-auto"
              >
                <i className="hexatoollink-export"></i> Explore
              </Link>
            </div>
            <div className="flex justify-between items-center mb-[6px] xl:mb-[6px] 3xl:mb-[0.313vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
              Avg. Assignment Score{" "}
                <span className="text-[#039855]  text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold ml-2">
                74.50%<span className="text-[#101828] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">LY Var <span className="text-[#FF4537]">2%</span></span>
                </span>
              </h3>
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Total
                <span className="text-[#039855] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold ml-2">
                  263
                </span>
              </h3>
            </div>
            <div className="flex justify-between items-center mb-[18px] xl:mb-[18px] 3xl:mb-[0.938vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
              No. of Assignment
                <span className="text-[#101828] text-[16px] xl:text-[12px] 3xl:text-[0.833vw] font-semibold ml-2">
                  524
                </span>
              </h3>
              <div className="flex gap-2">
                <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
                  Schools
                  <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                    21
                  </span>
                </h3>
                <h3 className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-light flex items-center">
                # Students
                  <span className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold ml-2">
                  10740
                  </span>
                </h3>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Below 50%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level1}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      11%{" "}
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level1}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      11%{" "}
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (143)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                50 to 75%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level3}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level4}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (432)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-[10px] xl:mb-[10px] 3xl:mb-[0.521vw]">
              <h3 className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium flex items-center">
                Above 75%
              </h3>
              <div className="custommetergroup">
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level5}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      07%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (2)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative xl:w-[68%] 3xl:w-[75%] w-[75%]">
                    <MeterGroup
                      values={level6}
                      labelPosition="start"
                      className="w-full"
                    />
                  </div>
                  <div className="w-[20%] flex justify-between gap-2">
                    <p className="text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-semibold flex items-center gap-2">
                      24%
                      <span className="text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw]  font-light  xl:w-[40px] 3xl:w-[2.083vw]">
                        (432)
                      </span>
                    </p>
                    <span className="text-[#039855] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium">
                      +1%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid 3xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 gap-[10px] xl:gap-[0.833vw] divide-x mb-[16px]">
              <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                Improved
                <span className="text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-semibold ml-2">
                  7{" "}
                  <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[9px] 3xl:text-[0.425vw] mr-2"></i>
                  <span className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">
                    Indicators
                  </span>
                </span>
              </p>

              <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full pl-2">
                Declined
                <span className="text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-semibold ml-2">
                  3{" "}
                  <i className="hexatoolrectangle-down text-[#FF3030] text-[9px] xl:text-[9px] 3xl:text-[0.425vw] mr-1"></i>
                  <span className="text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">
                    Indicators
                  </span>
                </span>
              </p>
            </div>
            <div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                # of Students submitted Assignment ontime
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                  62.5%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                # of Students submitted Assignment ontime (Quiz)
                  <span className="flex items-center text-[#101828] text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                  61.6%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>

              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                % of Students with Assignment Score{">"} 90%
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                  14.5%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                Avg score of students in Quizzes
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                  74.5%   {" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
              <div className="bg-[#F2F4F7] rounded-md xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] mb-[3px]">
                <p className="text-[#344054] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium flex  justify-between items-center  w-full">
                % of Students with Quiz Score{">"}90%
                  <span className="text-[#101828] flex items-center text-[14px] xl:text-[13px] 3xl:text-[0.720vw] font-semibold">
                  24.5%{" "}
                    <span className="text-[#12B76A] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light ml-1">
                      4%
                    </span>
                    <i className="hexatoolrectangle-up text-[#12B76A] text-[9px] xl:text-[8px] 3xl:text-[0.425vw] px-0.5"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ProgressSnapshot
                visible={progressSnapshotPopupShow}
                onHides={() => setProgressSnapshotPopupShow(false)}
            />
    </>
  );
}
