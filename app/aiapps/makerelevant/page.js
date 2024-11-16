"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import { GRADE, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import { generateMakeRelevant } from "../../actions/MakeItRelevantapi";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";   
import { toast } from "react-toastify";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
    const [assignment, setAssignment] = useState("");
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    const [gradeLevel, setGradeLevel] = useState(null);
    const [topic, setTopic] = useState("");
    const [describe_student, setDescribe_student] = useState("");
    const [title, setTitle] = useState("");
    const [isShowHide, setIsShowHide] = useState(false);
    const [isExVisible, setIsExVisible] = useState(false);
    const [isActionvisible, setIsActionvisible] = useState(false);
    const [position, setPosition] = useState("center");

    const [resultResponse, setResult] = useState({
        grade: "",
        topic: "",
        describe_student: "",
    });

    const copyRef = useRef(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const items = [{ label: `${AppTitle.makerelevant}`, url: "" }];

    const appId = AppId.makerelevant;
    const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

    const [ip, setIp] = useState("");

    useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

    const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

    const home = {
        label: "BrixAI Apps",
        template: () => (
            <Link href="/">
                <span className="text-primary font-semibold">BrixAI Apps</span>
            </Link>
        ),
    };

    const [formDataShow, setFormDataShow] = useState(false);
    const [visible, setVisible] = useState(false);

    const validate = () => {
        let err = {};
        let valid = false;
        if (!gradeLevel) {
            err.gradeLevel = "Please Select Grade Level.";
            valid = true;
        }
        if (!topic || topic.trim() === "") {
            err.topic = "Please Enter a Topic.";
            valid = true;
        }
        if (!describe_student || describe_student.trim() === "") {
            err.describe_student = "Please  Describe Your Students.";
            valid = true;
        }

        setError(err);
        return valid;
    };
    const HandleGenerate = async (e) => {
        e.preventDefault();
        if (validate()) {
            return;
        }
        setLoader(true);
        try {
            const body = {
                grade: gradeLevel?.name ? gradeLevel?.name : "",
                topic: topic ? topic : "",
                describe_student: describe_student ? describe_student : "",

            };


            const response = await generateMakeRelevant(body);
            if (response.data.code == "200") {
                // Halt form submission if attempts exceeded
                const attemptValid = handleClickAttempt();
                if (!attemptValid) {
                    setLoader(false)
                    return;
                }
                setAssignment(response.data.data.data);
                setResult({
                    ...resultResponse,
                    gradeLevel,
                    topic,
                    describe_student,
                });
                setFormDataShow(true);
                setIsExVisible(true);
                setLoader(false);
        setIsShowHide(true);

            } else {
                console.log(response?.error);
                toast.error('Something went wrong.');
                setLoader(false);
              }
        } catch (error) {
            if(error.message!='Operation canceled by the user.'){
                console.log('error:', error);
                setLoader(false);
                toast.error('Something went wrong.');
                 };
            }
        }

    const response = assignment?.Creative_Ideas ? (
        <div
            ref={copyRef}
            className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
        >
            <h5>Creative Ideas </h5>
            {assignment?.Creative_Ideas?.map((elements) => {
                return (
                    <div key={elements?.Title}>
                        <h5>
                            {`"${elements?.Title}"`} :
                            <span className="font-normal"> {elements?.Description}</span>
                        </h5>
                    </div>
                );
            })}
        </div>
    ) : ""

    const handleAction = () => {
        setVisible(true);
        setTitle("Generated Professional Email");
        setIsActionvisible(true);
    };

    const handleEdit = () => {
        setFormDataShow(false);
    };

    const handleReset = () => {
        setGradeLevel("");
        setTopic("");
        setDescribe_student("");
        setResult({
            ...resultResponse,
            grade: "",
            topic: "",
            describe_student: "",
        });
        setError({});
        setFormDataShow(false);
        setIsShowHide(false);
    };

    const hideExemplerPopup = () => {
        setIsPopupVisible(false);
    };

    const handleExample=()=>{
        setGradeLevel({name: 'Grade 10', code: '12'})
        setTopic("I would like for students to understand the impacts that humans have on their environment, including how we effect the air we breath, the water we drink and the land we inhabit.  ")
        setDescribe_student("Students are from Denver, love their sports teams and are very engaged in outdoor recreation")
        setError({})
        setFormDataShow(false);
    }
    return (
        <Layout>
            <div className="  mx-auto 3xl:px-[16.771vw]  2xl:px-[150px] xl:px-[100px] px-[20px]">
                <BreadCrumb
                    className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
                    model={items}
                    home={home}
                />
                <div className="grid grid-cols-12 gap-2">
                <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                    <BackToAIModified isGenerate={loader}/>
                    <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                        <button
                            disabled={loader}
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] lg:px-[10px] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""} `}
                            onClick={() => handleReset()}
                        >
                            {" "}
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

                            onClick={handleExample}
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""} `}
                        >
                            <Image
                                width="20"
                                height="20"
                                className="mr-[8px]"
                                src="/images/exemplar.svg"
                                alt="Example"
                            />
                            Try New
                        </button>

                        {isPopupVisible && (
                            <CommonActionExempler
                                onClose={hideExemplerPopup}
                                setIsPopupVisible={setIsPopupVisible}
                                position={position}
                                visible={visible}
                                isExVisible={isExVisible}
                                title={`Example for ${AppTitle.makerelevant}`}
                                response={response}
                                contentRef={copyRef}
                                appLink={"/makerelevant"}
                            />
                        )}
                    </div>
          </div>

                    <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
                        {!formDataShow && (
                            <>
                             <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                                    <div className="xl:col-span-2">
                                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF]  font-medium">
                               {AppTitle.makerelevant}
                                </h3>
                                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] ">
                                    Generate several ideas that make what you`re teaching relevant
                                    to your class based on their interests and background
                                </p>
                                </div>
                                    {
                                        isShowHide && !loader ?
                                        <button className='flex w-[300px] xl:w-[260px] 3xl:w-[13.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                                            onClick={() => {
                                                setFormDataShow(true);
                                            }}
                                        >
                                            <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                                            Hide  Prompt
                                        </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
                                    }
                                </div>
                                {loader ? (
                                    <div className="text-center">
                                        <ProgressSpinner />{" "}
                                    </div>
                                ) : (
                                    <>
                                        <form className="grid xl:gap-[1.25vw] gap-[18px]" onSubmit={(e) => { e.preventDefault(); HandleGenerate(e); }}>
                                            <div>
                                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                                    Grade Level:<span className="text-[red] ml-1">*</span>
                                                </label>
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
                                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                                    What You`re Teaching:
                                                    <span className="text-[red] ml-1">*</span>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute top-[12px] left-[15px]">
                                                        <i className="hexatoolmic "></i>
                                                    </div>
                                                    <InputTextarea
                                                        autoResize
                                                        placeholder="I would like for students to understand the impacts that humans have on their environment, including how we effect the air we breathe, the water we drink and the land we inhabit"
                                                        value={topic}
                                                        onChange={(e) => {
                                                            setTopic(e.target.value)
                                                            if (e.target.value) {
                                                                setError({ ...error, topic: '' })
                                                            }
                                                        }}
                                                        rows={4}
                                                        className="w-full pl-[35px]"
                                                    />
                                                    {error.topic ?
                                                        <span style={{ color: 'red' }}>{error.topic}</span> : <>
                                                        </>}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                                Describe Your Students::
                                                    <span className="text-[red] ml-1">*</span>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute left-[7px] top-[14px]">
                                                        <i className="hexatoolmic "></i>
                                                    </div>
                                                    <InputTextarea
                                                        autoResize
                                                        placeholder="Students are from Denver, love their sports teams and are very engaged in outdoor recreation."
                                                        value={describe_student}

                                                        onChange={(e) => {
                                                            setDescribe_student(e.target.value)
                                                            if (e.target.value) {
                                                                setError({ ...error, describe_student: '' })
                                                            }
                                                        }}
                                                        rows={4}
                                                        className="w-full pl-8"
                                                    />
                                                    {error.describe_student ?
                                                        <span style={{ color: 'red' }}>{error.describe_student}</span> : <>
                                                        </>}
                                                </div>
                                            </div>
                                            <Note/>
                                            <div>
                                                <button
                                                    className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full">
                                                    Generate with BrixAI
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </>
                        )}
                        {formDataShow && (
                            <Commonresponse
                                title={`${AppTitle.makerelevant}`}
                                onHide={() => {setFormDataShow(false)}}
                                handleAction={handleAction}
                                response={response}
                                contentRef={copyRef}
                                handleEdit={handleEdit}
                                appLink={"/makerelevant"}
                            />
                        )}
                    </div>
                    
                </div>
            </div>
            {isActionvisible && (
                <CommonActionExempler
                    title={`${AppTitle.makerelevant}`}
                    response={response}
                    visible={isActionvisible}
                    position={position}
                    setVisible={setIsActionvisible}
                    contentRef={copyRef}
                    appLink={"/makerelevant"}
                />
            )}

             {renderPopup()}

        </Layout>
    );
}
