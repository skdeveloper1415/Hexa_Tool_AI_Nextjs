"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppDesc, AppId, AppTitle, GRADE, STANDARD } from "../helper/enum";
import Commonresponse from "../../app/common/commonResponse";
import CommonActionExempler from "../../app/common/CommonActionExempler";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import { generateMultiStepAssignment } from "../../app/actions/multiStepAssignmentApi";
import CommonAction from "../commonAction";
import { cancelPendingRequests } from "../../app/actions";




export default function MultiStepAssessment({ visible, onhide, setInstruction, isActionVisible, multiStepAssessment, setAssignments }) {
  const [assignment, setAssignment] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [standard, setStandard] = useState("");
  const [title, setTitle] = useState(
    `${AppTitle.multistepassignment}`
  );
  const [multiStepData, setmultiStepData] = useState({
    grade: "",
    contentType: "",
    textLength: "",
    topic: "",
    additionalCriteria: "",
    standards: ""
  });
  const items = [{ label: `${AppTitle.multistepassignment}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [responseData, setResponseData] = useState();
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

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

  const validate = () => {
    let err = {};
    let isErr = false;

    if (!multiStepData.grade || multiStepData.grade.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!multiStepData.contentType || multiStepData.contentType.trim() === "") {
      err.contentType = "Please Enter Content Type.";
      isErr = true;
    }
    if (!multiStepData.textLength || multiStepData.textLength.trim() === "") {
      err.textLength = "Please Enter Text Length.";
      isErr = true;
    }
    if (!multiStepData.topic || multiStepData.topic.trim() === "") {
      err.topic = "Please Enter Topic, Standard, Objective.";
      isErr = true;
    }
    if (!standard) {
      err.standard = "Please Select Standards Set to Align to.";
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
        grade: multiStepData.grade ? multiStepData.grade : "",
        content_type: multiStepData.contentType
          ? multiStepData.contentType
          : "",
        text_length: multiStepData.textLength ? multiStepData.textLength : "",
        topic: multiStepData.topic ? multiStepData.topic : "",
        additional_criteria: multiStepData.additionalCriteria
          ? multiStepData.additionalCriteria
          : "",
        // standards_set: "CCSS",
        standards_set: standard.code ? standard.code : "",
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
      setLoader(false);
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setLoader(false);
        toast.error("Something Went Wrong");
      }
    }
  };



  const contentRef = useRef(null);
  const responsetoshow = (assignment ? (
    <div ref={contentRef}>
      {Object.keys(assignment).map((key, index) => (
        <div key={index}>
          <strong>{key}:</strong> {typeof assignment[key] === 'object' ? (
            <div>
              {Object.keys(assignment[key]).map((innerKey, innerIndex) => (
                <div key={innerIndex}>
                  <strong>{innerKey.charAt(0).toUpperCase() + innerKey.slice(1)}:</strong>
                  {typeof assignment[key][innerKey] === "object" ? (
                    <>
                      <ol>
                        {Array.isArray(assignment[key][innerKey]) ?
                          assignment[key][innerKey].map(
                            (termKey, termIndex) => (
                              <li data-list="ordered" key={termIndex}>
                                <strong>{termIndex + 1}:</strong>
                                {termKey}
                              </li>
                            )
                          ) :
                          Object.keys(assignment[key][innerKey]).map(
                            (termKey, termIndex) => (
                              <li data-list="ordered" key={termIndex}>
                                <strong>{termKey}:</strong>
                                {assignment[key][innerKey][termKey]}
                              </li>
                            ))}
                      </ol>
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


  ) : "")

  const handleExample = () => {
    setmultiStepData((prevData) => ({
      ...prevData,
      grade:"10",
      contentType: "Short Story",
      textLength: "600-800 words",
      standards: STANDARD[8].code,
      topic:
        "Investigating Photosynthesis Rates in Different Light Conditions.",
      additionalCriteria:
        "Include sections covering the hypothesis, materials and methods used, data collection and analysis, and a discussion on the implications of the findings for understanding plant biology and environmental factors affecting photosynthesis.",
    }));
    setStandard({
      "name": "Common Core State Standards (CCSS): Adopted by many states, these standards cover English Language Arts (ELA) and Mathematics for K-12 students.",
      "code": "CCSS"
  });
    setFormShow(true);
    setFormDataShow(false);
    // setVisible(false);
    setIsExVisible(false);
  };

  const HeaderData = () => {
    return (
      <div className="flex">
        Confirmation
      </div>
    )
  }

  const accept = () => {
    // setVisible(false)
    setLoader(false);
    cancelPendingRequests()
    onhide()
    setDialogVisible(false)
  }

  const footerContent = (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
      <button onClick={() => { setDialogVisible(false) }} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>

      <button onClick={accept} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  );

  const handleDiaglogHide = () => {
    if (loader == true) {
      setDialogVisible(true)
      // handleHide()
    } else {
      onhide();
    }
  }

  const handleHide = () => {
    setDialogVisible(false);
  }

  const handleClearAndHide = () => {
    handleDiaglogHide();
    setIsShowHide(false);
    setLoader(false);
    setmultiStepData({
      grade: "",
      contentType: "",
      textLength: "",
      topic: "",
      additionalCriteria: "",
      standards: ""
    });
    setStandard("")
    setError({})
  }
  return (
    <div>
      <Dialog
        className="custom-popup w-[800px]  "
        header=" "
        visible={visible}
        style={{ width: "60vw" }}
        onHide={handleClearAndHide}
        blockScroll
      >

        <div className="">


          <div className=" ">
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px] gap-2">
                  <div className="grid">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                      <b>{AppTitle.multistepassignment}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.multistepassignment}
                    </p>
                  </div>
                  <button
                    className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center  items-center
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
                  {
                    isShowHide && !loader &&
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>
                  }
                </div>


                {loader ? (
                  <div className="h-[500px] flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[0.625vw] gap-[12px]">
                    <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                      <div className="grid col-span-3">

                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level:<span className="text-[red] ">*</span>
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
                        {error.grade ? (
                          <span style={{ color: "red" }}>{error.grade}</span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Standard set to align to:
                          <span className="text-[red]">*</span>
                        </label>
                        <Dropdown
                          value={standard}
                          onChange={(e) => {
                            setStandard(e.value);
                            if (e.target.value) {
                              setError({ ...error, standard: "" });
                            };
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
                          Content Type:<span className="text-[red] ">*</span>
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
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Text Length:<span className="text-[red] ">*</span>
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
                        {error.textLength ? (
                          <span style={{ color: "red" }}>{error.textLength}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Topic,Standard,Objective (be as specific as possible):
                          <span className="text-[red]">*</span>
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
                        {error.topic ? (
                          <span style={{ color: "red" }}>{error.topic}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
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
                          rows={1}
                          className="w-full"
                        />
                      </div>

                      <div className="mt-[15px]">
                        <button
                          className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570ef] bg-[#1570ef] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
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
                  setIsActionvisible(true);
                  setIsExVisible(false),
                    setTitle(`Generated ${AppTitle.multistepassignment}`);
                }}
                response={responsetoshow}
                contentRef={contentRef}
              />
            )}{
              isActionvisible && <CommonAction
                title={`Generated ${AppTitle.multistepassignment}`}
                response={responsetoshow}
                visible={isActionvisible}
                contentRef={contentRef}
                appLink={"/multistepassignment"}
                setVisible={setIsActionvisible}
                setDataEditor={setInstruction}
                multiStepAssessment={multiStepAssessment}
                setAssignments={setAssignments}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                  onhide()
                  setIsActionvisible(false);
                  handleClearAndHide()
                }}
                setBooleanValue={isActionVisible}
              />
            }
          </div>
          {renderPopup()}
        </div>

        {dialogVisible == true ?
          <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }}
            // onHide={() => setDialogVisible(false)} 
            onHide={handleHide}
            className='ConfirmDialog'>
            <p className="m-0">
              Are you sure you want to close?
            </p>

          </Dialog> : null}

      </Dialog>
    </div>
  );
}

