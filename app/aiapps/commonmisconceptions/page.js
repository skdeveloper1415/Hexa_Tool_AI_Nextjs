"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import { toast } from "react-toastify";
import { GRADE, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import CommonActionExempler from '../../common/CommonActionExempler';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getCommonMissConception } from "../../actions/commonMisconceptionApi";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";

export default function Index() {

    //no of attepts code
    const appId = AppId.commonmisconceptions;
    const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

    const [ip, setIp] = useState("");
    useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);
    const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts
    //no of attepts code
    const copyRef = useRef(null);

    const [resAssignmentData, setResAssignmentData] = useState({
        grade: "",
        description: "",
    });
    const [formShow, setFormShow] = useState(true);
    const [formDataShow, setFormDataShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [isExVisible, setIsExVisible] = useState(false);
    const [isExamplerDisable, setExamplerDisabled] = useState(true);
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false);
    const [resData, setResData] = useState();
    const [vocabTitle, setVocabTitle] = useState();
    const [vocabData, setVocabData] = useState();
    const [contentType, setContentType] = useState('')
    const [isShowHide, setIsShowHide] = useState(false);

    const items = [
        { label: `${AppTitle.commonmisconceptions}`, url: "" },
    ];
    const home = { label: "BrixAI Apps", url: "/aiapps" };

    const dataConversion = (data) => {
        const lines = data.split("\n");
        const vocabulary = lines.map(line => {
            const [term, definition] = line.split(/(?<=^\d+\.\s)/);
            return { term, definition };
        });
        setVocabTitle(vocabulary[0])

        //data 
        const misconceptions = data.split(/\d+\.\sMisconception:\s/).slice(1);
        const misconceptionObjects = misconceptions.map(misconception => {
            const [misconceptionTitle, howToAddress] = misconception.split("How to address this misconception:");
            return {
                Misconception: misconceptionTitle.trim(),
                Howtoaddress: howToAddress.trim().replace(/^\n|\n$/g, "")
            };
        });
        setVocabData(misconceptionObjects)
    }

    useEffect(() => {
        if (resData) {
            dataConversion(resData)
        }
    }, [resData]);

    const responsetoshow = (
        resData ? (
            <div ref={copyRef}>

                <b>{vocabTitle?.term}</b>
                <br></br>
                <br></br>

                {
                    vocabData?.map((elm, index) => {
                        return (
                            <>
                                <b>Misconception: </b> {elm.Misconception}
                                <br></br>
                                <br></br>
                                <b>How to address Misconception: </b> <br></br>
                                {elm.Howtoaddress}
                                <br></br>
                                <br></br>
                            </>
                        )
                    })
                }
            </div>
        ) :
            (
                ""
            )
    );


    const HandleGenerate = async (e) => {
        e.preventDefault();

        if (!resAssignmentData.grade) {
            toast.error('Please Select Grade Level.')
            return;
        }
        if (!contentType || contentType.trim() === "") {
            toast.error('Please Enter What You Are Teaching.')
            return;
        }
        setLoader(true);
        try {

            const body = {
                grade: resAssignmentData.grade,
                subject: contentType
            }
            const response = await getCommonMissConception(body);
            if (response.data.code == '200') {

                // Halt form submission if attempts exceeded
                const attemptValid = handleClickAttempt();
                if (!attemptValid) {
                    setLoader(false)
                    return;
                }

                setResData(response?.data?.data?.data)
                setExamplerDisabled(false);
                setFormDataShow(true);
                setFormShow(false);
                setLoader(false);
                setIsShowHide(true);

            } else {
                console.log(response?.error);
                toast.error("Something went wrong");
            }

        } catch (error) {
            if (error.message != 'Operation canceled by the user.') {
                setLoader(false);
                let msg = error?.response?.error ?? error?.response?.message ?? "Something went wrong";
                toast.error("Something went wrong");
            }
        }
    };

    const handleAction = () => {
        setVisible(true);
    };

    const closeFormDataShow = () => {
        setFormDataShow(false);
        setFormShow(true);
    };

    const clearStates = () => {
        setFormDataShow(false);
        setFormShow(true)
        setResAssignmentData({
            grade: "",
            description: "",
        });
        setError({});
        setContentType('');
        setExamplerDisabled(true)
    };

    const showExemplerPopup = (position) => {
        setPosition(position);
        setIsExVisible(true);
    };

    const hideExemplerPopup = () => {
        setIsExVisible(false)
    };

    return (
        <Layout>
            <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
                <BreadCrumb
                    className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]  mb-[32px]"
                    model={items}
                    home={home}
                />
                <div className="grid grid-cols-12 gap-2">
                    <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                        <BackToAIModified
                            isGenerate={loader}
                        />
                        <button
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}

                            onClick={() => {
                                if (formDataShow) {
                                    setFormDataShow(false);
                                    setFormShow(true);
                                    setIsShowHide(false);
                                    clearStates();

                                } else {
                                    setIsShowHide(false);
                                    clearStates();

                                }
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
                            onClick={() => {
                                if (formDataShow) {
                                    setFormShow(true);
                                    setFormDataShow(false);
                                }
                                setResAssignmentData({
                                    grade: "Grade 8"
                                })
                                setContentType("Explore about the theory of evolution, natural selection, and adaptation.");
                            }
                            }
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
                    <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
                        {formShow && (
                            <>
                                <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                                    <div className="xl:col-span-2">
                                        <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium mb-2">
                                            <b>{AppTitle.commonmisconceptions}</b>
                                        </h3>

                                        <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                                            {AppDesc.commonmisconceptions}
                                        </p>
                                    </div>

                                    {
                                        isShowHide == true ? (isShowHide && !loader &&
                                            <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                                                onClick={() => {
                                                    setFormDataShow(true);
                                                    setFormShow(false);
                                                }}
                                            >
                                                <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                                                Hide  Prompt
                                            </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
                                    }

                                </div>

                                {
                                    loader ? (
                                        <>
                                            <div className="flex justify-center items-center" >
                                                <ProgressSpinner />
                                            </div >
                                        </>
                                    )
                                        :
                                        (

                                            <form className="grid xl:gap-[1.25vw] gap-[18px]">
                                                <div>
                                                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                                        Grade Level:<span className="text-[red] ml-1">*</span>
                                                    </label>

                                                    <Dropdown
                                                        value={
                                                            resAssignmentData.grade
                                                                ? GRADE.find(
                                                                    (ele) => ele.name == resAssignmentData.grade
                                                                )
                                                                : null
                                                        }
                                                        onChange={(e) => {
                                                            setResAssignmentData({
                                                                ...resAssignmentData,
                                                                grade: e.value.name,
                                                            })
                                                            if (e.target.value) {
                                                                setError({ ...error, gradeLevel: '' })
                                                            }
                                                        }

                                                        }
                                                        options={GRADE}
                                                        optionLabel="name"
                                                        placeholder="Select"
                                                        className="w-full md:w-14rem"
                                                        filter
                                                    />
                                                </div>

                                                <div>
                                                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                                        What You Are Teaching:<span className="text-[red] ml-1">*</span>
                                                    </label>
                                                    <div className="relative">

                                                        <InputTextarea

                                                            placeholder="Toppic, standard or longer discption of what you are teaching"
                                                            value={contentType}
                                                            onChange={(e) => {
                                                                setContentType(e.target.value);
                                                                if (e.target.value) {
                                                                    if (e.target.value) {
                                                                        setError({ ...error, contentType: '' })
                                                                    }
                                                                }
                                                            }}
                                                            //   rows={3}
                                                            rows={5} cols={5}
                                                            className="w-full relative pr-[40px]"
                                                        />
                                                        <div className="absolute bottom-[25px] right-[29px] xl:right-[32px]">
                                                            <i className="hexatoolmic"></i>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div>
                                                    <button
                                                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                                                        onClick={(e) => {
                                                            HandleGenerate(e);
                                                        }}
                                                    >
                                                        Generate with BrixAI
                                                    </button>
                                                </div>
                                            </form>

                                        )
                                }
                            </>
                        )}
                        {formDataShow && (
                            <Commonresponse
                                title={`${AppTitle.commonmisconceptions}`}
                                onHide={() => closeFormDataShow()}
                                handleAction={handleAction}
                                response={responsetoshow}
                                contentRef={copyRef}
                                appLink={'/commonmisconceptions'}
                            ></Commonresponse>
                        )}
                    </div>
                    <div className="xl:col-span-2 lg:col-span-2 col-span-12">

                        {isExVisible &&
                            <CommonActionExempler
                                onClose={hideExemplerPopup}
                                position={position}
                                visible={isExVisible}
                                title={`Example for ${AppTitle.commonmisconceptions}`}
                                // response={exemplarToShow}
                                response={responsetoshow}
                                responsetoshow
                                contentRef={copyRef}
                                isExVisible={isExVisible}
                                setIsPopupVisible={setIsExVisible}
                                appLink={'/commonmisconceptions'}
                            />}
                    </div>
                </div>
                {visible && <CommonActionExempler
                    title={`Generated ${AppTitle.commonmisconceptions}`}
                    response={responsetoshow}
                    visible={visible}
                    position={position}
                    setVisible={setVisible}
                    contentRef={copyRef}
                    appLink={'/commonmisconceptions'}
                    isExVisible={isExVisible} />}
            </div>

            {renderPopup()}

        </Layout>
    );
}
