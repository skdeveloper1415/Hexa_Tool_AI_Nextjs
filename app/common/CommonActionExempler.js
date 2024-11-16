import React, { useState } from 'react';
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import Image from "next/image";
import ShareButtons from './ShareButtons';
import { toast } from "react-toastify";
import UploadPopup from '../../components/popup/uploadpopup';

const CommonActionExempler = (props) => {
  const [shareButtonVisible, setShareButtonVisible] = useState(false);
  const [openUploadPopup, setOpenUploadPopup] = useState(false)

  const handleCopy = () => {

     // Get the text content of the div
     const divText = document.getElementById('copytextcontent').innerText;

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
    toast.success("Content copied to clipboard!");
  };


const openUpload = async () => {
  setOpenUploadPopup(true)
}

  return (
    <div>
      <Dialog className="custom-popup mt-20" header={false} visible={props.visible} position={props.position} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}  onHide={() => { props.isExVisible ? props.onClose() : props.setVisible(false)}} >
        <div className=''>

      
          <h2 className="text-[#101828] 3xl:text-[0.938vw] 2xl:text-[18px] xl:text-[16px] font-semibold border-b border-[#C8CBD0] xl:pb-[1.04vw] pb-[20px] xl:mb-[1.04vw] mb-[20px]">{props.title}</h2>
          <div className='relative h-full'>
          <ScrollPanel 
          // style={{ width: '100%', maxHeight: 'calc(100vh - 280px)' }}
          style={{ width: '100%',height:'500px', paddingBottom:'50px'}}
          >
            <div className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054] mb-[100px] 2xl:mb-[100px] 3xl:mb-[1.458vw]" id='copytextcontent'>
              {props.response}
            </div>

          </ScrollPanel>
            <div className="z-10 absolute left-0 right-4 bottom-0 pt-2 bg-white mt-[24px] xl:mt-[1.24vw] flex gap-[11px] justify-end">
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
            onClick={handleCopy} style={{ display: !props.isExVisible ==  true ? 'flex':'none'}}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/edit1-white.svg" alt="Use This Template" />
              Copy Text
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

export default CommonActionExempler;
