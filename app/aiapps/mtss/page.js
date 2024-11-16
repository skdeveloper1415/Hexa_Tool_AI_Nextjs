"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateClassroomLessonPlanAPi } from "../../actions/classroomLessonPlan";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import { GRADE, AppId, AppTitle, AppDesc,Tier,AppCategory } from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import { InputTextarea } from "primereact/inputtextarea";

export default function Index() {
  const [error, setError] = useState({})
  const items = [
    { label: `${AppTitle.mtss}`, url: "" },
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [tier, setTier] = useState(null);
  const [position, setPosition] = useState('center');
  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lessonPlanData, setLessonPlanData] = useState(null)
  const [exempler, setExempler] = useState(false);
  const [areaOfSupport, setAreaOfSupport] = useState("");

  const appId = AppId.mtss;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT
  const [ip, setIp] = useState("");
  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const studentAbcPerformance = useRef(null);

  const handleExample = () => {
    setSelectedGrade(GRADE[8])
    setTier(Tier[0])
    setAreaOfSupport("How do food webs describe the ways in which animals in an ecosystem are related?")
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setExempler(false)
  }
  const validate = () => {
    let err = {};
    let isErr = false;

    if (!selectedGrade || selectedGrade.name.trim() === "") {
      // err.grade = 'Please Select Grade Level.';
      toast.error('Please Select Grade Level.')
      isErr = true;
    }
    else if (!tier || tier.name.trim() === "") {
      // err.topic = 'Please Enter Topic, Standard or Objective.';
      toast.error('Please Select Tier.')
      isErr = true;
    }
    else if (!areaOfSupport || areaOfSupport.trim() === "") {
      // err.topic = 'Please Enter Topic, Standard or Objective.';
      toast.error('Please Enter Area Of Support.')
      isErr = true;
    }

    setError(err);
    return isErr;
  };

  const generateClassroomLessonPlan = async (data) => {
    try {

      const response = await generateClassroomLessonPlanAPi(data);

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
      if (error.message != 'Operation canceled by the user.') {
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
      tier: tier ? tier.name : null,
      areaOfSupport: areaOfSupport ? areaOfSupport : null,
    };
    generateClassroomLessonPlan(payload);
  };

  const createResponse = lessonPlanData && (
    <div ref={studentAbcPerformance} >
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

      {lessonPlanData?.opening?.ELD_support && (
        <p> <b>ELD Support: </b>{lessonPlanData.opening.ELD_support}</p>
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
          <b>Anticipate Misconception:{" "}</b>
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

      {lessonPlanData?.guided_practice?.SEL_connection && (
        <p> <b>SEL Connection:</b> {lessonPlanData.guided_practice.SEL_connection}</p>
      )}

      <h2>
        <b>Independent Practice:</b>
        <br />
      </h2>
      {lessonPlanData?.independent_practice?.description && (
        <p>{lessonPlanData.independent_practice.description}</p>
      )}

      {lessonPlanData?.independent_practice?.ISTE_integration && (
        <p><b>ISTE Integration:</b> {lessonPlanData.independent_practice.ISTE_integration}</p>
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
    setTier(null)
    setAreaOfSupport("")
    setError({})
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
                alt="Try Now"
              />
              Try Now
            </button>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (<>
              <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">

                  <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium mb-2">
                    <b>{AppTitle.mtss}</b>
                  </h3>

                  <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    {AppDesc.mtss}
                  </p>
                </div>

                {/*  <div className="xl:col-span-2">
                  <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#101828] font-medium">
                    Instructional Design
                  </h3>
                </div> */}

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
                    </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.dataInsights}</div>

                }

              </div>
              {loading ? <div className="flex justify-center items-center" >
                <ProgressSpinner />
              </div > :

                <form>
                  <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-4">
                    <div className="grid col-span-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
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
                      {/*  {error.grade && <div className="text-red-500">{error.grade}</div>} */}
                    </div>
                  
                    <div className="grid col-span-3">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Tier:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={tier}
                        onChange={(e) => setTier(e.value)}
                        options={Tier}
                        optionLabel="name"
                        placeholder="Select"
                        filter
                        className="w-full md:w-14rem"
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                    Area Of Support:  <span className="text-[red] ml-1">*</span>
                    </label>
                    <InputTextarea
                      autoResize
                      placeholder="Type..."
                      value={areaOfSupport}
                      onChange={(e) => setAreaOfSupport(e.target.value)}
                      rows={3}
                      className="w-full"
                    />
                    {/*  {error.topic && <div className="text-red-500">{error.topic}</div>} */}

                  </div>
                  <div>
                    <button
                      className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full disabled:opacity-40"
                      onClick={handleSubmit}
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
                title={`${AppTitle.mtss}`}
                onHide={() => {
                  setFormDataShow(false)
                  setFormShow(true)
                }}
                appLink={'/mtss'}
                handleAction={handleAction}
                response={createResponse}
                handleEdit={handleEdit}
                contentRef={studentAbcPerformance}
              />
            }
          </div>
        </div>
      </div>

      {visible &&
        <CommonActionExempler
          title={`Generated ${AppTitle.mtss}`}
          response={createResponse}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={studentAbcPerformance}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={'/mtss'} />
      }

      {renderPopup()}
    </Layout>
  );
}
