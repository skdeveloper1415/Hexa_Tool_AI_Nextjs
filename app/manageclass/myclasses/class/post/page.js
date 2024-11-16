"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from "primereact/dropdown";
import Image from "next/image";
import { postSortOptions } from "../../../../../components/helper/enum";
import { PostListingApi } from "../../../../actions/postApi";
import { ProgressSpinner } from "primereact/progressspinner";
import CreatePost from "./createpost";
import AppsPopup from "../../../../../components/aiAppsPopup";
import RealWorld from "../../../../../components/realWorldConnection";
import AcademicContent from "../../../../../components/academicContent";
import PostComp from "./post";
import { getDataFromLocalStorage } from "../../../../../components/helper/commonFunction";


export default function Post(props) {
  const { setShowBack, classIdValue } = props;
  const [CeateNewShow, setCeateNewShow] = useState(false);
  const [postSort, setPostSort] = useState(postSortOptions[0]);
  const [postSearch, setPostSearch] = useState('')
  const [PostData, setPostData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [isActionVisible, setisActionVisible] = useState(false)
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");
  const [desc1, setdesc1] = useState("");
  const [academicContent, setAcademicContent] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isTeacher,setTeacher]=useState(false);
  const [isEditPost, setIsEditPost] = useState(false)
  const [editData, setEditData] = useState({ courseId: '', postId: '' });

  console.log("id--->", editData )
  const handleEditData =(courseId, postId)=>{
    setIsEditPost(true)
    setEditData({ courseId, postId });
  }
  

  useEffect(() => {
    getPost()
    setShowBack(true)
    let  checkTeacher = getDataFromLocalStorage('userRole') == 'teacher' ? true : false;
    if(checkTeacher){
      setTeacher(true);
    }
  }, [refresh]);

  const getPost = async (search, sort) => {
    try {
      if (classIdValue) {
        setLoader(true);
        let accessToken = getDataFromLocalStorage("access_token");
        if (!accessToken) {

        }
        const body = {
          accessToken: accessToken,
          courseId: classIdValue,
          searchedText: search,
          sort: sort ?? postSort
        };

        const response = await PostListingApi(body);
        if (response?.code == 200) {
          const postList = response?.data?.data ?? [];
          setPostData(postList);
          setLoader(false);
          setRefresh(false);
          setIsEditPost(false)
        } else {
          setPostData([]);
          setLoader(false);
          setRefresh(false)
          setIsEditPost(false)

        }
      }
    } catch (error) {
      setLoader(false);
      
      toast.error("something went wrong");
    }
  };

  const searchRef = useRef(null)
  const handleSearch = (value) => {
    if(searchRef.current){
      clearTimeout(searchRef.current)
    }
    searchRef.current = setTimeout(() => getPost(value, postSort),300)
    setPostSearch(value)
    
  }

  const handleSort = (value) => {
    setPostSort(value)
    getPost(postSearch,value)
  }

  const handleSocialStories = () => {
    setTitle("AI Social Stories");
    setdesc(
      "Generate a social story about a particular event to help a student understand what to expect in that situation."
    );
    setdesc1(" Social Situation, Event, or Activity");
    setVisible(true);
  };

  const handleRealWorld = () => {
    setTitle("AI Newsletter");
    setdesc(" Generate real world examples to increase student investment .");
    setdesc1(" Topic, Standard, Objective(be as specific as possible):");
    setVisible1(true);
  };

  const handleAcademicContent = () => {
    setTitle("AI Academic content");
    setdesc(" Generate Original academic content customized to the criteria of your choice.");
    setAcademicContent(true);
    setVisible2(true);

  }
 function handleClear() {
  // setRefresh(true)
  setInstruction("");
  setVisible(false);
  setVisible1(false);
  setVisible2(false);
  setisActionVisible(false);
 }
 


  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-[24px] xl:mb-[2.031vw]">
        {CeateNewShow === true || props.isCreatePost == true ? (
          <>
            <div className="flex items-center xl:gap-[0.833vw] gap-[12px]">
              <button
                className="flex items-center 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.417vw] py-[8px] justify-center"
                onClick={() => {setCeateNewShow(false);props.setCreatePost(false);setIsEditPost(false)}}
              >
                {/* <i className="hexatooldouble-arrow pr-3 3xl:text-[0.625vw] 2xl:text-[12px] text-[10px]"></i> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2 fill-current"
                >
                  <path d="M7.41 7.41L6 6l-6 6 6 6 1.41-1.41L2.83 12z" />
                </svg>      */}
                        <i className="pi pi-angle-double-left mr-2" style={{ fontSize: '0.8rem' }}></i>
                Back
              </button>
              <h2 className="3xl:text-[1.04vw] 2xl:text-[18px] text-[16px] font-semibold text-[#101828]">
               {isEditPost ? "Edit Post" : "Create Post" } 
              </h2> 
            </div>
            <div className="flex items-center xl:gap-[0.833vw] gap-[12px]">
              <button
                onClick={handleSocialStories}
                className="flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center "
              >
                <Image
                  src="/images/highlight.svg"
                  width="20"
                  height="20"
                  alt="AI Multi Choice Assessment"
                />
                AI Blog Creator
              </button>
             {/*  <button
                onClick={handleRealWorld}
                className="flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center "
              >
                <Image
                  src="/images/highlight.svg"
                  width="20"
                  height="20"
                  alt="AI Multi Choice Assessment"
                />
                AI Newsletter
              </button>
              <button onClick={handleAcademicContent} className="flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center ">
                <Image
                  src="/images/highlight.svg"
                  width="20"
                  height="20"
                  alt="AI Multi Choice Assessment"
                />
                AI Spicy Sentence Stems
              </button> */}
            </div>
          </>
        ) : (
          <>
            <h2 className="3xl:text-[1.04vw] 2xl:text-[18px] text-[16px] font-semibold text-[#101828]">
              Post
            </h2>
            <div className="flex flex-wrap items-center gap-[15px] xl:gap-[13px] 3xl:gap-[0.781vw]">
            <div>
          <span className="p-input-icon-left custm-search custm-search">
            <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
            <InputText
              placeholder="Search..."
              className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[300px] xl:w-[340px] 3xl:w-[23.75vw] inputbox-custom-sizes custhover"
              value={postSearch}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </span>
        </div>  
              <div className="customDropdown">
                <Dropdown
                  value={postSort}
                  onChange={(e) => handleSort(e.target.value)}
                  filter
                  options={postSortOptions}
                  placeholder="sort by"
                  className="w-full md:w-[160px] xl:w-[140px] 3xl:w-[8.333vw]"
                />
              </div>
              {/* <div className="h-[44px] w-[44px] xl:h-[38px] xl:w-[38px] 3xl:h-[2.292vw] 3xl:w-[2.292vw] border border-[#C8CBD0] rounded-[6px] flex justify-center items-center cursor-pointer">
                <i className="hexatoolhamburg-dots text-[#FF8B1A] text-[14px] xl:text-[12px] 3xl:text-[0.733vw]"></i>
              </div>
              <div className="h-[44px] w-[44px] xl:h-[38px] xl:w-[38px] 3xl:h-[2.292vw] 3xl:w-[2.292vw] border border-[#C8CBD0] rounded-[6px] flex justify-center items-center cursor-pointer">
                <i className="hexatoolcalender-outline text-[#98A2B3] text-[18px] xl:text-[16px] 3xl:text-[0.933vw]"></i>
              </div> */}
           {  isTeacher && <button
              onClick={() => setCeateNewShow(true)}
              className="flex 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-center items-center"
            >
              <i className="hexatoolplus mr-[8px]"></i>
              Create New
            </button>}
            </div>
          </>
        )}
      </div>
      {CeateNewShow === true || props.isCreatePost == true ? (
        <CreatePost 
        classIdValue={classIdValue} 
        setCeateNewShow={setCeateNewShow} 
        getPost={getPost} 
        refresh={refresh} 
        setCreatePost={props.setCreatePost} 
        instruction={instruction} 
        handleClear={handleClear}
        CeateNewShow={CeateNewShow}
        editData={editData}
        isEditPost={isEditPost}
        setEditPost={setIsEditPost}
        />
      ) : (
        <>
          {
            loader?
            (<div className="flex justify-center align-center">
            <ProgressSpinner />
             </div>)
          :
          (<PostComp isTeacher={isTeacher} PostData={PostData} getPost={getPost} editPost={setCeateNewShow} onEdit={handleEditData}  /> )
          } 
        </>
      )}
      <AppsPopup
        visible={visible}
        onhide={() => setVisible(false)}
        // onhide={handleHide}
        setInstruction={setInstruction}
        isActionVisible = {setisActionVisible}
        aiSocialStories={true}
        title={title}
        description={desc}
        descriptionText={desc1}
        isAcademicContent={academicContent}
        closeAcademicContent={setAcademicContent}
        
      />
      <RealWorld
        visible1={visible1}
        onhide={() => setVisible1(false)}
        setInstruction={setInstruction}
        isActionVisible = {setisActionVisible}
        aiSocialStories={false}
        realworld={true}
      />
      <AcademicContent
        visible2={visible2}
        onhide={() => setVisible2(false)}
        setInstruction={setInstruction}
        isActionVisible = {setisActionVisible}
        aiSocialStories={false}
        aiAcademicContent={true}
      />


    </>
  );
}
