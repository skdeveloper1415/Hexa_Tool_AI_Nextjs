
import { ScrollPanel } from 'primereact/scrollpanel';
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
// import Link from "next/link";
import Image from "next/image";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import TextToSpeech from '../../app/common/TextToSpeech';
import ShareButtons from '../../app/common/ShareButtons';

const CommonResponsePopup = (props) =>  {


  const [value, setValue] = useState('');
  const [text, setText] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [shareButtonVisible, setShareButtonVisible] = useState(false);

  const handleEdit = () => {
    // props.handleEdit()
    props.onHide()
  }

  const handleCopyText = () => {
    // Get the text content of the div
    const divText = document.getElementById('copytext').innerText;

    // Create a temporary textarea element to hold the text
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = divText;

    // Append the textarea to the body (it needs to be in the DOM for execCommand to work)
    document.body.appendChild(tempTextarea);

    // Select the text inside the textarea
    tempTextarea.select();

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextarea);

    // Optionally, notify the user or perform any other action after copying
    
    toast.success("Text copied!")
  }
  const handleSpeakerText = () => {
    setIsShow(true)
    const content = props?.contentRef?.current?.innerText;
    setText(content)
  };
  const ref = useRef(null);

  return (
    <>
      <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
        <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#101828] font-medium">{props?.title}</h3>
        <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
          onClick={() => handleEdit()}>
          <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
          Edit  Prompt
        </button>
      </div>
      {/* <ScrollPanel style={{ width: '100%', height: 'calc(100vh - 100px)' }} className="custombar1"> */}
      <ScrollPanel style={{ width: '100%' }} className="custombar1">

        <div ref={ref} className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]" id='copytext'>
          {props?.response ? props?.response : <span style={{ display: 'flex', justifyContent: 'center' }}>No Data Available</span>}
        </div>
      </ScrollPanel>
      <div className="flex justify-between items-center mt-[14px] xl:mt-[0.938vw]">
        <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center' onClick={handleSpeakerText}>
          <Image width="20" height="20" className='mr-[8px]' src="/images/speaker.svg" alt="speaker" />
          Speaker
        </button>
        <div className="flex items-center xl:gap-[0.525vw] gap-[10px]">
          <button>
            <Image width="20" height="20" src="/images/thumb-up.svg" alt="Thumbs up" />
          </button>
          <button>
            <Image width="20" height="20" src="/images/thumb-down.svg" alt="Thumbs down" />
          </button>
        </div>
      </div>
      {
        isShow && <TextToSpeech text={text} />
      }
      <div className="mt-[49px] xl:mt-[2.552vw] flex gap-[11px]">
        <div className="relative search-voice w-[55%] lg:w-[60%]  2xl:w-[66%]">
          <InputText value={value} placeholder="Type here..." onChange={(e) => setValue(e.target.value)} className="w-full pr-8" />
          <button className="absolute right-[10px] top-[13px]">
            <Image width="20" height="20" src="/images/mic.svg" alt="Mic" />
          </button>
        </div>
        <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#C8CBD0] bg-[#fff] rounded-lg xl:px-[0.677vw] px-[13px] xl:py-[0.573vw] py-[11px] justify-center items-center' onClick={() => handleCopyText()}>
          <Image width="20" height="20" src="/images/copy_icon.svg" alt="copy" />
        </button>
        <button onClick={() => setShareButtonVisible(true)} className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#C8CBD0] bg-[#fff] rounded-lg xl:px-[0.677vw] px-[13px] xl:py-[0.573vw] py-[11px] justify-center items-center'>
          <Image width="20" height="20" src="/images/send.svg" alt="Send" />
        </button>
        <ShareButtons title={props?.title} description={ref?.current?.innerText} 
        url={process.env.NEXT_PUBLIC_BASE_URL+`/aiapps/${props.appLink}`}
        visible={shareButtonVisible} setShareButtonVisible={setShareButtonVisible}/>

        <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center ml-[8px] items-center'

          onClick={() => props.handleAction()}>
          <Image width="20" height="20" className='mr-[8px]' src="/images/circle-plus-white.svg" alt="Action" />
          Action
        </button>
        {/* <button onClick={() => handleCopyText()}>Copy Text</button> */}
      </div>
    </>
  )
}
export default CommonResponsePopup;