"use client";
import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateTextProofreader } from "../../actions/TextProofreader";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";

export default function Index() {
  const copyRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [title, setTitle] = useState("");
  const [assignment, setAssignment] = useState("");
  const [isShowHide, setIsShowHide] = useState(false);
  const items = [{ label: `${AppTitle.textproofreader}`, url: "" }];
  const home = {
    label: "BrixAI Apps",
    template: () => (
      <Link href="/">
        <span className="text-primary font-semibold">BrixAI Apps</span>
      </Link>
    ),
  };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [contentType, setContentType] = useState();

  const [resultResponse, setResult] = useState({
    contentType: "",
  });

  const [visible, setVisible] = useState(false);

  const appId = AppId.textproofreader;
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

  const HandleGenerate = async (e) => {
    e.preventDefault();
    
    if (!contentType || contentType.trim() === "") {
      toast.error('Please Enter Original Text.');
      return;
    }
    setLoader(true);
    try {
      const body = {
        text: contentType ? contentType : "",
      };
      const response = await generateTextProofreader(body);
      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setAssignment(response.data.data.data);
        setResult({
          ...resultResponse,
          contentType,
        });
        setFormDataShow(true);
        setFormShow(false);
        setIsExVisible(true);
        setLoader(false);
        setIsShowHide(true)
      } else {
        toast.error('Something went wrong.');
        setLoader(false);
      }

    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        console.log('error:', error);
        setLoader(false);
        toast.error('Something went wrong.');
      }
    }
  };
  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);
  };

  const handleReset = () => {
    setContentType("");
    setResult({
      ...resultResponse,
      contentType: "",
    });
    setFormDataShow(false);
    setIsShowHide(false);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };
  const handleAction = () => {
    setVisible(true);
    setTitle(`Generated ${AppTitle.textproofreader}`);
    setIsActionvisible(true);
  };
  const handleEdit = () => {
    setFormDataShow(false);
  };

  const handleExample = () => {
    setContentType(`"The ancient city of Atlantis, according to legend, was a highly advanced civilization that existed thousands of years ago. It is said to have been a prosperous and technologically sophisticated society, known for its engineering marvels and wealth. However, Atlantis mysteriously disappeared, leaving behind only myths and speculation. Archaeologists and historians continue to debate its existence and the possible causes of its downfall.
    The pictures in words make "Of Mice and Men" more real, and we can feel what the characters feel. It's like we're right there with them, seeing everything they see. The author uses these pictures to help us understand the story better and to make us care about the characters."`);
    setFormDataShow(false);
    setFormShow(true);
  };

  const response = (
    Object.entries(assignment).length > 0 ? (
      <div
        ref={copyRef}
        className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
      >
        {Object.entries(assignment).map(([key, value]) => (
          <div key={key} className="mt-2">
            <span className="font-bold">{key.split('_').join(' ')} : </span>
            {key !== 'Title' ? <br /> : null}
            {Array.isArray(value) ? (
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <span>{value}</span>
            )}
          </div>
        ))}
      </div>) : ""
  );

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
              isGenerate={loader}
            />
            <button
              onClick={() => handleReset()}
              disabled={loader}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
            {!formDataShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                    <b> {AppTitle.textproofreader}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.textproofreader}
                    </p>
                  </div>

                  {
                   isShowHide == true ?(isShowHide && !loader &&
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>): <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
                  }
                </div>
                {loader ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Original Text<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-[7px] top-[14px]">
                          <i className="hexatoolmic"></i>
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="In 'Of Mice and Men,' John Steinbeck uses vivid imagery to depict the hardships of life during the Great Depression. These images enable readers to empathize with the characters and enhance the book's allure. One prominent instance is when George articulates his aspirations for a dream ranch with Lennie."
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value);
                          }}
                          rows={3}
                          cols={3}
                          className="w-full pl-7"
                        />
                      </div>
                    </div>
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
                title={`${AppTitle.textproofreader}`}
                onHide={() => setFormDataShow(false)}
                handleAction={handleAction}
                response={response}
                contentRef={copyRef}
                handleEdit={handleEdit}
                appLink={"/textproofreader"}
              />
            )}
            {renderPopup()}
          </div>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">


            {isPopupVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                title={`Example for ${AppTitle.textproofreader}`}
                response={response}
                appLink={"/textproofreader"}
                contentRef={copyRef}
              />
            )}
          </div>
        </div>

        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.textproofreader}`}
            response={response}
            visible={isActionvisible}
            position={position}
            setVisible={setIsActionvisible}
            contentRef={copyRef}
            appLink={"/textproofreader"}
          />
        )}
      </div>
    </Layout>
  );
}
