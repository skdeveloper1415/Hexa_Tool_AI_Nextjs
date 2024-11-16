"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import { toast } from "react-toastify";
import { GRADE, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import { getReportCardComment } from "../../actions/reportcardCommentApi";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const copyRef = useRef(null);
  const [resAssignmentData, setResAssignmentData] = useState({
    grade: "",
    description: "",
  });
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isExVisible, setIsExVisible] = useState(false);
  const [isExamplerDisable, setExamplerDisabled] = useState(true);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [resData, setResData] = useState();
  const [areasforGrowth, setAreasforGrowth] = useState();
  const [areasOfStrength, setAreasOfStrength] = useState();
  const items = [{ label: `${AppTitle.reportcardcomments}`, url: "" }];
  const appId = AppId.reportcardcomments;
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

  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [vocabularyWords, setvocabularyWords] = useState(null);
  const [contentType, setContentType] = useState("");

  const responsetoshow = resData ? (
    <div ref={copyRef}>
      {resData &&
        typeof resData === "object" &&
        Object.entries(resData).map(([key, value]) => (
          <div key={key}>
            <b>{key}:</b>
            {typeof value === "object" ? (
              Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey}>
                  <b>{subKey}:</b> {subValue}
                </div>
              ))
            ) : (
              <p>{value}</p>
            )}
          </div>
        ))}
    </div>
  ) : ""

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!resAssignmentData.grade) {
      err.gradeLevel = "Please Select Grade Level.";
      isErr = true;
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter Student Pronouns.";
      isErr = true;
    }
    if (!areasforGrowth || areasforGrowth.trim() === "") {
      err.areasforGrowth = "Please Enter  Areas of Growth.";
      isErr = true;
    }
    if (!areasOfStrength || areasOfStrength.trim() === "") {
      err.areasOfStrength = "Please Enter  Areas of strength.";
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
    setLoader(true);
    try {
      const body = {
        grade: resAssignmentData.grade,
        pronouns: contentType,
        strength: areasOfStrength,
        growth: areasforGrowth,
      };

      const response = await getReportCardComment(body);
      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setResData(response?.data.data?.data);
        setExamplerDisabled(false);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
        setLoader(false);
      } else {
        console.log(response?.error);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        let msg =
          error?.response?.error ??
          error?.response?.message ??
          "Something went wrong";
        toast.error(msg);
      }
    }
  };

  const handleAction = () => {
    setVisible(true);
  };

  const closeFormDataShow = () => {
    setFormDataShow(false);
    setFormShow(true);
  };

  const clearStates = () => {
    setFormDataShow(false);
    setFormShow(true);
    setResAssignmentData({
      grade: "",
      description: "",
    });
    setError({});
    setvocabularyWords();
    setContentType("");
    setExamplerDisabled(true);
    setAreasforGrowth();
    setAreasOfStrength();
    setIsShowHide(false);
  };

  const hideExemplerPopup = () => {
    setIsExVisible(false);
  };

  const handleExample = () => {
    setError({});
    setResAssignmentData({
      grade: "Grade 10",
      description: "",
    });
    setContentType("he");
    setAreasforGrowth("Distracted easily, struggles with independent work");
    setAreasOfStrength("Homework completion, good friend, punctual");
    setFormDataShow(false);
    setFormShow(true);
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
            <BackToAIModified
              isGenerate={loader}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                clearStates();
              }}
              disabled={loader}
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
              disabled={loader}
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Try Now"
              />
              Try Now
            </button>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                {loader ? (
                  <>
                    <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                    <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.reportcardcomments}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.reportcardcomments}
                    </p>
                  </div>
                      {isShowHide && !loader && (
                        <button
                          className="flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center"
                          onClick={() => {
                            setFormDataShow(true);
                            setFormShow(false);
                          }}
                        >
                          <Image
                            width="20"
                            height="20"
                            className="mr-[8px]"
                            src="/images/edit.svg"
                            alt="Edit"
                          />
                          Hide Prompt
                        </button>
                      )}
                    </div>
                    <div className="h-[500px] flex justify-center items-center">
                      <ProgressSpinner />
                    </div>
                  </>
                ) : (
                  <>
                   <div className="flex justify-between items-center gap-1">
                   <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.reportcardcomments}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.reportcardcomments}
                    </p>
                  </div>
                    {(isShowHide ? (
                      <button
                        className="flex w-[200px] xl:w-[190px] 3xl:w-[9.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center"
                        onClick={() => {
                          setFormDataShow(true);
                          setFormShow(false);
                        }}
                      >
                        <Image
                          width="20"
                          height="20"
                          className="mr-[8px]"
                          src="/images/edit.svg"
                          alt="Edit"
                        />
                        Hide Prompt
                      </button>):<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Assessment}</div>
                    )}
                    </div>
                    <form className="grid xl:gap-[1.25vw] gap-[18px]">
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level:<span className="text-[red] ml-1">*</span>
                        </label>
                        <Dropdown
                          value={
                            resAssignmentData.grade
                              ? GRADE.find(
                                  (ele) => ele.name == resAssignmentData.grade
                                )
                              : null
                          }
                          onChange={(e) => {
                            setResAssignmentData({
                              ...resAssignmentData,
                              grade: e.value.name,
                            });
                          }}
                          options={GRADE}
                          optionLabel="name"
                          placeholder="Select"
                          className="w-full md:w-14rem"
                          filter
                        />
                        {error.gradeLevel ? (
                          <span style={{ color: "red" }}>
                            {error.gradeLevel}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Student Pronouns:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic cursor-pointer"></i>
                          </div>
                          <InputTextarea
                            placeholder="he"
                            value={contentType}
                            onChange={(e) => {
                              setContentType(e.target.value);
                            }}
                            rows={5}
                            cols={5}
                            className="w-full pl-10"
                          />
                          {error.contentType ? (
                            <span style={{ color: "red" }}>
                              {error.contentType}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Areas of Strength:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic cursor-pointer"></i>
                          </div>
                          <InputTextarea
                            placeholder="Homework completiion, good friend, punctual"
                            value={areasOfStrength}
                            onChange={(e) => {
                              setAreasOfStrength(e.target.value);
                            }}
                            rows={5}
                            cols={5}
                            className="w-full pl-10"
                          />
                          {error.areasOfStrength ? (
                            <span style={{ color: "red" }}>
                              {error.areasOfStrength}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Areas for Growth:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic cursor-pointer"></i>
                          </div>
                          <InputTextarea
                            placeholder="Distracted easily, struggles with independent work"
                            value={areasforGrowth}
                            onChange={(e) => {
                              setAreasforGrowth(e.target.value);
                            }}
                            rows={5}
                            cols={5}
                            className="w-full pl-10"
                          />
                          {error.areasforGrowth ? (
                            <span style={{ color: "red" }}>
                              {error.areasforGrowth}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    {/* <Note/> */}
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
                  </>
                )}
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.reportcardcomments}`}
                onHide={() => closeFormDataShow()}
                handleAction={handleAction}
                response={responsetoshow}
                contentRef={copyRef}
                appLink={"/reportcardcomments"}
              ></Commonresponse>
            )}
          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            {/* <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                clearStates();
              }}
              disabled={loader}
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
              onClick={handleExample}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Example"
              />
              Example
            </button> */}
            {isExVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                position={position}
                visible={isExVisible}
                title={`Example for Generated ${AppTitle.reportcardcomments}`}
                response={responsetoshow}
                responsetoshow
                contentRef={copyRef}
                isExVisible={isExVisible}
                setIsPopupVisible={setIsExVisible}
                appLink={"/reportcardcomments"}
              />
            )}
          </div>
        </div>
        {visible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.reportcardcomments}`}
            response={responsetoshow}
            visible={visible}
            position={position}
            setVisible={setVisible}
            contentRef={copyRef}
            appLink={"/reportcardcomments"}
            isExVisible={isExVisible}
          />
        )}
      </div>
      {renderPopup()}
    </Layout>
  );
}
