"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import { getTextAnalysisAssignment } from "../../actions/textAnalysisAssignment";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";

export default function Index() {
  const contentRef = useRef(null);
  const [assignment, setAssignment] = useState();
  const [instructionsData, setInstructionsData] = useState();
  const [objectives, setObjectives] = useState();
  const [guidelines, setGuidelines] = useState();
  const [assignmentTitle, setAssignmentTitle] = useState();
  const [loader, setLoader] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [error, setError] = useState({});
  const [multiStepData, setmultiStepData] = useState({
    grade: "",
    textLength: "",
  });

  const items = [{ label: "Text Analysis Tool", url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const appId = AppId.textAnalysisAssignment;
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

  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const handleAction = () => {
    setVisible(true);
    setIsExVisible(false);
  };

  const handleExample = () => {
    setmultiStepData((prevData) => ({
      ...prevData,
      grade: "Grade 5",
      textLength:
    "Deep in the heart of the countryside, there was a forest that was unlike any other. The trees were tall and ancient, their branches forming a thick canopy that let only slivers of sunlight reach the forest floor. The air was always cool and filled with the scent of pine and earth.\n\nMany tales were told about the forest, but one story stood out above the rest. It was said that a wise old owl lived in the largest tree at the center of the forest. This owl, with its snowy white feathers and piercing golden eyes, was known to give guidance to anyone who could find it. However, the journey to the owl was not easy. The forest was full of winding paths, and those who entered often found themselves walking in circles.",
    }));
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
  };
  const validate = () => {
    let err = {};
    let isErr = false;
    if (multiStepData.grade === "" || multiStepData.grade.trim() === "") {
      toast.error('Please Select Grade Level.')
      return;
    }
    if (
      multiStepData.textLength === "" ||
      multiStepData.textLength.trim() === ""
    ) {
      toast.error('Please Enter Text.')
      return;
    }
    setError(err);
    return isErr;
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }

    try {
      if (!multiStepData.grade) {
      } else if (!multiStepData.textLength) {
      }
      if (multiStepData.grade && multiStepData.textLength) {
        setLoader(true);
        const body = {
          grade: multiStepData.grade,
          content: multiStepData.textLength,
        };

        const response = await getTextAnalysisAssignment(body);
        if (response.data.code == "200") {
          const attemptValid = handleClickAttempt();
          if (!attemptValid) {
            setLoader(false);
            return;
          }

          setAssignment(response?.data?.data?.data);
          const instructionsValues = response?.data?.data?.Instructions?.map(
            (instruction) => Object.values(instruction)[0]
          );
          setInstructionsData(instructionsValues);
          setObjectives(response?.data?.data?.data?.Objectives);
          setGuidelines(response?.data?.data?.data?.Guidelines);
          setAssignmentTitle(response?.data?.data?.data?.["Assignment Title"]);
          setFormDataShow(true);
          setFormShow(false);
          setLoader(false);
          setIsActionvisible(true);
          setIsExVisible(true);
          setShowExemplarButton(true);
          setIsShowHide(true);
        } else {
          console.log(response?.error);
          toast.error("Something Went Wrong");
        }
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setLoader(false);
        toast.error("Something Went Wrong");
      }
    }
  };

  const reset = () => {
    setFormDataShow(false);
    setFormShow(true);
    setIsExVisible(false);
    setmultiStepData({
      grade: "",
      textLength: "",
    });
    setError("");
    setShowExemplarButton(false);
    setIsShowHide(false);
  };
  const commonActionData = assignment ? (
    <div>
      {
        <div ref={contentRef}>

          {assignmentTitle ? <h5>Assignment Title : {assignmentTitle ? assignmentTitle : ''}</h5> : null}
          {assignment?.['Grade Level'] ? <div style={{ display: "flex" }}><h5>Grade Level : </h5> <span className="ml-2">{assignment?.['Grade Level']}</span> </div> : null}
          {assignment?.['Subject'] ? <div style={{ display: "flex" }}><h5>Subject : </h5> <span className="ml-2">{assignment?.['Subject']} </span></div> : null}

          <h5>Writing Prompt Text Dependent Questions:</h5>
          <ul style={{ listStyle: "inside" }}>
            {instructionsData?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <h5>Answer for Writing Prompt:</h5>
          <ul style={{ listStyle: "inside" }}>
            {objectives?.map((elm, index) => (
              <li key={index}>{elm}</li>
            ))}
          </ul>
          <h5>Answers for Writing Prompt Text Dependent Questions:</h5>
          <ul style={{ listStyle: "inside" }}>
            {guidelines?.map((elm, index) => (
              <li key={index}>{elm}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  ) : ""

  const showExemplerPopup = () => {
    setIsPopupVisible(true);
    setPosition(position);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center  ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={reset}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => handleExample()}
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
                      <b>{AppTitle.textAnalysisAssignment}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.textAnalysisAssignment}
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
                      </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.classroomResources}</div>

                  }
                </div>

                {loader ? (
                  <div className="flex justify-center items-center" >
                    <ProgressSpinner />
                  </div >

                ) : (
                  <>
                    <form className="grid xl:gap-[1.25vw] gap-[18px]">
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <Dropdown
                          filter
                          value={
                            multiStepData.grade
                              ? GRADE.find(
                                (ele) => ele.name == multiStepData.grade
                              )
                              : null
                          }
                          onChange={(e) =>
                            setmultiStepData({
                              ...multiStepData,
                              grade: e.value.name,
                            })
                          }
                          options={GRADE}
                          optionLabel="name"
                          placeholder="Select"
                          className="w-full md:w-14rem"
                        />
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Text
                          <span className="text-[red] ml-1">*</span>{" "}
                        </label>
                        <InputTextarea
                          autoResize
                          placeholder="Type..."
                          value={multiStepData.textLength}
                          onChange={(e) =>
                            setmultiStepData({
                              ...multiStepData,
                              textLength: e.target.value,
                            })
                          }
                          rows={8}
                          className="w-full"
                        />
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
                  </>
                )}
              </>
            )}

            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.textAnalysisAssignment}`}
                setFormDataShow={setFormDataShow}
                handleAction={handleAction}
                response={commonActionData}
                setVisible={setVisible}
                contentRef={contentRef}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                appLink={"/textAnalysisAssignment"}
              />
            )}
          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">


            {isPopupVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={isPopupVisible}
                setVisible={setIsPopupVisible}
                isExVisible={isExVisible}
                contentRef={contentRef}
                title={`${AppTitle.textAnalysisAssignment}`}
                response={commonActionData}
                appLink={"/textAnalysisAssignment"}
              />
            )}
          </div>
        </div>
        {visible && (
          <CommonActionExempler
            onClose={() => setVisible(false)}
            visible={visible}
            response={commonActionData}
            title={`Generated ${AppTitle.textAnalysisAssignment}`}
            isExVisible={isExVisible}
            setVisible={setVisible}
            contentRef={contentRef}
            setIsPopupVisible={setIsPopupVisible}
            appLink={"/textAnalysisAssignment"}
          />
        )}
      </div>

      {renderPopup()}
    </Layout>
  );
}
