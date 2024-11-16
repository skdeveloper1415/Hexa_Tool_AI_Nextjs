"use client";
import React, { useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateTextSummarizer } from "../../actions/textSummarizerApi";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import { toast } from "react-toastify";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [textSummarizer, setTextSummarizer] = useState({
    contentType: "",
    summary: "",
  });

  const items = [{ label: `${AppTitle.textsummarizer}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({});
  const [isShowHide, setIsShowHide] = useState(false);

  const [loader, setLoader] = useState(false);
  const appId = AppId.textsummarizer;
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

  const validate = () => {
    let err = {};
    let isErr = false;
    if (
      !textSummarizer.contentType ||
      textSummarizer.contentType.trim() === ""
    ) {
      err.contentType = "Please Enter Original Text.";
      isErr = true;
    }
    if (!textSummarizer.summary || textSummarizer.summary.trim() === "") {
      err.summary = "Please Enter Length Of Summary.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const handleClear = () => {
    setTextSummarizer({
      contentType: "",
      summary: "",
    });
    setFormDataShow(false);
    setFormShow(true);
    setIsExVisible(false);
    setError({});
    setIsShowHide(false)
  };

  const [content, setContent] = useState([]);
  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const body = {
      text: textSummarizer.contentType ? textSummarizer.contentType : "",
      length: textSummarizer.summary ? textSummarizer.summary : "",
    };
    setLoader(true);
    try {
      const response = await generateTextSummarizer(body);
      if (response.data.code === 200) {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }

        if (Array.isArray(response.data.data.data.Content)) {
          setContent(response.data.data.data.Content);
        } else if (typeof response.data.data.data.Content === "string") {
          setContent(response.data.data.data);
        }
        setFormDataShow(true);
        setIsExVisible(true);
        setFormShow(false);
        setLoader(false);
        setIsShowHide(true)
      } else {
        setLoader(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        
          toast.error('Something went wrong.');
          setLoader(false);
          setFormDataShow(false);
          setFormShow(true);
      }
    }
  };

  const copyRef = useRef(null);

  const responsetoshow = (
    content && Object.keys(content).length > 0 ? (
    <div ref={copyRef}>
      {content  ?
       (
        Object.entries(content).map(([key, value]) => (
          <ul key={key}>
            <li>
              <strong className="mb-3">{key} : </strong>
              <br></br>
              {value}
            </li>
          </ul>
        ))
      ) : (
        <div>No content available</div>
      )}
    </div>):""
  );


  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

  const handleAction = () => {
    setIsActionvisible(true);
  };

  const handleExample = () => {
    setTextSummarizer((prevData) => ({
      ...prevData,
      summary: "3 paragraphs",
      contentType: `The Water Cycle: A Natural Marvel
      The water cycle, also known as the hydrological cycle, is a continuous and vital process that governs the movement of water on Earth. This intricate system comprises several stages, ensuring a dynamic exchange of water between the atmosphere, land, and oceans.

      1. Evaporation:

      The water cycle begins with evaporation, where the sun's radiant energy transforms liquid water from oceans, rivers, lakes, and even plants into water vapor. This invisible water vapor rises into the atmosphere, forming clouds. The sun's heat is the driving force behind this phase, and it plays a crucial role in initiating the entire water cycle.

      2. Condensation:

      As warm, moist air rises, it encounters cooler temperatures at higher altitudes. This leads to condensation, during which the water vapor changes back into tiny water droplets that cluster together to form clouds. The process of condensation is essential in the creation of clouds, which are visible indicators of the water cycle's activity in the atmosphere.

      3. Precipitation:

      When the concentration of water droplets in clouds becomes too heavy, gravity takes over, and precipitation occurs. This can take various forms, including rain, snow, sleet, or hail, depending on factors like temperature and atmospheric conditions. Precipitation is a critical stage as it replenishes water sources on the Earth's surface, sustaining ecosystems and providing a fresh supply for human consumption.
    `,
    }));
    setFormDataShow(false);
    setFormShow(true);
  };

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
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full ${
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
            {isPopupVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                title={`Example for ${AppTitle.textsummarizer}`}
                contentRef={copyRef}
                response={responsetoshow}
                appLink={"/textsummarizer"}
              />
            )}
          </div>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                {AppTitle.textsummarizer}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Allows to give a brief( summary ) in desired length for the given content or text.
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
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
                      Original text passage:{" "}
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic "></i>
                        </div>

                        <InputTextarea
                          autoResize
                          placeholder="Type..."
                          value={textSummarizer.contentType}
                          onChange={(e) => {
                            setTextSummarizer({
                              ...textSummarizer,
                              contentType: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, contentType: "" });
                            }
                          }}
                          rows={3}
                          className="w-full pl-[35px]"
                        />
                        {error.contentType ? (
                           <span style={{ color: "red" }}>{error.summary}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Length of summary:{" "}
                        <span className="text-[red] ml-1">*</span>
                      </label>

                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic "></i>
                        </div>
                        <InputTextarea
                          autoResize
                          rows={1}
                          placeholder="Type..."
                          value={textSummarizer.summary}
                          onChange={(e) => {
                            setTextSummarizer({
                              ...textSummarizer,
                              summary: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, summary: "" });
                            }
                          }}
                          className="w-full pl-[35px]"
                        />
                        {error.summary ? (
                          <span style={{ color: "red" }}>{error.summary}</span>
                        ) : (
                          <></>
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
                  title={AppTitle.textsummarizer}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responsetoshow}
                  contentRef={copyRef}
                  appLink={"/textsummarizer"}
                />
              </>
            )}
            {renderPopup()}
          </div>
        
        </div>
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.textsummarizer}`}
            response={responsetoshow}
            visible={isActionvisible}
            position={position}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/textsummarizer"}
          />
        )}
      </div>
    </Layout>
  );
}
