"use client";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Assignmentsubmission from "../studentsnapshot/assignmentsubmission/page";
import Studentview from "../studentsnapshot/studentview/page";
import { MeterGroup } from "primereact/metergroup";
import { Sidebar } from "primereact/sidebar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE } from "../../../helper/enum";


export default function Studentsnapshot({visible,onHide}) {
  const [scoreCardTab, setScoreCardTab] = useState(1);
  const [grade, setGrade] = useState();
  const bar1 = [{ color: "#FF4537", value: 11 }];
  const bar2 = [{ color: "#12B76A", value: 22 }];
  const bar3 = [{ color: "#FDB022", value: 32 }];
  const bar4 = [{ color: "#5D8CE6", value: 21 }];
  return (
    <>
      
        

        <Sidebar
          visible={visible}
          onHide={onHide}
          blockScroll={true}
          position="right"
          className="w-[90%] custSidebar rounded-tl-[16px] 3xl:rounded-tl-[0.833vw] rounded-bl-[16px] 3xl:rounded-bl-[0.833vw]"
        >
          <div className="px-[24px] 3xl:px-[1.25vw] py-[15px] lg:py-[20px] 3xl:py-[1.042vw] bg-[#0D2A57] rounded-tl-[16px] 3xl:rounded-tl-[0.833vw]">
            <div className="text-[18px] xl:text-[20px] 3xl:text-[1.25vw] font-medium text-white">
              Student Progress Snapshot
            </div>
          </div>
          <div className="p-[24px] 3xl:p-[1.25vw]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px] 3xl:gap-[0.833vw]">
              <div className="col">
                <div className="bg-white CardShadow rounded-[8px] 3xl:rounded-[0.417vw] overflow-hidden h-full">
                  <div className="p-[16px] 3xl:p-[0.833vw] bg-[#081934]">
                    <div className="flex justify-between text-white">
                      <div className="col">
                        <div className="col">
                          <span className="inline-block text-[20px] 3xl:text-[1.042vw] font-semibold mr-[8px] 3xl:mr-[0.417vw]">
                            86
                          </span>
                          <span className="inline-block text-[#039855] text-[12px] 3xl:text-[0.625vw] font-medium">
                            +50
                          </span>
                        </div>
                        <div className="text-[14px] 3xl:text-[0.833vw] font-medium">
                          Assignment Submission Rate
                        </div>
                      </div>
                      <div className="col">
                        <i className="hexatoolproficiency text-[48px] 3xl:text-[2.5vw]"></i>
                      </div>
                    </div>
                  </div>
                  <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup">
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar1} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        11%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar2} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        22%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar3} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        32%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar4} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        21%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="bg-white CardShadow rounded-[8px] 3xl:rounded-[0.417vw] overflow-hidden h-full">
                  <div className="p-[16px] 3xl:p-[0.833vw] bg-white">
                    <div className="flex justify-between">
                      <div className="col">
                        <div className="col">
                          <span className="inline-block text-[#101828] text-[20px] 3xl:text-[1.042vw] font-semibold mr-[8px] 3xl:mr-[0.417vw]">
                            92
                          </span>
                          <span className="inline-block text-[#039855] text-[12px] 3xl:text-[0.625vw] font-medium">
                            +50
                          </span>
                        </div>
                        <div className="text-[#344054] text-[14px] 3xl:text-[0.833vw] font-medium">
                          Assignment non Submission %
                        </div>
                      </div>
                      <div className="col">
                        <i className="hexatoolproficiency text-[#344054] text-[48px] 3xl:text-[2.5vw]"></i>
                      </div>
                    </div>
                  </div>
                  <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup">
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar1} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        11%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar2} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        22%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar3} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        32%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar4} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        21%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="bg-white CardShadow rounded-[8px] 3xl:rounded-[0.417vw] overflow-hidden h-full">
                  <div className="p-[16px] 3xl:p-[0.833vw] bg-white">
                    <div className="flex justify-between">
                      <div className="col">
                        <div className="col">
                          <span className="inline-block text-[#101828] text-[20px] 3xl:text-[1.042vw] font-semibold mr-[8px] 3xl:mr-[0.417vw]">
                            78
                          </span>
                          <span className="inline-block text-[#039855] text-[12px] 3xl:text-[0.625vw] font-medium">
                            +50
                          </span>
                        </div>
                        <div className="text-[#344054] text-[14px] 3xl:text-[0.833vw] font-medium">
                          Quiz Submission Rate
                        </div>
                      </div>
                      <div className="col">
                        <i className="hexatoolproficiency text-[#344054] text-[48px] 3xl:text-[2.5vw]"></i>
                      </div>
                    </div>
                  </div>
                  <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup">
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar1} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        11%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar2} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        22%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar3} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        32%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar4} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        21%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="bg-white CardShadow rounded-[8px] 3xl:rounded-[0.417vw] overflow-hidden h-full">
                  <div className="p-[16px] 3xl:p-[0.833vw] bg-white">
                    <div className="flex justify-between">
                      <div className="col">
                        <div className="col">
                          <span className="inline-block text-[#101828] text-[20px] 3xl:text-[1.042vw] font-semibold mr-[8px] 3xl:mr-[0.417vw]">
                            92
                          </span>
                          <span className="inline-block text-[#039855] text-[12px] 3xl:text-[0.625vw] font-medium">
                            +50
                          </span>
                        </div>
                        <div className="text-[#344054] text-[14px] 3xl:text-[0.833vw] font-medium">
                          Quiz Non Submission %
                        </div>
                      </div>
                      <div className="col">
                        <i className="hexatoolproficiency text-[#344054] text-[48px] 3xl:text-[2.5vw]"></i>
                      </div>
                    </div>
                  </div>
                  <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup">
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar1} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        11%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar2} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        22%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar3} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        32%
                      </div>
                    </div>
                    <div className="flex items-center gap-[16px]">
                      <div className="col w-full">
                        <MeterGroup values={bar4} />
                      </div>
                      <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw]">
                        21%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-[10px] 3xl:mt-[0.521vw]">
            <div className="flex gap-1">
              <div className="text-[#FF4537] rounded-sm text-[14px] flex items-center mt-[8px] h-[9px] w-[9px] bg-[#FF4537]">
                <div>-</div>
              </div>
              <div className="text-[#344054] text-[14px] 3xl:text-[0.625vw] mt-[2px]">-4</div>
            </div>

            <div className="flex gap-1">
              <div className="text-[#FDB022] rounded-sm text-[14px] flex items-center mt-[8px] h-[9px] w-[9px] bg-[#FDB022]">
                <div>-</div>
              </div>
              <div className="text-[#344054] text-[14px] 3xl:text-[0.625vw] mt-[2px]">3-4</div>
            </div>

            <div className="flex gap-1">
              <div className="text-[#12B76A] rounded-sm text-[14px] flex items-center mt-[8px] h-[9px] w-[9px] bg-[#12B76A]">
                <div>-</div>
              </div>
              <div className="text-[#344054] text-[14px] 3xl:text-[0.625vw] mt-[2px]">0-2</div>
            </div>

            <div className="flex gap-1">
              <div className="text-[#5D8CE6] rounded-sm text-[14px] flex items-center mt-[8px] h-[9px] w-[9px] bg-[#5D8CE6]">
                <div>-</div>
              </div>
              <div className="text-[#344054] text-[14px] 3xl:text-[0.625vw] mt-[2px]">Submitted All</div>
            </div>
          
          </div>

            <div className="mt-[24px] 3xl:mt-[1.25vw]">
              <div className="border border-[#C8CBD0] p-[20px] 3xl:p-[1.042vw] rounded-[8px] 3xl:rounded-[0.417vw]">
                <div className="col">
                  <div className="lg:flex items-center justify-between">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center">
                        <div
                          onClick={() => setScoreCardTab(1)}
                          className={`${
                            scoreCardTab === 1
                              ? "border-b border-[#101828] text-[#101828] font-semibold"
                              : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                          }  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
                        >
                          <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                            Assignment Submission Trend
                          </div>
                        </div>
                        <div
                          onClick={() => setScoreCardTab(2)}
                          className={`${
                            scoreCardTab === 2
                              ? "border-b border-[#101828] text-[#101828] font-semibold"
                              : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                          }  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
                        >
                          <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                            Student View
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-[15px] 3xl:gap-[1.25vw] mt-[20px] lg:mt-[0]">
                      <div className="col">
                        <Dropdown
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          filter
                          options={GRADE}
                          optionLabel="name"
                          placeholder="School Type"
                          className="w-full md:w-[160px] 3xl:w-[8.333vw]"
                        />
                      </div>
                      <div className="col">
                        <Dropdown
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          filter
                          options={GRADE}
                          optionLabel="name"
                          placeholder="Grade"
                          className="w-full md:w-[160px] 3xl:w-[8.333vw]"
                        />
                      </div>
                      <div className="col">
                        <Dropdown
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          filter
                          options={GRADE}
                          optionLabel="name"
                          placeholder="Gender"
                          className="w-full md:w-[160px] 3xl:w-[8.333vw]"
                        />
                      </div>
                      <div className="col">
                        <Dropdown
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          filter
                          options={GRADE}
                          optionLabel="name"
                          placeholder="Ethnicity"
                          className="w-full md:w-[160px] 3xl:w-[8.333vw]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[24px] xl:mt-[1.25vw]">
                  {scoreCardTab === 1 && <Assignmentsubmission />}
                  {scoreCardTab === 2 && <Studentview />}
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      
    </>
  );
}
