"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { generateStudentWorkFeedbackAPI } from "../../actions/studentWorkFeedback";
import { ProgressSpinner } from "primereact/progressspinner";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";
export default function Index() {
  const appId = AppId.songgenerator;
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
  );
  const [gradeLevel, setGradeLevel] = useState(null);
  const [topic, setTopic] = useState("");
  const [detail, setDetail] = useState("");
  const [artName, setArtName] = useState("");
  const items = [{ label: `${AppTitle.songgenerator}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [error, setError] = useState({});
  const [isExVisible, setIsExVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);
  const [songData,setSongData]=useState(null)
  const validate = () => {
    let err = {};
    let isErr = false;

    if (topic === "") {
      err.topic = "Please Enter Song Topic.";
      isErr = true;
    }
    if (detail === "") {
      err.detail = "Please Enter Details to Include in the Song.";
      isErr = true;
    }
    if (artName === "") {
      err.artName = "Please Enter Artist Name & Song Title.";
      isErr = true;
    }

    setError(err);
    return isErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setIsExVisible(false);
    setLoading(true);
    try {
      const payload = {
        grade: "1",
        description: "description",
        focus_feedback: "focus_feedback",
        student_work_feedback: "student_work_feedback",
      };
      const response = await generateStudentWorkFeedbackAPI(payload);

      if (response.data.code == "200") {
        let responseData = response.data.data.data ?? [];
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }
        setSongData(responseData)
        setLoading(false);
        setIsExVisible(true);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);

      } else {
        const message =
          response?.message ?? response?.error ?? "Something went wrong";
        toast.error("Something went wrong");
        console.log("message", message);
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        const message = error?.message ?? "Something went wrong";
        toast.error("Something went wrong");
        console.log("message", message);
        setLoading(false);
      }
    }
  };

  const handleExample = () => {
    setTopic("6th grade math teacher, Ms. Lynn");
    setDetail(
      "She's the 6th grade math teacher and 6th grade grade level chair. She likes rock climbing. She's a vegetarian. The song should celebrate her birthday."
    );
    setArtName("Taylor Swift - Cruel Summer");
    setError({});
    setFormShow(true);
    setFormDataShow(false);
  };

  const handleClear = () => {
    setTopic("");
    setDetail("");
    setArtName("");
  };

  const handleAction = () => {
    setIsActionvisible(true);
  };
  const renderContent = (key, value) => {
    if (typeof value === 'string') {
      return (
        <div key={key}>
          <h3 className="font-bold">{key} : {value}</h3>
          
        </div>
      );
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      // Render object data with subcategories
      return (
        <div key={key}>
          <h3 className="font-bold">{key}</h3>
          {Object.entries(value).map(([subKey, subValue]) => (
            <p key={subKey}>
              <strong>{subKey}: </strong>
              {subValue}
            </p>
          ))}
        </div>
      );
    } else if (Array.isArray(value)) {
      // Render array data as list items
      return (
        <div key={key}>
          <h3 className="font-bold">{key}</h3>
          <ul>
            {value.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null; // Default return
  };

  const copyRef = useRef(null);
  const responseToShow = songData &&(
    <div>
      <div ref={copyRef}>
      {Object.entries(songData).map(([key, value]) => renderContent(key, value))}
      </div>
    </div>
  );

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
          <BackToAIModified isGenerate={loading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  setIsExVisible(false);
                  handleClear();
                  setIsShowHide(false);

                } else {
                  handleClear();
                  setIsShowHide(false);
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
                <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF]  font-medium">
                    {AppTitle.songgenerator}
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      Write a custom song about any topic to the tune of the song of
                      your choice!
                    </p>
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

                {loading ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Song Topic:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          autoResize
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="A science teacher named Mr.Smith."
                          rows={1}
                          cols={5}
                          className="w-full relative pl-[35px]"
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

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Details to Include in the Song:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="He coaches the debate team won teacher of the year,and love the tv show,The Office."
                          rows={5}
                          value={detail}
                          onChange={(e) => setDetail(e.target.value)}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.detail ? (
                          <span style={{ color: "red" }}>{error.detail}</span>
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
                        Artist Name & Song Title:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          autoResize
                          value={artName}
                          onChange={(e) => setArtName(e.target.value)}
                          placeholder="Taylor swift - Cruel Summer."
                          rows={1}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.artName ? (
                          <span style={{ color: "red" }}>{error.artName}</span>
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
                        onClick={handleSubmit}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.songgenerator}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responseToShow}
                  contentRef={copyRef}
                  appLink={"/songgenerator"}
                />
              </>
            )}
          </div>
        

          {isActionvisible && (
            <CommonActionExempler
              title={`Generated ${AppTitle.songgenerator}`}
              response={responseToShow}
              visible={isActionvisible}
              contentRef={copyRef}
              setVisible={setIsActionvisible}
              appLink={"/studentworkfeedback"}
            />
          )}
        </div>
      </div>

      {renderPopup()}
    </Layout>
  );
}
