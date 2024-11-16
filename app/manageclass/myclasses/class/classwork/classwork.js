"use client"
import React, { Fragment, useEffect, useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from 'primereact/dropdown';
import Studentwork from './studentwork/page';
import Assignment from './assignment';
import { classworkList, deleteAssignmentAPI } from '../../../../actions/classowrkListing';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { ProgressSpinner } from 'primereact/progressspinner';
import { NoDataMsg } from '../../../../common/NoDatamsg';
import { Menu, Transition } from "@headlessui/react";
import QuizAssignment from './quizAssignment';
import TopicPopup from './topicPopup';
import Topic from './classworkComponents/topic';
import CreateMaterial from "../classwork/creatematerial"
import CreateQuestions from "../classwork/createquestions"
import Quizassignment from "./classworkComponents/quizassignment";
import Reusepost from "./classworkComponents/reusepost"
import { ScrollPanel } from 'primereact/scrollpanel';
import { getTopicList } from '../../../../actions/Topic';
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
import Material from './classworkComponents/material';
import Questions from './classworkComponents/questions';
import ReusePostPopup from './reusePostPopup';

export default function ClassWork({ setShowBack, setActiveTab, classIdValue ,showStdWork, studentData }) {
    const router = useRouter();
    const [topics, setTopics] = useState([])
    const [topicValue, setTopicvalue] = useState(null);
    const topicId = topicValue?.id;
    const [showStudentWork, setShowStudentWork] = useState(false);
    const [showAssignment, setShowAssignment] = useState(false);
    const [showQuizAssignment, setShowQuizAssignment] = useState(false);
    const [showTopicPopup, setShowTopicPopup] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [loading, setLoading] = useState(false);
    const[rowdata,setRowData]= useState({})
    const [activeOption, setActiveOption] = useState(1);
    const[viewStudentWork,setViewStudentWork] =  useState(false);
    const [isTeacher,setTeacher]=useState(false);
    const [refreshList, setRefreshList] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [courseId, setCourseId] = useState();
    const [assignmentId, setAssignmentID] = useState();
    const [assignmentDetail, setAssignmentDetail] = useState();
    const [isQuizEdit, setIsQuizEdit] = useState(false);
    const [questionEditTab, setIsQuestionEditTab] = useState(false);
    const [courseIdOfQuize, setCourseIdOfQuize] = useState();
    const [courseIdOfQuestion, setCourseIdOfQuestion] = useState();
    const [idOfQuize, setIdOfQuize] = useState()
    const [idOfQuestion, setIdOfQuestion] = useState()
    const [showQuestions, setShowQuestions] = useState(false)
    const [showMaterial, setShowMaterial] = useState(false);
    const [showReusePost, setShowReusePost] = useState(false)
    const [materialId, setMaterialId] = useState();
    const [isEditMaterial, setIsEditMaterial] = useState(false);
    const [dataFromReuse, setDataFromReuse] = useState()
    
    const quizEdit =(value)=>{
        setIsQuizEdit(value);
        setShowQuizAssignment(true);
    } 

    const questionEdit =(value)=>{
        setIsQuestionEditTab(value);
        setShowQuestions(true);
    } 

    const refreshListFun = () => {
        setRefreshList(prevState => !prevState);
    };
    const handleEditChange = (value)=>{
        setIsEdit(value)
    }

    useEffect(() => { setShowBack(true);  
    let  checkTeacher = getDataFromLocalStorage('userRole') == 'teacher' ? true : false;
    if(checkTeacher){
      setTeacher(true);
    } },[])

    const [assignments, setAssignments] = useState([]);

    const studentWorkHandler = () => {

        if (showStudentWork == true) {
            if(viewStudentWork == true){
                setViewStudentWork(false)
            }else{
                setShowStudentWork(false);
            }
           
        } 
        else if (showAssignment == true) {
            setShowAssignment(false);
        }
        else if (showQuestions == true) {
            setShowQuestions(false)// Create Questions 
            setActiveOption(3)
        } 
        else if (showMaterial == true) {
            setShowMaterial(false)
            setActiveOption(4)
        }
        else {
            // setShowBack(true); setActiveTab(2);
            setShowBack(true); 
        }
        setIsEdit(false);//EditAssi
        setIsQuizEdit(false);//EditQuizAss
        setShowStudentWork(false)//studentworkbackbutton
        setIsEditMaterial(false)//Back From Edit Material
        setDataFromReuse() //Clear data from reusePost
        
    }

const handleOpen = (v)=>{
    // setShowStudentWork(true);
    setRowData(v)
}
    const getAssignments = async () => {

        try {
            // setLoading(true)
            if (classIdValue) {
                let accessToken = getDataFromLocalStorage("access_token");
                let checkTeacher = getDataFromLocalStorage("userRole")

                const payload = {
                    "accessToken": accessToken,
                    "courseId": classIdValue,
                    "topicId":topicId,
                    "role" : checkTeacher
                    // "status": ["PUBLISHED","DRAFT"]
                }

                const response = await classworkList(payload);
                if (response.success && response?.data?.data) {
                    let data=response.data.data;
                    if(data){
                        const filteredArray=data.filter(obj => obj?.assignment?.workType === 'ASSIGNMENT');
                        setAssignments(filteredArray);
                    }
                }
            } 
            else if(response.code == 500){
                toast.error(response.message ||'Something Went Wrong')
                setLoading(false);
              }
              else {
                setAssignments([]);
                toast.error(response.error || 'Something Went Wrong')
                setLoading(false);   
            }

        } catch (error) {
            
            toast.error('something went wrong');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
       
        getAssignments();
    }, [classIdValue, topicId])

    useEffect(() => {
      if(activeOption === 1&&!showAssignment){

          const intervalId = setInterval(() => {
              getAssignments();
          }, 5000);
          return () => {
              clearInterval(intervalId)
            }
      }
    }, [activeOption,showAssignment])
  
    
    
    useEffect(() => {
        if(classIdValue && activeOption===1){
            getAssignments();
        }
    }, [activeOption])

    const dueDate = (dateObj) => {
        if (dateObj) {
            const { year, month, day } = dateObj;

            const date = moment({ year: year, month: month - 1, day: day });

            const formattedDate = date.format('MMM DD');

            return 'Due ' + formattedDate;
        } else {
            return '-'
        }

    }

    const capitalizeFirstChar = (str) => {
        if (!str || typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    const returnTitle = () => {
        if(showStudentWork){
            return 'Student Work'
        }else if(showAssignment && !isEdit){
            return 'Create New Assignment'
        }else if(isEdit){
            return 'Edit Assignment'
        }else if(showQuizAssignment && !isQuizEdit){
            return 'Create New Quiz Assignment'
        }
        else if(isQuizEdit){
            return 'Edit Quiz Assignment'
        }
        else if(showQuestions && !questionEditTab){
            return 'Create Questions'
        }else if(questionEditTab && showQuestions   ){
            return 'Edit Questions'
        }
        else if(showMaterial && !isEditMaterial){
            return 'Create Material'
        }
        else if(showMaterial && isEditMaterial){
            return 'Edit Material'
        }
        else {
            return 'Classwork'
        }
    }
    
    const getTopic = async () => {
        let accessToken = getDataFromLocalStorage("access_token");
        try {
            const body = {
                accessToken: accessToken,
                courseId: classIdValue,
            }
            const res = await getTopicList(body)
            if(res.code ==200){
                const response = res?.data?.data?.length ? res.data.data.map((ele) => {
                    return {
                        name: ele.name,
                        id: ele.topicId
                    }
                }) : []
                setTopics(response)
            }
            else if(response.code == 500){
                toast.error(res.message ||'Something Went Wrong')
                setLoading(false);
              }
              else {
                toast.error(res.error || 'Something Went Wrong')
                setLoading(false);
              }
           
        } catch (error) {
            
            toast.error("something went wrong");
        }
    }

    useEffect(() => {
        getTopic()
    }, [])

    useEffect(()=>{
        if (showStdWork) {
            setShowStudentWork(showStdWork)
            setRowData(studentData)
        }
       
    },[])

    const courseIdForEditQuiz =(value)=>{
        setCourseIdOfQuize(value)
    }
    const idForQuizEdit =(value)=>{
        setIdOfQuize(value)
    }
   
    const setEditMaterial= (value)=>{
        setIsEditMaterial(value);
        setShowMaterial(true)
    }
    
    const handleDelete = async(assignmentID)=>{
        let accessToken = getDataFromLocalStorage("access_token");
        try {
            const body = {
                accessToken: accessToken,
                courseId: classIdValue,
                assignmentId: assignmentID,
            }
            const res = await deleteAssignmentAPI(body)
            if(res.code ==200){
                toast.success(res.message)
                getAssignments()
            }
            else if(response.code == 500){
                toast.error(res.message ||'Something Went Wrong')
                setLoading(false);
              }
              else {
                toast.error(res.error || 'Something Went Wrong')
                setLoading(false);
              }
           
        } catch (error) {
            
            toast.error("something went wrong");
        }
    }
    return (
        <div>
            <div className='flex flex-wrap items-center justify-between gap-2 mb-[24px] xl:mb-[1.531vw]'>
                <div className='flex items-center xl:gap-[0.833vw] gap-[12px]'>
                    {showQuizAssignment == true ? 
                    <button className='flex items-center 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.417vw] py-[8px] justify-center'
                        onClick={() => {
                            setActiveOption(2)
                            setShowQuizAssignment(false)
                            setIsQuizEdit(false)
                            setShowStudentWork(false)//studentworkbackbutton
                            setIsQuestionEditTab(false)
                            setDataFromReuse()// clear data from reusePost
                        }}
                    >
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
                    </button> :
                    <button className='flex items-center 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.417vw] py-[8px] justify-center'
                        onClick={() => {
                            studentWorkHandler();
                        }}
                    >
                        {/* <i className='hexatooldouble-arrow pr-3 3xl:text-[0.625vw] 2xl:text-[12px] text-[10px]'></i> */}
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 mr-2 fill-current"
                        >
                            <path d="M7.41 7.41L6 6l-6 6 6 6 1.41-1.41L2.83 12z" />
                        </svg>                         */}
                        <i className="pi pi-angle-double-left mr-2" style={{ fontSize: '0.8rem' }}></i>
                        Back
                    </button>}
                    <h2 className='3xl:text-[1.04vw] 2xl:text-[18px] text-[16px] font-semibold text-[#101828]'>
                        {returnTitle()}
                    </h2>
                </div>
                {showStudentWork == false && showAssignment == false && showQuizAssignment == false  && showQuestions == false  && showMaterial == false ?
                    <div className='flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                        <div className='customDropdown clear-icon closeIcon'>
                              <Dropdown
                                    filter
                                    value={topicValue}
                                    onChange={(e) => setTopicvalue(e.target.value)}
                                    options={topics}
                                    optionLabel="name"
                                    placeholder={topics.length === 0 ? "No topic" : "Select topic"}
                                    className="w-full md:w-[231px] xl:w-[220px] 3xl:w-[12.031vw]"
                                    showClear
                                />
                        </div>
                        { isTeacher && <Menu as="div" className="relative inline-block">
                            <Menu.Button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'>
                            <i className="hexatoolplus mr-[8px]"></i>
                                Create New
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
                            <Menu.Items className="absolute right-0 z-10 w-full min-w-[180px] origin-top-right bg-white  p-[16px] xl:p-[0.833vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                              <ul>
                                <li
                                    className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer'
                                    onClick={() => setShowAssignment(true)}
                                 >Assignment</li>
                                <li onClick={() => setShowQuizAssignment(true)} className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer'>Quiz Assignment</li>
                                <li onClick={()=> setShowQuestions(true)} className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer'>Questions</li>
                                <li  onClick={()=> setShowMaterial(true)} className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer'>Material</li>
                                <li  onClick={()=> {setShowReusePost(true), setVisible(true)}} className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer'>Reuse Post</li>   
                                <li className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer' onClick= {() => (setShowTopicPopup(true), setVisible2(true))}>Topic</li>
                              </ul>
                            </Menu.Items>
                          </Transition>
                        </Menu>}
                    </div>
                    : null
                }
            </div>
            {showStudentWork == false && showAssignment == false && showQuizAssignment == false &&  showQuestions == false && 
             showMaterial == false &&
                <div>
                      <>
          <div className="mt-[24px] xl:mt-[20px] 3xl:mt-[1.146vw]">
            <div className="grid grid-cols-12 gap-[40px] xl:gap-[35px]  3xl:gap-[2.083vw]">
              <div className="col-span-12 lg:col-span-3">
                <div className="text-[#667085] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal mb-[10px] 3xl:mb-[0.521vw]">
                  Quick Access
                </div>
                <div>
                  <div onClick={() => setActiveOption(1)} className={`text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal py-[12px] xl:py-[10px] 3xl:py-[0.525vw] border-b border-b-[#E4E7EC] cursor-pointer ${activeOption === 1 ? 'font-semibold' : 'text-[#344054]'}`}>
                    Assignment
                  </div>
                  <div onClick={() => setActiveOption(2)} className={`text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal py-[12px] xl:py-[10px] 3xl:py-[0.525vw] border-b border-b-[#E4E7EC] cursor-pointer   ${activeOption === 2 ? 'font-semibold' : 'text-[#344054]'}`}>
                    Quiz Assignment
                  </div>
                  <div onClick={() => setActiveOption(3)} className={`text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal py-[12px] xl:py-[10px] 3xl:py-[0.525vw] border-b border-b-[#E4E7EC] cursor-pointer  ${activeOption === 3 ? 'font-semibold' : 'text-[#344054]'}`}>
                    Questions
                  </div>
                  <div onClick={() => setActiveOption(4)} className={`text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal py-[12px] xl:py-[10px] 3xl:py-[0.525vw] border-b border-b-[#E4E7EC] cursor-pointer  ${activeOption === 4 ? 'font-semibold' : 'text-[#344054]'}`}>
                    Material
                  </div>
                  {/* <div onClick={() => setActiveOption(5)} className={`text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal py-[12px] xl:py-[10px] 3xl:py-[0.525vw] border-b border-b-[#E4E7EC] cursor-pointer ${activeOption === 5 ? 'font-semibold' : 'text-[#344054]'}`}>
                    Reuse Post
                  </div> */}
                  <div onClick={() => setActiveOption(6)} className={`${activeOption === 6 ? ' font-semibold text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal py-[12px] xl:py-[10px] 3xl:py-[0.525vw] border-b border-b-[#E4E7EC] cursor-pointer' : 'text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-normal py-[12px] xl:py-[10px] 3xl:py-[0.525vw] border-b border-b-[#E4E7EC] cursor-pointer'}`}>
                    Topic
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-9">
                  <>
                   
                    {activeOption === 1 && <>
                      {/* <Assignment classIdValue={classIdValue} /> */}
                     
                         <ScrollPanel
                         style={{ width: "100%", height: "500px" }}
                         className="custombar2"
                         >
                            {
                        loading ?
                            (<div className='xl:p-[0.833vw] p-[10px] border border-[#C8CBD0] rounded-lg flex flex-col col-span-3 text-center'>
                                <div className="flex justify-center align-center"><ProgressSpinner /></div>
                            </div>) :
                            (<div className='grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 xl:gap-[1.042vw] gap-[12px]'>
                                {
                                    assignments?.length > 0 ? assignments.map((v) => {
                                     
                                        return <>
                                            <div className='xl:p-[0.833vw] p-[10px] border border-[#C8CBD0] rounded-lg flex flex-col'>
                                                <div className='flex items-center justify-between gap-2 mb-[10px] xl:mb-[0.781vw]'>
                                                    <h4 className='3xl:text-[0.729vw] text-[14px] text-[#98A2B3]'>{capitalizeFirstChar(v.assignment?.workType )}</h4>
                                                    <Menu as="div" className="relative inline-block">
                                                            <Menu.Button >
                                                            <i 
                                                            className="hexatoolthree-dots cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center">
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
                                                                    onClick={() => {setShowAssignment(true), setIsEdit(true),
                                                                        setCourseId(v?.assignment?.courseId),setAssignmentID(v?.assignment?.id), setAssignmentDetail(v) }}>
                                                                    Edit
                                                                </li>
                                                                <li
                                                                    className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                    onClick={() => {handleDelete(v?.assignment?.id) }}>
                                                                    Delete
                                                                </li>
                                                            </ul>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </div>
                                                <div className='xl:pb-[2.604vw] pb-[30px] border-b border-[#C8CBD0] grow'>
                                                    <h3 className='3xl:text-[1.04vw] 2xl:text-[18px] text-[16px] text-[#000] font-medium mb-[10px] xl:mb-[0.781vw]'>{v?.assignment?.title}</h3>
                                                    <div className='grid grid-cols-3 xl:gap-[0.625vw] gap-[8px]'> 
                                                        <div className='flex 3xl:text-[0.677vw] 2xl:text-[12px] text-[12px] text-[#fff] border border-[#7BADFF] bg-[#7BADFF] rounded-md xl:py-[0.521vw] py-[8px] justify-center items-center'>
                                                            {dueDate(v?.assignment?.dueDate)}
                                                        </div>
                                                        <div className='flex 3xl:text-[0.677vw] 2xl:text-[12px] text-[12px] text-[#667085] border border-[#E4E7EC] bg-[#FCFCFD] rounded-md xl:py-[0.521vw] py-[8px] justify-center items-center'>
                                                        Turned In: {v?.submittedCount === undefined ? " -" : v?.submittedCount}
                                                        </div>
                                                        <div className='flex 3xl:text-[0.677vw] 2xl:text-[12px] text-[12px] text-[#667085] border border-[#E4E7EC] bg-[#FCFCFD] rounded-md xl:py-[0.521vw] py-[8px] justify-center items-center'>
                                                            Assigned:{v?.pendingCount || "-"}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-between gap-2 xl:mt-[1.25vw] mt-[16px]'>
                                                      {/* <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] bg-[#FFF] rounded-lg xl:px-[0.938vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center'>
                                                        View Instructions
                                                    </button> */}
                                                     {
                                                      v.assignment?.state === "DRAFT" ? 
                                                       <div>
                                                           <h1 className='italic text-slate-500'>Draft</h1>
                                                       </div>
                                                       :
                                                       <div></div>
                                                   } 
                                                    <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center'
                                                        onClick={()=>{
                                                            setShowStudentWork(true);
                                                            handleOpen(v)
                                                        }}
                                                    >
                                                        Open
                                                    </button>
                                                </div>
                                            </div>
                                            </>
                                    }) : (
                                    <div className='xl:p-[0.833vw] p-[10px] border border-[#C8CBD0] rounded-lg flex flex-col col-span-3 text-center'>
                                        <NoDataMsg/>
                                    </div>
                                    
                                    )
                                }
                            </div>)}
                            </ScrollPanel>
                    </>}
                    {activeOption === 2 && <> 
                      <Quizassignment classIdValue={classIdValue} topicId={topicId} quizEdit={quizEdit} courseId={courseIdForEditQuiz} 
                        id={idForQuizEdit}/>
                    </>}
                    {activeOption === 3 && <>
                      <Questions classIdValue={classIdValue} topicId={topicId} courseId={setCourseIdOfQuestion} 
                        id={setIdOfQuestion} quetionEdit={questionEdit}/>
                    </>}
                    {activeOption === 4 && <>
                      <Material topicId={topicId} classIdValue={classIdValue} setMaterialId={setMaterialId} setIsEditMaterial={setEditMaterial}/>
                    </>}
                    {activeOption === 5 && <>
                      <Reusepost classIdValue={classIdValue} />
                    </>}
                    {activeOption === 6 && <>
                      <Topic classIdValue={classIdValue} topicId={topicId} refreshList= {refreshList} />
                    </>}
                  </>
              </div>
            </div>
          </div>
        </>
           
                </div>
            }
            {showStudentWork == true &&
                <Studentwork classIdValue={classIdValue} rowdata={rowdata} student={showStudentWork} setViewStudentWork={setViewStudentWork} viewStudentWork={viewStudentWork}/>
            }
            {showAssignment == true &&
                <Assignment tabId={1} setActiveOption={setActiveOption} classIdValue={classIdValue} rowdata={rowdata} setShowAssignment={setShowAssignment} getAssignments={getAssignments} courseIdNo={courseId} assignmentId={assignmentId} isEdit={isEdit} handleEditChange={handleEditChange} dataFromReuse={dataFromReuse}/>
            }
            {
            showQuizAssignment == true && 
            <QuizAssignment tabId={2} setActiveOption={setActiveOption} classIdValue={classIdValue} rowdata={rowdata} setShowQuizAssignment={setShowQuizAssignment} idOfQuize={idOfQuize} courseIdOfQuize={courseIdOfQuize} isQuizEdit={isQuizEdit} 
            handleEditChange={setIsQuizEdit} dataFromReuse={dataFromReuse} />
            }

            {
                showQuestions == true &&
                <CreateQuestions
                    setActiveOption={setActiveOption}
                    classIdValue={classIdValue}
                    rowdata={rowdata}
                    setShowQuestions={setShowQuestions}
                    idOfQuestion={idOfQuestion}
                    courseIdOfQuestion={courseIdOfQuestion}
                    questionEditTab={questionEditTab}
                    setQuestionEditTab={setIsQuestionEditTab}

                    handleEditChange={setShowQuestions}
                    dataFromReuse={dataFromReuse}
                    
                    />
            }
            {  
            showMaterial == true && 
               <CreateMaterial  setActiveOption={setActiveOption} classIdValue={classIdValue} rowdata={rowdata} setShowMaterial={setShowMaterial} materialId={materialId} isEditMaterial={isEditMaterial} setIsEditMaterial={setIsEditMaterial}
                    dataFromReuse={dataFromReuse} handleEditChange={setShowMaterial} />
            }
            {
                showReusePost == true &&
                <ReusePostPopup visible={visible}  
                setActiveOption={setActiveOption} 
                getTopic={getTopic} 
                classIdValue={classIdValue} 
                setVisible={setVisible} 
                setShowTopicPopup={setShowTopicPopup} 
                refreshList={refreshListFun} 

                setShowReusePost={setShowReusePost}
                setDataFromReuse={setDataFromReuse}
                setShowAssignment={setShowAssignment}
                setShowQuizAssignment={setShowQuizAssignment}
                setShowQuestions={setShowQuestions}
                setShowMaterial={setShowMaterial} />
            }
            {
                showTopicPopup == true &&
                <TopicPopup tabId={6} setActiveOption={setActiveOption} getTopic={getTopic} classIdValue={classIdValue} visible={visible2} setVisible={setVisible2} setShowTopicPopup={setShowTopicPopup} refreshList={refreshListFun} />
            }
        </div>
    )
}
