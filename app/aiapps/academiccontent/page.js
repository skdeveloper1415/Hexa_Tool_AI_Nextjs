"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import { GRADE,AppId, AppTitle, AppDesc, AppCategory } from '../../../components/helper/enum'
import { ProgressSpinner } from "primereact/progressspinner";
import { generateAcademicContentApi } from "../../actions/academicContentApi";
import { toast } from "react-toastify";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  
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
      if(error.message!='Operation canceled by the user.'){
        setLoader(false)
        toast.error("Something Went Wrong");
      }
    }
  }

  const handleResetAndClear = () => {
    setAssignment('')
    setFormDataShow(false)
    setFormShow(true)
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
  }
  const responsetoshow = assignment?.Content ? (<div ref={contentRef}>
    <h5>
      {assignment.Title}
    </h5>
      <p>{assignment?.Content ? assignment?.Content : ''}</p>
  </div>) : ""

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb className='custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]' model={items} home={home} />
        <div className='grid grid-cols-12 gap-2'>
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <BackToAIModified
              isGenerate={loader}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                handleResetAndClear();
              }}
              disabled={loader}
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
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader ? "opacity-50 cursor-not-allowed" : ""
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
          

          <div className='xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg'>
            {formShow &&
              <>
              <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.academiccontent}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] pt-[5px]">
                      {AppDesc.academiccontent}
                    </p>
                  </div>
                {
                 isShowHide == true ? (  isShowHide && !loader &&
                    <button className='flex w-[200px] xl:w-[180px] 3xl:w-[8.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>) :<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.ContentLibrary}</div>
                  }

                </div>

                {loader ? <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div> :
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red] ml-1">*</span></label>
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
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Content Type:<span className="text-[red] ml-1">*</span></label>
                      <InputTextarea autoResize placeholder="Type..." value={multiStepData.contentType} onChange={(e) => {
                        setmultiStepData({ ...multiStepData, contentType: e.target.value })
                        if (e.target.value) {
                          setError({ ...error, contentType: '' })
                        }
                      }} rows={3} className="w-full" />
                      {error.contentType ? <span style={{ color: 'red' }}>{error.contentType}</span> : <></>}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Text Length:<span className="text-[red] ml-1">*</span></label>
                      <InputTextarea autoResize placeholder="Type..." value={multiStepData.textLength} onChange={(e) => {
                        setmultiStepData({ ...multiStepData, textLength: e.target.value })
                        if (e.target.value) {
                          setError({ ...error, textLength: '' })
                        }
                      }} rows={3} className="w-full" />
                      {error.textLength ? <span style={{ color: 'red' }}>{error.textLength}</span> : <></>}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Topic,Standard,Objective (be as specific as possible):<span className="text-[red] ml-1">*</span></label>
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
                    {/* <Note/> */}
                    <div>
                      <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
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
                title={`${AppTitle.academiccontent}`}
                onHide={() => {
                  setFormDataShow(false)
                  setFormShow(true)
                }}
                handleAction={() => {setVisible(true); setExempler(false); } }
                response={responsetoshow}
                contentRef={contentRef}
                appLink={'/academiccontent'}
              />

            }
          </div>
          {/* <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
            <button
            disabled={loader}
            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : "" }`}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false)
                  setFormShow(true)
                  handleResetAndClear()
                } else {
                  handleResetAndClear()
                }
              }}
            >
              <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
              Reset and Clear
            </button>
            <button className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? 'opacity-50 cursor-not-allowed' : ''}`}

              onClick={() => handleExample()}
              disabled={loader}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
              Example  
            </button>
          </div> */}
        </div>

        {visible &&
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
          }
      </div>

      {renderPopup()}
    </Layout>
  );
}
