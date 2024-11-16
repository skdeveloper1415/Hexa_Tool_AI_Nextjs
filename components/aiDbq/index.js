"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, QUESTIONS, AppId, AppTitle, AppDesc } from "../helper/enum";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { generateTextDependentQuestions } from "../../app/actions/dbq";
import { stringResponseConvert } from "../helper/stringResponseConvert";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import Commonresponse from "../../app/common/commonResponse";
import CommonAction from "../commonAction";
import { cancelPendingRequests } from "../../app/actions";


export default function AIDBQ({ mathstoryVisible, onhide, setInstruction, isActionVisible,setTitle,setAssignments }) {

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
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({})
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [noOfQuestions, setNoOfQuestions] = useState(null);
  const [questionType, setQuestionType] = useState("");
  const [textContent, setTextContent] = useState("");
  const [responseTitle, setResponseTitle] = useState("");
  const [responseContent, setResponseContent] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

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
    if (questionType === "" || questionType.trim() === "") {
      err.questionType = 'Please Enter Question Type.'
      isErr = true
    }
    if (textContent === "" || textContent.trim() === "") {
      err.textContent = 'Please Enter Text Content.'
      isErr = true
    }

    setError(err)
    return isErr
  }

  const copyRef = useRef(null);

  const HeaderData = () => {
    return (
      <div className="flex">
        Confirmation
      </div>
    )
  }

  const accept = () => {
    // setVisible(false)
    setLoading(false);
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
        "no_of_questions": noOfQuestions?.code,
        "question_type": questionType,
        "text_content": textContent
      }
      const response = await generateTextDependentQuestions(payload);
      if (response.data.code == '200') {
        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false)
          return;
        }

        const responseData = response.data.data.data ?? [];
        //convert response
        console.log('responseData',responseData)
        let questions = responseData?.Context[0]?.Question;
        setQuestions(questions);
        let answers = responseData?.Context[1]?.Answer;
        setAnswers(answers);
        setResponseTitle(responseData.Title);
        setTitle(responseData.Title)
        setAssignments({title: responseData.Title})
        setLoading(false);
        setFormDataShow(true);
        setIsExVisible(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
      console.log('error:', error);
      if (error.message != 'Operation canceled by the user.') {
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    }
  };

  const handleAction = () => {
    setFormShow(false)
    setIsActionvisible(true);
  };

  const handleDiaglogHide = () => {
    if (loading == true) {
      setDialogVisible(true)
      // handleHide()
    } else {
      onhide();
    }
  }

  const handleHide = () => {
    setDialogVisible(false);
  }

  const handleExample = () => {
 
    setTextContent(`"The Great Depression was a severe worldwide economic downturn that began in the late 1920s and lasted throughout the 1930s. It marked one of the most challenging periods in modern history, impacting economies, societies, and individuals around the globe. Here are key aspects of the Great Depression:

    1. Economic Causes: The Great Depression was triggered by a combination of factors, including the stock market crash of October 1929, known as Black Tuesday. Stock prices plummeted, wiping out fortunes and sparking widespread panic among investors.
    
    2. Global Impact: The economic crisis spread globally, affecting countries worldwide. International trade declined sharply, leading to unemployment, poverty, and social unrest in many nations.
    
    3. Social and Human Impact: The Great Depression caused widespread suffering and hardship. Millions lost their jobs, homes, and savings. Breadlines and shantytowns became common sights as people struggled to survive.
    
    4. Government Response: Governments responded with various strategies to combat the economic downturn. In the United States, President Franklin D. Roosevelt implemented the New Deal, a series of programs aimed at providing relief, recovery, and reform. These included public works projects, social welfare programs, and financial reforms."`)
    setQuestionType("Short description ")
    setNoOfQuestions({ name: '5', code: '5' },)
    setGradeLevel({name: "Grade 10", code: "12"})
    setError({});
    setFormDataShow(false);
    setFormShow(true);
  };


  const responsetoshow = (
    answers?.length > 0 && questions?.length > 0 ? (
      <div
        ref={copyRef}
        className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
      >
        {/* <h1>
          <b>Title: </b> {responseTitle}{" "}
        </h1>
        <br></br> */}
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

  const handleClearAndHide = () => {
    handleDiaglogHide();
    setLoading(false);
    setGradeLevel(null);
    setNoOfQuestions(null);
    setQuestionType("");
    setTextContent("");
    setError({})
    setIsShowHide(false);
  }

  return (
    <>
      <Dialog
        className="custom-popup w-[800px]  "
        header=" "
        visible={mathstoryVisible}
        style={{ width: "50vw" }}
        onHide={handleClearAndHide}
        blockScroll
      >

        <div className="">
          {formShow && (
            <>
              <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px] gap-2">
                <div className="grid">
                  <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                    <b>{AppTitle.textdependentquestions}</b>
                  </h3>
                  <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    {AppDesc.textdependentquestions}
                  </p>

                 
                </div>
                <button
              onClick={handleExample}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF]
               font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px]
                xl:py-[0.573vw] py-[11px] justify-center  items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
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
                {
                  isShowHide && !loading &&
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
           

              {
                loading ? <div className="flex justify-center items-center h-[300px]"><ProgressSpinner /></div> :

                  <form>
                    <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red]">*</span>
                        </label>
                        <Dropdown
                          filter value={gradeLevel}
                          onChange={(e) => {
                            setGradeLevel(e.value);
                          }}
                          options={GRADE} optionLabel="name"
                          placeholder="Select" className="w-full md:w-14rem" />
                        {error.gradeLevel ? <span style={{ color: 'red' }}>{error.gradeLevel}</span> : <></>}
                      </div>
                    
                    <div className="grid col-span-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Questions{" "}
                        <span className="text-[red]">*</span>
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
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Questions Type:{" "}
                        <span className="text-[red]">*</span>
                      </label>
                      <InputTextarea
                        autoResize placeholder="Type..."
                        value={questionType}
                        onChange={(e) => {
                          setQuestionType(e.target.value)
                        }} rows={1} className="w-full" />
                      {error.questionType ? <span style={{ color: 'red' }}>{error.questionType}</span> : <></>}
                    </div>
                    <div className="mb-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Text: <span className="text-[red]">*</span>
                      </label>
                      <InputTextarea autoResize placeholder="Type..."
                        value={textContent}
                        onChange={(e) => {
                          setTextContent(e.target.value)
                        }} rows={3} className="w-full" />
                      {error.textContent ? <span style={{ color: 'red' }}>{error.textContent}</span> : <></>}
                    </div>
                    <div>
                      <button
                        onClick={handleSubmit}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570ef] bg-[#1570ef] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
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
                title={`${AppTitle.dbq}`}
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
                url={process.env.NEXT_PUBLIC_BASE_URL + '/aiapps/mathstorywordproblems'}
              />
            </>
          )}
        </div>

        {isActionvisible &&
          <CommonAction
            title={`Generated ${AppTitle.dbq}`}
            response={responsetoshow}
            visible={isActionvisible}
            position={position}
            contentRef={copyRef}
            setDataEditor={setInstruction}
            setVisible={setIsActionvisible}
            appLink={'/mathstorywordproblems'}
            onHide={() => {
              setFormDataShow(false);
              setFormShow(true);
              onhide()
              setIsActionvisible(false);
              handleClearAndHide()
            }}
            setBooleanValue={isActionVisible}
          />}

      </Dialog>
      {dialogVisible == true ?
        <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }}
          // onHide={() => setDialogVisible(false)} 
          onHide={handleHide}
          className='ConfirmDialog'>
          <p className="m-0">
            Are you sure you want to close?
          </p>

        </Dialog> : null}
    </>
  );
}
