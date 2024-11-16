"use client";
import React, { useEffect, useRef, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Image from "next/image";
import Link from "next/link";
import { ScrollPanel } from "primereact/scrollpanel";
import { toast } from "react-toastify";
import { listOfMathsClass } from "../../../../actions/OverviewMathsClassListing";
import { getPostList } from "../../../../actions/getPost";
import moment from "moment";
import { ProgressSpinner } from "primereact/progressspinner";
import { getTimeDifference } from "../../../../../components/helper/timeDiffCalculator";
import { getUpcommingClasses } from "../../../../actions/getUpCommingClasses";
import { NoDataMsg } from "../../../../common/NoDatamsg";
import { Menu } from "primereact/menu";
import { getDataFromLocalStorage } from "../../../../../components/helper/commonFunction";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";

export default function Home({
  classIdValue,
  setShowBack,
  setActiveTab,
  setCreatePost,
  Heading,
  setShowStudentWork,
  setDataToSend,
}) {
  const [classWorkList, setClassWorkList] = useState(null);
  const [allPost, setAllPost] = useState();
  const [isLoading, setLoading] = useState(false);
  const [loadingForUpcomingClasses, setLoadingForUpcomingClasses] =
    useState(false);
  const [upComing, setUpComing] = useState();
  const menuLeft = useRef(null);
  const [isTeacher, setTeacher] = useState(false);
  const [isView, setIsView] = useState(false);
  const [postDetail, setPostDetail] = useState({})
  useEffect(() => {
    setShowBack(true);
    setCreatePost(false);
    // isTeacher = getDataFromLocalStorage('userRole') == 'teacher' ? true : false;
    let checkTeacher =
      getDataFromLocalStorage("userRole") == "teacher" ? true : false;
    if (checkTeacher) {
      setTeacher(true);
    }
  }, []);
  const handleCopy = () => {
    if (classWorkList?.enrollmentCode) {
      navigator.clipboard
        .writeText(classWorkList.enrollmentCode)
        .then(() => {
          toast.success("Enrollment code copied!");
        })
        .catch((error) => {
          toast.error("Failed to copy enrollment code.");
        });
    } else {
      toast.error("Enrollment code not available.");
    }
  };
  const items = [
    {
      items: [
        {
          label: "Copy",
          command: () => handleCopy(),
        },
      ],
    },
  ];
  const getMathsClassList = async () => {
    try {
      if (classIdValue) {
        let accessToken = getDataFromLocalStorage("access_token");
        const payload = {
          accessToken: accessToken,
          courseId: classIdValue,
        };

        const response = await listOfMathsClass(payload);

        if (response.success && response.data) {
          setClassWorkList(response?.data?.data);
        } else {
          console.error("Failed to fetch class list");
        }
      } else if (response.code == 500) {
        toast.error(response.message || "Something Went Wrong");
        setLoading(false);
        setClassWorkList([]);
      } else {
        toast.error(response.error || "Something Went Wrong");
        setLoading(false);
        setClassWorkList([]);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getAllPostList = async () => {
    try {
      setLoading(true);
      if (classIdValue) {
        let accessToken = getDataFromLocalStorage("access_token");
        const payload = {
          accessToken: accessToken,
          courseId: classIdValue,
        };

        const response = await getPostList(payload);
        if (Object.keys(response.data.data).length > 0) {
        }

        if (response.success && response.data) {
          const newData = response?.data?.data?.map((elm, i) => {
            let newDate1 = moment(elm?.creationTime).format("Do MMM, YYYY");
            let presentTime = moment(); // Get the present time
            let difference = moment.duration(
              presentTime.diff(elm?.creationTime)
            );
            let hours = Math.floor(difference.asHours());
            let minutes = Math.floor(difference.asMinutes()) - hours * 60;
            let timeDifference;
            if (minutes >= 60) {
              let hours = Math.floor(minutes / 60);
              minutes = Math.floor(minutes % 60);
              timeDifference = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
            } else {
              timeDifference = `${Math.floor(minutes)}`;
            }
            return {
              ...elm,
              timeDifference: timeDifference,
              updatedTime: newDate1,
            };
          });
          setAllPost(newData);
          setLoading(false);
        } else {
          toast.error(
            response?.error ? response?.message : "Something Went Wrong"
          );
        }
      }
      if (response.code == 500) {
        toast.error(response.message || "Something Went Wrong");
        setLoading(false);
        setAllPost([]);
      } else {
        toast.error(response.error || "Something Went Wrong");
        setLoading(false);
        setAllPost([]);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
    setLoading(false);
  };

  const handleAddPost = () => {
    setCreatePost(true);
    setActiveTab(2);
  };

  /////Upcomming Classes////
  const getAllUpcommingClasses = async () => {
    try {
      setLoadingForUpcomingClasses(true);
      if (classIdValue) {
        let accessToken = getDataFromLocalStorage("access_token");
        const payload = {
          accessToken: accessToken,
          courseId: classIdValue,
        };

        const response = await getUpcommingClasses(payload);
        if (Object.keys(response.data.data).length > 0) {
        }

        if (response.success && response.data) {
          const newData = response?.data?.data?.map((elm, i) => {
            let newDate1 = moment(elm?.creationTime).format("Do MMM, YYYY");
            let presentTime = moment(); // Get the present time
            let difference = moment.duration(
              presentTime.diff(elm?.creationTime)
            );
            let hours = Math.floor(difference.asHours());
            let minutes = Math.floor(difference.asMinutes()) - hours * 60;
            let timeDifference;
            if (minutes >= 60) {
              let hours = Math.floor(minutes / 60);
              minutes = Math.floor(minutes % 60);
              timeDifference = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
            } else {
              timeDifference = `${Math.floor(minutes)}`;
            }

            let student_count=0;
            if(elm?.assigneeMode=="ALL_STUDENTS"){
              student_count=response?.data?.studentCount;
            }else{
              student_count=elm?.individualStudentsOptions?.studentIds.length;
            }
            
            return {
              ...elm,
              timeDifference: timeDifference,
              updatedTime: newDate1,
              student_count:student_count
            };
          });

          setUpComing(newData);
          setLoadingForUpcomingClasses(false);
        } else {
          console.error("Failed to fetch class list");
          setLoadingForUpcomingClasses(false);
          setUpComing([]);
        }
      }
      
    } catch (error) {
      let msg=error?.message ?? "Something Went Wrong";
      console.log("Errrrrrrrrrrrrrrrrrrrr:-",error);
      toast.error(msg);
      setLoadingForUpcomingClasses(false);
    }
    setLoadingForUpcomingClasses(false);
  };
  //////

  useEffect(() => {
    getMathsClassList();
    getAllPostList();
    getAllUpcommingClasses();
  }, []);

  const [imageData, setimageData] = useState()

  useEffect(() => {
    const data =JSON.parse(localStorage.getItem('imageData'))
    setimageData(data)
  }, [])

  const footerContentForView = (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">


        <button onClick={() => setIsView(false)} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
            Ok
        </button>
    </div>
  )
  
  return (
    <div className="mt-[18px] xl:mt-[20px] 3xl:mt-[1.042vw]">
      <div className="banner-bg h-[120px] bg-[#bcd1ef] rounded-t-lg flex items-center px-[20px] xl:px-[30px] 3xl:px-[1.042vw] border border-[#ecd9c4] ">
        {/* <Image
          className="3xl:w-[100vw] xl:w-[1920px] xl:h-[120px] m-auto "
          width="1920"
          height="120"
          src={imageData}
          // src="/images/home-img.png"
          alt="Class Image"
        /> */}
          <div className="3xl:text-[1.146vw] 2xl:text-[22px] text-[20px] text-[#1570EF] font-semibold leading-none">
               {Heading} <br/>
               <span className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#333] font-normal leading-none" >{classWorkList?.section ? classWorkList.section:''}</span>
            </div>
            
      </div>

      <div className="mt-[16px] xl:mt-[16px] 3xl:mt-[0.833vw]">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[0.781vw] gap-[15px]">
          <div>
            <div className="3xl:text-[1.042vw] 2xl:text-[20px] text-[20px] text-[#222222] font-semibold ">
              Overview of your {Heading}
            </div>
            <div className=" mt-[16px] xl:mt-[16px] 3xl:mt-[0.833vw] border border-[#C8CBD0] rounded-lg">
              <ScrollPanel
                style={{ width: "100%", height: "750px" }}
                className="custombar2"
              >
                <div className=" p-[20px] xl:p-[20px] 3xl:p-[1.042vw]">
                  <div className="3xl:text-[0.833vw] 2xl:text-[16px] text-[16px] text-[#101828] font-medium ">
                    Meetings
                  </div>
                  <div className="mt-[10px] xl:mt-[10px] 3xl:mt-[0.521vw]">
                    <div className="border border-[#1570EF] p-[5px] rounded-md">
                      <div className="flex justify-between">
                        <div className="flex gap-[10px] items-center">
                          <div className="w-[40px] h-[40px] bg-[#1570EF] rounded-md flex items-center justify-center">
                            <i className="hexatoolvideo-fill text-[#fff] text-[12px]"></i>
                          </div>
                          <Link
                            href={`${classWorkList?.alternateLink}`}
                            target="_blank"
                            className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#667085] font-normal cursor-pointer"
                          >
                            {" "}
                            Meet
                          </Link>
                        </div>
                        <div className="flex gap-[10px] items-center">
                          <Link
                            href={`${classWorkList?.alternateLink}`}
                            target="_blank"
                            className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#1570EF] font-normal underline"
                          >
                            {" "}
                            Generate link
                          </Link>
                          <div className="w-[20px] text-center">
                            <Link href="">
                              {" "}
                              <i className="hexatoolthree-dots text-[#1570EF]"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[24px] xl:mt-[24px] 3xl:mt-[1.25vw]">
                    <div className="3xl:text-[0.833vw] 2xl:text-[16px] text-[16px] text-[#101828] font-medium ">
                      Enrollment Code
                    </div>
                    <div className="mt-[10px] xl:mt-[10px] 3xl:mt-[0.521vw]">
                      <div className="border border-[#1570EF] p-[5px] rounded-md">
                        <div className="flex justify-between">
                          <div className="flex gap-[10px] items-center">
                            <div className="w-[40px] h-[40px] bg-[#1570EF] rounded-md flex items-center justify-center">
                              <i className="hexatoolbarcode text-[#fff] text-[18px]"></i>
                            </div>
                            <button
                              className="3xl:text-[0.625vw] xl:text-[13px] text-[13px] text-[#667085] font-normal cursor-default"
                            >
                              {" "}
                              Code
                            </button>
                          </div>
                          <div className="flex gap-[10px] items-center">
                            <div className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#1570EF] font-normal underline cursor-default">
                              {classWorkList?.enrollmentCode}
                            </div>
                            <div className="w-[20px] text-center">
                              <button
                                className="mr-2"
                                onClick={(event) =>
                                  menuLeft.current.toggle(event)
                                }
                                aria-controls="popup_menu_left"
                              >
                                {" "}
                                <i className="hexatoolthree-dots text-[#1570EF]"></i>
                              </button>
                              {/* <Button label="Show Left" icon="pi pi-align-left" className="mr-2" onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup /> */}

                              <Menu
                                model={items}
                                className="menu-item"
                                popup
                                ref={menuLeft}
                                id="popup_menu_left"
                                style={{
                                  width: "100px",
                                  height: "max-content",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollPanel>
            </div>
          </div>

          <div>
            <div className="flex  flex-row w- full 3xl:text-[1.042vw] 2xl:text-[20px] text-[20px] text-[#222222] font-semibold justify-between">
              <div className="">Post</div>
              {/* { allPost && Object.keys(allPost).length > 0 &&  
              <button
              onClick={() => {setActiveTab(2)}}
              className="flex mx-2 3xl:text-[0.900vw] 2xl:text-[14px] text-[14px] text-[#222222] font-semibold border border-[#1570EF] bg-[#FFF2E5] rounded-lg xl:rounded-[5.8px] 3xl:rounded-[0.4vw] xl:px-[1.0vw] px-[16px] items-center"
            >
              View All
            </button>} */}
              {
                <>
                  <div
                    onClick={() => {
                      setActiveTab(2);
                    }}
                    className="mx-2 3xl:text-[0.625vw] xl:text-[13px] text-[13px] text-[#1570EF] font-medium cursor-pointer mt-2"
                  >
                    View All
                  </div>
                </>
              }
            </div>
            <div className=" mt-[16px] xl:mt-[16px] 3xl:mt-[0.833vw] border border-[#C8CBD0] rounded-lg relative">
              <ScrollPanel
                style={{ width: "100%", height: "750px" }}
                className="custombar2"
              >
                <div className=" p-[20px] xl:p-[20px] 3xl:p-[1.042vw] mb-10">
                  <div className="3xl:text-[0.833vw] 2xl:text-[16px] text-[16px] text-[#101828] font-medium  border-b border-[#E4E7EC] pb-[10px]">
                    Recent Posts
                  </div>

                  <div>
                    {/* <div className="flex justify-end mt-[15px] xl:mt-[15px] 3xl:mt-[0.833vw] mb-[15px] xl:mb-[15px] 3xl:mb-[0.781vw]">
                      <div
                        href=""
                        className="3xl:text-[0.625vw] xl:text-[13px] text-[13px] text-[#667085] font-normal bg-[#F2F4F7] border border-[#C8CBD0] 3xl:px-[0.625vw] xl:px-[12px] px-[12px] 3xl:py-[0.208vw]  xl:py-[4px] py-[4px] rounded-md "
                      >
                        
                      </div>
                      <Link
                        href=""
                        className="3xl:text-[0.625vw] xl:text-[13px] text-[13px] text-[#1570EF] font-normal"
                      >
                        {" "}
                        View All
                      </Link>
                    </div> */}
                    {isLoading ? (
                      <div className="flex justify-center align-center">
                        <ProgressSpinner />
                      </div>
                    ) : allPost && Object.keys(allPost).length > 0 ? (
                      <div className="py-[15px] xl:py-[15px] 3xl:py-[0.781vw] border-y border-[#E4E7EC] space-y-[20px]">
                        {allPost?.length > 0 &&
                          allPost?.map((item, i) => {
                            return (
                              <div
                                key={i}
                                className="grid lg:grid-cols-12 sm:grid-cols-12 grid-cols-12 gap-[15px] xl:gap-[15px] 3xl:gap-[0.781vw]"
                              >
                                {}
                                <div className="col-span-4">
                                  {/* {item?.materials && item?.materials?.map((img,j)=>{
                        return(
                          <>
                          {}
                          <Image
                          key={j}
                            className="3xl:w-[5.99vw] 3xl:h-[5vw] xl:w-full xl:h-[96px] rounded-lg "
                            width="115"
                            height="96"
                            // src="/images/post-img1.png"
                            src={img?.link?.thumbnailUrl || img?.youtubeVideo?.thumbnailUrl || img?.driveFile?.driveFile?.thumbnailUrl}
                            alt="post Image"
                          />
                          </>
                        )
                      })} */}
                                  <Image
                                    className="3xl:w-[5.99vw] 3xl:h-[5vw] xl:w-full xl:h-[96px] rounded-lg "
                                    width="115"
                                    height="96"
                                    src={`https:${item.createrData.photoUrl}`}
                                    alt="post Image"
                                  />
                                </div>
                                <div className="col-span-8 space-y-[8px]">
                                  <div className="3xl:text-[0.833vw] xl:text-[15px] text-[16px] text-[#101828] font-medium">
                                    {/* {item?.text?.length > 110 && <Tooltip
                                      target={`.truncated-text-${i}`}
                                      mouseTrack
                                      mouseTrackLeft={10}
                                      mouseTrackTop={10}
                                      tooltipClassName="custom-tooltip-content"
                                    >
                                      <div className="3xl:text-[0.833vw] xl:text-[15px] text-[16px] text-[#fff] text-[#101828] font-medium" dangerouslySetInnerHTML={{ __html: item.text }}></div>
                                    </Tooltip>} */}
                                    <span>
                                      <div>
                                        {item?.text?.length > 110 ? (
                                          <div>
                                            <span dangerouslySetInnerHTML={{ __html: item.text.substring(0, 110) }} />
                                            <span onClick={()=>{setIsView(true);setPostDetail(item)}} style={{color:'#1570EF',cursor:'pointer'}} className={`truncated-text-${i}`}> See More ...</span>
                                          </div>
                                        ) : (
                                          <div dangerouslySetInnerHTML={{ __html: item.text }} />
                                        )}
                                      </div>

                                    </span>
                                  </div>
                                  <div className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#184C9D] font-medium bg-[#F9FBFD] border border-[#E8EEF7] 3xl:px-[0.625vw] xl:px-[12px] px-[12px] 3xl:py-[0.208vw]  xl:py-[6px] py-[6px] rounded-md w-[9rem]">
                                    {item?.updatedTime}
                                  </div>
                                  <div className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#667085] font-normal ">
                                    {/* {item?.timeDifference}  */}

                                    {getTimeDifference(item?.creationTime)}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <NoDataMsg />
                    )}
                  </div>
                </div>
              </ScrollPanel>
              {isTeacher && (
                <div className="bg-[#fff] py-[10px] px-[20px] absolute bottom-0 z-[999] rounded-b-lg w-full">
                  <Link
                    href="#"
                    onClick={() => handleAddPost()}
                    className="flex items-center gap-2 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-normal border border-[#1B55AF]  rounded-lg xl:px-[0.938vw] px-[18px] xl:py-[0.521vw] py-[10px] justify-center w-full"
                  >
                    <i className="hexatoolplus"></i> Add post
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="3xl:text-[1.042vw] 2xl:text-[20px] text-[20px] text-[#222222] font-semibold ">
              Upcoming
            </div>
            <div className=" mt-[16px] xl:mt-[16px] 3xl:mt-[0.833vw] border border-[#C8CBD0] rounded-lg relative">
              <ScrollPanel
                style={{ width: "100%", height: "750px" }}
                className="custombar2"
              >
                <div className=" p-[20px] xl:p-[20px] 3xl:p-[1.042vw]">
                  <div className="3xl:text-[0.833vw] 2xl:text-[16px] text-[16px] text-[#101828] font-medium  border-b border-[#E4E7EC] pb-[10px]">
                    Sessions
                  </div>
                  <div>
                    {loadingForUpcomingClasses ? (
                      <div className="flex justify-center align-center">
                        <ProgressSpinner />
                      </div>
                    ) : upComing && Object.keys(upComing).length > 0 ? (
                      upComing?.length > 0 &&
                      upComing?.map((item, i) => {
                        return (
                          <div
                            className="p-[15px] xl:p-[15px] 3xl:p-[1.042vw] bg-[#F9FBFD] border border-[#BACCE7] rounded-lg space-y-[20px] mt-[15px]"
                            key={i}
                          >
                            <div className="grid lg:grid-cols-12 sm:grid-cols-12 grid-cols-12 gap-[15px] xl:gap-[15px] 3xl:gap-[0.781vw]">
                              <div className="col-span-3">
                                <Image
                                  className="3xl:w-[3.229vw] 3xl:h-[4.167vw] xl:w-[62px] xl:h-[80px] rounded-lg shadow-lg"
                                  width="62"
                                  height="80"
                                  src="/images/seesion-img2.png"
                                  alt="seesion Image"
                                />
                              </div>
                              <div className="col-span-9 space-y-[8px]">
                                <Link
                                  href=""
                                  className="3xl:text-[0.833vw] xl:text-[15px] text-[16px] text-[#101828] font-medium"
                                >
                                  {item?.assignment?.title}
                                </Link>
                                <Link
                                  href=""
                                  className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#101828] font-normal block"
                                >
                                  Assigned Student Count: {item?.studentList?.length}..
                                </Link>
                                <div className="flex justify-between">
                                  <div className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#667085] font-normal ">
                                    {getTimeDifference(item?.assignment?.creationTime)}
                                  </div>
                                  <button
                                    onClick={()=>{setActiveTab(3), setShowStudentWork(true), setDataToSend(item)}}
                                    className="3xl:text-[0.625vw] xl:text-[13px] text-[13px] text-[#1570EF] font-medium"
                                  >
                                    View More
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <NoDataMsg />
                    )}

                    {/* <div className="grid lg:grid-cols-12 sm:grid-cols-12 grid-cols-12 gap-[15px] xl:gap-[15px] 3xl:gap-[0.781vw]">
                        <div className="col-span-3">
                          <Image
                            className="3xl:w-[3.229vw] 3xl:h-[4.167vw] xl:w-[62px] xl:h-[80px] rounded-lg shadow-lg"
                            width="62"
                            height="80"
                            src="/images/seesion-img2.png"
                            alt="seesion Image"
                          />
                        </div>
                        <div className="col-span-9 space-y-[8px]">
                          <Link
                            href=""
                            className="3xl:text-[0.833vw]  xl:text-[15px] text-[16px] text-[#101828] font-medium block"
                          >
                            3rd Grade - Science
                          </Link>
                          <Link
                            href=""
                            className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#101828] font-normal "
                          >
                            Awaiting Approval: 4 items..
                          </Link>
                          <div className="flex justify-between">
                            <div className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#667085] font-normal ">
                              2 min ago
                            </div>
                            <Link
                              href=""
                              className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#1570EF] font-medium"
                            >
                              View All
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="grid lg:grid-cols-12 sm:grid-cols-12 grid-cols-12 gap-[15px] xl:gap-[15px] 3xl:gap-[0.781vw]">
                        <div className="col-span-3">
                          <Image
                            className="3xl:w-[3.229vw] 3xl:h-[4.167vw] xl:w-[62px] xl:h-[80px] rounded-lg shadow-lg"
                            width="62"
                            height="80"
                            src="/images/seesion-img2.png"
                            alt="seesion Image"
                          />
                        </div>
                        <div className="col-span-9 space-y-[8px]">
                          <div className="3xl:text-[0.833vw] xl:text-[15px] text-[16px] text-[#101828] font-medium">
                            2nd Grade - Math
                          </div>
                          <Link
                            href=""
                            className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#101828] font-normal "
                          >
                            Awaiting Approval: 4 items..
                          </Link>
                          <div className="flex justify-between">
                            <div className="3xl:text-[0.625vw]  xl:text-[13px] text-[13px] text-[#667085] font-normal ">
                              2 min ago
                            </div>
                            <Link
                              href=""
                              className="3xl:text-[0.625vw] xl:text-[13px] text-[13px] text-[#1570EF] font-medium"
                            >
                              View All
                            </Link>
                          </div>
                        </div>
                      </div> */}
                  </div>
                </div>
              </ScrollPanel>
              {/* <NewClasses
                visible={addPost}
                onhide={() => setAddPost(false)}
            /> */}
            </div>
          </div>
        </div>
      </div>
      {isView&& <Dialog visible={isView} draggable={false} modal  footer={footerContentForView} style={{ width: '35vw' }} onHide={() => setIsView(false)} className='ConfirmDialog'>
      <h1 style={{fontWeight:'bold'}}>
         Description:
         </h1>
            <p>
              {postDetail?.text ?postDetail?.text:'' }
           </p>
       </Dialog>}
    </div>
  );
}
