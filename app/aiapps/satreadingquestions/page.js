"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { AppCategory, AppId, AppTitle, QUESTIONS } from "../../../components/helper/enum";
import { generateSATReadingQuestions } from "../../actions/SATReadingQuestionsApi";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const copyRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState({});
  const [assignment, setAssignment] = useState("");
  const [title, setTitle] = useState("");

  const items = [{ label: `${AppTitle.satreadingquestions}`, url: "" }];
  const home = {
    label: "AIrrrr Apps",
    template: () => (
      <Link href="/">
        <span className="text-primary font-semibold">BrixAI Apps</span>
      </Link>
    ),
  };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isExVisible, setIsExVisible] = useState(false);
  const [resultResponse, setResult] = useState({
    numOfQuestions: "",
    text: "",
  });
  const [isShowHide, setIsShowHide] = useState(false); 

  const validate = () => {
    let err = {};
    let valid = false;

    if (!numOfQuestions) {
      err.numOfQuestions = "Please Select Number of Questions";
      valid = true;
    }

    if (!text || text.trim() === "") {
      err.text = "Please Enter Text";
      valid = true;
    }
    setError(err);

    return valid;
  };
  const appId = AppId.satreadingquestions;
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

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setLoader(true);
    try {
      const body = {
        no_of_questions: numOfQuestions?.code,
        text,
      };

      const response = await generateSATReadingQuestions(body);
      if (response.data.code == "200") {
        setAssignment(response.data.data.data);
        setResult({
          ...resultResponse,
          numOfQuestions: numOfQuestions?.code,
          text,
        });
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      }
      setIsExVisible(true);
      setLoader(false);
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        toast.error("Something Went Wrong.");
      }
    }
  };

  const handleAction = () => {
    setVisible(true);
    setTitle("Generated Professional Email");
    setIsActionvisible(true);
  };
  const handleEdit = () => {
    setFormDataShow(false);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);
  };

  let regex = /\d+\. (.*(?:\n\s+[A-D]\) .*)+)/g;
  let answerRegex = /(\d+)\.\s([A-D])\) (.+)/g;
  let matches = assignment?.match(regex);
  let questionsData = [];

  if (matches) {
    matches.forEach((match) => {
      let questionSplit = match.split("\n");
      let questionText = questionSplit[0].trim();
      let options = questionSplit.slice(1).map((option) => option.trim());

      questionsData.push({
        question: questionText,
        options: options,
      });
    });
  }

  let answerMatch = [...assignment?.matchAll(answerRegex)];
  let answerKey = [];

  answerMatch.forEach((match) => {
    let questionNumber = match[1];
    let answerLetter = match[2];
    let answerText = match[3];

    answerKey.push({
      questionNumber: questionNumber,
      answer: {
        letter: answerLetter,
        text: answerText,
      },
    });
  });

  const handleReset = () => {
    setNumOfQuestions("");
    setText("");
    setResult({
      ...resultResponse,
      numOfQuestions: "",
      text: "",
    });
    setError({});
    setFormDataShow(false);
    setIsShowHide(false);
  };
  const responsetoshow = (
    questionsData.length > 0 && answerKey.length > 0 ? (
      <div ref={copyRef}>
        <h5>SAT Reading Practice</h5>
  
        <h5>SAT Questions:</h5>
        <ol style={{ listStyleType: 'none' }} >
          {questionsData.map((item, index) => {
            let { question, options } = item;
            return (
              <div key={index}>
                <li className={`ml-[2rem] font-medium ${index !== 0 ? 'mt-[1rem]' : ''}`}>
                  {question}
                </li>
                <ul style={{ listStyleType: 'none' }}>
                  {options.map((element, optionIndex) => {
                    return (
                      <li key={optionIndex} className="font-medium ml-[4rem]">
                        {element}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </ol>
  
        <h5>Answer Key:</h5>
        <ol style={{ listStyleType: 'none' }}>
          {answerKey.map((item, index) => {
            return (
              <li key={index} className={`ml-[2rem] font-medium ${index !== 0 ? 'mt-[1rem]' : ''}`}>
                {item.questionNumber}: {item.answer.letter}
              </li>
            );
          })}
        </ol>
      </div>
    ) : null
  );
  

  return (
    <Layout>
      <div className="  mx-auto 3xl:px-[16.771vw]  2xl:px-[150px] xl:px-[100px] px-[20px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified isGenerate={loader} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
              onClick={() => handleReset()}
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
              onClick={() => {
                if (formDataShow) {
                  setFormShow(true);
                  setFormDataShow(false);
                }
                setNumOfQuestions({ name: "5", code: "5" });
                setText(
                  "In 1996, a loggerhead turtle called Adelita swam across9,000 miles from Mexico to Japan, crossing the entire Pacificon her way. Wallace J. Nichols tracked this epic journey with asatellite tag. But Adelita herself had no such technology at herdisposal. How did she steer a route across two oceans to findher destination?"
                );
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
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
              Try New
            </button>

            {isPopupVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                title={`Example for ${AppTitle.satreadingquestions}`}
                response={responsetoshow}
                contentRef={copyRef}
                appLink={"/satreadingquestions"}
              />
            )}
          </div>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {!formDataShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                   {AppTitle.satreadingquestions}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] ">
                  Generate practice questions in the style of the SAT reading
                  section based on any text of your choice.
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[260px] xl:w-[250px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
                  }
                  </div>
                {loader ? (
                  <div className="text-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Questions:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={numOfQuestions}
                        onChange={(e) => {
                          setNumOfQuestions(e.value);
                          if (e.target.value) {
                            setError({ ...error, numOfQuestions: "" });
                          }
                        }}
                        options={QUESTIONS}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.numOfQuestions ? (
                        <span style={{ color: "red" }}>
                          {error.numOfQuestions}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Text:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic cursor-pointer"></i>
                        </div>
                        <div className="absolute left-[12px] top-[50px] cursor-pointer -rotate-45">
                          <Image
                            src={"/images/attach1.svg"}
                            width={16}
                            height={16}
                            alt="Download"
                          />
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="Insert the text you want to use to generate the SAT style questions about."
                          rows={6}
                          className="w-full pl-[35px]"
                          value={text}
                          onChange={(e) => {
                            setText(e.target.value);
                            if (e.target.value) {
                              setError({ ...error, text: "" });
                            }
                          }}
                        />
                        {error.text ? (
                          <span style={{ color: "red" }}>{error.text}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  <Note/>
                    <div>
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          e.preventDefault();
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
                title={`${AppTitle.satreadingquestions}`}
                onHide={() => setFormDataShow(false)}
                handleAction={handleAction}
                response={responsetoshow}
                contentRef={copyRef}
                handleEdit={handleEdit}
                appLink={"/satreadingquestions"}
              />
            )}
          </div>
          
        </div>
      </div>
      {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.satreadingquestions}`}
          response={responsetoshow}
          visible={isActionvisible}
          position={position}
          setVisible={setIsActionvisible}
          contentRef={copyRef}
          appLink={"/satreadingquestions"}
        />
      )}
      {renderPopup()}
    </Layout>
  );
}
