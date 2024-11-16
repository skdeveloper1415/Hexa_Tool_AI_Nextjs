"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateRealWorldConnectionAPI } from "../../actions/realWorldConnections";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import { toast } from "react-toastify";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const items = [{ label: AppTitle.plagiarismdetection, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const appId = AppId.plagiarismdetection;
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

  const [loading, setLoading] = useState(false);
  const [provideContent, setProvideContent] = useState("");
  const [error, setError] = useState({});

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);

  const [isExVisible, setIsExVisible] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);

  const handleClear = () => {
    setProvideContent("");
    setError({});
  };
  const validate = () => {
    let err = {};
    let isErr = false;

    if (provideContent === "") {
      err.provideContent = "Please Provide Content.";
      isErr = true;
    }

    setError(err);
    return isErr;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setIsExVisible(false);
    setLoading(true);
    try {
      const payload = {
        grade: "Grade 1",
        topic: "topicOrStandardValue",
      };
      const response = await generateRealWorldConnectionAPI(payload);

      if (response.data.code == "200") {

        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }

        let responseData = response.data.data.data ?? [];

        setLoading(false);
        setIsExVisible(true);
        setFormDataShow(true);
        setFormShow(false);
      setIsShowHide(true);

      } else {
        toast.error('Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        toast.error('Something went wrong');
        setLoading(false);
      }
    }
  };

  const copyRef = useRef(null);

  const responseToShow = (
    <div ref={copyRef}>
      <>
        <h5 className="font-bold">Response Title:</h5>
        <p className="text-[14px] font-normal text-[#344054]">
          Response Description
        </p>
      </>
    </div>
  );

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
              disabled={loading}
              onClick={() => {
                setIsExVisible(false);
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  handleClear();
                  setIsShowHide(false)
                } else {
                  handleClear();
                  setIsShowHide(false)
                }
              }}
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
                setProvideContent("Text Content");
                setError({});
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

            {isActionvisible && (
              <CommonActionExempler
                title={`Generated ${AppTitle.plagiarismdetection}`}
                response={responseToShow}
                visible={isActionvisible}
                contentRef={copyRef}
                setVisible={setIsActionvisible}
                appLink={"/plagiarism"}
              />
            )}
          </div>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
              <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                 <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF]  font-medium">
         {AppTitle.plagiarismdetection}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                  Identify the plagiarism in any content.
                </p>
                </div>
                {
                        isShowHide && !loading ?
                        <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                {loading ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Provide Content:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          value={provideContent}
                          onChange={(e) => setProvideContent(e.target.value)}
                          placeholder="Getting through challenging times,heartbreak,hope,enjoying life."
                          rows={4}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.provideContent ? (
                          <span style={{ color: "red" }}>
                            {error.provideContent}
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
                        onClick={handleSubmit}
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.plagiarismdetection}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={() => {
                    setIsActionvisible(true);
                    setVisible(true);
                  }}
                  setIsExVisible={setIsExVisible}
                  response={responseToShow}
                  contentRef={copyRef}
                  appLink={"/realworldconnections"}
                />
              </>
            )}
          </div>
      
        </div>

        {renderPopup()}
      </div>
    </Layout>
  );
}
