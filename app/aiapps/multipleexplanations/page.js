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
import { generateMultiExplainationApi } from "../../actions/multiExplainationApi";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";
export default function Index() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [topic, setTopic] = useState("");
  const multiExplainRef = useRef(null);
  const [position, setPosition] = useState("center");
  const items = [{ label: `${AppTitle.multipleexplanations}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);

  const [visible, setVisible] = useState(false);

  const [exempler, setExempler] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [multipleExplainData, setMultipleExplainData] = useState(null);

  const [isShowHide, setIsShowHide] = useState(false);


  const validate = () => {
    let err = {};
    let isErr = false;

    if (!selectedGrade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }

    if (!topic || topic.trim() === "") {
      err.topic = "Please Enter Concept Being Taught.";
      isErr = true;
    }

    // Add validation for other fields if needed
    setError(err);
    return isErr;
  };
  const appId = AppId.multipleexplanations;
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

  // Change 3 to your desired maximum attempts
  const generateMultipleExplanationAI = async (data) => {
    try {
      setLoading(true);

      const response = await generateMultiExplainationApi(data);

      if (response.data.code == 200) {
        setMultipleExplainData(response.data.data.data);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);

          return;
        }
        setLoading(false);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true)
      } else {
        toast.error(response.error);
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoading(false);
        setFormDataShow(false);
        setFormShow(true);
        let msg =
        error?.response?.error ??
        error?.response?.message ??
        "Something went wrong";
        toast.error(msg);
      }
    }
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();

    if (validate()) {
      return;
    }

    const payload = {
      grade: selectedGrade ? selectedGrade?.name : "",
      text: topic ? topic : "",
    };

    generateMultipleExplanationAI(payload);
  };


  const createResponse = multipleExplainData ? (
    <div ref={multiExplainRef}>
      <h2 style={{ fontWeight: "bold" }}>{multipleExplainData?.Concept}</h2>
      <p>{multipleExplainData?.Definition}</p>

      <div>
        <h3 style={{ fontWeight: "bold" }}>Examples:</h3>
        <ul>
          {multipleExplainData?.Examples &&
            multipleExplainData.Examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
        </ul>
      </div>

      <div>
        <h3 style={{ fontWeight: "bold" }}>Analogies:</h3>
        <ul>
          {multipleExplainData?.Analogies &&
            multipleExplainData.Analogies.map((analogy, index) => (
              <li key={index}>{analogy}</li>
            ))}
        </ul>
      </div>
    </div>
  ): "";

  const handleEdit = () => {
    setFormDataShow(false);
    setFormShow(true);
  };
  const handleAction = () => {
    setVisible(true);
    setExempler(false);
  };

  const handleClear = () => {
    setTopic("");
    setSelectedGrade(null);
    setError({});
    setFormShow(true);
    setVisible(false);
    setExempler(false);
    setFormDataShow(false);
    setMultipleExplainData(null);
    setIsShowHide(false)
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
          <BackToAIModified isGenerate={loading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loading == true ? "opacity-50 cursor-not-allowed" : ""
              } `}
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
              onClick={() => {
                if (formDataShow) {
                  setFormShow(true);
                  setFormDataShow(false);
                }
                setSelectedGrade({ name: "Grade 11", code: "13" });
                setTopic("Making proteins from DNA");
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                loading == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Try New"
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
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px]  text-[#1570EF]  font-medium">
              {AppTitle.multipleexplanations}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Generates much clearer explinations in different ways for better understding by students.
                </p>
                </div>
                {
                    isShowHide && !loading ?
                    <button className='flex w-[240px] xl:w-[220px] 3xl:w-[10.854vw] xl:px-[1.04vw] px-[16px] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
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
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.value)}
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.grade && (
                        <div className="text-red-500 text-sm">
                          {error.grade}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Concept Being Taught:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="opportunity cost"
                          rows={5}
                          cols={5}
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full relative pl-[35px]"
                        />
                        {error.topic && (
                          <div className="text-red-500 text-sm">
                            {error.topic}
                          </div>
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
                          // setFormDataShow(true)
                          // setFormShow(false)
                        }}
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.multipleexplanations}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={handleAction}
                response={createResponse}
                handleEdit={handleEdit}
                contentRef={multiExplainRef}
                appLink={"/multipleexplanations"}
              />
            )}
          </div>
         
        </div>
      </div>

      {visible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.multipleexplanations}`}
          response={createResponse}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={multiExplainRef}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={"/multipleexplanations"}
        />
      )}

      {renderPopup()}
    </Layout>
  );
}
