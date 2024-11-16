"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateClassroomLessonPlanAPi } from "../../actions/classroomLessonPlan";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import { ProgressSpinner } from "primereact/progressspinner";
import { GRADE, STANDARD, AppId, AppTitle, AppDesc, ELD, SEL, ISTE, AppCategory } from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAIModified from "../../../components/BackToAIModified";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import { FileUpload } from "primereact/fileupload";
import FileUploadComponent from "../../../components/FileUploadComponent";

export default function Index() {
  const [error, setError] = useState({})
  const items = [
    { label: `${AppTitle.aiClassroomLessonPlanning}`, url: "" },
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [selectedISTE, setSelectedISTE] = useState(null);
  const [selectedSEL, setSelectedSEL] = useState(null);
  const [selectedELD, setSelectedELD] = useState(null);
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

  const appId = AppId.classroomLessonPlanning;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT
  const [ip, setIp] = useState("");
  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const lessonPlanRef = useRef(null);

  const handleExample = () => {
    setSelectedGrade(GRADE[8])
    setSelectedELD(ELD[2])
    setSelectedSEL(SEL[0])
    setSelectedISTE(ISTE[1])
    setSelectedAssessment('Summative Assessment')
    setStandard({
      name: "Next Generation Science Standards (NGSS): These standards provide guidelines for teaching science and have been adopted by a number of states.",
      code: "NGSS"
    },)
    setTopic("Objective: Students will analyze data from various ecosystems to understand how resource availability (such as food, water, and shelter) affects the population sizes and interactions among different organisms.")
    setCriteria("Provide additional support during data analysis, such as guided questions or step-by-step instructions.")
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setExempler(false)
  }
  const validate = () => {
    let err = {};
    let isErr = false;

    if (!selectedGrade || selectedGrade.name.trim() === "") {
      toast.error('Please Select Grade Level.')
      isErr = true;
    }
    else if (!topic || topic.trim() === "") {
      toast.error('Please Enter Topic, Standard or Objective.')
      isErr = true;
    }
    else if (!standard || standard.code.trim() === "") {
      toast.error('Please Select Standards Set to Align to.')
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
      title: topic,
      standards: standard.code,
      eld: selectedELD?.name,
      sel: selectedSEL?.code,
      iste: selectedISTE?.name,
      assessment: selectedAssessment ? selectedAssessment : null,
    };
    generateClassroomLessonPlan(payload);
  };

  const createResponse = lessonPlanData && (
    <div ref={lessonPlanRef} >
      <h2>
        <b>{lessonPlanData?.title}</b>
      </h2>
      <br />
      <h4>
        <b>Objective: </b>
      </h4>
      {lessonPlanData?.objective && (
        <p>{lessonPlanData.objective}</p>
      )}

      <h4>
        <b>Assessment:</b>
        <br />
      </h4>
      {lessonPlanData?.assessment && (
        <p>{lessonPlanData.assessment}</p>
      )}

      <h4>
        <b>Key Points:</b>
        <br />
      </h4>
      {lessonPlanData?.key_points && (
        <ul>
          {lessonPlanData.key_points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}

      <h4>
        <b>Opening:</b>
        <br />
      </h4>
      {lessonPlanData?.opening?.description && (
        <p>{lessonPlanData.opening.description}</p>
      )}

      {lessonPlanData?.opening?.ELD_support && (
        <p> <b>ELD Support: </b>{lessonPlanData.opening.ELD_support}</p>
      )}

      <h4>
        <b>Introduction to New Material:</b>
        <br />
      </h4>
      {lessonPlanData?.introduction_to_new_material?.description && (
        <p>{lessonPlanData.introduction_to_new_material.description}</p>
      )}
      {lessonPlanData?.introduction_to_new_material?.anticipate_misconception && (
        <p>
          <b>Anticipate Misconception:{" "}</b>
          {lessonPlanData.introduction_to_new_material.anticipate_misconception}
        </p>
      )}

      <h4>
        <b>Guided Practice:</b>
        <br />
      </h4>
      {lessonPlanData?.guided_practice?.description && (
        <p>{lessonPlanData.guided_practice.description}</p>
      )}

      {lessonPlanData?.guided_practice?.SEL_connection && (
        <p> <b>SEL Connection:</b> {lessonPlanData.guided_practice.SEL_connection}</p>
      )}

      <h4>
        <b>Independent Practice:</b>
        <br />
      </h4>
      {lessonPlanData?.independent_practice?.description && (
        <p>{lessonPlanData.independent_practice.description}</p>
      )}

      {lessonPlanData?.independent_practice?.ISTE_integration && (
        <p><b>ISTE Integration:</b> {lessonPlanData.independent_practice.ISTE_integration}</p>
      )}
      <h4>
        <b>Closing:</b>
        <br />
      </h4>
      {lessonPlanData?.closing?.description && (
        <p>{lessonPlanData.closing.description}</p>
      )}

      <h4>
        <b>Extension Activity:</b>
        <br />
      </h4>
      {lessonPlanData?.extension_activity?.description && (
        <p>{lessonPlanData.extension_activity.description}</p>
      )}

      <h4>
        <b>Homework:</b>
        <br />
      </h4>
      {lessonPlanData?.homework?.description && (
        <p>{lessonPlanData.homework.description}</p>
      )}

      <h4>
        <b>Standard(s):</b>
        <br />
      </h4>
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
    setSelectedELD(null)
    setSelectedSEL(null)
    setSelectedISTE(null)
    setSelectedAssessment(null)
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
            <button onClick={(() => handleExample())} disabled={loading} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center mb-[32px] xl:mb-[1.667vw] ${loading == true ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Try Now"
              />
              Try Now
            </button>
            <FileUploadComponent />
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (<>
              <div className="bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">

                  <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium mb-2">
                    <b>{AppTitle.aiClassroomLessonPlanning}</b>
                  </h3>

                  <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    {AppDesc.aiClassroomLessonPlanning}
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
                    </button>) : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>

                }

              </div>
              {loading ? <div className="flex justify-center items-center" >
                <ProgressSpinner />
              </div > :

                <form>
                  <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                    <div className="grid col-span-2">
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
                    <div className="grid col-span-2">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        ELD (English Language Development):
                      </label>
                      <Dropdown
                        value={selectedELD}
                        onChange={(e) => setSelectedELD(e.value)}
                        options={ELD}
                        optionLabel="name"
                        placeholder="Select"
                        filter
                        className="w-full md:w-14rem"
                      />
                    </div>
                    <div className="grid col-span-2">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        SEL (Social Emotional Learning):
                      </label>
                      <Dropdown
                        value={selectedSEL}
                        onChange={(e) => setSelectedSEL(e.value)}
                        options={SEL}
                        optionLabel="name"
                        placeholder="Select"
                        filter
                        className="w-full md:w-14rem"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 xl:gap-[1.25vw] gap-[18px] mx-0 mb-3">
                    <div className="grid col-span-2">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        ISTE (International Society for Technology in Education) Standards:
                      </label>
                      <Dropdown
                        value={selectedISTE}
                        onChange={(e) => setSelectedISTE(e.value)}
                        options={ISTE}
                        optionLabel="name"
                        placeholder="Select"
                        filter
                        className="w-full md:w-14rem"
                      />
                    </div>
                    <div className="grid col-span-2">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-6">
                        Assessment for Learning:

                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={selectedAssessment}
                        onChange={(e) => setSelectedAssessment(e.target.value)}
                        rows={1}
                        className="w-full md:w-14rem"
                      />

                      {/*  <Dropdown
                        value={selectedAssessment}
                        onChange={(e) => setSelectedAssessment(e.value)}
                        options={Assessment}
                        optionLabel="name"
                        placeholder="Select"
                        filter
                        className="w-full md:w-14rem"
                      /> */}
                    </div>

                    <div className="grid col-span-2 gap-2">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[4px]">
                        Standards Set to Align to:<span className="text-[red] ml-1">*</span>
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
                      {/* {error.standard && <div className="text-red-500">{error.standard}</div>} */}
                    </div>
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
                      className="w-full"
                    />
                    {/*  {error.topic && <div className="text-red-500">{error.topic}</div>} */}

                  </div>
                  <div className="mb-2">
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[8px]">
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
                title={`${AppTitle.aiClassroomLessonPlanning}`}
                onHide={() => {
                  setFormDataShow(false)
                  setFormShow(true)
                }}
                appLink={'/classroomLessonPlanning'}
                handleAction={handleAction}
                response={createResponse}
                handleEdit={handleEdit}
                contentRef={lessonPlanRef}
              />
            }
          </div>
        </div>
      </div>

      {visible &&
        <CommonActionExempler
          title={`Generated ${AppTitle.aiClassroomLessonPlanning}`}
          response={createResponse}
          visible={visible}
          position={position}
          setVisible={setVisible}
          contentRef={lessonPlanRef}
          isExVisible={exempler}
          setIsPopupVisible={setVisible}
          onClose={() => setVisible(false)}
          appLink={'/classroomLessonPlanning'} />
      }

      {renderPopup()}
    </Layout>
  );
}
