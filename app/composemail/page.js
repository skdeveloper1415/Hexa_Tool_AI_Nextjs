"use client"
import React, { useRef, useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Layout from '../../layouts/pagelayout';
import Link from 'next/link';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { LANGUAGE } from '../../components/helper/enum';
import { Dropdown } from 'primereact/dropdown';
//import QuillEditor from '../manageclass/myclasses/class/home/editorpage';
import { RadioButton } from "primereact/radiobutton";
import Image from 'next/image';
import { BreadCrumb } from "primereact/breadcrumb";
import AITools from '../../components/AITools';
import { Dialog } from "primereact/dialog";
import { sendEmailAPI } from '../actions/EmailAPI';
import { toast } from 'react-toastify';
import { getDataFromLocalStorage } from '../../components/helper/commonFunction';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';
import { OverlayPanel } from 'primereact/overlaypanel';
import ProfessionalEmail from '../../components/ProfessionalEmail/page';
import FamilyEmail from '../../components/FamilyEmail/page';
// const QuillEditor = dynamic(() => import('../../app/manageclass/myclasses/class/home/editorpage'));
const QuillEditor = dynamic(() => import('../../app/manageclass/myclasses/class/home/editorpage'),{ssr:false});

export default function Page(props) {
    const [ingredient, setIngredient] = useState('');
    const [ingredient1, setIngredient1] = useState('');

    const router = useRouter()

    const [value, setValue] = useState(null);
    const [instruction, setInstruction] = useState('');
    const [schedule, setSchedule] = useState('');


    // const QuillEditor = dynamic(() => import('../manageclass/myclasses/class/home/editorpage'))
    const Names = [
        { name: 'Tom Hanks', code: 'NY' },
        { name: 'All', code: 'RM' },
    ];
    const items = [
        { label: "My Mail" },
    ];
    const op = useRef(null);
    const home = { label: "Home", url: "/" };
    const [selectedLanguage, setSelectedLanguage] = useState({ name: 'English', code: 'Russian' });
    const [selectedLanguage2, setSelectedLanguage2] = useState({ name: 'English', code: 'Russian' });
    const [translate, setTranslate] = useState();
    const [translate2, setTranslate2] = useState();
    const [translateShow, setTranslateShow] = useState();

    const [error, setError] = useState({});

    function handleInstruction(e) { setInstruction(e); }
    const clearError = () => {
        setError((prevError) => ({
            ...prevError,
            instruction: "", // Clear error message
        }));
    };

    function handleClick(e) {
        if (translateShow)
            setTranslateShow(false)
        else setTranslateShow(true)
    }
    const { quizAssignmentAttachment, attachmentLinks, queAttachbyID, tabId } = props;
    const [visible, setVisible] = useState(false);
    const [showProfessionalEmailPopup, setShowProfessionalEmailPopup] = useState(false);
    const [showFamilyEmailPopup, setShowFamilyEmailPopup] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [subjectValue, setSubjectValue] = useState("");

    const validate = () => {
        let err = {}
        let isErr = false;

        if (subjectValue == "") {
            err.subjectValue = 'Please Enter Subject.'
            isErr = true
        }
        if (instruction == "" || instruction == "<p><br></p>") {
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

            const payload = {
                "accessToken": accessToken,
                "from": userInfo?.email,
                "to": ["adesai@hexalytics.com"],
                "cc": [],
                "bcc": [],
                "subject": subjectValue,
                "text": "Hiii",
                "html": instruction
            }

            const response = await sendEmailAPI(payload);
            if (response.code == '200') {
                toast.success("Email Send Successfully.");
                router.push("/mymail");
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
        <Layout>
            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>

                <BreadCrumb
                    className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
                    model={items}
                    home={home}
                />
                <div className='text-[#101828] text-[28px] font-semibold leading-[38px] 3xl:text-[1.563vw]'>My Mail</div>


                <div className='flex justify-between items-center mt-[39px] 3xl:mt-[2.031vw]'>
                    <div className='text-[#1B55AF] py-[8px] 3xl:py-[0.417vw] px-[14px] 3xl:px-[0.729vw] font-medium border border-[#1B55AF] rounded-lg text-[14px] 3xl:text-[0.729vw]'>
                        <Link href="/mymail" className='flex items-center' ><i className='pi pi-angle-double-left mr-2'></i><span className='text-[#1B55AF]'>Back to Mail</span></Link>
                    </div>
                    <div className='text-[#1B55AF] py-[8px] 3xl:py-[0.417vw] px-[14px] 3xl:px-[0.729vw] font-medium border border-[#1B55AF] rounded-lg text-[14px] 3xl:text-[0.729vw]'>
                        <Link href="" onClick={() => setVisible(true)} className='flex items-center' ><Image src="/images/highlight.svg" width="18" height="18" alt="AI Multi Choice Assessment" className='mr-2' /><span className='text-[#1B55AF]'>AI Email Generator</span></Link>
                    </div>
                </div>

                <div className='grid grid-cols-1 mt-[44px] 3xl:mt-[2.292vw] md:grid-cols-3 bg-white rounded-md h-full border border-[#C8CBD0]'>
                    <div className='col-span-2 border border-r-[#C8CBD0]'>
                        <div className="p-[10px] md:p-[20px] lg:p-[25px] xl:p-[30px] 3xl:p-[2.083vw]">
                            <div className="w-full">
                                <div className="space-y-[20px] xl:space-y-[15px] 3xl:space-y-[1.042vw]">
                                    <div className="">
                                        <div className='flex justify-between'>
                                            <div className="text-sm xl:text-[0.729vw] mb-1 font-medium text-[#344054]">Send To </div>
                                            <div className="text-sm xl:text-[0.729vw] mb-1 font-medium text-[#667085]">cc  cco</div>
                                        </div>

                                        <div className="customDropdown">
                                            <Dropdown value={value} onChange={(e) => setValue(e.target.value)} filter options={Names} optionLabel="name" placeholder="Tom Hanks " className="w-full placeholder:text-[#E57200]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm xl:text-[0.729vw] mb-1 font-medium text-[#344054]">Subject </div>
                                        <div>
                                            <InputText
                                                value={subjectValue} onChange={(e) => {
                                                    setSubjectValue(e.target.value); setError((prevError) => ({
                                                        ...prevError,
                                                        subjectValue: "", // Clear error message
                                                    }));
                                                }}
                                                className="placeholder:text-[#667085] w-full rounded-md sm:text-sm border border-[#D1D1D1]" placeholder="Type Here" type="text" />
                                            {error.subjectValue ? <span style={{ color: 'red' }}>{error.subjectValue}</span> : <></>}

                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm xl:text-[0.729vw] mb-1 font-medium text-[#344054]">Message </div>
                                        </div>
                                        <div className="h-full">
                                            <div className='mt-[24px] xl:mt-[22px] 3xl:mt-[1.25vw] relative'>
                                                <div className='absolute top-[-50px] left-[20px] md:top-[8px] md:right-[20px] '>
                                                    <div className='flex justify-end items-center relative gap-3'>
                                                        <button onClick={handleClick} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#1B55AF] font-medium justify-start items-center'>
                                                            <Image src="/images/translate_icon.svg" width="18" height="18" alt="AI Multi Choice Assessment" />
                                                            {translateShow && 'Translate Close'}
                                                            {!translateShow && 'Translate'}
                                                        </button>
                                                        <div className='text-[#1B55AF] py-[4px] 3xl:py-[0.217vw] px-[6px] 3xl:px-[0.313vw] font-medium border border-[#1B55AF] rounded-md text-[14px] 3xl:text-[0.729vw]'>
                                                            <Link href="" className='flex items-center' ><Image src="/images/highlight.svg" width="18" height="18" alt="AI Multi Choice Assessment" className='mr-2' /><span className='text-[#1B55AF]'>AI Translater</span></Link>
                                                        </div>
                                                    </div>
                                                    {translateShow &&
                                                        <div className='grid grid-cols-2 gap-[40px] xl:gap-[38px] 3xl:gap-[2.083vw] mb-[13px] xl:mb-[11px] 3xl:mb-[0.677vw] pt-[25px]'>
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

                                            {/* <div className='custom-editor '>
                                                <QuillEditor value={instruction} onChange={(e) => { handleInstruction(e); }} height={300}>
                                                </QuillEditor>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='flex justify-start items-center gap-[30px] 3xl:gap-[1.563vw] schedule-btn'>
                                        <div className='text-[#344054] font-medium text-[14px] 3xl:text-[0.729vw]'>Schedule</div>
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-wrap gap-3">
                                                {/* <div className="flex align-items-center">
                                                    <RadioButton inputId="schedule1" name="status" value="Immediately" onChange={(e) => setSchedule(e.value)} checked={schedule === 'Immediately'} className='text-[#E57200] text-sm' />
                                                    <label htmlFor="schedule1" className="ml-2 text-[#344054] font-medium text-[14px] 3xl:text-[0.729vw]">Immediately</label>
                                                </div>
                                                <div className="flex align-items-center">
                                                    <RadioButton inputId="schedule2" name="status" value="SelectDate" onChange={(e) => setSchedule(e.value)} checked={schedule === 'Date'} disabled />
                                                    <label htmlFor="schedule2" className="ml-2 text-[#C6CBD2]  font-medium text-[14px] 3xl:text-[0.729vw]">Select Date</label>
                                                </div> */}

                                                <div className="flex align-items-center">
                                                    <RadioButton
                                                        className='custCreatePost custRadio'
                                                        inputId="ingredient1" name="Immediately" value="immediately"
                                                        onChange={(e) => setIngredient(e.value)}
                                                        checked={ingredient === 'immediately'}
                                                    />
                                                      <label htmlFor="schedule1" className="ml-2 text-[#344054] font-medium text-[14px] 3xl:text-[0.729vw]">Immediately</label>
                                                </div>
                                                <div className="flex align-items-center">
                                                    <RadioButton
                                                        className='custCreatePost custRadio'
                                                        inputId="ingredient2" name="Immediately" value="immediately"
                                                        onChange={(e) => setIngredient(e.value)}
                                                        checked={ingredient === 'Select Date'}
                                                        disabled
                                                    />
                                                      <label htmlFor="schedule2" className="ml-2 text-[#C6CBD2]  font-medium text-[14px] 3xl:text-[0.729vw]">Select Date</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border border-[#E4E7EC] rounded-lg bg-[#F9FAFB] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] py-[6px] xl:py-[0.313vw] px-[14px] xl:px-[0.729vw]'>
                                            <div className='text-[#98A2B3] text-[16px] 3xl:text-[0.833vw] font-normal leading-6'>Select Date & Time</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center justify-end mt-[46px] xl:mt-[2.396vw]">
                                <div className="flex space-x-[16px]">
                                    <div  className="w-full min-w-[122px] border border-[#1B55AF] text-[#1B55AF] rounded-md py-2 block text-[14px] font-medium 2xl:text-[0.729vw] text-center hover:bg-[#1B55AF] hover:text-[#fff]" onClick={(e) =>{e.stopPropagation(), op.current.toggle(e)}}>Delete</div>
                                    <div><Link href="" className="w-full min-w-[122px] border border-[#1B55AF] text-[#1B55AF] rounded-md py-2 block text-[14px] font-medium 2xl:text-[0.729vw] text-center hover:bg-[#1B55AF] hover:text-[#fff]">Save as Draft</Link></div>

                                    <button onClick={sendEmail} disabled={isLoading} className="w-full min-w-[122px] border border-[#FF7F01] text-[#fff] rounded-md py-2 block text-[14px] font-medium 2xl:text-[0.729vw] text-center bg-[#FF7F01] hover:bg-[#fff] hover:text-[#FF7F01]">{isLoading ? "please wait" : "Send"}</button>

                                </div>
                            </div>
                            <OverlayPanel className='custoverlay shadow-lg' ref={op}>
                               <ul className='space-y-2 text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.833vw] font-medium'>

                                    <li className='cursor-pointer'>Delete and Start Over</li>
                                    <li className='cursor-pointer'>Delete</li>
                                    <li className='cursor-pointer'>Cancel</li>
                               </ul>
                            </OverlayPanel>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className=" p-[10px] md:p-[15px] xl:p-[20px] 3xl:p-[1.302vw]">
                            {/* <div className="text-xs 3xl:text-[0.729vw] font-medium text-[#101828] leading-6">Tools</div> */}
                            <div className='w-full'>
                                <AITools
                                    tabId={tabId}
                                    // question={question}
                                    // isFormIconDisable={isFormIconDisable}
                                    //  setMaterialLinks={setAssighmentAttachLinks} 
                                    attachmentLinks={attachmentLinks}
                                />
                            </div>
                            {/* <div className="flex items-center flex-wrap gap-[5px] mt-[13px]">
                                <div className='p-[12px] md:p-[14px] lg:p-[16px] xl:p-[18px] 3xl:p-[0.938vw] bg-[#FFFCF8] border border-[#FFD8B2] rounded-md'>
                                    <i className="hexatoolcamera-outline text-[#E57200] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 3xl:text-[1.563vw]"></i>
                                </div>
                                <div className='p-[12px] md:p-[14px] lg:p-[16px] xl:p-[18px] 3xl:p-[0.938vw] bg-[#FFFCF8] border border-[#FFD8B2] rounded-md'>
                                    <i className="hexatoolvideo-outline text-[#E57200] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 3xl:text-[1.563vw]"></i>
                                </div>
                                <div className='p-[12px] md:p-[14px] lg:p-[16px] xl:p-[18px] 3xl:p-[0.938vw] bg-[#FFFCF8] border border-[#FFD8B2] rounded-md'>
                                    <i className="hexatoolpen text-[#E57200] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 3xl:text-[1.563vw]"></i>
                                </div>
                                <div className='p-[12px] md:p-[14px] lg:p-[16px] xl:p-[18px] 3xl:p-[0.938vw] bg-[#FFFCF8] border border-[#FFD8B2] rounded-md'>
                                    <i className="hexatoolupload-file text-[#E57200] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 3xl:text-[1.563vw]"></i>
                                </div>
                                <div className='p-[12px] md:p-[14px] lg:p-[16px] xl:p-[18px] 3xl:p-[0.938vw] bg-[#FFFCF8] border border-[#FFD8B2] rounded-md'>
                                    <i className="hexatoolfile-atteched text-[#E57200] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 3xl:text-[1.563vw]"></i>
                                </div>
                            </div> */}
                            <div className='mt-[33px] xl:mt-[1.719vw] space-y-[10px]'>
                                <div className="text-xs 3xl:text-[0.729vw] font-medium text-[#101828] leading-6">Uploaded Items</div>
                                <div className='border border-[#C6CBD2] rounded-md p-[10px] 3xl:p-[0.521vw] flex justify-between items-center'>
                                    <div className='flex justify-start items-center gap-2'>
                                        <i className='hexatoolcamera-outline text-[#FF8B1A] w-5'></i>
                                        <div className='text-xs 3xl:text-[0.729vw] font-medium text-[#344054] leading-6'>Photo-14234.jpg</div>
                                    </div>
                                    <div><i className='pi pi-trash text-[#FFBF80]'></i></div>
                                </div>
                                <div className='border border-[#C6CBD2] rounded-md p-[10px] 3xl:p-[0.521vw] flex justify-between items-center'>
                                    <div className='flex justify-start items-center gap-2'>
                                        <i className='hexatoolmic text-center text-[#FF8B1A] w-5'></i>
                                        <div className='text-xs 3xl:text-[0.729vw] font-medium text-[#344054] leading-6'>Audio-3.wav</div>
                                    </div>
                                    <div><i className='pi pi-trash text-[#FFBF80]'></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog className='custom-popup custom-popup1' visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <div className=' pt-5 md:pt-[10px] xl:pt-[15px] 3xl:[1.25vw]'>
                        <div className='space-y-[20px] 3xl:space-y-[1.042vw] text-center'>
                            <span className='p-[12px] bg-[#FFF2E5] border border-[#FFFCF8] rounded-full'><i className='hexatoolright-tick text-[#E57200]'></i></span>
                            <div className='text-[#101828] font-medium text-[18px] 3xl:text-[0.938vw] text-center'>Generate AI Email Template</div>
                            <div className='flex justify-between items-center gap-[30px] 3xl:gap-[1.563vw]'>
                                <button onClick={()=>{setShowProfessionalEmailPopup(true);setVisible(false);}} className='bg-[#F9FBFD] rounded-md border border-[#BACCE7] p-[10px] md:p-[20px] xl:p-[30px] 3xl:p-[2.083vw] '>
                                    <div>
                                        <div className='text-[#101828] text-center text-[20px] 3xl:text-[1.042vw] font-semibold leading-7 xl:min-w-[190px] 3xl:min-w-[9.896vw]'>Professional Email Generator</div>
                                        <div className='mt-[10px] md:mt-[20px] xl:mt-[30px] 3xl:mt-[1.563vw] m-auto'>
                                            <Image src="/images/ai-professional.svg" width="65" height="64" alt="AI Multi Choice Assessment" className='m-auto' />
                                        </div>
                                    </div>
                                </button>
                                <div className='or-style space-y-[20px]'>
                                    <div className='vertical'></div>
                                    <div className='rounded-full border p-[10px] text-[14px] 3xl:text-[0.729vw] text-black'>OR</div>
                                    <div className='vertical'></div>
                                </div>
                                <button onClick={()=>{setShowFamilyEmailPopup(true);setVisible(false);}} className='bg-[#F9FBFD] rounded-md border border-[#BACCE7] p-[10px] md:p-[20px] xl:p-[30px] 3xl:p-[2.083vw] '>
                                    <div>
                                        <div className='text-[#101828] text-center text-[20px] 3xl:text-[1.042vw] font-semibold leading-7 xl:min-w-[190px] 3xl:min-w-[9.896vw]'>Family Email Generator</div>
                                        <div className='mt-[10px] md:mt-[20px] xl:mt-[30px] 3xl:mt-[1.563vw] m-auto'>
                                            <Image src="/images/ai-email-family.svg" width="65" height="64" alt="AI Multi Choice Assessment" className='m-auto' />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>


                {/* professional email popup */}
                {
                    showProfessionalEmailPopup &&
                    <ProfessionalEmail
                        visible={showProfessionalEmailPopup}
                        onHide={() => {
                            setShowProfessionalEmailPopup(false);
                            setVisible(false);
                        }}
                        setInstruction={setInstruction}
                    />
                }
                {/* family email popup */}
                {
                    showFamilyEmailPopup &&
                    <FamilyEmail
                        visible={showFamilyEmailPopup}
                        onHide={() => {
                            setShowFamilyEmailPopup(false);
                            setVisible(false);
                        }}
                        setInstruction={setInstruction}
                    />
                }

            </div>
        </Layout>
    )
}