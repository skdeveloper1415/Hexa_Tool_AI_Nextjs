import Link from 'next/link'
import React, { useState,Fragment } from 'react'
import { Menu, Transition } from "@headlessui/react";
import { Checkbox } from "primereact/checkbox";
import Image from 'next/image';

export default function FileCommanComponent({ aiGeneraedOutput, checkBoxShow , aiGeneraedOutput2}) {
    const [checked, setChecked] = useState(false);
    const [childFolder, setChildFolder] = useState(false);
    return (
        <>
            {childFolder === false ? 
            <>
            {/* main folders start */}
            <div>
                <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">
                    AI Generated Outputs
                </div>

                <div className="mt-[20px] 3xl:mt-[1.042vw]">
                    <div className="grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-5 lg:grid-cols-5 3xl:grid-cols-6 gap-[18px] 3xl:gap-[1.042vw]">
                        {aiGeneraedOutput
                            ?.filter(item => item.type == "I")
                            .map(data => {
                                return (
                                    <div className={`${checked === true ? 'border-[#1570EF] shadow-md' : 'border-[#C8CBD0]'} bg-white border rounded-[8px]  xl:rounded-[0.433vw] p-[18px] xl:p-[0.938vw] relative`}>
                                        <div className="flex justify-between">
                                            <Link
                                                href=""
                                                className="cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"
                                            >
                                                <i className="hexatoolstart-outline"></i>
                                            </Link>
                                            <Menu as="div" className='absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]'>
                                                <Menu.Button >
                                                    <i className="hexatoolthree-dots cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"></i>
                                                </Menu.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[160px] border">
                                                        <ul>
                                                            <li
                                                                className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                onClick={() => { handleCopy("http://localhost:3000/library") }}
                                                            >
                                                                Copy URL Link
                                                            </li>
                                                            <li
                                                                className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                onClick={() => setDialogVisible(true)}
                                                            >
                                                                Delete
                                                            </li>

                                                        </ul>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                        <div onClick={() => setChildFolder(true)} className="mt-[15px] 3xl:mt-[0.781vw] text-center cursor-pointer">
                                            <Image
                                                src={`/images/files_icon/${data.image}`}
                                                width={"68"}
                                                height={"60"}
                                                alt="folder Image"
                                                className="m-auto"
                                            />
                                        </div>
                                        <div className="mt-[20px] 3xl:mt-[1.042vw] text-center">
                                            <div className="text-[#101828] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-normal h-[50px] xl:h-[2.604vw] 3xl:h-[50px]">
                                                {data.folderName}
                                            </div>
                                            <div className="font-light  text-[11px] xl:text-[11px] 3xl:text-[0.573vw] text-[#98A2B3] h-[30px] xl:h-[1.563vw] 3xl:h-[30px]">
                                                {data.size}
                                            </div>
                                        </div>
                                        {checkBoxShow &&
                                        <div className="flex justify-center">
                                            <Checkbox
                                                className="CustomCheckBox"
                                                name="pizza"
                                                value="Cheese"
                                                onChange={e => setChecked(e.checked)}
                                                checked={checked}
                                            />
                                        </div>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="mt-[32px] 3xl:mt-[1.667vw] pb-5">
                <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">
                    Recently Created Files
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-5 lg:grid-cols-5 3xl:grid-cols-6 gap-[18px] 3xl:gap-[1.042vw] mt-[20px] 3xl:mt-[1.042vw]">
                    {aiGeneraedOutput
                        ?.filter(item => item.type == "O")
                        .map(data => {
                            return (
                                <div className={`${checked === true ? 'border-[#1570EF] shadow-md' : 'border-[#C8CBD0]'} bg-white border rounded-[8px]  xl:rounded-[0.433vw] p-[18px] xl:p-[0.938vw] relative`}>
                                    <div className="flex justify-between">
                                        <Link
                                            href=""
                                            className="cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"
                                        >
                                            <i className="hexatoolstart-outline"></i>
                                        </Link>
                                        <Menu as="div" className='absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]'>
                                            <Menu.Button >
                                                <i className="hexatoolthree-dots cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"></i>
                                            </Menu.Button>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[160px] border">
                                                    <ul>
                                                        <li
                                                            className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                            onClick={() => { }}
                                                        >
                                                            Copy URL Link
                                                        </li>
                                                        <li
                                                            className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                            onClick={() => setDialogVisible(true)}
                                                        >
                                                            Delete
                                                        </li>

                                                    </ul>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                    <div onClick={() => setChildFolder(true)} className="mt-[15px] 3xl:mt-[0.781vw] text-center cursor-pointer">
                                        <Image
                                            src={`/images/files_icon/${data.image}`}
                                            width={"68"}
                                            height={"60"}
                                            alt="folder Image"
                                            className="m-auto"
                                        />
                                    </div>
                                    <div className="mt-[20px] 3xl:mt-[1.042vw] text-center">
                                        <div className="text-[#101828] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-normal h-[50px] xl:h-[2.604vw] 3xl:h-[50px]">
                                            {data.folderName}
                                        </div>
                                        <div className="font-light  text-[11px] xl:text-[11px] 3xl:text-[0.573vw] text-[#98A2B3] h-[30px] xl:h-[1.563vw] 3xl:h-[30px]">
                                            {data.size}
                                        </div>
                                    </div>
                                    {checkBoxShow &&
                                        <div className="flex justify-center">
                                            <Checkbox
                                                className="CustomCheckBox"
                                                name="pizza"
                                                value="Cheese"
                                                onChange={e => setChecked(e.checked)}
                                                checked={checked}
                                            />
                                        </div>
                                }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* main folders end */}
            </>
            :
            <>
            {/* folders Details start */}
            <div>
                <div className='flex items-center gap-2'>
                <div onClick={() => setChildFolder(false)} className='flex 3xl:text-[0.733vw] xl:text-[14px] text-[16px] text-[#1B55AF] font-normal border border-[#1B55AF]  rounded-full xl:rounded-full 3xl:rounded-full xl:p-[1vw] p-[16px] h-[35px] w-[35px] xl:h-[1.823vw] xl:w-[1.823vw] 3xl:h-[1.823vw] 3xl:w-[1.823vw] justify-center items-center cursor-pointer mr-3'>
               <i className='pi pi-arrow-left '></i>
                  
                </div>
                    <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold flex gap-2">
                        AI Generated Outputs    <Image
                    width="20"
                    height="20"
                    className="rotate-[180deg]"
                    src="/images/left-double-arrow.svg"
                    alt="Arrow"
                /> Images
                    </div>
                </div>

                <div className="mt-[20px] 3xl:mt-[1.042vw]">
                    <div className="grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-5 lg:grid-cols-5 3xl:grid-cols-6 gap-[18px] 3xl:gap-[1.042vw]">
                        {aiGeneraedOutput2
                            ?.filter(item => item.type == "O")
                            .map(data => {
                                return (
                                    <div className={`${checked === true ? 'border-[#1570EF] shadow-md' : 'border-[#C8CBD0]'} bg-white border rounded-[8px]  xl:rounded-[0.433vw] p-[18px] xl:p-[0.938vw] relative`}>
                                        <div className="flex justify-between">
                                            <Link
                                                href=""
                                                className="cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"
                                            >
                                                <i className="hexatoolstart-outline"></i>
                                            </Link>
                                            <Menu as="div" className='absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]'>
                                                <Menu.Button >
                                                    <i className="hexatoolthree-dots cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"></i>
                                                </Menu.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[160px] border">
                                                        <ul>
                                                            <li
                                                                className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                onClick={() => { handleCopy("http://localhost:3000/library") }}
                                                            >
                                                                Copy URL Link
                                                            </li>
                                                            <li
                                                                className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                onClick={() => setDialogVisible(true)}
                                                            >
                                                                Delete
                                                            </li>

                                                        </ul>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                        <div className="mt-[15px] 3xl:mt-[0.781vw] text-center cursor-pointer">
                                            <Image
                                                src={`/images/files_icon/${data.image}`}
                                                width={"68"}
                                                height={"60"}
                                                alt="folder Image"
                                                className="m-auto"
                                            />
                                        </div>
                                        <div className="mt-[20px] 3xl:mt-[1.042vw] text-center">
                                            <div className="text-[#101828] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-normal h-[50px] xl:h-[2.604vw] 3xl:h-[50px]">
                                                {data.folderName}
                                            </div>
                                            <div className="font-light  text-[11px] xl:text-[11px] 3xl:text-[0.573vw] text-[#98A2B3] h-[30px] xl:h-[1.563vw] 3xl:h-[30px]">
                                                {data.size}
                                            </div>
                                        </div>
                                        {checkBoxShow &&
                                        <div className="flex justify-center">
                                            <Checkbox
                                                className="CustomCheckBox"
                                                name="pizza"
                                                value="Cheese"
                                                onChange={e => setChecked(e.checked)}
                                                checked={checked}
                                            />
                                        </div>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            
            {/* folders Details end */}
            </>
            }
        </>
    )
}
