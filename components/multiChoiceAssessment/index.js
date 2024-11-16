"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppDesc, AppId, AppTitle, GRADE } from "../helper/enum";
import Commonresponse from "../../app/common/commonResponse";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import { QUESTIONS } from "../helper/enum";
import { toast } from "react-toastify";
import { generateMultiChoiceAssesmentApi } from "../../app/actions/multiChoiceAssesmentApi";
import CommonAction from "../commonAction";
import { cancelPendingRequests } from "../../app/actions";


export default function MultiChoiceAssesment({setisFormIconDisable,setQuestion,visible,onhide,setInstruction,isActionVisible,clearInputs,setDocumentTitle,isMultiChoiceVisible ,instruction,setquizInstruction,setisGoogleFormCreated ,setLoadings}) {
  const contentRef = useRef(null);
  const [contentType, setContentType] = useState();
  const items = [{ label: `${AppTitle.multiChoiceAssesment}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);


  const appId = AppId.multiChoiceAssesment;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;

  const [ip, setIp] = useState("");
  const [isLoading,setLoading] = useState(false);

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

  const [gradeLevel, setGradeLevel] = useState(null);
  const [numOfQuestions, setNumOfQuestions] = useState(null);
  const [isShowHide, setIsShowHide] = useState(false); 
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [questionsData, setQuestionsData] = useState(null);
  const [exempler, setExempler] = useState(false);
  const [err, setError] = useState({});
  const [position, setPosition] = useState("center");
  const [title, setTitle] = useState(
    `${AppTitle.multiChoiceAssesment}`
  );
  const generateMultiChoiceResponse = async (data) => {
    try {
      const response = await generateMultiChoiceAssesmentApi(data);
      if (response.data.code == 200) {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }

        setQuestionsData(response.data.data.data.questions);
        setQuestion(response.data.data.data.questions);
        setFormDataShow(true);
        setLoading(false);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong 1 ");
        setLoading(false);
      }
    } catch (error) {
    console.log('error:', error);
      if(error.message!='Operation canceled by the user.'){
        toast.error(error);
        setLoading(false);
        setFormDataShow(false);
        setFormShow(true);
        toast.error("Something Went Wrong");
      }
    }
  };
  const createResponse = questionsData ? (
    <div
      ref={contentRef}
      className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
    >
      {questionsData &&
        questionsData?.map((item, index) => (
          <div key={index}>
            <h4>
              {index + 1}.{item.question}
            </h4>
            <ul>
              {Object.entries(item.options).map(([key, value]) => (
                <li key={key}>
                  {key}-{value}
                </li>
              ))}
            </ul>
            <div key={index} className="answer-item">
              {/* <h4>
                {index + 1}.{item.question}
              </h4> */}
              <p><b>Answer : {' '}</b>{` ${item.answer}`}</p>
            </div>
          </div>
        ))}

      {/* <div className="answers-section">
        <h3>Answers:</h3>
        {questionsData &&
          questionsData?.map((item, index) => (
            <div key={index} className="answer-item">
              <h4>
                {index + 1}.{item.question}
              </h4>
              <p>{index + 1}.{` ${item.answer}`}</p>
            </div>
          ))}
      </div> */}
    </div>
  ) : ""

  const createResponseForSetInstuction = questionsData ? (
    <div
      ref={contentRef}
      className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
    >
      {questionsData &&
        questionsData?.map((item, index) => (
         
          <div key={index}>
            <h4>
              {index + 1}.{item.question}
            </h4>
            <ul>
              {Object.entries(item.options).map(([key, value]) => (
                <li key={key}>
                  {key}-{value}
                </li>
              ))}
            </ul>
            <br/>
          </div>
        
      
        ))}

    </div>
  ) : ""

  const handleDiaglogHide=()=>{
    if( isLoading == true){
      setDialogVisible(true)
      // handleHide()
    }else {
      onhide();
    }
  }

  const handleHide=()=>{
    setDialogVisible(false);
   }

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
      <button onClick={() => {setDialogVisible(false)}} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>
  
      <button onClick={accept} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  );

  const handleAction = () => {
    // setFormDataShow(false);
    setIsActionvisible(true);
    setTitle(`Generated ${AppTitle.multiChoiceAssesment}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }

    try {
      setLoading(true);
      const payload = {
        grade: gradeLevel.code,
        topic: contentType,
        no_of_questions: numOfQuestions.name,
      };
      generateMultiChoiceResponse(payload);
    } catch (error) {
    console.log('error:', error);
    }
   
  };


  const handleEdit = () => {
    setFormDataShow(false);
    setFormShow(true);
  };


  const validate = () => {
    let err = {};
    let isErr = false;
  
    if (!gradeLevel) {
      err.gradeLevel = "Please select a Grade Level.";
      isErr = true;
    }
  
    if (!numOfQuestions) {
      err.numOfQuestions = "Please select Number of Questions.";
      isErr = true;
    }
  
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please enter Topic, Standard, or Description.";
      isErr = true;
    }
  
    setError(err); // Update error state
  
    return isErr;
  };
 
  const handleExample = () => {
    setGradeLevel({ name: "Grade 7", code: "9" });
    setNumOfQuestions({ name: "5", code: "5" });
    setContentType("Understanding of the process of photosynthesis, including the role of chlorophyll, the reactants and products involved, and the significance of this process in plants.");
    setTitle(`${AppTitle.multiChoiceAssesment}`);
    setFormShow(true);
    setFormDataShow(false);
    };

  const handleHidePopup =()=>{
    handleDiaglogHide();
    setIsShowHide(false);
    setLoading(false);
    setGradeLevel(null);
    setNumOfQuestions(null);
    setContentType()
  }

  
  return (
    <div>
      <Dialog
        className="custom-popup w-[800px]  "
        header=" "
        visible={visible}
        style={{ width: "50vw" }}
        onHide={handleHidePopup}
        blockScroll
      >
   
      <div className="">
        
  
          <div className=" ">
            {formShow && (
              <>
              <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px] ">
              <div className="grid">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                <b>{AppTitle.multiChoiceAssesment}</b>
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                 {AppDesc.multiChoiceAssesment}
                </p>
                </div>

                <button
              onClick={() => {
                handleExample();
              }}
              disabled={isLoading}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] py-[11px] justify-center  ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""
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
                    isShowHide && !isLoading &&
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

                {isLoading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ProgressSpinner style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <form className="grid xl:gap-[0.625vw] gap-[12px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level
                        <span className="text-[red]">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.value)}
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {err.gradeLevel && (
                        <div className="text-red-500">{err.gradeLevel}</div>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Questions
                        <span className="text-[red]">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={numOfQuestions}
                        onChange={(e) => setNumOfQuestions(e.value)}
                        options={QUESTIONS}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {err.numOfQuestions && (
                        <div className="text-red-500">{err.numOfQuestions}</div>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Topic, Standard, Text or Description of the Assessment
                        (be specific):
                        <span className="text-[red]">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={contentType}
                        onChange={(e) => {setContentType(e.target.value); setDocumentTitle&& setDocumentTitle(e.target.value)}}
                        rows={3}
                        className="w-full"
                      />
                      {err.contentType && (
                        <div className="text-red-500">{err.contentType}</div>
                      )}
                    </div>

                    <div className="mt-[30px]">
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570ef] bg-[#1570ef] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      >
                        {isLoading ? "Please Wait ....." : "Generate with BrixAI"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={title}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                  // handleHidePopup()
                }}

                handleAction={handleAction}
                setIsExVisible={exempler}
                response={createResponse}
                contentRef={contentRef}
                handleEdit={handleEdit}
                appLink={"/multiChoiceAssesment"}
              />
            )}
          
          </div>
    

        {isActionvisible && (
         <CommonAction
         setLoading={setLoadings}
         setisGoogleFormCreated={setisGoogleFormCreated}
         setisFormIconDisable={setisFormIconDisable}
         isMultiChoiceVisible={isMultiChoiceVisible}
            title={`Generated ${AppTitle.multiChoiceAssesment}`}
            instruction={instruction}
            setquizInstruction={setquizInstruction}
            response={createResponseForSetInstuction}
            visible={isActionvisible}
            contentRef={contentRef}
            appLink={"/realworldconnections"}
            setVisible={setIsActionvisible}
            setDataEditor={setInstruction}
            onHide={() => {
              setFormDataShow(false);
              setFormShow(true);
              onhide()
              setIsActionvisible(false);
              handleHidePopup()

            }}
            setBooleanValue={isActionVisible}        
          />
        )}
        {renderPopup()}
      </div>
    
      </Dialog>
      {dialogVisible == true ? 
      <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }} 
      // onHide={() => setDialogVisible(false)} 
      onHide={handleHide}
      className='ConfirmDialog'>
          <p className="m-0">
          Are you sure you want to close?
          </p>
        
      </Dialog> : null }
    </div>
  );
}

