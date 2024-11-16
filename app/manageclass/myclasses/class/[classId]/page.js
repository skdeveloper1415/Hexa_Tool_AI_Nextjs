"use client"
import React, { useState, useEffect } from 'react'
import Layout from '../../../../../layouts/pagelayout';
import { InputText } from 'primereact/inputtext'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE } from '../../../../../components/helper/enum';
import { Dropdown } from 'primereact/dropdown';
import ClassWork from '../classwork/classwork';
import Home from '../home/page';
import Post from '../post/page';
import People from '../people/page';
import Grades from '../grades/page';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation';
import { setDataIntoLocalStorage } from '../../../../../components/helper/commonFunction';

export default function Page() {
    const [activeTab, setActiveTab] = useState(null);
    const [showBack, setShowBack] = useState(true);
    const router = useRouter()
    const pathname = usePathname();
    const parts = pathname.split('/');
    const classId = parts[parts.length - 1];
    const [classIdValue,setClassIdValue] = useState(classId);
    const [isCreatePost,setCreatePost] = useState(false);

    const [searchParams] = useSearchParams();
    const Heading = searchParams[1];
    const searchParams2 = new URLSearchParams(window.location.search);
    const userRole = searchParams2.get('userRole');
    const [showStdWork, setShowStdWork] = useState(false);
    const [studentData, setStudentData] = useState();
    localStorage.removeItem('userRole');
    setDataIntoLocalStorage('userRole',userRole);

    useEffect(()=>{
        if (activeTab !== 3) {
        setShowStdWork(false);
        setStudentData()     
        }
    },[activeTab])
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const CurrentTabIndex = query.get("CurrentTabIndex") || 1;
        setActiveTab(parseInt(CurrentTabIndex));
      }, []);

    const handleTabChange = (index) => {
        const query = new URLSearchParams(window.location.search);
        query.set('CurrentTabIndex', index);
        router.push(`${pathname}?${query.toString()}`);
        setActiveTab(index);
    };

    const setShowStudentWork = (value)=>{
        setShowStdWork(value)
    }

    const setDataToSend =(value)=>{
        setStudentData(value)
    }


    return (
        <Layout>
            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                        {showBack == true ?
                        	<button className='flex items-center 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.417vw] py-[8px] justify-center'
                            onClick={()=>{setShowBack(true); router.push('/manageclass/myclasses')}}
                           >
                        		{/* <i className='hexatooldouble-arrow pr-3 3xl:text-[0.625vw] 2xl:text-[12px] text-[10px]'></i> */}
                                {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4 mr-2 fill-current"
                                >
                                    <path d="M7.41 7.41L6 6l-6 6 6 6 1.41-1.41L2.83 12z" />
                                </svg> */}
                        <i className="pi pi-angle-double-left mr-2" style={{ fontSize: '0.8rem' }}></i>
                        		Back
                        	</button>
                        	: ''
                        }
                        <div className='text-[#101828] text-[30px] xl:text-[25px] 3xl:text-[1.563vw] font-semibold'>
                            {Heading}
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
                <div className='mt-[36px] xl:mt-[34px] 3xl:mt-[1.875vw]'>
                    <div className='flex flex-wrap items-center justify-between gap-2 mb-[24px] xl:mb-[1.771vw]'>
                        <div className='flex items-center'>
                            <div onClick={() => handleTabChange(1)}
                                className={`${activeTab === 1 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.421vw] cursor-pointer`}>
                                <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                    Home
                                </div>
                            </div>
                            <div onClick={() => handleTabChange(2)}
                                className={`${activeTab === 2 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.421vw] cursor-pointer`}>
                                <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                    Post
                                </div>
                            </div>
                            <div onClick={() => handleTabChange(3)}
                                className={`${activeTab === 3 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.421vw] cursor-pointer`}>
                                <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                    Classwork
                                </div>
                            </div>
                            <div onClick={() => handleTabChange(4)}
                                className={`${activeTab === 4 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.421vw] cursor-pointer`}>
                                <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                    People
                                </div>
                            </div>
                            <div onClick={() => handleTabChange(5)}
                                className={`${activeTab === 5 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.421vw] cursor-pointer`}>
                                <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                    Grades
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        {activeTab === 1 && <>
                            <Home classIdValue={classIdValue} setShowBack={setShowBack} setActiveTab={setActiveTab} setCreatePost={setCreatePost} Heading={Heading} setShowStudentWork={setShowStudentWork} setDataToSend={setDataToSend}/>
                        </>}
                        {activeTab === 2 && <>
                            <Post setShowBack={setShowBack} classIdValue={classIdValue} setCreatePost={setCreatePost} isCreatePost={isCreatePost}/>
                        </>}
                        {activeTab === 3 && <>
                            <ClassWork setShowBack={setShowBack} setActiveTab={setActiveTab} classIdValue={classIdValue} showStdWork={showStdWork} studentData={studentData}/>
                        </>}
                        {activeTab === 4 && <>
                            <People classIdValue={classIdValue} setShowBack={setShowBack} />
                        </>}
                        {activeTab === 5 && <>
                            <Grades classIdValue={classIdValue} setShowBack={setShowBack}/>
                        </>}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
