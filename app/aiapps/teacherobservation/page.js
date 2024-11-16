"use client";
import React, { useRef, useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateTeacherObservation } from "../../actions/teacherObservationApi";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const items = [{ label: `${AppTitle.teacherobservation}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [observationData, setObservationData] = useState({
    contentType: "",
    contentGrowth: "",
    contentFeedback: "",
  });
  const appId = AppId.teacherobservation;
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

  const [isShowHide, setIsShowHide] = useState(false); 
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);

  const validate = () => {
    let err = {};
    let isErr = false;
    if (
      !observationData.contentType ||
      observationData.contentType.trim() === ""
    ) {
      err.contentType = "Please Enter Teacher`s Observed Areas of Strength.";
      isErr = true;
    }
    if (
      !observationData.contentGrowth ||
      observationData.contentGrowth.trim() === ""
    ) {
      err.contentGrowth =
        "Please Enter Teacher`s Observed Opportunities for Growth.";
      isErr = true;
    }
    if (
      !observationData.contentFeedback ||
      observationData.contentFeedback.trim() === ""
    ) {
      err.contentFeedback =
        "Please Enter Additional Detail to Include in the Feedback.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const handleClear = () => {
    setObservationData({
      contentType: "",
      contentGrowth: "",
      contentFeedback: "",
    });
    setError({});
    setFormDataShow(false);
    setFormShow(true);
    setIsShowHide(false);
    setIsExVisible(false);
  };

  const [content, setContent] = useState([]);

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const body = {
      area_of_strength: observationData.contentType
        ? observationData.contentType
        : "",
      opp_of_growth: observationData.contentGrowth
        ? observationData.contentGrowth
        : "",
      feedback: observationData.contentFeedback
        ? observationData.contentFeedback
        : "",
    };
    setLoader(true);
    try {
      const response = await generateTeacherObservation(body);

      if (response.data.code === 200) {
        setContent(response.data.data.data);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setFormDataShow(true);
        setIsExVisible(true);
        setFormShow(false);
        setLoader(false);
        setIsShowHide(true);
      } else {
        console.log("Error: ", response);
        toast.error("Something went wrong");
        setLoader(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something went wrong");
        setLoader(false);
        setFormDataShow(false);
        setFormShow(true);
      }
    }
  };

  const copyRef = useRef(null);

  const responsetoshow = (
    <div ref={copyRef}>
      <strong >Areas_of_strength</strong>
      {content?.areas_of_strength?.map((elm, index) => (
        <div key={index} className="mt-2">
          <div>
            <strong>{elm.description}</strong>
          </div>
          <div>{elm.feedback}</div>
          <br />
        </div>
      ))}

      <>
        <strong>Opportunities_for_growth</strong>
        {content?.opportunities_for_growth?.map((elm, index) => (
          <div key={index} className="mt-2">
            <div>
              <strong>{elm.description}</strong>
            </div>
            <div>{elm.feedback}</div>
            <br />
          </div>
        ))}
      </>
    </div>
  );

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

  const handelExample = () => {
    setObservationData((prevData) => ({
      ...prevData,
      contentType:
        "Warm and personable with students, seeks to understand how students are experiencing their class, Give clear and concise directions, commands the room well",
      contentGrowth:
        "Students are off task more often than they should be, teacher has a focus on completion of work but lacks attention to the quality of the work being produced",
      contentFeedback:
        "Our whole school focus this year is on moving from compliance to authentic engagement and producing grade level appropriate work",
    }));
    setFormDataShow(false);
    setFormShow(true);
    setIsExVisible(false);
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
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] ${loader == true ? "opacity-50 cursor-not-allowed" : ""
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full ${loader == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => handelExample()}
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
                {" "}
                <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF]  font-medium">
                     {AppTitle.teacherobservation}
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    Allows to give feedback to students to improve on key areas by teacher.
                    </p>
                  </div>
                  {
                    isShowHide && !loader ?
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.studentFeedback}</div>
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
                        Teacher`s Observed Areas of Strength:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={observationData.contentType}
                        onChange={(e) => {
                          setObservationData({
                            ...observationData,
                            contentType: e.target.value,
                          });
                          if (e.target.value) {
                            setError({ ...error, contentType: "" });
                          }
                        }}
                        rows={3}
                        className="w-full"
                      />
                      {error.contentType ? (
                        <span style={{ color: "red" }}>
                          {error.contentType}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Teacher`s Observed Opportunities for Growth:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={observationData.contentGrowth}
                        onChange={(e) => {
                          setObservationData({
                            ...observationData,
                            contentGrowth: e.target.value,
                          });
                          if (e.target.value) {
                            setError({ ...error, contentGrowth: "" });
                          }
                        }}
                        rows={3}
                        className="w-full"
                      />
                      {error.contentGrowth ? (
                        <span style={{ color: "red" }}>
                          {error.contentGrowth}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Detail to Include in the Feedback:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={observationData.contentFeedback}
                        onChange={(e) => {
                          setObservationData({
                            ...observationData,
                            contentFeedback: e.target.value,
                          });
                          if (e.target.value) {
                            setError({ ...error, contentFeedback: "" });
                          }
                        }}
                        rows={3}
                        className="w-full"
                      />
                      {error.contentFeedback ? (
                        <span style={{ color: "red" }}>
                          {error.contentFeedback}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <Note/>
                    <div>
                      <button
                        onClick={(e) => {
                          HandleGenerate(e);
                        }}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
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
                  title={`${AppTitle.teacherobservation}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responsetoshow}
                  contentRef={copyRef}
                  appLink={"/teacherobservation"}
                />
              </>
            )}
          </div>
          
        </div>
        {isPopupVisible && (
          <CommonActionExempler
            onClose={hideExemplerPopup}
            setIsPopupVisible={setIsPopupVisible}
            position={position}
            visible={visible}
            isExVisible={isExVisible}
            title={`Example for ${AppTitle.teacherobservation}`}
            contentRef={copyRef}
            response={responsetoshow}
            appLink={"/teacherobservation"}
          />
        )}
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.teacherobservation}`}
            response={responsetoshow}
            visible={isActionvisible}
            position={position}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/teacherobservation"}
          />
        )}
      </div>
      {renderPopup()}
    </Layout>
  );
}
