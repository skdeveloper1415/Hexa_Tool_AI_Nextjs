import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton, WhatsappShareButton } from 'react-share';
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";

const ShareButtons = ({ title, description, url, visible, setShareButtonVisible }) => {
  const handleShareByEmail = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}`;
    window.open(emailUrl, '_blank');
  };

  return (
    <div>
      <Dialog className="custom-popup" header={false} visible={visible} style={{ width: '30vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={() => setShareButtonVisible(false)}>
        <h2 className="text-[#101828] 3xl:text-[0.938vw] 2xl:text-[18px] xl:text-[16px] font-semibold border-b border-[#C8CBD0] xl:pb-[1.04vw] pb-[20px] xl:mb-[1.04vw] mb-[20px]">Share AI {title}</h2>
        <div className="flex flex-col">
          <ScrollPanel style={{ width: '100%', maxHeight: 'calc(100vh - 280px)' }}>

            <div className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054] flex items-center justify-center gap-3 h-[100px]">
              {/* Facebook Share Button */}
              <FacebookShareButton url={url} quote={title}>
                <div className='w-12 h-12 border border-[#1877f2] rounded-full text-white flex items-center justify-center bg-[#1877f2] cursor-pointer transition-all'><i className='hexatoolfacebook text-[20px]'></i></div>
              </FacebookShareButton>

              {/* Twitter Share Button */}
              <TwitterShareButton url={url} title={title}>
                <div className='w-12 h-12 border border-black rounded-full text-white flex items-center justify-center bg-black cursor-pointer transition-all'><i className='hexatoolx text-[20px]'></i></div>
              </TwitterShareButton>

              {/* LinkedIn Share Button */}
              <LinkedinShareButton url={url} title={title} summary={description}>
                <div className='w-12 h-12 border border-[#0a66c2] rounded-full text-white flex items-center justify-center bg-[#0a66c2] cursor-pointer transition-all	'><i className='hexatoollinkedin text-[20px]'></i></div>
              </LinkedinShareButton>

              {/* Whatsapp Share Button */}
              <WhatsappShareButton url={url} title={title} description={description}>
                <div className='w-12 h-12 border border-[#25d366] rounded-full text-white flex items-center justify-center bg-[#25d366] cursor-pointer transition-all	'><i className='hexatoolwhatsapp text-[26px]'></i></div>
              </WhatsappShareButton>

              {/* Mail Share Button */}
              {/* <EmailShareButton url={url} subject={title}> */}
                <div onClick={handleShareByEmail}  className='w-12 h-12 border border-[#1570EF] rounded-full text-white flex items-center justify-center bg-[#1570EF] cursor-pointer transition-all	'><i className='hexatoolmail text-[20px]'></i></div>
              {/* </EmailShareButton> */}
              
            </div>

          </ScrollPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default ShareButtons;
