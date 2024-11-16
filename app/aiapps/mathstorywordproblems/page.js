"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, QUESTIONS,AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateMathStoryWordProblemAPI } from "../../actions/mathStoryWordProblems";
import { toast } from "react-toastify";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";

import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const items = [
    { label: `${AppTitle.mathstorywordproblems}`, url: "" },
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const appId = AppId.mathstorywordproblems;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT
  const [ip, setIp] = useState("");
  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const [isShowHide, setIsShowHide] = useState(false); 
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({})

  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [noOfQuestions, setNoOfQuestions] = useState(null);
  const [mathStandardValue, setMathStandardValue] = useState("");
  const [storyTopicValue, setStoryTopicValue] = useState("");

  const [responseTitle, setResponseTitle] = useState("");
  const [responseContent, setResponseContent] = useState([]);

  const validate = () => {
    let err = {}
    let isErr = false;

    if (gradeLevel === null || gradeLevel.name.trim() === "") {
      err.gradeLevel = 'Please Select Grade Level.'
      isErr = true
    }
    if (noOfQuestions === null) {
      err.noOfQuestions = 'Please Select Number of Questions.'
      isErr = true
    }
    if (mathStandardValue === "" || mathStandardValue.trim() === "") {
      err.mathStandardValue = 'Please Enter Math Standard.'
      isErr = true
    }
    if (storyTopicValue === "" || storyTopicValue.trim() === "") {
      err.storyTopicValue = 'Please Enter Story Topic.'
      isErr = true
    }

    setError(err)
    return isErr
  }

  const copyRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      return
    }

    ////--------
    setIsExVisible(false);
    setLoading(true);
    try {
      const payload = {
        "grade": gradeLevel?.name,
        "number_of_questions": noOfQuestions?.code,
        "math_topic": mathStandardValue,
        "story_topic": storyTopicValue
      }
      const response = await generateMathStoryWordProblemAPI(payload);
      if (response.data.code == '200') {
        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
         setLoading(false)
          return;
        }

        let responseData = response.data.data ?? [];
        //convert response


        const transformedResponse = stringResponseConvert(responseData);
        setResponseTitle(transformedResponse?.Title);
        setResponseContent(transformedResponse?.Content);
        setLoading(false);
        setIsExVisible(true);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    }
  };


  const handleClear = () => {
    setGradeLevel(null);
    setNoOfQuestions(null);
    setMathStandardValue("");
    setStoryTopicValue("");
    setError({})
    setIsShowHide(false);
    setFormShow(true)
    setFormDataShow(false);
    setVisible(false);
  };

  const setExamples = () => {
    setGradeLevel({name: 'Grade 7', code: '9'});
    setNoOfQuestions({name: '6', code: '6'});
    setMathStandardValue('Multiplying and dividing fractions ');
    setStoryTopicValue('Managing money and investing, like in our stock market game');
    setError({})
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsShowHide(false)
    setIsExVisible(false);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

  const handleAction = () => {
    setIsActionvisible(true);
  };
  const responsetoshow = responseContent.length > 0 ? (
    <div ref={copyRef}>
      <div>
        <h4 className="text-[16px] xl:text-[0.843vw]">
          {" "}
          {responseTitle}
        </h4>
        {/* <ol className="text-[16px] xl:text-[0.833vw]"> */}

          {
            responseContent.length > 0 ?
              responseContent.map((item, i) => (
                <p key={i} className="mb-5 text-[14px]">
                  { item}
                </p>
              )) : null
          }

        {/* </ol> */}
      </div>
    </div>
  ): ""

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
              isGenerate={loading}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                handleClear();
              }}
              disabled={loading}
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
              onClick={() => setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
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
                      <b>{AppTitle.mathstorywordproblems}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] mt-[5px]">
                      {AppDesc.mathstorywordproblems}
                    </p>
                  </div>
                {
                   isShowHide == true ? (isShowHide && !loading &&
                    <button className='flex w-[230px] xl:w-[220px] 3xl:w-[10.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>):
                     <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.ContentLibrary}</div>
                  }
                  </div>

                {
                  loading ? <div className="flex justify-center items-center h-[300px]"><ProgressSpinner /></div> :

                    <form className="grid xl:gap-[1.25vw] gap-[18px]">
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:</label>
                        <Dropdown
                          filter value={gradeLevel}
                          onChange={(e) => {
                            setGradeLevel(e.value);
                          }}
                          options={GRADE} optionLabel="name"
                          placeholder="Select" className="w-full md:w-14rem" />
                        {error.gradeLevel ? <span style={{ color: 'red' }}>{error.gradeLevel}</span> : <></>}
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Number of Questions{" "}
                          <span className="text-[red] ">*</span>
                        </label>
                        <Dropdown
                          filter
                          value={noOfQuestions}
                          onChange={(e) => {
                            setNoOfQuestions(e.value)
                          }} options={QUESTIONS} optionLabel="name"
                          placeholder="Select" className="w-full md:w-14rem" />
                        {error.noOfQuestions ? <span style={{ color: 'red' }}>{error.noOfQuestions}</span> : <></>}
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Math Standard / Objective / Topic:{" "}
                          <span className="text-[red] ">*</span>
                        </label>
                        <InputTextarea
                          autoResize placeholder="Type..."
                          value={mathStandardValue}
                          onChange={(e) => {
                            setMathStandardValue(e.target.value)
                          }} rows={3} className="w-full" />
                        {error.mathStandardValue ? <span style={{ color: 'red' }}>{error.mathStandardValue}</span> : <></>}
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Story Topic: <span className="text-[red] ">*</span>
                        </label>
                        <InputTextarea autoResize placeholder="Type..."
                          value={storyTopicValue}
                          onChange={(e) => {
                            setStoryTopicValue(e.target.value)
                          }} rows={3} className="w-full" />
                        {error.storyTopicValue ? <span style={{ color: 'red' }}>{error.storyTopicValue}</span> : <></>}
                      </div>
                      {/* <Note/> */}
                      <div>
                        <button
                          onClick={handleSubmit}
                          className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        >
                          Generate with BrixAI
                        </button>
                      </div>
                    </form>
                }
              </>
            )}
            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.mathstorywordproblems}`}
                   onHide={() => {
                    setFormShow(true)
                    setFormDataShow(false)
                  }
                  }
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responsetoshow}
                  contentRef={copyRef}
                  appLink={"/mathstorywordproblems"}
                  url={process.env.NEXT_PUBLIC_BASE_URL+'/aiapps/mathstorywordproblems'}
                />
              </>
            )}
          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            {/* <button
              disabled={loading}
              onClick={
                () => {
                  if (formDataShow) {
                      setFormDataShow(false)
                      setFormShow(true)
                      setIsExVisible(false)
                      handleClear()
                  } else {
                      handleClear()
                  }
              }
              }
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] ${loading == true ? "opacity-50" : "" }`}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full ${
                loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => setExamples()}
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
            {isPopupVisible &&
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                title={`Example for ${AppTitle.mathstorywordproblems}`}
                contentRef={copyRef}
                response={responsetoshow}
                appLink={"/mathstorywordproblems"}
              />}
          </div>
          {isActionvisible &&
            <CommonActionExempler
              title={`Generated ${AppTitle.mathstorywordproblems}`}
              response={responsetoshow}
              visible={isActionvisible}
              position={position}
              contentRef={copyRef}
              setVisible={setIsActionvisible}
              appLink={'/mathstorywordproblems'} />}
        </div>
      </div>

      {renderPopup()}
    </Layout>
  );
}
