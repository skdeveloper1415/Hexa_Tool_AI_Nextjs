"use client";
import React, { useState } from "react";
import { Roboto, Roboto_Slab } from "next/font/google";
import Footer from "./footer";
import Banner from "./banner";
import Fingertipfacts from "./fingertipfacts";
import ExploreAnalyticalAreas from "./exploreanalyticalareas";
import Managingimpacts from "./managingimpacts";

const myRoboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});


export default function Page() {
  const scrollToTop = () => {
    if (window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const handleClick = () => {
    window.scrollBy({ 
      top: window.innerHeight, 
      behavior: 'smooth' 
    });
  };
  return (
    <>
      <div className={`${myRoboto.className} bg-[#F2F4F9]`}>
      <Banner handleClick={()=>handleClick} />
        <div className="px-[15px] lg:px-[50px] xl:px-[100px] 3xl:px-[5.208vw]">
          <div className="mt-[-200px] lg:mt-[-100px] xl:mt-[-230px] 2xl:mt-[-150px] 3xl:mt-[-14.583vw] custMrg">
          <Fingertipfacts />
          </div>
          <ExploreAnalyticalAreas />
          <Managingimpacts />
        </div>
        <Footer onClick={scrollToTop} />
        
      </div>
    </>
  );
}
