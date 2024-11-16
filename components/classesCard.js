"use client";
import React, { useState, Fragment } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'primeicons/primeicons.css';
import { ArchivedClass } from '../app/actions/archivedApi';
import { toast } from 'react-toastify';
import { NoDataMsg } from '../app/common/NoDatamsg';
import { Dialog } from 'primereact/dialog';
import { getDataFromLocalStorage } from './helper/commonFunction';
import { Menu, Transition } from "@headlessui/react";
import NewClasses from './popup/newclasses';
function ClassesCard(props) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [courseid, setCourseId] = useState(null)
  const [status, setStatus] = useState(null);
  const [editClass, setEditClass] = useState(false);
  const [editData, setEditData] = useState({});
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return `${day}${daySuffix} ${month}  ${year}, ${time}`;
  }


  const imgArr = [
    {
      id: 1,
      src: "/images/classroom/Classroom 1.jpg"
    },
    {
      id: 2,
      src: "/images/classroom/Classrom 2.jpg"
    },
    {
      id: 3,
      src: "/images/classroom/Classroom 3.jpg"
    },
    {
      id: 4,
      src: "/images/classroom/Classroom 4.jpg"
    },
    {
      id: 5,
      src: "/images/classroom/Classroom 5.jpg"
    },
  ]




  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  const moment = require('moment');
  function generateYearRangeFromDate(creationTime) {
    const parsedDate = moment(creationTime);
    const month = parsedDate.month() + 1;
    const year = parsedDate.year();

    let responseYear;

    if (month > 6) {
      responseYear = `${year} - ${year + 1}`;
    } else {
      responseYear = `${year - 1} - ${year}`;
    }
    return responseYear;
  }

  const ArchieveClass = async (id, status) => {
    try {
      props.setLoading(true)
      let accessToken = getDataFromLocalStorage("access_token");
      if (!accessToken) {
        return
      }
      let payload
      if (status === "ACTIVE") {
        payload = {
          accessToken: accessToken,
          courseId: id,
          courseState: "Archieved"
        }
      } else {
        payload = {
          accessToken: accessToken,
          courseId: id,
          courseState: "Active"
        }
      }

      const response = await ArchivedClass(payload);
      if (response.code == '200') {
        if (response?.data?.data?.courseState == "ACTIVE") {
          toast.success("Class restored successfully.")
        } else if (response?.data?.data?.courseState == "ARCHIVED") {
          toast.success("Class archived successfully.")
        }
        props.getListOfClass()
        props.onhide()


      }
      else if (response.code == 500) {
        toast.error(response.message || 'Something Went Wrong')
        props.setLoading(false);
      }
      else {
        toast.error(response.error || 'Something Went Wrong')
        props.setLoading(false);
      }

    } catch (error) {
      if (error.message) {
        props.setLoading(false);
        toast.error("No Class Rooms Available");
      }
    }
  }

  const accept = () => {
    ArchieveClass(courseid, status);
  }

  const HeaderData = () => {
    return (
      <div className="flex">
        Confirmation
      </div>
    )
  }

  const footerContent = (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
      <button onClick={() => setDialogVisible(false)} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>

      <button onClick={accept} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  );

  const handelClick = (id, status) => {
    setCourseId(id)
    setStatus(status)
    setDialogVisible(true)
  }
const handleClassEdit  = async(value)=>{
  setEditClass(true)
  setEditData(value)
}

const copyToClipboard = (value) => {
  navigator.clipboard.writeText(value?.alternateLink).then(
    () => {
      console.log('Link copied to clipboard successfully!');
      toast.success('Link copied successfully!')
      // You can also show a success message to the user here
    },
    (err) => {
      console.error('Failed to copy the link: ', err);
      toast.error("Failed to copy the link");
      // You can show an error message to the user here
    }
  );
};
  return (
    <>
      {
        props?.data?.length > 0 ? (<>
          {props?.data?.map((elm, index) => {
            // const imgIndex = index % imgArr.length;
            // const imgObject = imgArr[imgIndex];
            let percentage;
            if (elm.studentCount + elm.invitedCount === 0) {
              percentage = 0;
            }
            else if (elm.studentCount === 0) {
              percentage = 0;
            }
            else {
              percentage = ((elm.invitedCount / (elm.studentCount + elm.invitedCount))).toFixed(2);
            }
            let imgObject;
            if (index < imgArr.length) {
              imgObject = imgArr[index];
            } else {
              const randomIndex = Math.floor(Math.random() * imgArr.length);
              imgObject = imgArr[randomIndex];
            }

            return (
              <div key={index} className='border border-[#C8CBD0] rounded-[10px] 3xl:rounded-[0.521vw]  bg-white'>
                <div className='relative'>
                  {elm.userRole == 'teacher' && <>
                    {
                      elm.courseState == "ACTIVE" ?
                      <Menu as="div" className="absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]">
                      <Menu.Button >
                        <i
                          className="hexatoolthree-dots cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#000000] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center">
                        </i>
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
                        <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                          <ul>
                            <li
                              className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                              onClick={() => {copyToClipboard(elm) }}
                            >
                              Copy Invitation Link
                            </li>
                            <li
                              className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                              onClick={() => {handleClassEdit(elm)}}
                            >
                              Edit
                            </li>
                            <li
                              className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                              onClick={() => {handelClick(elm.id, elm.courseState) }}
                            >
                              Archive
                            </li>
                          </ul>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                        // <div onClick={() => handelClick(elm.id, elm.courseState)} className='absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw] cursor-pointer'>
                        //   <div className='h-[36px] xl:h-[34px] 3xl:h-[1.875vw] w-[36px] xl:w-[34px] 3xl:w-[1.875vw] rounded-full bg-white flex items-center justify-center'>
                        //     {/* <i className='pi pi-trash text-[#98A2B3] text-[20px] xl:text-[18px] 3xl:text-[0.9vw]'></i> */}
                        //     <Image
                        //       width={20}
                        //       height={20}
                        //       src="/images/archive.png"

                        //       alt="Math"
                        //     />
                         
                        //   </div>
                        // </div>

                        :
                        // <div onClick={() => handelClick(elm.id, elm.courseState)} className='absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw] cursor-pointer'>
                        //   <div className='h-[36px] xl:h-[34px] 3xl:h-[1.875vw] w-[36px] xl:w-[34px] 3xl:w-[1.875vw] rounded-full bg-white flex items-center justify-center'>
                        //     {/* <i className='pi pi-undo text-[#98A2B3] text-[20px] xl:text-[18px] 3xl:text-[0.9vw]'></i> */}
                        //     <Image
                        //       width={20}
                        //       height={20}
                        //       src="/images/restore.svg"

                        //       alt="Math"
                        //     />
                        //   </div>
                        // </div>
                        <Menu as="div" className="absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]">
                        <Menu.Button >
                          <i
                            className="hexatoolthree-dots cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#000000] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center">
                          </i>
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
                          <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                            <ul>
                              {/* <li
                                className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                onClick={() => { }}
                              >
                                Copy Invitation Link
                              </li> */}
                              {/* <li
                                className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                onClick={() => {handleClassEdit(elm)}}
                              >
                                Edit
                              </li> */}
                              <li
                                className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                onClick={() => {handelClick(elm.id, elm.courseState) }}
                              >
                               Restore
                              </li>
                            </ul>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    }
                  </>}
                  <Image
                    width={400}
                    height={216}
                    src={imgObject?.src}
                    // src="/images/classroom/math.svg"
                    className='rounded-t-[10px] 3xl:rounded-t-[0.521vw] w-full h-[216px] xl:h-[200px] 3xl:h-[11.25vw] object-cover'
                    alt="Math"
                  />
                  <div className='absolute bottom-[17px] left-[17px] 3xl:bottom-[0.885vw] 3xl:left-[0.885vw]'>
                    <div className='flex items-center gap-2 bg-[#FFFAEB] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw] p-[4px] pr-[10px] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-medium'>
                      <div className='text-[#fff] bg-[#1570EF] px-[8px] py-[2px] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw]'>
                        Created On
                      </div>
                      <div className='text-[#1570EF] inline-block align-middle'>
                        {formatDate(elm.creationTime)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='py-[15px] xl:py-[13px] 3xl:py-[0.781vw] px-[20px] xl:px-[20px] 3xl:px-[1.042vw]'>
                  <div className='flex items-center justify-between gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw]'>
                    <div className='text-[#101828] font-semibold text-[20px] xl:text-[18px] 3xl:text-[1.042vw]'>
                      {elm.name}
                    </div>
                    <div className='inner-box'>
                    <div className='text-[#fff] text-center bg-[#1570EF] w-[80px] font-medium text-[12px] xl:text-[11px] 3xl:text-[0.625vw] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw] py-[3px] px-[8px] inline-block align-middle'>
                      {elm.descriptionHeading}
                    </div>
                    <div className='text-[#344054] bg-[#F2F4F7] font-medium text-[12px] xl:text-[11px] 3xl:text-[0.625vw] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw] py-[3px] px-[8px] inline-block align-middle'>
                      {/* 2023 - 2024 */}
                      {generateYearRangeFromDate(elm.creationTime)}
                    </div>
                    </div>

                  </div>

                </div>
                <div className='py-[10px] xl:py-[9px] 3xl:py-[0.521vw] px-[20px] xl:px-[20px] 3xl:px-[1.042vw] pb-[20px] xl:pb-[18px] 3xl:pb-[1.042vw]'>
                  <div className='flex items-center justify-between gap-1'>
                    <div className='flex items-center gap-[20px] xl:gap-[20px] 3xl:gap-[1.042vw]'>
                      <div className='w-[50px] h-[50px] 3xl:w-[2.604vw] 3xl:h-[2.604vw]'>
                        <CircularProgressbar
                          value={percentage}
                          text={`${percentage}%`}
                          styles={buildStyles({
                            textSize: '22px',
                            textColor: '#101828',
                            trailColor: '#F2F4F7',
                            pathColor: `#1570EF`,

                          })}
                        />
                      </div>
                      <div>
                        <div className='text-[#101828] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal'><span className='text-[24px] xl:text-[22px] 3xl:text-[1.25vw] font-medium'>{elm.studentCount}</span></div>
                        <div className='text-[#667085] text-[14px] xl:text-[12px] 3xl:text-[0.729vw]'>Students</div>
                      </div>
                    </div>
                    {/* <Link href={'/manageclass/myclasses/class'} className='3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[0.729vw] px-[14px] lg:px-[12px] 3xl:py-[0.417vw] xl:py-[7px] py-[8px]'>
                                    Open
                                </Link> */}
                    <Link onClick={() => localStorage.setItem('imageData', JSON.stringify(imgObject?.src))} href={`/manageclass/myclasses/class/${elm.id}?Heading=${encodeURIComponent(elm.name)}&userRole=${encodeURIComponent(elm.userRole)}`} className='3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[0.729vw] px-[14px] lg:px-[12px] 3xl:py-[0.417vw] xl:py-[7px] py-[8px]'>
                      Open
                    </Link>

                  </div>

                </div>
              </div>
            )
          })}
        </>) : (
          <div className="col-span-3 justify-center align-center"><NoDataMsg></NoDataMsg></div>
        )
      }
      <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }} onHide={() => setDialogVisible(false)} className='ConfirmDialog'>
        {status === "ACTIVE" ?
          <p className="m-0 text-[16px] 3xl:text-[0.833vw]">
            Do you want to archive this record?
          </p> :
          <p className="m-0 text-[16px] 3xl:text-[0.833vw]">
            Do you want to restore this record?
          </p>
        }
      </Dialog>
      <NewClasses 
                visible={editClass}
                onhide={() => setEditClass(false)}
                getListOfClass={props.getListOfClass}
                editData = {editData}
            />

    </>


  )
}

export default ClassesCard