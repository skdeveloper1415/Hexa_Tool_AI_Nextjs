"use client"
import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { toast } from "react-toastify";
import { CreateActiveClassAPI, updateActiveClassAPI } from "../../app/activeCreateClassAPI";
import { getDataFromLocalStorage } from "../helper/commonFunction";

function NewClasses({ onhide, visible, getListOfClass, editData}) {
  
    const [subjects, setSubjects] = useState(null);
    const [className, SetClassName] = useState('');
    const [room, setRoom] = useState('');
    const [section, setSection] = useState('');
    const [error, setError] = useState({})
    const [isCreated, setIsCreated] = useState(false)
    const [loading, setLoading] =useState(false)


    useEffect(() => {
        if(editData?.id){
            SetClassName(editData.name);
            setSection(editData.section);
            setSubjects(editData.descriptionHeading);
            setRoom(editData.room);
        }
    }, [editData])
    
    const handleCancel = () =>{
        onhide();
        SetClassName('');
        setSection('');
        setSubjects('');
        setRoom('');
        setError({})
    }

    const validate = () => {
        let err = {}
        let isErr = false;
        if (!className) {
          err.className = 'Please Enter Class Name.'
          isErr = true
        }
    
        if (!subjects ||
            subjects.trim().length == 0) {
          err.subjects = 'Please Enter Subject.'
          isErr = true;
    
        }
        if (!section || section.trim() === "") {
          err.section = 'Please Enter Section.'
          isErr = true
        }
        if (!room) {
          err.room = 'Please Enter Room.'
          isErr = true
        }
        setError(err)
        return isErr
      }
    

    const CreateClass = async () => {

        try {
        let accessToken=getDataFromLocalStorage("access_token");

        if (validate()) {
            return
        }
        setIsCreated(true)

        const payload = {
            accessToken: accessToken,
            "name": className,
            "section": section,
            "descriptionHeading":subjects,
            "room": room,
            "ownerId": "me",
        }
if(editData?.id){

    const response = await updateActiveClassAPI({...payload ,ownerId:editData?.ownerId,courseId:editData?.id });
    setLoading(true)
      if (response && response?.code == 200) {
        toast.success('Class Updated successfully')
        onhide()
        getListOfClass();
        SetClassName('')
        setSection('')
        setSubjects('')
        setRoom('')
        setError({})
        setLoading(false);
        setIsCreated(false)
      } else if(response.code == 500){
        toast.error(response.message ||'Something Went Wrong')
        setLoading(false);
        setIsCreated(false)
      }
}else{

    const response = await CreateActiveClassAPI(payload);
    setLoading(true)
      if (response && response?.code == 200) {
        toast.success('Class created successfully')
        onhide()
        getListOfClass();
        SetClassName('')
        setSection('')
        setSubjects('')
        setRoom('')
        setError({})
        setLoading(false);
        setIsCreated(false)
      } else if(response.code == 500){
        toast.error(response.message ||'Something Went Wrong')
        setLoading(false);
        setIsCreated(false)
      }
}
        } catch (error) {
          const message = error?.message ?? "Something went wrong"
          toast.error(message)
          setIsCreated(false)
        }
      }


    return (
        <div>
            <Dialog className="customHeader customm w-[800px]  " header=" " visible={visible} style={{ width: '50vw' }} onHide={onhide} position="left">
                <div className="px-[20px]  ">
                    <div className="py-[10px]">
                        {/* <div className=" flex justify-center ">
                            <Image src="/images/Featured icon.svg" width={38} height={38} alt=""></Image>
                        </div> */}
                    </div>
                    <div
                    // onClick={()=> CreateClass()} 
                    className="flex flex-col gap-8 xl:gap-7 3xl:gap-[1.667vw]">
                        <div className="text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-medium ">
                            Create New Class
                        </div>

                        <div className="flex flex-col gap-5 custom ">

                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]" htmlFor="username">Class Name<span className="text-[red]">*</span></label></div>
                                <div className="card flex justify-content-center  ">
                                    <InputText className="w-full rounded-lg" placeholder="Type here" value={className} onChange={(e) => SetClassName(e.target.value)} />
                                </div>
                                {error.className ? <span style={{ color: 'red' }}>{error.className}</span> : <></>}

                            </div>

                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]" htmlFor="username">Section<span className="text-[red]">*</span></label></div>
                                <div className="card flex justify-content-center ">
                                    <InputText className="w-full rounded-lg" placeholder="Type here" value={section} onChange={(e) => setSection(e.target.value)} />
                                </div>
                                {error.section ? <span style={{ color: 'red' }}>{error.section}</span> : <></>}


                            </div>


                            <div className="">
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                 Subject<span className="text-[red]">*</span>

                                </label>
                                {/* <Dropdown value={subjects} onChange={(e) => setSubjects(e.value)} options={subject} optionLabel="name"
                                    placeholder="Select here" className="w-full md:w-14rem rounded-lg" /> */}
                                <InputText className="w-full rounded-lg" placeholder="Type here" value={subjects} onChange={(e) => setSubjects(e.target.value)} />
                                {error.subjects ? <span style={{ color: 'red' }}>{error.subjects}</span> : <></>}

                            </div>

                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]" htmlFor="username">Room<span className="text-[red]">*</span></label></div>
                                <div className="card flex justify-content-center ">
                                    <InputText className="w-full rounded-lg " placeholder="Type here" value={room} onChange={(e) => setRoom(e.target.value)} />
                                </div>
                                {error.room ? <span style={{ color: 'red' }}>{error.room}</span> : <></>}

                            </div>


                        </div>

                    </div>
                    <div className="flex  gap-[12px] justify-end pt-[30px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
                        <div  onClick={handleCancel} className=" flex justify-center items-center border-2 px-[18px] cursor-pointer   py-[10px] border-[#C6CBD2] rounded-lg ">
                            <button  className="text-[#344054] text-[16px] xl:text-[0.833vw] font-medium ">Cancel</button>
                        </div>
                        <div onClick={() => !isCreated && CreateClass()} className=" flex justify-center bg-[#1570EF]  items-center border-2 cursor-pointer px-[18px] py-[10px] border-[#1570EF] rounded-lg" disabled={isCreated}>
                            <button className="text-[#fff] text-[16px] xl:text-[0.833vw] font-medium">
                           { isCreated ? "Please Wait..." : "Save"}
                                </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default NewClasses
