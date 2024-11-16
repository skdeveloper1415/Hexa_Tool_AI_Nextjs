"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import { AppCategory, AppId, AppTitle, GRADE } from "../../../components/helper/enum";
import { assignmentScaffolder } from "../../actions/assignmentScaffolderApi";
import { ProgressSpinner } from "primereact/progressspinner";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {

    const [gradeLevel, setGradeLevel] = useState(null);
    const [assignmentPrompt, setAssignmentPrompt] = useState("");
    const [assignment, setAssignment] = useState('')
    const [visible, setVisible] = useState(false);
    const [isActionvisible, setIsActionvisible] = useState(false);
    const [isExVisible, setIsExVisible] = useState(false);
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false);
    const [formShow, setFormShow] = useState(true);
    const [formDataShow, setFormDataShow] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const contentRef = useRef(null);
    const [isShowHide, setIsShowHide] = useState(false);
    const [position, setPosition] = useState('center');

    const showExemplerPopup = (position) => {
        setPosition(position);
        setVisible(true);
        setIsPopupVisible(true);
    };

    const items = [
        { label: `${AppTitle.assignmentscffolder}`, url: '' }
    ];
    const home = { label: "BrixAI Apps", url: "/aiapps" };

    const appId = AppId.assignmentscffolder;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

  const [ip, setIp] = useState("123.456.789.123");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

    const resetAndClear = () => {
        setGradeLevel(null);
        setAssignmentPrompt("");
        setFormShow(true)
        setIsExVisible(false)
        setFormDataShow(false)
        setError({})
        setIsShowHide(false)
    }

    // const formattedAssignment=<>{assignment.length > 0 ? assignment.map((item, i) => {
    //     const parts = item.split(':'); // Split the item by colon
    //     return (
    //       <li key={i} className="my-2 text-[14px]">
    //         {parts.length > 1 ? <span className="font-bold">{parts[0]}:</span> : parts[0]}
    //         {parts.length > 1 ? parts.slice(1).join(':') : null} {/* Reconstruct the item */}
    //       </li>
    //     );
    //   }) : null}</>

    const formattedAssignment = assignment?.split('\n').map((line, index) => {
        const colonIndex = line.indexOf(':');
        const isStepIncluded = line.includes("Step");
        
        if (colonIndex !== -1) {
            return (
                <React.Fragment key={index}>
                    <span className={`text-[14px] text-[#101828] ${isStepIncluded ? 'font-bold' : ''}`}>
                        <span className="font-bold">{line.slice(0, colonIndex + 1)}</span>
                        {line.slice(colonIndex + 1)}
                    </span>
                    <br />
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment key={index}>
                    <span className={`text-[14px] text-[#101828] ${isStepIncluded ? 'font-bold' : ''}`}>
                        {line}
                    </span>
                    <br />
                </React.Fragment>
            );
        }
    });
    

    const response =  formattedAssignment?.length > 1 ?(
         <>
        <div ref={contentRef}>

            {
                formDataShow &&
                <div className="mb-[16px]">
                    <div>
                        <div>{formattedAssignment}</div>
                    </div>
                </div>
            }
        </div>
    </>):""

    const validate = () => {
        let err = {}
        let isErr = false;
        if (gradeLevel === null) {
            err.grade = 'Please Select Grade Level.'
            isErr = true
        }
        if (assignmentPrompt === "" || assignmentPrompt.trim() === "") {
            err.assignmentPrompt = 'Please Enter Assignment Prompt.'
            isErr = true
        }
        setError(err)
        return isErr
    }

    const generateAssignmentScafffolder = async (e) => {
        e.preventDefault();
        if (validate()) {
            return
        }
        setLoader(true)

        try {
            const payload = {
                "grade": gradeLevel?.name,
                "assignment_details": assignmentPrompt,
            }
            const response = await assignmentScaffolder(payload);

            if (response.data.code == '200') {

                 // Halt form submission if attempts exceeded
                const attemptValid = handleClickAttempt();
                if (!attemptValid) {
                setLoader(false)
                return;
                }
                setAssignment(response.data.data.data)
                setFormDataShow(true)
                setFormShow(false)
                setLoader(false)
                setIsExVisible(true)
                setLoader(false)
                setIsShowHide(true)

            } else {
                toast.error(response.error || 'Something went wrong.')
                setLoader(false)
            }
        } catch (error) {
            if(error.message!='Operation canceled by the user.')
            {

                console.log('error:', error);
                toast.error(error ||'Something went wrong.');
                setLoader(false)
            }
        }
    }

    const handleExample = () => {
        setGradeLevel({ name: 'Grade 10', code: '12' },);
        setAssignmentPrompt(`A story has to be told by somebody. Compare in detail your impressions of the "story-tellers" in two or three novels or short stories that you have studied. Was the "story-teller" the same as the writer (implicitly or explicitly) or not? How does the answer to this question influence your reading? `)
        setFormDataShow(false);
        setFormShow(true);
    }

    return (
        <Layout>
            <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
                <BreadCrumb className='custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]' model={items} home={home} />
                <div className='grid grid-cols-12 gap-2'>
                <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                <BackToAIModified isGenerate={loader}/>
                <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
                        <button disabled={loader} onClick={resetAndClear} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50" : "" }`}>
                            <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
                            Reset and Clear
                        </button>
                        {/* <button
                            disabled={formShow}
                            onClick={() => showExemplerPopup('top')}
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${formShow ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
                            Example
                        </button> */}
                        <button
                            onClick={() => handleExample()}
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
                            Try New
                        </button>
                    </div>
                </div>
                    <div className='xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg'>
                        {formShow &&
                            <>
                            <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div>
                                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">{AppTitle.assignmentscffolder}</h3>
                                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">Allows extra support to the students who are lagging behind.</p>
                                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[318px] xl:w-[300px] 3xl:w-[12.854vw] xl:px-[1.04vw] px-[16px] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Assignment}</div>
                  }
                     </div>

                                {loader ? <div className="h-[100px] flex justify-center"><ProgressSpinner /> </div> :
                                    <form className="grid xl:gap-[1.25vw] gap-[18px]">
                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red] ml-1">*</span></label>
                                            <Dropdown
                                                value={gradeLevel}
                                                onChange={(e) => setGradeLevel(e.value)}
                                                options={GRADE}
                                                optionLabel="name"
                                                placeholder="Select" className="w-full md:w-14rem" />
                                            {error.grade ? <span style={{ color: 'red' }}>{error.grade}</span> : <></>}
                                        </div>

                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                                Assignment Prompt:<span className="text-[red] ml-1">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute top-[0.8rem] left-[0.5rem]">
                                                    <i className="hexatoolmic"></i>
                                                </div>
                                                <InputTextarea
                                                    autoResize
                                                    placeholder="Assignment Prompt"
                                                    value={assignmentPrompt}
                                                    onChange={(e) => setAssignmentPrompt(e.target.value)}
                                                    className="w-full pl-7"
                                                />
                                                {error.assignmentPrompt ? <span style={{ color: 'red' }}>{error.assignmentPrompt}</span> : <></>}

                                            </div>
                                        </div>
                                    <Note/>
                                        <div>
                                            <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
                                                onClick={(e) => {
                                                    generateAssignmentScafffolder(e);
                                                }}>
                                                Generate with BrixAI
                                            </button>
                                        </div>
                                    </form>
                                }
                            </>
                        }
                        {formDataShow &&
                            <Commonresponse title={`${AppTitle.assignmentscffolder}`}
                                handleAction={() => setIsActionvisible(true)}
                                response={response}
                                onHide={() => { setFormDataShow(false); setFormShow(true) }}
                                setIsExVisible={setIsExVisible}
                                contentRef={contentRef}
                                appLink={'/assignmentscffolder'}
                            />
                        }
                        {renderPopup()}
                        {isPopupVisible &&
                            <CommonActionExempler
                                onClose={() => setIsPopupVisible(false)}
                                setIsPopupVisible={setIsPopupVisible}
                                position={position}
                                visible={visible}
                                isExVisible={isExVisible}
                                setVisible={setIsActionvisible}
                                contentRef={contentRef}
                                title={`Example for ${AppTitle.assignmentscffolder}`}
                                appLink={'/assignmentscffolder'}
                                response={response}
                            />}
                    </div>

                    
                </div>

            </div>

            {isActionvisible &&
                <CommonActionExempler
                    title={`Generated ${AppTitle.assignmentscffolder}`}
                    response={response}
                    contentRef={contentRef}
                    visible={isActionvisible}
                    position={position}
                    setVisible={setIsActionvisible}
                    appLink={'/assignmentscffolder'} />}
        </Layout>
    );
}
