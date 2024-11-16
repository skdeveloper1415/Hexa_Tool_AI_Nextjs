import React, { useState } from 'react';
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import Image from "next/image";
import ShareButtons from '../app/common/ShareButtons';
import UploadPopup from './popup/uploadpopup';

const CommonAction = (props) => {
  const [shareButtonVisible, setShareButtonVisible] = useState(false);
  const [openUploadPopup, setOpenUploadPopup] = useState(false)

  const handleCopy = () => {
    let divText;
    
    if (props.multiStepAssessment || props.aiSocialStories || props.realworld || props.aiAcademicContent) {
     
      divText = document.getElementById('copytextcontent').innerHTML;
      divText = divText.replaceAll("<div>", "<p>");
      divText = divText.replaceAll("</div>", "</p>");
      if (divText && props.multiStepAssessment) {
                const topicRegex = /Topic:\s*<\/strong>\s*<span>(.+?)<\/span>/;
                const match = divText.match(topicRegex);
                if (match && match.length > 1) {
                    const extractedTopic = match[1].trim();
                    props.setAssignments(prevAssignment => ({
                        ...prevAssignment,
                        title: extractedTopic // Update the topic in the assignment state
                    }));
                } else {
                    console.log("Topic not found in the response.");
                }
            }
    } else {
      divText = document.getElementById('copytextcontent').innerText;
    }
   
     if(props.isStudentFeedback === true){
      props.setDataEditor(props.response)
     }else  if(props?.isMultiChoiceVisible){
      //  props?.setLoading(true)
      props?.setisGoogleFormCreated(true)
      props.setDataEditor(props?.instruction)
      props.setquizInstruction(props.response)

      // props.setBooleanValue(false)
    }else if(props?.isRubric){
      const text =document.getElementById('copytextcontent').innerHTML;
      props.setDataEditor(text)
    }
     else{
      props.setDataEditor(divText)

     }
    props.onHide()
  if(props.setBooleanValue &&!props?.isMultiChoiceVisible){
    props.setBooleanValue(true);
  }
   
  };


const openUpload = async () => {
  setOpenUploadPopup(true)
}

  return (
    <div>
      <Dialog className="custom-popup" header={false} visible={props.visible} position={props.position} style={{ width: '80vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}  onHide={() => { props.isExVisible ? props.onClose() : props.setVisible(false)}} >
        <div className=''>

      
          <h2 className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px] 3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold"><b>{props.title}</b></h2>
          <div className='relative h-full' style={{display:"flex"}}>
          <ScrollPanel 
          // style={{ width: '100%', maxHeight: 'calc(100vh - 280px)' }}
          style={{ width: '100%', height: '27vw', paddingBottom:'50px'}}
          >
            <div className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054] mb-[100px] 2xl:mb-[100px] 3xl:mb-[1.458vw]" id='copytextcontent'>
              {props.response}
            </div>

          </ScrollPanel>
            <div className="z-10 absolute left-0 right-4 bottom-0 pt-2 bg-white mt-[24px] xl:mt-[1.24vw] flex gap-[11px] justify-end mb-4">
            <button onClick={openUpload} className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#344054] font-medium border border-[#C8CBD0] bg-[#fff] rounded-lg xl:px-[0.677vw] px-[13px] xl:py-[0.573vw] py-[11px] justify-center items-center'
            style={{ display: !props.isExVisible ==  true ? 'flex':'none'}}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/upload.svg" alt="Upload" />
              Upload
            </button>
            <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#344054] font-medium border border-[#C8CBD0] bg-[#fff] rounded-lg xl:px-[0.677vw] px-[13px] xl:py-[0.573vw] py-[11px] justify-center items-center' onClick={() => setShareButtonVisible(true)}
            style={{ display: !props.isExVisible ==  true ? 'flex':'none'}}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/share.svg" alt="Share" />
              Share
            </button>
            <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#344054] font-medium border border-[#C8CBD0] bg-[#fff] rounded-lg xl:px-[0.677vw] px-[13px] xl:py-[0.573vw] py-[11px] justify-center items-center'
            style={{ display: !props.isExVisible ==  true ? 'flex':'none'}}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/save.svg" alt="Save" />
              Save for Later
            </button>
            <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
            onClick={() => {handleCopy(); props?.setisFormIconDisable &&props?.setisFormIconDisable(false)}} style={{ display: !props.isExVisible ==  true ? 'flex':'none'}}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/edit1-white.svg" alt="Use This Template" />
          {props?.isMultiChoiceVisible  ? 'Add In Google Form':'Use This Template'}
            </button>
            <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
             onClick={() => {props.setIsPopupVisible(false), props.onClose()}} style={{
              display: props.isExVisible ==  true ? 'flex':'none'}}
              >
              Close
            </button>
          </div>
          </div>

          </div>
      </Dialog>
      <ShareButtons title={props.title} description={props?.contentRef?.current?.innerText} url={process.env.NEXT_PUBLIC_BASE_URL+`/aiapps/${props.appLink}`} visible={shareButtonVisible} setShareButtonVisible={setShareButtonVisible}/>
     {openUploadPopup&& <UploadPopup
        visible={openUploadPopup}
        appName={props.title}
        onHides={() => {setOpenUploadPopup(!openUploadPopup)}}
        response={props?.response}
      />}
    </div>
  );
}

export default CommonAction;
