"use client";
import React, { useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from "../../common/commonResponse";
import { GRADE, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import BackToAI from "../../../components/BackToAI";
import { toast } from "react-toastify";
import { generateChoiceBoard } from "../../actions/choiceBoardApi";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [gradeLevel, setGradeLevel] = useState(null);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [contentType, setContentType] = useState();
  const [topic, setTopic] = useState("");
  const [isShowHide, setIsShowHide] = useState(false);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const contentRef = useRef(null);
  const items = [{ label: `${AppTitle.autograding}`, url: "" }];
  const [content, setContent] = useState([]);
  const [maxPoints, setMaxPoints] = useState();
  const home = {
    label: "BrixAI Apps",
    template: () => (
      <Link href="/">
        <span className="text-primary font-semibold">BrixAI Apps</span>
      </Link>
    ),
  };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!gradeLevel || gradeLevel.name === "") {
      err.gradeLevel = "Please Select Grade Level.";
      isErr = true;
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter Assessment Questions.";
      isErr = true;
    }
    // if (!topic || topic.trim() === "") {
    //   err.topic = "Please Enter Focus of Feedback / Rubric Categories";
    //   isErr = true;
    // }
    if (!maxPoints) {
      err.maxPoints = "Please Enter Maximum Points.";
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

    setLoader(true);
    try {
      let payload = {
        grade: gradeLevel.code,
        learning_details: contentType,
        choiceboardData: topic,
        additional_details: topic,
      };
      const response = await generateChoiceBoard(payload);
      if (response.data.code === 200) {
        const responseData = response.data.data.data;
        setContent(responseData);
        setFormDataShow(true);
        setFormShow(false);
        setLoader(false);
        setIsShowHide(true)
      } else {
        console.log(response?.error);
        toast.error('Something went wrong.')
      }
      setLoader(false);
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        console.log('error:', error);
        setLoader(false);
        toast.error('Something went wrong.')
      }
    }
  };

  const handleClear = () => {
    setGradeLevel(null);
    setFormDataShow(false);
    setFormShow(true);
    setContentType(null);
    setTopic(null);
    setContentType("");
    setTopic("");
    setError({});
    setIsShowHide(false);
    setMaxPoints("");
  };

  const handleExample = () => {
    setGradeLevel({ name: "Grade 7", code: "9" });
    setContentType("Domino Addition");
    setTopic("Rubric of Assignment");
    setMaxPoints("100")
    setError({});
    setIsActionvisible(false);
    setFormShow(true);
    setFormDataShow(false);
  };
console.log('content', content)
  const responsetoshow = content?.length > 0 ? (
    <div ref={contentRef}>
      <h2 className="text-[#101828] 3xl:text-[0.938vw] 2xl:text-[18px] xl:text-[16px] font-semibold border-b border-[#C8CBD0] xl:pb-[1.04vw] pb-[20px] xl:mb-[1.04vw] mb-[20px]">
       {content[0]}
      </h2>
      <div>

        <div class="mt-[20px] custTable">
          <table class="w-full">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Assignment Description</th>
              </tr>
            </thead>
            <tbody>
              {content?.map((row, index) => {
                if (index > 3&&index < 9) {
                  // Skip the first two rows as they are not part of the table
                  const [empty, title, description] = row
                    .split("|")
                    .map((cell) => cell.trim());
                  return (
                    <tr key={index}>
                      <td>{title}</td>
                      <td>{description}</td>
                    </tr>
                  );
                } else {
                  return null; // Skip the first two rows
                }
              })}
            </tbody>
          </table>
        </div>
        <div class="mt-[20px] custTable">
          <table class="w-full">
            <thead>
              <tr>
                <th>Rubric</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {content?.map((row, index) => {
                if (index > 11) {
                  // Skip the first two rows as they are not part of the table
                  const [ title, description] = row
                    .split(":")
                    .map((cell) => cell.trim());
                  return (
                    <tr key={index}>
                      <td>{title}</td>
                      <td>{description}</td>
                    </tr>
                  );
                } else {
                  return null; // Skip the first two rows
                }
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  ) : ""

  //Only Number input 
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMaxPoints(value),
      setError((prevError) => ({
        ...prevError,
        maxPoints: "",
      }));
    }
  };
  return (
    <Layout>
      <div className=" mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
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
                handleClear();
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
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.autograding}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.autograding}
                    </p>
                  </div>
                  {
                   isShowHide == true ? (isShowHide && !loader && 
                    <button className='flex w-[180px] xl:w-[180px] 3xl:w-[8.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>):<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Assignment}</div>
                  }
                </div>
                {loader ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ProgressSpinner style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={gradeLevel}
                        onChange={(e) => {
                          setGradeLevel(e.value),
                            setError((prevError) => ({
                              ...prevError,
                              gradeLevel: "", // Clear error message when a selection is made
                            }));
                        }}
                        options={GRADE}
                        optionLabel="name"
                        placeholder="5th grade"
                        className="w-full md:w-14rem"
                      />
                      {error.gradeLevel ? (
                        <span style={{ color: "red" }}>{error.gradeLevel}</span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Questions:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic "></i>
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="Domino Addition"
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "", // Clear error message when a selection is made
                              }));
                          }}
                          rows={2}
                          className="w-full pl-[35px] pr-[40px]"
                        />
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
                        ) : (
                          <></>
                        )}
                        {/* <div className="absolute right-[10px] top-[14px] cursor-pointer">
                          <Image
                            src={"/images/download.svg"}
                            width={18}
                            height={18}
                            alt="Download"
                          />
                        </div> */}
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Focus Feedback (optional):
                      </label>
                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                        <div className="absolute left-[10px] bottom-[16px] cursor-pointer -rotate-45">
                          {/* <Image
                            src={"/images/attach1.svg"}
                            width={18}
                            height={18}
                            alt="Download"
                          /> */}
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="Rubric of Assignment"
                          value={topic}
                          onChange={(e) => {
                            setTopic(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                topic: "", // Clear error message when a selection is made
                              }));
                          }}
                          rows={4}
                          className="w-full pl-[35px] pr-[40px]"
                        />
                        {error.topic ? (
                          <span style={{ color: "red" }}>{error.topic}</span>
                        ) : (
                          <></>
                        )}
                        {/* <div className="absolute right-[10px] top-[14px] cursor-pointer">
                          <Image
                            src={"/images/download.svg"}
                            width={18}
                            height={18}
                            alt="Download"
                          />
                        </div> */}
                      </div>
                    </div>
                    
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Total Points:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                       
                        <InputTextarea
                          autoResize
                          placeholder="Points"
                          value={maxPoints}
                          onChange={handleInputChange}
                          rows={1}
                          className="w-full pl-[35px] pr-[40px]"
                        />
                        {error.maxPoints ? (
                          <span style={{ color: "red" }}>
                            {error.maxPoints}
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
                title={`${AppTitle.autograding}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => {
                  setVisible(true), setIsActionvisible(true);
                }}
                response={responsetoshow}
                contentRef={contentRef}
              />
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader ? "opacity-50 cursor-not-allowed" : ""
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
      </div>
      {isActionvisible && (
        <CommonActionExempler
          title={`Generated  ${AppTitle.autograding}`}
          response={responsetoshow}
          visible={isActionvisible}
          position={"center"}
          contentRef={contentRef}
          setVisible={setIsActionvisible}
          appLink={"/autograding"}
        />
      )}
      {/* {renderPopup()} */}
    </Layout>
  );
}
