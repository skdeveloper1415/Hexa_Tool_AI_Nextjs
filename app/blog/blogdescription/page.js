"use client"
import Image from "next/image";
import React, { useState } from "react";
import { InputText } from 'primereact/inputtext'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Avatar } from 'primereact/avatar';
import Layout from '../../../layouts/pagelayout';
import Link from 'next/link';
export default function Blogdescription() {
    const [value, setValue] = useState('');
    return (
        <Layout>
            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                        <div className='text-[#101828] text-[30px] xl:text-[25px] 3xl:text-[1.563vw] font-semibold'>
                            Blog
                        </div>
                    </div>

                    <div>
                        <span className="p-input-icon-left custm-search">
                            <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
                            <InputText
                                placeholder="Search"
                                className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[400px] xl:w-[440px] 3xl:w-[23.75vw] custhover"
                            />
                        </span>
                    </div>

                </div>

                <div className="flex justify-between items-center pt-[20px] ">
                    <Link href={'/blog'} className='flex items-center 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center'>
                        <i className="pi pi-angle-double-left mr-2" style={{ fontSize: '1rem' }}></i>
                        Back to Blog
                    </Link>
                </div>

                <div className="pt-[38px] 3xl:pt-[1.979vw]">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-[38px] 3xl:gap-[1.979vw] bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw]">
                        <div className="">
                            <div className="flex items-center justify-between gap-2 py-[20px] px-[20px] 3xl:py-[1.042vw] 3xl:px-[1.042vw] bg-[#F9FAFB] border-b border-[#EBEBEB] rounded-t-md 3xl:rounded-[0.313vw]">
                                <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                    <div className="flex gap-3">
                                        <div className="bg-[#FFF2E5] w-[64px] h-[64px] xl:w-[68px] xl:h-[68px] 3xl:w-[3.542vw] 3xl:h-[3.542vw] rounded-full flex justify-center items-center">
                                            <Image
                                                src="/images/student-profile/2.png"
                                                alt="logo"
                                                width={64}
                                                height={64}
                                            />
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-2">
                                                <h6 className="text-[#101828] mb-[5px] text-[20px] xl:text-[22px] 3xl:text-[1.042vw] font-semibold">
                                                    Amiley Smith <span className="text-[#98A2B3] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">5 hrs ago</span>
                                                </h6>
                                                <div className="flex justify-between items-center gap-2">
                                                    <i className="hexatooleye text-[#667085] font-medium text-[14px] xl:text-[16px] 3xl:text-[0.729vw]"></i>
                                                    <p className="text-[#667085] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">All</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 xl:gap-4">
                                                <div className="text-[#1B55AF] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">
                                                    Instructor
                                                </div>
                                                <div className="text-[#1B55AF] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">
                                                    Math Class
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <Link
                                    href=""
                                    className="inline-flex 3xl:text-[0.729vw] 2xl:text-[0.729vw] xl:text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF]  rounded-lg xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw] h-auto"
                                >
                                    Remove
                                </Link>
                            </div>

                            <div className="px-[90px] xl:px-[90x] 3xl:px-[4.063vw] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] bg-[#F9FAFB] border-b border-[#EBEBEB]">
                                <div className="text-[#101828] pb-[20px] xl:pb-[20x] 3xl:pb-[1.042vw] text-[24px]  xl:text-[24px] 3xl:text-[1.25vw] font-semibold">Even Numbers</div>
                                <div className="text-[14px] xl:text-[14px] 3xl:text-[0.521vw] font-normal">Even numbers are those numbers that can be divided into two equal groups or pairs and are exactly divisible by 2.
                                    For example 2, 4, 6, 8, 10 and so on. An even number is a number that is a multiple of 2.
                                    It can be said that any number that is completely divisible by 2 is an even number.</div>
                            </div>

                            <div className="gap-5 px-[90px] xl:px-[90x] 3xl:px-[4.063vw] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] bg-[#F9FAFB] border-b border-[#EBEBEB]">
                                <div className="flex items-center gap-5 pb-[10px] xl:pb-[12px] 3xl:pb-[0.521vw] border-b">
                                    <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                        <i className="hexatoolthumb-outline text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                        <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">Like</div>
                                    </div>
                                    <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                        <i className="hexatoolcomments text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                        <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">Comments</div>
                                    </div>
                                    <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2 text-[#1B55AF]">
                                        <Image src="/images/print.svg" alt="print" width={16} height={16} />
                                        <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">Print</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 pt-[10px] xl:pt-[12px] 3xl:pt-[0.521vw]">
                                    <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                        <i className="hexatoolthumb-outline text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                        <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">24</div>
                                    </div>
                                    <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                        <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">2 Comments</div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-[90px] xl:px-[90x] 3xl:px-[4.063vw] py-[20px] xl:py-[20x] 3xl:py-[1.042vw]">
                                <div className="relative custinput">
                                    <Link href="#">
                                        <div className="absolute top-[8px] right-[15px] text-[#1B55AF] font-medium text-[20px] 3xl:text-[1.146vw]">
                                            <i className="hexatoolmic"></i>
                                        </div></Link>
                                    <InputText
                                        autoResize
                                        placeholder="Type here"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex justify-end pt-[5px] xl:pt-[7px] 3xl:pt-[0.26vw]">
                                    <Link
                                        href=""
                                        disabled
                                        className="inline-flex 3xl:text-[0.729vw] 2xl:text-[0.729vw] xl:text-[14px] text-[#7e7f81] font-medium border border-[#CFE2F3] bg-[#CFE2F3] rounded-lg xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw] h-auto"
                                    >
                                        Add Comment
                                    </Link>
                                </div>
                            </div>

                            <div className="px-[240px] xl:px-[240x] 3xl:px-[12.5vw] pt-[20px] xl:pt-[20x] 3xl:pt-[1.042vw] pb-[30px] xl:pb-[30px] 3xl:pb-[1.563vw]">
                                <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#FFF2E5] w-[64px] h-[64px] xl:w-[68px] xl:h-[68px] 3xl:w-[3.542vw] 3xl:h-[3.542vw] rounded-full flex justify-center items-center">
                                            <Image
                                                src="/images/student-profile/3.png"
                                                alt="logo"
                                                width={64}
                                                height={64}
                                            />
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-2">
                                                <h6 className="text-[#101828] mb-[5px] text-[20px] xl:text-[22px] 3xl:text-[1.042vw] font-semibold">
                                                    Daryl Hopper
                                                </h6>
                                                <div className="flex gap-3 xl:gap-4">
                                                    <div className="text-[#1B55AF] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">
                                                        Instructor
                                                    </div>
                                                    <div className="text-[#1B55AF] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">
                                                        Math Class
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="pt-[15px] xl:pt-[15x] 3xl:pt-[0.781vw]">
                                    <div className="text-[#344054] pb-[15px] xl:pb-[15x] 3xl:pb-[0.781vw] text-[14px]  xl:text-[16px] 3xl:text-[0.729vw] font-normal">Informative Post</div>
                                    <div className="gap-5">
                                        <div className="flex items-center gap-5 pb-[10px] xl:pb-[12px] 3xl:pb-[0.521vw]">
                                            <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                                <i className="hexatoolthumb-outline text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                                <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">Like</div>
                                            </div>
                                            <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                                <i className="hexatoolcomments text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                                <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">Comments</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-[240px] xl:px-[240x] 3xl:px-[12.5vw] pb-[30px] xl:pb-[30px] 3xl:pb-[1.563vw]">
                                <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] border-b border-[#EBEBEB] rounded-t-md 3xl:rounded-[0.313vw]">
                                    <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-[#FFF2E5] w-[64px] h-[64px] xl:w-[68px] xl:h-[68px] 3xl:w-[3.542vw] 3xl:h-[3.542vw] rounded-full flex justify-center items-center">
                                                <Image
                                                    src="/images/student-profile/4.png"
                                                    alt="logo"
                                                    width={64}
                                                    height={64}
                                                />
                                            </div>
                                            <div className="">
                                                <div className="flex items-center gap-2">
                                                    <h6 className="text-[#101828] mb-[5px] text-[20px] xl:text-[22px] 3xl:text-[1.042vw] font-semibold">
                                                        Daryl Hopper
                                                    </h6>
                                                    <div className="flex gap-3 xl:gap-4">
                                                        <div className="text-[#1B55AF] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">
                                                            Instructor
                                                        </div>
                                                        <div className="text-[#1B55AF] text-[14px] xl:text-[16px] 3xl:text-[0.729vw] font-normal">
                                                            Math Class
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 xl:gap-3 3xl:gap-2">
                                        <Link
                                            href=""
                                            className="inline-flex 3xl:text-[0.729vw] 2xl:text-[0.729vw] xl:text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF]  rounded-lg xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw] h-auto"
                                        >
                                            Approve
                                        </Link>
                                        <Link
                                            href=""
                                            className="inline-flex 3xl:text-[0.729vw] 2xl:text-[0.729vw] xl:text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF]  rounded-lg xl:px-[0.729vw] px-[14px] 3xl:py-[0.417vw] xl:py-[ 8px] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw] h-auto"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>

                                <div className="py-[15px] xl:py-[15x] 3xl:py-[0.781vw]">
                                    <div className="text-[14px] xl:text-[14px] 3xl:text-[0.521vw] font-normal">Even numbers are those numbers that can be divided into two equal groups or pairs and are exactly divisible by 2.
                                        For example 2, 4, 6, 8, 10 and so on. An even number is a number that is a multiple of 2.
                                        It can be said that any number that is completely divisible by 2 is an even number.
                                    </div>
                                </div>

                                <div className="gap-5">
                                    <div className="flex items-center gap-5 pb-[10px] xl:pb-[12px] 3xl:pb-[0.521vw]">
                                        <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                            <i className="hexatoolthumb-outline text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                            <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">Like</div>
                                        </div>
                                        <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                            <i className="hexatoolcomments text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                            <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">Comments</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
