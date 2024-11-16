"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { AppId, AppTitle, GRADE,AppDesc } from "../helper/enum";
import Commonresponse from "../../app/common/commonResponse";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import { generateRealWorldConnectionAPI } from "../../app/actions/realWorldConnections";
import CommonAction from "../commonAction";
import { cancelPendingRequests } from "../../app/actions";


 
export default function RealWorld({ visible1, onhide, setInstruction, isActionVisible ,realworld,aiAcademicContent}) {

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [topicOrStandardValue, setTopicOrStandardValue] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [isShowHide, setIsShowHide] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleClear = () => {
    setGradeLevel(null);
    setTopicOrStandardValue("");
    setError({});
    setIsShowHide(false)
    setFormShow(true);
  };
  const appId = AppId.realworldconnections;
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

  const validate = () => {
    let err = {};
    let isErr = false;

    if (gradeLevel === null) {
      err.gradeLevel = "Please Select Grade Level.";
      isErr = true;
    }
    if (topicOrStandardValue === "" || topicOrStandardValue.trim() === "") {
      err.topicOrStandardValue = "Please Enter Topic, Standared, Objective.";
      isErr = true;
    }

    setError(err);
    return isErr;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setIsExVisible(false);
    setLoading(true);
    try {
      const payload = {
        grade: gradeLevel?.name,
        topic: topicOrStandardValue,
      };
      const response = await generateRealWorldConnectionAPI(payload);

      if (response.data.code == "200") {
        let responseData = response.data.data.data ?? [];

        const realWorldConnections = responseData.split("\n\n").map((item) => {
          const titleDescription = item.split("\n");
          const title = titleDescription[0].split(": ")[1];
          const description = titleDescription[1];
          return { title, description };
        });
        setResponseData(realWorldConnections);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }
        setLoading(false);
        setIsExVisible(true);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true)
      } else {
        toast.error("Something Went Wrong.");
        setLoading(false);
      }
    } catch (error) {
      // if (error.message != 'Operation canceled by the user.') {
      // }                                                                       
      toast.error("Something Went Wrong.");
      setLoading(false);
    }
  };

  const copyRef = useRef(null);

  const responseToShow = (
    responseData.length > 0 ? (
      <div ref={copyRef}>
        {responseData.length > 0
          ? responseData.map((item) => (
            <>
              <h4 style={{fontWeight:'bold'}}>{item?.title}:</h4>
              <p style={{fontSize:'14px',color:'#344054',marginTop:'10px'}}>
                {item?.description}
              </p>
            </>
          ))
          : null}
      </div>
    ) : ""
  );

  const handleDiaglogHide=()=>{
    if( loading == true){
      setDialogVisible(true)
      // handleHide()
    }else {
      setFormDataShow(false);
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
    setLoading(false)
    cancelPendingRequests();
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
 

  useEffect(()=>{
    if(visible1 ==  false){
      handleClear();
    }
  },[visible1])
  return (
    <Dialog
      className="custom-popup w-[800px]  "
      header=" "
      visible={visible1}
      style={{ width: "50vw" }}
      // onHide={() => {
      //   onhide();
      // }}
      onHide={handleDiaglogHide}

    >
      <div className="">



        <div className="">
          {formShow && (
            <>
              <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px] gap-10">
                <div className="grid">
                  <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                    <b>{AppTitle.newsletter}</b>
                  </h3>
                  <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    {AppDesc.newsletter}
                  </p>
                </div>
                {
                  isShowHide &&
                  <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                    onClick={() => {
                      setFormShow(false);
                      setFormDataShow(true);
                    }}
                  >
                    <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Hide" />
                    Hide  Prompt
                  </button>
                }
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <ProgressSpinner />
                </div>
              ) : (
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Grade Level:<span className="text-[red] ">*</span>
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
                    {error.gradeLevel ? (
                      <span style={{ color: "red" }}>{error.gradeLevel}</span>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Topic, Standard, Objective(be as specific as possible):
                      <span className="text-[red] ">*</span>
                    </label>
                    <div className="relative">
                      <InputTextarea
                        autoResize
                        value={topicOrStandardValue}
                        onChange={(e) => {
                          setTopicOrStandardValue(e.target.value);
                        }}
                        placeholder="Enter Topic or Standard Value."
                        rows={5}
                        cols={5}
                        className="w-full relative pl-[35px]"
                      />
                      {error.topicOrStandardValue ? (
                        <span style={{ color: "red" }}>
                          {error.topicOrStandardValue}
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
                      onClick={handleSubmit}
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
                title={`${AppTitle.realworldconnections}`}
                desc = {'Generate real world examples to increase student investment .'}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);                   
                }}
                handleAction={() => {
                  setIsActionvisible(true);
                  setVisible(true);
                  setFormDataShow(false)  
                }}
                setIsExVisible={setIsExVisible}
                response={responseToShow}
                contentRef={copyRef}
                appLink={"/realworldconnections"}
              />
            </>
          )}
        </div>


        {/* {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.realworldconnections}`}
            response={responseToShow}
            visible={isActionvisible}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/realworldconnections"}
          />
        )} */}
                {isActionvisible && (
         <CommonAction
            title={`Generated ${AppTitle.realworldconnections}`}
            response={responseToShow}
            visible={isActionvisible}
            contentRef={copyRef}
            appLink={"/realworldconnections"}
            setVisible={setIsActionvisible}
            setDataEditor={setInstruction}
            realworld={realworld}
            onHide={() => {
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
      {dialogVisible == true ? 
      <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }} 
      // onHide={() => setDialogVisible(false)} 
      onHide={handleHide}
      className='ConfirmDialog'>
          <p className="m-0">
          Are you sure you want to go back?
          </p>
        
      </Dialog> : null }
    </Dialog>
    
  );
}
