"use client"
import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { InputTextarea } from "primereact/inputtextarea";
export default function Blogdetails({ onhide, visible }) {
    const [value, setValue] = useState('');
    return (
        <div>
            <Dialog className="customHeader customm w-[800px]  " header=" " visible={visible} style={{ width: '50vw' }} onHide={onhide} position="left">
                <div className="px-[20px]  ">
                    <div className="py-[10px]">
                        <div className=" flex justify-center ">
                            <Image src="/images/Featured icon.svg" width={38} height={38} alt=""></Image>
                        </div>
                    </div>
                    <div
                        className="flex justify-center flex-col gap-8 xl:gap-7 3xl:gap-[1.667vw]">
                        <div className="flex justify-center text-[#101828] text-[18px] xl:text-[20px] 3xl:text-[0.938vw] font-semibold ">
                            Blog Details
                        </div>

                        <div className="flex flex-col gap-5 custom ">

                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] xl:text-[16px] text-[14px] text-[#344054] font-medium block mb-[6px]" htmlFor="username">Blog Name</label></div>
                                <div className="card flex justify-content-center  ">
                                    <InputText className="w-full rounded-lg" placeholder="Type here" value={value} onChange={(e) => setValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] xl:text-[16px] text-[14px] text-[#344054] font-medium block mb-[6px]" htmlFor="username">Blog Link</label></div>
                                <div className="card flex justify-content-center  ">
                                    <InputText className="w-full rounded-lg" placeholder="Type here" value={value} onChange={(e) => setValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] xl:text-[16px] text-[14px] text-[#344054] font-medium block mb-[6px]" htmlFor="username">Blog Description</label></div>
                                <div className="card flex justify-content-center  ">
                                    <InputTextarea
                                        placeholder="Enter a description..."
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        rows={5}
                                        cols={5}
                                        className="w-full rounded-lg"
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="flex  gap-[12px] justify-end pt-[30px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
                        <div className=" flex justify-center items-center border-2 px-[18px] cursor-pointer  py-[10px] border-[#C6CBD2] rounded-lg ">
                            <button className="text-[#344054] text-[16px] xl:text-[0.833vw] font-medium ">Cancel</button>
                        </div>
                        <div className=" flex justify-center bg-[#1570EF]  items-center border-2 cursor-pointer px-[18px] py-[10px] border-[#1570EF] rounded-lg">
                            <button className="text-[#fff] text-[16px] xl:text-[0.833vw] font-medium">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
