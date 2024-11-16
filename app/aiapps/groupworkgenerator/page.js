"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateWorkGenerator } from "../../actions/generateWorkGenerator";
import Commonresponse from "../../common/commonResponse";
import { GRADE, QUESTIONS, GROUPTIME, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from '../../common/CommonActionExempler';
import BackToAI from "../../../components/BackToAI";
import { toast } from "react-toastify";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
    const copyRef = useRef(null);
    const [isExVisible, setIsExVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [error, setError] = useState({})
    const [title, setTitle] = useState('')
    const [isActionvisible, setIsActionvisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [gradeLevel, setGradeLevel] = useState('');
    const [numOfQuestions, setNumOfQuestions] = useState('');
    const [groupWorkTime, setGroupWorkTime] = useState('');
    const [topic, setTopic] = useState('');
    const [assignment, setAssignment] = useState('')

    const [isShowHide, setIsShowHide] = useState(false);

    const [resultResponse, setResult] = useState({
        gradeLevel: '',
        numOfQuestions: '',
        groupWorkTime: '',
        topic: '',
    })

    const items = [
        { label: `${AppTitle.groupworkgenerator}`, url: '' }
    ];
    const home = { label: 'AIrrrr Apps', template: () => <Link href="/"><span className="text-primary font-semibold">BrixAI Apps</span></Link> }

    const [formDataShow, setFormDataShow] = useState(false);

    const [visible, setVisible] = useState(false);

    const handleAction = () => {
        setVisible(true)
        setTitle(`Generated ${AppTitle.groupworkgenerator}`)
        setIsActionvisible(true)
    }

    const handleEdit = () => {
        setFormDataShow(false);
    };

    const hideExemplerPopup = () => {

        setIsPopupVisible(false);
    };

    const appId = AppId.groupworkgenerator;
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
    ); // Change 3 to your desired maximum attempts

    const validate = () => {
        let err = {}
        let valid = false;
        if (!gradeLevel) {
            err.gradeLevel = 'Please Select Grade Level';
            valid = true
        }
        if (!numOfQuestions) {
            err.numOfQuestions = 'Please Select Number of Students Participating';
            valid = true
        }
        if (!groupWorkTime) {
            err.groupWorkTime = 'Please Select Time for Group Work';
            valid = true
        }
        if (!topic || topic.trim() === "") {
            err.topic = 'Please Enter Topic Objective,or Standard';
            valid = true
        }

        setError(err)
        return valid;

    }

    const response = assignment && Object.keys(assignment).length > 0 ? (
     <div ref={copyRef} className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]">

        <h5>{assignment.Task?.Title}</h5>
        <ul>
            <li><span className="font-semibold">Objective:</span> {assignment.Task?.Objective}</li>
        </ul>
        <ul>
            <li><span className="font-semibold">Grade Level:</span> {assignment.Task?.Grade_Level}</li>
        </ul>
        <ul>
            <li><span className="font-semibold">Group Size:</span> {assignment.Task?.Group_Size}</li>
        </ul>
        <ul>
            <li><span className="font-semibold">Time:</span> {assignment.Task?.Duration}</li>
        </ul>
        <h5>Instructions:</h5>
        <ul>

            {
                assignment != '' && Object?.keys(assignment?.Task?.Instructions)?.map(item => {
                    return (
                        <>
                            <li>
                                <span className="font-semibold">{item}:</span>

                            </li>
                            <ul className="mt-2">
                                <li className=""><span className="font-semibold">Description:</span> {assignment?.Task?.Instructions[item]?.Description}</li>
                                <li className=""><span className="font-semibold">Duration:</span> {assignment?.Task?.Instructions[item]?.Duration}</li>
                            </ul>
                        </>
                    )
                })
            }
        </ul>
    </div>): ""

    const HandleGenerate = async (e) => {
        e.preventDefault()
        if (validate()) {
            return;
        }
        setLoader(true)
        try {
            const body = {
                grade: gradeLevel.name ? gradeLevel.name : '',
                number_students: numOfQuestions.code ? numOfQuestions.code : '',
                time: groupWorkTime.code ? groupWorkTime.code : '',
                topic: topic ? topic : '',

            }

            const response = await generateWorkGenerator(body)
            if (response.data.code == '200') {
                setAssignment(response.data.data.data)
                setResult({
                    ...resultResponse,
                    gradeLevel: gradeLevel?.name,
                    numOfQuestions: numOfQuestions?.code,
                    groupWorkTime: groupWorkTime?.code,
                    topic
                })
                const attemptValid = handleClickAttempt();
        if (!attemptValid) {
            setLoader(false)
          return;
        }
                setFormDataShow(true)
                setIsShowHide(true)
            }
            setIsExVisible(true)
            setLoader(false)
        } catch (error) {
            if(error.message!='Operation canceled by the user.'){
                setLoader(false)
                let msg = error?.error ?? error?.message ?? "Something went wrong"
                toast.error(msg)
            }
        }

    }

    const handleReset = () => {
        setGradeLevel(null);
        setNumOfQuestions()
        setGroupWorkTime(null)
        setTopic('')
        setIsShowHide(false)
        setResult({
            ...resultResponse,
            gradeLevel: '',
            numOfQuestions: '',
            groupWorkTime: '',
            topic: ''
        })
        setFormDataShow(false)
        setError({});
    }

    return (
        <Layout>
            <div className="  mx-auto 3xl:px-[16.771vw]  2xl:px-[150px] xl:px-[100px] px-[20px]">
                <BreadCrumb className='custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]' model={items} home={home} />
                <div className='grid grid-cols-12 gap-2'>
           <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                    <BackToAIModified isGenerate={loader}/>
                    <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
                        <button onClick={() => handleReset()} disabled={loader} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
                            Reset and Clear
                        </button>
                        <button
                            disabled={loader}
                            onClick={() => {
                              if(formDataShow){
                                setFormDataShow(false);
                              }
                              setGradeLevel(  { name: 'Grade 5', code: '7' });
                              setNumOfQuestions()
                              setNumOfQuestions({ name: '2', code: '2' });
                              setGroupWorkTime({ name: '20 minutes', code: '4' });
                              setTopic("Human-Environment Interaction: Place, Regions, and Culture SS.G.1.5: Investigate how the cultural and environmental characteristics of places within the United States change over time.");
                            }}
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}>
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
                                title={`Example for ${AppTitle.groupworkgenerator}`}
                                response={response}
                                contentRef={copyRef}
                                appLink={'/groupworkgenerator'}
                            />}
                    </div>
                    </div>
                    <div className='xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg'>
                        {!formDataShow &&
                            <>
                            <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                            <div className="xl:col-span-2">
                                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">{AppTitle.groupworkgenerator}</h3>
                                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] ">Allows the content modification basing the grade (level) or skill of the individual.</p>
                            </div>
                            {
                                isShowHide && !loader ?
                                <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                                    onClick={() => {
                                        setFormDataShow(true);
                                    }}
                                >
                                    <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                                    Hide  Prompt
                                </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
                            }
                            </div>
                                {
                                    loader ? <div className="text-center"><ProgressSpinner /></div> : <form className="grid xl:gap-[1.25vw] gap-[18px]">
                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red] ml-1">*</span></label>
                                            <Dropdown
                                                filter
                                                value={gradeLevel}
                                                onChange={(e) => {
                                                    setGradeLevel(e.target.value)
                                                    if (e.target.value) {
                                                        setError({ ...error, gradeLevel: '' })
                                                    }
                                                }}
                                                options={GRADE}
                                                optionLabel="name"
                                                placeholder="Select"
                                                className="w-full md:w-14rem"
                                            />
                                            {error.gradeLevel ?
                                                <span style={{ color: 'red' }}>{error.gradeLevel}</span> : <>
                                                </>}
                                        </div>
                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Number of Students Participating:<span className="text-[red] ml-1">*</span></label>

                                            <Dropdown
                                                filter
                                                value={numOfQuestions}
                                                onChange={(e) => {
                                                    setNumOfQuestions(e.target.value)
                                                    if (e.target.value) {
                                                        setError({ ...error, numOfQuestions: '' })
                                                    }
                                                }}
                                                options={QUESTIONS}
                                                optionLabel="name"
                                                placeholder="Select"
                                                className="w-full md:w-14rem"
                                            />
                                            {error.numOfQuestions ?
                                                <span style={{ color: 'red' }}>{error.numOfQuestions}</span> : <>
                                                </>}
                                        </div>

                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Time for Group Work:<span className="text-[red] ml-1">*</span></label>

                                            <Dropdown
                                                filter
                                                value={groupWorkTime}
                                                onChange={(e) => {
                                                    setGroupWorkTime(e.target.value)
                                                    if (e.target.value) {
                                                        setError({ ...error, groupWorkTime: '' })
                                                    }
                                                }}
                                                options={GROUPTIME}
                                                optionLabel="name"
                                                placeholder="Select"
                                                className="w-full md:w-14rem"
                                            />
                                            {error.groupWorkTime ?
                                                <span style={{ color: 'red' }}>{error.groupWorkTime}</span> : <>
                                                </>}
                                        </div>
                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Topic Objective,or Standard:<span className="text-[red] ml-1">*</span></label>
                                            <div className="relative">
                                                <div className="absolute left-[7px] top-[14px]">
                                                    <i className="hexatoolmic"></i>
                                                </div>

                                                <InputTextarea autoResize placeholder="Anaerobic respiration produces 2 ATP per glucose molecule." value={topic} onChange={(e) => {
                                                    setTopic(e.target.value)
                                                    if (e.target.value) {
                                                        setError({ ...error, topic: '' })
                                                    }
                                                }} rows={6} className="w-full pl-8" />
                                                {error.topic ?
                                                    <span style={{ color: 'red' }}>{error.topic}</span> : <>
                                                    </>}
                                            </div>
                                        </div>
                                    <Note/>
                                        <div>
                                            <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
                                                onClick={(e) => {
                                                    HandleGenerate(e);

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
                                title={`${AppTitle.groupworkgenerator}`}
                                onHide={() => setFormDataShow(false)}
                                handleAction={handleAction}
                                response={response}
                                contentRef={copyRef}
                                handleEdit={handleEdit}
                                appLink={'/groupworkgenerator'}
                            />

                        }
                    </div>
                  
                </div>


            </div>

            {isActionvisible &&
                <CommonActionExempler
                    title={`Generated ${AppTitle.groupworkgenerator}`}
                    response={response}
                    visible={isActionvisible}
                    position={position}
                    setVisible={setIsActionvisible}
                    contentRef={copyRef}
                    appLink={'/groupworkgenerator'} />}
                    {renderPopup()}
        </Layout>
    );
}
