"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import { toast } from "react-toastify";
import { generateConceptualUnderstanding } from "../../actions/ConceptualUnderstandingApi";
import { ProgressSpinner } from "primereact/progressspinner";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const copyRef = useRef(null);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [text, setText] = useState(null);
  const [additional_text, setAdditional_text] = useState(null);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const items = [
    { label: `${AppTitle.conceptualunderstanding}`, url: "" },
  ];

  const appId = AppId.conceptualunderstanding;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT
  

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [assignment, setAssignment] = useState("");
  const [resultResponse, setResult] = useState({
    gradeLevel: "",
    text: "",
    additional_text: "",
  });
  const [title, setTitle] = useState("");
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [isShowHide, setIsShowHide] = useState(false);

  const validate = () => {
    let err = {};
    let valid = false;
    if (!gradeLevel) {
      err.gradeLevel = "Please Select Grade Level.";
      valid = true;
    }
    if (!text || text.trim() === "") {
      err.text = "Please Enter a Topic.";
      valid = true;
    }
    if (!additional_text || additional_text.trim() === "") {
      err.additional_text = "Please  Enter Additional Context.";
      valid = true;
    }

    setError(err);
    return valid;
  };

  const handleExample=()=>{
    setGradeLevel({name: 'Grade 10', code: '12'})
    setText("Equivalent Fractions")
    setAdditional_text("How can I help students understand that fractions that look completely different can actually be equal?")
    setError({})
    setFormDataShow(false);
    setFormShow(true);
  }
  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setLoader(true);
    try {
      const body = {
        grade: gradeLevel.name ? gradeLevel.name : "",
        text: text ? text : "",
        additional_text: additional_text ? additional_text : "",

      };

      const response = await generateConceptualUnderstanding(body);
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
          text,
          additional_text,
        });
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
        setShowExemplarButton(true)
      }
      setIsExVisible(true);
      setLoader(false);
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        let msg = error?.error ?? error?.message ?? "Something went wrong";
        toast.error(msg);
      }
    }
  };

  let count = 0;
  const response = assignment?.activities?.length > 0 ?(
    <div
      ref={copyRef}
      className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054] ml-[0.6vw]"
    >

      {assignment?.activities?.map((elements) => {

        count++;
        return (
          <div key={count}>
            <h5>
              {`Idea ${count}: ${elements?.title}`}
            </h5>
            <ol>
              <li className="">{elements?.description}</li>
            </ol>
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
    setText("");
    setAdditional_text("");
    setAssignment(" ")
    setResult({
      ...resultResponse,
      gradeLevel: "",
      text: "",
      additional_text: "",
    });
    setFormDataShow(false);
    setError({});
    setShowExemplarButton(false)
    setIsShowHide(false);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);
  };
  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

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
            <BackToAIModified
              isGenerate={loader}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                handleReset();
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
         
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {!formDataShow && (
              <>
              <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
              <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.conceptualunderstanding}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.conceptualunderstanding}
                    </p>
                  </div>
                {
                     isShowHide == true ?(isShowHide && !loader &&
                    <button className='flex w-[200px] xl:w-[190px] 3xl:w-[9.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>):<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
                  }
                  </div>
                {loader ?  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div> : <><form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Grade Level:<span className="text-[red] ml-1">*</span>
                    </label>
                    <Dropdown
                      value={gradeLevel}

                      onChange={(e) => {
                        setGradeLevel(e.target.value)
                        if (e.target.value) {
                          setError({ ...error, gradeLevel: '' })
                        }
                      }}
                      filter
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
                      Standard / Topic:<span className="text-[red] ml-1">*</span>
                    </label>
                    <div className="relative">

                      <InputTextarea
                        value={text}
                        placeholder="Enter Standard / Topic"
                        onChange={(e) => {
                          setText(e.target.value)
                          if (e.target.value) {
                            setError({ ...error, text: '' })
                          }
                        }}
                        rows={5} cols={5}
                        className="w-full relative pr-[40px]"
                      />

                      {error.text ?
                        <span style={{ color: 'red' }}>{error.text}</span> : <>
                        </>}

                      <div className="absolute bottom-[25px] right-[29px] xl:right-[32px]">
                        <i className="hexatoolmic"></i>
                      </div>
                      
                    </div>
                  </div>
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Additional Context :
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <div className="relative">

                      <InputTextarea
                        value={additional_text}
                        placeholder="Enter Additional Context"
                        onChange={(e) => {
                          setAdditional_text(e.target.value)
                          if (e.target.value) {
                            setError({ ...error, additional_text: '' })
                          }
                        }}

                        //   rows={3}
                        rows={5} cols={5}
                        className="w-full relative pr-[40px]"
                      />

                      {error.additional_text ?
                        <span style={{ color: 'red' }}>{error.additional_text}</span> : <>
                        </>}

                      <div className="absolute bottom-[25px] right-[29px] xl:right-[32px]">
                        <i className="hexatoolmic"></i>
                      </div>
                    </div>

                  </div>
                  {/* <Note/> */}
                  <div>
                    <button
                      className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      onClick={(e) => {
                        HandleGenerate(e);
                        // setFormDataShow(true)
                        // setFormShow(false)
                      }}
                    >
                      Generate with BrixAI
                    </button>
                  </div>
                </form> </>}
              </>
            )}

            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.conceptualunderstanding}`}
        onHide={() => {setFormDataShow(false)}}
                handleAction={handleAction}
                response={response}
                contentRef={copyRef}
                handleEdit={handleEdit}
                appLink={"/conceptualunderstanding"}
              />
            )}

          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            {/* <button
              disabled={loader}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] lg:px-[10px] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : "" } `}
              onClick={() => handleReset()}
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
              // onClick={() => {
              //   showExemplerPopup("top");
              //   setVisible(true),
              //     setExempler(true),
              //     setTitle("Example for Make Relevant Generator ");
              // }}
onClick={handleExample}
              // disabled={!resultResponse?.gradeLevel == "" && !resultResponse?.text == "" && !resultResponse?.additional_text == "" ? false : true || !showExemplarButton}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center  ${loader == true ? "opacity-50 cursor-not-allowed" : "" }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Example"
              />
              Example
            </button> */}

            {isPopupVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                title={`Example for ${AppTitle.conceptualunderstanding}`}
                response={response}
                appLink={"/conceptualunderstanding"}
                contentRef={copyRef}
              />
            )}
          </div>
        </div>
      </div>

      {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.conceptualunderstanding}`}
          response={response}
          visible={isActionvisible}
          position={position}
          setVisible={setIsActionvisible}
          contentRef={copyRef}
          appLink={"/conceptualunderstanding"}
        />
      )}
            {renderPopup()}

    </Layout>
  );
}
