"use client"
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../layouts/pagelayout'
import { InputText } from 'primereact/inputtext'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ClassesCard from '../../../components/classesCard';
import {listOfActiveClassAPI} from '../../actions/activeClasses/index'
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from 'next/link';
import NewClasses from '../../../components/popup/newclasses';
import { getDataFromLocalStorage } from '../../../components/helper/commonFunction';

export default function ClientComponent({userData,error}) {
    const [activeTab, setActiveTab] = useState(2);
    const [loading, setLoading] = useState(false);
    const [newClass, setNewClass] = useState(false);
    const [searchvalue, setSearchValue]= useState('');
    const[classCardData,setClassCardData]=useState(userData);
    const firstRender = useRef(true)
    // let isTeacher = false
    const [isTeacher,setTeacher]=useState(false);


    const getListOfClass = async (search) =>{
        try {
              
            let accessToken=getDataFromLocalStorage("access_token");
            let userInfo = getDataFromLocalStorage('user_data') ? JSON.parse(getDataFromLocalStorage('user_data')) : ''
            if(!accessToken){
                return
            }
            const payload = {
                accessToken: accessToken,
                status: "All",
                searchTxt:search,
                userId: userInfo?.id
            }
            const response = await listOfActiveClassAPI(payload);
            if (response.code == '200') {
                setClassCardData(response?.data?.data);
                setTimeout(() => {
                    setLoading(false);
                  }, 1000);
            } else {
              toast.error(response.message  || "Something Went Wrong");
              setLoading(false)
             
            }
          } catch (error) {
            if(error.message){
                toast.error("No Class Rooms Available");
                setLoading(false)
            }
          }
    }

    const filterCoursesByStatus = (classCardData, status) => {
        return classCardData.filter(course => course.courseState === status);
    }

    const activeCourses = filterCoursesByStatus(classCardData, "ACTIVE");
    const archivedCourses = filterCoursesByStatus(classCardData, "ARCHIVED");

    const searchRef = useRef(null)
    const handleSearch = (value) => {
      if(searchRef.current){
        clearTimeout(searchRef.current)
      }
      searchRef.current = setTimeout(() => getListOfClass(value),400)
      setSearchValue(value)
    }

    useEffect(() => {
        // isTeacher = getDataFromLocalStorage('userRole') == 'teacher' ? true : false;
        let  checkTeacher = getDataFromLocalStorage('userRole') == 'teacher' ? true : false;
        if(checkTeacher){
          setTeacher(true);
        }
        
        if (!searchRef.current) {
            getListOfClass();
            searchRef.current = true;
        }
    }, []);

    return (
        <Layout>
            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                        <Link href={'/manageclass'} className='flex items-center 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center'>
                            {/* <i className='hexatooldouble-arrow pr-3 3xl:text-[0.625vw] 2xl:text-[12px] text-[10px]'></i> */}
                            {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 mr-2 fill-current"
                            >
                                <path d="M7.41 7.41L6 6l-6 6 6 6 1.41-1.41L2.83 12z" />
                            </svg>      */}
                        <i className="pi pi-angle-double-left mr-2" style={{ fontSize: '0.8rem' }}></i>

                            Back  
                        </Link>
                        <div className='text-[#101828] text-[30px] xl:text-[25px] 3xl:text-[1.563vw] font-semibold'>
                            Google Classes
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
                    <div className='flex flex-wrap items-center justify-between gap-2'>
                      

                            <div className='flex items-center'>
                                <div onClick={() => setActiveTab(1)}
                                    className={`${activeTab === 1 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}>
                                    <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                        All
                                    </div>
                                </div>
                                <div onClick={() => setActiveTab(2)}
                                    className={`${activeTab === 2 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}>
                                    <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                        Active Classes
                                    </div>
                                </div>
                                <div onClick={() => setActiveTab(3)}
                                    className={`${activeTab === 3 ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}>
                                    <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                        Archived
                                    </div>
                                </div>
                            </div>
                        
                        <div className='flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                            <div className='customDropdown'>
                                <InputText
                                value={searchvalue}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search"
                                className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[231px] xl:w-[220px] 3xl:w-[12.031vws]"
                            />
                            </div>
                         <button onClick={() => setNewClass(true)} className='flex 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-center items-center'>
                            <i className='hexatoolplus mr-[8px]'></i>
                            New Class
                        </button>
                        </div>
                    </div>

                </div>
                
                <div className='mt-[28px] xl:mt-[26px] 3xl:mt-[1.458vw]'>
                {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div> :
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[38px] xl:gap-[36px] 3xl:gap-[1.979vw]'>
                       {
                        activeTab === 1  ?
                        <ClassesCard 
                            data={classCardData}
                            userData={userData}
                            setLoading={setLoading}
                            onhide={() => setNewClass(false)}
                            getListOfClass={getListOfClass}
                        /> :null
                       }
                       {
                        activeTab === 2  ?
                        <ClassesCard 
                            data={activeCourses}
                            userData={userData}
                            setLoading={setLoading}
                            onhide={() => setNewClass(false)}
                            getListOfClass={getListOfClass}
                        />: null
                       }
                        {
                        activeTab === 3  ?
                        <ClassesCard 
                            data={archivedCourses}
                            userData={userData}
                            setLoading={setLoading}
                            onhide={() => setNewClass(false)}
                            getListOfClass={getListOfClass}
                        />: null
                       }

                    </div>
                }
                </div>
            </div>
            <NewClasses 
                visible={newClass}
                onhide={() => setNewClass(false)}
                getListOfClass={getListOfClass}
                setLoading={setLoading}
            />
        </Layout>
    )
}
