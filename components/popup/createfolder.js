"use client"
import React, { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import { toast } from "react-toastify";
export default function CreateFolder({ onhide, visible }) {
    const [value, setValue] = useState({
        folderName : "",
        folderType : "",
        Description:""
    });
  const [error, setError] = useState({})



    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClear = (e) => {
        setValue({
            folderName : "",
            folderType : "",
            Description:""
       })
       onhide
       setError({})
    }

    const validate = () => {
        let err = {}
        let isErr = false;
    
        if (value.folderName === '' ) {
          err.folderName = 'Please Enter Folder Name.'
          isErr = true
        }
        if (value.folderType === '') {
          err.folderType = 'Please Enter Folder Type.'
          isErr = true
        }
        if (value.Description === "") {
          err.Description = 'Please Enter Description.'
          isErr = true
        }
       
        setError(err)
        return isErr
      }

      const handleCreateFolder = async (e) => {
        e.preventDefault();
        if (validate()) {
          return
        }
      
        try {
          const payload = {
            "folderName":value.folderName,
            "folderType":value.folderType,
            "Description": value.Description,
          }
        //   const response = await generateMathStoryWordProblemAPI(payload);
          const response = null;
          if (response.data.code == '200') {
    
            let responseData = response.data.data ?? [];
          
            toast.error("Foler Created Successfully");
            handleClear()

          } else {
            toast.error("Something Went Wrong");
            setLoading(false);
          }
        } catch (error) {
        console.log('error:', error);
          if(error.message!='Operation canceled by the user.'){
            toast.error("Something Went Wrong");
            setLoading(false);
          }
        }
      };

    
    return (
        <div>
            <Dialog className="customHeader customm w-[800px] header-hide " header=" " visible={visible} style={{ width: '40vw' }} onHide={()=>handleClear()} draggable={false} resizable={false}>
                <div className="pt-[40px]">
                <div className="px-[20px]  ">
                    <div className="py-[10px]">
                        <div className=" flex justify-center ">
                            <Image src="/images/files_icon/featured_icon_blue.svg" width={48} height={48} alt=""></Image>
                        </div>
                    </div>
                    <div
                        className="flex justify-center flex-col gap-8 xl:gap-7 3xl:gap-[1.667vw]">
                        <div className="flex justify-center text-[#101828] text-[18px] xl:text-[20px] 3xl:text-[0.938vw] font-semibold ">
                             Create New Folder
                        </div>

                        <div className="flex flex-col gap-5 custom ">

                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] xl:text-[16px] text-[14px] text-[#344054] font-normal block mb-[6px]" htmlFor="username">Folder Name<span className="text-[red]">*</span></label></div>
                                <div className="card flex justify-content-center  ">
                                    <InputText className="w-full rounded-lg" placeholder="Type here" value={value.folderName} 
                                      name="folderName"
                                    onChange={handleChange} />
                                    
                                </div>
                                {error.folderName ? <span style={{ color: 'red' }}>{error.folderName}</span> : <></>}
                            </div>
                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] xl:text-[16px] text-[14px] text-[#344054] font-normal block mb-[6px]" htmlFor="username">Folder Type<span className="text-[red]">*</span> </label></div>
                                <div className="card flex justify-content-center  ">
                                    <InputText className="w-full rounded-lg" placeholder="Type here"  value={value.folderType}  name="folderType"
                                    onChange={handleChange} />
                                </div>
                                {error.folderType ? <span style={{ color: 'red' }}>{error.folderType}</span> : <></>}
                            </div>
                            <div className="">
                                <div>
                                    <label className="3xl:text-[0.729vw] xl:text-[16px] text-[14px] text-[#344054] font-normal block mb-[6px]" htmlFor="username"> Description</label></div>
                                <div className="card flex justify-content-center  ">
                                    <InputTextarea
                                        placeholder="Enter a description..."
                                        value={value.Description}
                                        name="Description"
                                        onChange={handleChange} 
                                        rows={5}
                                        cols={5}
                                        className="w-full rounded-lg"
                                    />                                
                                </div>
                                {error.Description ? <span style={{ color: 'red' }}>{error.Description}</span> : <></>}
                            </div>
                        </div>

                    </div>
                    <div className="flex  gap-[12px] justify-end pt-[30px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
                    
                            <Link href='' className="text-[#344054] text-[16px] xl:text-[0.833vw] font-medium px-[18px] cursor-pointer  py-[10px] border border-[#C6CBD2] rounded-lg "  onClick={onhide}>Cancel</Link>
                       
                        <div onClick={(e)=>handleCreateFolder(e)} className=" flex justify-center bg-[#1570EF]  items-center border-2 cursor-pointer px-[18px] py-[10px] border-[#1570EF] rounded-lg">
                            <button className="text-[#fff] text-[16px] xl:text-[0.833vw] font-medium">
                            Create Folder
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </Dialog>
        </div>
    )
}
