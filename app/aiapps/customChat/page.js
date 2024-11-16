"use client";
import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from 'primereact/inputtextarea';
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Commonresponse from '../../common/commonResponse';
import CommonActionExempler from '../../common/CommonActionExempler';
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import { AppCategory, AppId, AppTitle } from '../../../components/helper/enum'
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {

  const items = [
    { label: `${AppTitle.customChat}`, url: '' }
  ];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const copyRef = useRef(null);
  const [Content, setContent] = useState('');
  const [isShowHide, setIsShowHide] = useState(false); 
  const [formDataShow, setFormDataShow] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({})

  const [position, setPosition] = useState('center');

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const appId = AppId.customChat;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT
  const [ip, setIp] = useState("");
  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts


  const handleExample = () =>{
    setContent("You are Romeo from Romeo & Juliet, act as Romeo during the play and give answers about how you’re feeling based on the plot of the play that are realistic so that my class can gain insights into your motivations")
    setFormDataShow(false);
    setVisible(false);
  }

  const validate = () => {
    let err = {}
    let isErr = false;
    if (Content == "" || Content == null || Content == undefined || Content.trim() === '') {
      err.content = 'Please Enter Instruction.'
      isErr = true
    }
    setError(err)
    return isErr
  }

  const responsetoshow = (
    <div ref={copyRef}>
      <b>Update to Make this Assignment Custom Chat (Idea 1):</b>
      <br></br>
      <br></br>
      <b>Assignment:</b> Create a multimedia presentation that explores the
      themes of social justice, identity, and community in the novel &quot;The
      Hate You Give.&quot; Your presentation should include a combination of
      visuals, audio clips, and written reflections.<br></br>
      <br></br>
      <b>Explanation:</b> By shifting the format of the assignment from a
      traditional essay to a multimedia presentation, students are required to
      engage with the material in a more creative and critical manner, making it
      challenging for AI to replicate the depth of analysis and interpretation
      needed.
      <b>Update to Make this Assignment Custom chat (Idea 2):</b>
      <br></br>
      <br></br>
      <b>Assignment:</b> Write a dialogue between two characters from &quot;The
      Hate You Give&quot; discussing a pivotal moment in the book. Your dialogue
      should reflect the characters&apos; personalities, motivations, and
      differing perspectives on the event.<br></br>
      <br></br>
      <b>Explanation:</b> This modification prompts students to demonstrate a
      deep understanding of the characters and themes in the novel through
      creative writing. Crafting a meaningful conversation between characters
      requires nuanced interpretation and critical thinking, making it difficult
      for AI to generate authentic dialogue without human insight and analysis.
      <br></br>
      <br></br>
    </div>
  );

  const exemplarToShow = <div>
    <b>Update to Make this Assignment Custom Chat (Idea 1):</b>
    <br></br>
    <br></br>
    <b>Assignment:</b> Create a multimedia presentation that explores the
    themes of social justice, identity, and community in the novel &quot;The
    Hate You Give.&quot; Your presentation should include a combination of
    visuals, audio clips, and written reflections.<br></br>
    <br></br>
    <b>Explanation:</b> By shifting the format of the assignment from a
    traditional essay to a multimedia presentation, students are required to
    engage with the material in a more creative and critical manner, making it
    challenging for AI to replicate the depth of analysis and interpretation
    needed.
    <b>Update to Make this Custom Chat (Idea 2):</b>
    <br></br>
    <br></br>
    <b>Assignment:</b> Write a dialogue between two characters from &quot;The
    Hate You Give&quot; discussing a pivotal moment in the book. Your dialogue
    should reflect the characters&apos; personalities, motivations, and
    differing perspectives on the event.<br></br>
    <br></br>
    <b>Explanation:</b> This modification prompts students to demonstrate a
    deep understanding of the characters and themes in the novel through
    creative writing. Crafting a meaningful conversation between characters
    requires nuanced interpretation and critical thinking, making it difficult
    for AI to generate authentic dialogue without human insight and analysis.
    <br></br>
    <br></br>
  </div>

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return
    }
    try{
      setLoading(true)
      setFormDataShow(true);
      setIsShowHide(true);
      setIsExVisible(true)
    }
    catch{
      setLoading(false)
      toast.error("Something Went Wrong");
    }
  }

  const handleClear = () => {
    setFormDataShow(false);
    setIsShowHide(false);
    setIsExVisible(false)
    setContent('')
  }
  const handleAction = () => {
    setIsActionvisible(true)
  }



  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);

  };

  const hideExemplerPopup = () => {
    // Implement your logic to hide the popup, if needed
    setIsPopupVisible(false);
  };

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb className='custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]' model={items} home={home} />
        <div className='grid grid-cols-12 gap-2'>
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified isGenerate={loading} />
          <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
            <button disabled={loading} className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw]'
              onClick={() => handleClear()}
           >
              <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
              Reset and Clear
            </button>
            <button disabled={loading} className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full'
              onClick={() => handleExample()}
            >
              <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
              Try New
            </button>
            {isPopupVisible &&
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                title={`Example ${AppTitle.customChat}`}
                response={responsetoshow}
                contentRef={copyRef}
                appLink={'/customChat'} 
              />}
          </div>
          </div>
          <div className='xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg'>

            {!formDataShow &&
              <div>
                <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">{AppTitle.customChat}</h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">Create a {AppTitle.customChat} to interact with based on any criteria that you choose!</p>
                </div>

                {
                    isShowHide && !loading ?
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                  }

                </div>
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Instructions for the Chatbot:<span style={{ color: 'red' }}>*</span></label>

                    <InputTextarea autoResize placeholder="Type..." value={Content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full" />
                    {error.content ? <span className="mt-2" style={{ color: 'red' }}>{error.content}</span> : <></>}

                  </div>
                </form>
                <Note/>
                <div>
                  <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
                    onClick={(e) => {
                      handleGenerate(e)
                    }}>
                    Generate with BrixAI
                  </button>
                </div>
              </div>
            }
            {/* Generated Response */}
            {formDataShow &&

              <Commonresponse
                title={`${AppTitle.customChat}`}
                onHide={() => setFormDataShow(false)}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responsetoshow}
                contentRef={copyRef}
                appLink={'/customChat'} 
              />
            }
          </div>

          
        </div>
      </div>
      {isActionvisible &&
        <CommonActionExempler
          title={`Generated ${AppTitle.customChat}`}
          response={responsetoshow}
          visible={isActionvisible}
          position={position}
          setVisible={setIsActionvisible}
          appLink={'/customChat'} 
          contentRef={copyRef}/>
          }

    </Layout>
  );
}
