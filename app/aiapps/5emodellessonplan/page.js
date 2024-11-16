"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generate5EModelLessionPlanAPI } from '../../../app/actions/5emodellessionplan';
import { AppCategory, AppDesc, AppId, AppTitle, GRADE, STANDARD } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import { toast } from "react-toastify";
import { ProgressSpinner } from 'primereact/progressspinner';
import { stringResponseConvert } from '../../../components/helper/stringResponseConvert';
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const items = [
    { label: `${AppTitle.fiveemodellessonplan}`, url: "" },
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [grade, setGrade] = useState();
  const [error, setError] = useState({})
  const [contentType, setContentType] = useState();
  const [additionalDetail, setAdditionalDetail] = useState("")
  const [standard, setStandard] = useState("")
  const [loading, setLoading] = useState(false)
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false)
  const [responseContent, setResponseContent] = useState([]);
  const [isShowHide, setIsShowHide] = useState(false);

  const [responseTitle, setResponseTitle] = useState("");

  const [visible, setVisible] = useState(false);

  const appId = AppId.fiveemodellessonplan;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

  const [ip, setIp] = useState("123.456.789.123");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const contentRef = useRef(null);

  const formattedContent = responseContent?.map((line, index) => {
    const isStepIncluded = line.includes(":");

    return (
      <React.Fragment key={index}>
        <span className={`text-[14px] text-[#101828] ${isStepIncluded ? 'font-bold' : ''}`}>
          {line}
        </span>
        <br />
      </React.Fragment>
    );
  })



  const responsetoshow = responseContent.length ? (
    <div ref={contentRef}>
      {
        formDataShow &&
        <div className="mb-[16px]">
          <h2 className="text-[#101828] 3xl:text-[0.938vw] 2xl:text-[18px] xl:text-[16px] font-semibold xl:mb-[1.04vw] mb-[20px]">
            {responseTitle}
          </h2>
          <div>
            <div>{formattedContent}</div>
          </div>
        </div>
      }
    </div>) : ""


  // const responsetoshow = (
  //   <div ref={contentRef}>
  //     <div >
  //     <h4 className="text-[16px] xl:text-[0.833vw]">
  //         {" "}
  //         {responseTitle}
  //       </h4>
  //       <ol className="text-[20px] xl:text-[0.933vw] mt-6">

  //         {
  //           responseContent.length > 0 ?
  //             responseContent.map((item, i) => (
  //               <li key={i}>
  //                  {console.log("item", item)}  
  //                 {item}
  //               </li>
  //             )) : null
  //         }

  //       </ol>
  //     </div>
  //   </div>
  // );



  const validate = () => {
    let err = {}
    let isErr = false;
    if (!grade) {
      err.grade = 'Please Select Grade Level.'
      isErr = true
    }

    if (!contentType ||
      contentType.trim().length == 0) {
      err.contentType = 'Please Enter Topic Standard or Objective'
      isErr = true;

    }
    if (!additionalDetail || additionalDetail.trim() === "") {
      err.additionalDetail = 'Please Enter Additional Customization'
      isErr = true
    }
    if (!standard) {
      err.standard = 'Please Enter Standard Set To Align To'
      isErr = true
    }
    setError(err)
    return isErr
  }

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return
    }
    setLoading(true);
    try {
      const payload = {
        "grade": grade?.name,
        "topic": contentType,
        "additional_customization": additionalDetail,
        "standards": standard?.code
      }
      const response = await generate5EModelLessionPlanAPI(payload)
      if (response.data.code == '200') {
        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false)
          return;
        }
        const responseData = response.data.data ?? [];
        const transformedResponse = stringResponseConvert(responseData);
        setResponseContent(transformedResponse?.Content);
        setResponseTitle(transformedResponse?.Title)
        setFormDataShow(true)
        setFormShow(false)
        setIsExVisible(true)
        setShowExemplarButton(true)
        setLoading(false)
        setIsShowHide(true)
      } else {
        toast.error('Something went wrong.')
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        console.log('error:', error);
        toast.error('Something went wrong.');
        setLoading(false);
      }
    }
  };


  const handleClear = () => {
    setGrade("")
    setContentType("")
    setAdditionalDetail("")
    setStandard("")
    setFormDataShow(false)
    setFormShow(true)
    setShowExemplarButton(false);
    setError({});
    setIsShowHide(false);
  }

  const handleExample = () => {
    setGrade({ name: 'Grade 8', code: '10' },);
    setContentType("What role do muscles, tendons, ligaments and bones play in allowing a human to walk? ")
    setAdditionalDetail("We are exploring the musculoskeletal system and its functions. The guiding question for our lesson is how do bones, muscles, tendons and ligaments work together to allow humans to walk around their environment? ")
    setStandard({
      "name": "Next Generation Science Standards (NGSS): These standards provide guidelines for teaching science and have been adopted by a number of states.",
      "code": "NGSS"
    });
    setFormDataShow(false);
    setFormShow(true)
  }

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px] mb-[32px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <BackToAIModified
              isGenerate={loading}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                handleClear();
              }}
              disabled={loading}
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
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
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
                      <b>{AppTitle.fiveemodellessonplan}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.fiveemodellessonplan}
                    </p>
                  </div>
                  {
                    isShowHide == true ? (isShowHide && !loading &&
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center gap-1 w-[230px] xl:w-[220px] 3xl:w-[12.854vw]'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>): <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
                  }
                </div>
                {loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div>
                  :
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={
                          grade
                        }
                        onChange={(e) =>
                          setGrade(e.target.value,
                          )
                        }
                        filter
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.grade ? <span style={{ color: 'red' }}>{error.grade}</span> : <></>}

                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Topic Standard or Objective:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div></Link>
                        <InputTextarea
                          autoResize
                          placeholder="Topic or Title"
                          value={contentType}
                          onChange={(e) => setContentType(e.target.value)}
                          rows={3}
                          className="w-full pl-[35px]"
                        />
                        {error.contentType ? <span style={{ color: 'red' }}>{error.contentType}</span> : <></>}
                      </div>
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Customization (Optional):<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div></Link>
                        <InputTextarea
                          autoResize
                          placeholder="9th-grade students will develop the skills to compare and analyze government structures, power distribution"
                          value={additionalDetail}
                          onChange={(e) => setAdditionalDetail(e.target.value)}
                          rows={3}

                          className="w-full pl-[35px]"
                        />

                        {error.additionalDetail ? <span style={{ color: 'red' }}>{error.additionalDetail}</span> : <></>}

                      </div>
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Standard Set to Align to (Optional):<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <Link href="#">
                          <div className="absolute left-[7px] top-[14px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </Link>

                        <Dropdown
                          value={standard}
                          onChange={(e) =>
                            setStandard(e.value)
                          }
                          options={STANDARD}
                          optionLabel="code"
                          placeholder="Select Standard Set to Align to"
                          filter
                          className="w-full md:w-14rem"
                        />



                        {error.standard ? <span style={{ color: 'red' }}>{error.standard}</span> : <></>}

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
                        {
                          loading ? "Please Wait..." : "Generate with BrixAI"
                        }
                      </button>
                    </div>
                  </form>
                }
              </>
            )}
            {formDataShow &&
              <Commonresponse
                title={`${AppTitle.fiveemodellessonplan}`}
                setFormDataShow={setFormDataShow}
                onHide={() => {
                  setFormDataShow(false)
                  setFormShow(true)

                }}
                handleAction={() => {
                  setVisible(true),
                    setIsExVisible(false)
                }}
                response={responsetoshow}
                contentRef={contentRef}
                setVisible={setVisible}
                appLink={'/5emodellessonplan'}
              />
            }
            {renderPopup()}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              onClick={handleClear}
              disabled={loading}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center  mb-5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Image
                width="20"
                height="20"
                className="mr-2"
                src="/images/resetclear.svg"
                alt="Reset and clear"
              />
              Reset and Clear
            </button>

            <button
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
              Example
            </button>
          </div> */}
        </div>


        {visible && <CommonActionExempler
          response={responsetoshow}
          setIsPopupVisible={setVisible}
          title={`Generated ${AppTitle.fiveemodellessonplan}`}
          contentRef={contentRef}
          onClose={() => setVisible(false)}
          setVisible={setVisible}
          position={"Top"}
          visible={visible}
          isExVisible={isExVisible}
          appLink={'/5emodellessonplan'}
        />}
      </div>
    </Layout>
  );
}
