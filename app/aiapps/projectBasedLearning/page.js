"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import {
  GRADE,
  STANDARD,
  AppId,
  AppTitle,
  AppCategory,
} from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import Commonresponse from "../../common/commonResponse";
import { generateProjectBasedApi } from "../../actions/projectBasedApi";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";


export default function Index() {
  const [projectBasedData, setProjectBasedData] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [position, setPosition] = useState("center");
  const projectBasedRef = useRef(null);
  const items = [{ label: `${AppTitle.projectBasedLearning}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [contentType, setContentType] = useState();
  const [additionalDetail, setAdditionalDetail] = useState("");
  const [standard, setStandard] = useState(null);
  const [visible, setVisible] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [isShowHide, setIsShowHide] = useState(false);
  const appId = AppId.projectBasedLearning;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("123.456.789.123");
const [sectionData, setSectionData] = useState()

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

  const validate = () => {
    let err = {};
    let isErr = false;

    if (!selectedGrade || selectedGrade.name.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }

    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter Topic.";
      isErr = true;
    }

    if (!standard || standard.code.trim() === "") {
      err.standard = "Please Select Standard Set to Align to.";
      isErr = true;
    }
    if (!additionalDetail || additionalDetail.trim() === "") {
      err.additionalDetail = "Please Enter Additional Details.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const generateProjectBasedAI = async (data) => {
    try {
      setLoading(true);

      const response = await generateProjectBasedApi(data);

      if (response.data.code == 200) {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setFormDataShow(true);
        setFormShow(false);

        setProjectBasedData(response?.data?.data?.data);
        // const sections = response?.data?.data?.split("\n\n");

        const transformedResponse = stringResponseConvert(response?.data?.data);
        setTitle(transformedResponse.Title)


        const data = transformedResponse.Content.map((item, i) => {
          return item;
        });
        setSectionData(data)
        setLoading(false);
        setIsShowHide(true)
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        toast.error("Something went wrong");
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
      topic: contentType ? contentType : "",
      additional_details: additionalDetail ? additionalDetail : "",
      standards: standard?.code,
    };

    generateProjectBasedAI(payload);
  };


  const createResponse = (
    <div ref={projectBasedRef}>
      <p>{title}</p>

      {sectionData?.map((item, i) => {
        const [title, description] = item.split(': ');
        return (
          <div key={i}>
            <p><strong>{title}</strong>:<br /> {description}</p>
          </div>
        );
      })}

    </div>
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
    setAdditionalDetail("");
    setContentType("");
    setSelectedGrade(null);
    setStandard("");
    setError({});
    setFormShow(true);
    setVisible(false);
    setExempler(false);
    setFormDataShow(false);
  };

  const handleExample = () => {
    setSelectedGrade({ name: "Grade 9", code: "11" });
    setContentType(
      "Explore the impacts of urban development on the heat island effect that certain areas in Denver experience during our hottest days of the year"
    );
    setStandard({
      name: "Next Generation Science Standards (NGSS): These standards provide guidelines for teaching science and have been adopted by a number of states.",
      code: "NGSS",
    });
    setAdditionalDetail(
      "There are various open spaces in and around Denver where students can monitor air temperatures. There are also urban spaces where students can go to monitor air temperatures. "
    );
    setFormShow(true);
    setFormDataShow(false);
  };

  return (
    <Layout>
      <div className="  mx-auto 3xl:px-[16.771vw]  2xl:px-[150px] xl:px-[100px] px-[20px]">
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
                  setProjectBasedData(null);
                  handleClear();
                  setIsShowHide(false);
                } else {
                  handleClear();
                  setIsShowHide(false);

                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
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
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
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
            <></>

            {formShow && (
              <>
              <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                   {AppTitle.projectBasedLearning}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Develops learning plan based on the project rules and principles.
                </p>
                </div>
                {
                    isShowHide && !loading ?
                    <button className='flex w-[150px] xl:w-[150px] 3xl:w-[8.454vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                  <div className="flex justify-center items-center">
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
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Select"
                        filter
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
                        Topic or Title:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute left-[7px] top-[10px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>
                        <InputTextarea
                          autoResize
                          placeholder="Topic or Title"
                          value={contentType}
                          onChange={(e) => setContentType(e.target.value)}
                          rows={3}
                          className="w-full pl-7"
                        />
                        {error.contentType && (
                          <div className="text-red-500 text-sm">
                            {error.contentType}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Detail / Consideration to Include in the
                        Project:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute left-[7px] top-[10px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>
                        <InputTextarea
                          autoResize
                          placeholder="9th-grade students will develop the skills to compare and analyze government structures, power distribution"
                          value={additionalDetail}
                          onChange={(e) => setAdditionalDetail(e.target.value)}
                          rows={3}
                          className="w-full pl-7"
                        />
                        {error.additionalDetail && (
                          <div className="text-red-500 text-sm">
                            {error.additionalDetail}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Standard Set to Align to:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute left-[7px] top-[10px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>

                        <Dropdown
                          value={standard}
                          onChange={(e) => setStandard(e.value)}
                          options={STANDARD}
                          optionLabel="code"
                          placeholder="Select Standard Set to Align to"
                          filter
                          className="w-full md:w-14rem"
                        />
                        {error.standard && (
                          <div className="text-red-500 text-sm">
                            {error.standard}
                          </div>
                        )}
                      </div>
                    </div>
                  <Note/>
                    <div>
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          HandleGenerate(e);
                        }}
                        disabled={loading}
                      >
                        {loading ? "Please Wait ....." : "Generate with BrixAI"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {
              formDataShow && (
                <Commonresponse
                  title={`${AppTitle.projectBasedLearning}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  response={createResponse}
                  handleEdit={handleEdit}
                  contentRef={projectBasedRef}
                  appLink={"/projectBasedLearning"}
                />
              )
              // )
            }
            {renderPopup()}
          </div>
         
        </div>
      </div>

      {visible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.projectBasedLearning}`}
          response={createResponse}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={projectBasedRef}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={"/projectBasedLearning"}
        />
      )}
    </Layout>
  );
}
