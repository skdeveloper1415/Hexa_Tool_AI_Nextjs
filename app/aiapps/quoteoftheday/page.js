"use client";
import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import { toast } from "react-toastify";
import { generateDokQuestions } from "../../actions/dokQuestions";
import { ProgressSpinner } from "primereact/progressspinner";
import Commonresponse from "../../common/commonResponse";
import { ScrollPanel } from "primereact/scrollpanel";
import CommonActionExempler from "../../common/CommonActionExempler";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [multiStepData, setmultiStepData] = useState();
  const [contentType, setContentType] = useState();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [data, setData] = useState();
  const [isExVisible, setIsExVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [formDataShow, setFormDataShow] = useState(false);
  const contentRef = useRef(null);
  const items = [{ label: AppTitle.quoteoftheday, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" }; 
  const [formShow, setFormShow] = useState(true);
  const [isShowHide, setIsShowHide] = useState(false);
  
  const exemplarToShow = (
    <div ref={contentRef}>
      <ScrollPanel style={{ width: "100%" }}>
        {data &&
          data.length > 0 &&
          data.map((elm, i) => {
            return (
              <div key={i}>
                {" "}
                <div>
                  <p className="mb-2 font-bold">DOK Level-{i + 1}</p>
                  {elm?.value?.Questions ? (
                    <>
                    <h3 > <strong>Questions :</strong> </h3>
                      {elm?.value?.Questions?.map((item, j) => (
                        <ul
                          key={j}
                          className="3xl:text-[0.729vw] text-[14px] text-[#344054]"
                          style={{ listStyle: "inside" }}
                        >
                          <li>{item}</li>
                        </ul>
                      ))}
                    </>
                  ) : (
                    <>
                      {elm?.value?.map((item, j) => (
                        <ul
                          key={j}
                          className="3xl:text-[0.729vw] text-[14px] text-[#344054]"
                          style={{ listStyle: "inside" }}
                        >
                          <li>{item}</li>
                        </ul>
                      ))}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </ScrollPanel>
    </div>
  );

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const payload = {
      grade: multiStepData.code,
      text: contentType,
    };
    setIsLoading(true);
    try {
      const response = await generateDokQuestions(payload);
      if (response.data.code === 200) {
        const dataArray = [];
        Object.entries(response.data.data.data.Content).forEach(([key, value]) => {
          dataArray.push({ key, value });
        });
        setData(dataArray);
        setFormShow(false);
        setVisible1(true);
        setIsExVisible(true);
        setIsShowHide(true);

      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.error("Error occurred:", error);
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };
  const validate = () => {
    let err = {};
    let isErr = false;
    if (!multiStepData || multiStepData.name.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter Quotes About";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const handleExample = () => {
    setError({});
    setVisible1(false);
    setFormShow(true);
    setmultiStepData({ name: "Grade 7", code: "9" });
    setContentType("Forces and motion");
  };

  const handleClear = () => {
    setmultiStepData("");
    setContentType("");
    setVisible1(false);
    setFormShow(true);
    setError({});
  };

  const handleAction = () => {
    setFormDataShow(true);
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
          <BackToAIModified isGenerate={isLoading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              onClick={()=>{handleClear(), setIsShowHide(false)}}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                isLoading == true ? "opacity-50 cursor-not-allowed" : ""
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                isLoading == true ? "opacity-50 cursor-not-allowed" : ""
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
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                {AppTitle.quoteoftheday}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                  Generate {AppTitle.quoteoftheday} suggestions based on any topic.
                </p>
                </div>
                {
                        isShowHide && !isLoading ?
                        <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                        onClick={() => {
                          setVisible1(true);
                        setFormShow(false);
                     }}
                     >
                     <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
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
                        Grade Level:<span className="text-[red] ml-2">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={multiStepData}
                        onChange={(e) => {
                          setmultiStepData(e.target.value),
                            setError((prevError) => ({
                              ...prevError,
                              grade: "",
                            }));
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
                        Quotes about:<span className="text-[red] ml-2">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="getting through challenging times,heartbreak,hope,enjoying life"
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "",
                              }));
                          }}
                          rows={3}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
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
                )}
              </>
            )}
            {visible1 == true && (
              <Commonresponse
                title={`${AppTitle.quoteoftheday}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), setFormShow(true);
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={exemplarToShow}
                contentRef={contentRef}
                appLink={"/quoteoftheday"}
              />
            )}
          </div>
          
        </div>
      </div>
      {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.quoteoftheday}`}
          response={exemplarToShow}
          visible={isActionvisible}
          position={"center"}
          setVisible={setIsActionvisible}
          appLink={"/quoteoftheday"}
          contentRef={contentRef}
        />
      )}
    </Layout>
  );
}
