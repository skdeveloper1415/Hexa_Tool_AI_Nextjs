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
import { GRADE, QUESTIONS , AppId, AppTitle, AppDesc, AppCategory} from "../../../components/helper/enum";
import { generateMathSpiralReview } from "../../actions/mathSpiralReview";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";


export default function Index() {
  const [multiStepData, setmultiStepData] = useState();
  const [noproblem, setNoproblem] = useState();
  const [contentType, setContentType] = useState();
  const [visible1, setVisible1] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const items = [{ label: `${AppTitle.mathSpiralReview}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
    
  const appId = AppId.mathSpiralReview;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts
  const [formShow, setFormShow] = useState(true);
  const [additionalCriteria, setAdditionalDetail] = useState();
  const [isExVisible, setIsExVisible] = useState(false);

  const [responseTitle, setResponseTitle] = useState("");
  const [responseContent, setResponseContent] = useState([]);
  const [isShowHide, setIsShowHide] = useState(false); 
  const contentRef = useRef(null);

  const responseData = responseContent.length > 0 ? (
    <div ref={contentRef}>
      <div>
        <h4 className="text-[18px] xl:text-[0.833vw] mb-3"> {responseTitle}</h4>
        <div className="text-[18px] xl:text-[0.833vw] mb-3">
          {responseContent.length > 0
            ? responseContent.map((item, i) => (
              <p key={i} className="my-2 text-[14px]">
                {item}
              </p>
            ))
            : null}
        </div>
      </div>
    </div>
  ) : ""

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!multiStepData || multiStepData.name.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter Math Content.";
      isErr = true;
    }
    if (!noproblem || noproblem.name.trim() === "") {
      err.noproblem = "Please Select Number of Problems.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setIsLoading(true);
    const payload = {
      grade: multiStepData.name,
      math_topic: contentType,
      number_of_questions: noproblem.code,
      additional_criteria: additionalCriteria,
    };
    try {
      const response = await generateMathSpiralReview(payload);
      if (response.data.code == "200") {
        const responseData = response.data.data;        
        const transformedResponse = stringResponseConvert(responseData);
        setVisible1(true);
        setResponseTitle(transformedResponse?.Title);
        setResponseContent(transformedResponse?.Content);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setIsLoading(false)
          return;
        }
        setFormShow(false);
        setIsExVisible(true);
        setIsLoading(false);
        setIsShowHide(true);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.log(error);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const setExamples = () => {
    setmultiStepData({name: 'Grade 6', code: '8'})
    setContentType('Dividing two and three digit numbers ')
    setNoproblem({name: '5', code: '5'})
    setAdditionalDetail('Make them word problems')
    setError({})
    setIsActionvisible(false)
    setFormShow(true);
    setIsExVisible(false);
    setExempler(false)
    setVisible1(false);
  };

  const handleClear = (e) => {
    setVisible1(false);
    setFormShow(true);
    setmultiStepData("");
    setNoproblem("");
    setContentType("");
    setNoproblem("");
    setAdditionalDetail("");
    setError({});
    setIsShowHide(false);
  };

  const handleAction = () => {
    setIsActionvisible(true);
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
              isGenerate={isLoading}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                handleClear();
              }}
              disabled={isLoading}
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
              disabled={isLoading}
              onClick={() => setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""
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
                      <b>{AppTitle.mathSpiralReview}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.mathSpiralReview}
                    </p>
                  </div>
                {
                     isShowHide == true ? (isShowHide && !isLoading &&
                    <button className='flex w-[180px] xl:w-[170px] 3xl:w-[8.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setVisible1(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>):
                     <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.ContentLibrary}</div>
                  }
                </div>
                {isLoading == true ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ">*</span>
                      </label>
                      <Dropdown
                        value={multiStepData}
                        onChange={(e) => {
                          setmultiStepData(e.target.value),
                            setError((prevError) => ({
                              ...prevError,
                              grade: "", // Clear error message when a selection is made
                            }));
                        }}
                        options={GRADE}
                        filter
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.grade ? (
                        <span style={{ color: "red" }}>{error.grade}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Math Content:<span className="text-[red] ">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>
                        <InputTextarea
                          autoResize
                          placeholder="Arithmatic operation..."
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "", // Clear error message when a selection is made
                              }));
                          }}
                          rows={3}
                          className="w-full pl-[35px]"
                        />
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Problems:
                        <span className="text-[red] ">*</span>
                      </label>
                      <Dropdown
                        value={noproblem}
                        onChange={(e) => {
                          setNoproblem(e.value),
                            setError((prevError) => ({
                              ...prevError,
                              noproblem: "", // Clear error message when a selection is made
                            }));
                        }}
                        options={QUESTIONS}
                        filter
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.noproblem ? (
                        <span style={{ color: "red" }}>{error.noproblem}</span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Criteria (Optional):
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>

                        <InputTextarea
                          autoResize
                          placeholder="Make them word problems etc."
                          value={additionalCriteria}
                          onChange={(e) => {
                            setAdditionalDetail(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                additionalCriteria: "", // Clear error message when a selection is made
                              }));
                          }}
                          rows={3}
                          className="w-full pl-[35px]"
                        />
                        {error.additionalCriteria ? (
                          <span style={{ color: "red" }}>
                            {error.additionalCriteria}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  {/* <Note/> */}
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
                )}
              </>
            )}
            {visible1 == true && (
              <Commonresponse
                title={`${AppTitle.mathSpiralReview}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), setFormShow(true);
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responseData}
                contentRef={contentRef}
                appLink={"/mathstorywordproblems"}
              />
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={isLoading == true ? true : false}
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] lg:px-[10px] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
              disabled={isLoading}
              // onClick={() => setExempler(true)}
              onClick={() => setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Example"
              />
              Example
            </button>
          </div> */}
        </div>

        {exempler && (
          <CommonActionExempler
            contentRef={contentRef}
            onClose={() => {
              setExempler(false);
            }}
            setIsPopupVisible={setExempler}
            position={"center"}
            visible={exempler}
            isExVisible={isExVisible}
            title={`${AppTitle.mathSpiralReview}`}
            response={responseData}
            setVisible={setExempler}
            appLink={"/mathstorywordproblems"}
          />
        )}

        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.mathSpiralReview}`}
            response={responseData}
            visible={isActionvisible}
            position={"top"}
            setVisible={setIsActionvisible}
            appLink={"/mathstorywordproblems"}
            contentRef={contentRef}

          />
        )}
      </div>
      {renderPopup()}

    </Layout>
  );
}
