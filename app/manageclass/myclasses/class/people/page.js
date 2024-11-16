"use client"
import React, { useState, useEffect,useRef } from "react";

import Teachers from "./teachers/page";
import Students from "./students/page";
import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { toast } from "react-toastify";
import {createStudent,createTeacher} from '../../../../actions/people/index';

import { Chips } from 'primereact/chips';       
import { getDataFromLocalStorage } from "../../../../../components/helper/commonFunction";
import { listOfMathsClass } from "../../../../actions/OverviewMathsClassListing";

export default function People({classIdValue, setShowBack}) {
  const [activeTab, setActiveTab] = useState(1);
  const [visible, setVisible] = useState(false);
  const [emails, setEmails] = useState([]); // Change state variable name to 'emails'
  const [error, setError] = useState({})
  // let isTeacher = false;
  const [isTeacher,setTeacher]=useState(false);
  const [value, setValue] = useState([]);
  const [isActionVisible, setIsActionVisible] = useState(false)
  const [link, setLink] = useState([]);

  function validateEmail(email) {
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const validate = (emails) => {
  let err = {}
  let isErr = false;
  if (!emails || emails?.length == 0) {
    err.email = 'Please Enter Atleast One Email.'
    isErr = true
  }

  setError(err)
  return isErr
}

const handleCopyText = () => {
  // Get the text content of the div
  const divText = document.getElementById('copytext').innerText;

  // Create a temporary textarea element to hold the text
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = divText;

  // Append the textarea to the body (it needs to be in the DOM for execCommand to work)
  document.body.appendChild(tempTextarea);

  // Select the text inside the textarea
  tempTextarea.select();

  // Execute the copy command
  document.execCommand('copy');

  // Remove the temporary textarea from the DOM
  document.body.removeChild(tempTextarea);

  // Optionally, notify the user or perform any other action after copying
  
  toast.success("Copied!")
}

 const content = useRef()

  const addEmail = (email) => {
    
    if(validateEmail(email)){
      setEmails([...emails, email]); 
      setIsActionVisible(false)
    }  
else{
  setIsActionVisible((true))
  // toast.error("Please Enter Valid Email.")
  // let isErr = false;
  // let err = {};
  // err.email = 'Please Enter Valid Email.';
  // isErr = true;

  // setError(err);
  return false
}
  };

  // Function to remove email from the list
  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove)); 
  };

  const handleInvite = ()=>{

if(content.current.value){
  // toast.error("Please Enter key.")
  let isErr = false;
  let err = {};
  err.email = 'Press enter key to multiples email ids.';
  isErr = true;

  setError(err);
  return isErr
}
if (emails.length == 0) {
  validate()
  return
}
      if(activeTab == 1){
        handleCreateStudent()
      }
      if(activeTab == 2){
        handleCreateTeacher()
      }
  }
  const handleCancle = ()=>{
    setVisible(false);
    setEmails('');
    setError({});
  }

  const handleCreateStudent = async()=>{
    try{
    let accessToken = getDataFromLocalStorage("access_token");
    let Payload={
      "accessToken": accessToken,
      "courseId":classIdValue,
      "studentEmail":emails
    }
    const response = await createStudent(Payload);
    
    if (response.success && response.data) {
      toast.success(response?.data.message)
      handleCancle();
    } else {
      toast.error(response?.message)
      setEmails('')
      console.error("Failed to Create");
    }
  } catch(error){
    toast.error(error)
  }
  }
  
  const handleCreateTeacher = async()=>{
    try{
      let accessToken = getDataFromLocalStorage("access_token");
      let Payload={
        "accessToken": accessToken,
        "courseId":classIdValue,
        "teacherEmail":emails
      }
      const response = await createTeacher(Payload);
      
      if (response.success && response.data) {
        toast.success(response?.data.message)
        handleCancle();
  
      } else {
        toast.error(response?.message)
        setEmails('')
        console.error("Failed to Create");
      }
    }catch(error){
      toast.error(error)
    }
  }

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
          setLink(response?.data?.data?.alternateLink);
        } else {
          console.error("Failed to fetch class list");
        }
      } else if (response.code == 500) {
        toast.error(response.message || "Something Went Wrong");
        setLink([]);
      } else {
        toast.error(response.error || "Something Went Wrong");
        setLink([]);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  useEffect(()=>{
    setShowBack(true)
    let  checkTeacher = getDataFromLocalStorage('userRole') == 'teacher' ? true : false;
    if(checkTeacher){
      setTeacher(true);
    }
    getMathsClassList()

  },[])
  return (
    <div>
      <div className="flex justify-between mb-[24px] xl:mb-[24px] 3xl:mb-[1.25vw]">
        <div className="flex gap-[32px] xl:gap-[1.667vw] items-center">
          <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">
            People
          </div>
          <div className="flex items-center">
            <div
              onClick={() => setActiveTab(1)}
              className={`${
                activeTab === 1
                  ? "border-b border-[#101828] text-[#101828] font-semibold"
                  : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
              }  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.573vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
            >
              <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                Students
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className={`${
                activeTab === 2
                  ? "border-b border-[#101828] text-[#101828] font-semibold"
                  : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
              }  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.573vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
            >
              <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                Teachers
              </div>
            </div>
          </div>
        </div>

        { isTeacher && <div>
          {activeTab === 1 && (
            <Link
              href=""
              onClick={() => setVisible(true)}
              className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center"
            >
              <i className="hexatoolplus mr-[10px] xl:mr-[10px] 3xl:mr-[0.521vw]"></i>
              Add Student
            </Link>
          )}
          {activeTab === 2 && (
            <Link
             onClick={() => setVisible(true)}
              href=""
              className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center"
            >
              <i className="hexatoolplus mr-[10px] xl:mr-[10px] 3xl:mr-[0.521vw]"></i>
              Add Instructor
            </Link>
          )}
        </div>}
      </div>

      <div>
        {activeTab === 1 && (
          <>
            <Students classIdValue={classIdValue}/>
          </>
        )}
        {activeTab === 2 && (
          <>
            <Teachers classIdValue={classIdValue}/>
          </>
        )}
      </div>

      <Dialog
        className="custom-popup"
        visible={visible}
        style={{ width: "35vw" }}
        onHide={() => handleCancle()}
      >
        <div className="p-[15px] xl:p-[15px] 2xl:p-[0.781vw]">
          <div className="flex flex-col gap-8 xl:gap-7 3xl:gap-[1.667vw]">
            <div className="text-[18px] xl:text-[20px] 3xl:text-[1.042vw] font-medium text-[#101828]">
            { activeTab == 1 ? "Invite Students":"Invite Instructor"}
            </div>

            <div className="flex gap-5 custom items-center">
              <div className="">
                <div>
                  <label className="3xl:text-[0.833vw] xl:text-[16px] text-[16px] text-[#344054] font-semibold block">
                    Invite Link:
                  </label>
                  <span  id='copytext' className="3xl:text-[0.833vw] xl:text-[16px] text-[16px] text-[#667085] font-normal block">
                    {/* https://www.w3.Classroom-invite/Out-Of-Date/hypertext/TBL_Disclaimer. */}
                    {link}
                  </span>
                </div>
              </div>

              <Link href="">
                <i className="hexatooldoc-copy text-[#1570EF] text-[30px]" onClick={() => handleCopyText()}></i>
              </Link>
            </div>
          </div>
          <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw] w-full">
            <div className="flex justify-between gap-[8px] inviteClass w-full">
              {/* <InputText
                type="text"
                className="w-full"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> */}
              <div className="inviteClasss w-full">  
               <Chips
               className="w-full custom-chips"
                value={emails} 
                onChange={(e) => {setEmails(e.value), 
                setError((prevError) => ({
                ...prevError,
                email: "",
              }))
              // setIsActionVisible(false); 
            }} 
            inputRef={content}
            separator=","
            onAdd={(e) => addEmail(e.value)}
            onRemove={(e) => removeEmail(e.value)}
          />
              </div>
              {/* <Link> */}
              {/* <button
                onClick={handleInvite}
                href=""
                className=" flex justify-center text-[#fff] bg-[#1570EF] items-center border px-[18px] py-[10px] border-[#1570EF] rounded-lg shadow1 text-[16px] xl:text-[0.833vw] font-medium "
              >
                Invite
                </button> */}
              {/* </Link> */}
            </div>
          {error.email ? <span style={{ color: 'red' }}>{error.email}</span> : <></>}
{isActionVisible == true ? <div className="text-[red]">Please enter valid email</div>: ""}
          </div>
          {/* <div className="h-[200px] xl:h-[200px] 3xl:h-[10.417vw] overflow-auto">
            <div className="flex gap-[12px] items-center mb-[16px] xl:mb-[16px] 3xl:mb-[0.833vw]">
                <Image width="50" height="50"  className="" src="/images/student-profile/1.png"  alt='teacher'/>                         
                <div className="">
                <h3 className="3xl:text-[0.729vw] xl:text-[14px] text-[14px] text-[#101828] font-semibold block">
                Amiley Smith
                  </h3>
                  <p className="3xl:text-[0.625vw] xl:text-[12px] text-[12px] text-[#101828] font-normal block">
                  tim.jennings@example.com
                  </p>
                </div>
            </div>
            <div className="flex gap-[12px] items-center mb-[16px] xl:mb-[16px] 3xl:mb-[0.833vw]">
                <Image width="50" height="50"  className="" src="/images/student-profile/3.png"  alt='teacher'/>                         
                <div className="">
                <h3 className="3xl:text-[0.729vw] xl:text-[14px] text-[14px] text-[#101828] font-semibold block">
                Kristin Watson
                  </h3>
                  <p className="3xl:text-[0.625vw] xl:text-[12px] text-[12px] text-[#101828] font-normal block">
                  tim.jennings@example.com
                  </p>
                </div>
            </div>
            <div className="flex gap-[12px] items-center mb-[16px] xl:mb-[16px] 3xl:mb-[0.833vw]">
                <Image width="50" height="50"  className="" src="/images/student-profile/2.png"  alt='teacher'/>                         
                <div className="">
                <h3 className="3xl:text-[0.729vw] xl:text-[14px] text-[14px] text-[#101828] font-semibold block">
                Amiley Smith
                  </h3>
                  <p className="3xl:text-[0.625vw] xl:text-[12px] text-[12px] text-[#101828] font-normal block">
                  tim.jennings@example.com
                  </p>
                </div>
            </div>
            <div className="flex gap-[12px] items-center mb-[16px] xl:mb-[16px] 3xl:mb-[0.833vw]">
                <Image width="50" height="50"  className="" src="/images/student-profile/2.png"  alt='teacher'/>                         
                <div className="">
                <h3 className="3xl:text-[0.729vw] xl:text-[14px] text-[14px] text-[#101828] font-semibold block">
                Amiley Smith
                  </h3>
                  <p className="3xl:text-[0.625vw] xl:text-[12px] text-[12px] text-[#101828] font-normal block">
                  tim.jennings@example.com
                  </p>
                </div>
            </div>

          </div> */}

          <div className="flex  gap-[12px] justify-end pt-[30px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
            <Link
            onClick={handleCancle}
              href=""
              className=" flex justify-center items-center border px-[18px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[16px] xl:text-[0.833vw] font-medium "
            >
              Cancel
            </Link>
            <button
            onClick={handleInvite}
              href=""
              className=" flex justify-center text-[#fff] bg-[#1570EF] items-center border px-[18px] py-[10px] border-[#1570EF] rounded-lg shadow1 text-[16px] xl:text-[0.833vw] font-medium "
            >
              Invite
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
