import Image from 'next/image'
import { Dropdown } from 'primereact/dropdown'
import React, { useRef, useState } from 'react'
import { LANGUAGE } from '../helper/enum'
//import QuillEditor from '../../app/manageclass/myclasses/class/home/editorpage';
import { InputTextarea } from 'primereact/inputtextarea';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Avatar } from 'primereact/avatar';
import { getDataFromLocalStorage } from '../helper/commonFunction';
import { sendEmailAPI } from '../../app/actions/EmailAPI';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../../app/manageclass/myclasses/class/home/editorpage'));

export default function ReplyMail({ setShowReply,rowData }) {

    console.log("rowDatarowData:-",rowData);

    const [selectedLanguage, setSelectedLanguage] = useState({ name: 'English', code: 'Russian' });
    const [selectedLanguage2, setSelectedLanguage2] = useState({ name: 'English', code: 'Russian' });
    const [instruction, setInstruction] = useState("");
    const [translate, setTranslate] = useState();
    const [translate2, setTranslate2] = useState();
    const [translateShow, setTranslateShow] = useState();
    function handleInstruction(e) { setInstruction(e); }
    function handleClick(e) {
        if (translateShow)
            setTranslateShow(false)
        else setTranslateShow(true)
    }
    const op = useRef(null);

    const clearError = () => {
        setError((prevError) => ({
            ...prevError,
            instruction: "", // Clear error message
        }));
    };
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    const validate = () => {
        let err = {}
        let isErr = false;
   
        if (instruction=="" || instruction== "<p><br></p>") {
            err.instruction = 'Please Add Instruction and Template.'
            isErr = true
        }
        
        setError(err)
        return isErr
    }
    const sendEmail = async () => {
        try {

            
            if (validate()) {
                return
            }

            setIsLoading(true);
            let accessToken = getDataFromLocalStorage("access_token");
            let userInfo = getDataFromLocalStorage('user_data') ? JSON.parse(getDataFromLocalStorage('user_data')) : ''


            if (!accessToken) {
                return
            }

            function getEmailFromResponse(response) {
                const emailRegex = /<([^>]+)>/;
                const match = response.match(emailRegex);
              
                if (match && match.length > 1) {
                  return match[1];
                } else {
                  return response;
                }
              }
            const email = getEmailFromResponse(rowData?.name);


            const payload = {
                "accessToken": accessToken,
                "from": userInfo?.email,
                "to": [email],
                "cc": [],
                "bcc": [],
                "subject": rowData?.title,
                "text": "Hiii",
                "html": instruction
            }

            const response = await sendEmailAPI(payload);
            if (response.code == '200') {
                toast.success("Email Send Successfully.");
                setShowReply(false);
            } else {
                const msg = response?.message ?? response?.error ?? "Something Went Wrong.";
                toast.error(msg);
            }
            setIsLoading(false);
        } catch (error) {
            const msg = error?.message ?? "Something Went Wrong.";
            toast.error(msg);
            setIsLoading(false);
        }
    }

    return (
        <div className='relative'>
            <div className='absolute -top-8'>
                <div className='flex items-center gap-[16px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                    <button className='flex items-center gap-2'>
                        <Image src={'/images/archive_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                        <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Archived</div>
                    </button>
                    <button className='flex items-center gap-2'>
                        <Image src={'/images/book_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                        <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Read</div>
                    </button>
                    <button className='flex items-center gap-2'>
                        <Image src={'/images/book_unread_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                        <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Unread</div>
                    </button>
                    <button className='flex items-center gap-2'>
                        <Image src={'/images/delete_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                        <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Delete</div>
                    </button>
                </div>
            </div>

            <div className='border border-[#C8CBD0] px-[40px] xl:px-[35px] 3xl:px-[2.083vw] py-[21px] xl:py-[18px] 3xl:py-[1.094vw] bg-white rounded-[6px]'>
                <div className='flex justify-between items-center border-b border-b-[#EBEBEB] pb-[18px] xl:pb-[16px] 3xl:pb-[0.938vw]'>
                    <div className='inline-flex items-center gap-[15px] xl:gap-[12px] 3xl:gap-[0.781vw]'>
                        
                    <button onClick={()=>setShowReply(false)}><i className="pi pi-arrow-left" style={{ color: 'slateblue' }}></i></button>
                        <div>
                            {/* <Image src={`/images/profile_img_mail.png`}
                                width={42} height={42}
                                className='h-[42px] xl:h-[40px] 3xl:h-[2.188vw] w-[42px] xl:w-[40px] 3xl:w-[2.188vw] rounded-full'
                                alt='' /> */}
                    <Avatar label={rowData?.name.charAt(0).toUpperCase()} shape="circle" style={{ backgroundColor: '#2196F3', color: '#ffffff' }}/>

                        </div>
                        <div>
                            <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#101828]">
                                {rowData?.name}
                            </div>
                            <div className="3xl:text-[0.625vw] xl:text-[10px] text-[12px] font-normal text-[#667085]">
                                2st Grade
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-[12px]'>
                        <div className='border-r border-r-[#09DBC2] pr-[12px]'>
                            <Image src={'/images/translate_icon.svg'} width={24} height={24} className='w-[24px] xl:w-[22px] 3xl:w-[1.25vw] h-[24px] xl:h-[22px] 3xl:h-[1.25vw]' alt=''></Image>
                        </div>
                        <div className='orange_dropdonw'>
                            <Dropdown
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.value)}
                                options={LANGUAGE}
                                optionLabel="name"
                                className="w-full md:w-14rem"
                            />
                        </div>
                        <button className='pr-5 pl-3'>
                            <Image src={'/images/convert_icon.svg'} width={16} height={16} className='w-[16px] 3xl:w-[0.833vw] h-[16px] 3xl:h-[0.833vw]' alt=''></Image>

                        </button>
                        <div className='orange_dropdonw'>
                            <Dropdown
                                value={selectedLanguage2}
                                onChange={(e) => setSelectedLanguage2(e.value)}
                                options={LANGUAGE}
                                optionLabel="name"
                                className="w-full md:w-14rem"
                            />
                        </div>
                        <div className='col-span-1 place-self-center flex items-center'>
                            <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#1570EF] flex items-center gap-[20px] xl:gap-[22px] 3xl:gap-[1.042vw]">
                                <Image src={'/images/arrow_left.svg'} width={16} height={16} className='w-[16px] 3xl:w-[0.833vw] h-[16px] 3xl:h-[0.833vw] -mt-1 cursor-pointer' alt=''></Image>
                                <button><i className='hexatoolstart-outline'></i></button>
                                <button><i className='hexatoolthree-dots'></i></button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='mt-[22px] xl:mt-[20px] 3xl:mt-[1.146vw] border-b border-b-[#EBEBEB] pb-[13px] xl:pb-[11px] 3xl:pb-[0.677vw]'>
                    <div className='flex justify-between items-center mb-[16px] xl:mb-[14px] 3xl:mb-[0.833vw]'>
                        <div className='text-[#101828] text-[24px] xl:text-[20px] 3xl:text-[1.1vw] font-semibold'>
                            {rowData?.title}
                        </div>
                        <div className="3xl:text-[0.729vw] xl:text-[12px] text-[14px] font-normal text-[#667085]">
                            {rowData?.date}
                        </div>
                    </div>
                    <div className='text-[#344054] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-normal'>
                       {rowData?.subtitle}
                    </div>
                </div>
                <div className='mt-[24px] xl:mt-[22px] 3xl:mt-[1.25vw]'>
                    <div className='flex justify-between items-center mb-[13px] xl:mb-[11px] 3xl:mb-[0.677vw]"'>
                        <div className='text-[#101828] text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal'>
                            Reply
                        </div>
                        <button onClick={handleClick} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#1B55AF] font-medium justify-start items-center'>
                            <Image src="/images/translate_icon.svg" width="18" height="18" alt="AI Multi Choice Assessment" />
                            {translateShow && 'Translate Close'}
                            {!translateShow && 'Translate'}
                        </button>
                    </div>
                    {translateShow &&
                        <div className='grid grid-cols-2 gap-[40px] xl:gap-[38px] 3xl:gap-[2.083vw] mb-[13px] xl:mb-[11px] 3xl:mb-[0.677vw]'>
                            <div className='relative'>
                                <div className='absolute top-2 left-3 orange_dropdonw grey_dropdonw'>
                                    <Dropdown
                                        value={selectedLanguage2}
                                        onChange={(e) => setSelectedLanguage2(e.value)}
                                        options={LANGUAGE}
                                        optionLabel="name"
                                        className="w-full md:w-14rem"
                                    />
                                </div>
                                <InputTextarea
                                    autoResize
                                    placeholder=""
                                    value={translate}
                                    onChange={(e) => setTranslate(e.target.value)}
                                    rows={3}
                                    className="w-full pt-[35px]"
                                />
                            </div>
                            <div className='relative'>
                                <div className='absolute top-2 left-3 orange_dropdonw grey_dropdonw'>
                                    <Dropdown
                                        value={selectedLanguage2}
                                        onChange={(e) => setSelectedLanguage2(e.value)}
                                        options={LANGUAGE}
                                        optionLabel="name"
                                        className="w-full md:w-14rem"
                                    />
                                </div>
                                <InputTextarea
                                    autoResize
                                    placeholder=""
                                    value={translate2}
                                    onChange={(e) => setTranslate2(e.target.value)}
                                    rows={3}
                                    className="w-full pt-[35px]"
                                />
                            </div>
                        </div>
                    }
                    <div className='relative'>
                        <div className='absolute top-2 right-4 orange_dropdonw texteditor_dropdonw'>
                            <div className='flex items-center gap-3'>
                                <Dropdown
                                    value={selectedLanguage2}
                                    onChange={(e) => setSelectedLanguage2(e.value)}
                                    options={LANGUAGE}
                                    optionLabel="name"
                                    className="w-full md:w-14rem"
                                />
                                <button>
                                    <Image src="/images/mic_black_icon.svg" width="18" height="18" alt="mic_black_icon" />
                                </button>
                            </div>
                        </div>
                        <div className='custom-editor cust-editor'>
                        <QuillEditor value={instruction}
                            onChange={(e) => { handleInstruction(e) }}
                            onClearError={clearError}
                            height={200}>
                        </QuillEditor>
                        {error.instruction ? <span style={{ color: 'red' }}>{error.instruction}</span> : <></>}

                        </div>
                    </div>
                    <div className='mt-[47px] xl:mt-[45px] 3xl:mt-[2.448vw]'>
                        <div className='flex items-center justify-end gap-[16px] xl:gap-[14px] 3xl:gap-[0.833vw]'>
                            <button onClick={(e) => op.current.toggle(e)} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.733vw] xl:text-[13px] text-[16px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[7px] 3xl:py-[0.421vw]'>
                                Delete
                            </button>
                            <OverlayPanel className='custoverlay shadow-lg' ref={op}>
                               <ul className='space-y-2 text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.833vw] font-medium'>
                                    <li className='cursor-pointer'>Delete and Start Over</li>
                                    <li className='cursor-pointer'>Delete</li>
                                    <li className='cursor-pointer'>Cancel</li>
                               </ul>
                            </OverlayPanel>
                            <button onClick={() => setShowReply(false)} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.733vw] xl:text-[13px] text-[16px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[7px] 3xl:py-[0.421vw]'>
                                Save as Draft
                            </button>
                            <button disabled={isLoading} onClick={sendEmail} className="3xl:text-[0.733vw] xl:text-[13px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[8px] xl:py-[7px] 3xl:py-[0.421vw]"
                            >
                                {isLoading ? "Please Wait" : "Send"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
