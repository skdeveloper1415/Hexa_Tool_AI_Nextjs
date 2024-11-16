"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { AppCategory, AppId, AppTitle, GRADE } from "../../../components/helper/enum";
import { ProgressSpinner } from "primereact/progressspinner";
import { behaviorInterventionSuggestions } from "../../actions/behaviorInterventionSuggestionsApi";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
    const [gradeLevel, setGradeLevel] = useState(null);
    const [formShow, setFormShow] = useState(true);
    const [formDataShow, setFormDataShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isActionvisible, setIsActionvisible] = useState(false);
    const [isExVisible, setIsExVisible] = useState(false);
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const contentRef = useRef(null);
    const [position, setPosition] = useState('center');
    const [assignment, setAssignment] = useState("");
    const [areasOfSupport, setAreasOfSupport] = useState("");
    const [isShowHide, setIsShowHide] = useState(false);

    const showExemplerPopup = (position) => {
        setPosition(position);
        setVisible(true);
        setIsPopupVisible(true);
        setIsShowHide(false);
    };

    const resetAndClear = () => {
        setGradeLevel(null);
        setAreasOfSupport("");
        setFormShow(true)
        setIsShowHide(false);
        setIsExVisible(false)
        setError({})
        setFormDataShow(false)
    }
    const appId = AppId.behaviorintervention;
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
    const fregment = assignment?.split('\n').map((line, index) => {
        if (index == 0 && line.split('-').length <= 1) {
            return (
                <>
                    <div className="text-[14px] font-semibold text-[#101828] mt-2 mb-2">{line}</div>
                </>
            )
        } else {
            return (
                <>
                    <div className="mt-2">
                        {
                            line.split('-').map((subLine, index) => {
                                if (index == 0) {
                                    return (
                                        <>
                                            <span className="text-[14px] font-semibold text-[#101828] mt-4 mb-[6px]">{subLine ? subLine + "-" : subLine}</span>
                                        </>
                                    )
                                } else {
                                    return (<>
                                        <span>{subLine}</span>
                                    </>
                                    )
                                }
                            })}
                    </div>
                </>)

        }
    })

    const response = assignment && Object.keys(assignment).length > 0 ? (<>
        <div ref={contentRef}>

            {
                formDataShow &&
                <div className="mb-[16px]">
                    <div>
                        <div>{fregment}</div>
                    </div>
                </div>
            }
        </div>
    </>
    ) : ""

    const validate = () => {
        let err = {}
        let isErr = false;
        if (gradeLevel === null) {
            err.grade = 'Please Select Grade Level.'
            isErr = true
        }
        if (areasOfSupport === "" || areasOfSupport.trim() === "") {
            err.areasOfSupport = 'Please Enter Areas to Support.'
            isErr = true
        }
        setError(err)
        return isErr
    }

    const items = [
        { label: `${AppTitle.behaviorintervention}`, url: "" },
    ];
    const home = { label: "BrixAI Apps", url: "/aiapps" };

    const generateBehaviorInterventionSuggestions
        = async (e) => {

            e.preventDefault();
            if (validate()) {
                return
            }

            setLoader(true)

            try {
                const payload = {
                    "grade": gradeLevel?.name,
                    "behaviour": areasOfSupport,
                }
                const response = await behaviorInterventionSuggestions(payload);

                if (response.data.code == '200') {
                    setAssignment(response.data.data.data)
                    const attemptValid = handleClickAttempt();
                    if (!attemptValid) {
                        setLoader(false)
                        return;
                    }
                    setFormDataShow(true)
                    setIsShowHide(true);
                    setFormShow(false)
                    setLoader(false)
                    setIsExVisible(true)
                    setLoader(false)

                } else {
                    toast.error("Something Went Wrong.");
                    setLoader(false)
                }
            } catch (error) {
                if (error.message != 'Operation canceled by the user.') {
                    toast.error("Something Went Wrong.");
                    setLoader(false)
                }
            }
            setLoader(false)
        }


    return (
        <Layout>
            <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
                <BreadCrumb
                    className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
                    model={items}
                    home={home}
                />
                <div className="grid grid-cols-12 gap-2">
                <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                    <BackToAIModified isGenerate={loader} />
                    <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                        <button disabled={loader} onClick={resetAndClear} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}>
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
                            // disabled={formShow}
                            // onClick={() => showExemplerPopup('top')} 
                            disabled={loader}
                            onClick={() => {
                                if (formDataShow) {
                                    setFormShow(true);
                                    setFormDataShow(false);
                                }
                                setGradeLevel({ name: 'Grade 3', code: '5' });
                                setAreasOfSupport("Student hides every time teacher turns their back");
                            }
                            }
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`} >
                            <Image
                                width="20"
                                height="20"
                                className="mr-[8px]"
                                src="/images/exemplar.svg"
                                alt="Example"
                            />
                            Try New
                        </button>
                    </div>
                    </div>

                    <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
                        {formShow && (
                            <>
                                <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                                    <div className="xl:col-span-2">
                                        <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                                          {AppTitle.behaviorintervention}
                                        </h3>
                                        <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                                        Generates suggestions plan basing on the behaviour inputs provided of the specific individual.
                                        </p>
                                    </div>


                                    {
                                        isShowHide && !loader ?
                                        <button className='flex w-[191px] xl:w-[220px] xl:px-[1.04vw] px-[16px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                                            onClick={() => {
                                                setFormDataShow(true);
                                                setFormShow(false)
                                            }}
                                        >
                                            <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                                            Hide  Prompt
                                        </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.CommunityTools}</div>
                                    }
                                </div>
                                {loader ? <div className="h-[100px] flex justify-center"><ProgressSpinner /> </div> :
                                    <form className="grid xl:gap-[1.25vw] gap-[18px]">

                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red] ml-1">*</span></label>
                                            <Dropdown
                                                filter
                                                value={gradeLevel}
                                                onChange={(e) => {
                                                    setGradeLevel(e.value);
                                                    if (e.target.value) {
                                                        setError({ ...error, grade: '' })
                                                    }
                                                }}
                                                options={GRADE}
                                                optionLabel="name"
                                                placeholder="Select"
                                                className="w-full md:w-14rem"
                                            />
                                            {error.grade ? <span style={{ color: 'red' }}>{error.grade}</span> : <></>}
                                        </div>


                                        <div>
                                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                                Areas to Support:<span className="text-[red] ml-1">*</span>
                                            </label>
                                            <div className="relative">

                                                <InputTextarea

                                                    placeholder="Describe student behaviors that need support and ideas for interventions."
                                                    value={areasOfSupport}
                                                    onChange={(e) => {
                                                        setAreasOfSupport(e.target.value);
                                                        if (e.target.value) {
                                                            setError({ ...error, areasOfSupport: '' })
                                                        }
                                                    }}
                                                    rows={3}
                                                    cols={5}
                                                    className="w-full relative pl-[35px]"
                                                />
                                                {error.areasOfSupport ? <span style={{ color: 'red' }}>{error.areasOfSupport}</span> : <></>}
                                                <div className="absolute top-[12px] left-[15px]">
                                                    <i className="hexatoolmic"></i>
                                                </div>
                                            </div>

                                        </div>
                                        <Note/>
                                        <div>
                                            <button
                                                className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                                                onClick={(e) => generateBehaviorInterventionSuggestions(e)}
                                            >
                                                Generate with BrixAI
                                            </button>
                                        </div>
                                    </form>
                                }
                            </>
                        )}
                        {formDataShow &&
                            <Commonresponse title={`${AppTitle.behaviorintervention}`}
                                handleAction={() => setIsActionvisible(true)}
                                response={response}
                                onHide={() => { setFormDataShow(false); setFormShow(true) }}
                                setIsExVisible={setIsExVisible}
                                contentRef={contentRef}
                                appLink={'/behaviorintervention'}
                            />
                        }
                        {isPopupVisible &&
                            <CommonActionExempler
                                onClose={() => setIsPopupVisible(false)}
                                setIsPopupVisible={setIsPopupVisible}
                                position={position}
                                visible={visible}
                                isExVisible={isExVisible}
                                setVisible={setIsActionvisible}
                                contentRef={contentRef}
                                title={`Example for ${AppTitle.behaviorintervention}`}
                                response={response}
                                appLink={'/behaviorintervention'}
                            />}

                    </div>
                    
                </div>
            </div>

            {isActionvisible &&
                <CommonActionExempler
                    title={`Generated ${AppTitle.behaviorintervention}`}
                    response={response}
                    contentRef={contentRef}
                    visible={isActionvisible}
                    position={position}
                    setVisible={setIsActionvisible}
                    appLink={'/behaviorintervention'} />}
            {renderPopup()}
        </Layout>
    );
}
