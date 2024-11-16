"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppDesc, AppId, AppTitle, GRADE } from "../helper/enum";
import Commonresponse from "../../app/common/commonResponse";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import { QUESTIONS } from "../helper/enum";
import { toast } from "react-toastify";
import { generateMathSpiralReview } from "../../app/actions/mathSpiralReview";
import { stringResponseConvert } from "../helper/stringResponseConvert";
import CommonAction from "../commonAction";

export default function MathSpiralView({visible,onhide,setInstruction, isActionVisible}) {
    const [multiStepData, setmultiStepData] = useState();
    const [noproblem, setNoproblem] = useState();
    const [contentType, setContentType] = useState();
    const [visible1, setVisible1] = useState(false);
    const [exempler, setExempler] = useState(false);
    const [isActionvisible, setIsActionvisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
  
    const items = [{ label: `${AppTitle.mathSpiralReview}`, url: "" }];
    const home = { label: "BrixAI Apps", url: "/aiapps" };
      
    const appId = AppId.mathSpiralReview;
    const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  
    const [ip, setIp] = useState("");
  
    useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);
  
    const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts
    const [formShow, setFormShow] = useState(true);
    const [additionalCriteria, setAdditionalDetail] = useState();
    const [isExVisible, setIsExVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const [responseTitle, setResponseTitle] = useState("");
    const [responseContent, setResponseContent] = useState([]);
    const [isShowHide, setIsShowHide] = useState(false); 
    const contentRef = useRef(null);
  
    const responseData = responseContent.length > 0 ? (
      <div ref={contentRef}>
        <div>
          <h4 className="text-[18px] xl:text-[0.833vw] mb-3"> {responseTitle}</h4>
          <div className="text-[18px] xl:text-[0.833vw] mb-3">
            {responseContent.length > 0
              ? responseContent.map((item, i) => (
                <p key={i} className="my-2 text-[14px]">
                  {item}
                </p>
              ))
              : null}
          </div>
        </div>
      </div>
    ) : ""
  
    const validate = () => {
      let err = {};
      let isErr = false;
      if (!multiStepData || multiStepData.name.trim() === "") {
        err.grade = "Please Select Grade Level.";
        isErr = true;
      }
      if (!contentType || contentType.trim() === "") {
        err.contentType = "Please Enter Math Content.";
        isErr = true;
      }
      if (!noproblem || noproblem.name.trim() === "") {
        err.noproblem = "Please Select Number of Problems.";
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
      setIsLoading(true);
      const payload = {
        grade: multiStepData.name,
        math_topic: contentType,
        number_of_questions: noproblem.code,
        additional_criteria: additionalCriteria,
      };
      try {
        const response = await generateMathSpiralReview(payload);
        if (response.data.code == "200") {
          const responseData = response.data.data;        
          const transformedResponse = stringResponseConvert(responseData);
          setVisible1(true);
          setResponseTitle(transformedResponse?.Title);
          setResponseContent(transformedResponse?.Content);
          const attemptValid = handleClickAttempt();
          if (!attemptValid) {
            setIsLoading(false)
            return;
          }
          setFormShow(false);
          setIsExVisible(true);
          setIsLoading(false);
          setIsShowHide(true);
        }
      } catch (error) {
        if(error.message!='Operation canceled by the user.'){
          console.log(error);
          toast.error("Something went wrong");
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };
  
    const setExamples = () => {
      setmultiStepData({name: 'Grade 6', code: '8'})
      setContentType('Dividing two and three digit numbers ')
      setNoproblem({name: '5', code: '5'})
      setAdditionalDetail('Make them word problems')
      setError({})
      setIsActionvisible(false)
      setFormShow(true);
      setIsExVisible(false);
      setExempler(false)
      setVisible1(false);
    };

    const handleDiaglogHide=()=>{
      if( isLoading == true){
        setDialogVisible(true)
        // handleHide()
      }else {
        onhide();
      }
    }

    const handleAction = () => {
      setIsActionvisible(true);
    };

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
      setVisible1(false)
      setIsLoading(false);
      // cancelPendingRequests()
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

    const handleClearAndHide =()=>{
      handleDiaglogHide();
      setIsLoading(false);
      setmultiStepData(null)
      setContentType('')
      setNoproblem(null)
      setAdditionalDetail('')
      setError({})
      setIsShowHide(false);
    }

  return (
    <div>
      <Dialog
        className="custom-popup w-[800px]  "
        header=" "
        visible={visible}
        style={{ width: "50vw" }}
        // onHide={() => {
        //     onhide();
        //   }}
        onHide={handleClearAndHide}
        blockScroll
      >
   
      <div className="">
        
  
          <div className=" ">
          {formShow && (
              <>
                <div className="flex justify-between items-center">
                <div className="grid">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                <b>{AppTitle.brain}</b>
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                 {AppDesc.brain}
                </p>
                </div>
                {
                    isShowHide && !isLoading &&
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setVisible1(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>
                  }
                </div>
                {isLoading == true ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ">*</span>
                      </label>
                      <Dropdown
                        value={multiStepData}
                        onChange={(e) => {
                          setmultiStepData(e.target.value),
                            setError((prevError) => ({
                              ...prevError,
                              grade: "", // Clear error message when a selection is made
                            }));
                        }}
                        options={GRADE}
                        filter
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
                        Math Content:<span className="text-[red] ">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>
                        <InputTextarea
                          autoResize
                          placeholder="Arithmatic operation..."
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "", // Clear error message when a selection is made
                              }));
                          }}
                          rows={3}
                          className="w-full pl-[35px]"
                        />
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Problems:
                        <span className="text-[red] ">*</span>
                      </label>
                      <Dropdown
                        value={noproblem}
                        onChange={(e) => {
                          setNoproblem(e.value),
                            setError((prevError) => ({
                              ...prevError,
                              noproblem: "", // Clear error message when a selection is made
                            }));
                        }}
                        options={QUESTIONS}
                        filter
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.noproblem ? (
                        <span style={{ color: "red" }}>{error.noproblem}</span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Criteria (Optional):
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>

                        <InputTextarea
                          autoResize
                          placeholder="Make them word problems etc."
                          value={additionalCriteria}
                          onChange={(e) => {
                            setAdditionalDetail(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                additionalCriteria: "", // Clear error message when a selection is made
                              }));
                          }}
                          rows={3}
                          className="w-full pl-[35px]"
                        />
                        {error.additionalCriteria ? (
                          <span style={{ color: "red" }}>
                            {error.additionalCriteria}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div>
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
            {visible1 == true  && (
              <Commonresponse
                title={`${AppTitle.brain}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), 
                  setFormShow(true);
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responseData}
                contentRef={contentRef}
                appLink={"/mathstorywordproblems"}
              />
            )}
          
          </div>
    

        {isActionvisible && (
         <CommonAction
            title={`Generated ${AppTitle.brain}`}
            response={responseData}
            visible={isActionvisible}
            contentRef={contentRef}
            appLink={"/realworldconnections"}
            setVisible={setIsActionvisible}
            setDataEditor={setInstruction}
            onHide={() => {
              setVisible1(false);
              setFormShow(true);
              onhide()
              setIsActionvisible(false);
              handleClearAndHide();
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

