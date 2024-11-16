"use client";
import Link from "next/link";
import Image from "next/image";
import { Roboto_Slab } from "next/font/google";

const myRoboto_Slab = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <>
      <div className={`${myRoboto_Slab.className} text-white text-[22px] lg:text-[28px] 3xl:text-[1.458vw] bg-[#162644] pt-[19px] 3xl:pt-[0.99vw] w-full max-w-[250px] lg:max-w-[437px] 3xl:max-w-[22.76vw] rounded-t-[10px] 3xl:rounded-t-[0.521vw] text-center mx-auto relative z-10`}>Finger tip Facts</div>
      <div className="rounded-[10px] 3xl:rounded-[0.521vw] bg-[#162644] boxshadow3 py-[45px] 3xl:py-[2.344vw] fingertipfacts">
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 divide-x divide-[#8DAAD7] gap-[30px] 2xl:gap-0">
          <div className="flex flex-col items-center justify-start space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
            <div className="col icon1">
              <Image
                src={"/images/landing/total_icon.svg"}
                width={"120"}
                height={"120"}
                alt="icon"
              />
            </div>
            <div className="text-white text-[18px] xl:text-[22px] 3xl:text-[1.25vw] font-light h-full leading-[1.2] 3xl:leading-[3.125vw] flex flex-col items-center">
              Total Enrollment
            </div>
            <div className="col">
              <div className="text-white text-[34px] lg:text-[48px] 3xl:text-[2.5vw] font-medium leading-none">
                10,242
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
            <div className="col icon2">
              <Image
                src={"/images/landing/student_icon.svg"}
                width={"122"}
                height={"122"}
                alt="icon"
              />
            </div>
            <div className="text-white text-[18px] xl:text-[22px] 3xl:text-[1.25vw] font-light max-w-[200px] 3xl:max-w-[10.417vw] w-full text-center leading-[1.2] 3xl:leading-[1.563vw] flex flex-col items-center">
              Student Needing Special Services
            </div>
            <div className="col">
              <div className="text-white text-[34px] lg:text-[48px] 3xl:text-[2.5vw] font-medium leading-none">
                274
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
            <div className="col icon3">
              <Image
                src={"/images/landing/student_ration_icon.svg"}
                width={"125"}
                height={"122"}
                alt="icon"
              />
            </div>
            <div className="text-white text-[18px] xl:text-[22px] 3xl:text-[1.25vw] font-light w-full text-center leading-none lg:leading-[1.2] 3xl:leading-[1.563vw] h-full leading-[60px] 3xl:leading-[3.125vw] flex flex-col items-center">
            Student Teacher Ratio
            </div>
            <div className="col">
              <div className="text-white text-[34px] lg:text-[48px] 3xl:text-[2.5vw] font-medium leading-none">
                11.62
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
            <div className="col icon4">
              <Image
                src={"/images/landing/school_icon.svg"}
                width={"130"}
                height={"122"}
                alt="icon"
              />
            </div>
            <div className="text-white text-[18px] xl:text-[22px] 3xl:text-[1.25vw] font-light w-full text-center leading-[1.2] 3xl:leading-[1.563vw] h-full leading-[60px] 3xl:leading-[3.125vw] flex flex-col items-center">
            School
            </div>
            <div className="col">
              <div className="text-white text-[34px] lg:text-[48px] 3xl:text-[2.5vw] font-medium leading-none">
                17
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
            <div className="col icon5">
              <Image
                src={"/images/landing/attendance_icon.svg"}
                width={"140"}
                height={"122"}
                alt="icon"
              />
            </div>
            <div className="text-white text-[18px] xl:text-[22px] 3xl:text-[1.25vw] font-light w-full text-center leading-[1.2] 3xl:leading-[1.563vw] h-full leading-[60px] 3xl:leading-[3.125vw] flex flex-col items-center">
            Attendance rate
            </div>
            <div className="col">
              <div className="text-white text-[34px] lg:text-[48px] 3xl:text-[2.5vw] font-medium leading-none">
              93.8%
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
            <div className="col icon6">
              <Image
                src={"/images/landing/graduation_icon.svg"}
                width={"125"}
                height={"122"}
                alt="icon"
              />
            </div>
            <div className="text-white text-[18px] xl:text-[22px] 3xl:text-[1.25vw] font-light w-full text-center leading-[1.2] 3xl:leading-[1.563vw] h-full leading-[60px] 3xl:leading-[3.125vw] flex flex-col items-center">
            Graduation Rate
            </div>
            <div className="col">
              <div className="text-white text-[34px] lg:text-[48px] 3xl:text-[2.5vw] font-medium leading-none">
              89.7%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
