"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import { GRADE, QUESTIONS, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import { generateRubricAPI } from "../../actions/rubricGenerateApi";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import Commonresponse from "../../common/commonResponse";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import RubricTable from "./RubricTable";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [standardValue, setStandardValue] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDesc, setAssignmentDesc] = useState("");
  const [selectedPointScale, setSelectedPointScale] = useState(null);
  const [addCustomizationValue, setAddCustomizationValue] = useState("");
  const [isExVisible, setIsExVisible] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visibleRubricTable, setVisibleRubricTable] = useState(false);
  const [columns, setColumns] = useState([]);
  const [generatedRubricData, setGeneratedRubricData] = useState([]);
  const appId = AppId.rubricGenerator;
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
  const items = [{ label: `${AppTitle.rubricGenerator}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const resetAndClear = () => {
    setGradeLevel(null);
    setStandardValue("");
    setAssignmentTitle("");
    setAssignmentDesc("");
    setSelectedPointScale(null);
    setAddCustomizationValue("");
    setIsShowHide(false);
  };

  const handleExample = () => {
    setGradeLevel( { name: 'Grade 5', code: '7' },);
    setAssignmentTitle("Understanding Ecosystems");
    setAssignmentDesc(
      "Students will research and create a presentation on a specific ecosystem, detailing its components, interactions, and environmental significance"
    );
    setStandardValue("Develop a model to describe the movement of matter among plants, animals, decomposers, and the environment.");
    setSelectedPointScale({ name: "5", code: "5" });
    setAddCustomizationValue("Include criteria such as content accuracy, clarity of presentation, use of visuals, and overall organization.");

    setFormDataShow(false);
    setFormShow(true);
    setIsExVisible(false);
  };

  const validate = () => {
    if (gradeLevel === null || gradeLevel.name.trim() === "") {
      toast.error('Please Select Grade Level.')
      return;
    }
    if (assignmentTitle === "" || assignmentTitle.trim() === "") {
      toast.error('Please Enter  Assignment Title.')
      return;
    }
    if (assignmentDesc === "" || assignmentDesc.trim() === "") {
      toast.error('Please Enter  Assignment Description.')
      return;
    }
    
    if (selectedPointScale === null || selectedPointScale.name.trim() === "") {
      toast.error('Please Select Point Scale.')
      return;
    }
  };
  const handleGenerateRubric = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }

    if (standardValue === "" ) {
      toast.error('Please Enter Standard/Objective.')
      return;
    }

    setLoading(true);
    setShowExemplarButton(false);
    try {
      const payload = {
        grade: gradeLevel?.code,
        title: assignmentTitle,
        description: assignmentDesc,
        scale: selectedPointScale?.name,
        objective: standardValue
      };
      const response = await generateRubricAPI(payload);

      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }

        let responseData = response.data.data.data ?? [];
     
        setGeneratedRubricData(responseData);


        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
        setShowExemplarButton(true);
        setLoading(false);
      } else {
        const message =
          response?.message ?? response?.error ?? "Something went wrong";
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        const message = error?.message ?? "Something went wrong";
        setLoading(false);
      }
    }
  };

  const contentRef = useRef(null);
  const responseForPopup = generatedRubricData ? (
    <div ref={contentRef}>
      <div class="mt-[20px] custTable">
       <RubricTable rubricData={generatedRubricData.result}></RubricTable>
      </div>
    </div>
  ) : ""

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
              isGenerate={loading}
            />
            <button
              disabled={loading}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  setShowExemplarButton(false);
                  resetAndClear();
                } else {
                  resetAndClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}>
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/resetclear.svg"
                alt="Reset and clear"
              />
              Reset and Clear
            </button>
            <button onClick={(() => handleExample())} disabled={loading} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading == true ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
            {formShow && (<>
              <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">
                  <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium mb-2">
                    <b>{AppTitle.rubricGenerator}</b>
                  </h3>
                  <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    {AppDesc.rubricGenerator}
                  </p>
                </div>

                {
                  isShowHide == true ? (isShowHide && !loading &&
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center w-[200px] xl:w-[220px] 3xl:w-[10.854vw]'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                }
              </div>

              {loading ?
                <div className="flex justify-center items-center">
                  <ProgressSpinner />
                </div>
                :
                <form >
                  <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                    <div className="grid col-span-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.value)}
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                    </div>
                    <div className="grid col-span-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Point Scale:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={selectedPointScale}
                        onChange={(e) => setSelectedPointScale(e.value)}
                        options={QUESTIONS}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Assignment Title:
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <InputText
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      placeholder="Type..."
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                    <div className="grid col-span-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Assignment Description:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={assignmentDesc}
                        onChange={(e) => setAssignmentDesc(e.target.value)}
                        rows={3}
                        className="w-full"
                      />
                    </div>
                    <div className="grid col-span-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Standard/Objective:<span className="text-[red]">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={standardValue}
                        onChange={(e) => setStandardValue(e.target.value)}
                        rows={3}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Additional Customization for Rubric (optional):
                    </label>
                    <InputTextarea
                      autoResize
                      placeholder="Type..."
                      value={addCustomizationValue}
                      onChange={(e) =>
                        setAddCustomizationValue(e.target.value)
                      }
                      rows={3}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      onClick={(e) => {
                        setIsExVisible(false);
                        handleGenerateRubric(e);
                      }}
                    >
                      {loading ? "Please Wait..." : "Generate with BrixAI"}
                    </button>
                  </div>
                </form>
              } </>
            )}

            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.rubricGenerator}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={() => {
                    setVisibleRubricTable(true);
                  }}
                  setIsExVisible={setIsExVisible}
                  response={responseForPopup}
                  contentRef={contentRef}
                  appLink={"/rubricGenerator"}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {
        isExVisible && (
          <CommonActionExempler
            onClose={() => {
              setIsExVisible(false);
            }}
            setIsPopupVisible={setIsExVisible}
            position={"center"}
            visible={isExVisible}
            isExVisible={isExVisible}
            contentRef={contentRef}
            title={`${AppTitle.rubricGenerator}`}
            response={responseForPopup}
            appLink={"/rubricGenerator"}
          />
        )
      }
      {
        visibleRubricTable && (
          <CommonActionExempler
            title={`Generated ${AppTitle.rubricGenerator}`}
            response={responseForPopup}
            visible={visibleRubricTable}
            contentRef={contentRef}
            setVisible={setVisibleRubricTable}
            appLink={"/rubricGenerator"}
          />
        )
      }
      {renderPopup()}
    </Layout >
  );
}
