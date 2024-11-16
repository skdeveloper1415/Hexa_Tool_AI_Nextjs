"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateMultiStepAssignment } from "../../actions/multiStepAssignmentApi";
import Commonresponse from "../../common/commonResponse";
import { GRADE, AppId, AppTitle, AppDesc, AppCategory, STANDARD } from "../../../components/helper/enum";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";

export default function Index() {
  const [assignment, setAssignment] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [title, setTitle] = useState(`${AppTitle.multistepassignment}`);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [multiStepData, setmultiStepData] = useState({
    grade: "",
    contentType: "",
    textLength: "",
    topic: "",
    standard: "",
    additionalCriteria: "",
  });
  const items = [{ label: `${AppTitle.multistepassignment}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [responseData, setResponseData] = useState()

  const appId = AppId.multistepassignment;
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

  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);

  const [visible, setVisible] = useState(false);
  const validate = () => {


  };

  const handleExample = () => {
    setmultiStepData((prevData) => ({
      ...prevData,
      grade:"10",
      contentType: "Short Story",
      textLength: "600-800 words",
      standard: STANDARD[8].code,
      topic:
        "Investigating Photosynthesis Rates in Different Light Conditions.",
      additionalCriteria:
        "Include sections covering the hypothesis, materials and methods used, data collection and analysis, and a discussion on the implications of the findings for understanding plant biology and environmental factors affecting photosynthesis.",
    }));
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
  };
  const isNumber = (str) => {
    const regex = /^[0-9]+$/;
    return regex.test(str);
  };
  const HandleGenerate = async (e) => {
    e.preventDefault();
    console.log('multiStepData',multiStepData);

    if (!multiStepData.grade || multiStepData.grade.trim() === "") {
      toast.error('Please Select Grade Level.');
      return;
    }
    
    if (!multiStepData.standard) {
      toast.error('Please Select Standards Set to Align to.');
      return;
    }
    if (!multiStepData.contentType || multiStepData.contentType.trim() === "") {
      toast.error('Please Enter Content Type.');
      return;
    }
    if (!multiStepData.textLength || multiStepData.textLength.trim() === "") {
      toast.error('Please Enter Text Length.');
      return;
    }
    if (!multiStepData.topic || multiStepData.topic.trim() === "") {
      toast.error('Please Enter Topic, Standard, Objective.');
      return;
    }


    try {

      setLoader(true);
      const body = {
        grade: multiStepData.grade ? multiStepData.grade : "",
        content_type: multiStepData.contentType
          ? multiStepData.contentType
          : "",
        text_length: multiStepData.textLength ? multiStepData.textLength : "",
        topic: multiStepData.topic ? multiStepData.topic : "",
        additional_criteria: multiStepData.additionalCriteria
          ? multiStepData.additionalCriteria
          : "",
        standards_set: multiStepData.standard ? multiStepData.standard : ""
      };

      const response = await generateMultiStepAssignment(body);
      if (response.data.code == "200") {
        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }

        setAssignment(response.data.data.data);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong");
      }
      setIsPopupVisible(true);
      setLoader(false);
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setLoader(false);
        let msg = error?.error ?? error?.message ?? "Something went wrong";
        toast.error("Something Went Wrong");
      }
    }
  };

  const handleResetAndClear = () => {
    setmultiStepData({
      grade: "",
      contentType: "",
      textLength: "",
      topic: "",
      additionalCriteria: "",
    });
    setAssignment("");
    setError({});
  };

  const contentRef = useRef(null);
  const responsetoshow = (assignment ? (
    <div ref={contentRef}>
      {Object.keys(assignment).map((key, index) => (
        // Check if the value is present (not undefined or null)
        assignment[key] && (
          <div key={index}>
            <strong className="mt-2">{key}:</strong> {typeof assignment[key] === 'object' ? (
              <div className="mt-2">
                {Object.keys(assignment[key]).map((innerKey, innerIndex) => (
                  innerKey ?
                    <div key={innerIndex} className="mt-2">
                      <strong>{innerKey.charAt(0).toUpperCase() + innerKey.slice(1)}:</strong>
                      {typeof assignment[key][innerKey] === 'object' ? (
                        <>
                          <ul>
                            {Object.keys(assignment[key][innerKey]).map((termKey, termIndex) => (

                              <li key={termIndex}>
                                <strong>{isNumber(termKey)?(+termKey+1):termKey }:</strong>
                                <span className="ml-2">{assignment[key][innerKey][termKey]}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        innerKey ? <span className="ml-2">{assignment[key][innerKey]}</span> : null
                      )}
                    </div> : null
                ))}
              </div>
            ) : (
              <span className="ml-2">{assignment[key]}</span>
            )}
          </div>
        )
      ))}

    </div>


  ) : "")
  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]  mb-[32px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <BackToAIModified
              isGenerate={loader}
            />
            <button
              disabled={loader}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center  ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  setIsShowHide(false);
                  handleResetAndClear();
                } else {
                  setIsShowHide(false);
                  handleResetAndClear();
                }
              }}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center
            ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => {
                handleExample();
              }}
              disabled={loader}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Example"
              />
              Try Now
            </button>
          </div>

          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">

                  <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[18px] text-[#1570EF] font-medium">
                      <b>{AppTitle.multistepassignment}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.multistepassignment}
                    </p>
                  </div>

                  {
                    isShowHide == true ? (isShowHide && !loader &&
                      <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                        onClick={() => {
                          setFormDataShow(true);
                          setFormShow(false);
                        }}
                      >
                        <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                        Hide  Prompt
                      </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                  }
                </div>

                {loader ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form >
                    <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level:<span className="text-[red] ml-1">*</span>
                        </label>
                        <Dropdown
                          filter
                          value={
                            multiStepData.grade
                              ? GRADE.find(
                                (ele) => ele.code == multiStepData.grade
                              )
                              : null
                          }
                          onChange={(e) => {
                            setmultiStepData({
                              ...multiStepData,
                              grade: e.value.code,
                            });
                            if (e.target.value) {
                              setError({ ...error, grade: "" });
                            }
                          }}
                          options={GRADE}
                          optionLabel="name"
                          placeholder="Select"
                          className="w-full md:w-14rem"
                        />
                      </div>
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Standard set to align to:
                          <span className="text-[red]">*</span>
                        </label>
                        <Dropdown
                          value={
                            multiStepData.standard
                              ? STANDARD.find(
                                (ele) => ele.code == multiStepData.standard
                              )
                              : null
                          }
                          onChange={(e) => {
                            setmultiStepData({
                              ...multiStepData,
                              standard: e.value.code,
                            });
                            if (e.target.value) {
                              setError({ ...error, standard: "" });
                            }
                          }}
                          options={STANDARD}
                          optionLabel="code"
                          placeholder="Select"
                          filter
                          className="w-full md:w-14rem"
                        />

                        {error.standard && <div className="text-red-500">{error.standard}</div>}
                      </div>
                    </div>

                    <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Content Type:<span className="text-[red] ml-1">*</span>
                        </label>
                        <InputTextarea
                          autoResize
                          placeholder="Type..."
                          value={multiStepData.contentType}
                          onChange={(e) => {
                            setmultiStepData({
                              ...multiStepData,
                              contentType: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, contentType: "" });
                            }
                          }}
                          rows={3}
                          className="w-full"
                        />
                      </div>
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Text Length:<span className="text-[red] ml-1">*</span>
                        </label>
                        <InputTextarea
                          autoResize
                          placeholder="Type..."
                          value={multiStepData.textLength}
                          onChange={(e) => {
                            setmultiStepData({
                              ...multiStepData,
                              textLength: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, textLength: "" });
                            }
                          }}
                          rows={3}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Topic,Standard,Objective (be as specific as possible):
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <InputTextarea
                          autoResize
                          placeholder="Type..."
                          value={multiStepData.topic}
                          onChange={(e) => {
                            setmultiStepData({
                              ...multiStepData,
                              topic: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, topic: "" });
                            }
                          }}
                          rows={3}
                          className="w-full"
                        />
                      </div>
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Additional Criteria for the Content (optional):
                        </label>
                        <InputTextarea
                          autoResize
                          placeholder="Type..."
                          value={multiStepData.additionalCriteria}
                          onChange={(e) => {
                            setmultiStepData({
                              ...multiStepData,
                              additionalCriteria: e.target.value,
                            });
                          }}
                          rows={3}
                          className="w-full"
                        />
                      </div>
                    </div>
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
              <Commonresponse
                title={`${AppTitle.multistepassignment}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                appLink={"/multistepassignment"}
                handleAction={() => {
                  setVisible(true),
                    setIsExVisible(false),
                    setTitle(`Generated ${AppTitle.multistepassignment}`);
                }}
                response={responsetoshow}
                contentRef={contentRef}
              />
            )}
          </div>

        </div>

        {visible && (
          <CommonActionExempler
            response={responsetoshow}
            setIsPopupVisible={setVisible}
            title={title}
            contentRef={contentRef}
            onClose={() => setVisible(false)}
            setVisible={setVisible}
            position={"top"}
            visible={visible}
            isExVisible={isExVisible}
            appLink={"/multistepassignment"}
          />
        )}
      </div>

      {renderPopup()}
    </Layout>
  );
}
