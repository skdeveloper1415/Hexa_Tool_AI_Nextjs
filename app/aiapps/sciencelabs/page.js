"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import {
  AppCategory,
  AppId,
  AppTitle,
  GRADE,
  STANDARD,
} from "../../../components/helper/enum";
import { ProgressSpinner } from "primereact/progressspinner";
import { generateScienceLabApi } from "../../actions/scienceLabApi";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [scienceLabData, setScienceLabData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [description, setDescription] = useState("");
  const [context, setContext] = useState("");
  const [standard, setStandard] = useState(null);
  const scienceLabRef = useRef(null);
  const [position, setPosition] = useState("center");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [materials, setMaterials] = useState("");
  const [procedure, setProcedure] = useState("");
  const [reflection, setReflection] = useState("");
  const [assessment, setAssessment] = useState("");
  const items = [{ label: `${AppTitle.sciencelabs}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false); 

  const validate = () => {
    let err = {};
    let isErr = false;

    if (!selectedGrade) {
      err.selectedGrade = "Please Select a Grade Level.";
      isErr = true;
    }

    if (!description.trim()) {
      err.description = "Please Enter Science Lab Description.";
      isErr = true;
    }

    if (!context.trim()) {
      err.context = "Please Enter Additional Context.";
      isErr = true;
    }

    if (standard == null) {
      err.standard = "Please Select Standard Set to Align to.";
      isErr = true;
    }

    setErrors(err);
    return isErr;
  };

  const appId = AppId.sciencelabs;
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

  const generateScienceLabAI = async (data) => {
    try {
      setLoading(true);

      const response = await generateScienceLabApi(data);

      if (response.data.code == 200) {
        setScienceLabData(response.data.data.data);
        const labData = response.data.data.data;

        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }

        const sections = labData.split("\n\n");

        if (sections[0]) {
          setTitle(sections[0].replace("Title: ", ""));
        }

        if (sections[1]) {
          setObjective(sections[1].replace("Objective: ", ""));
        }

        if (sections[2]) {
          setMaterials(sections[2].replace("Materials:\n", ""));
        }

        if (sections[3]) {
          setProcedure(sections[3].replace("Procedure:\n", ""));
        }

        if (sections[4]) {
          setReflection(sections[4].replace("Reflection Questions:\n", ""));
        }

        if (sections[5]) {
          setAssessment(sections[5].replace("Assessment:\n", ""));
        }

        setLoading(false);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong.");
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something Went Wrong.");
        setLoading(false);
        setFormDataShow(false);
        setFormShow(true);
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
      science_lab_description: description ? description : "",
      additional_context: context ? context : "",
      standards: standard?.code,
    };

    generateScienceLabAI(payload);
  };

  const createResponse = (
    scienceLabData?.length>0 ? (

    <div ref={scienceLabRef}>
      <h2>
        <strong>Title</strong>
      </h2>
      <p>{title}</p>

      <h2>
        <strong>Objective</strong>
      </h2>
      <p>{objective}</p>

      <p>
        <strong>Materials</strong>:{materials}
      </p>

      <h2>
        <strong>Procedure :</strong>
      </h2>
      <ul>
        {procedure &&
          procedure
            .split("\n")
            .map((step, index) => <li key={index}>{step}</li>)}
      </ul>

      <h2>
        <strong>Reflection Questions :</strong>
      </h2>
      <ul>
        {reflection &&
          reflection
            .split("\n")
            .map((step, index) => <li key={index}>{step}</li>)}
      </ul>

      <p>
        <strong>Assessment</strong>:{assessment}
      </p>
    </div>) : ""
    
  );

  const handleEdit = () => {
    setFormDataShow(false);
    setFormShow(true);
  };
  const handleAction = () => {
    setVisible(true);
    setExempler(false);
  };

  const handleClear = () => {
    setSelectedGrade(null);
    setDescription("");
    setContext("");
    setStandard("");
    setErrors({});
    setFormShow(true);
    setVisible(false);
    setExempler(false);
    setFormDataShow(false);
    setScienceLabData(null);
    setIsShowHide(false);
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
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loading == true ? "opacity-50 cursor-not-allowed" : ""
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
              disabled={loading}
              onClick={() => {
                if (formDataShow) {
                  setFormShow(true);
                  setFormDataShow(false);
                }
                setSelectedGrade({ name: "Grade 9", code: "11" });
                setDescription(
                  "My chemistry students are beginning their unit exploring acids and bases. I need an introductory lab that helps them understand what makes acids and bases different."
                );
                setContext(
                  "My students are at the very beginning of their study of chemistry and acids and bases, so please provide as much background information as possible in the lesson."
                );
                setStandard({
                  name: "Next Generation Science Standards (NGSS): These standards provide guidelines for teaching science and have been adopted by a number of states.",
                  code: "NGSS",
                });
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
               {AppTitle.sciencelabs}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Generates engaging science labs on topics.
                </p>
                </div>
                {
                    isShowHide && !loading ?
                    <button className='flex w-[200px] xl:w-[190px] 3xl:w-[9.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] py-[11px] justify-center items-center '
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.CommunityTools}</div>
                  }
                  </div>
           
           
             { loading ? (  <div style={{ display: "flex", justifyContent: "center" }}>
              <ProgressSpinner style={{ margin: "auto" }} />
            </div>) :
                (<form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                  <div className="mb-[18px]">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Grade Level:<span className="text-[red] ml-2">*</span>
                    </label>
                    <Dropdown
                      filter
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.value)}
                      options={GRADE}
                      optionLabel="name"
                      placeholder="Select"
                      className="w-full md:w-14rem"
                    />
                    {errors.selectedGrade && (
                      <div className="text-red-500 text-sm">
                        {errors.selectedGrade}
                      </div>
                    )}
                  </div>

                  <div className="mb-[18px]">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Science Lab Description:
                      <span className="text-[red] ml-2">*</span>
                    </label>
                    <div className="relative">
                      <InputTextarea
                        placeholder="Description of the science lab you'd like to generate - the more specific the better!"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        cols={5}
                        className="w-full relative pl-[35px]"
                      />
                      {errors.description && (
                        <div className="text-red-500 text-sm">
                          {errors.description}
                        </div>
                      )}

                      <div className="absolute top-[12px] left-[15px]">
                        <i className="hexatoolmic"></i>
                      </div>
                    </div>
                  </div>

                  <div className="mb-[18px]">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Additional Context:
                      <span className="text-[red] ml-2">*</span>
                    </label>
                    <div className="relative">
                      <InputTextarea
                        placeholder="Students are studying energy.They understand the different forms of energy and should understand heat energy transfer as a result of this lab. Students will work in group of 2-3."
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        rows={3}
                        cols={5}
                        className="w-full relative pl-[35px]"
                      />

                      {errors.context && (
                        <div className="text-red-500 text-sm">
                          {errors.context}
                        </div>
                      )}

                      <div className="absolute top-[12px] left-[15px]">
                        <i className="hexatoolmic"></i>
                      </div>
                    </div>
                  </div>

                  <div className="mb-[30px]">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Standards Set to Align to:
                      <span className="text-[red] ml-2">*</span>
                    </label>
                    <div className="relative">
                      <Dropdown
                        value={standard}
                        onChange={(e) => setStandard(e.value)}
                        options={STANDARD}
                        optionLabel="code"
                        placeholder="Select Standard Set to Align to"
                        filter
                        className="w-full md:w-14rem  pl-[35px]"
                      />
                      {errors.standard && (
                        <div className="text-red-500 text-sm">
                          {errors.standard}
                        </div>
                      )}

                      <div className="absolute top-[12px] left-[15px]">
                        <i className="hexatoolmic"></i>
                      </div>
                    </div>
                  </div>
                    <Note/>
                  <div className="mt-5">
                    <button
                      className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      onClick={(e) => {
                        HandleGenerate(e);
                      }}
                    >
                      Generate with BrixAI
                    </button>
                  </div>
                  </div>
                </form> )}
             </>
            )}


             { formDataShow && (
                <Commonresponse
                  title={`${AppTitle.sciencelabs}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  response={createResponse}
                  contentRef={scienceLabRef}
                  appLink={"/sciencelabs"}
                />
              )}
          </div>
          
        </div>
      </div>

      {visible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.sciencelabs}`}
          response={createResponse}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={scienceLabRef}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={"/sciencelabs"}
        />
      )}

      {renderPopup()}
    </Layout>
  );
}
