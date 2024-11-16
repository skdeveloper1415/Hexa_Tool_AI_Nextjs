"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppId, AppTitle, GRADE, AppDesc } from "../helper/enum";
import { generateSocialStories } from "../../app/actions/socialStories";
import Commonresponse from "../../app/common/commonResponse";
import CommonActionExempler from "../../app/common/CommonActionExempler";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import CommonAction from "../commonAction";
import { toast } from "react-toastify";
import { cancelPendingRequests } from "../../app/actions";


export default function AppsPopup({visible,onhide,setInstruction,isActionVisible,aiSocialStories}) {
  const contentRef = useRef(null);

  const [contentType, setContentType] = useState();
  const [visible1, setVisible1] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [multiStepData, setmultiStepData] = useState();
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);


  const handleAction = () => {
    // setVisible1(false)
    setFormDataShow(true);
    setIsActionvisible(true);
    setFormDataShow(false)  
  };

  const appId = AppId.socialstories;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;


  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await getIpAddress();
      setIp(ip);
    };
    fetchIpAddress();
  }, []);
  useEffect(()=>{
    if(visible ==  false){
      handleClear();
    }
  },[visible])

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(
    attempt,
    ip,
    appId
  ); // Change 3 to your desired maximum attempts

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!multiStepData) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    } else {
      err.grade = ""; // Clear the error message if there's input
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter  Social Situation, Event, or Activity";
      isErr = true;
    } else {
      err.contentType = ""; // Clear the error message if there's input
    }

    setError(err);
    return isErr;
  };


  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const payload = {
      grade: multiStepData?.name,
      text: contentType,
    };
    try {
      setIsLoading(true);
      // setPopupVisible(true)
      const response = await generateSocialStories(payload);
      if (response.data.code == "200") {
        setData(response.data.data.data);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
        setIsLoading(false);
          return;
        }
        setFormShow(false);
        setIsShowHide(true);
        setVisible1(true);
        setIsExVisible(true);
        setIsLoading(false);
        setShowExemplarButton(true);
      }else {
        console.log(response?.error)
        toast.error("Something Went Wrong");
      }
    } catch (error) {      
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const responseData = (
    
    data && Object.keys(data).length > 0 ? (
    <div ref={contentRef}>
      <h4 style={{fontWeight:'bold'}} >{data?.Message}</h4>
      {data?.Content?.map((item) => {
        return (
          <>
            <p style={{marginTop:'10px'}}>{item}</p>
            {/* <br></br> */}
          </>
        );
      })}
      {/* {data?.Content} */}
    </div> ) :""
  );

  const handleClear = (e) => {
    setVisible1(false);
    setFormShow(true);
    setmultiStepData("");
    setContentType("");
    setError({});
    setShowExemplarButton(false);
    setIsShowHide(false);
  };

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
        // onHide={data.length > 0  ? handleHide : ()=>onhide()}
        onHide={handleDiaglogHide}
      >
   
      <div className="">
        
  
          <div className=" ">
            {formShow && (
              <>
              <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="grid">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                <b>{AppTitle.blogCreater}</b>
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                 {AppDesc.blogCreater}
                </p>
                </div>

                <button
              disabled={isShowHide}
              onClick={() => {
                if (isLoading) {
                  setFormShow(true);
                  setFormDataShow(false);
                }
                setmultiStepData({ name: "Grade 4", code: "6" })
                setContentType(
                  "Understanding the Water Cycle: Nature's Recycling System Briefly introduce the concept of the water cycle and its importance to life on Earth. Mention how the water cycle contributes to weathering and erosion of the Earth's surface"
                );
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center  items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""
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
                    isShowHide &&
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setVisible1(true)
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Hide" />
                      Hide Prompt
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
                        Grade Level:<span className="text-[red]">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={multiStepData}
                        onChange={(e) => {
                          setmultiStepData(e.target.value),
                            setError((prevError) => ({
                              ...prevError,
                              grade: "", // Clear error message when a selection is made
                            }));
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
                        Social Situation, Event, or Activity:
                        <span className="text-[red]">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Getting ready for school, going to dentist, working in a group, attending a birthday party"
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "", // Clear error message when input is typed
                              }));
                          }}
                          rows={3}
                          className="w-full relative pl-[35px]"
                        />
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
                        ) : (
                          <></>
                        )}

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570ef] bg-[#1570ef] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          HandleGenerate(e);
                          // setFormDataShow(true)
                          // setFormShow(false)
                        }}
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {visible1 && (
              <Commonresponse
                title={`${AppTitle.blogCreater}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false); setFormShow(true);
                  
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responseData}
                contentRef={contentRef}
                appLink={"/socialstories"}
              />
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={isLoading == true ? true : false}
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                isLoading == true ? "opacity-50 cursor-not-allowed" : ""
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
              // disabled={!showExemplarButton}
              // onClick={() => setExempler(true)}
              onClick={handleExample}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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


        {exempler && (
          <CommonActionExempler
            contentRef={contentRef}
            onClose={() => {
              setExempler(false);
            }}
            setIsPopupVisible={setExempler}
            position={"center"}
            visible={exempler}
            isExVisible={isExVisible}
            title={`${AppTitle.blogCreater}`}
            response={responseData}
            setVisible={setExempler}
            appLink={"/socialstories"}
          />
        )}

        {/* {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.socialstories}`}
            response={responseData}
            visible={isActionvisible}
            position={"top"}
            setVisible={setIsActionvisible}
            appLink={"/socialstories"}
            contentRef={contentRef}

          />
        )} */}
       {isActionvisible && (
         <CommonAction
            title={`Generated ${AppTitle.blogCreater}`}
            response={responseData}
            visible={isActionvisible}
            contentRef={contentRef}
            appLink={"/socialstories"}
            aiSocialStories={aiSocialStories}
            setVisible={setIsActionvisible}
            setDataEditor={setInstruction}
            onHide={() => {
             // setVisible1(false)
              setFormDataShow(false);
              setFormShow(false);
              onhide()
              setIsActionvisible(false);
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
          Are you sure you want to go back?
          </p>
        
      </Dialog> : null }
    </div>
  );
}

