"use client";
import React, { useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import BackToAI from "../../../components/BackToAI";
import { AppCategory, AppTitle } from "../../../components/helper/enum";
import { generateStudentWorkFeedbackAPI } from "../../actions/studentWorkFeedback";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateLetterOfRecommendationAPI } from "../../actions/letterofrecommendationApi";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {

  const [studentPronoun, setStudentPronoun] = useState("");
  const [relationShipToStudent, setRelationShipToStudent] = useState("");
  const [institution, setInstitution] = useState("");
  const [impInfoToInc, setImpInfoToInc] = useState("");

  const items = [
    { label: `${AppTitle.letterofrecommendation}`, url: "" },
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({})
  const [responseData, setResponseData] = useState([]);

  const validate = () => {
    let err = {}
    let isErr = false;

    if (studentPronoun === "") {
      err.studentPronoun = 'Please Enter Student Pronoun.'
      isErr = true
    }
    if (relationShipToStudent === "") {
      err.relationShipToStudent = 'Please Enter Relationship to Student.'
      isErr = true
    }
    if (institution === "") {
      err.institution = 'Please Enter Institution.'
      isErr = true
    }
    if (impInfoToInc === "") {
      err.impInfoToInc = 'Please Enter Important Information in Include.'
      isErr = true
    }

    setError(err)
    return isErr
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      return
    }
    setLoading(true);
    try {
      const payload = {
        "students_pronouns": studentPronoun,
        "relationship": relationShipToStudent,
        "institution": institution,
        "student_strength": impInfoToInc
      }
      const response = await generateLetterOfRecommendationAPI(payload);

      if (response.data.code == '200') {

        let responseData = response.data.data.data ?? [];

        setResponseData(responseData?.letter);
        setLoading(false);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
      } else {
        const message = response?.message ?? response?.error ?? 'Something went wrong'
        toast.error("Something went wrong");
        console.log('message', message);
        setLoading(false);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        const message = error?.message ?? 'Something went wrong';
        toast.error("Something went wrong");
        console.log('message', message);
        setLoading(false);
      }
    }

  };

  const handleClear = () => {
    setStudentPronoun("");
    setRelationShipToStudent("");
    setInstitution("");
    setImpInfoToInc("");
    setError({});
  };

  const copyRef = useRef(null);

  const responseToShow = (
    responseData? (
      <div>
      <div ref={copyRef}>

        {
          Object.entries(responseData).map(([key, value]) => (
            <ul key={key}>
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:{"  "}</strong>
                {typeof value === 'object' ? (
                  <ul>
                    {Object.entries(value).map(([innerKey, innerValue]) => (
                      <li key={innerKey}>
                        <strong>{innerKey.charAt(0).toUpperCase() + innerKey.slice(1)}:</strong> {innerValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </li>
            </ul>
          ))}


      </div>
    </div>
    ):
    (
      ""
    )

);

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
           <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={
                () => {
                  if (formDataShow) {
                    setFormDataShow(false)
                    setFormShow(true)
                    setIsShowHide(false);
                    handleClear()
                  } else {
                    setIsShowHide(false);
                    handleClear()
                  }
                }
              }

              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center
              ${loading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
                setStudentPronoun("He");
                setRelationShipToStudent("Teacher");
                setInstitution("University of Denver");
                setImpInfoToInc("Excellent student, top 5 in his class, two sport athlete (baseball and basketball), NGSS member and student body president.")
                setError({});
                setFormShow(true);
                setFormDataShow(false);
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center
              ${loading == true ? "opacity-50 cursor-not-allowed" : ""}
              `} >
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
                  <div className="xl:col-span-2"> 
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                     {AppTitle.letterofrecommendation}
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    Allows to generate a letter of Recommendation for students to study or work in other places.
                    </p>
                  </div>

                  {
                    isShowHide && !loading ?
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
                  }

                </div>

                {
                  loading ? <div className="flex justify-center items-center h-[300px]"><ProgressSpinner /></div> :

                    <form className="grid grid-cols-12 xl:gap-[1.25vw] gap-[18px]">
                      <div className="col-span-4">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Student Pronouns:<span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">

                          <InputText
                            placeholder="He"
                            value={studentPronoun}
                            onChange={(e) => setStudentPronoun(e.target.value)}
                            rows={5} cols={5}
                            className="w-full relative pl-[35px]"
                          />
                          {error.studentPronoun ? <span style={{ color: 'red' }}>{error.studentPronoun}</span> : <></>}


                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Relationship to Student:<span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">

                          <InputText
                            placeholder="Teacher"
                            value={relationShipToStudent}
                            onChange={(e) => setRelationShipToStudent(e.target.value)}
                            rows={5} cols={5}
                            className="w-full relative pl-[35px]"
                          />
                          {error.relationShipToStudent ? <span style={{ color: 'red' }}>{error.relationShipToStudent}</span> : <></>}


                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Institution:<span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">

                          <InputText
                            placeholder="University of Denver"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            rows={5} cols={5}
                            className="w-full relative pl-[35px]"
                          />
                          {error.institution ? <span style={{ color: 'red' }}>{error.institution}</span> : <></>}


                          <div className="absolute top-[12px] left-[15px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Important Information in Include:<span className="text-[red] ml-1">*</span>
                        </label>
                        <div className="relative">

                          <InputTextarea
                            placeholder="Excellent student, top 5 in his class, two sport athlete (baseball and basketball), NGSS member and student body president"
                            value={impInfoToInc}
                            onChange={(e) => setImpInfoToInc(e.target.value)}
                            rows={3} cols={5}
                            className="w-full relative pr-[40px]"
                          />
                          {error.impInfoToInc ? <span style={{ color: 'red' }}>{error.impInfoToInc}</span> : <></>}


                          <div className="absolute bottom-[25px] right-[29px] xl:right-[32px]">
                            <i className="hexatoolmic"></i>
                          </div>
                        </div>

                      </div>
                      <div className="col-span-12">
                      <Note/>
                      </div>
                      <div className="col-span-12">
                        <button
                          className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                          onClick={handleSubmit}
                        >
                          Generate with BrixAI
                        </button>
                      </div>
                    </form>
                }
              </>
            )}

            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.letterofrecommendation}`}
                  onHide={() => {
                    setFormDataShow(false)
                    setFormShow(true)
                  }}
                  handleAction={() => {
                    setIsActionvisible(true);
                  }}
                  // setIsExVisible={setIsExVisible}
                  response={responseToShow}
                  contentRef={copyRef}
                  appLink={'/letterofrecommendation'}
                />
              </>
            )}

          </div>
         
        </div>

        {isActionvisible && <CommonActionExempler
          title={`Generated ${AppTitle.letterofrecommendation}`}
          response={responseToShow}
          visible={isActionvisible}
          contentRef={copyRef}
          setVisible={setIsActionvisible}
          appLink={'/letterofrecommendation'} />}
      </div>
    </Layout>
  );
}
