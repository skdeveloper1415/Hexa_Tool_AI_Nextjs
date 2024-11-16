import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Image from "next/image";

function QRcode({ visible, setVisible }) {

    const onHide =()=>{
        setVisible(false)
    }
  return (
    <>
      <Dialog
        visible={visible}

        className="customdialog w-[300px] xl:w-[400px] 3xl:w-[22vw]"
        draggable={false}
      >
        <div>
            <div>  <i className="hexatoolclose-circule text-[#fc9f43] text-[34px] xl:text-[34px] 3xl:text-[1.771vw] flex justify-end absolute -right-4 -top-4 font-thin bg-[#FFF2E5] rounded-full" onClick={onHide}></i></div>
          <div className="flex justify-center items-center pt-[30px] xl:pt-[30px] 3xl:pt-[1.563vw]">
            <i className="hexatoolright-tick-ouline text-[#E57200] text-[34px] xl:text-[34px] 3xl:text-[1.771vw] bg-[#FFF2E5] rounded-full "></i>
          </div>
          <div className="flex justify-center items-center text-[18px]  xl:text-[18px] 3xl:text-[0.938vw] font-medium text-[#101828] pt-[14px] xl:pt-[14px] 3xl:pt-[0.729vw]">
            Item QR Code
          </div>
          <div className="flex justify-center items-center py-[20px] xl:py-[20px] 3xl:py-[1.042vw] cursor-pointer">
            <Image
              src={"/images/QR code.svg"}
              width={"80"}
              height={"80"}
              alt=""
            />
              {" "}

          </div>
          <div className="text-[16px]  xl:text-[16px] 3xl:text-[0.833vw]  text-[#344054] ">
          To Download the QR Code, right click the image and select {`"Save Image As"`}
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default QRcode;
