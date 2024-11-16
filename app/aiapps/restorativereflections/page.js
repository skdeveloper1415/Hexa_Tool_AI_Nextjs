"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import {
  GRADE,
  QUESTIONS,
  AppId,
  AppTitle,
  AppCategory,
} from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import { generateRestorativeReflections } from "../../actions/restorativeReflection";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const appId = AppId.restorativereflections;
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

  const [gradeLevel, setGradeLevel] = useState(null);
  const items = [{ label: `${AppTitle.restorativereflections}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const contentRef = useRef(null);
  const [contentType, setContentType] = useState();
  const [visible1, setVisible1] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [multiStepData, setmultiStepData] = useState();
  const [formShow, setFormShow] = useState(true);
  const [isExVisible, setIsExVisible] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [responseTitle, setResponseTitle] = useState("");
  const [responseContent, setResponseContent] = useState([]);
  const [isShowHide, setIsShowHide] = useState(false); 
  const [dataFromApi, setDataFromApi] = useState()

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!multiStepData) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    } else {
      err.grade = "";
    }
    if (!gradeLevel) {
      err.gradeLevel = "Please Select Number of Questions";
      isErr = true;
    } else {
      err.gradeLevel = "";
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter Details of Incident";
      isErr = true;
    } else {
      err.contentType = "";
    }

    setError(err);
    return isErr;
  };

  const responseDataShow = (
    dataFromApi?(
      <div ref={contentRef}>
      <div>
        <h4 className="text-[18px] xl:text-[0.833vw] mb-3"> {responseTitle}</h4>
        <div className="text-[18px] xl:text-[0.833vw] mb-3">
          {responseContent.length > 0
            ? responseContent.map((item, i) =>{
               return(
                 <div key={i} className="my-2 text-[14px]"> 
                   { item === "Directions: " || item === "Questions:" || /^Directions: .+/.test(item)  ? (
                    <h5>{item}</h5>
                  ) : (
                    item
                  )}
                </div>
              )})
            : null}
        </div>
      </div>
    </div>
    ):(
      ""
    )
   
  );

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const payload = {
      grade: multiStepData.name,
      incident_details: contentType,
      no_of_questions: gradeLevel.code,
    };
    try {
      setIsLoading(true);

      const response = await generateRestorativeReflections(payload);
      if ((response.data.code = 200)) {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setIsLoading(false);
          return;
        }

        const responseData = response?.data?.data;
        setDataFromApi(response?.data?.data)
    
        const transformedResponse = stringResponseConvert(responseData);
        setResponseTitle(transformedResponse?.Title);
        setVisible1(true);
        setResponseContent(transformedResponse?.Content);
        setData(responseData);
        setFormShow(false);
        setIsExVisible(true);
        setIsLoading(false);
        setShowExemplarButton(true);
        setIsShowHide(true);
      }
      setIsLoading(false);
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const handleAction = () => {
    setIsActionvisible(true);
  };

  const handleClear = (e) => {
    setVisible1(false);
    setFormShow(true);
    setmultiStepData("");
    setContentType("");
    setShowExemplarButton(false);
    setGradeLevel("");
    setError({});
    setIsShowHide(false);
  };

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
          <BackToAIModified isGenerate={isLoading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={isLoading}
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
              disabled={isLoading}
              onClick={() => {
                if (visible1) {
                  setFormShow(true);
                  setVisible1(false);
                }
                setmultiStepData({ name: "Grade 6", code: "8" });
                setGradeLevel({ name: "5", code: "5" });
                setContentType(
                  "One student accidentally bumped into another student in the lunch line, spilling their tray full of food. Both students became escalated and they ended up in a shoving match in the lunch room."
                );
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                isLoading == true ? "opacity-50 cursor-not-allowed" : ""
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
                <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF]  font-medium">
                {AppTitle.restorativereflections}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Creates reflection assignments for students for disiplinary incidents, restorative practices.
                </p>
                </div>
                <div>
                {
                    isShowHide && !isLoading ?
                    <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setVisible1(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.CommunityTools}</div>
                  }
                  </div>
                  </div>
                {isLoading == true ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid grid-cols-12 xl:gap-[1.25vw] gap-[18px]">
                    <div className="col-span-6">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={multiStepData}
                        onChange={(e) => {
                          setmultiStepData(e.target.value),
                            setError((prevError) => ({
                              ...prevError,
                              grade: "",
                            }));
                        }}
                        filter
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

                    <div className="col-span-6">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Questions:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={gradeLevel}
                        onChange={(e) => {
                          setGradeLevel(e.value),
                            setError((prevError) => ({
                              ...prevError,
                              gradeLevel: "",
                            }));
                        }}
                        filter
                        options={QUESTIONS}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.gradeLevel ? (
                        <span style={{ color: "red" }}>{error.gradeLevel}</span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="col-span-12">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Details of incident:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="The details of what the student was involved in,and any other relavent information."
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "",
                              }));
                          }}
                          rows={5}
                          cols={5}
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
                    <div className="col-span-12">
                  <Note/>
                  </div>
                    <div className="col-span-12">
                      <button
                        onClick={handleGenerate}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
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
                title={`${AppTitle.restorativereflections}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), setFormShow(true);
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responseDataShow}
                contentRef={contentRef}
                appLink={"/restorativereflections"}
              />
            )}
          </div>
         
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
          title={`Generated ${AppTitle.restorativereflections}`}
          response={responseDataShow}
          setVisible={setExempler}
          appLink={"/restorativereflections"}
        />
      )}

      {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.restorativereflections}`}
          response={responseDataShow}
          visible={isActionvisible}
          position={"top"}
          setVisible={setIsActionvisible}
          appLink={"/restorativereflections"}
          contentRef={contentRef}
        />
      )}

      {renderPopup()}
    </Layout>
  );
}
