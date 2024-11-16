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
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [senStarterData, setSenStarterData] = useState({
    grade: "",
    topic: "",
  });
  const [isShowHide, setIsShowHide] = useState(false);

  const copyRef = useRef(null);

  const responsetoshow = (
    <div ref={copyRef}>
      <b>Update to Make this Assignment Sentence Starter:</b>
      <br></br>
      <br></br>
      <b>Assignment:</b> Create a multimedia presentation that explores the
      themes of social justice, identity, and community in the novel &quot;The
      Hate You Give.&quot; Your presentation should include a combination of
      visuals, audio clips, and written reflections.<br></br>
      <br></br>
      <b>Explanation:</b> By shifting the format of the assignment from a
      traditional essay to a multimedia presentation, students are required to
      engage with the material in a more creative and critical manner, making it
      challenging for AI to replicate the depth of analysis and interpretation
      needed.
      <b>Update to Make this Assignment Sentence Starter:</b>
      <br></br>
      <br></br>
      <b>Assignment:</b> Write a dialogue between two characters from &quot;The
      Hate You Give&quot; discussing a pivotal moment in the book. Your dialogue
      should reflect the characters&apos; personalities, motivations, and
      differing perspectives on the event.<br></br>
      <br></br>
      <b>Explanation:</b> This modification prompts students to demonstrate a
      deep understanding of the characters and themes in the novel through
      creative writing. Crafting a meaningful conversation between characters
      requires nuanced interpretation and critical thinking, making it difficult
      for AI to generate authentic dialogue without human insight and analysis.
      <br></br>
      <br></br>
    </div>
  );

  const items = [{ label: `${AppTitle.sentencestarter}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [ip, setIp] = useState("");
  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await getIpAddress();
      setIp(ip);
    };
    fetchIpAddress();
  }, []);

  const appId = AppId.sentencestarter;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(
    attempt,
    ip,
    appId
  );
  const [formShow, setFormShow] = useState(true);
  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false);

  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);

  const [title, setTitle] = useState();

  const [visible, setVisible] = useState(false);

  const handleClear = () => {
    setSenStarterData({
      grade: "",
      topic: "",
    });
    setVisible(false);
    setFormDataShow(false);
    setFormShow(true);
  };

  const handleExample = () => {
    setSenStarterData((prevData) => ({
      ...prevData,
      grade: "8",
      topic: "Explain the differences between physical and chemical changes? ",
    }));
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
  };

  const validate = () => {
    let err = {};
    let isErr = false;

    if (!senStarterData.grade || senStarterData.grade.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!senStarterData.topic || senStarterData.topic.trim() === "") {
      err.topic =
        "Please Enter Assignment, topic, question, discription standard.";
      isErr = true;
    }

    setError(err);
    return isErr;
  };

  const generateStandardSentence = async () => {
    const attemptValid = handleClickAttempt();
    if (!attemptValid) {
      setLoading(false);
      return;
    }
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        return;
      }
      setFormDataShow(true);
      setFormShow(false);
      setIsShowHide(true);

      const response = await generateStandardSentence();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  function printKeyValuePairs(obj, parentKey = "") {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        printKeyValuePairs(obj[key], parentKey ? `${parentKey}.${key}` : key);
      } else {
        return (
          <li>
            <h5 style={{ display: "inline" }}>{`${parentKey ? `${parentKey}.${key}` : key
              }`}</h5>{" "}
            : {obj[key]}
          </li>
        );
      }
    }
  }

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
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  handleClear();
                  setIsShowHide(false)
                } else {
                  handleClear();
                  setIsShowHide(false)
                }
              }}
              className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center"
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
              onClick={handleExample}
              className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center"
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
          </div>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">
                    <h3 className="33xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                       {AppTitle.sentencestarter}
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      Provide sentence starters for any topic, assignment
                      standard,or objective.
                    </p>
                  </div>
                  {
                    isShowHide && !loading ?
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button> :<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                  }
                </div>
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Grade Level:<span className="text-[red] ml-1">*</span>
                    </label>
                    <Dropdown
                      filter
                      value={
                        senStarterData.grade
                          ? GRADE.find(
                            (ele) => ele.code == senStarterData.grade
                          )
                          : null
                      }
                      onChange={(e) => {
                        setSenStarterData({
                          ...senStarterData,
                          grade: e.value.code,
                        });
                        if (e.value.code) {
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
                      Assignment, topic, question, discription standard:
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <div className="relative">
                      <InputTextarea
                        placeholder="What are the phase of mitosis?"
                        rows={3}
                        cols={5}
                        value={senStarterData.topic}
                        className="w-full relative pl-[40px]"
                        onChange={(e) => {
                          setSenStarterData({
                            ...senStarterData,
                            topic: e.target.value,
                          });
                          if (e.target.value) {
                            setError({ ...error, topic: "" });
                          }
                        }}
                      />
                      {error.topic ? (
                        <span style={{ color: "red" }}>{error.topic}</span>
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
                </form>
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={"Sentence Initiator Tool"}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                appLink={"/jeopardyreviewgame"}
                handleAction={() => {
                  setVisible(true),
                    setIsExVisible(false),
                    setTitle("Generated Sentence Initiator Tool");
                }}
                response={responsetoshow}
                contentRef={copyRef}
              />
            )}
          </div>
        
        </div>

        {visible && (
          <CommonActionExempler
            response={responsetoshow}
            setIsPopupVisible={setVisible}
            title={title}
            contentRef={copyRef}
            onClose={() => setVisible(false)}
            setVisible={setVisible}
            position={"top"}
            visible={visible}
            isExVisible={isExVisible}
            appLink={"/multistepassignment"}
          />
        )}

        {renderPopup()}
      </div>
    </Layout>
  );
}
