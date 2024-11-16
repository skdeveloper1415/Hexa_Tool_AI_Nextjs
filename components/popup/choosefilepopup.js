"use client"
import React, { Fragment, useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import { Dropdown } from "primereact/dropdown";
import { Menu, Transition } from "@headlessui/react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ScrollPanel } from "primereact/scrollpanel";
import FileCommanComponent from "./FileCommanComponent";

export default function ChooseFile({ onhide, visible }) {
    const [checked, setChecked] = useState(false);
    const [topicValue, setTopicvalue] = useState(null);
    const topics = [
        { name: "All", code: "NY" },
        { name: "Approved", code: "RM" },
        { name: "Approval Pending", code: "LDN" },
    ];
    const aiGeneraedOutput = [
        { folderName: "Images", size: "18 MB", type: "I", image:'folder_icon.svg' },
        { folderName: "Files", size: "20 MB", type: "O", image:'folder_icon.svg' },
        { folderName: "Photos", size: "150 MB", type: "I", image:'folder_icon.svg' },
        { folderName: "Videos", size: "300 MB", type: "O", image:'folder_icon.svg' },
    ];

    const aiGeneraedOutput2 = [
        { folderName: "Images", size: "18 MB" , type: "O", image:'text_line_jpg.svg'},
        { folderName: "Files", size: "20 MB", type: "O", image:'text_line_files.svg'},
        { folderName: "PDF", size: "150 MB" , type: "O", image:'text_line_pdf.svg'},
        { folderName: "Videos", size: "300 MB" , type: "O" , image:'text_line_mp4.svg'},
        { folderName: "Audio", size: "300 MB" , type: "O" , image:'text_line_mp3.svg'},
        { folderName: "Excel", size: "300 MB" , type: "O" , image:'text_line_xls.svg'},
        { folderName: "GIF", size: "300 MB" , type: "O" , image:'text_line_gif.svg'},
        { folderName: "SVG", size: "300 MB" , type: "O" , image:'text_line_svg.svg'},
        { folderName: "PNG", size: "300 MB" , type: "O" , image:'text_line_png.svg'},
      ];

    return (
        <div>
            <Dialog className="customHeader customm w-[80%] header-hide " header=" " visible={visible} onHide={onhide} draggable={false} resizable={false}>
                <div className="pt-[40px]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]">
                            <div className="text-[#101828] text-[30px] xl:text-[25px] 3xl:text-[1.563vw] font-semibold">
                                Ai Library
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="p-input-icon-left custm-search">
                                <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
                                <InputText
                                    placeholder="Search"
                                    className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[400px] xl:w-[330px] 3xl:w-[17.188vw] custhover xl:h-[2.4vw] h-[43px] 3xl:h-[2.24vw]"
                                />
                            </span>
                            <div className="customDropdown clear-icon closeIcon">
                                <Dropdown
                                    filter
                                    value={topicValue}
                                    onChange={(e) => setTopicvalue(e.target.value)}
                                    options={topics}
                                    optionLabel="name"
                                    placeholder="All"
                                    className="w-full md:w-[165px] xl:w-[170px] 3xl:w-[9.375vw]"
                                    showClear
                                />
                            </div>

                        </div>
                    </div>
                    <div className="mt-[32px] 3xl:mt-[1.667vw]">
                        <ScrollPanel style={{ width: "100%", height: '450px' }}>
                            <FileCommanComponent 
                                aiGeneraedOutput={aiGeneraedOutput}
                                aiGeneraedOutput2={aiGeneraedOutput2}
                                checkBoxShow={true}
                            />
                        </ScrollPanel>
                        <div className="sticky flex justify-end gap-2">
                            <div onClick={onhide} className="3xl:text-[0.733vw] xl:text-[14px] text-[16px] text-[#1570EF] font-normal border border-[#1570EF] bg-[#fff] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] cursor-pointer">
                                Cancel
                            </div>
                            <div className="3xl:text-[0.733vw] xl:text-[14px] text-[16px] text-[#fff] font-normal border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] cursor-pointer">
                                Select
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
