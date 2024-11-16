"use client";
import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from 'primereact/inputtextarea';
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from 'primereact/inputtext';
import { toast } from "react-toastify";
import Commonresponse from '../../common/commonResponse'
import { ProgressSpinner } from 'primereact/progressspinner';
import { generateEmailResponder } from '../../actions/E-mailResponderApi/index'
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import { AppCategory, AppId, AppTitle } from '../../../components/helper/enum'
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";



export default function Index() {

  const items = [
    { label: `${AppTitle.EmailResponder}`, url: '' }
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const [authorName, setAuthorName] = useState('')
  const [Content, setContent] = useState('')
  const contentRef = useRef(null);
  const [isShowHide, setIsShowHide] = useState(false);

  const [emailcontent, setEmailcontent] = useState('')
  const [isExVisible, setIsExVisible] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resultResponse, setResult] = useState({
    subject: '',
    content: ''
  })
  const [loader, setLoader] = useState(false);
  const [exempler, setExempler] = useState(false);
  const handleEdit = () => {
    setFormDataShow(false);
  };
  const [visibleRubricTable, setVisibleRubricTable] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);



  const appId = AppId.EmailResponder;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const response = (
    resultResponse ? (
      <div ref={contentRef}>
        {resultResponse?.subject &&
          <h3>
            <b>Subject: </b>
            {resultResponse?.subject}
          </h3>}
        {resultResponse?.content &&
          <h3>
            {resultResponse.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </h3>
        }
      </div>
    ) : (
      ""
    )

  )
  const [error, setError] = useState({})

  const validate = () => {
    let err = {}
    let isErr = false;
    if (authorName === "" || authorName === null || authorName.trim() === "") {
      err.authorName = "Please Enter Receipient Name.";
      isErr = true;
    }
    if (emailcontent === "" || emailcontent === null || emailcontent.trim() === "") {
      err.emailcontent = "Please Enter Email Content.";
      isErr = true;
    }
    if (Content === "" || Content === null || Content.trim() === "") {
      err.Content = "Please Enter Respond Content.";
      isErr = true;
    }
    setError(err)
    return isErr;

  }

  const handleGenerate = async () => {

    if (validate()) {
      return
    }
    setLoader(true)
    try {
      let payload = {
        "author": authorName,
        "emailcontent": emailcontent,
        "summary": Content
      }
      let response = await generateEmailResponder(payload)
      if (response?.data.code == 200) {
        setResult({
          ...resultResponse,
          subject: response?.data.data?.subject,
          content: response?.data.data?.content
        })
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false)
          return;
        }
        setFormDataShow(true)
        setVisibleRubricTable(true);
        setIsShowHide(true);
        setShowExemplarButton(true)
      } else {
        console.log(response?.error);
        toast.error("Something went wrong");
      }
      setLoader(false)

    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setLoader(false)
        let msg = response?.error ?? response?.message ?? "Something went wrong"
        toast.error("Something went wrong")
      }
    }
  }

  const handleReset = () => {
    setAuthorName('');
    setContent("");
    setVisible(false)
    setEmailcontent("")
    setResult({
      subject: '',
      content: ''

    })
    setIsShowHide(false);
    setFormDataShow(false);
    setExempler(false)
    setError({});
    setShowExemplarButton(false)
  }

  const setExamples = () => {
    setTitle(`Example for Generated ${AppTitle.EmailResponder}`)
    setAuthorName('John')
    setEmailcontent("I’m a PhD student at the University of Central Florida and I was wondering if we could partner. I would like to do a feasibility study using MagicSchool AI for my dissertation. Would you be interested in this partner?")
    setContent("That sounds great lets set up time")
    setError({})
    setFormDataShow(false);
    setVisible(false);
    setIsActionvisible(false);
    setIsExVisible(false);
  };

  const [title, setTitle] = useState('')

  const handleAction = () => {
    // setVisible(true)
    setTitle('Generated Email Responder')
    setIsActionvisible(true)
  }

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb className='custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]' model={items} home={home} />
        <div className='grid grid-cols-12 gap-2'>
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified
            isGenerate={loader}
          />
          <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
            <button className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] ${loader == true ? "opacity-50 cursor-not-allowed" : ""} `}
              disabled={loader}
              onClick={
                () => {
                  if (formDataShow) {
                    setFormDataShow(false);
                    handleReset();
                  } else {
                    handleReset();
                  }
                }

              }>
              <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
              Reset and Clear
            </button>
            <button className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full ${loader == true ? "opacity-50 cursor-not-allowed" : ""}`}
              // onClick={(() => { setIsExVisible(true), setVisible(true), setExempler(true), setTitle("Example for Generated E-mail Responder") })}
              // disabled={!resultResponse?.content == "" ? false : true || !showExemplarButton}
              disabled={loader}
              onClick={() => setExamples()}              >
              <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
              Try New
            </button>
          </div>
          </div>


          {
            <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
              {!formDataShow && (
                <div className="">
                  <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                    <div>
                      <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">{AppTitle.EmailResponder}</h3>
                      <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">Generate a customized professional e-mail communication in response to an email that you received.</p>
                    </div>
                    {
                      isShowHide && !loader ?
                      <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                        onClick={() => {
                          setFormDataShow(true);
                        }}
                      >
                        <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                        Hide  Prompt
                      </button>  : <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Communication}</div>
                    }
                  </div>
                  {loader ? (
                    <div className="h-[500px] flex justify-center">
                      <ProgressSpinner />
                    </div>
                  ) : (
                    <div>
                      <form className="grid xl:gap-[1.25vw] gap-[18px]">
                        <div>
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Receipient Name:<span className="text-[red] ml-1">*</span></label>
                          <InputText value={authorName} placeholder="Type..." onChange={(e) => setAuthorName(e.target.value)} className="w-full" />
                          {error.authorName ? <span style={{ color: 'red' }}>{error.authorName}</span> : <></>}
                        </div>

                        <div>
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Email Content:<span className="text-[red] ml-1">*</span></label>
                          <InputTextarea autoResize placeholder="Type..." value={emailcontent} onChange={(e) => setEmailcontent(e.target.value)} rows={8} className="w-full" />
                          {error.emailcontent ? <span style={{ color: 'red' }}>{error.emailcontent}</span> : <></>}

                        </div>

                        <div>
                          <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Respond Content:<span className="text-[red] ml-1">*</span></label>
                          <InputTextarea autoResize placeholder="Type..." value={Content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full" />
                          {error.Content ? <span style={{ color: 'red' }}>{error.Content}</span> : <></>}

                        </div>
                      </form>
                      <Note/>
                      <div className="mt-[40px]">
                        <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
                          onClick={() => handleGenerate()}>
                          Generate with BrixAI
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {formDataShow && (
                <Commonresponse
                  title={`${AppTitle.EmailResponder}`}
                  onHide={() => { setFormDataShow(false) }}
                  handleAction={handleAction}
                  response={response}
                  handleEdit={handleEdit}
                  contentRef={contentRef}
                  appLink={'/E-mailResponder'}
                />
              )}
            </div>
          }
          
        </div>
      </div>

      {visible && <CommonActionExempler contentRef={contentRef}
        onClose={() => { setVisible(false), setExempler(false) }}
        setIsPopupVisible={setVisible}
        position={"center"}
        visible={visible}
        isExVisible={isExVisible}
        title={`Example for Generated ${AppTitle.EmailResponder}`}
        response={response}
        appLink={'/E-mailResponder'} />}
      {isActionvisible &&
        <CommonActionExempler
          title={`Generated ${AppTitle.EmailResponder}`}
          response={response}
          visible={isActionvisible}
          position={"top"}
          setVisible={setIsActionvisible}
          contentRef={contentRef}
          appLink={'/E-mailResponder'} />}
      {renderPopup()}

    </Layout>
  );
}
