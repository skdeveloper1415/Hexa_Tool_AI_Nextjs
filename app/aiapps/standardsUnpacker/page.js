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
import { GRADE, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateStanderdUnpackerApi } from "../../actions/standerdUnpacker";
import { printKeyValuePairs } from "../../../components/helper/printKeyValuePairs";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const contentRef = useRef(null);
  const [isExVisible, setIsExVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [standerdUnpacker, setStanderdUnpacker] = useState("");
  const [error, setError] = useState({});
  const [isShowHide, setIsShowHide] = useState(false);

  const [standerdUnpackerData, setStanderdUnpackerData] = useState({
    grade: "",
    Unpack: "",
  });

  const items = [{ label: `${AppTitle.standardsUnpacker}`, url: "" }];

  const appId = AppId.standardsUnpacker;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("123.456.789.123");

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

  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const validate = () => {
    let err = {};
    let isErr = false;
    if (
      !standerdUnpackerData.grade ||
      standerdUnpackerData.grade.trim() === ""
    ) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (
      !standerdUnpackerData.Unpack ||
      standerdUnpackerData.Unpack.trim() === ""
    ) {
      err.Unpack = "Please Enter Standard to Unpack.";
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
      const body = {
        grade: standerdUnpackerData.grade ? standerdUnpackerData.grade : "",
        standard: standerdUnpackerData.Unpack
          ? standerdUnpackerData.Unpack
          : "",
      };
      const response = await generateStanderdUnpackerApi(body);
      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        
        if (!attemptValid) {
          setLoader(false);

          return;
        }

        let sections = response?.data?.data?.data.split("\n\n");

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
        setStanderdUnpacker(obj);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);

      } else {
        console.log(response?.error);
        toast.error("Something went wrong");
      }
      setLoader(false);
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        let msg = error?.error ?? error?.message ?? "Something went wrong";
        toast.error("Something went wrong");
      }
    }
  };

  const handleResetAndClear = () => {
    setStanderdUnpackerData({
      grade: "",
      Unpack: "",
    });
    setStanderdUnpacker("");
    setError({});
  };

  const handleExample = () => {
    setStanderdUnpackerData((prevData) => ({
      ...prevData,
      grade: "Grade 11",
      Unpack:
        "9-12 Benchmark 3-A: compare and analyze the structure, power and purpose of government at the local, state, tribal and national levels as set forth in their respective constitutions or governance documents:",
    }));
    setFormDataShow(false);
    setFormShow(true);
  };

  const responsetoshow = standerdUnpacker ? (
    <div ref={contentRef}>{printKeyValuePairs(standerdUnpacker) ?? ""}</div>
  ): "";
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
          <BackToAIModified isGenerate={loader} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center  ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  handleResetAndClear();
                  setIsShowHide(false);
                } else {
                  setIsShowHide(false);
                  handleResetAndClear();
                }
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleExample()}
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
            {AppTitle.standardsUnpacker}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Generates engaging science labs on topics.
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={
                          standerdUnpackerData.grade
                            ? GRADE.find(
                                (ele) => ele.name == standerdUnpackerData.grade
                              )
                            : null
                        }
                        onChange={(e) => {
                          setStanderdUnpackerData({
                            ...standerdUnpackerData,
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
                        Standard to Unpack:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Standard to unpack"
                          value={standerdUnpackerData.Unpack}
                          onChange={(e) => {
                            setStanderdUnpackerData({
                              ...standerdUnpackerData,
                              Unpack: e.target.value,
                            });

                            if (e.target.value) {
                              setError({ ...error, Unpack: "" });
                            }
                          }}
                          rows={3}
                          cols={3}
                          className="w-full relative pl-[35px]"
                        />
                        <Link href="#">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>
                      </div>
                      {error.Unpack ? (
                        <span style={{ color: "red" }}>{error.Unpack}</span>
                      ) : (
                        <></>
                      )}
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
                title={`${AppTitle.standardsUnpacker}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => {
                  setVisible(true), setIsExVisible(false);
                }}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={"/standardsUnpacker"}
              />
            )}
            {renderPopup()}
          </div>
        
        </div>

        <CommonActionExempler
          response={responsetoshow}
          setIsPopupVisible={setVisible}
          title={`Generated ${AppTitle.standardsUnpacker} `}
          contentRef={contentRef}
          onClose={() => setVisible(false)}
          setVisible={setVisible}
          position={"top"}
          visible={visible}
          isExVisible={isExVisible}
          appLink={"/standardsUnpacker"}
        />
      </div>
    </Layout>
  );
}
