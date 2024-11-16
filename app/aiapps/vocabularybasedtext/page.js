"use client";
import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { AppCategory, AppTitle, GRADE } from "../../../components/helper/enum";
import BackToAI from "../../../components/BackToAI";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { getVocabulayBasedTextApi } from "../../actions/vocabularyBasedText";
import { printKeyValuePairs } from "../../../components/helper/printKeyValuePairs";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [gradeLevel, setGradeLevel] = useState(null);
  const [contentTopic, setContentTopic] = useState("");
  const [textlength, setTextlength] = useState(null);
  const [vocabulary, setVocabulary] = useState("");
  const [error, setError] = useState({});
  const items = [{ label: `${AppTitle.vocabularybasedtext}`, url: "" }];
  const [loading, setLoading] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [response, setResponse] = useState("");
  const [isActionvisible, setIsActionvisible] = useState(false);
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const contentRef = useRef(null);
  const [isShowHide, setIsShowHide] = useState(false);


  const text = [
    { name: "1 paragraph", code: "1" },
    { name: "2 paragraph", code: "2" },
    { name: "3 paragraph", code: "3" },
    { name: "4 paragraph", code: "4" },
    { name: "5 paragraph", code: "5" },
    { name: "6 paragraph", code: "6" },
  ];

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const validate = () => {
    let err = {};
    let isErr = false;

    if (!gradeLevel || gradeLevel.name === "") {
      err.gradeLevel = "Please Select Grade Level.";
      isErr = true;
    }

    if (!contentTopic || contentTopic.trim() === "") {
      err.contentTopic = "Please Enter Topic of Text.";
      isErr = true;
    }

    if (!vocabulary || vocabulary.code === "") {
      err.vocabulary = "Please Enter Vocabulary to Include.";
      isErr = true;
    }
    if (!textlength || textlength.code.trim() === "") {
      err.textlength = "Please Select Text Length.";
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
    setLoading(true);
    const payload = {
      grade_level: gradeLevel.name,
      topic: contentTopic,
      vocabulary: vocabulary,
      text_length: textlength.code,
    };
    try {
      const response = await getVocabulayBasedTextApi(payload);
      if (response.data.code == 200) {
        const responseData = response.data.data.data;
        // const transformedResponse = stringResponseConvert(responseData);
        // console.log('transformedResponse', transformedResponse)
        setResponse(responseData);
        setVisible1(true);
        // setResponseContent(transformedResponse?.Content);
        setFormShow(false);
        setIsShowHide(true);

      } else {
        toast.error('Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setLoading(false);
        setFormDataShow(false);
        setFormShow(true);
        toast.error('Something went wrong');
      }

    }
    setLoading(false);
  };


  const handleExample = () => {
    setGradeLevel({ name: "Grade 9", code: "11" });
    setContentTopic(
      "Planets in the Solar System and the order of the inner and outer planets"
    );
    setVocabulary(
      "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, Inner Planets, Outer Planets, Sun "
    );
    setTextlength({ name: "1 paragraph", code: "1" });
    setError({});
    setFormShow(true);
    setVisible1(false);
  };
  const handleReset = () => {
    setGradeLevel("");
    setContentTopic("");
    setVocabulary("");
    setTextlength("");
    setError({});
    setIsActionvisible(false);
    setFormShow(true);
    setVisible1(false);
  };

  const responseData = (
    response && Object.keys(response).length > 0 ? (
      <div ref={contentRef}>
        <div>

          {printKeyValuePairs(response)}
        </div>
      </div>) : ""
  );
  const handleAction = () => {
    setFormDataShow(true);
    setIsActionvisible(true);
  };
  return (
    <Layout>
      <div className="mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]">
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
              onClick={() => { handleReset(), setIsShowHide(false) }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
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
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
          </div>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                  <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                    {`${AppTitle.vocabularybasedtext}`}
                  </h3>
                  <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                  A customized vocabulory can be defined to generate texts accordingly to learn and practice.
                  </p>
                  </div>
                  <div>
                  {
                    isShowHide && !loading ?
                    <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054]  border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center gap-1 w-[170px] xl:w-[11.854vw]'
                      onClick={() => {
                        setVisible1(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                  }
                  </div>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center">
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
                        onChange={(e) => {
                          setGradeLevel(e.value);
                          if (e.value) {
                            setError({ ...error, gradeLevel: '' })
                          }
                        }}
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.gradeLevel && (
                        <div className="text-red-500">{error.gradeLevel}</div>
                      )}
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Topic of Text:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          value={contentTopic}
                          placeholder="Nelson mandela's life in South Africa."
                          onChange={(e) => {
                            setContentTopic(e.target.value);

                            console.log('e.target.value', e.target.value)
                            if (e.target.value) {
                              setError({ ...error, contentTopic: '' })
                            }
                          }}
                          rows={3}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.contentTopic && (
                          <div className="text-red-500">
                            {error.contentTopic}
                          </div>
                        )}

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Vocabulary to Include:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          value={vocabulary}
                          placeholder="Resistance, Democracy,Equality,Imprisonment,Activism,Apartheid."
                          onChange={(e) => {
                            setVocabulary(e.target.value);
                            if (e.target.value) {
                              setError({ ...error, vocabulary: '' })
                            }
                          }}
                          rows={3}
                          cols={5}
                          className="w-full relative pl-[35px]"
                        />
                        {error.vocabulary && (
                          <div className="text-red-500">{error.vocabulary}</div>
                        )}

                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Text Length:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={textlength}
                        onChange={(e) => {
                          setTextlength(e.value);
                          if (e.value) {
                            setError({ ...error, textlength: '' })
                          }
                        }}
                        options={text}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.textlength && (
                        <div className="text-red-500">{error.textlength}</div>
                      )}

                      {/* {error.selectedPointScale ? <span style={{ color: 'red' }}>{error.selectedPointScale}</span> : <></>} */}
                    </div>
                    <Note/>
                    <div>
                      <button
                        onClick={HandleGenerate}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
            {visible1 && (
              <Commonresponse
                title={`${AppTitle.vocabularybasedtext}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), setFormShow(true);
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responseData}
                contentRef={contentRef}
                appLink={"/vocabularybasedtext"}
              />
            )}
          </div>
         
        </div>
      </div>
      {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.vocabularybasedtext}`}
          response={responseData}
          visible={isActionvisible}
          position={"top"}
          setVisible={setIsActionvisible}
          appLink={"/mathstorywordproblems"}
        />
      )}
    </Layout>
  );
}
