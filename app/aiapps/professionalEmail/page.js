"use client";
import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { generateProfessionalEmail } from "../../actions/professionalEmailApi/index";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const contentRef = useRef(null);

  const items = [{ label: `${AppTitle.professionalEmail}`, url: "" }];

  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const appId = AppId.professionalEmail;
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
  ); // Change 3 to your desired maximum attempts

  const [authorName, setAuthorName] = useState("");
  const [Content, setContent] = useState("");
  const [isShowHide, setIsShowHide] = useState(false);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resultResponse, setResult] = useState({
    subject: "",
    content: "",
  });
  const [loader, setLoader] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [visibleRubricTable, setVisibleRubricTable] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({});
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const response = (
    resultResponse? 
    (
      <div ref={contentRef}>
      {resultResponse?.subject && (
        <h3>
          <b>Subject: </b>
          {resultResponse?.subject}
        </h3>
      )}
      {resultResponse?.content && (
        <h3>
          {resultResponse.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </h3>
      )}
    </div>
    ):(
      ""
    )
   
  );

  const handleExample = () => {
    setAuthorName("John");
    setContent(
      "Please see my email regarding the changes to that basketball schedule for this season. We need to make sure that we have one administrator at each home game. I will start a google form where we can all sign up to be present at one or two games."
    );
    setTitle(`Example for Generated ${AppTitle.professionalEmail}`);
    setFormDataShow(false);
    setVisible(false);
  };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (authorName === "" || authorName.trim() === "") {
      err.authorName = "Please Enter Author Name. ";
      isErr = true;
    }
    if (Content === "" || Content.trim() === "") {
      err.Content = "Please Enter Content to include .";
      isErr = true;
    }
    setError(err);
    return isErr;
  };
  const handleGenerate = async () => {
    if (validate()) {
      return;
    }
    setLoader(true);
    try {
      let payload = {
        author: authorName,
        topic: Content,
      };
      let response = await generateProfessionalEmail(payload);
      if (response?.data.code == 200) {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setResult({
          ...resultResponse,
          subject: response?.data?.data?.subject,
          content: response?.data?.data?.content,
        });
        setFormDataShow(true);
        setVisibleRubricTable(true);
        setShowExemplarButton(true);
        setIsShowHide(true);
      } else {
        console.log(response?.error);
        toast.error("Something Went Wrong");
      }
      setLoader(false);
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        let msg = response?.error ?? response?.message ?? "Something went wrong";
        toast.error("Something Went Wrong");
      }
    }
  };

  const handleReset = () => {
    setAuthorName("");
    setContent("");
    setResult({
      subject: "",
      content: "",
    });
    setVisible(false);
    setFormDataShow(false);
    setIsShowHide(false);
    setShowExemplarButton(false);
  };

  const [title, setTitle] = useState("");
  const handleAction = () => {
    // setVisible(true)
    setTitle(`Generated ${AppTitle.professionalEmail}`);
    setIsActionvisible(true);
  };
  const handleEdit = () => {
    setFormDataShow(false);
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
          <BackToAIModified isGenerate={loader} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg 
            xl:px-[1.04vw] px-[14px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={handleReset}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] lg:px-[10px]  justify-center w-full ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => handleExample()}
              disabled={loader}
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
          </div>
          </div>
          {
            <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
              {!formDataShow && (
                <div>
                  <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                    <div>
                      <h3 className="3xl:text-[0.938vw] 2xl:text-[14px] text-[14px] text-[#1570EF] font-medium">
                    {AppTitle.professionalEmail}
                      </h3>
                      <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                        Generate a Professional Email Composer to colleagues
                        and other professionals.
                      </p>
                    </div>
                    {
                      isShowHide && !loader ?
                      <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                        onClick={() => {
                          setFormDataShow(true);
                        }}
                      >
                        <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                        Hide  Prompt
                      </button> : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Communication}</div>
                    }
                  </div>
                  {loader ? (
                    <div className="flex justify-center h-[300px] items-center">
                      <ProgressSpinner />{" "}
                    </div>
                  ) : (
                    <div>
                      <form className="grid xl:gap-[1.25vw] gap-[18px]">
                        <div>
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            Author Name:
                            <span className="text-[red] ml-1">*</span>
                          </label>
                          <InputText
                            value={authorName}
                            placeholder="Type..."
                            onChange={(e) => setAuthorName(e.target.value)}
                            className="w-full"
                          />
                          {error.authorName ? (
                            <span style={{ color: "red" }}>
                              {error.authorName}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>

                        <div>
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            Content to include :
                            <span className="text-[red] ml-1">*</span>
                          </label>
                          <InputTextarea
                            autoResize
                            placeholder="Type..."
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            className="w-full"
                          />
                          {error.Content ? (
                            <span style={{ color: "red" }}>
                              {error.Content}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </form>
                      <Note/>
                      <div className="mt-[20px]">
                        <button
                          className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                          onClick={() => {
                            handleGenerate();
                          }}
                        >
                          Generate with BrixAI
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {formDataShow && (
                <Commonresponse
                  title={`${AppTitle.professionalEmail}`}
                  onHide={() => {
                    setFormDataShow(false);
                  }}
                  handleAction={handleAction}
                  response={response}
                  contentRef={contentRef}
                  handleEdit={handleEdit}
                  appLink={"/professionalEmail"}
                />
              )}
            </div>
          }
        
        </div>
      </div>

      {visible && (
        <CommonActionExempler
          onClose={() => {
            setVisible(false)
          }}
          setIsPopupVisible={setVisible}
          position={"center"}
          visible={visible}
          isExVisible={isExVisible}
          title={`Example for Generated ${AppTitle.professionalEmail}`}
          contentRef={contentRef}
          response={response}
          appLink={"/professionalEmail"}
        />
      )}

      {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.professionalEmail}`}
          response={response}
          visible={isActionvisible}
          position={"top"}
          setVisible={setIsActionvisible}
          contentRef={contentRef}
          appLink={"/professionalEmail"}
        />
      )}

      {renderPopup()}
    </Layout>
  );
}
