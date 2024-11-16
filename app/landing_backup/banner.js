"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";
import Profile from "./profile";
import { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../../components/helper/commonFunction";

const myRoboto_Slab = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  const [tokenValue,setTokenValue]=useState(null)
  useEffect(() => {
    let  token = getDataFromLocalStorage("access_token");
    setTokenValue(token)
}, []);
  return (
    <>
      <div className="banner-wapper">
        <div className="pt-[15px] lg:pt-[50px] 3xl:pt-[2.604vw]">
          <div className="flex flex-col items-end">
            <div className="gradient px-[100px] 3xl:px-[5.208vw] py-[20px] 3xl:py-[1.042vw]">
              <div className="flex items-center gap-[15px] xl:gap-[40px] 3xl:gap-[2.083vw]">
                {/* <div className="col ">
                  <Link href={""} className="inline-flex items-center justify-center rounded-full w-[48px] 3xl:w-[2.5vw] h-[48px] 3xl:h-[2.5vw] bg-[#FBF9F7] relative">
                    <i className="hexatoolnotification text-[16px] 3xl:text-[0.833vw] text-[#777777]"></i>
                    <div className="absolute -right-[6px] 3xl:-right-[0.313vw] -top-[0.313vw] 3xl:-top-[6px]">
                    <span  className="inline-flex items-center justify-center rounded-full w-[24px] 3xl:w-[1.25vw] h-[24px] 3xl:h-[1.25vw] bg-[#D6B664] text-[11px] 3xl:text-[0.573vw] text-white font-semibold">3</span>
                    </div>
                  </Link>
                </div> */}
                <div>
                {tokenValue &&<Profile />}
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-[15px] lg:pl-[122px] 3xl:pl-[6.354vw]">
          <div className="banner-logo mt-[19px] 3xl:mt-[0.99vw]">
            <Link href={""} className="inline-block">
              <Image
                src={"/images/landing/banner_logo.svg"}
                width={"442"}
                height={"81"}
                alt="Banner"
              />
            </Link>
          </div>
          <div className="w-full lg:max-w-[900px] 3xl:max-w-[46.875vw] mt-[30px] lg:mt-[20px] 2xl:mt-[40px] 3xl:mt-[4.219vw]">
            <div
              className={`${myRoboto_Slab.className} text-white text-[32px] lg:text-[36px] 2xl:text-[48px] 3xl:text-[2.5vw] font-light landing-[1.2]`}
            >
              Welcome to <span className="font-medium">Brix AI Classroom</span>{" "}
              for <span className="font-medium text-[#DAEEFF]">GCSD</span>
            </div>
            <div className="text-white text-[14px] lg:text-[19px] 3xl:text-[0.99vw] mt-[19px] 3xl:mt-[0.99vw]">Introducing a groundbreaking Gen AI Classroom that enhances Google Classroom by providing AI powered classroom management and automated grading assistance, revolutionizing the way teachers manage and optimize student learning experiences</div>
            <div className="flex items-center gap-[14px] lg:gap-[18px] 3xl:gap-[0.938vw] mt-[23px] 3xl:mt-[1.198vw]">
              <div className="col">
                <Link  href={"/dashboard"} className="inline-flex items-center bg-[#1570EF] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[16px] lg:px-[20px] 3xl:px-[1.042vw] text-white text-[14px] lg:text-[16px] 3xl:text-[0.833vw] boxshadow4">Classroom Analytics <i className="hexatoolfavorite-chart ml-[8px] 3xl:ml-[0.417vw] text-[18px] lg:text-[24px] 3xl:text-[1.25vw]"></i></Link>
              </div>
              <div className="col">
                <Link href={""} className="inline-flex items-center bg-[#EFF8FF] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[16px] lg:px-[20px] 3xl:px-[1.042vw] text-[#4B586E] text-[14px] lg:text-[16px] 3xl:text-[0.833vw] boxshadow4">District Profile <i className="hexatoolcpu-charge text-[#1570EF] ml-[8px] 3xl:ml-[0.417vw] text-[18px] lg:text-[24px] 3xl:text-[1.25vw]"></i></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-[40px] lg:mt-[12px] 3xl:mt-[0.625vw] animation_arrow">
          <Image src={"/images/landing/animation_arrow.svg"} width={"19"} height={"45"} className="Arrow mx-auto bounce" alt="Arrow" />
        </div>
      </div>
    </>
  );
}
