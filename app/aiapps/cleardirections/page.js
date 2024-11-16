"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE,AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateClearDirection } from "../../actions/clearDirectionApi";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {

  //no of attepts code
  const appId = AppId.cleardirections;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  //no of attepts code

  const [cleardirectionData, setClearDirectionData] = useState({
    grade: "",
    direction: "",
  });

  const items = [{ label: `${AppTitle.cleardirections}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [content, setContent] = useState([]);
  const [isShowHide, setIsShowHide] = useState(false); 

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!cleardirectionData.grade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!cleardirectionData.direction || cleardirectionData.direction.trim() === "") {
      err.direction =
        "Please Enter Original Directions.";
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
    const body = {
      grade: cleardirectionData.grade ? cleardirectionData.grade : "",
      original_directions: cleardirectionData.direction ? cleardirectionData.direction : "",
    };
    setLoader(true);
    try {
      const response = await generateClearDirection(body);
      if (response.data.code === 200) {

         // Halt form submission if attempts exceeded
         const attemptValid = handleClickAttempt();
         if (!attemptValid) {
          setLoader(false)
           return;
         }

        const responseData = response?.data?.data;
        const transformedResponse = stringResponseConvert(responseData);
        setContent(transformedResponse);
        setFormDataShow(true);
        setIsExVisible(true);
        setIsShowHide(true);
        setFormShow(false);
        setLoader(false);
      } else {
        console.log("Error: ", response);
        toast.error("Something went wrong");
        setLoader(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.log("Error: ", error);
        toast.error("Something went wrong");
      }
    }
  };

  const handleClear = () => {
    setClearDirectionData({
      grade: "",
      direction: "",
    });
    setError({});
    setFormDataShow(false);
    setFormShow(true);
    setIsShowHide(false);
    setIsExVisible(false);
  };

  const copyRef = useRef(null);

  const responsetoshow = content?.Content ? (
    <div ref={copyRef}>
      <h2 className="text-[#101828] 3xl:text-[0.938vw] 2xl:text-[18px] xl:text-[16px] font-semibold  xl:pb-[1.04vw] pb-[20px] xl:mb-[1.04vw] mb-[20px]">
        {content.Title}
      </h2>
      {
        content?.Content?.map((elm, index) => (
          <div key={index}>
            <div>{elm}</div>
            <br />
          </div>
        ))
      }
    </div>
  ) : ""

  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

  const handleAction = () => {
    setIsActionvisible(true);
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
              onClick={()=>{
                if (formDataShow) {
                  setFormShow(true);
                  setFormDataShow(false);
                }
                setClearDirectionData({
                  grade: "Grade 9",
                  direction: "Write 3 paragraphs on the causes and effects of the civil war including specific examples from the primary sources",
                })
              }
              }
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
                      <b>{AppTitle.cleardirections}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.cleardirections}
                    </p>
                  </div>
                {
                   isShowHide == true ? (isShowHide && !loader &&
                    <button className='flex w-[230px] xl:w-[220px] 3xl:w-[11.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>):<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
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
                          cleardirectionData.grade
                            ? GRADE.find(
                              (ele) => ele.name == cleardirectionData.grade
                            )
                            : null
                        }
                        onChange={(e) => {
                          setClearDirectionData({
                            ...cleardirectionData,
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
                        Original Directions:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Write in the original set of directions that you want to improve."
                          value={cleardirectionData.direction}
                          onChange={(e) => {
                            setClearDirectionData({
                              ...cleardirectionData,
                              direction: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, direction: "" });
                            }
                          }}
                          rows={6}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.direction ? (
                          <span style={{ color: "red" }}>{error.direction}</span>
                        ) : (
                          <></>
                        )}
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    {/* <Note/> */}
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
                )
                }
              </>
            )}
            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.cleardirections}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responsetoshow}
                  contentRef={copyRef}
                  appLink={"/cleardirections"}
                />
              </>
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button disabled={loader}
              onClick={handleClear} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}>
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
              // disabled={!isExVisible} 
              // onClick={() => showExemplerPopup("top")} 
              // className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isExVisible == false ? "opacity-50" : "" }`}

              disabled={loader}
              onClick={() => {
                if (formDataShow) {
                  setFormShow(true);
                  setFormDataShow(false);
                }
                setClearDirectionData({
                  grade: "Grade 9",
                  direction: "Write 3 paragraphs on the causes and effects of the civil war including specific examples from the primary sources",
                })
              }
              }
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}

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

        {isPopupVisible && (
          <CommonActionExempler
            onClose={hideExemplerPopup}
            setIsPopupVisible={setIsPopupVisible}
            position={position}
            visible={visible}
            isExVisible={isExVisible}
            title={`Example for ${AppTitle.cleardirections}`}
            contentRef={copyRef}
            response={responsetoshow}
            appLink={"/cleardirections"}
          />
        )}
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.cleardirections}`}
            response={responsetoshow}
            visible={isActionvisible}
            position={position}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/cleardirections"}
          />
        )}
      </div>

      {renderPopup()}

    </Layout>
  );
}
