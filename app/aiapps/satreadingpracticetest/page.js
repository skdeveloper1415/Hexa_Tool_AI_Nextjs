"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import { generateSATPracTestAPI } from "../../actions/SATReadingPracticeTest";
import { toast } from "react-toastify";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const items = [{ label: `${AppTitle.satreadingpracticetest}`, url: "" }];
  const home = {
    label: "BrixAI Apps",
    template: () => (
      <Link href="/">
        <span className="text-primary font-semibold">BrixAI Apps</span>
      </Link>
    ),
  };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [responseContent, setResponseContent] = useState([]);
  const [responseTitle, setResponseTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const contentRef = useRef();
  const appId = AppId.satreadingpracticetest;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("");
  const [isShowHide, setIsShowHide] = useState(false); 
  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await getIpAddress();
      setIp(ip);
    };
    fetchIpAddress();
  }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(
    attempt,
    ip,
    appId
  );

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await generateSATPracTestAPI();
      if (response.data.code == "200") {
        const responseData = response.data.data?? [];
        const transformedResponse = stringResponseConvert(responseData);
        setResponseContent(transformedResponse?.Content);
        setResponseTitle(transformedResponse?.Title);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }
        setFormDataShow(true);
        setFormShow(false);
        setShowExemplarButton(true);
        setLoading(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong.");
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something Went Wrong.");
        setLoading(false);
      }
    }
    setFormDataShow(true);
    setFormShow(false);
  };

  const responsetoshow = (
    responseContent.length>0 ? (
    <div ref={contentRef}>
      <div>
        <h4 className="text-[18px] mb-3 font-[#344054]"> {responseTitle}</h4>
        <div className="text-[18px] xl:text-[0.833vw] mb-3 px-2" >
          {responseContent.length > 0 ? responseContent.map((item, i) => {
            const parts = item.split(':'); // Split the item by colon
            return (
              <div key={i} className="my-2 text-[14px]">
                {parts.length > 1 ? <span className="font-bold">{parts[0]}:</span> : parts[0]}
                {parts.length > 1 ? parts.slice(1).join(':') : null} {/* Reconstruct the item */}
              </div>
            );
          }) : null}


        </div>
      </div>
    </div> ) : ""
  );

  const handleClear = () => {
    setFormShow(true);
    setIsShowHide(false);
    setFormDataShow(false);
  };
  
  return (
    <Layout>
      <div className="  mx-auto 3xl:px-[16.771vw]  2xl:px-[150px] xl:px-[100px] px-[20px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified isGenerate={loading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={() => {
                if (formDataShow) {
                  setShowExemplarButton(false);
                  setFormDataShow(false);
                  setFormShow(true);
                  handleClear();
                } else {
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loading == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/resetclear.svg"
                alt="Reset and clear"
              />
              Reset and Clear
            </button>
            <button
              // disabled={!showExemplarButton}
              // onClick={() => {
              //   setIsExVisible(true), setVisible(true);setIsShowHide(false);
              // }}
              onClick={()=>{setFormDataShow(false), setFormShow(true); setIsShowHide(false)}}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Example"
              />
              Try New
            </button>
          </div>
          </div>

          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
               <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                   {AppTitle.satreadingpracticetest}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] ">
                  Generate practice SAT Reading Practice Tool that has passages and
                  associated questions.
                </p>
                </div>
                {
                    isShowHide && !loading ?
                    <button className='flex w-[200px] xl:w-[190px] 3xl:w-[9.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                  }
                  </div>
                  <Note/>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ProgressSpinner style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <div>
                    <button
                      className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      onClick={handleGenerate}
                    >
                      {loading ? "Please Wait..." : "Generate with BrixAI"}
                    </button>
                  </div>
                )}
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.satreadingpracticetest}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => setVisible(true)}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={"/satreadingpracticetest"}
              />
            )}
          </div>
         
        </div>

        {visible && (
          <CommonActionExempler
            response={responsetoshow}
            setIsPopupVisible={setIsExVisible}
            title={`Generated ${AppTitle.satreadingpracticetest}`}
            contentRef={contentRef}
            onClose={() => setVisible(false)}
            setVisible={setVisible}
            position={"Top"}
            visible={visible}
            isExVisible={isExVisible}
            appLink={"/satreadingpracticetest"}
          />
        )}
        {renderPopup()}
      </div>
    </Layout>
  );
}
