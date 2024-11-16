"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateLessonPlanAPi } from "../../actions/lessonPlan";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import { GRADE, STANDARD,AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [error, setError] = useState({})
  const items = [
    { label: `${AppTitle.lessonPlan}`, url: "" },
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [position, setPosition] = useState('center');
  const [criteria, setCriteria] = useState("");
  const [isShowHide, setIsShowHide] = useState(false); 
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [standard, setStandard] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [lessonPlanData, setLessonPlanData] = useState(null)
  const [exempler, setExempler] = useState(false);

  const appId = AppId.lessonPlan;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT
  const [ip, setIp] = useState("");
  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const lessonPlanRef = useRef(null);

  const handleExample = () =>{
    setSelectedGrade({ name: 'Grade 6', code: '8' })
    setStandard({
      name: "Next Generation Science Standards (NGSS): These standards provide guidelines for teaching science and have been adopted by a number of states.",
      code: "NGSS"
  },)
    setTopic("How do food webs describe the ways in which animals in an ecosystem are related?")
    setCriteria("This lesson will be an introductory lesson where students are being introduced to the  roles that particular organisms play in an ecosystem, including producers, primary consumers, secondary consumers and decomposers.")
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setExempler(false)
  }
  const validate = () => {
    let err = {};
    let isErr = false;

    if (!selectedGrade || selectedGrade.name.trim() === "") {
      err.grade = 'Please Select Grade Level.';
      isErr = true;
    }

    if (!topic || topic.trim() === "") {
      err.topic = 'Please Enter Topic, Standard or Objective.';
      isErr = true;
    }

    if (!standard || standard.code.trim() === "") {
      err.standard = 'Please Select Standards Set to Align to.';
      isErr = true;
    }

    setError(err);
    return isErr;
  };

  const generateLessonPlan = async (data) => {
    try {

      const response = await generateLessonPlanAPi(data);

      if (response.data.code == 200) {

        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
         setLoading(false)
          return;
        }

        setLessonPlanData(response.data.data.data);
        setLoading(false);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
      toast.error("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        toast.error("Something Went Wrong");
  
        setLoading(false)
        setFormDataShow(false);
        setFormShow(true);
        toast.error(error)
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      return
    }
    setLoading(true);
    const payload = {
      grade: selectedGrade.name,
      title: topic,
      standards: standard.code,
    };
    generateLessonPlan(payload);
  };

  const createResponse = lessonPlanData && (
    <div ref={lessonPlanRef} >
      <h1>
        <b>{lessonPlanData?.title}</b>
      </h1>
      <br />
      <h2>
        <b>Objective: </b>

        {lessonPlanData?.objective && (
          lessonPlanData.objective
        )}
      </h2>
      <br />

      <h2>
        <b>Assessment:</b>
        <br />
      </h2>
      {lessonPlanData?.assessment && (
        <p>{lessonPlanData.assessment}</p>
      )}

      <h2>
        <b>Key Points:</b>
        <br />
      </h2>
      {lessonPlanData?.key_points && (
        <ul>
          {lessonPlanData.key_points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      <h2>
        <b>Opening:</b>
        <br />
      </h2>
      {lessonPlanData?.opening?.description && (
        <p>{lessonPlanData.opening.description}</p>
      )}

      <h2>
        <b>Introduction to New Material:</b>
        <br />
      </h2>
      {lessonPlanData?.introduction_to_new_material?.description && (
        <p>{lessonPlanData.introduction_to_new_material.description}</p>
      )}
      {lessonPlanData?.introduction_to_new_material?.anticipate_misconception && (
        <p>
          Anticipate Misconception:{" "}
          {lessonPlanData.introduction_to_new_material.anticipate_misconception}
        </p>
      )}

      <h2>
        <b>Guided Practice:</b>
        <br />
      </h2>
      {lessonPlanData?.guided_practice?.description && (
        <p>{lessonPlanData.guided_practice.description}</p>
      )}

      <h2>
        <b>Independent Practice:</b>
        <br />
      </h2>
      {lessonPlanData?.independent_practice?.description && (
        <p>{lessonPlanData.independent_practice.description}</p>
      )}

      <h2>
        <b>Closing:</b>
        <br />
      </h2>
      {lessonPlanData?.closing?.description && (
        <p>{lessonPlanData.closing.description}</p>
      )}

      <h2>
        <b>Extension Activity:</b>
        <br />
      </h2>
      {lessonPlanData?.extension_activity?.description && (
        <p>{lessonPlanData.extension_activity.description}</p>
      )}

      <h2>
        <b>Homework:</b>
        <br />
      </h2>
      {lessonPlanData?.homework?.description && (
        <p>{lessonPlanData.homework.description}</p>
      )}

      <h2>
        <b>Standard(s):</b>
        <br />
      </h2>
      {lessonPlanData?.standards_addressed && (
        <ul>
          {lessonPlanData.standards_addressed.map((standard, index) => (
            <li key={index}>{standard}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const handleEdit = () => {
    setFormDataShow(false);
    setFormShow(true);
  };
  const handleAction = () => {
    setVisible(true);
    setExempler(false);
  }
  const handleClear = () => {
    setSelectedGrade(null)
    setStandard('')
    setTopic('')
    setError({})
    setCriteria('')
    setFormShow(true);
    setIsShowHide(false);
    setVisible(false);
    setExempler(false);
    setFormDataShow(false);
    setLessonPlanData(null)

  }

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
            {formShow && (<>
              <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
              <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.lessonPlan}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.lessonPlan}
                    </p>
                  </div>

              {
                   isShowHide == true ? (isShowHide && !loading &&
                    <button className='flex w-[160px] xl:w-[150px] 3xl:w-[8.454vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>)
                    :<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
                  }

              </div>
              {loading ? <div className="flex justify-center items-center" >
                <ProgressSpinner />
              </div > :
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Grade Level: <span className="text-[red] ml-1">*</span>
                    </label>
                    <Dropdown
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.value)}
                      options={GRADE}
                      optionLabel="name"
                      placeholder="Select"
                      filter
                      className="w-full md:w-14rem"
                    />

                    {error.grade && <div className="text-red-500">{error.grade}</div>}

                  </div>
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Topic, Standard or Objective:  <span className="text-[red] ml-1">*</span>
                    </label>
                    <InputTextarea
                      autoResize
                      placeholder="Type..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      rows={3}
                      className="w-full "
                    />
                    {error.topic && <div className="text-red-500">{error.topic}</div>}

                  </div>
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Additional Criteria for the content(Optional):
                    </label>
                    <InputTextarea
                      autoResize
                      placeholder="Type..."
                      value={criteria}
                      onChange={(e) => setCriteria(e.target.value)}
                      rows={3}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Standards Set to Align to:  <span className="text-[red] ml-1">*</span>
                    </label>
                    <Dropdown
                      value={standard}
                      onChange={(e) => setStandard(e.value)}
                      options={STANDARD}
                      optionLabel="code"
                      placeholder="Select"
                      filter 
                      className="w-full md:w-14rem"
                    />

                    {error.standard && <div className="text-red-500">{error.standard}</div>}

                  </div>

                  {/* <Note/> */}

                  <div>
                    <button
                      className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full disabled:opacity-40"
                      onClick={(e)=>handleSubmit(e)}
                      disabled={loading}
                    >
                      {loading ? "Please Wait ....." : "Generate with BrixAI"}
                    </button>
                  </div>
                </form>
              }
            </>
            )}
            {formDataShow &&

              <Commonresponse
                title={`${AppTitle.lessonPlan}`}
                onHide={() => {
                  setFormDataShow(false)
                  setFormShow(true)
                }}
                appLink={'/lessonPlan'}
                handleAction={handleAction}
                response={createResponse}
                handleEdit={handleEdit}
                contentRef={lessonPlanRef}              
              />
            }
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}>
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/resetclear.svg"
                alt="Reset and clear"
              />
              Reset and Clear
            </button>
            <button onClick={(() => handleExample())} disabled={loading} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading == true ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
      </div>

      {visible &&
        <CommonActionExempler
          title={`Generated ${AppTitle.lessonPlan}`}
          response={createResponse}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={lessonPlanRef}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={'/lessonPlan'} />
      }

{renderPopup()}
    </Layout>
  );
}
