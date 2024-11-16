"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { AppId, AppTitle, GRADE, AppDesc, AppCategory } from "../../../components/helper/enum";
import { generateRealWorldConnectionAPI } from "../../actions/realWorldConnections";
import { ProgressSpinner } from "primereact/progressspinner";
import Commonresponse from "../../common/commonResponse";
import { toast } from "react-toastify";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";

export default function Index() {
  const items = [{ label: `Real-World Applications`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [topicOrStandardValue, setTopicOrStandardValue] = useState("");
  const [responseData, setResponseData] = useState([]);
  console.log('responseData:', responseData);
  const [isShowHide, setIsShowHide] = useState(false);

  const handleClear = () => {
    setGradeLevel(null);
    setTopicOrStandardValue("");
    setError({});
    setIsShowHide(false)
  };
  const appId = AppId.blogCreater;
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (gradeLevel === null) {
      toast.error('Please Select Grade Level.')
      return;
    }
    if (topicOrStandardValue === "" || topicOrStandardValue.trim() === "") {
      toast.error('Please Enter Topic, Standared, Objective.')
      return;
    }
    setIsExVisible(false);
    setLoading(true);
    try {
      const payload = {
        grade: gradeLevel?.name,
        topic: topicOrStandardValue,
      };
      const response = await generateRealWorldConnectionAPI(payload);

      if (response.data.code == "200") {
        let responseData = response.data.data.data ?? [];
        if (responseData.length === 0) {
          // Handle empty response data, maybe set a default response
          setResponseData([]);
          return;
        }
        const realWorldConnections = responseData?.split("\n\n").map((item) => {
          const titleDescription = item?.split("\n");
          const title = titleDescription[0]?.split(": ")[1];
          const description = titleDescription[1];
          return { title, description };
        });
        setResponseData(realWorldConnections);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }
        setLoading(false);
        setIsExVisible(true);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true)
      } else {
        toast.error("Something Went Wrong.");
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        toast.error("Something Went Wrong.");
        setLoading(false);
      }
    }
  };

  const copyRef = useRef(null);

  const responseToShow = (
    responseData.length > 0 ? (
      <div ref={copyRef}>
        {responseData.length > 0
          ? responseData.map((item) => (
            <>
              <h5 className="font-bold">{item?.title ? item?.title + ":" : ""}</h5>
              <p className="text-[14px] font-normal text-[#344054]">
                {item?.description}
              </p>
            </>
          ))
          : null}
      </div>
    ) : ""
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
              isGenerate={loading}
            />
            <button
              disabled={loading}
              onClick={() => {
                setIsExVisible(false);
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  handleClear();
                } else {
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""
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
                setGradeLevel( { name: 'Grade 4', code: '6' });
                setTopicOrStandardValue(
                  "Understanding the Water Cycle: Nature's Recycling System Briefly introduce the concept of the water cycle and its importance to life on Earth. Mention how the water cycle contributes to weathering and erosion of the Earth's surface"
                );
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""
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
                      <b>Real-World Applications</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    Generates real time world examples and incidents for better engagement of students.
                    </p>
                  </div>
                  {
                    isShowHide == true ? (isShowHide && !loading &&
                      <button className='flex w-[160px] xl:w-[150px] 3xl:w-[8.454vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                        onClick={() => {
                          setFormShow(false);
                          setFormDataShow(true);
                        }}
                      >
                        <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                        Hide  Prompt
                      </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.classroomResources}</div>
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

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Topic, Standard, Objective(be as specific as possible):
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          autoResize
                          value={topicOrStandardValue}
                          onChange={(e) => {
                            setTopicOrStandardValue(e.target.value);
                          }}
                          placeholder="Enter Topic or Standard Value."
                          rows={5}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
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
                  title={`${AppTitle.blogCreater}`}
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
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">

            {isPopupVisible && (
              <CommonActionExempler
                onClose={() => setIsPopupVisible(false)}
                setIsPopupVisible={setIsPopupVisible}
                position={"center"}
                visible={visible}
                isExVisible={isExVisible}
                contentRef={copyRef}
                title={`Example for ${AppTitle.blogCreater}`}
                response={responseToShow}
                appLink={"/realworldconnections"}
              />
            )}
          </div>
        </div>
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.blogCreater}`}
            response={responseToShow}
            visible={isActionvisible}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/realworldconnections"}
          />
        )}
        {renderPopup()}
      </div>
    </Layout>
  );
}
