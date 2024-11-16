"use client";
import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Commonresponse from "../../common/commonResponse";
import { toast } from "react-toastify";
import { getAiResistanAssignment } from "../../actions/aiResistanceAssignments";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import Note from "../../common/Note";
import { generateStudentWorkFeedbackAPI } from "../../actions/studentWorkFeedback";
import BackToAIModified from "../../../components/BackToAIModified";


export default function Index() {
  const copyRef = useRef(null);
  const [feedbackData, setFeedbackData] = useState({
    grade: "",
    description: "",
    focus: "",
    studentFeedback: "",
  });
  const [formDataShow, setFormDataShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const items = [{ label:AppTitle.instantfeedback, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [error, setError] = useState({});
  const [position, setPosition] = useState("center");
  const [isShowHide, setIsShowHide] = useState(false);
  
  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await getIpAddress();
      setIp(ip);
    };
    fetchIpAddress();
  }, []);

  const appId = AppId.instantfeedback;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(
    attempt,
    ip,
    appId
  ); // Change 3 to your desired maximum attempts
  const [formShow, setFormShow] = useState(true);
  const [resData, setResData] = useState();
  const [convertedData, setConvertedData] = useState();
  const [visible, setVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);


  const dataConversion = (data) => {
    // Splitting the data into individual assignments
    const assignments = data.split(
      "\n\nUpdate to Make this Assignment AI-Resistant (Idea "
    );

    // Converting each assignment string into an object
    const assignmentObjects = assignments.map((assignment, index) => {
      // Splitting each assignment string into title and steps/explanation
      const [title, stepsAndExplanation] = assignment.split("):\n\n");

      // Splitting steps/explanation into steps and explanation
      const stepsAndExplanationArray = stepsAndExplanation.split("\n\n");

      const steps1 = stepsAndExplanation.split("\n");

      // Extracting steps from the array
      const steps2 = steps1
        .slice(0, -1)
        .map((step) => step.replace(/^\d+\. /, ""));
      var steps3 = steps2.slice(3, -1);
      const assignment1 = steps2[0];
      const assignment2 = assignment1.replace("Assignment: ", "");
      // Extracting explanation from the array
      const explanation1 = stepsAndExplanationArray.slice(-1)[0];
      const explanation = explanation1.replace("Explanation: ", "");
      return {
        id: index + 1,
        title,
        steps3,
        explanation,
        assignment2,
      };
    });

    setConvertedData(assignmentObjects);
  };

  // useEffect(() => {
  //   if (resData) {
  //     dataConversion(resData);
  //   }
  // }, [resData]);   

  const responsetoshow = resData?.length > 0 || resData ? (
    <div>
      <div ref={copyRef}>
        {
          Object.entries(resData).map(([key, value]) => (
            <ul key={key}>
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:{"  "}</strong>
                {typeof value === 'object' ? (
                  <ul>
                    {Object.entries(value).map(([innerKey, innerValue]) => (
                      <li key={innerKey}>
                        <strong>{innerKey.charAt(0).toUpperCase() + innerKey.slice(1)}:</strong> 
                        {innerValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </li>
            </ul>
          ))}

      </div>
    </div>
  ) : ""


  const generateInstantFeedback = async () => {
    const attemptValid = handleClickAttempt();
    if (!attemptValid) {
      setLoader(false);
      return;
    }

    try {
      const payload = {
        grade: feedbackData?.grade?.name,
        description: feedbackData?.description,
        focus_feedback: feedbackData?.focus,
        student_work_feedback: feedbackData?.studentFeedback,
      };
      const response = await generateStudentWorkFeedbackAPI(payload);
      if (response.data.code == "200") {
        let responseData = response.data.data.data ?? [];
        setResData(responseData);
        setFormDataShow(true);
        setFormShow(false);
        setLoader(false);
      setIsShowHide(true);

      } else {
        console.log(response?.error);
        toast.error("Something went wrong");
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.log("error: ", error);
        setLoader(false);
        let msg =
          error?.response?.error ??
          error?.response?.message ??
          "Something went wrong";
          toast.error("Something went wrong");
      }
    }
  };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!feedbackData.grade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }

    if (
      !feedbackData.description ||
      feedbackData.description.trim().length == 0
    ) {
      err.description = "Please Enter Assignment Description.";
      isErr = true;

      setFeedbackData((prevState) => ({
        ...prevState,
        description: "",
      }));
    }

    if (!feedbackData.focus || feedbackData.focus.trim().length == 0) {
      err.focus = "Please Enter Focus on Feedback/Rubrik Categories.";
      isErr = true;

      setFeedbackData((prevState) => ({
        ...prevState,
        focus: "",
      }));
    }

    if (
      !feedbackData.studentFeedback ||
      feedbackData.studentFeedback.trim().length == 0
    ) {
      err.studentFeedback = "Please Enter Student Work to Give Feedback On.";
      isErr = true;

      setFeedbackData((prevState) => ({
        ...prevState,
        studentFeedback: "",
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
    const response = await generateInstantFeedback();
  };


  const closeFormDataShow = () => {
    setFormDataShow(false);
    setFormShow(true);
  };

  const handleAction = () => {
    setVisible(true);
  };

  const setExamples = () => {
    setFeedbackData({
      grade:  { name: "Grade 8", code: "10" },
      description:  `Analyze imagery in "Of Mice and Men" by including at least three examples of imagery from the text `,
      focus: `Accurate analysis of the use of imagery and appropriate examples of imagery. correct grammar and spelling `,
      studentFeedback:`In "Of Mice and Men," John Steinbeck uses lots of pictures in words to show the hard life during the Great Depression. The pictures help us feel what it was like for the characters, and they make the book more interesting. One big example of this is when George talks about the dream ranch he wants with Lennie.

    In the book, George says, "O.K. Someday—we're gonna get the jack together and we're gonna have a little house and a couple of acres an' a cow and some pigs..." This picture George paints makes us see a nice, calm place where they can live happy. The house, the acres, and the animals give us a good feeling. It's like a movie in our mind, and we can see it clear.

    Another picture is when George talks about the rabbits Lennie wants to take care of. George says, "We'll have a big vegetable patch and a rabbit hutch and chickens. And when it rains in the winter, we'll just say the hell with going' to work, and we'll build up a fire in the stove and set around it an' listen to the rain comin' down on the roof." This makes us see a cozy place where they can relax. The rain, the fire, and the rabbits give us a warm feeling. It's like a happy painting in our head.

    The pictures in words make "Of Mice and Men" more real, and we can feel what the characters feel. It's like we're right there with them, seeing everything they see. The author uses these pictures to help us understand the story better and to make us care about the characters.`
    });
    setError({})
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
  };

  const resetAndClear = ()=>{
    setFeedbackData({
        grade: "",
        description:"",
        focus:"",
        studentFeedback:""
      });
      setError({})
      setIsShowHide(false)
      setFormShow(true);
      setFormDataShow(false);
      setVisible(false);
      setIsExVisible(false);
  }

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
                resetAndClear();
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
              onClick={() => setExamples()}
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
              <div  className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
              <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.instantfeedback}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] pt-[5px]">
                      {AppDesc.instantfeedback}
                    </p>
                  </div>
                {
                        isShowHide == true ?(isShowHide && !loader &&
                        <button className='flex w-[150px] xl:w-[150px] 3xl:w-[8.454vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                        onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                     }}
                     >
                     <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>) :<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.StudentFeedback}</div>
               }
               </div>
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  {loader ? (
                    <div className="h-[500px] flex justify-center items-center">
                      <ProgressSpinner />
                    </div>
                  ) : (
                    <div className="grid xl:gap-[1.25vw] gap-[18px]">
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level:<span className="text-[red] ml-1">*</span>
                        </label>
                        <Dropdown
                          filter
                          value={feedbackData.grade}
                          onChange={(e) => {
                            setFeedbackData({
                              ...feedbackData,
                              grade: e.target.value,
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
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Assignment Description:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="">
                          <InputTextarea
                            autoResize
                            placeholder="Domain Addition"
                            rows={1}
                            cols={5}
                            className="w-full  "
                            value={feedbackData.description}
                            onChange={(e) => {
                              setFeedbackData({
                                ...feedbackData,
                                description: e.target.value,
                              });
                              if (e.target.value) {
                                setError({ ...error, description: "" });
                              }
                            }}
                          />
                          {error.description ? (
                            <span style={{ color: "red" }}>
                              {error.description}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Focus of Feedback/Rubric:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <InputTextarea
                            autoResize
                            placeholder="Focus on Feedback"
                            rows={2}
                            cols={5}
                            className="w-full relative pl-[35px]"
                            value={feedbackData.focus}
                            onChange={(e) => {
                              setFeedbackData({
                                ...feedbackData,
                                focus: e.target.value,
                              });
                              if (e.target.value) {
                                setError({ ...error, focus: "" });
                              }
                            }}
                          />
                          {error.focus ? (
                            <span style={{ color: "red" }}>{error.focus}</span>
                          ) : (
                            <></>
                          )}

                          <div className="absolute top-[14px] left-[10px] -rotate-45">
                            <Image
                              src={"/images/attach1.svg"}
                              width={16}
                              height={16}
                              alt="Download"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Student Work to Give Feedback On:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <InputTextarea
                            autoResize
                            placeholder="Student Response"
                            rows={5}
                            cols={5}
                            className="w-full relative pl-[35px]"
                            value={feedbackData.studentFeedback}
                            onChange={(e) => {
                              setFeedbackData({
                                ...feedbackData,
                                studentFeedback: e.target.value,
                              });
                              if (e.target.value) {
                                setError({ ...error, studentFeedback: "" });
                              }
                            }}
                          />
                          {error.studentFeedback ? (
                            <span style={{ color: "red" }}>
                              {error.studentFeedback}
                            </span>
                          ) : (
                            <></>
                          )}

                          <div className="absolute top-[14px] left-[10px] -rotate-45">
                            <Image
                              src={"/images/attach1.svg"}
                              width={16}
                              height={16}
                              alt="Download"
                            />
                          </div>
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
                    </div>
                  )}
                </form>


              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.instantfeedback}`}
                onHide={() => {
                  closeFormDataShow();
                }}
                handleAction={handleAction}
                response={responsetoshow}
                contentRef={copyRef}
                appLink={"/instantfeedback"}
              ></Commonresponse>
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
                 
                  onClick={()=>{resetAndClear(),setIsShowHide(false)}}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${ loader == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
              onClick={()=>setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center  ${ loader == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
          {visible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.instantfeedback}`}
            response={responsetoshow}
            visible={visible}
            position={position}
            setVisible={setVisible}
            contentRef={copyRef}
            appLink={"/instantfeedback"}
            isExVisible={isExVisible}
          />
        )}
        </div>
        {renderPopup()}
      </div>
    </Layout>
  );
}
