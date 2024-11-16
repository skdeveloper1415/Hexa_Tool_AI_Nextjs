"use client";
import React, { useState, useRef , useEffect} from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateIEPGenerator } from "../../actions/IEPGeneratorApi";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import Commonresponse from '../../common/commonResponse'
import CommonActionExempler from '../../common/CommonActionExempler';
import { GRADE,  AppId, AppTitle, AppCategory } from '../../../components/helper/enum'
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const copyRef = useRef(null);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [position, setPosition] = useState('center');
  const [isExVisible, setIsExVisible] = useState(false);
  const [error, setError] = useState({})
  const [loader, setLoader] = useState(false);
  const [assignment, setAssignment] = useState('')
  const [grade, setGrade] = useState('')
  const [disability, setDisability] = useState('')
  const [description, setDescription] = useState('')
  const [resultResponse, setResult] = useState({
    grade: '',
    disability: '',
    description: '',
  })
  const [isShowHide, setIsShowHide] = useState(false);

  
  const appId = AppId.IEPGenerator;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts



  const items = [
    { label: `${AppTitle.IEPGenerator}`, url: '' }
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };


  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);

  const [visible, setVisible] = useState(false);

  const handleAction = () => {
    setVisible(true)
    setIsActionvisible(true)
  }
  const handleEdit = () => {
    setFormDataShow(false);
  };

  const validate = () => {
    let err = {}
    let valid = false;
    if (!grade) {
      err.grade = 'Please Select Grade Level.';
      valid = true
    }
    if (!disability || disability.trim() === "") {
      err.disability = 'Please Enter Disability Category.';
      valid = true
    }
    if (!description || description.trim() === "") {
      err.description = 'Please Enter Description.';
      valid = true
    }

    setError(err)
    return valid;

  }

  const HandleGenerate = async (e) => {
    e.preventDefault()
    if (validate()) {
      return;
    }
    setLoader(true)
    try {
      const body = {
        grade: grade ? grade : '',
        disability: disability ? disability : '',
        description: description ? description : '',
      }

      const response = await generateIEPGenerator(body)
      if (response.data.code == '200') {
        setAssignment(response.data.data.data)
        setResult({
          ...resultResponse,
          grade,
          disability,
          description
        })
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false)
          return;
        }
        setFormDataShow(true)
        setFormShow(false)
        setIsShowHide(true);

      }
      setIsExVisible(true)
      setLoader(false)
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false)
        let msg = error?.error ?? error?.message ?? "Something went wrong"
        toast.error("Something went wrong")
      }
    }

  }

  const setExamples = () => {
    setGrade("Grade 6")
    setDisability('Autism Spectrum Disorder')
    setDescription("Prefers to be alone, struggles to understand social cues, has trouble starting or keeping conversations, does not get social rules. Reacts strongly to loud noises, bright lights, or weird textures. Covers ears or eyes, does not like certain smells or tastes, seeks or avoids sensory stuff. Attached to specific things or rituals, gets upset when routines change, needs things to be the same.");
    setError({})
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
  };

  const handleReset = () => {
    setGrade('');
    setDisability('');
    setDescription('')
    setResult({
      ...resultResponse,
      grade: '',
      disability: '',
      description: ''
    })
    setFormDataShow(false);
    setError("");
  }

  const hideExemplerPopup = () => {

    setIsPopupVisible(false);
  };

  const response = assignment && Object.keys(assignment).length > 0 ?(
  <div ref={copyRef} className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]">

    <h5>Present Levels of Performance:</h5>
    <ol>
      <li>{assignment.present_levels_of_performance?.description}</li>
    </ol>
    <h5>Student Needs and Impact of Disability:</h5>
    <ul>
      {
        assignment?.student_needs_and_impact_of_disability?.description

      }
    </ul>
    <h5>Goals and Objectives:</h5>
    {
      assignment?.goals_and_objectives?.map(elements => {
        return (
          <>
            <h5>Measurable Goal : <span className="">{elements?.measurable_goal}</span></h5>
            <ol>
              <li className="font-bold">Objective : <span className="font-normal">{elements?.objective}</span></li>
            </ol>
          </>
        )
      })
    }
    <ul className="list-disc ml-[20px]">

      {
        assignment?.accommodations_and_modifications?.map(elements => {
          return (
            <>
              <li>{elements}</li>
            </>
          )
        })
      }

    </ul>
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
         <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
            <button disabled={loader} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] lg:px-[10px] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center  ${loader == true ? "opacity-50 cursor-not-allowed" : "" }`}
              onClick={() => {handleReset(), setIsShowHide(false)}}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
              Reset and Clear
            </button>
            <button
              onClick={() => setExamples()}
              disabled={loader}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : "" }`}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
              Try New
            </button>

            {isPopupVisible &&
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                title={`${AppTitle.IEPGenerator}`}
                response={response}
                contentRef={copyRef}
                appLink={'/IEPGenerator'}
              />}
          </div>
        </div>
          <div className='xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg'>
            {!formDataShow &&

              <>
              <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF]  font-medium">{AppTitle.IEPGenerator}</h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">Generate a draft of an individualised education program (IEP) customized to a student`s needs.</p>
                </div>
                {
                  isShowHide && !loader ?
                      <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] xl:px-[1.04vw] px-[16px] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                    }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                }
                </div>
                {loader ? <div className="text-center"><ProgressSpinner /> </div> : <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Grade Level
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <Dropdown filter value={grade ? GRADE.find((ele) => ele.name == grade) : null} onChange={(e) => {
                      setGrade(e.value.name)
                      if (e.target.value) {
                        setError({ ...error, grade: '' })
                      }
                    }} options={GRADE} optionLabel="name"
                      placeholder="Select" className="w-full md:w-14rem" />
                    {error.grade ?
                      <span style={{ color: 'red' }}>{error.grade}</span> : <>
                      </>}
                  </div>
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Disability Category
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <InputTextarea autoResize placeholder="Type..." value={disability} onChange={(e) => {
                      setDisability(e.target.value)
                      if (e.target.value) {
                        setError({ ...error, disability: '' })
                      }
                    }} rows={3} className="w-full" />
                    {error.disability ?
                      <span style={{ color: 'red' }}>{error.disability}</span> : <>
                      </>}
                  </div>
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Description of Student Behaviours,Needs,and Strengths
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <InputTextarea autoResize placeholder="Type..." value={description} onChange={(e) => {
                      setDescription(e.target.value)
                      if (e.target.value) {
                        setError({ ...error, description: '' })
                      }
                    }} rows={3} className="w-full" />
                    {error.description ?
                      <span style={{ color: 'red' }}>{error.description}</span> : <>
                      </>}
                  </div>
                <Note/>
                  <div>
                    <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
                      onClick={(e) => {
                        e.preventDefault()

                        HandleGenerate(e);

                      }}>
                      Generate with BrixAI
                    </button>
                  </div>
                </form>}

              </>
            }
            {formDataShow &&
              <Commonresponse
                title={`${AppTitle.IEPGenerator}`}
                onHide={() => setFormDataShow(false)}
                handleAction={handleAction}
                response={response}
                contentRef={copyRef}
                handleEdit={handleEdit}
                appLink={'/IEPGenerator'}
              />

            }
          </div>

         
        </div>

      </div>
      {isActionvisible &&
        <CommonActionExempler
          title={`Generated ${AppTitle.IEPGenerator}`}
          response={response}
          visible={isActionvisible}
          position={position}
          setVisible={setIsActionvisible}
          contentRef={copyRef}
          appLink={'/IEPGenerator'} />}
          {renderPopup()}
    </Layout>
  );
}
