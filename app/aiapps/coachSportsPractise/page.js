"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import { GRADE, LENGTH, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import { generateCoachSportsPracticesAPI } from "../../actions/coachSportsPractices";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {

    const [loading, setLoading] = useState(false);
    const [isExVisible, setIsExVisible] = useState(false);
    const [gradeLevel, setGradeLevel] = useState(null);
    const [sportValue, setSportValue] = useState("");
    const [lengthOfPractices, setLengthOfPractices] = useState(null);
    const [additionalCustomization, setAdditionalCustomization] = useState("");
    const [responseTitle, setResponseTitle] = useState("");
    const [responseDuration, setResponseDuration] = useState("");
    const [responseNotes, setResponseNotes] = useState("");
    const [responseActivities, setResponseActivities] = useState([]);
    const [formShow, setFormShow] = useState(true);
    const [formDataShow, setFormDataShow] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isActionvisible, setIsActionvisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState({})
    const [isShowHide, setIsShowHide] = useState(false);
    const [data, setData] = useState()

    const items = [
        { label: `${AppTitle.coachSportsPractise}`, url: '' }
    ];

    const appId = AppId.coachSportsPractise;
    const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT


    const [ip, setIp] = useState("");

    useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

    const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

    const home = { label: 'BrixAI Apps', template: () => <Link href="/"><span className="text-primary font-semibold">BrixAI Apps</span></Link> }

    const handleClear = () => {
        setGradeLevel(null);
        setSportValue("");
        setLengthOfPractices(null);
        setAdditionalCustomization("");
        setError({})
    };

    const showExemplerPopup = () => {
        setVisible(true);
        setIsPopupVisible(true);
    };

    const validate = () => {
        let err = {}
        let isErr = false;

        if (gradeLevel === null) {
            err.gradeLevel = 'Please Select Grade Level.'
            isErr = true
        }
        if (sportValue === "" || sportValue.trim() === "") {
            err.sportValue = 'Please Enter Sports.'
            isErr = true
        }
        if (lengthOfPractices === null || lengthOfPractices.trim === "") {
            err.lengthOfPractices = 'Please Select Length Of Practices.'
            isErr = true
        }
        if (additionalCustomization === "" || additionalCustomization.trim() === "") {
            err.additionalCustomization = 'Please Enter Additional Customization.'
            isErr = true
        }

        setError(err)
        return isErr
    }

    const HandleGenerate = async (e) => {
        e.preventDefault();
        if (validate()) {
            return
        }
        setLoading(true);
        setIsExVisible(false);

        try {
            const payload = {
                "grade": gradeLevel?.name,
                "sport": sportValue,
                "length": lengthOfPractices?.code,
                "customization": additionalCustomization
            }
            const response = await generateCoachSportsPracticesAPI(payload);
            if (response.data.code == '200') {

                // Halt form submission if attempts exceeded
                const attemptValid = handleClickAttempt();
                if (!attemptValid) {
                    setLoading(false)
                    return;
                }


                let responseData = response.data.data.data ?? [];

                setData(response?.data?.data)
                setResponseTitle(responseData?.practice_plan?.objective);
                setResponseDuration(responseData?.practice_plan?.duration);
                setResponseNotes(responseData?.practice_plan?.notes);
                setResponseActivities(responseData?.practice_plan?.activities);

                setLoading(false);
                setIsExVisible(true);
                setFormDataShow(true);
                setFormShow(false);
                setIsShowHide(true);

            } else {
                toast.error('Something went wrong.')
                setLoading(false);
            }
        } catch (error) {
            if(error.message!='Operation canceled by the user.'){
                toast.error('Something went wrong.')
                setLoading(false);
            }
        }
    }

    const copyRef = useRef(null);

    const responsetoshow = (
        data? (
            <div ref={copyRef}>
            <h3 >
                <strong className="text-[17px]">Objective : {responseTitle}</strong>
              
            </h3>
            <h3>  <strong>Duration</strong> :{responseDuration}</h3>


            {
                responseActivities.length > 0 ?
                    responseActivities.map((item) => (
                        <>
                            <h5>{item?.name}:</h5>
                            <ol className="pl-[16px] list-disc">
                                <li className="text-[14px] font-normal text-[#344054]">Duration :{item?.duration}</li>
                                <li className="text-[14px] font-normal text-[#344054]">Description :{item?.description}</li>
                            </ol>

                            {
                                item?.sub_activities ?
                                    <div className="ml-4">
                                        <h5 className="font-bold">Sub Activities</h5>
                                        {
                                            item?.sub_activities.map((subitem) => (
                                                <>
                                                    <h5>{subitem?.name}:</h5>
                                                    <ol className="pl-[16px] list-disc">
                                                        <li className="text-[14px] font-normal text-[#344054]">Description :{subitem?.description}</li>
                                                    </ol>
                                                </>
                                            ))
                                        }
                                    </div>
                                    : null
                            }


                        </>
                    )) : null
            }

            <p>{responseNotes}</p>
        </div>
        ):
        (
            ""
        )
       
    );

    const handleExample = () => {
        const exampleData = {
            "grade": { name: 'Grade 10', code: '12' },
            "sport": "Soccer",
            "length": { code: "30 min", name: "30 min" },
            "customization": "Include dribbling drills, a warmup with laps around a track, and other important soccer skills"
        }

        setGradeLevel(exampleData.grade)
        setSportValue(exampleData.sport)
        setLengthOfPractices(exampleData.length)
        setAdditionalCustomization(exampleData.customization)
        setError({})
        setFormDataShow(false);
        setFormShow(true);
    }


    return (
        <Layout>
            <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
                <BreadCrumb className='custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]' model={items} home={home} />
                <div className='grid grid-cols-12 gap-2'>
           <div className="xl:col-span-2 lg:col-span-2 col-span-12">
                    <BackToAIModified isGenerate={loading} />
                    <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
                        <button
                            disabled={loading}
                            onClick={
                                () => {
                                    if (formDataShow) {
                                        setFormDataShow(false)
                                        setFormShow(true)
                                        setIsExVisible(false)
                                        handleClear()
                                        setIsShowHide(false)
                                    } else {
                                        handleClear()
                                        setIsShowHide(false)

                                    }
                                }
                            }
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
                            Reset and Clear
                        </button>
                        <button
                            // disabled={!isExVisible}
                            // onClick={() => showExemplerPopup()}
                            onClick={handleExample}
                            className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
                            Try New
                        </button>

                        {isPopupVisible &&
                            <CommonActionExempler
                                onClose={() =>
                                    setIsPopupVisible(false)
                                }
                                setIsPopupVisible={setIsPopupVisible}
                                position={"center"}
                                visible={visible}
                                isExVisible={isExVisible}
                                contentRef={copyRef}
                                title={`Example for ${AppTitle.coachSportsPractise}`}
                                response={responsetoshow}
                                appLink={"/coachSportsPractise"}
                            />}

                        {isActionvisible && <CommonActionExempler
                            title={`Generated ${AppTitle.coachSportsPractise}`}
                            response={responsetoshow}
                            visible={isActionvisible}
                            contentRef={copyRef}
                            setVisible={setIsActionvisible}
                            appLink={"/coachSportsPractise"} />}

                    </div>
                    </div>
                    <div className='xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg'>
                        {formShow &&
                            <>
                                <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                                    <div className="xl:col-span-2">
                                        <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[18px] text-[#1570EF] font-medium"> {AppTitle.coachSportsPractise}</h3>
                                        <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] ">Generate a plan for practice for any sport that you`re coaching!</p>
                                    </div>
                                    {
                                        isShowHide && !loading ?
                                        <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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

                                {
                                    loading ? <div className="flex justify-center items-center h-[300px]"><ProgressSpinner /></div> :

                                        <form className="grid xl:gap-[1.25vw] gap-[18px]">
                                            <div>
                                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red] ml-1">*</span></label>
                                                <Dropdown
                                                    filter
                                                    value={gradeLevel}
                                                    onChange={(e) => setGradeLevel(e.value)}
                                                    options={GRADE}
                                                    optionLabel="name"
                                                    placeholder="Select Grade"
                                                    className="w-full md:w-14rem"
                                                />
                                                {error.gradeLevel ? <span style={{ color: 'red' }}>{error.gradeLevel}</span> : <></>}
                                            </div>

                                            <div>
                                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Sport:<span className="text-[red] ml-1">*</span></label>
                                                <div className="relative">
                                                    <div className="absolute left-[7px] top-[14px]">
                                                        <i className="hexatoolmic "></i>
                                                    </div>
                                                    <InputTextarea
                                                        autoResize
                                                        placeholder="Enter Sports"
                                                        value={sportValue}
                                                        onChange={(e) => setSportValue(e.target.value)} rows={2} className="w-full pl-8" />
                                                    {error.sportValue ? <span style={{ color: 'red' }}>{error.sportValue}</span> : <></>}

                                                </div>
                                            </div>
                                            <div>
                                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Length of Practice:<span className="text-[red] ml-1">*</span></label>

                                                <Dropdown
                                                    filter
                                                    value={lengthOfPractices}
                                                    onChange={(e) => setLengthOfPractices(e.value)}
                                                    options={LENGTH}
                                                    optionLabel="name"
                                                    placeholder="Select Length of Practice"
                                                    className="w-full md:w-14rem"
                                                />
                                                {error.lengthOfPractices ? <span style={{ color: 'red' }}>{error.lengthOfPractices}</span> : <></>}

                                            </div>
                                            <div>
                                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Additional Customization :<span className="text-[red] ml-1">*</span></label>
                                                <div className="relative">
                                                    <div className="absolute left-[7px] top-[14px]">
                                                        <i className="hexatoolmic"></i>
                                                    </div>
                                                    <InputTextarea autoResize placeholder="Enter Additional Customization"
                                                        value={additionalCustomization} onChange={(e) => setAdditionalCustomization(e.target.value)} rows={6} className="w-full pl-8" />
                                                    {error.additionalCustomization ? <span style={{ color: 'red' }}>{error.additionalCustomization}</span> : <></>}

                                                </div>
                                            </div>
                                        <Note/>
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
                                title={`${AppTitle.coachSportsPractise}`}
                                onHide={() => {
                                    setFormDataShow(false)
                                    setFormShow(true)
                                }}
                                handleAction={() => {
                                    setIsActionvisible(true)
                                    setVisible(true)
                                }}
                                response={responsetoshow}
                                contentRef={copyRef}
                                appLink={"/coachSportsPractise"}

                            />
                        }
                    </div>
                 
                </div>
            </div>
            {renderPopup()}

        </Layout>
    );
}
