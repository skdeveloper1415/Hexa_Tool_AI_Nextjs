"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, QUESTIONS,AppId, AppTitle, AppDesc } from "../../components/helper/enum";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { generateMathStoryWordProblemAPI } from "../../app/actions/mathStoryWordProblems";
import { stringResponseConvert } from "../helper/stringResponseConvert";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import Commonresponse from "../../app/common/commonResponse";
import CommonAction from "../commonAction";
import { cancelPendingRequests } from "../../app/actions";


export default function MathStoryWordProblems({mathstoryVisible, onhide, setInstruction, isActionVisible }) {

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
        // setInstruction(transformedResponse);
      } else {
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
    console.log('error:', error);
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    }
  };

  const handleAction = () => {
    setFormShow(false)
    setIsActionvisible(true);
  };

  const handleDiaglogHide=()=>{
    if( loading == true){
      setDialogVisible(true)
      // handleHide()
    }else {
      onhide();
    }
  }

  const handleHide=()=>{
    setDialogVisible(false);
   }
  

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

  const handleClearAndHide =()=>{
    handleDiaglogHide();
    setLoading(false);
    setGradeLevel(null);
    setNoOfQuestions(null);
    setMathStandardValue("");
    setStoryTopicValue("");
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
              <div className="flex justify-between items-center">
              <div className="grid">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                <b>{AppTitle.dbq}</b>
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                 {AppDesc.dbq}
                </p>
                </div>
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

                    <form className="grid xl:gap-[0.625vw] gap-[10px]">
                      <div>
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
                      <div>
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
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Math Standard / Objective / Topic:{" "}
                          <span className="text-[red]">*</span>
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
                          Story Topic: <span className="text-[red]">*</span>
                        </label>
                        <InputTextarea autoResize placeholder="Type..."
                          value={storyTopicValue}
                          onChange={(e) => {
                            setStoryTopicValue(e.target.value)
                          }} rows={3} className="w-full" />
                        {error.storyTopicValue ? <span style={{ color: 'red' }}>{error.storyTopicValue}</span> : <></>}
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
                  url={process.env.NEXT_PUBLIC_BASE_URL+'/aiapps/mathstorywordproblems'}
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
        
      </Dialog> : null }
      </>
  );
}
