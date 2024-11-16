"use client";
import Link from "next/link";
import Image from "next/image";
import { Roboto_Slab } from "next/font/google";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const myRoboto_Slab = Roboto_Slab({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="text-center text-[#4B586E] max-w-[1300px] 3xl:max-w-[67.708vw] mx-auto mt-[50px] 3xl:mt-[2.604vw]">
      <div className={`${myRoboto_Slab.className} text-[30px] xl:text-[36px] 3xl:text-[2.188vw] landing-none`}>Explore Analytical Areas</div>
      <div className="text-[14px] 2xl:text-[16px] 3xl:text-[0.938vw] mt-[20px] 3xl:mt-[1.042vw]">Introducing a groundbreaking Gen AI Classroom that enhances Google Classroom by providing AI powered classroom management and automated grading assistance, revolutionizing the way teachers manage and optimize student learning experiences. Explore the Gen AI modules and Analytics seamlessly with the advanced product</div>
      </div>
      
      <div className="custSlider exploreAnalyticalAreas px-[55px] 3xl:px-[2.865vw] mt-[45px] 3xl:mt-[2.344vw]">
        <Slider {...settings}>
          <div className="boxshadow2 bg-white py-[30px] 3xl:py-[1.563vw] rounded-[4px] 3xl:rounded-[0.208vw]">
            <div className="flex flex-col items-center justify-center space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
              <div className="col icon">
                <Image
                  src={"/images/landing/genAi_icon1.svg"}
                  width={"118"}
                  height={"122"}
                  alt="icon"
                />
              </div>
              <div className="text-[#344054] text-[18px] xl:text-[22px] 3xl:text-[1.458vw]">
              Brix AI Apps
              </div>
              <div className="col">
                <Link
                  href={"/aiapps"}
                  className="inline-flex items-center bg-[#1B55AF] rounded-[8px] 3xl:rounded-[0.417vw] px-[18px] 3xl:px-[0.938vw] py-[10px] 3xl:py-[0.521vw] text-white text-[14px] xl:text-[16px] 3xl:text-[0.833vw]"
                >
                  <i className="hexatoolexport text-[16px] 3xl:text-[0.938vw] mr-[8px] 3xl:mr-[0.417vw]"></i>{" "}
                  Open
                </Link>
              </div>
            </div>
          </div>
          <div className="boxshadow2 bg-white py-[30px] 3xl:py-[1.563vw] rounded-[4px] 3xl:rounded-[0.208vw]">
            <div className="flex flex-col items-center justify-center space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
              <div className="col icon">
                <Image
                  src={"/images/landing/roster_icon1.svg"}
                  width={"123"}
                  height={"122"}
                  alt="icon"
                />
              </div>
              <div className="text-[#344054] text-[18px] xl:text-[22px] 3xl:text-[1.458vw]">
                Roster Automation
              </div>
              <div className="col">
                <Link
                  href={""}
                  className="inline-flex items-center bg-[#1B55AF] rounded-[8px] 3xl:rounded-[0.417vw] px-[18px] 3xl:px-[0.938vw] py-[10px] 3xl:py-[0.521vw] text-white text-[14px] xl:text-[16px] 3xl:text-[0.833vw]"
                >
                  <i className="hexatoolexport text-[16px] 3xl:text-[0.938vw] mr-[8px] 3xl:mr-[0.417vw]"></i>{" "}
                  Open
                </Link>
              </div>
            </div>
          </div>
          <div className="boxshadow2 bg-white py-[30px] 3xl:py-[1.563vw] rounded-[4px] 3xl:rounded-[0.208vw]">
            <div className="flex flex-col items-center justify-center space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
              <div className="col icon">
                <Image
                  src={"/images/landing/manage_icon1.svg"}
                  width={"123"}
                  height={"122"}
                  alt="icon"
                />
              </div>
              <div className="text-[#344054] text-[18px] xl:text-[22px] 3xl:text-[1.458vw]">
                Manage Class
              </div>
              <div className="col">
                <Link
                  href={"/manageclass"}
                  className="inline-flex items-center bg-[#1B55AF] rounded-[8px] 3xl:rounded-[0.417vw] px-[18px] 3xl:px-[0.938vw] py-[10px] 3xl:py-[0.521vw] text-white text-[14px] xl:text-[16px] 3xl:text-[0.833vw]"
                >
                  <i className="hexatoolexport text-[16px] 3xl:text-[0.938vw] mr-[8px] 3xl:mr-[0.417vw]"></i>{" "}
                  Open
                </Link>
              </div>
            </div>
          </div>
          <div className="boxshadow2 bg-white py-[30px] 3xl:py-[1.563vw] rounded-[4px] 3xl:rounded-[0.208vw]">
            <div className="flex flex-col items-center justify-center space-y-[34px] xl:space-y-[42px] 3xl:space-y-[2.188vw]">
              <div className="col icon">
                <Image
                  src={"/images/landing/dashboard_icon1.svg"}
                  width={"123"}
                  height={"122"}
                  alt="icon"
                />
              </div>
              <div className="text-[#344054] text-[18px] xl:text-[22px] 3xl:text-[1.458vw]">
                Dashboard
              </div>
              <div className="col">
                <Link
                  href={"/dashboard"}
                  className="inline-flex items-center bg-[#1B55AF] rounded-[8px] 3xl:rounded-[0.417vw] px-[18px] 3xl:px-[0.938vw] py-[10px] 3xl:py-[0.521vw] text-white text-[14px] xl:text-[16px] 3xl:text-[0.833vw]"
                >
                  <i className="hexatoolexport text-[16px] 3xl:text-[0.938vw] mr-[8px] 3xl:mr-[0.417vw]"></i>{" "}
                  Open
                </Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}
