"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify"
import { ProgressSpinner } from "primereact/progressspinner";
import { AppDesc, AppId, AppTitle, GRADE } from "../helper/enum";
import Commonresponse from "../../app/common/commonResponse";
import useExceedAttemptsPopup from "../../app/common/useExceedAttemptsPopup";
import getIpAddress from "../helper/commonFunction";
import { Dialog } from "primereact/dialog";
import { generateAcademicContentApi } from "../../app/actions/academicContentApi";
import CommonAction from "../commonAction";
import { cancelPendingRequests } from "../../app/actions";
 
export default function AcademicContent({visible2, onhide,setInstruction, isActionVisible,aiAcademicContent}) {
  
  const [position, setPosition] = useState('center');
  const contentRef = useRef(null);
  const [isShowHide, setIsShowHide] = useState(false); 
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [assignment, setAssignment] = useState('')
  const [error, setError] = useState({})
  const [loader, setLoader] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [multiStepData, setmultiStepData] = useState({
    grade: '',
    contentType: '',
    textLength: '',
    topic: '',
    additionalCriteria: '',
  })
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const items = [
    { label: `${AppTitle.academiccontent}`, url: '' }
  ];

  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const appId = AppId.academiccontent;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT
  const [ip, setIp] = useState("");
  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts


  const handleExample = () =>{
    setmultiStepData(prevData => ({
      ...prevData,
      grade: "Grade 9",
      contentType: 'Textbook page',
      textLength: '1 Page exactly',
      topic: 'SWBAT explain the differences between ethnic and religious groups - they are studying southern Africa',
      additionalCriteria: "Make sure that it explicitly names several of the ethnic and religious groups in southern Africa",
    }));
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
  }
  useEffect(()=>{
    if(visible2 ==  false){
      handleResetAndClear()

    }
  },[visible2])
  const validate = () => {
    let err = {}
    let isErr = false;
    if (!multiStepData.grade || multiStepData.grade.trim() === "" ) {
      err.grade = 'Please Select Grade Level.'
      isErr = true
    }
    if (!multiStepData.contentType || multiStepData.contentType.trim() === "") {
      err.contentType = 'Please Enter Content Type.'
      isErr = true
    }
    if (!multiStepData.textLength || multiStepData.textLength.trim() === "") {
      err.textLength = 'Please Enter Text Length.'
      isErr = true
    }
    if (!multiStepData.topic || multiStepData.topic.trim() === "") {
      err.topic = 'Please Enter Topic, Standard, Objective.'
      isErr = true
    }
    setError(err)
    return isErr
  }
  
  const HandleGenerate = async (e) => {
    e.preventDefault()
    if (validate()) {
      return
    }
    setLoader(true)
    try {

      const body = {
        grade: multiStepData.grade ? multiStepData.grade : '',
        content: multiStepData.contentType ? multiStepData.contentType : '',
        text: multiStepData.textLength ? multiStepData.textLength : '',
        topic: multiStepData.topic ? multiStepData.topic : '',
        additional_criteria: multiStepData.additionalCriteria ? multiStepData.additionalCriteria : '',
      }

      const response = await generateAcademicContentApi(body)
      if (response.data.code == '200') {

        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
         setLoader(false)
          return;
        }

        setAssignment(response.data.data.data)
        setFormDataShow(true)
        setFormShow(false);
        setIsShowHide(true);
      } else {
        console.log(response?.error)
        toast.error("Something Went Wrong");
      }
      setLoader(false)
    } catch (error) {
      // if(error.message!='Operation canceled by the user.'){
      // }
      setLoader(false)
      toast.error("Something Went Wrong");
    }
  }

  const handleResetAndClear = () => {
    setAssignment('')
    setmultiStepData(
      {
        grade: '',
        contentType: '',
        textLength: '',
        topic: '',
        additionalCriteria: '',
      }
    )
    setError({});
    setIsShowHide(false);
    setFormDataShow(false)
    setFormShow(true)
  }
  const responsetoshow = assignment?.Content ? (<div ref={contentRef}>
    <h4 style={{fontWeight:'bold'}}>
      {assignment.Title}
    </h4>
      <p>{assignment?.Content ? assignment?.Content : ''}</p>
  </div>) : ""

const handleDiaglogHide=()=>{
  if( loader == true){
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
  setLoader(false);
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
  <>
   <Dialog
        className="custom-popup w-[800px]  "
        header=" "
        visible={visible2}
        style={{ width: "50vw" }}
        // onHide={() => {
        //     onhide();
        //   }}
        onHide={handleDiaglogHide}

      >
      <div className="">
        <div className=''>
          

          <div className=''>
            {formShow &&
              <>
              <div className="flex justify-between items-center">
              <div className="grid">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                <b>{AppTitle.spicysentence}</b>
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                 {AppDesc.blogCreater}
                </p>
                </div>
                {
                    isShowHide &&
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

                {loader ? <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div> :
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red]">*</span></label>
                      <Dropdown filter value={multiStepData.grade ? GRADE.find((ele) => ele.name == multiStepData.grade) : null} onChange={(e) => {
                        setmultiStepData({ ...multiStepData, grade: e.value.name })
                        if (e.target.value) {
                          setError({ ...error, grade: '' })
                        }
                      }} options={GRADE} optionLabel="name"
                        placeholder="Select" className="w-full md:w-14rem" />
                      {error.grade ? <span style={{ color: 'red' }}>{error.grade}</span> : <></>}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Content Type:<span className="text-[red]">*</span></label>
                      <InputTextarea autoResize placeholder="Type..." value={multiStepData.contentType} onChange={(e) => {
                        setmultiStepData({ ...multiStepData, contentType: e.target.value })
                        if (e.target.value) {
                          setError({ ...error, contentType: '' })
                        }
                      }} rows={3} className="w-full" />
                      {error.contentType ? <span style={{ color: 'red' }}>{error.contentType}</span> : <></>}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Text Length(In Numeric):<span className="text-[red]">*</span></label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={multiStepData.textLength}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                          setmultiStepData({ ...multiStepData, textLength: numericValue });
                          if (numericValue) {
                            setError({ ...error, textLength: '' });
                          }
                        }}
                        rows={3}
                        className="w-full"
                      />

                      {error.textLength ? <span style={{ color: 'red' }}>{error.textLength}</span> : <></>}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Topic,Standard,Objective (be as specific as possible):<span className="text-[red]">*</span></label>
                      <InputTextarea autoResize placeholder="Type..." value={multiStepData.topic} onChange={(e) => {
                        setmultiStepData({ ...multiStepData, topic: e.target.value })
                        if (e.target.value) {
                          setError({ ...error, topic: '' })
                        }
                      }} rows={3} className="w-full" />
                      {error.topic ? <span style={{ color: 'red' }}>{error.topic}</span> : <></>}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Additional Criteria for the Content :</label>
                      <InputTextarea autoResize placeholder="Type..." value={multiStepData.additionalCriteria} onChange={(e) => {
                        setmultiStepData({ ...multiStepData, additionalCriteria: e.target.value })
                      }} rows={3} className="w-full" />
                    </div>
                    <div>
                      <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570ef] bg-[#1570ef] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
                        onClick={(e) => {
                          HandleGenerate(e);
                          // setFormDataShow(true)
                          // setFormShow(false)
                        }}>
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                }
              </>
            }
            {formDataShow &&
              <Commonresponse
                title={`${AppTitle.spicysentence}`}
                onHide={() => {
                  setFormDataShow(false)
                  setFormShow(true)
                }}
                  
                  handleAction={() => {setVisible(true); setExempler(false); setIsActionvisible(true)  } }
                response={responsetoshow}
                contentRef={contentRef}
                appLink={'/academiccontent'}
              />

            }
          </div>
          
        </div>

        {/* {visible &&
        <CommonActionExempler
          title={`Generated ${AppTitle.academiccontent}`}
          response={responsetoshow}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={contentRef}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={'/academiccontent'}
          />
          } */}
         {isActionvisible && (
         <CommonAction
            title={`Generated ${AppTitle.spicysentence}`}
            response={responsetoshow}
            visible={visible}
            contentRef={contentRef}
            appLink={"/academiccontent"}
            setVisible={setIsActionvisible}
            setDataEditor={setInstruction}
            onHide={() => {
              setFormDataShow(false);
              setFormShow(false);
              onhide()
              setIsActionvisible(false);
            }}
            aiAcademicContent={aiAcademicContent}
            setBooleanValue={isActionVisible}        
          />
        )}
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
      {/* {renderPopup()} */}
      </>
  );
}
