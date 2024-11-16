"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { AppCategory, AppId, AppTitle, GRADE } from "../../../components/helper/enum";
import { ProgressSpinner } from "primereact/progressspinner";
import { toast } from "react-toastify";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateSelComptencyAPI } from "../../actions/SelCompetency";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [error, setError] = useState({});
  const [gradeLevel, setGradeLevel] = useState(null);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);

  const selCompetencyList = [
    { name: "Self Management", code: "1" },
    { name: "Self-Awareness", code: "2" },
    { name: "Decision Making", code: "3" },
    { name: "Relationship Skills", code: "4" },
  ];
  const [topic, setTopic] = useState("");
  const [selCompetency, setSelCompetency] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [objective, setObjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [opening, setOpening] = useState();
  const [instruction, setInstruction] = useState("");
  const [guidedPractice, setGuidedPractice] = useState("");
  const [indPractice, setIndpractice] = useState("");
  const [closing, setClosing] = useState("");
  const [exActivity, setExActivity] = useState("");
  const [homework, setHomeWork] = useState("");
  const [data, setData] = useState()
  const contentRef = useRef(null);
  const appId = AppId.selobservation;
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
  const responsetoshow = (
    data? (
      <div ref={contentRef}>
      <div>
        <h3>
          <b>Objective: </b>
        </h3>
        <h3>{objective}</h3>
      </div>
      <div>
        <h3>
          <b>Assessment: </b>
        </h3>
        <h3>{assessment}</h3>
      </div>

      <div>
        <h3>
          <b>Key Points: </b>
        </h3>
        <ul>
          <li>
            {keyPoints?.map((point, index) => (
              <ul key={index}><h3>{point}</h3></ul>
            ))}
          </li>
        </ul>
      </div>

      <div>
        <h3>
          <b>Opening: </b>
        </h3>
        <h3>{opening}</h3>
      </div>

      <div>
        <h3>
          <b>Introduction To New Material: </b>
        </h3>
        <h3>{instruction}</h3>
      </div>

      <div>
        <h3>
          <b>Guided Practice: </b>
        </h3>
        <h3>{guidedPractice}</h3>
      </div>
      <div>
        <h3>
          <b>Independent Practice: </b>
        </h3>
        <h3>{indPractice}</h3>
      </div>
      <div>
        <h3>
          <b>Closing: </b>
        </h3>
        <h3>{closing}</h3>
      </div>

      <div>
        <h3>
          <b>Extension Activity: </b>
        </h3>
        <h3>{exActivity}</h3>
      </div>

      <div>
        <h3>
          <b>HomeWork: </b>
        </h3>
        <h3>{homework}</h3>
      </div>
    </div>
    ) :
    (
      ""
    )
   
  );

  const items = [{ label: `${AppTitle.selobservation}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const resetAndClear = () => {
    setGradeLevel(null);
    setContent("");
    setTopic("");
    setSelCompetency("");
    if (formDataShow) {
      setFormDataShow(false);
      setIsShowHide(false);
      setFormShow(true);
    } else {
      setIsShowHide(false);

    }
    setShowExemplarButton(false);
    setError({});
  };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (gradeLevel === null) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (selCompetency === "") {
      err.selCompetency = "Please Enter SEL Competency.";
      isErr = true;
    }
    if (topic === "" || topic === null || topic.trim() === "") {
      err.topic = "Please Enter Topic, Standard, Objective.";
      isErr = true;
    }
    if (content === null || content === "" || content.trim() === "") {
      err.content = "Please Select Additional Criteria for the Content.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };
  const handleGenerateSelCompetency = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setLoading(true);
    try {
      const payload = {
        grade: gradeLevel?.name,
        sel_competency: selCompetency.name,
        topic: topic,
        content: content,
      };
      const response = await generateSelComptencyAPI(payload);
      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }

        setObjective(response?.data?.data?.data?.objective);
        setData(response?.data?.data?.data)
        setAssessment(response?.data?.data?.data?.assessment);
        setKeyPoints(response?.data?.data?.data?.key_points);
        setOpening(response?.data?.data?.data?.opening?.description);
        setInstruction(
          response?.data?.data?.data?.introduction_to_new_material?.description
        );
        setGuidedPractice(response?.data?.data?.data?.guided_practice?.description);
        setIndpractice(response?.data?.data?.data?.independent_practice?.description);
        setClosing(response?.data?.data?.data?.closing?.description);
        setExActivity(response?.data?.data?.data?.extension_activity?.description);
        setHomeWork(response?.data?.data?.data?.homework?.description);
        setFormDataShow(true);
        setFormShow(false);
        setIsExVisible(true);
        setShowExemplarButton(true);
        setLoading(false);
      setIsShowHide(true);

      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.log('error:', error);
        toast.error("Something went wrong");
        setLoading(false);
      }

    }
  };

  const handleExample = () => {
    setGradeLevel({ name: "Grade 6", code: "8" });
    setTopic(
      "How to manage your actions when you notice yourself having big feelings "
    );
    setSelCompetency({ name: "Self Management", code: "1" });
    setContent(
      "Students will be able to identify strategies to regulate their emotions, set goals, and make responsible decisions when experiencing strong emotions."
    );
    setFormDataShow(false);
    setError({})
    setFormShow(true)
    setVisible(false)
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
              onClick={resetAndClear}
              disabled={loading}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg
            lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center
             mb-5 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF]
               font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px]
                xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
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
               <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div>
                <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                       {AppTitle.selobservation}
                    </h3>
                    <p className="3xl:text-[0.625vw]  text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    Generate a social emotional learning lesson plan for students
                  in any grade level.
                    </p>
                  </div>
                </div>
                {
                    isShowHide && !loading ?
                    <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
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

                     
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ProgressSpinner style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <form className="grid grid-cols-12 xl:gap-[1.25vw] gap-[18px]">
                    <div className="col-span-6">
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
                      {error.grade ? (
                        <span style={{ color: "red" }}>{error.grade}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-span-6">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        SEL Competency:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={selCompetency}
                        onChange={(e) => setSelCompetency(e.value)}
                        options={selCompetencyList.sort((a, b) =>
                          a.name.localeCompare(b.name)
                        )}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.selCompetency ? (
                        <span style={{ color: "red" }}>
                          {error.selCompetency}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-span-12">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Topic, Standard, Objective (be as specific as possible):
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                        <InputTextarea
                          value={topic}
                          autoResize
                          placeholder="How to manage your actions when you notice yourself having big feelings"
                          className="w-full pl-[35px]"
                          onChange={(e) => setTopic(e.target.value)}
                        />
                        {error.topic ? (
                          <span style={{ color: "red" }}>{error.topic}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div className="col-span-12">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Criteria for the Content:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                        <InputTextarea
                          autoResize
                          value={content}
                          placeholder="Type..."
                          className="w-full pl-[35px]"
                          onChange={(e) => setContent(e.target.value)}
                        />
                        {error.content ? (
                          <span style={{ color: "red" }}>{error.content}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="col-span-12">
                    <Note/>
                    </div>
                    <div className="col-span-12">
                      <button
                        disabled={loading}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          setIsExVisible(false);
                          handleGenerateSelCompetency(e);
                        }}
                      >
                        {loading ? "Please Wait..." : "Generate with BrixAI"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

            {formDataShow && (
              <Commonresponse
                title={`${AppTitle.selobservation}`}
                setFormDataShow={setFormDataShow}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => {
                  setVisible(true), setIsExVisible(false);
                }}
                response={responsetoshow}
                setVisible={setVisible}
                contentRef={contentRef}
                appLink={"/selobservation"}
              />
            )}
            {renderPopup()}
          </div>
        
        </div>
        {visible && (
          <CommonActionExempler
            response={responsetoshow}
            setIsPopupVisible={setVisible}
            title={`Generated ${AppTitle.selobservation}`}
            contentRef={contentRef}
            onClose={() => setVisible(false)}
            setVisible={setVisible}
            position={"top"}
            visible={visible}
            appLink={"/selobservation"}
            isExVisible={isExVisible}
          />
        )}
      </div>
    </Layout>
  );
}
