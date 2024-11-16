"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import { AppCategory, AppId, AppTitle, GRADE } from "../../../components/helper/enum";
import { generateSocialStories } from "../../actions/socialStories";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const contentRef = useRef(null);

  const [contentType, setContentType] = useState();
  const [visible1, setVisible1] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [multiStepData, setmultiStepData] = useState();

  const items = [{ label: `${AppTitle.socialstories}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const [isShowHide, setIsShowHide] = useState(false);


  const handleAction = () => {
    setFormDataShow(true);
    setIsActionvisible(true);
  };

  const appId = AppId.socialstories;
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
  ); // Change 3 to your desired maximum attempts

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!multiStepData) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    } else {
      err.grade = ""; // Clear the error message if there's input
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter  Social Situation, Event, or Activity";
      isErr = true;
    } else {
      err.contentType = ""; // Clear the error message if there's input
    }

    setError(err);
    return isErr;
  };
  const handleExample = () => {
    setmultiStepData({ name: "Grade 10", code: "12" });
    setContentType(
      "Engaging in an activity in your gym class where students sometimes have very different experience levels with the activity "
    );
    setError({});
    setFormShow(true);
    setVisible1(false);
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const payload = {
      grade: multiStepData?.name,
      text: contentType,
    };
    try {
      setIsLoading(true);
      const response = await generateSocialStories(payload);
      if (response.data.code == "200") {
        setData(response.data.data.data);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
        setIsLoading(false);
          return;
        }
        setFormShow(false);
        setIsShowHide(true);
        setVisible1(true);
        setIsExVisible(true);
        setIsLoading(false);
        setShowExemplarButton(true);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setIsLoading(false);
        let msg =
          error?.response?.error ??
          error?.response?.message ??
          "Something went wrong";
        toast.error(msg);
      }
    }
    setIsLoading(false);
  };

  const responseData = (
    
    data && Object.keys(data).length > 0 ? (
    <div ref={contentRef}>
      {console.log("data",data)}
      <h5>{data?.Message}</h5>
      {data?.Content?.map((item) => {
        return (
          <>
            <p>{item}</p>
          </>
        );
      })}
      {/* {data?.Content} */}
    </div> ) :""
  );

  const handleClear = (e) => {
    setVisible1(false);
    setFormShow(true);
    setmultiStepData("");
    setContentType("");
    setError({});
    setShowExemplarButton(false);
    setError({});
    setIsShowHide(false);
  };

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified isGenerate={isLoading}/>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={isLoading == true ? true : false}
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                isLoading == true ? "opacity-50 cursor-not-allowed" : ""
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
              // onClick={() => setExempler(true)}
              onClick={handleExample}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
                <div className="grid">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                 {AppTitle.socialstories}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                This is an experience based learning style, generates a story to understand and to meet expectations by the student.
                </p>
                </div>
                {
                    isShowHide && !isLoading ?
                    <button className='flex w-[250px] xl:w-[250px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setVisible1(true)
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.CommunityTools}</div>
                  }
                  </div>
                {isLoading == true ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-2">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={multiStepData}
                        onChange={(e) => {
                          setmultiStepData(e.target.value),
                            setError((prevError) => ({
                              ...prevError,
                              grade: "", // Clear error message when a selection is made
                            }));
                        }}
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.grade ? (
                        <span style={{ color: "red" }}>{error.grade}</span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Social Situation, Event, or Activity:
                        <span className="text-[red] ml-2">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Getting ready for school, going to dentist, working in a group, attending a birthday party"
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "", // Clear error message when input is typed
                              }));
                          }}
                          rows={3}
                          className="w-full relative pl-[35px]"
                        />
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
                        ) : (
                          <></>
                        )}

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    <Note/>
                    <div>
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          HandleGenerate(e);
                          // setFormDataShow(true)
                          // setFormShow(false)
                        }}
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {visible1 && (
              <Commonresponse
                title={`${AppTitle.socialstories}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), setFormShow(true);
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responseData}
                contentRef={contentRef}
                appLink={"/socialstories"}
              />
            )}
          </div>
        
        </div>

        {exempler && (
          <CommonActionExempler
            contentRef={contentRef}
            onClose={() => {
              setExempler(false);
            }}
            setIsPopupVisible={setExempler}
            position={"center"}
            visible={exempler}
            isExVisible={isExVisible}
            title={`${AppTitle.socialstories}`}
            response={responseData}
            setVisible={setExempler}
            appLink={"/socialstories"}
          />
        )}

        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.socialstories}`}
            response={responseData}
            visible={isActionvisible}
            position={"top"}
            setVisible={setIsActionvisible}
            appLink={"/socialstories"}
            contentRef={contentRef}

          />
        )}
        {renderPopup()}
      </div>
    </Layout>
  );
}
