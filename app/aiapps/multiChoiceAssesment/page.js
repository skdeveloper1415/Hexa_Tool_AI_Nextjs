"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateMultiChoiceAssesmentApi } from "../../actions/multiChoiceAssesmentApi";
import Commonresponse from "../../common/commonResponse";
import { toast } from "react-toastify";
("../../components/helper/commonfunction");
import { ProgressSpinner } from "primereact/progressspinner";
import UploadPopup from "../../../components/popup/uploadpopup";
import { GRADE, QUESTIONS, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";

export default function Index() {
  const items = [{ label: `${AppTitle.multiChoiceAssesment}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const appId = AppId.multiChoiceAssesment;
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

  const [gradeLevel, setGradeLevel] = useState(null);
  const [numOfQuestions, setNumOfQuestions] = useState(null);
  const [contentType, setContentType] = useState("");
  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [questionsData, setQuestionsData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exempler, setExempler] = useState(false);
  const contentRef = useRef(null);
  const [err, setError] = useState({});
  const [position, setPosition] = useState("center");
  const [title, setTitle] = useState(`${AppTitle.multiChoiceAssesment}`);
  const generateMultiChoiceResponse = async (data) => {
    try {
      const response = await generateMultiChoiceAssesmentApi(data);
      if (response.data.code == 200) {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }

        setQuestionsData(response.data.data.data.questions);
        setFormDataShow(true);
        setLoading(false);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        toast.error(error);
        setLoading(false);
        setFormDataShow(false);
        setFormShow(true);
        toast.error("Something Went Wrong");
      }
    }
  };
  const createResponse = questionsData ? (
    <div
      ref={contentRef}
      className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
    >
      {questionsData &&
        questionsData?.map((item, index) => (
          <div key={index}>
            <h4>
              {index + 1}.{item.question}
            </h4>
            <ul>
              {Object.entries(item.options).map(([key, value]) => (
                <li key={key}>
                  {key}-{value}
                </li>
              ))}
            </ul>
            <div key={index} className="answer-item">
              {/* <h4>
                {index + 1}.{item.question}
              </h4> */}
              <p><b>Answer : {' '}</b>{` ${item.answer}`}</p>
            </div>
          </div>
        ))}

      {/* <div className="answers-section">
        <h3>Answers:</h3>
        {questionsData &&
          questionsData?.map((item, index) => (
            <div key={index} className="answer-item">
              <h4>
                {index + 1}.{item.question}
              </h4>
               <p>{index + 1}.{` ${item.answer}`}</p>
            </div>
          ))}
      </div> */}
    </div>
  ) : ""

  const handleExample = () => {
    setGradeLevel({ name: "Grade 7", code: "9" });
    setNumOfQuestions({ name: "5", code: "5" });
    setContentType("Understanding of the process of photosynthesis, including the role of chlorophyll, the reactants and products involved, and the significance of this process in plants.");
    setTitle(`${AppTitle.multiChoiceAssesment}`);
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
  };
  const handleAction = () => {
    setVisible(true);
    setExempler(false);
    setTitle(`Generated ${AppTitle.multiChoiceAssesment}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (gradeLevel == null) {
      toast.error('Please Select Grade Level.')
      return;
    }

    if (numOfQuestions == null) {
      toast.error('Please Select Number of Questions.')
      return;
    }

    if (contentType.trim() === "") {
      toast.error('Please Enter Topic, Standard, Text or Description of the Assessment.')
      return;
    }

    setLoading(true);
    const payload = {
      grade: gradeLevel.code,
      topic: contentType,
      no_of_questions: numOfQuestions.name,
    };
    generateMultiChoiceResponse(payload);
  };
  const handleEdit = () => {
    setFormDataShow(false);
    setFormShow(true);
  };
  const handleClear = () => {
    setContentType("");
    setGradeLevel({});
    setNumOfQuestions({});
    setIsShowHide(false);
  };
  const [UploadDialog, setUploadDialog] = useState(false);

  return (
    <Layout pageTitle={AppTitle.multiChoiceAssesment}>
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
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  setQuestionsData(null);
                  handleClear();
                } else {
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px]  px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] ${loading == true ? "opacity-50 cursor-not-allowed" : ""
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
              onClick={() => {
                handleExample();
              }}
              disabled={loading}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full ${loading == true ? "opacity-50 cursor-not-allowed" : ""
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
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[18px] text-[#1570EF] font-medium">
                      <b>{AppTitle.multiChoiceAssesment}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    {AppDesc.multiChoiceAssesment} 
                    </p>
                  </div>
                  {
                    isShowHide == true ? (isShowHide && !loading &&
                      <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                        onClick={() => {
                          setFormDataShow(true);
                          setFormShow(false);
                        }}
                      >
                        <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                        Hide  Prompt
                      </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Assignment}</div>
                  }

                </div>

                {loading ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <form >
                    <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                      <div className="grid col-span-3">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level
                          <span className="text-[red] ml-1">*</span>
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
                      <div className="grid col-span-3">
                        <div>
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            Number of Questions
                            <span className="text-[red] ml-1">*</span>
                          </label>
                          <Dropdown
                            filter
                            value={numOfQuestions}
                            onChange={(e) => setNumOfQuestions(e.value)}
                            options={QUESTIONS}
                            optionLabel="name"
                            placeholder="Select"
                            className="w-full md:w-14rem"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Topic, Standard, Text or Description of the Assessment (be specific):
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                        rows={3}
                        className="w-full"
                      />
                    </div>
                    <div className="mt-[20px]">
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      >
                        {loading ? "Please Wait ....." : "Generate with BrixAI"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
            {formDataShow && (
              <Commonresponse
                title={AppTitle.multiChoiceAssesment}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={handleAction}
                response={createResponse}
                contentRef={contentRef}
                handleEdit={handleEdit}
                appLink={"/multiChoiceAssesment"}
              />
            )}
          </div>

        </div>

        <UploadPopup
          appName={AppTitle.multiChoiceAssesment}
          visible={UploadDialog}
          onHides={() => setUploadDialog(false)}
        />
      </div>

      {visible && (
        <CommonActionExempler
          title={title}
          response={createResponse}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={contentRef}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={"/multiChoiceAssesment"}
        />
      )}
      {renderPopup()}
    </Layout>
  );
}
