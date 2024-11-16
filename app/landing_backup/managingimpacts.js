"use client";
import Link from "next/link";
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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className="bg-white rounded-[4px] 3xl:rounded-[0.208vw] boxshadow1 mt-[30px] xl:mt-[50px] 3xl:mt-[2.604vw]">
        <div className="bg-[#1570EF] px-[15px] lg:px-[24px] xl:px-[36px] 3xl:px-[1.875vw] py-[15px] lg:py-[20px] xl:py-[26px] 3xl:py-[1.354vw]">
          <div className="block lg:flex items-center lg:justify-between text-center lg:text-start">
            <div
              className={`${myRoboto_Slab.className} text-white text-[26px] lg:text-[34px] xl:text-[42px] 3xl:text-[2.188vw]`}
            >
              Managing Impacts of COVID-19{" "}
            </div>
            <div className="col mt-2 lg:mt-0">
              <Link
                href={""}
                className="inline-flex border border-[#DAE5DD] rounded-[6px] 3xl:rounded-[0.313vw] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] px-[18px] 3xl:px-[0.938vw] py-[12px] 3xl:py-[0.625vw] text-white"
              > <i className="hexatoolrocket text-[20px] 3xl:text-[1.042vw] mr-[8px] 3xl:mr-[0.417vw]"></i>
                Remote Learning
              </Link>
            </div>
          </div>
        </div>
        <div className="py-[15px] lg:py-[24px] xl:py-[48px] 3xl:py-[2.5vw] px-[15px] lg:px-[25px] 3xl:px-[1.302vw]">
        <div className="custSlider managing-slider">
        {/* <Slider {...settings}>
          <div>sdfsdf</div>
          <div>sdfsdf</div>
          <div>sdfsdf</div>
          <div>sdfsdf</div>
        </Slider> */}
        </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[12px] 3xl:gap-[0.625vw]">
            <div className="border border-[#DAE5DD] bg-white p-[15px] lg:p-[25px] 3xl:p-[1.302vw] rounded-[4px] 3xl:rounded-[0.208vw]">
              <div className="text-[#4B586E] text-[20px] lg:text-[24px] xl:text-[1.25vw]">
                Statewide Program Investment
              </div>
              <div className="bg-[#DAE5DD] w-full h-[1px] 3xl:h-[0.052vw] mt-[20px] xl:mt-[40px] 3xl:mt-[2.083vw] mb-[12px] 3xl:mb-[0.625vw]"></div>
              <div className="flex items-center justify-between gap-[16px] 3xl:gap-[0.833vw]">
                <div className="text-[#4B586E] text-[26px] text-[34px] xl:text-[2.5vw] font-medium leading-none">
                  $172 Million
                </div>
                <div>
                  <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw]">
                    Last Year
                  </div>
                  <div className="text-[#4B586E] text-[14px] 3xl:text-[0.729vw]">
                    12% <i className="hexatoolrectangle-up text-[#04B8AD] text-[10px] 3xl:text-[0.521vw] ml-[8px] 3xl:ml-[0.417vw]"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-[#DAE5DD] bg-white p-[15px] lg:p-[25px] 3xl:p-[1.302vw] rounded-[4px] 3xl:rounded-[0.208vw]">
              <div className="text-[#4B586E] text-[20px] lg:text-[24px] xl:text-[1.25vw]">
                Device to Student Ratio
              </div>
              <div className="bg-[#DAE5DD] w-full h-[1px] 3xl:h-[0.052vw] mt-[20px] xl:mt-[40px] 3xl:mt-[2.083vw] mb-[12px] 3xl:mb-[0.625vw]"></div>
              <div className="flex items-center justify-between gap-[16px] 3xl:gap-[0.833vw]">
                <div className="text-[#4B586E] text-[26px] text-[34px] xl:text-[2.5vw] font-medium leading-none">
                  1 per 2.4
                </div>
                <div>
                  <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw]">
                    Last Year
                  </div>
                  <div className="text-[#4B586E] text-[14px] 3xl:text-[0.729vw]">
                    37% <i className="hexatoolrectangle-up text-[#04B8AD] text-[10px] 3xl:text-[0.521vw] ml-[8px] 3xl:ml-[0.417vw]"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-[#DAE5DD] bg-white p-[15px] lg:p-[25px] 3xl:p-[1.302vw] rounded-[4px] 3xl:rounded-[0.208vw]">
              <div className="text-[#4B586E] text-[20px] lg:text-[24px] xl:text-[1.25vw]">
                Student Particpiation Rate
              </div>
              <div className="bg-[#DAE5DD] w-full h-[1px] 3xl:h-[0.052vw] mt-[20px] xl:mt-[40px] 3xl:mt-[2.083vw] mb-[12px] 3xl:mb-[0.625vw]"></div>
                <div className="grid grid-cols-3">
                  <div className="col">
                    <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw] font-light inline-flex items-center"><i className="hexatoolcircle-fill mr-[4px] 3xl:mr-[0.208vw] text-[#04B8AD]"></i> Excellent</div>
                    <div className="text-[#4B586E] text-[26px] lg:text-[36px] xl:text-[1.875vw] font-medium leading-none">32%</div>
                  </div>
                  <div className="col">
                    <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw] font-light inline-flex items-center"><i className="hexatoolcircle-fill mr-[4px] 3xl:mr-[0.208vw] text-[#FFC222]"></i> Excellent</div>
                    <div className="text-[#4B586E] text-[26px] lg:text-[36px] xl:text-[1.875vw] font-medium leading-none">54%</div>
                  </div>
                  <div className="col">
                    <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw] font-light inline-flex items-center"><i className="hexatoolcircle-fill mr-[4px] 3xl:mr-[0.208vw] text-[#F37070]"></i> Excellent</div>
                    <div className="text-[#4B586E] text-[26px] lg:text-[36px] xl:text-[1.875vw] font-medium leading-none">14%</div>
                  </div>
                </div>
            </div>
            <div className="border border-[#DAE5DD] bg-white p-[15px] lg:p-[25px] 3xl:p-[1.302vw] rounded-[4px] 3xl:rounded-[0.208vw]">
              <div className="text-[#4B586E] text-[20px] lg:text-[24px] xl:text-[1.25vw]">
                Impact to Composite Index
              </div>
              <div className="bg-[#DAE5DD] w-full h-[1px] 3xl:h-[0.052vw] mt-[20px] xl:mt-[40px] 3xl:mt-[2.083vw] mb-[12px] 3xl:mb-[0.625vw]"></div>
              <div className="grid grid-cols-3">
                  <div className="col">
                    <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw] font-light inline-flex items-center"><i className="hexatoolcircle-fill mr-[4px] 3xl:mr-[0.208vw] text-[#04B8AD]"></i> Excellent</div>
                    <div className="text-[#4B586E] text-[26px] lg:text-[36px] xl:text-[1.875vw] font-medium leading-none">32%</div>
                  </div>
                  <div className="col">
                    <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw] font-light inline-flex items-center"><i className="hexatoolcircle-fill mr-[4px] 3xl:mr-[0.208vw] text-[#FFC222]"></i> Excellent</div>
                    <div className="text-[#4B586E] text-[26px] lg:text-[36px] xl:text-[1.875vw] font-medium leading-none">54%</div>
                  </div>
                  <div className="col">
                    <div className="text-[#4B586E] text-[12px] 3xl:text-[0.625vw] font-light inline-flex items-center"><i className="hexatoolcircle-fill mr-[4px] 3xl:mr-[0.208vw] text-[#F37070]"></i> Excellent</div>
                    <div className="text-[#4B586E] text-[26px] lg:text-[36px] xl:text-[1.875vw] font-medium leading-none">14%</div>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
