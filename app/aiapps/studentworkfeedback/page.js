"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppDesc, Growth } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateStudentWorkFeedbackAPI } from "../../actions/studentWorkFeedback";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAIModified from "../../../components/BackToAIModified";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";

export default function Index() {
  const items = [{ label: `${AppTitle.studentworkfeedback}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const appId = AppId.studentworkfeedback;
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
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [selectedGrowth, setGrowth] = useState(null);
  const [assignmentDesc, setAssignmentDesc] = useState("");
  const [
    studentFeedbackOrRubricCategories,
    setStudentFeedbackOrRubricCategories,
  ] = useState("");
  const [studentWorkFeedback, setStudentWorkFeedback] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [responseDataAreaOfStrength, setResponseDataAreaOfStrength] = useState(
    []
  );
  const [responseDataAreaOfGrowth, setResponseDataAreaOfGrowth] = useState([]);
  const [
    responseDataAreaOfGeneralFeedback,
    setResponseDataAreaOfGeneralFeedback,
  ] = useState([]);
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);

  const validate = () => {
    let err = {};
    let isErr = false;

    if (gradeLevel === null || gradeLevel.name.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (selectedGrowth === null || selectedGrowth.code === "") {
      err.growth = "Please Select Growth.";
      isErr = true;
    }
    if (assignmentDesc === "" || assignmentDesc.trim() === "") {
      err.assignmentDesc = "Please Enter  Assignment Description.";
      isErr = true;
    }
    if (
      studentFeedbackOrRubricCategories === "" ||
      studentFeedbackOrRubricCategories.trim() === ""
    ) {
      err.studentFeedbackOrRubricCategories =
        "Please Enter Focus of Feedback/Rubric Categories.";
      isErr = true;
    }
    if (studentWorkFeedback === "" || studentWorkFeedback.trim() === "") {
      err.studentWorkFeedback =
        "Please Enter Student Work to Give Feedback On.";
      isErr = true;
    }

    setError(err);
    return isErr;
  };

  const copyRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setIsExVisible(false);
    setLoading(true);
    try {
      let growth_mindset = '';
      let actionable = '';

      if (selectedGrowth?.code == '1') {
        growth_mindset = 'Yes';
        actionable = 'No';
      } else {
        growth_mindset = 'No';
        actionable = 'Yes';
      }

      const payload = {
        grade: gradeLevel?.name,
        growth_mindset: growth_mindset,
        actionable: actionable,
        description: assignmentDesc,
        focus_feedback: studentFeedbackOrRubricCategories,
        student_work_feedback: studentWorkFeedback,
      };
      const response = await generateStudentWorkFeedbackAPI(payload);

      if (response.data.code == "200") {
        let responseData = response.data.data.data ?? [];

        console.log("responseDataresponseData:-", responseData);

        setResponseData(responseData);
        // setResponseDataAreaOfStrength(responseData?.Areas_of_Strength);
        // setResponseDataAreaOfGrowth([...responseData?.Areas_for_Growth]);
        // setResponseDataAreaOfGeneralFeedback([
        //   ...responseData?.General_Feedback_on_Writing_Mechanics,
        // ]);
        setShowExemplarButton(true);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }
        setLoading(false);
        setIsExVisible(true);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        const message =
          response?.message ?? response?.error ?? "Something went wrong";
        toast.error("Something went wrong")
        console.log("message", message);
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        const message = error?.message ?? "Something went wrong";
        toast.error("Something went wrong")
        console.log("message", message);
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    setGradeLevel(null);
    setGrowth(null);
    setAssignmentDesc("");
    setStudentFeedbackOrRubricCategories("");
    setStudentWorkFeedback("");
    setError({});
    setShowExemplarButton(false);
    setIsShowHide(false);
  };

  const setExamples = () => {
    setGradeLevel({ name: "Grade 1", code: "3" });
    setGrowth({ name: 'Mindset', code: '1' });
    setAssignmentDesc(
      `There are 5 birds on a tree. 2 flew away. How many are left?`
    );
    setStudentFeedbackOrRubricCategories(
      `Accuracy,neatness,understanding,effort`
    );
    setStudentWorkFeedback(`Provides clear guidance and positive, constructive feedback, encouraging a growth mindset and motivating the student to keep improving their skills.`);
    setError({});
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

  const handleAction = () => {
    setIsActionvisible(true);
    setVisible(true);
  };

  const responseToShow = responseData.length > 0 || responseData ? (
    <div>
      <div ref={copyRef}>
        {/* <h4 className="text-[16px] xl:text-[0.833vw]">
          {" "}
          {responseData?.Title}:
        </h4> */}
        {/* 
        {formDataShow && (
          <div>
            <div>
              <h5>Areas of Strength:</h5>
              <ul
                className="text-[16px] xl:text-[0.833vw]"
                style={{ listStyle: "inside" }}
              >
                {responseDataAreaOfStrength &&
                  Object.entries(responseDataAreaOfStrength).map(
                    ([key, value], index) => {
                      return (
                        <li key={index}>
                          <span className="font-bold">{key}</span>
                          <p>{value}</p>
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
            <div>
              <h4>Areas for Growth</h4>
              <ul
                className="text-[16px] xl:text-[0.833vw]"
                style={{ listStyle: "inside" }}
              >
                {responseDataAreaOfGrowth.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
            <div>
              <h4>General Feedback on Writing Mechanics:</h4>
              <ul
                className="text-[16px] xl:text-[0.833vw]"
                style={{ listStyle: "inside" }}
              >
                {responseDataAreaOfGeneralFeedback.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        )} */}

        {
          Object.entries(responseData).map(([key, value]) => (
            <ul key={key}>
              <p key={key}>
                <b>{key
                  .split('_')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}: {"  "}</b>
                {typeof value === 'object' ? (
                  <ul>
                    {Object.entries(value).map(([innerKey, innerValue]) => (
                      <li key={innerKey}>
                         {["0", "1", "2", "3", "4","5","6","7"].includes(innerKey) ? null : (
                        <strong>{innerKey.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</strong> )}
                 {innerValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </p>
            </ul>
          ))
        }


      </div>
    </div>
  ) : ""

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px] mb-[32px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <BackToAIModified isGenerate={loading} />
            <button
              disabled={loading}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  setIsExVisible(false);
                  handleClear();
                } else {
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] ${loading == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => setExamples()}
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
                  <div>
                    {" "}
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium mb-2">
                      <b>{AppTitle.studentworkfeedback}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.aiStudentworkfeedback}
                    </p>
                  </div>
                  {
                    isShowHide==true ? (isShowHide && !loading &&
                    
                    <button className='flex w-[230px] xl:w-[220px] 3xl:w-[10.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>) :<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: Student Feedback</div>

                  }
                </div>
                {loading ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <ProgressSpinner />
                  </div>
                ) : (

                  <form>
                    <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level: <span className="text-[red] ml-1">*</span>
                        </label>
                        <Dropdown
                          filter
                          value={gradeLevel}
                          onChange={(e) => {
                            setGradeLevel(e.value);
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
                          Growth: <span className="text-[red] ml-1">*</span>
                        </label>
                        <Dropdown
                          filter
                          value={selectedGrowth}
                          onChange={(e) => {
                            setGrowth(e.value);
                          }}
                          options={Growth}
                          optionLabel="name"
                          placeholder="Select"
                          className="w-full md:w-14rem"
                        />
                        {error.grade ? (
                          <span style={{ color: "red" }}>{error.growth}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Assignment Description:{" "}
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={assignmentDesc}
                        onChange={(e) => {
                          setAssignmentDesc(e.target.value);
                        }}
                        rows={3}
                        className="w-full"
                      />
                      {error.assignmentDesc ? (
                        <span style={{ color: "red" }}>
                          {error.assignmentDesc}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Focus of Feedback/Rubric Categories:{" "}
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={studentFeedbackOrRubricCategories}
                        onChange={(e) => {
                          setStudentFeedbackOrRubricCategories(e.target.value);
                        }}
                        rows={3}
                        className="w-full"
                      />
                      {error.studentFeedbackOrRubricCategories ? (
                        <span style={{ color: "red" }}>
                          {error.studentFeedbackOrRubricCategories}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Student Work to Give Feedback On:{" "}
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={studentWorkFeedback}
                        onChange={(e) => {
                          setStudentWorkFeedback(e.target.value);
                        }}
                        rows={3}
                        className="w-full"
                        style={{ overflowY: "scroll" }}
                      />
                      {error.studentWorkFeedback ? (
                        <span style={{ color: "red" }}>
                          {error.studentWorkFeedback}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={handleSubmit}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
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
                  title={`${AppTitle.studentworkfeedback}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responseToShow}
                  contentRef={copyRef}
                  appLink={"/studentworkfeedback"}
                />
              </>
            )}
          </div>


          {isPopupVisible && (
            <CommonActionExempler
              onClose={hideExemplerPopup}
              setIsPopupVisible={setIsPopupVisible}
              position={position}
              visible={visible}
              isExVisible={isExVisible}
              contentRef={copyRef}
              title={`${AppTitle.studentworkfeedback}`}
              response={responseToShow}
              appLink={"/studentworkfeedback"}
            />
          )}

        </div>
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.studentworkfeedback}`}
            response={responseToShow}
            visible={isActionvisible}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/studentworkfeedback"}
          />
        )}
      </div>
      {renderPopup()}
    </Layout>
  );
}
