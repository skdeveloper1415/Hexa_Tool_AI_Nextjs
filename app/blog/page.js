"use client"
import Image from "next/image";
import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { InputText } from 'primereact/inputtext'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Avatar } from 'primereact/avatar';
import Layout from '../../layouts/pagelayout';
import { AvatarGroup } from 'primereact/avatargroup';
import { Dropdown } from 'primereact/dropdown';
import Blogdetails from "../../components/popup/blogdetails";
import { Paginator } from 'primereact/paginator';
import { BreadCrumb } from "primereact/breadcrumb";
import { OverlayPanel } from 'primereact/overlaypanel';
import QRcode from "../../components/popup/qrcode";
import RemovePost from "../../components/popup/removepost";
export default function Page() {
    const [newClass, setNewClass] = useState(false);
    const [topicValue, setTopicvalue] = useState(null);
    const [visible, setVisible] = useState(false);
    const [removepost, setRemovepost] = useState(false);
    const router = useRouter();

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const op = useRef(null);
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const handleRedirect=()=>{
        router.push('/blog/blogdescription')
    }
    const topics = [
        { name: 'All', code: 'NY' },
        { name: 'Approved', code: 'RM' },
        { name: 'Approval Pending', code: 'LDN' }
    ];
    const topics2 = [
        { name: 'All', code: 'NY' },
        { name: 'A - Z', code: 'RM' },
        { name: 'Z - A', code: 'LDN' },
        { name: 'Oldest', code: 'NY' },
        { name: 'Newest', code: 'NY' }
    ];
    // const items = [
    //     { label: "Blog"},
    //   ];
    // const home = { label: "Home", url: "/" };
    return (
        <Layout>
            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>
            {/* <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        /> */}
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                        <div  className='text-[#101828] text-[30px] xl:text-[25px] 3xl:text-[1.563vw] font-semibold'>
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
                    <div className="flex gap-3">
                        <div className="text-[#101828] text-[20px] xl:text-20px] 3xl:text-[1.042vw] font-semibold" >Recent Blogs</div>
                        <i className="hexatoolfile-edit cursor-pointer text-[#1B55AF] text-[24px]" onClick={() => setNewClass(true)}></i>
                    </div>
                    <div className="flex items-center gap-3">
                        <div>
                            <span className="p-input-icon-left custm-search">
                                <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
                                <InputText
                                    placeholder=" Blog Search...."
                                    className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[265px] xl:w-[265px] 3xl:w-[14.063vw] custhover"
                                />
                            </span>
                        </div>
                        <div className='customDropdown clear-icon closeIcon'>
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
                        <div className='customDropdown clear-icon closeIcon'>
                            <Dropdown
                                filter
                                value={topicValue}
                                onChange={(e) => setTopicvalue(e.target.value)}
                                options={topics2}
                                optionLabel="name"
                                placeholder="Sort by Date"
                                className="w-full md:w-[165px] xl:w-[170px] 3xl:w-[9.375vw]"
                                showClear
                            />
                        </div>
                    </div>
                </div>


                <div className="pt-[38px] 3xl:pt-[1.979vw]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-[38px] 3xl:gap-[1.979vw]">
                        {/* <Link href="/blog/blogdescription"> */}
                            <div  className="cursor-pointer bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-[20px] px-[20px] 3xl:py-[1.042vw] 3xl:px-[1.042vw]">
                                <div className="flex justify-between gap-2">
                                    <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                        <div className="flex gap-3">
                                            <div className="bg-[#FFF2E5] w-[48px] h-[48px] xl:w-[52px] xl:h-[52px] 3xl:w-[2.708vw] 3xl:h-[2.708vw] rounded-full flex justify-center items-center">
                                                {/* <i className="hexatoolright-tick-circlue-ouline text-[#1B55AF] font-medium text-[35px]"></i> */}
                                                <Image
                                                    src="/images/student-profile/4.png"
                                                    alt="logo"
                                                    width={48}
                                                    height={48}
                                                />
                                            </div>
                                            <div className="">
                                                <h6 className="text-[#101828] mb-[5px] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                                                    Amiley Smith <span className="text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal">5 hrs ago</span>
                                                </h6>
                                                <div className="flex gap-3 xl:gap-4">
                                                    <div className="text-[#1B55AF] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">
                                                        me
                                                    </div>
                                                    <div className="flex justify-between items-center gap-2">
                                                        <i className="hexatooleye text-[#98A2B3] font-medium text-[12px] xl:text-[14px] 3xl:text-[0.625vw]"></i>
                                                        <p className="text-[#98A2B3] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">All</p>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={(e) =>{e.stopPropagation(), op.current.toggle(e)}} className=" hexatoolthree-dots mt-[5px] cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center"></button>
                                    </div>
                                    <OverlayPanel className='custoverlay shadow-lg' ref={op}>
                               <ul className='space-y-2 text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.833vw] font-medium'>

                                    <li   className='cursor-pointer ' onClick={() => setVisible(true)}>Post QR Code</li>
                                    <li className='cursor-pointer' onClick={() => setRemovepost(true)}>Remove Post</li>
                               </ul>
                            </OverlayPanel>
                                </div>
                                <div onClick={handleRedirect} className="text-[#101828] text-[18px] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">Even Numbers</div>
                                <div className="flex justify-between gap-2 items-center pb-[40px] 3xl:pb-[2.083vw]">
                                    <div className="bg-[#F9FAFB] border border-[#C8CBD0] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] rounded-md 3xl:rounded-[0.313vw] py-[4px] px-[8px] 3xl:py-[0.208vw] xl:py-[6px] xl:px[10px] 3xl:px-[0.417vw]">Post</div>
                                    <div className="card flex justify-content-center">
                                        <AvatarGroup>
                                            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="normal" width="30" height="30" shape="circle" />
                                            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="normal" width="30" height="30" shape="circle" />
                                            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="normal" width="30" height="30" shape="circle" />
                                        </AvatarGroup>
                                    </div>
                                </div>
                                <div className="flex justify-between border-t border-[#D4D4D4] pt-[10px] 3xl:pt-[0.521vw]">
                                    <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                        <i className="hexatoolthumb-fill text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                        <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">24</div>
                                    </div>
                                    <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">2 Comments</div>
                                </div>
                            </div>
                        {/* </Link> */}

                        <div className="bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-[20px] px-[20px] 3xl:py-[1.042vw] 3xl:px-[1.042vw]">
                            <div className="flex justify-between gap-2">
                                <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                    <div className="flex gap-3">
                                        <div className="bg-[#FFF2E5] w-[48px] h-[48px] xl:w-[52px] xl:h-[52px] 3xl:w-[2.708vw] 3xl:h-[2.708vw] rounded-full flex justify-center items-center">
                                            {/* <i className="hexatoolright-tick-circlue-ouline text-[#1B55AF] font-medium text-[35px]"></i> */}
                                            <Image
                                                src="/images/student-profile/3.png"
                                                alt="logo"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="">
                                            <h6 className="text-[#101828] mb-[5px] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                                                Cody Fisher <span className="text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal">5 hrs ago</span>
                                            </h6>
                                            <div className="flex gap-3 xl:gap-4">
                                                <div className="text-[#1B55AF] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">
                                                    Student
                                                </div>
                                                <div className="flex justify-between items-center gap-2">
                                                    <i className="hexatooleye text-[#98A2B3] font-medium text-[12px] xl:text-[14px] 3xl:text-[0.625vw]"></i>
                                                    <p className="text-[#98A2B3] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">All</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <i className="hexatoolthree-dots mt-[5px] cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center"></i>
                                </div>
                            </div>
                            <div className="text-[#101828] text-[18px] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">My Favorite Number</div>
                            <div className="flex justify-between gap-2 items-center pb-[40px] 3xl:pb-[2.083vw]">
                                <div className="flex items-center gap-[15px] xl:gap-[18px] 3xl:gap-[0.781vw]">
                                    <div className="bg-[#F9FAFB] border border-[#C8CBD0] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] rounded-md 3xl:rounded-[0.313vw] py-[4px] px-[8px] 3xl:py-[0.208vw] xl:py-[6px] xl:px[10px] 3xl:px-[0.417vw]">Post</div>
                                    <div className="text-[#039855] font-medium text-[14px] xl:text-[16px] 3xl:text-[0.729vw]">
                                        <li>Approved</li>
                                    </div>
                                </div>
                                <div className="card flex justify-content-center">
                                    <AvatarGroup>
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="normal" width="30" height="30" shape="circle" />
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-[#D4D4D4] pt-[10px] 3xl:pt-[0.521vw]">
                                <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                    <i className="hexatoolthumb-fill text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                    <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">24</div>
                                </div>
                                <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">2 Comments</div>
                            </div>
                        </div>

                        <div className="bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-[20px] px-[20px] 3xl:py-[1.042vw] 3xl:px-[1.042vw]">
                            <div className="flex justify-between gap-2">
                                <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                    <div className="flex gap-3">
                                        <div className="bg-[#FFF2E5] w-[48px] h-[48px] xl:w-[52px] xl:h-[52px] 3xl:w-[2.708vw] 3xl:h-[2.708vw] rounded-full flex justify-center items-center">
                                            {/* <i className="hexatoolright-tick-circlue-ouline text-[#1B55AF] font-medium text-[35px]"></i> */}
                                            <Image
                                                src="/images/student-profile/2.png"
                                                alt="logo"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="">
                                            <h6 className="text-[#101828] mb-[5px] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                                                Amiley Smith <span className="text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal">5 hrs ago</span>
                                            </h6>
                                            <div className="flex gap-3 xl:gap-4">
                                                <div className="text-[#1B55AF] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">
                                                    me
                                                </div>
                                                <div className="flex justify-between items-center gap-2">
                                                    <i className="hexatooleye text-[#98A2B3] font-medium text-[12px] xl:text-[14px] 3xl:text-[0.625vw]"></i>
                                                    <p className="text-[#98A2B3] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">All</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <i className="hexatoolthree-dots mt-[5px] cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center"></i>
                                </div>
                            </div>
                            <div className="text-[#101828] text-[18px] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">Addition and Subtraction</div>
                            <div className="flex justify-between gap-2 items-center pb-[40px] 3xl:pb-[2.083vw]">
                                <div className="bg-[#F9FAFB] border border-[#C8CBD0] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] rounded-md 3xl:rounded-[0.313vw] py-[4px] px-[8px] 3xl:py-[0.208vw] xl:py-[6px] xl:px[10px] 3xl:px-[0.417vw]">Post</div>
                                <div className="card flex justify-content-center">
                                    <AvatarGroup>
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="normal" width="30" height="30" shape="circle" />
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-[#D4D4D4] pt-[10px] 3xl:pt-[0.521vw]">
                                <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                    <i className="hexatoolthumb-fill text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                    <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">24</div>
                                </div>
                                <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">2 Comments</div>
                            </div>
                        </div>

                        <div className="bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-[20px] px-[20px] 3xl:py-[1.042vw] 3xl:px-[1.042vw]">
                            <div className="flex justify-between gap-2">
                                <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                    <div className="flex gap-3">
                                        <div className="bg-[#FFF2E5] w-[48px] h-[48px] xl:w-[52px] xl:h-[52px] 3xl:w-[2.708vw] 3xl:h-[2.708vw] rounded-full flex justify-center items-center">
                                            {/* <i className="hexatoolright-tick-circlue-ouline text-[#1B55AF] font-medium text-[35px]"></i> */}
                                            <Image
                                                src="/images/student-profile/1.png"
                                                alt="logo"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="">
                                            <h6 className="text-[#101828] mb-[5px] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                                                Arlene McCoy <span className="text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal">5 hrs ago</span>
                                            </h6>
                                            <div className="flex gap-3 xl:gap-4">
                                                <div className="text-[#1B55AF] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">
                                                    Student
                                                </div>
                                                <div className="flex justify-between items-center gap-2">
                                                    <i className="hexatooleye text-[#98A2B3] font-medium text-[12px] xl:text-[14px] 3xl:text-[0.625vw]"></i>
                                                    <p className="text-[#98A2B3] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">All</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <i className="hexatoolthree-dots mt-[5px] cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center"></i>
                                </div>
                            </div>
                            <div className="text-[#101828] text-[18px] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">Basic Shapes</div>
                            <div className="flex justify-between gap-2 items-center pb-[40px] 3xl:pb-[2.083vw]">
                                <div className="bg-[#F9FAFB] border border-[#C8CBD0] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] rounded-md 3xl:rounded-[0.313vw] py-[4px] px-[8px] 3xl:py-[0.208vw] xl:py-[6px] xl:px[10px] 3xl:px-[0.417vw]">Post</div>
                                <div className="card flex justify-content-center">
                                    <AvatarGroup>
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="normal" width="30" height="30" shape="circle" />
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-[#D4D4D4] pt-[10px] 3xl:pt-[0.521vw]">
                                <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                    <i className="hexatoolthumb-fill text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                    <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">24</div>
                                </div>
                                <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">2 Comments</div>
                            </div>
                        </div>

                        <div className="bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-[20px] px-[20px] 3xl:py-[1.042vw] 3xl:px-[1.042vw]">
                            <div className="flex justify-between gap-2">
                                <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                    <div className="flex gap-3">
                                        <div className="bg-[#FFF2E5] w-[48px] h-[48px] xl:w-[52px] xl:h-[52px] 3xl:w-[2.708vw] 3xl:h-[2.708vw] rounded-full flex justify-center items-center">
                                            {/* <i className="hexatoolright-tick-circlue-ouline text-[#1B55AF] font-medium text-[35px]"></i> */}
                                            <Image
                                                src="/images/student-profile/6.png"
                                                alt="logo"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="">
                                            <h6 className="text-[#101828] mb-[5px] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                                                Amiley Smith <span className="text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal">5 hrs ago</span>
                                            </h6>
                                            <div className="flex gap-3 xl:gap-4">
                                                <div className="text-[#1B55AF] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">
                                                    me
                                                </div>
                                                <div className="flex justify-between items-center gap-2">
                                                    <i className="hexatooleye text-[#98A2B3] font-medium text-[12px] xl:text-[14px] 3xl:text-[0.625vw]"></i>
                                                    <p className="text-[#98A2B3] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">All</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <i className="hexatoolthree-dots mt-[5px] cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center"></i>
                                </div>
                            </div>
                            <div className="text-[#101828] text-[18px] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">Odd Numbers</div>
                            <div className="flex justify-between gap-2 items-center pb-[40px] 3xl:pb-[2.083vw]">
                                <div className="bg-[#F9FAFB] border border-[#C8CBD0] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] rounded-md 3xl:rounded-[0.313vw] py-[4px] px-[8px] 3xl:py-[0.208vw] xl:py-[6px] xl:px[10px] 3xl:px-[0.417vw]">Post</div>
                                <div className="card flex justify-content-center">
                                    <AvatarGroup>
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="normal" width="30" height="30" shape="circle" />
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-[#D4D4D4] pt-[10px] 3xl:pt-[0.521vw]">
                                <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                    <i className="hexatoolthumb-fill text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                    <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">24</div>
                                </div>
                                <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">2 Comments</div>
                            </div>
                        </div>

                        <div className="bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] py-[20px] px-[20px] 3xl:py-[1.042vw] 3xl:px-[1.042vw]">
                            <div className="flex justify-between gap-2">
                                <div className="flex gap-[13px] x:gap-[13px] 3xl:gap-[0.677vw] items-center">
                                    <div className="flex gap-3">
                                        <div className="bg-[#FFF2E5] w-[48px] h-[48px] xl:w-[52px] xl:h-[52px] 3xl:w-[2.708vw] 3xl:h-[2.708vw] rounded-full flex justify-center items-center">
                                            {/* <i className="hexatoolright-tick-circlue-ouline text-[#1B55AF] font-medium text-[35px]"></i> */}
                                            <Image
                                                src="/images/student-profile/8.png"
                                                alt="logo"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="">
                                            <h6 className="text-[#101828] mb-[5px] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                                                Brooklyn Simmons <span className="text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal">5 hrs ago</span>
                                            </h6>
                                            <div className="flex gap-3 xl:gap-4">
                                                <div className="text-[#1B55AF] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">
                                                    Student
                                                </div>
                                                <div className="flex justify-between items-center gap-2">
                                                    <i className="hexatooleye text-[#98A2B3] font-medium text-[12px] xl:text-[14px] 3xl:text-[0.625vw]"></i>
                                                    <p className="text-[#98A2B3] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] font-normal">All</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <i className="hexatoolthree-dots mt-[5px] cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center"></i>
                                </div>
                            </div>
                            <div className="text-[#101828] text-[18px] py-[20px] xl:py-[20x] 3xl:py-[1.042vw] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">My Favorite Even Number</div>
                            <div className="flex justify-between gap-2 items-center pb-[40px] 3xl:pb-[2.083vw]">
                                <div className="flex items-center gap-[15px] xl:gap-[18px] 3xl:gap-[0.781vw]">
                                    <div className="bg-[#F9FAFB] border border-[#C8CBD0] text-[12px] xl:text-[14px] 3xl:text-[0.625vw] rounded-md 3xl:rounded-[0.313vw] py-[4px] px-[8px] 3xl:py-[0.208vw] xl:py-[6px] xl:px[10px] 3xl:px-[0.417vw]">Post</div>
                                    <div className="text-[#FF4537] font-medium text-[14px] xl:text-[16px] 3xl:text-[0.729vw]">
                                        <li>Approval Pending</li>
                                    </div>
                                </div>
                                <div className="card flex justify-content-center">
                                    <AvatarGroup>
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png" size="normal" width="30" height="30" shape="circle" />
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png" size="normal" width="30" height="30" shape="circle" />
                                    </AvatarGroup>
                                </div>
                            </div>
                            <div className="flex justify-between border-t border-[#D4D4D4] pt-[10px] 3xl:pt-[0.521vw]">
                                <div className="flex items-center gap-1 xl:gap-2 3xl:gap-2">
                                    <i className="hexatoolthumb-fill text-[#1B55AF] font-medium text-[16px] 3xl:text-[0.833vw]"></i>
                                    <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">24</div>
                                </div>
                                <div className="text-[#1B55AF] font-medium text-[12px] 3xl:text-[0.625vw]">2 Comments</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="card custTabview pt-[20px] 3xl:pt-[1.042vw]">
                    <Paginator first={first} rows={rows} totalRecords={30} onPageChange={onPageChange} />
                </div>
            </div>



            <Blogdetails
                visible={newClass}
                setNewClass={setNewClass}
                onhide={() => setNewClass(false)}
            />
            <QRcode
                visible={visible}
                setVisible={setVisible}

            />
            <RemovePost
                visible={removepost}
                setRemovepost={setRemovepost}

            />
        </Layout>
    )
}
