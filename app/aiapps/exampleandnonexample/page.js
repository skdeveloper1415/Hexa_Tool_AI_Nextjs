"use client";
import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import { exampleNonExampleApi } from "../../actions/exampleNonExample";
import { printKeyValuePairs } from "../../../components/helper/printKeyValuePairs";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const copyRef = useRef(null);

  const [resData, setResData] = useState();
  const [exampleData, setExampleData] = useState({
    grade: "",
    standard: "",
    length: "",
    prompt: "",
  });

  const items = [{ label: AppTitle.exampleandnonexample, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [position, setPosition] = useState("center");
  const [isShowHide, setIsShowHide] = useState(false);

  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await getIpAddress();
      setIp(ip);
    };
    fetchIpAddress();
  }, []);

  const appId = AppId.exampleandnonexample;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(
    attempt,
    ip,
    appId
  ); // Change 3 to your desired maximum attempts

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  // const responsetoshow = (
  //     {/* {printKeyValuePairs(resData)} */}
  //   </div>
  // );



  const handleAction = () => {
    setVisible(true);
  };


  const generateExampleAndNonExample = async () => {
    const attemptValid = handleClickAttempt();
    if (!attemptValid) {
      setLoading(false);
      return;
    }

    try {
      const body = {
        grade_level: exampleData.grade.name,
        standard: exampleData.standard,
        assignment_prompt: exampleData.prompt,
        text_length: exampleData.length,
      };
      const response = await exampleNonExampleApi(body);
      if (response.data.code == "200") {
        setResData(response?.data.data?.data);
        setFormDataShow(true);
        setFormShow(false);
        setLoading(false);
        setIsShowHide(true);

      } else {
        console.log(response?.error);
        toast.error('Something went wrong.');
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        console.log("error: ", error);
        setLoading(false);
        toast.error('Something went wrong.');
      }
    }
  };
  const responsetoshow = resData && Object.keys(resData).length > 0 ? (
    <div ref={copyRef}>
      {Object.entries(resData).map(([key, value]) => (
        <div key={key}>
          <strong>{key}: </strong>
          {typeof value === 'string' ? (
            <div>{value}</div>
          ) : Array.isArray(value) ? (
            <ul>
              {value.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : typeof value === 'object' ? (
            <ul>
              {Object.entries(value).map(([objKey, objValue]) => (
                <li key={objKey}>
                  <strong>{objKey}: </strong>
                  {typeof objValue === 'string' ? (
                    <div>{objValue}</div>
                  ) : Array.isArray(objValue) ? (
                    <ul>
                      {objValue.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : null /* Add more conditions if necessary */}
                </li>
              ))}
            </ul>
          ) : null /* Add more conditions if necessary */}
        </div>
      ))}

    </div>) : ""


  const validate = () => {
    let err = {};
    let isErr = false;
    if (!exampleData.grade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }

    if (
      !exampleData.standard ||
      exampleData.standard.trim().length == 0
    ) {
      err.standard = "Please Enter Standard and/or Objective";
      isErr = true;

      setExampleData((prevState) => ({
        ...prevState,
        standard: "",
      }));
    }

    if (!exampleData.length || exampleData.length.trim().length == 0) {
      err.length = "Please Enter Length/Criteria for Success.";
      isErr = true;

      setExampleData((prevState) => ({
        ...prevState,
        length: "",
      }));
    }

    if (
      !exampleData.prompt ||
      exampleData.prompt.trim().length == 0
    ) {
      err.prompt = "Please Enter Assignment Prompt.";
      isErr = true;

      setExampleData((prevState) => ({
        ...prevState,
        prompt: "",
      }));
    }

    setError(err);
    return isErr;
  };

  const closeFormDataShow = () => {
    setFormDataShow(false);
    setFormShow(true);
  };


  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setLoading(true)
    const response = await generateExampleAndNonExample();
  };

  const resetAndClear = () => {
    setExampleData({
      grade: "",
      standard: "",
      length: "",
      prompt: "",
    })
    setError({});
    setFormDataShow(false);
    setFormShow(true);
    setVisible(false);
    setIsExVisible(false);
  };

  const handleExample = () => {
    setExampleData({
      grade: { name: 'Grade 9', code: '11' },
      length: "1 paragraph with three supporting pieces of evidence from a text that supports your analysis of the theme of the text.",
      standard: "RL9 -10.2 ",
      prompt: "Analyze the major theme of the story and give me three supporting pieces of evidence from the text that supports your analysis of the theme of the story.",
    })

    setError({});
    setFormDataShow(false);
    setFormShow(true);
    setVisible(false);
    setIsExVisible(false);
  };


  return (
    <Layout>
      <div className="mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified isGenerate={loading} />
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                       {AppTitle.exampleandnonexample}
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                   Generates  Exemplar & Non Exemplar responses for the given topics.
                    </p>
                  </div>
                  {
                    isShowHide && !loading ?
                    <button className='flex w-[250px] xl:w-[250px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
                  }
                </div>
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  {loading ? (<div className="h-[500px] flex justify-center items-center">
                    <ProgressSpinner />
                  </div>) : (<div className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={exampleData.grade}
                        onChange={(e) => {
                          setExampleData({
                            ...exampleData,
                            grade: e.target.value,
                          });
                          if (e.target.value) {
                            setError({ ...error, grade: "" });
                          }
                        }}
                        options={GRADE}
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
                        Standard and/or Objective:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          autoResize
                          value={exampleData.standard}
                          onChange={(e) => {
                            setExampleData({
                              ...exampleData,
                              standard: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, standard: "" });
                            }
                          }}
                          placeholder="standard and/or Objective"
                          rows={0}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.standard ? (
                          <span style={{ color: "red" }}>{error.standard}</span>
                        ) : (
                          <></>
                        )}

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic "></i>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Length/Criteria for Success:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="1 paragraph, include two pieces of supporting evidence, use at least two quotes from the book"
                          value={exampleData.length}
                          onChange={(e) => {
                            setExampleData({
                              ...exampleData,
                              length: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, length: "" });
                            }
                          }}
                          rows={3}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.length ? (
                          <span style={{ color: "red" }}>{error.length}</span>
                        ) : (
                          <></>
                        )}

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Assignment Prompt:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="The prompt that you'd like the exemplar written about."
                          value={exampleData.prompt}
                          onChange={(e) => {
                            setExampleData({
                              ...exampleData,
                              prompt: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, prompt: "" });
                            }
                          }}
                          rows={6}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.prompt ? (
                          <span style={{ color: "red" }}>{error.prompt}</span>
                        ) : (
                          <></>
                        )}

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    <Note/>
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
                  </div>)
                  }
                </form>
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.exampleandnonexample}`}
                onHide={() => {
                  closeFormDataShow();
                }}
                handleAction={handleAction}
                response={responsetoshow}
                contentRef={copyRef}
                appLink={"/exampleandnonexample"}
              ></Commonresponse>
            )}
          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={() => { resetAndClear(), setIsShowHide(false) }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
              disabled={loading}
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
          </div>
          {visible && (
            <CommonActionExempler
              title={`Generated ${AppTitle.exampleandnonexample}`}
              response={responsetoshow}
              visible={visible}
              position={position}
              setVisible={setVisible}
              contentRef={copyRef}
              appLink={"/exampleandnonexample"}
              isExVisible={isExVisible}
            />
          )}
        </div>

        {renderPopup()}
      </div>
    </Layout>
  );
}
