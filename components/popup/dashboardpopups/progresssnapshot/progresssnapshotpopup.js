"use client"
import React, { useRef, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from 'primereact/dropdown';
import ClassroomAdoptionTrend from "./classroomadoptiontrend";
import SchoolView from "./schoolview";
import TeacherView from "./teacherview";
import { MeterGroup } from "primereact/metergroup";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

function ProgressSnapshot({ onHides, visible, }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const bar1 = [{ color: "#FF4537", value: 11 }];
    const bar2 = [{ color: "#12B76A", value: 22 }];
    const bar3 = [{ color: "#FDB022", value: 32 }];
    const bar4 = [{ color: "#5D8CE6", value: 21 }];
    const [activeTab, setActiveTab] = useState(0);
    const [SchoolType, setSchoolType] = useState(null);
    const SchoolTypeData = [
        { name: 'School 1', code: 'NY' },
        { name: 'School 2', code: 'RM' },
        { name: 'School 3', code: 'LDN' },
        { name: 'School 4', code: 'IST' },
        { name: 'School 5', code: 'PRS' }
    ];
    return (
        <Sidebar
            visible={visible}
            onHide={onHides}
            blockScroll={true}
            position="right"
            className="w-[90%] 3xl:w-[85%] custSidebar rounded-tl-[16px] 3xl:rounded-tl-[0.833vw] rounded-bl-[16px] 3xl:rounded-bl-[0.833vw]"
        >
            <div className="bg-[#0D2A57] px-[24px] xl:px-[22px] 3xl:px-[1.25vw] py-[20px] xl:py-[18px] 3xl:py-[0.938vw] text-[#FFFFFF] font-medium text-[24px] xl:text-[22px] 3xl:text-[1.25vw]  rounded-tl-[16px] 3xl:rounded-tl-[0.833vw]">Progress Snapshot</div>
            <div className="px-[24px] xl:px-[22px] 3xl:px-[1.25vw] pb-[24px] xl:pb-[22px] 3xl:pb-[1.25vw]">
                <div className="pt-[30px] xl:pt-[28px] 3xl:pt-[1.563vw]">
                    <Swiper
                        modules={[Navigation]}
                        navigation={false}
                        breakpoints={{
                            // when window width is >= 320px
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            // when window width is >= 480px
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            // when window width is >= 1200px
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 180,
                            },
                            // when window width is >= 1400px
                            1455: {
                                slidesPerView: 5,
                                spaceBetween: 300,
                            },
                            // when window width is >= 1600px
                            1600: {
                                slidesPerView: 5,
                                spaceBetween: 200,
                            },
                        }}
                        pagination={{ clickable: true }}
                        onSwiper={(swiper) => {
                            setTimeout(() => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            });
                        }}
                    >
                        <SwiperSlide>
                        <div className="col w-[300px] 3xl:w-[17.708vw] mb-[10px] 3xl:mb-[0.521vw]">
                            <div className="rounded-[8px] 3xl:rounded-[0.417vw] bg-white CardShadow">
                                <div className="rounded-t-[8px] 3xl:rounded-t-[0.417vw] px-[16px] xl:px-[14px] 3xl:px-[0.833vw] py-[12px] xl:py-[12px] 3xl:py-[0.625vw] bg-[#123B7A]">
                                    <div className="flex items-center justify-between gap-[8px] 3xl:gap-[0.417vw]">
                                        <div>
                                            <div className="flex items-end gap-[8px] 3xl:gap-[0.417vw]">
                                                <div className="text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold text-white">86</div>
                                                <div className="text-[12px] 3xl:text-[0.625vw] font-medium text-[#039855] mb-[2px]">+50</div>
                                            </div>
                                            <div className="text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-medium text-[#FFFFFF]">
                                                Classroom Adoption
                                            </div>
                                        </div>
                                        <i className="hexatoolclassrooms text-[48px] xl:text-[46px] 3xl:text-[2.5vw] text-white"></i>
                                    </div>
                                </div>
                                <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup rounded-b-[8px] 3xl:rounded-b-[0.417vw] ">
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
                        </SwiperSlide>
                        {/* col */}
                        <SwiperSlide>
                            <div className="col w-[300px] 3xl:w-[17.708vw]">
                                <div className="rounded-[8px] 3xl:rounded-[0.417vw] bg-white CardShadow">
                                    <div className="rounded-t-[8px] 3xl:rounded-t-[0.417vw] px-[8px] 3xl:px-[0.417vw] pt-[8px] 3xl:pt-[0.417vw] ">
                                        <div className="flex items-center justify-between gap-[8px] 3xl:gap-[0.417vw]">
                                            <div>
                                                <div className="flex items-end gap-[8px] 3xl:gap-[0.417vw]">
                                                    <div className="text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold text-[#101828]">92</div>
                                                    <div className="text-[12px] 3xl:text-[0.625vw] font-medium text-[#039855] mb-[2px]">+50</div>
                                                </div>
                                                <div className="text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-medium text-[#101828]">
                                                    Assignment Creation
                                                </div>
                                            </div>
                                            <i className="hexatoolassignments text-[40px] xl:text-[38px] 3xl:text-[1.979vw] text-[#344054]"></i>
                                        </div>
                                    </div>
                                    <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup rounded-b-[8px] 3xl:rounded-b-[0.417vw] ">
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
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col w-[300px] 3xl:w-[17.708vw]">
                                <div className="rounded-[8px] 3xl:rounded-[0.417vw] bg-white CardShadow">
                                    <div className="rounded-t-[8px] 3xl:rounded-t-[0.417vw] px-[8px] 3xl:px-[0.417vw] pt-[8px] 3xl:pt-[0.417vw] ">
                                        <div className="flex items-center justify-between gap-[8px] 3xl:gap-[0.417vw]">
                                            <div>
                                                <div className="flex items-end gap-[8px] 3xl:gap-[0.417vw]">
                                                    <div className="text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold text-[#101828]">78</div>
                                                    <div className="text-[12px] 3xl:text-[0.625vw] font-medium text-[#039855] mb-[2px]">+50</div>
                                                </div>
                                                <div className="text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-medium text-[#101828]">
                                                    Assignment Per Week
                                                </div>
                                            </div>
                                            <i className="hexatooldaily-task text-[40px] xl:text-[38px] 3xl:text-[1.979vw] text-[#344054]"></i>
                                        </div>
                                    </div>
                                    <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup rounded-b-[8px] 3xl:rounded-b-[0.417vw] ">
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
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col w-[300px] 3xl:w-[17.708vw]">
                                <div className="rounded-[8px] 3xl:rounded-[0.417vw] bg-white CardShadow">
                                    <div className="rounded-t-[8px] 3xl:rounded-t-[0.417vw] px-[8px] 3xl:px-[0.417vw] pt-[8px] 3xl:pt-[0.417vw] ">
                                        <div className="flex items-center justify-between gap-[8px] 3xl:gap-[0.417vw]">
                                            <div>
                                                <div className="flex items-end gap-[8px] 3xl:gap-[0.417vw]">
                                                    <div className="text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold text-[#101828]">92</div>
                                                    <div className="text-[12px] 3xl:text-[0.625vw] font-medium text-[#039855] mb-[2px]">+50</div>
                                                </div>
                                                <div className="text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-medium text-[#101828]">
                                                    Assignment Submission
                                                </div>
                                            </div>
                                            <i className="hexatoolcontract text-[40px] xl:text-[38px] 3xl:text-[1.979vw] text-[#344054]"></i>
                                        </div>
                                    </div>
                                    <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup rounded-b-[8px] 3xl:rounded-b-[0.417vw] ">
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
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col w-[300px] 3xl:w-[17.708vw]">
                                <div className="rounded-[8px] 3xl:rounded-[0.417vw] bg-white CardShadow">
                                    <div className="rounded-t-[8px] 3xl:rounded-t-[0.417vw] px-[8px] 3xl:px-[0.417vw] pt-[8px] 3xl:pt-[0.417vw] ">
                                        <div className="flex items-center justify-between gap-[8px] 3xl:gap-[0.417vw]">
                                            <div>
                                                <div className="flex items-end gap-[8px] 3xl:gap-[0.417vw]">
                                                    <div className="text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold text-[#101828]">92</div>
                                                    <div className="text-[12px] 3xl:text-[0.625vw] font-medium text-[#039855] mb-[2px]">+50</div>
                                                </div>
                                                <div className="text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-medium text-[#101828]">
                                                    Quiz Submission %
                                                </div>
                                            </div>
                                            <i className="hexatoolthumb-ups text-[40px] xl:text-[38px] 3xl:text-[1.979vw] text-[#344054]"></i>
                                        </div>
                                    </div>
                                    <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup rounded-b-[8px] 3xl:rounded-b-[0.417vw] ">
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
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col w-[300px] 3xl:w-[17.708vw]">
                                <div className="rounded-[8px] 3xl:rounded-[0.417vw] bg-white CardShadow">
                                    <div className="rounded-t-[8px] 3xl:rounded-t-[0.417vw] px-[8px] 3xl:px-[0.417vw] pt-[8px] 3xl:pt-[0.417vw] ">
                                        <div className="flex items-center justify-between gap-[8px] 3xl:gap-[0.417vw]">
                                            <div>
                                                <div className="flex items-end gap-[8px] 3xl:gap-[0.417vw]">
                                                    <div className="text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold text-[#101828]">78</div>
                                                    <div className="text-[12px] 3xl:text-[0.625vw] font-medium text-[#039855] mb-[2px]">+50</div>
                                                </div>
                                                <div className="text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-medium text-[#101828]">
                                                    Assignment Not Submitted {'>'} 4
                                                </div>
                                            </div>
                                            <i className="hexatoolthumb-down text-[40px] xl:text-[38px] 3xl:text-[1.979vw] text-[#344054]"></i>
                                        </div>
                                    </div>
                                    <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup rounded-b-[8px] 3xl:rounded-b-[0.417vw] ">
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
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="col w-[300px] 3xl:w-[17.708vw]">
                                <div className="rounded-[8px] 3xl:rounded-[0.417vw] bg-white CardShadow">
                                    <div className="rounded-t-[8px] 3xl:rounded-t-[0.417vw] px-[8px] 3xl:px-[0.417vw] pt-[8px] 3xl:pt-[0.417vw] ">
                                        <div className="flex items-center justify-between gap-[8px] 3xl:gap-[0.417vw]">
                                            <div>
                                                <div className="flex items-end gap-[8px] 3xl:gap-[0.417vw]">
                                                    <div className="text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold text-[#101828]">92</div>
                                                    <div className="text-[12px] 3xl:text-[0.625vw] font-medium text-[#039855] mb-[2px]">+50</div>
                                                </div>
                                                <div className="text-[14px] xl:text-[12px] 3xl:text-[0.625vw] font-medium text-[#101828]">
                                                    Quiz Not Submitted {'>'} 4
                                                </div>
                                            </div>
                                            <i className="hexatoolthumb-down text-[40px] xl:text-[38px] 3xl:text-[1.979vw] text-[#344054]"></i>
                                        </div>
                                    </div>
                                    <div className="p-[8px] 3xl:p-[0.417vw] bg-white meterGroup rounded-b-[8px] 3xl:rounded-b-[0.417vw] ">
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
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="mt-[30px] xl:mt-[28px] 3xl:mt-[1.563vw]">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center">
                            <div onClick={() => setActiveTab(0)} className={`${activeTab === 0 ? 'border-b-[#101828] text-[#101828] font-semibold' : 'border-b-[#E4E7EC] text-[#667085] font-normal'} border-b text-[16px] xl:text-[14px] 3xl:text-[0.833vw] px-[16px] xl:px-[14px] 3xl:px-[0.833vw] py-[7.5px] 3xl:py-[0.391vw] cursor-pointer`}>Classroom Adoption Trend</div>
                            <div onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? 'border-b-[#101828] text-[#101828] font-semibold' : 'border-b-[#E4E7EC] text-[#667085] font-normal'} border-b text-[16px] xl:text-[14px] 3xl:text-[0.833vw] px-[16px] xl:px-[14px] 3xl:px-[0.833vw] py-[7.5px] 3xl:py-[0.391vw] cursor-pointer`}>School View</div>
                            <div onClick={() => setActiveTab(2)} className={`${activeTab === 2 ? 'border-b-[#101828] text-[#101828] font-semibold' : 'border-b-[#E4E7EC] text-[#667085] font-normal'} border-b text-[16px] xl:text-[14px] 3xl:text-[0.833vw] px-[16px] xl:px-[14px] 3xl:px-[0.833vw] py-[7.5px] 3xl:py-[0.391vw] cursor-pointer`}>Teacher View</div>
                        </div>
                        <div className='customDropdown'>
                            <Dropdown
                                value={SchoolType}
                                onChange={(e) => setSchoolType(e.target.value)}
                                filter
                                options={SchoolTypeData}
                                optionLabel="name"
                                placeholder="School Type"
                                className="w-full lg:w-[180px] 2xl:w-[140px] 3xl:w-[9.375vw]"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-[30px] xl:mt-[28px] 3xl:mt-[1.563vw]">
                    {activeTab === 0 && <ClassroomAdoptionTrend />}
                    {activeTab === 1 && <SchoolView />}
                    {activeTab === 2 && <TeacherView />}
                </div>
            </div>
        </Sidebar>
    )
}

export default ProgressSnapshot
