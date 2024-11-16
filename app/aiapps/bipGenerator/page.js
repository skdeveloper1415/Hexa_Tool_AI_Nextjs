"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import { ProgressSpinner } from "primereact/progressspinner";
import { fetchApi } from "../../actions";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from '../../common/CommonActionExempler';
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {

  //no of attepts code
  const appId = AppId.bipGenerator;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts
  //no of attepts code


  const [bipData, setBipData] = useState({
    grade: "",
    description: "",
  });

  const [responseTitle, setResponseTitle] = useState("");
  const [responseContent, setResponseContent] = useState([]);


  const contentRef = useRef(null);
  const [position, setPosition] = useState("center");
  const [error, setError] = useState({});

  const items = [{ label: `${AppTitle.bipGenerator}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [isExamplerDisable, setExamplerDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);
  const [data, setData] = useState()

  const responsetoshow = (
    responseContent ? (
      <div ref={contentRef}>
        <div>
          <h4 className="text-[18px] mb-3 font-[#344054]">Title : {responseTitle}</h4>
          <ul className="text-[18px] xl:text-[0.833vw] mb-3">
            {responseContent.length > 0 ? responseContent.map((item, i) => {
              const parts = item.split(':'); // Split the item by colon
              return (
                <li key={i} className="my-2 text-[14px]">
                  {parts.length > 1 ? <span className="font-bold">{parts[0]}:</span> : parts[0]}
                  {parts.length > 1 ? parts.slice(1).join(':') : null} {/* Reconstruct the item */}
                </li>
              );
            }) : null}


          </ul>
        </div>
      </div>
    ) : (
      ""
    )

  );

  const handleAction = () => {
    setVisible(true);
  };

  const closeFormDataShow = () => {
    setFormDataShow(false);
    setFormShow(true);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setIsExVisible(true);
  };

  const hideExemplerPopup = () => {
    setIsExVisible(false)
  };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!bipData.grade) {
      err.grade = "Please select grade level.";
      isErr = true;
    }
    if (!bipData.description || bipData.description.trim().length == 0) {
      err.description = "Please enter text content.";
      isErr = true;

      setBipData((prevState) => ({
        ...prevState,
        description: "",
      }));
    }
    setError(err);
    return isErr;
  };

  const generateBipGenerator = async (payload) => {
    try {
      const response = await fetchApi.post("/bip-generator", payload);
      return response;
    } catch (error) {
return error    }
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validate()) {
      setLoading(false);
      return;
    }

    try {
      const body = {
        grade: bipData.grade ? bipData.grade?.name : "",
        description: bipData.description ? bipData.description : "",
      };

      const response = await generateBipGenerator(body);
      if (response.data.code == "200") {

        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false)
          return;
        }


        const responseData = response.data.data;
        const transformedResponse = stringResponseConvert(responseData);
        setResponseTitle(transformedResponse?.Title);
        setResponseContent(transformedResponse?.Content);
        setLoading(false);
        setFormDataShow(true);
        setIsShowHide(true);
        setFormShow(false);
        setExamplerDisabled(false);
      }
      else{
        setLoading(false)
        toast.error(response.error|| "Something went wrong")
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        // console.log("error: ", error);
        toast.error(error || "Something went wrong");
        setLoading(false);
      }
    }
  };

  const resetAndClear = () => {
    setBipData({
      grade: "",
      description: "",
    });

    setError({});
    setFormShow(true);
    setVisible(false);
    setIsExVisible(false);
    setFormDataShow(false);
    setExamplerDisabled(true);
    setIsShowHide(false);
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
          <BackToAIModified isGenerate={loading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={() => {
                resetAndClear();
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
              // disabled={isExamplerDisable}
              // onClick={()=> showExemplerPopup("top")}
              // className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isExamplerDisable == true ? "opacity-50 cursor-not-allowed" : "" }`}

              disabled={loading}
              onClick={() => {
                if (formDataShow) {
                  setFormShow(true);
                  setFormDataShow(false);
                }
                setBipData(
                  {
                    grade: { name: 'Grade 7', code: '9' },
                    description: "The student in third grade displays consistent non-compliance during classroom activities, often ignoring or verbally refusing instructions. This behavior, observed in about 80% of direct participation requests, disrupts class flow and requires individual intervention. Additionally, the student frequently exhibits intense tantrums, especially during routine transitions, characterized by screaming, crying, and occasionally throwing objects. These episodes, occurring roughly three times per week, require intervention for calming and reintegration into class activities.",
                  }
                );
              }
              }
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}

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
            {isExVisible &&
              <CommonActionExempler
                onClose={hideExemplerPopup}
                position={position}
                visible={isExVisible}
                title={`Generated ${AppTitle.bipGenerator}`}
                // response={exemplarToShow}
                response={responsetoshow}
                responsetoshow
                contentRef={contentRef}
                isExVisible={isExVisible}
                setIsPopupVisible={setIsExVisible}
                appLink={'/bipGenerator'}
              />}
          </div>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF]  font-medium">
                   {AppTitle.bipGenerator}
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      Generate suggestions for a {AppTitle.bipGenerator}.
                    </p>
                  </div>
                  {
                    isShowHide && !loading ?
                    <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  {loading ? (
                    <div className="flex justify-center h-[300px] items-center">
                      <ProgressSpinner />{" "}
                    </div>
                  ) : (
                    <div className="grid xl:gap-[1.25vw] gap-[18px]">
                      <div>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level:<span className="text-[red] ml-1">*</span>
                        </label>
                        <Dropdown
                          filter
                          value={bipData.grade}
                          onChange={(e) => {
                            setBipData({ ...bipData, grade: e.target.value });
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
                          Description of strengths, problem behaviors, function
                          of behaviors, etc:<span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <InputTextarea
                            placeholder="The student's strengths, problem behaviors, function of behaviors, etc."
                            value={bipData.description}
                            onChange={(e) => {
                              setBipData({
                                ...bipData,
                                description: e.target.value,
                              });
                              if (e.target.value) {
                                setError({ ...error, description: "" });
                              }
                            }}
                            rows={8}
                            cols={5}
                            className="w-full relative pl-[35px]"
                          />
                          {error.description ? (
                            <span style={{ color: "red" }}>
                              {error.description}
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
                          onClick={(e) => {
                            HandleGenerate(e);
                          }}
                        >
                          {loading ? "Please Wait..." : "Generate with BrixAI"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.bipGenerator}`}
                onHide={() => closeFormDataShow()}
                handleAction={handleAction}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={'/bipGenerator'}
              ></Commonresponse>
            )}
          </div>
          
        </div>
        {visible && <CommonActionExempler
          title={`Generated ${AppTitle.bipGenerator}`}
          response={responsetoshow}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={contentRef}
          appLink={'/bipGenerator'}
          isExVisible={isExVisible} />}
      </div>
      {renderPopup()}

    </Layout>
  );
}
