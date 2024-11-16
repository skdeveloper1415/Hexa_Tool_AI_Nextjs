"use client";
import React, { useState, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateMultiStepAssignment } from "../../actions/multiStepAssignmentApi";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const items = [{ label: `${AppTitle.youtubesummarizer}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const appId = AppId.youtubesummarizer;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("");

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
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [lengthOfSummary, setLengthOfSummary] = useState("");
  const [videoIDOrUrl, setVideoIDOrUrl] = useState("");
  const [error, setError] = useState({});
  const [isShowHide, setIsShowHide] = useState(false);

  const [loading, setLoading] = useState(false);
  const validate = () => {
    let err = {};
    let isErr = false;

    if (lengthOfSummary === "") {
      err.lengthOfSummary = "Please Enter Length Of Summary.";
      isErr = true;
    }
    if (videoIDOrUrl === "") {
      err.videoIDOrUrl = "Please Enter Video ID or URL.";
      isErr = true;
    }

    setError(err);
    return isErr;
  };
  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setLoading(true);

    try {
      const body = {
        grade: "1",
        content_type: "test",
        text_length: "test",
        topic: "test",
        additional_criteria: "test",
        standards_set: "CCSS",
      };

      const response = await generateMultiStepAssignment(body);
      if (response.data.code == "200") {
        setLoading(false);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true)
      } else {
        toast.error("Something went wrong.");
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.log('error:', error);
        toast.error("Something went wrong.");
        setLoading(false);
      }
    }
  };
  const handleClear = () => {
    setLengthOfSummary("");
    setVideoIDOrUrl("");
    setError({});
   
  };

  const copyRef = useRef(null);

  const responseToShow = (
    <div>
      <div ref={copyRef}>
        <h4 className="text-[16px] xl:text-[0.833vw]">`Response Title`:</h4>

        <h4 className="text-[16px] xl:text-[0.833vw]">
          `Response Description`:
        </h4>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
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
                  setFormDataShow(false);
                  setFormShow(true);
                  setIsShowHide(false);
                  handleClear();
                } else {
                  setIsShowHide(false);
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center
              ${loading == true ? "opacity-50 cursor-not-allowed" : ""}
              `}
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
              disabled={loading}
              onClick={() => {
                setLengthOfSummary("1 paragraph");
                setVideoIDOrUrl("https://www.youtube.com/watch?v=jNQXAC9IVRw");
                setError({});
                setFormShow(true);
                setFormDataShow(false);
                setVisible(false);
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center
              ${loading == true ? "opacity-50 cursor-not-allowed" : ""}
              `}
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
               <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
               {AppTitle.youtubesummarizer}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                  Get a summary tool of YouTube video in whatever length you choose.
                </p>
                </div>
                {
                    isShowHide && !loading ?
                    <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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

                {loading ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Length of Summary:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-[0.6rem] left-[0.5rem]">
                          <i className="hexatoolmic"></i>
                        </div>
                        <InputTextarea
                          autoResize
                          value={lengthOfSummary}
                          onChange={(e) => setLengthOfSummary(e.target.value)}
                          placeholder="1 paragraph"
                          className="w-full pl-7"
                          rows={1}
                        />
                        {error.lengthOfSummary ? (
                          <span style={{ color: "red" }}>
                            {error.lengthOfSummary}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Video ID or URL:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        value={videoIDOrUrl}
                        onChange={(e) => setVideoIDOrUrl(e.target.value)}
                        placeholder="Type Text..."
                        className="w-full"
                        rows={1}
                      />
                      {error.videoIDOrUrl ? (
                        <span style={{ color: "red" }}>
                          {error.videoIDOrUrl}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <Note/>
                    <div>
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          HandleGenerate(e);
                        }}
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.youtubesummarizer}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={() => {
                    setIsActionvisible(true);
                    setVisible(true);
                  }}
                  response={responseToShow}
                  contentRef={copyRef}
                  appLink={"/studentworkfeedback"}
                />
              </>
            )}
          </div>
         
        </div>
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.youtubesummarizer}`}
            response={responseToShow}
            visible={isActionvisible}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/youtubesummarizer"}
          />
        )}

        {renderPopup()}
      </div>
    </Layout>
  );
}
