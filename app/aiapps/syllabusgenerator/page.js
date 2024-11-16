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
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateSyllabusGeneratorApi } from "../../actions/syllabusGenerator";
import { toast } from "react-toastify";
import { printKeyValuePairs } from "../../../components/helper/printKeyValuePairs";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const contentRef = useRef(null);
  const [isExVisible, setIsExVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [syllabusGenerator, setSyllabusGenerator] = useState("");
  const [error, setError] = useState({});
  const [isShowHide, setIsShowHide] = useState(false); 
  const [syllabusGeneratorData, setSyllabusGeneratorData] = useState({
    grade: "",
    subject: "",
    courseDescription: "",
    courseObjectives: "",
    requiredMaterials: "",
    gradingPolicy: "",
    classPolicies: "",
    courseOutline: "",
    additionalCustomization: "",
  });
  const items = [{ label: `${AppTitle.syllabusgenerator}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!syllabusGeneratorData.grade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (
      !syllabusGeneratorData.subject ||
      syllabusGeneratorData.subject.trim() === ""
    ) {
      err.subject = "Please Enter subject.";
      isErr = true;
    }
    if (
      !syllabusGeneratorData.courseDescription ||
      syllabusGeneratorData.courseDescription.trim() === ""
    ) {
      err.courseDescription = "Please Enter Course Description:.";
      isErr = true;
    }
    if (
      !syllabusGeneratorData.courseObjectives ||
      syllabusGeneratorData.courseObjectives.trim() === ""
    ) {
      err.courseObjectives = "Please Enter Course Objectives.";
      isErr = true;
    }
    if (
      !syllabusGeneratorData.requiredMaterials ||
      syllabusGeneratorData.requiredMaterials.trim() === ""
    ) {
      err.requiredMaterials = "Please Enter Required Materials.";
      isErr = true;
    }
    if (
      !syllabusGeneratorData.gradingPolicy ||
      syllabusGeneratorData.gradingPolicy.trim() === ""
    ) {
      err.gradingPolicy = "Please Enter Grading Policy.";
      isErr = true;
    }
    if (
      !syllabusGeneratorData.classPolicies ||
      syllabusGeneratorData.classPolicies.trim() === ""
    ) {
      err.classPolicies = "Please Enter Class Policies / Expectations.";
      isErr = true;
    }
    if (
      !syllabusGeneratorData.courseOutline ||
      syllabusGeneratorData.courseOutline.trim() === ""
    ) {
      err.courseOutline = "Please Enter Course Outline / What is Covered.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const appId = AppId.syllabusgenerator;
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

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setLoader(true);
    try {
      const body = {
        grade: syllabusGeneratorData.grade ? syllabusGeneratorData.grade : "",
        subject: syllabusGeneratorData.subject
          ? syllabusGeneratorData.subject
          : "",
        course_description: syllabusGeneratorData.courseDescription
          ? syllabusGeneratorData.courseDescription
          : "",
        course_objectives: syllabusGeneratorData.courseObjectives
          ? syllabusGeneratorData.courseObjectives
          : "",
        required_materials: syllabusGeneratorData.requiredMaterials
          ? syllabusGeneratorData.requiredMaterials
          : "",
        grading_policy: syllabusGeneratorData.gradingPolicy
          ? syllabusGeneratorData.gradingPolicy
          : "",
        course_outline: syllabusGeneratorData.courseOutline
          ? syllabusGeneratorData.courseOutline
          : "",
        class_policy: syllabusGeneratorData.classPolicies
          ? syllabusGeneratorData.classPolicies
          : "",
        additional_customization: syllabusGeneratorData.additionalCustomization
          ? syllabusGeneratorData.additionalCustomization
          : "",
      };

      const response = await generateSyllabusGeneratorApi(body);
      if (response.data.code == "200") {
        let sections = response?.data?.data?.data.split("\n\n");
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        let obj = {};

        sections.forEach((section) => {
          let lines = section.split("\n");
          let key = lines[0].replace(":", "");
          let values = lines.slice(1);
          let childObj = {};

          if (values.some((value) => value.includes(":"))) {
            let currentKey = null;
            let currentValue = null;

            values.forEach((value) => {
              if (value.includes(":")) {
                if (currentKey && currentValue) {
                  childObj[currentKey] = currentValue.join("\n");
                }
                let parts = value.split(":");
                currentKey = parts[0].trim();
                currentValue = [parts[1].trim()];
              } else {
                currentValue.push(value.trim());
              }
            });

            if (currentKey && currentValue) {
              childObj[currentKey] = currentValue.join("\n");
            }
          } else {
            childObj = values.join("\n");
          }

          obj[key] = childObj;
        });
        setSyllabusGenerator(obj);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        console.log(response?.error);
        toast.error("Something Went Wrong.");
      }
      setLoader(false);
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        toast.error("Something Went Wrong.");
      }
    }
  };

  const handleResetAndClear = () => {
    setSyllabusGeneratorData({
      grade: "",
      subject: "",
      courseDescription: "",
      courseObjectives: "",
      requiredMaterials: "",
      gradingPolicy: "",
      classPolicies: "",
      courseOutline: "",
      additionalCustomization: "",
    });
    setSyllabusGenerator("");
    setError({});
    setIsShowHide(false);
  };

  const responsetoshow = ( syllabusGenerator && Object.keys(syllabusGenerator).length > 0 ? (
    <div ref={contentRef}>{printKeyValuePairs(syllabusGenerator) ?? ""}</div>):""
  );

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
          <BackToAIModified isGenerate={loader} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loader}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  handleResetAndClear();
                } else {
                  handleResetAndClear();
                }
              }}
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
              onClick={() => {
                if (formDataShow) {
                  setFormShow(true);
                  setFormDataShow(false);
                }

                setSyllabusGeneratorData({
                  grade: "Grade 10",
                  subject: "Science",
                  courseDescription:
                    "Middle school physical science learning will equip students to address the four essential questions as identified within the Next Generation Science Standards. 1. How do atomic and molecular interactions explain the properties of matter that we see and feel? 2. How can one describe physical interactions between objects and within systems of objects? 3. How can energy be transferred from one object or system to another?4. What are the characteristic properties of waves and how can they be used?",
                  courseObjectives:
                    "MS-PS1	Matter	and	its	interaction Students who demonstrate understanding can: MS-PS1-1.Develop models to describe the atomic composition of simple molecules andextended structures. [Clarification Statement: Emphasis is on developing models ofmolecules that vary in complexity. Examples of simple molecules could includeammonia and methanol. Examples of extended structures could include sodiumchloride or diamonds. Examples of molecular-level models could include drawings,3D ball and stick structures, or computer representations showing differentmolecules with different types of atoms.] [Assessment Boundary: Assessment doesnot include valence electrons and bonding energy, discussing the ionic nature ofsubunits of complex structures, or a complete description of all individual atoms ina complex molecule or extended structure is not required.]",
                  requiredMaterials:
                    "Lab Notebook:A dedicated notebook for recording observations, procedures, and data.",
                  gradingPolicy:
                    "Grading Components:Tests and Quizzes (40%):Regular unit tests and quizzes assess students' understanding of the material covered in class.",
                  classPolicies:
                    "Respect:Respect yourself, others, and classroom materials.Participation:Actively engage in discussions and activities.",
                  courseOutline:
                    "The middle school Performance Expectations (PEs) in the physical sciences address theseessential questions and build on PK-5 ideas and experiences. They blend DisciplinaryCore Ideas (DCI) with Scientific and Engineering Practices (SEP) and Crosscutting",
                  additionalCustomization: "Any Additional Info",
                });
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
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
               <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div className="xl:col-span-2">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                   {AppTitle.syllabusgenerator}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Allows to generate syllabus for desired grade for that year.
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[220px] xl:w-[210px] 3xl:w-[10.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                {loader ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ProgressSpinner style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={
                          syllabusGeneratorData.grade
                            ? GRADE.find(
                                (ele) => ele.name == syllabusGeneratorData.grade
                              )
                            : null
                        }
                        onChange={(e) => {
                          setSyllabusGeneratorData({
                            ...syllabusGeneratorData,
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
                      />
                      {error.grade ? (
                        <span style={{ color: "red" }}>{error.grade}</span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Subject:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Elementary, school, Science, French, Physics, Art, etc."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.subject}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              subject: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, subject: "" });
                            }
                          }}
                        />

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                      {error.subject ? (
                        <span style={{ color: "red" }}>{error.subject}</span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Course Description:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="briefly description your course"
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.courseDescription}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              courseDescription: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, courseDescription: "" });
                            }
                          }}
                        />

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                      {error.courseDescription ? (
                        <span style={{ color: "red" }}>
                          {error.courseDescription}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Course Objectives:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Insert the standards or objectives covered for the audiebce of parents / student."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.courseObjectives}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              courseObjectives: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, courseObjectives: "" });
                            }
                          }}
                        />

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                      {error.courseObjectives ? (
                        <span style={{ color: "red" }}>
                          {error.courseObjectives}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Required Materials:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Input supplies etc that are needed for in year class."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.requiredMaterials}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              requiredMaterials: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, requiredMaterials: "" });
                            }
                          }}
                        />

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                      {error.requiredMaterials ? (
                        <span style={{ color: "red" }}>
                          {error.requiredMaterials}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grading Policy:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Basic grading policy."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.gradingPolicy}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              gradingPolicy: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, gradingPolicy: "" });
                            }
                          }}
                        />

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                      {error.gradingPolicy ? (
                        <span style={{ color: "red" }}>
                          {error.gradingPolicy}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Class Policies / Expectations:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Expectation and policies for students in your class."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.classPolicies}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              classPolicies: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, classPolicies: "" });
                            }
                          }}
                        />

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                      {error.classPolicies ? (
                        <span style={{ color: "red" }}>
                          {error.classPolicies}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Class Policies / Expectations
Course Outline / What is Covered:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="What will be covered in the course throughout the year."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.courseOutline}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              courseOutline: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, courseOutline: "" });
                            }
                          }}
                        />

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                      {error.courseOutline ? (
                        <span style={{ color: "red" }}>
                          {error.courseOutline}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Customization (optional):
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Any additionL information you want to include in the syllabus."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                          value={syllabusGeneratorData.additionalCustomization}
                          onChange={(e) => {
                            setSyllabusGeneratorData({
                              ...syllabusGeneratorData,
                              additionalCustomization: e.target.value,
                            });
                            if (e.target.value) {
                              setError({
                                ...error,
                                additionalCustomization: "",
                              });
                            }
                          }}
                        />

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
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.syllabusgenerator}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => {
                  setVisible(true), setIsExVisible(false);
                }}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={"syllabusgenerator"}
              />
            )}
          </div>
        
        </div>
        <CommonActionExempler
          response={responsetoshow}
          setIsPopupVisible={setVisible}
          title={`Generated ${AppTitle.syllabusgenerator}`}
          contentRef={contentRef}
          onClose={() => setVisible(false)}
          setVisible={setVisible}
          position={"top"}
          visible={visible}
          isExVisible={isExVisible}
          appLink={"syllabusgenerator"}
        />
        {renderPopup()}
      </div>
    </Layout>
  );
}
