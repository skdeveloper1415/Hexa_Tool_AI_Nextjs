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
import { getAiResistanAssignment } from "../../actions/aiResistanceAssignments";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
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

  const [isShowHide, setIsShowHide] = useState(false); 
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isExVisible, setIsExVisible] = useState(false);
  const [isExamplerDisable, setExamplerDisabled] = useState(true);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [resData, setResData] = useState();
  const [convertedData, setConvertedData] = useState();
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const items = [{ label: `${AppTitle.resistantAssignments}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  console.log("convertedData",convertedData);

  const appId = AppId.resistantAssignments;
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

  const dataConversion = (data) => {
    try {
      const updates = data.split("\n\nUpdate").slice(1);
  
      const assignmentObjects = updates.map((update, index) => {
        const [rawTitleLine, ...rest] = update.split("):\n\n");
        const title = `Update ${rawTitleLine.trim()}`;
        const content = rest.join("):\n\n");
        const [stepsText, explanationText] = content.split("\n\nExplanation: ");
        const stepsArray = stepsText.split("\n").map(step => step.replace(/^\d+\. /, "")).filter(Boolean);
        const assignment = stepsArray[0].replace("Assignment: ", "").trim();
        const steps = stepsArray.slice(1);
        const explanation = explanationText ? explanationText.trim() : "";
  
        return {
          id: index + 1,
          title,
          assignment,
          steps,
          explanation
        };
      });
  
      console.log(assignmentObjects);
      setConvertedData(assignmentObjects)
      // setConvertedData(assignmentObjects); // Uncomment this line to set the converted data if you are using React's state
    } catch (error) {
      console.error("Error converting data:", error);
    }
  };

  useEffect(() => {
    if (resData) {
      dataConversion(resData);
    }
  }, [resData]);

  const setExamples = () => {
    setResAssignmentData({
      grade: "Grade 11",
      description: `Write a 5 paragraph essay about the book the hate you give`,
    });
    setError({});
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
  };

  const responsetoshow = convertedData ? (
    <div ref={copyRef}>
      {convertedData?.map((elm, index) => {
        return (
          <>
            <b>
              Update to Make this Assignment AI-Resistant (Idea {index + 1}):
            </b>
            <br></br>
            <br></br>
            <b>Assignment: </b>
            {elm.assignment}
            <br></br>
            <ul style={{ listStyle: "inside" }}>
              {elm.steps.map((elm, index) => (
                <li key={index}>{elm}</li>
              ))}
            </ul>
            <b>Explanation:</b> {elm.explanation}
            <br></br>
            <br></br>
          </>
        );
      })}
    </div>
  ) : ""

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!resAssignmentData.grade) {
      err.grade = "Please select grade level.";
      isErr = true;
    }
    if (
      !resAssignmentData.description ||
      resAssignmentData.description.trim().length == 0
    ) {
      err.description = "Please enter assignment description.";
      isErr = true;

      setResAssignmentData((prevState) => ({
        ...prevState,
        description: "",
      }));
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
        assignment_idea: resAssignmentData.description,
      };
      const response = await getAiResistanAssignment(body);
      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }

        setResData(response?.data?.data?.data);
        setExamplerDisabled(false);
        setFormDataShow(true);
        setFormShow(false);
        setShowExemplarButton(true);
        setLoader(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        toast.error("Something Went Wrong");
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
    setShowExemplarButton(false);
    setIsShowHide(false);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setIsExVisible(true);
  };

  const hideExemplerPopup = () => {
    setIsExVisible(false);
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
              onClick={() => (setExamples())}
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
                      <b>{AppTitle.resistantAssignments}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.resistantAssignments}
                    </p>
                  </div>
                    {
                                      isShowHide == true ? (isShowHide && !loader &&
                                        <button className='flex w-[160px] xl:w-[150px] 3xl:w-[8.454vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                                          onClick={() => {
                                            setFormDataShow(true);
                                            setFormShow(false);
                                          }}
                                        >
                                          <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                                          Hide  Prompt
                                        </button>):
                                         <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Assignment}</div>
                  }
                  </div>


                    {loader ? <div className="flex justify-center items-center" >
                <ProgressSpinner />
              </div > :<form className="grid xl:gap-[1.25vw] gap-[18px]">
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level:{" "}
                          <span className="text-[red] ml-1">*</span>
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
                            if (e.target.value) {
                              setError({ ...error, grade: "" });
                            }
                          }}
                          options={GRADE}
                          optionLabel="name"
                          placeholder="Select"
                          className="w-full md:w-14rem"
                          filter
                        />
                        {error.grade ? (
                          <span style={{ color: "red" }}>{error.grade}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Assignment Description:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <InputTextarea
                          autoResize
                          placeholder="Type..."
                          value={resAssignmentData.description}
                          onChange={(e) => {
                            setResAssignmentData({
                              ...resAssignmentData,
                              description: e.target.value,
                            });

                            if (e.target.value) {
                              setError({ ...error, description: "" });
                            }
                          }}
                          rows={3}
                          className="w-full"
                        />
                        {error.description ? (
                          <span style={{ color: "red" }}>
                            {error.description}
                          </span>
                        ) : (
                          <></>
                        )}
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
                    </form>}
                 
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.resistantAssignments}`}
                onHide={() => {
                  closeFormDataShow();
                }}
                handleAction={handleAction}
                response={responsetoshow}
                contentRef={copyRef}
                appLink={"/resistantAssignments"}
              ></Commonresponse>
            )}
          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            {/* <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              } `}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  setExamplerDisabled(true);
                  clearStates();
                } else {
                  clearStates();
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
              disabled={loader}
              onClick={() => setExamples()}
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
                title={`${AppTitle.resistantAssignments}`}
                response={responsetoshow}
                responsetoshow
                contentRef={copyRef}
                isExVisible={isExVisible}
                setIsPopupVisible={setIsExVisible}
                appLink={"/resistantAssignments"}
              />
            )}
          </div>
        </div>
        {visible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.resistantAssignments}`}
            response={responsetoshow}
            visible={visible}
            position={position}
            setVisible={setVisible}
            contentRef={copyRef}
            appLink={"/resistantAssignments"}
            isExVisible={isExVisible}
          />
        )}
      </div>

      {renderPopup()}
    </Layout>
  );
}
