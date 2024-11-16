"use client"
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Image from "next/image";

function Assignmentsuccessfully({ onhide, visible, }) {

    return (
        <div>
        <Dialog
            className="custpopup  w-full mx-2 lg:w-[500px] 3xl::w-[31.25vw]"
            visible={visible}
            onHide={onhide}
        >
            <div className="">
                <div className="flex justify-center">
                <Image alt="Active Status" src="/images/successful_logo.svg" width="48" height="48" />
                </div>
                <div className="flex justify-center text-[#101828] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-semibold  pb-[32px] xl:pb-[30px] 3xl:pb-[1.667vw] pt-[16px] xl:pt-[14px] 3xl:pt-[0.625vw]">
                New assignment have been created successfully!!!
                </div>
                <div className="flex justify-center items-center gap-[10px] xl:gap-[8px] 3xl:gap-[0.521vw]">
                    <button onClick={onhide} className=' 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] '>
                    Close
                    </button>
                </div>
            </div>
        </Dialog>
    </div>
    )
}

export default Assignmentsuccessfully
