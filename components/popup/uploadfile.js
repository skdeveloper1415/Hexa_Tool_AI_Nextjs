"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import CreatedSuccessfully from "./createdsuccessfully";
import { color } from "echarts";
import { FileSize } from "../helper/commonFunction";
import { toast } from "react-toastify";
export default function Uploadfile({ onhide, visible }) {
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState({})
  

  const handleClear = () => {
    setSelectedFiles([])
    onhide
    setError({})
  };

  const handleSelectedFiles = (event) => {
    setSelectedFiles(event.files);
    if(event.files){
      setError({})
    }
  };

  const validate = () => {
    let err = {}
    let isErr = false;

    if (selectedFiles.length == 0  ) {
      err.selectedFiles = 'Please Select File.'
      isErr = true
    }
    // if (value.folderType === '') {
    //   err.folderType = 'Please Enter Folder Type.'
    //   isErr = true
    // }
   
    setError(err)
    return isErr
  }

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (validate()) {
      return
    }
  
    try {
      // const payload = {
      //   "folderName":value.folderName,
      //   "folderType":value.folderType,
      //   "Description": value.Description,
      // }
    //   const response = await generateMathStoryWordProblemAPI(payload);
      const response = null;
      if (response == '200') {

        // let responseData = response.data.data ?? [];
      
        handleClear()
        setCreatedSuccessfully(true)

      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
    console.log('error:', error);
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something Went Wrong");
      }
    }
  };



  return (
    <div>
      <Dialog
        className="customHeader customm w-[800px] header-hide "
        header=" "
        visible={visible}
        style={{ width: "30.917vw" }}
        onHide={handleClear}
        draggable={false}
        resizable={false}
      >
        <div className="pt-[32px] xl:pt-[1.458vw] 3xl:pt-[1.458vw] px-[20px] xl:px-[1.042vw] 3xl:px-[1.042vw]">
          <div className="">
            <div className="flex justify-between items-center">
                <div>
              <div className="text-[#344054] text-[20px] xl:text-[24px] 3xl:text-[1.25vw] font-semibold ">
                Upload
              </div>
              <div className="text-[#344054] text-[15px] xl:text-[16px] 3xl:text-[0.833vw] font-normal ">
                     Upload a CSV to import vendors data to your Portal.
              </div>
              </div>
              <Link href='' onClick={onhide} className="text-[#344054] text-[20px] xl:text-[26px] 3xl:text-[1.25vw] font-normal"><i className="hexatoolclose-circule"></i></Link>
            </div>
            <div className="mt-[32x] 3xl:mt-[1.667vw]">
              <div className="custom_upload_btn text-center h-[300px] flex flex-col items-center justify-center relative">
              
              <Image
                      src={"/images/files_icon/upload_img.svg"}
                      width={"150"}
                      height={"150"}
                      alt="icon"
                    />
              <FileUpload  onSelect={handleSelectedFiles}  maxFileSize={4194304}  mode="basic" name="demo[]" url="/api/upload" accept="image/*"   />
              <div className="text-[#667085] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-semibold">
                          Drag CSV here
                    </div>
                    <div className="text-[#667085] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-normal">
                    or, click to browse (4 MB max)
                    </div>
              </div>
              {
                selectedFiles.length > 0? <div className="flex justify-between mt-[10px] bg-[#eee] border p-[10px] text-[#667085] xl:p-[10px] 3xl:p-[0.521vw] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-semibold rounded-lg">
                {selectedFiles[0]?.name}   {FileSize(selectedFiles[0]?.size)}
                <i className="pi pi-trash cursor-pointer" onClick={()=> setSelectedFiles([])} style={{color:'#d95858'}}></i>
          </div> : null
              }
             {error.selectedFiles ? <span style={{ color: 'red' }}>{error.selectedFiles}</span> : <></>}
              <div className="w-full">
           
            <Divider layout="horizontal" className="flex my-[16px] xl:my-[0.833vw] 3xl:my-[0.833vw]" align="center">
                <div className="text-[#667085] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-normal">OR</div>
            </Divider>

            <div>
            <div className="text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-semibold ">
                     Upload from URL
              </div>
              <div className="flex gap-2 mt-[8px] custom_inputgroup">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon text-[#667085] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-normal">
                     http://
                </span>
                <InputText placeholder="Username" />
            </div>
            <Link href="" className="border border-[#C6CBD2] text-[#344054] text-[16px] xl:text-[0.833vw] font-medium px-[18px] xl:px-[0.938vw] 3xl:px-[0.938vw] cursor-pointer py-[10px] xl:py-[0.521vw] 3xl:py-[0.521vw] rounded-lg">Upload</Link>
            </div>
            </div>
        </div>
            </div>
  <div className="flex  gap-[12px] justify-end pt-[40px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
              <Link
                href=""
                className="text-[#344054] text-[16px] xl:text-[0.833vw] font-medium px-[18px] xl:px-[0.938vw] 3xl:px-[0.938vw] py-[10px] xl:py-[0.521vw] 3xl:py-[0.521vw] border border-[#C6CBD2] rounded-lg "
                onClick={onhide}
              >
                Cancel
              </Link>

              <div onClick={(e) => handleCreateFolder(e) } className=" flex justify-center bg-[#1570EF]  items-center border-2 cursor-pointer px-[18px] xl:px-[0.938vw] 3xl:px-[0.938vw] py-[10px] xl:py-[0.521vw] 3xl:py-[0.521vw] border-[#1570EF] rounded-lg">
                <button className="text-[#fff] text-[16px] xl:text-[0.833vw] font-medium" >
                Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      
      <CreatedSuccessfully
        visible={createdSuccessfully}
        setTopicvalue={setCreatedSuccessfully}
        onhide={() => setCreatedSuccessfully(false)}
      />
    </div>
  );
}
