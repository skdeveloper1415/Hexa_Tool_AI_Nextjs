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
import {
  GRADE,
  VOCABULARYWORDSTODEFINE,
  AppId,
  AppTitle,
  AppDesc, AppCategory
} from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import { getVocabularyList } from "../../actions/vocabularyListGeneratorApi";
import BackToAIModified from "../../../components/BackToAIModified";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";


export default function Index() {
  const copyRef = useRef(null);

  const [resAssignmentData, setResAssignmentData] = useState({
    grade: "",
    description: "",
  });
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isExVisible, setIsExVisible] = useState(false);
  const [isExamplerDisable, setExamplerDisabled] = useState(true);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [resData, setResData] = useState();
  const [vocabTitle, setVocabTitle] = useState();
  const [vocabData, setVocabData] = useState([]);
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const appId = AppId.vocabularylistgenerator;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("");
  const [isShowHide, setIsShowHide] = useState(false);

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
  );

  const items = [{ label: `${AppTitle.vocabularylistgenerator}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [vocabularyWords, setvocabularyWords] = useState(null);
  const [contentType, setContentType] = useState("");
  const dataConversion = (data) => {
    const lines = data.split("\n");
    const vocabulary = lines.map((line) => {
      const [term, definition] = line.split(": ");
      return { term, definition };
    });
    setVocabTitle(vocabulary[0]);
    setVocabData(vocabulary.slice(2));
  };

  useEffect(() => {
    if (resData) {
      dataConversion(resData);
    }
  }, [resData]);
  const responsetoshow = (
    vocabData.length > 0 ? (
      <div ref={copyRef}>
        <b>{vocabTitle?.term}</b>
        <br></br>
        <br></br>

        {vocabData?.map((elm, index) => {
          return (
            <>
              <b> {elm.term  ? `${elm.term + ' :' } `:''}</b>
              {elm.definition}
              <br></br>
            </>
          )
        })}
      </div>):null
  );


  const HandleGenerate = async (e) => {
    e.preventDefault();

    if (!resAssignmentData.grade || resAssignmentData.grade.trim() === "") {
      toast.error('Please Select Grade Level.');
      return;
    }
    if (!vocabularyWords) {
      toast.error('Please Enter Vocabulary Words.');
      return;
    }
    if (!contentType || contentType.trim() === "") {
      toast.error('Please Enter Topic Or Text.');
      return;
    }

    setLoader(true);
    try {
      const body = {
        grade: resAssignmentData.grade,
        no_of_words: vocabularyWords.code,
        topic: contentType,
      };

      const response = await getVocabularyList(body);
      if (response.data.code == "200") {
        setResData(response?.data?.data?.data);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setExamplerDisabled(false);
        setFormDataShow(true);
        setShowExemplarButton(true);
        setIsShowHide(true);
        setFormShow(false);
        setLoader(false);
      } else {
        console.log(response?.error);
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setLoader(false);
        let msg =
          error?.response?.error ??
          error?.response?.message ??
          "Something went wrong";
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

  const setExamples = () => {
    setFormDataShow(false);
    setFormShow(true);
    setResAssignmentData({
      grade: "Grade 9",
      description: "",
    });
    setvocabularyWords({ name: '5', code: '5' });
    setContentType("The Industrial Revolution.\nThe Industrial Revolution, which began in the late 18th century and continued into the 19th century, marked a significant shift in human history. It was characterized by the transition from agrarian and handcraft-based economies to industrialized, machine-driven economies. Key developments included advancements in manufacturing, transportation, and communication technologies. This period saw the rise of factories, steam engines, railways, and telegraphs, fundamentally altering the way goods were produced, transported, and consumed. The Industrial Revolution had profound social, economic, and environmental impacts, shaping modern society in ways that continue to influence us today.");
    setError({});
    setShowExemplarButton(false);
    setExamplerDisabled(true);
  };

  const clearStates = () => {
    setFormDataShow(false);
    setFormShow(true);
    setResAssignmentData({
      grade: "",
      description: "",
    });
    setShowExemplarButton(false);
    setIsShowHide(false);
    setError({});
    setvocabularyWords();
    setContentType("");
    setExamplerDisabled(true);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setIsExVisible(true);
  };

  const hideExemplerPopup = () => {
    setIsExVisible(false);
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                clearStates();
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
              onClick={() => setExamples()}
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
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.vocabularylistgenerator}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.vocabularylistgenerator}
                    </p>
                  </div>
                  {
                    isShowHide == true ? (isShowHide && !loader &&
                      <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                {loader ? (<div className="flex justify-center items-center h-[300px]">
                  <ProgressSpinner />
                </div>
                ) : (
                  <>
                    <form>
                      <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                        <div className="grid col-span-3">
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
                              });
                              if (e.target.value) {
                                setError({ ...error, grade: "" });
                              }
                            }}
                            options={GRADE}
                            optionLabel="name"
                            placeholder="Select"
                            className="w-full md:w-14rem"
                            filter
                          />
                        </div>

                        <div className="grid col-span-3">
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            Vocabulary Words to Define:
                            <span className="text-[red] ml-1">*</span>
                          </label>
                          <Dropdown
                            value={vocabularyWords}
                            onChange={(e) => setvocabularyWords(e.target.value)}
                            filter
                            options={VOCABULARYWORDSTODEFINE}
                            optionLabel="name"
                            placeholder="Select"
                            className="w-full md:w-14rem"
                          />
                          {error.vocabularyWords ? (
                            <span style={{ color: "red" }}>
                              {error.vocabularyWords}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Topic or Text:
                          <span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <InputTextarea
                            placeholder="Stages of cellular respiration"
                            value={contentType}
                            onChange={(e) => setContentType(e.target.value)}
                            rows={5}
                            cols={5}
                            className="w-full relative pr-[40px]"
                          />
                          {error.contentType ? (
                            <span style={{ color: "red" }}>
                              {error.contentType}
                            </span>
                          ) : (
                            <></>
                          )}

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
                  </>
                )}
              </>
            )}
         

          {formDataShow && (
            <Commonresponse
              title={`${AppTitle.vocabularylistgenerator}`}
              onHide={() => {
                closeFormDataShow();
              }}
              handleAction={handleAction}
              response={responsetoshow}
              contentRef={copyRef}
              appLink={"/vocabularylistgenerator"}
            ></Commonresponse>
          )}

          <div className="xl:col-span-2 lg:col-span-2 col-span-12">

            {isExVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                position={position}
                visible={isExVisible}
                title={`${AppTitle.vocabularylistgenerator}`}
                response={responsetoshow}
                responsetoshow
                contentRef={copyRef}
                isExVisible={isExVisible}
                setIsPopupVisible={setIsExVisible}
                appLink={"/vocabularylistgenerator"}
              />
            )}
             </div>
          </div>
        </div>
      </div>
      {
        visible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.vocabularylistgenerator}`}
            response={responsetoshow}
            visible={visible}
            position={position}
            setVisible={setVisible}
            contentRef={copyRef}
            appLink={"/vocabularylistgenerator"}
            isExVisible={isExVisible}
          />
        )
      }
      {renderPopup()}
    </Layout >
  );
}
