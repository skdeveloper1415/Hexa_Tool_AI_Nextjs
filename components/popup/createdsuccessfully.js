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
export default function CreatedSuccessfully({ onhide, visible }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <Dialog
        className="customHeader customm w-[800px] header-hide "
        header=" "
        visible={visible}
        style={{ width: "30.917vw" }}
        onHide={onhide}
        draggable={false}
        resizable={false}
      >
        <div className="pt-[32px] xl:pt-[1.458vw] 3xl:pt-[1.458vw] px-[20px] xl:px-[1.042vw] 3xl:px-[1.042vw]">
          <div className="">
         
               <div className=" flex justify-center ">
                            <Image src="/images/files_icon/succesfully_icon.svg" width={48} height={48} alt=""></Image>
           </div>
            <div className="mt-[32x] 3xl:mt-[1.667vw]">
              <div className=" text-center flex flex-col items-center justify-center relative">
              
              <div className="text-[#101828] text-[18px] xl:text-[0.938vw] 3xl:text-[0.938vw] font-semibold">
              Your Document have been Uploaded Succesfully
            </div>
             
             
                    
              </div>
             
              
            </div>
  <div className="flex  gap-[12px] justify-center pt-[40px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
              

              <div className=" flex justify-center bg-[#1570EF]  items-center border-2 cursor-pointer px-[18px] xl:px-[0.938vw] 3xl:px-[0.938vw] py-[10px] xl:py-[0.521vw] 3xl:py-[0.521vw] border-[#1570EF] rounded-lg">
                <button className="text-[#fff] text-[16px] xl:text-[0.833vw] font-medium"   onClick={onhide}>
                    Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
