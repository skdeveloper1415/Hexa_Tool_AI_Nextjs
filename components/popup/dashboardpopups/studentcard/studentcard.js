"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Assignments from "../studentcard/assignments/page";
import { Sidebar } from "primereact/sidebar";
import { GRADE } from "../../../helper/enum";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

export default function ScoreCard({visible,onHide}) {
  const [activeTab, setActiveTab] = useState(1);
  const [grade, setGrade] = useState();
  const [date, setDate] = useState(null);
  

  return (
    <>
     
        

        {/* row */}
        <Sidebar
          visible={visible}
          onHide={onHide}
          position="right"
          className="w-[90%] custSidebar rounded-tl-[16px] 3xl:rounded-tl-[0.833vw] rounded-bl-[16px] 3xl:rounded-bl-[0.833vw]"
        >
          <div className="px-[24px] 3xl:px-[1.25vw] py-[15px] lg:py-[20px] 3xl:py-[1.042vw] bg-[#0D2A57] rounded-tl-[16px] 3xl:rounded-tl-[0.833vw]">
            <div className="text-[18px] xl:text-[20px] 3xl:text-[1.25vw] font-medium text-white">
              Student Score Card
            </div>
          </div>
          <div className="p-[24px] 3xl:p-[1.25vw]">
            <div className="flex items-center gap-[10px] 3xl:gap-[0.521vw]">
              <div className="col">
                <Link
                  href={""}
                  onClick={onHide}
                  className="inline-flex items-center text-[#1B55AF] text-[14px] 3xl:text-[0.729vw] font-medium border border-[#1B55AF] px-[14px] 3xl:px-[0.729vw] py-[8px] 3xl:py-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw]"
                >
                  <i className="hexatooldouble-arrow mr-[10px] 3xl:mr-[0.521vw]"></i>
                  Go Back
                </Link>
              </div>
              <div className="col">
                <div className="font-semibold text-[20px] 3xl:text-[1.042vw] text-[#101828]">
                  Student Details
                </div>
              </div>
            </div>
            <div className="text-[24px] 3xl:text-[1.25vw] text-[#101828] font-semibold mt-[10px] 3xl:mt-[0.521vw]">
              Activities Summary
            </div>

            <div className="mt-[24px] 3xl:mt-[1.25vw]">
              <div className="bg-[#1B55AF] rounded-[8px] 3xl:rounded-[0.417vw] p-[20px] xl:p-[26px] 3xl:p-[1.667vw] text-white">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 xl:col-span-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="col">
                        <div className="flex items-start gap-[34px] 3xl:gap-[1.771vw]">
                          <div className="col">
                            <div className="min-w-[175px] 3xl:min-w-[9.115vw]">
                              <Image
                                src={"/images/post-img1.png"}
                                width={"175"}
                                height={"200"}
                                className="rounded-[6px] 3xl:rounded-[0.313vw] w-[175px] 3xl:w-[9.115vw] h-[200px] 3xl:h-[10.417vw]"
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div className="text-[#BACCE7] text-[14px] 3xl:text-[0.729vw] font-medium">
                              Student Name
                            </div>
                            <div className="text-[20px] 3xl:text-[1.563vw] font-semibold mt-[8px] 3xl:mt-[0.417vw]">
                              Jack Johnson
                            </div>
                            <div className="text-[#BACCE7] text-[14px] 3xl:text-[0.729vw] font-medium">
                              ID:1234567
                            </div>
                            <div className="inline-block rounded-[4px] 3xl:rounded-[0.208vw] bg-[#3166B7] py-[5px] 3xl:py-[0.26vw] px-[10px] 3xl:px-[0.521vw] text-[16px] 3xl:text-[0.833vw] font-semibold mt-[8px] 3xl:mt-[0.417vw]">
                              Grade 1
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="text-[#BACCE7] text-[14px] 3xl:text-[0.729vw] font-medium mt-[15px] lg:mt-[0]">
                          Active Device
                        </div>
                        <div className="text-[16px] 3xl:text-[0.833vw] font-semibold mt-[8px] 3xl:mt-[0.417vw]">
                          Acer 1505 Chrombook
                        </div>
                        <div className="mt-[20px] 3xl:mt-[1.042vw]">
                          <div className="grid grid-cols-2 gap-[15px] lg:gap-[20px] 3xl:gap-[1.042vw]">
                            <div className="col">
                              <div className="text-[#BACCE7] text-[14px] 3xl:text-[0.729vw] font-medium">
                                Course Grade
                              </div>
                              <div className="text-[16px] 3xl:text-[0.833vw] font-semibold mt-[8px] 3xl:mt-[0.417vw]">
                                71%
                              </div>
                            </div>
                            <div className="col">
                              <div className="text-[#BACCE7] text-[14px] 3xl:text-[0.729vw] font-medium">
                                Class Average
                              </div>
                              <div className="text-[16px] 3xl:text-[0.833vw] font-semibold mt-[8px] 3xl:mt-[0.417vw]">
                                31.57894
                              </div>
                            </div>
                            <div className="col">
                              <div className="text-[#BACCE7] text-[14px] 3xl:text-[0.729vw] font-medium">
                                Address
                              </div>
                              <div className="text-[16px] 3xl:text-[0.833vw] font-semibold mt-[8px] 3xl:mt-[0.417vw]">
                                -
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 xl:col-span-4">
                    <div className="space-y-[8px] 3xl:space-y-[0.417vw] mt-[15px] xl:mt-[0]">
                      <div className="text-[#BACCE7] text-[14px] 3xl:text-[0.729vw] font-medium">
                        Connected Family
                      </div>
                      <div className="col">
                        <div className="bg-[#3166B7] rounded-[8px] 3xl:rounded-[0.417vw] px-[20px] 3xl:px-[1.042vw] py-[10px] 3xl:py-[0.521vw]">
                          <div className="flex items-center justify-between">
                            <div className="col">
                              <div className="flex items-center gap-[10px] 3xl:gap-[0.521vw]">
                                <div className="col">
                                  <div className="min-w-[48px] 3xl:min-w-[2.5vw]">
                                    <Image
                                      src={"/images/profile.png"}
                                      width={"48"}
                                      height={"48"}
                                      className="rounded-full w-[48px] 3xl:w-[2.5vw] h-[48px] 3xl:h-[2.5vw]"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-[16px] 3xl:text-[0.833vw] font-semibold">
                                    Mr. Jan Henderson
                                  </div>
                                  <div className="text-[14px] 3xl:text-[0.729vw]">
                                    Parent
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="space-y-[8px] 3xl:space-y-[0.417vw]">
                                <div className="text-[#6CE9A6] text-[14px] 3xl:text-[0.729vw] font-medium">
                                  <i className="hexatoolmail mr-[8px] 3xl:mr-[0.417vw]"></i>
                                  Mail
                                </div>
                                <div className="text-[#6CE9A6] text-[14px] 3xl:text-[0.729vw] font-medium">
                                  <i className="hexatoolrefresh mr-[8px] 3xl:mr-[0.417vw]"></i>
                                  Connect
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="bg-[#3166B7] rounded-[8px] 3xl:rounded-[0.417vw] px-[20px] 3xl:px-[1.042vw] py-[10px] 3xl:py-[0.521vw]">
                          <div className="flex items-center justify-between">
                            <div className="col">
                              <div className="flex items-center gap-[10px] 3xl:gap-[0.521vw]">
                                <div className="col">
                                  <div className="min-w-[48px] 3xl:min-w-[2.5vw]">
                                    <Image
                                      src={"/images/post-img1.png"}
                                      width={"48"}
                                      height={"48"}
                                      className="rounded-full w-[48px] 3xl:w-[2.5vw] h-[48px] 3xl:h-[2.5vw]"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-[16px] 3xl:text-[0.833vw] font-semibold">
                                    Ms. Janey Henderson
                                  </div>
                                  <div className="text-[14px] 3xl:text-[0.729vw]">
                                    Parent
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="space-y-[8px] 3xl:space-y-[0.417vw]">
                                <div className="text-[#6CE9A6] text-[14px] 3xl:text-[0.729vw] font-medium">
                                  <i className="hexatoolmail mr-[8px] 3xl:mr-[0.417vw]"></i>
                                  Mail
                                </div>
                                <div className="text-[#6CE9A6] text-[14px] 3xl:text-[0.729vw] font-medium">
                                  <i className="hexatoolrefresh mr-[8px] 3xl:mr-[0.417vw]"></i>
                                  Connect
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[24px] 3xl:mt-[1.25vw]">
                <div className="mt-[24px] xl:mt-[1.25vw]">
                  <div className="lg:flex items-center justify-between">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center">
                        <div
                          onClick={() => setActiveTab(1)}
                          className={`${
                            activeTab === 1
                              ? "border-b border-[#101828] text-[#101828] font-semibold"
                              : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                          }  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
                        >
                          <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                            Assignments
                          </div>
                        </div>
                        <div
                          onClick={() => setActiveTab(2)}
                          className={`${
                            activeTab === 2
                              ? "border-b border-[#101828] text-[#101828] font-semibold"
                              : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                          }  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
                        >
                          <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                            Quizzes
                          </div>
                        </div>
                        <div
                          onClick={() => setActiveTab(3)}
                          className={`${
                            activeTab === 3
                              ? "border-b border-[#101828] text-[#101828] font-semibold"
                              : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                          }  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
                        >
                          <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                            Comments
                          </div>
                        </div>
                        <div
                          onClick={() => setActiveTab(4)}
                          className={`${
                            activeTab === 4
                              ? "border-b border-[#101828] text-[#101828] font-semibold"
                              : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                          }  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
                        >
                          <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                            AI Report Card Comments
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-[15px] 3xl:gap-[1.25vw] mt-[20px] lg:mt-[0]">
                      <div className="col">
                        <Calendar
                          value={date}
                          placeholder="Start Date"
                          onChange={(e) => setDate(e.value)}
                          className="w-full md:w-[160px] 3xl:w-[8.333vw] cutsm_Input"
                        />
                      </div>
                      <div className="col">
                        <Calendar
                          value={date}
                          placeholder="End Date"
                          onChange={(e) => setDate(e.value)}
                          className="w-full md:w-[160px] 3xl:w-[8.333vw] cutsm_Input"
                        />
                      </div>
                      <div className="col">
                        <Dropdown
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          filter
                          options={GRADE}
                          optionLabel="name"
                          placeholder="All"
                          className="w-full md:w-[160px] 3xl:w-[8.333vw]"
                        />
                      </div>

                      <div className="col">
                        <div className="flex items-center gap-[10px] 3xl:gap-[0.521vw]">
                          <Link
                            href={""}
                            className="inline-flex items-center text-white text-[14px] 3xl:text-[0.729vw] font-medium border border-[#1570EF] bg-[#1570EF] px-[14px] 3xl:px-[0.729vw] py-[8px] 3xl:py-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw]"
                          >
                            Go
                          </Link>
                          <Link
                            href={""}
                            className="inline-flex items-center text-[#1B55AF] text-[14px] 3xl:text-[0.729vw] font-medium border border-[#1B55AF] px-[14px] 3xl:px-[0.729vw] py-[8px] 3xl:py-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw]"
                          >
                            Clear
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[24px] xl:mt-[1.25vw]">
                  {activeTab === 1 && <Assignments />}
                  {activeTab === 2 && <div>Quizzes</div>}
                  {activeTab === 3 && <div>Comments</div>}
                  {activeTab === 4 && <div>AI Report Card Comments</div>}
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      
    </>
  );
}
