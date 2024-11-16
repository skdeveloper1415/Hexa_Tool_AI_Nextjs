"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateUnitPlanGeneratorAssignment } from "../../actions/unitPlanGeneratorApi";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import {
  GRADE,
  STANDARD,
  AppId,
  AppTitle,
  AppDesc,
  AppCategory,
} from "../../../components/helper/enum";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [assignment, setAssignment] = useState("");
  const [error, setError] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isExVisible, setIsExVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [unitPlanData, setunitPlanData] = useState({
    grade: "",
    title: "",
    content: "",
    no_of_days: "",
    standards: "",
  });


  const appId = AppId.unitPlanGenerator;
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

  const handleExample = () => {
    setunitPlanData((prevData) => ({
      ...prevData,
      grade: "Grade 10",
      title: "Overview of classical Japanese history  ",
      content:
        "I am a world history  teacher and I need to develop an introductory unit that explores classical Japanese history. ",
      no_of_days: "15 School Days",
      standards: "NGSS",
    }));
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
  };


  const handleAction = () => {
    setIsActionvisible(true);
  };

  const items = [{ label: "Unit Plan Designer", url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (unitPlanData.grade === "" || unitPlanData.grade.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (
      unitPlanData.no_of_days === "" ||
      unitPlanData.no_of_days.trim() === ""
    ) {
      err.no_of_days = "Please Enter  Length of Unit.";
      isErr = true;
    }
    if (unitPlanData.title === "" || unitPlanData.title.trim() === "") {
      err.title = "Please Enter  Unit Plan Title.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const [isShowHide, setIsShowHide] = useState(false); 
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const HandleGenerate = async (e) => {
    try {
      e.preventDefault();
      if (validate()) {
        return;
      }

      setLoader(true);
      const body = {
        grade: unitPlanData.grade ? unitPlanData.grade : "",
        title: unitPlanData.title ? unitPlanData.title : "",
        content: unitPlanData.content ? unitPlanData.content : "",
        no_of_days: unitPlanData.no_of_days ? unitPlanData.no_of_days : "",
        standards: unitPlanData.standards ? unitPlanData.standards : "",
      };


      const response = await generateUnitPlanGeneratorAssignment(body);

      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }

        setAssignment(response.data.data.data);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
        setLoader(false);
        setIsExVisible(true);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        toast.error("Something Went Wrong");
      }
    }
    setLoader(false);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

  const handleClear = () => {
    setunitPlanData({
      grade: "",
      title: "",
      content: "",
      no_of_days: "",
      standards: "",
    });
    setFormShow(true);
    setIsShowHide(false);
    setIsExVisible(false);

    setFormDataShow(false);
    setError({});
  };
  const contentRef = useRef(null);

  const response = (
    assignment ? (
      <div ref={contentRef}>
      {Object.keys(assignment).map((key, index) => (
                <div key={index}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {typeof assignment[key] === 'object' ? (
                        <div>
                            {Object.keys(assignment[key]).map((innerKey, innerIndex) => (
                                <div key={innerIndex}>
                                    <strong>{innerKey.charAt(0).toUpperCase() + innerKey.slice(1)}:</strong> 
                                    {typeof assignment[key][innerKey] === 'object' ? (
                                      <>
                                      {/* <strong>{innerKey.charAt(0).toUpperCase() + innerKey.slice(1)}:</strong> */}
                                        <ul>
                                            {Object.keys(assignment[key][innerKey]).map((termKey, termIndex) => (
                                                <li key={termIndex}>
                                                    <strong>{termKey}:</strong> 
                                                    {assignment[key][innerKey][termKey]}
                                                </li>
                                            ))}
                                        </ul>

                                        </>
                                    ) : (
                                        <span>{assignment[key][innerKey]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span>{assignment[key]}</span>
                    )}
                </div>
            ))}

      </div>
    ) : ""
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
            <BackToAIModified
              isGenerate={loader}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                handleClear();
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
               <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
               <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.unitPlanGenerator}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.unitPlanGenerator}
                    </p>
                  </div>
                {
                   isShowHide == true ?( isShowHide && !loader &&
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw]  text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center w-[200px] xl:w-[220px] 3xl:w-[11.854vw]'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>): <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
                  }
                  </div>


                {loader ? (
                  <div className="h-[100px] flex justify-center">
                    <ProgressSpinner />{" "}
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div className=" grid grid-cols-2 gap-4">
                      <div className="grid col-span-1">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={
                          unitPlanData.grade
                            ? GRADE.find(
                                (ele) => ele.name == unitPlanData.grade
                              )
                            : null
                        }
                        onChange={(e) =>
                          setunitPlanData({
                            ...unitPlanData,
                            grade: e.value.name,
                          })
                        }
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
                      <div className="grid col-span-1">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Standards Set to Align to :
                        
                      </label>

                      <Dropdown
                        filter
                        value={
                          unitPlanData.standards
                            ? STANDARD.find(
                                (ele) => ele.code == unitPlanData.standards
                              )
                            : null
                        }
                        onChange={(e) =>
                          setunitPlanData({
                            ...unitPlanData,
                            standards: e.value.code,
                          })
                        }
                        options={STANDARD}
                        optionLabel="code"
                        placeholder="Select Standard Set to Align to"
                        className="w-full md:w-14rem"
                      />

                      {error.standards ? (
                        <span style={{ color: "red" }}>{error.standards}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    </div>
                   
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Length of Unit<span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={unitPlanData.no_of_days}
                        onChange={(e) =>
                          setunitPlanData({
                            ...unitPlanData,
                            no_of_days: e.target.value,
                          })
                        }
                        rows={1}
                        className="w-full"
                      />
                      {error.no_of_days ? (
                        <span style={{ color: "red" }}>{error.no_of_days}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Unit Plan Title/Topic(s):
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={unitPlanData.title}
                        onChange={(e) =>
                          setunitPlanData({
                            ...unitPlanData,
                            title: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full"
                      />
                      {error.title ? (
                        <span style={{ color: "red" }}>{error.title}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Context :
                      
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={unitPlanData.content}
                        onChange={(e) =>
                          setunitPlanData({
                            ...unitPlanData,
                            content: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full"
                      />
                      {error.content ? (
                        <span style={{ color: "red" }}>{error.content}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                  
                    {/* <Note/> */}
                    <div className="mt-[30px]">
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
                title={`${AppTitle.unitPlanGenerator}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={handleAction}
                response={response}
                setIsExVisible={setIsExVisible}
                contentRef={contentRef}
                appLink={"/unitPlanGenerator"}
              />
            )}
            {isPopupVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                setVisible={setIsActionvisible}
                contentRef={contentRef}
                title={`Example for ${AppTitle.unitPlanGenerator}`}
                response={response}
                appLink={"/unitPlanGenerator"}
              />
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);

                  handleClear();
                } else {
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
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
              disabled={loader}
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
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
            </button>
          </div> */}
        </div>

        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.unitPlanGenerator}`}
            response={response}
            contentRef={contentRef}
            visible={isActionvisible}
            position={position}
            setVisible={setIsActionvisible}
            appLink={"/unitPlanGenerator"}
          />
        )}
      </div>
      {renderPopup()}
    </Layout>
  );
}
