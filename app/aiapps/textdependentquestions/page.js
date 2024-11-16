"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import {
  GRADE,
  QUESTIONS,
  AppId,
  AppTitle,
  AppDesc,
  AppCategory
} from "../../../components/helper/enum";
import { fetchApi } from "../../actions";
import { useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { toast } from "react-toastify";
import Note from "../../common/Note";


export default function Index() {
  const contentRef = useRef(null);

  const [questionsData, setQuestionsData] = useState({
    grade: "",
    no_of_questions: "",
    question_type: "",
    text_content: "",
  });

  const [position, setPosition] = useState("center");
  const [error, setError] = useState({});
  const items = [{ label: `${AppTitle.textdependentquestions}`, url: "" }];
  const appId = AppId.textdependentquestions;
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

  const home = {
    label: "BrixAI Apps",
    template: () => (
      <Link href="/">
        <span className="text-primary font-semibold">BrixAI Apps</span>
      </Link>
    ),
  };

  const [isExVisible, setIsExVisible] = useState(false);
  const [isExamplerDisable, setExamplerDisabled] = useState(true);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [responseTitle, setResponseTitle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);

  const resetAndClear = () => {
    setQuestionsData({
      grade: "",
      no_of_questions: "",
      question_type: "",
      text_content: "",
    });

    setError({});
    setFormShow(true);
    setVisible(false);
    setIsExVisible(false);
    setFormDataShow(false);
    setIsShowHide(false)
    setExamplerDisabled(true);
  };

  const handleAction = () => {
    setVisible(true);
  };

  const generateTextDependentQuestions = async (payload) => {
    try {
      const response = await fetchApi.post(
        "/text-dependencies-question/",
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (!questionsData.grade) {
      toast.error("Please Select Grade Level.");
      return;
    }
   
    if (!questionsData.no_of_questions === "") {
      toast.error("Please Select Number Of Questions.");
      return;
    }

    if (
      !questionsData.question_type ||
      questionsData?.question_type?.trim() === ""
    ) {
      toast.error("Please Enter Question Type.");
      return;
    }
    
    if (
      !questionsData.text_content ||
      questionsData.text_content.trim().length == 0
    ) {
      toast.error("Please Enter Text Content.");
      setQuestionsData((prevState) => ({
        ...prevState,
        text_content: "",
      }));
      return;
    }
    setLoading(true);
   
    try {
      const body = {
        grade: questionsData.grade ? questionsData.grade?.name : "",
        no_of_questions: questionsData.no_of_questions
          ? questionsData.no_of_questions?.code
          : "",
        question_type: questionsData.question_type
          ? questionsData.question_type
          : "",
        text_content: questionsData.text_content
          ? questionsData.text_content
          : "",
      };

      const response = await generateTextDependentQuestions(body);

      if (response.data.code == 200) {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }

        const responseData = response.data.data.data ?? [];
        let questions = responseData.Context[0].Question;
        setQuestions(questions);
        let answers = responseData.Context[1].Answer;
        setAnswers(answers);
        setResponseTitle(responseData.Title);

        setLoading(false);
        setFormDataShow(true);
        setFormShow(false);
        setExamplerDisabled(false);
        setIsShowHide(true);
      } else {
        toast.error("Something went wrong.");
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        console.log("error: ", error);
        setLoading(false);
        toast.error("Something went wrong.");
      }
    }
  };


  const responsetoshow = (
    answers.length > 0 && questions.length > 0 ? (
      <div
        ref={contentRef}
        className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
      >
        <h1>
          {/* Text Dependent Questions on */}
          <b>Title: </b> {responseTitle}{" "}
        </h1>
        <br></br>
        <h2 className="mb-1">
          <b>Question:</b>
        </h2>
        {questions &&
          questions?.map((item, index) => (
            <div key={index}>
              <p>
                {" "}
                {index + 1}. {item}
              </p>
            </div>
          ))}

        <br></br>
        <h2 className="mb-1">
          <b>Answer:</b>
        </h2>
        {/* <br></br> */}
        {answers &&
          answers?.map((item, index) => (
            <div key={index} className="answer-item">
              <p>
                {index + 1}. {item}
              </p>
            </div>
          ))}
      </div>) : ""
  );

  const handleExample = () => {
    setQuestionsData({
      grade: { name: "Grade 10", code: "12" },
      no_of_questions: { name: '5', code: '5' },
      question_type: "Short description ",
      text_content: `"The Great Depression was a severe worldwide economic downturn that began in the late 1920s and lasted throughout the 1930s. It marked one of the most challenging periods in modern history, impacting economies, societies, and individuals around the globe. Here are key aspects of the Great Depression:

      1. Economic Causes: The Great Depression was triggered by a combination of factors, including the stock market crash of October 1929, known as Black Tuesday. Stock prices plummeted, wiping out fortunes and sparking widespread panic among investors.
      
      2. Global Impact: The economic crisis spread globally, affecting countries worldwide. International trade declined sharply, leading to unemployment, poverty, and social unrest in many nations.
      
      3. Social and Human Impact: The Great Depression caused widespread suffering and hardship. Millions lost their jobs, homes, and savings. Breadlines and shantytowns became common sights as people struggled to survive.
      
      4. Government Response: Governments responded with various strategies to combat the economic downturn. In the United States, President Franklin D. Roosevelt implemented the New Deal, a series of programs aimed at providing relief, recovery, and reform. These included public works projects, social welfare programs, and financial reforms."`,
    });
    setError({});
    setFormDataShow(false);
    setFormShow(true);
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
              isGenerate={loading}
            />
            <button
              onClick={resetAndClear}
              disabled={loading}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg
            lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center
             mb-5 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF]
               font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px]
                xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
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
                <div className="flex justify-between items-center gap-1">
                  <div>
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[18px] text-[#1570EF] font-medium">
                      <b>{AppTitle.textdependentquestions}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] ">
                      {AppDesc.textdependentquestions}
                    </p>
                  </div>
                  {
                    isShowHide == true ? (isShowHide && !loading &&
                      <button className='flex w-[180px] xl:w-[170px] 3xl:w-[8.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
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

                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  {loading ? (
                    <div className="flex justify-center h-[300px] items-center">
                      <ProgressSpinner />{" "}
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                        <div className="grid col-span-3">
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            Grade Level:<span className="text-[red] ml-1">*</span>
                          </label>
                          <Dropdown
                            filter
                            value={questionsData.grade}
                            onChange={(e) => {
                              setQuestionsData({
                                ...questionsData,
                                grade: e.target.value,
                              });
                            }}
                            options={GRADE}
                            optionLabel="name"
                            placeholder="Select"
                            className="w-full md:w-14rem"
                          />

                        </div>
                        <div className="grid col-span-3">
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            Number of Questions:
                            <span className="text-[red] ml-1">*</span>
                          </label>

                          <Dropdown
                            filter
                            value={questionsData.no_of_questions}
                            onChange={(e) => {
                              setQuestionsData({
                                ...questionsData,
                                no_of_questions: e.target.value,
                              });
                            }}
                            options={QUESTIONS}
                            optionLabel="name"
                            placeholder="Select"
                            className="w-full md:w-14rem"
                          />
                        </div>
                      </div>
                      <div >
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            Question Type:
                            <span className="text-[red] ml-1">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute left-[7px] top-[14px]">
                              <i className="hexatoolmic "></i>
                            </div>
                            <InputTextarea
                              autoResize
                              placeholder="Comprehensions"
                              value={questionsData.question_type}
                              onChange={(e) => {
                                setQuestionsData({
                                  ...questionsData,
                                  question_type: e.target.value,
                                });

                              }}
                              rows={1}
                              className="w-full pl-8"
                            />
                          </div>
                        </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Text:<span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-[7px] top-[14px]">
                            <i className="hexatoolmic"></i>
                          </div>

                          <InputTextarea
                            autoResize
                            placeholder="Anaerobic respiration produces 2 ATP per glucose molecule."
                            value={questionsData.text_content}
                            onChange={(e) => {
                              setQuestionsData({
                                ...questionsData,
                                text_content: e.target.value,
                              });
                            }}
                            rows={6}
                            className="w-full pl-8"
                          />
                        </div>
                        <div className="mt-5">
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
                    </div>
                  )}
                </form>
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.textdependentquestions}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                  setExamplerDisabled(true);
                }}
                handleAction={handleAction}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={"/textdependentquestions"}
              />
            )}
          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">

            {/* Example */}
            {isExVisible && (
              <CommonActionExempler
                onClose={() => setIsExVisible(false)}
                position={position}
                visible={isExVisible}
                header="Text dependent questions"
                title={`Generated ${AppTitle.textdependentquestions}`}
                response={responsetoshow}
                contentRef={contentRef}
                isExVisible={isExVisible}
                appLink={"/textdependentquestions"}
                setIsPopupVisible={setIsExVisible}
              />
            )}
          </div>
        </div>

        {visible && (
          <CommonActionExempler
            onClose={() => setVisible(false)}
            title={`Generated ${AppTitle.textdependentquestions}`}
            response={responsetoshow}
            visible={visible}
            position={position}
            setVisible={setVisible}
            contentRef={contentRef}
            appLink={"/textdependentquestions"}
            isExVisible={isExVisible}
            setIsPopupVisible={setIsExVisible}
          />
        )}
      </div>
      {renderPopup()}
    </Layout>
  );
}
