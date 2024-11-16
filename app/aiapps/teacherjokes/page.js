"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateTextLeveler } from "../../actions/textleveler";
import { GRADE, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
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
  const [teacherJocks, setTeacherJocks] = useState("");
  const [error, setError] = useState({});
  const [teacherJocksData, setTeacherJocksData] = useState({
    grade: "",
    text: "",
  });
  const items = [{ label: `${AppTitle.teacherjokes}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const appId = AppId.teacherjokes;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("123.456.789.123");
  const [isShowHide, setIsShowHide] = useState(false);


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
    if (!teacherJocksData.grade) {
      err.grade = "Please Select Grade Level.";
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

    try {
      const body = {
        grade: teacherJocksData.grade ? teacherJocksData.grade : "",
        text: teacherJocksData.text ? teacherJocksData.text : "",
      };

      setFormDataShow(true);
      setFormShow(false);

      setLoader(false);
      setIsShowHide(true);

    } catch (error) {
      let msg = error?.error ?? error?.message ?? "Something went wrong";
      toast.error("Something went wrong");
    }
  };

  function printKeyValuePairs(obj, parentKey = "") {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        printKeyValuePairs(obj[key], parentKey ? `${parentKey}.${key}` : key);
      } else {
        console.log(`${parentKey ? `${parentKey}.${key}` : key}: ${obj[key]}`);
        return (
          <li>
            <h5 style={{ display: "inline" }}>{`${
              parentKey ? `${parentKey}.${key}` : key
            }`}</h5>{" "}
            : {obj[key]}
          </li>
        );
      }
    }
  }

  const handleResetAndClear = () => {
    setTeacherJocksData({
      grade: "",
      text: "",
    });
    setTeacherJocks("");
    setError({});
  };

  const handleExample = () => {
    setTeacherJocksData((prevData) => ({
      ...prevData,
      grade: "10",
      text: `Make it about grammar`,
    }));
    setFormDataShow(false);
    setFormShow(true);
  };

  const responsetoshow = (
    teacherJocks ? (
    <div ref={contentRef}>
      <h3>
        <b>Title: </b>
        {teacherJocks.Title ? teacherJocks.Title : ""}
      </h3>
      <h5>Instructions:</h5>
      <ol>
        <li>{teacherJocks.Instructions ? teacherJocks.Instructions : ""}</li>
      </ol>
      <h5>Learning Objectives:</h5>
      <ol>
        <li>
          {teacherJocks.Instructions
            ? printKeyValuePairs(teacherJocks?.["Learning Objectives"])
            : ""}
        </li>
      </ol>
      <h5>Content:</h5>
      <ol>
        <li>{teacherJocks.Content ? teacherJocks.Content : ""}</li>
      </ol>
    </div>) : ""
  );

  return (
    <Layout>
      <div className=" mx-auto 3xl:px-[16.771vw]  2xl:px-[150px] xl:px-[100px] px-[20px]">
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
              disabled={loader}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  handleResetAndClear();
                  setIsShowHide(false);
                } else {
                  handleResetAndClear();
                  setIsShowHide(false);
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
                   {AppTitle.teacherjokes}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                  Generate Teacher Humor Tool for your class to be the coolest
                  teacher out there!
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[190px] xl:w-[180px] 3xl:w-[8.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                          teacherJocksData.grade
                            ? GRADE.find(
                                (ele) => ele.code == teacherJocksData.grade
                              )
                            : null
                        }
                        onChange={(e) => {
                          setTeacherJocksData({
                            ...teacherJocksData,
                            grade: e.value.code,
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
                        Additional Customization (optional):
                      </label>
                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic "></i>
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="Make it about grammar"
                          value={teacherJocksData.text}
                          onChange={(e) => {
                            setTeacherJocksData({
                              ...teacherJocksData,
                              text: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, text: "" });
                            }
                          }}
                          rows={2}
                          className="w-full pl-[35px]"
                        />
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
                title={`${AppTitle.teacherjokes}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => {
                  setVisible(true), setIsExVisible(false);
                }}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={"/teacherjokes"}
              />
            )}
            {renderPopup()}
          </div>
          
        </div>

        <CommonActionExempler
          response={responsetoshow}
          setIsPopupVisible={setVisible}
          title={`Generated ${AppTitle.teacherjokes}`}
          contentRef={contentRef}
          onClose={() => setVisible(false)}
          setVisible={setVisible}
          position={"top"}
          visible={visible}
          isExVisible={isExVisible}
          appLink={"/teacherjokes"}
        />
      </div>
    </Layout>
  );
}
