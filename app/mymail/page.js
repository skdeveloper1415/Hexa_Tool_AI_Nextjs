"use client"
import React, { useState, useEffect } from 'react'
import Layout from '../../layouts/pagelayout';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { GRADE } from '../../components/helper/enum';
import { Mails } from '../../components/helper/enum';
import { MailDate } from '../../components/helper/enum';
import { AllGrade } from '../../components/helper/enum';
import AllMailTable from '../../components/mailcoponent/allMailTable';
import ReplyMail from '../../components/mailcoponent/replyMail';
import Image from 'next/image';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Link from 'next/link';
import { getEmailListAPI } from '../actions/EmailAPI';
import { getDataFromLocalStorage } from '../../components/helper/commonFunction';
import { toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function Page() {

    const [isLoading, setIsLoading] = useState(false);

    const [value, setValue] = useState(null);
    const [showReply, setShowReply] = useState(false);
    const [rowData, setRowData] = useState(null);
    const data = [
        {
            id: '1000',
            name: 'Wade Warren',
            image: 'profile_img_mail.png',
            grade: '1st Grade',
            title: 'Excuse from Assignment Submission1',
            subtitle: 'Excuse from assignment submission.',
            date: 'Tue, Mar 7, 4:15 PM (Today)',
        },
        {
            id: '1001',
            name: 'Wade Warren2',
            image: 'profile_img_mail.png',
            grade: '2st Grade',
            title: 'Excuse from Assignment Submission',
            subtitle: 'Excuse from assignment submission.',
            date: 'Tue, Mar 7, 4:15 PM (Today)',
        },
        {
            id: '1002',
            name: 'Wade Warren2',
            image: 'profile_img_mail.png',
            grade: '2st Grade',
            title: 'Excuse from Assignment Submission',
            subtitle: 'Excuse from assignment submission.',
            date: 'Tue, Mar 7, 4:15 PM (Today)',
        },
        {
            id: '1003',
            name: 'Wade Warren2',
            image: 'profile_img_mail.png',
            grade: '2st Grade',
            title: 'Excuse from Assignment Submission',
            subtitle: 'Excuse from assignment submission.',
            date: 'Tue, Mar 7, 4:15 PM (Today)',
        },
        {
            id: '1004',
            name: 'Wade Warren2',
            image: 'profile_img_mail.png',
            grade: '2st Grade',
            title: 'Excuse from Assignment Submission',
            subtitle: 'Excuse from assignment submission.',
            date: 'Tue, Mar 7, 4:15 PM (Today)',
        },
        {
            id: '1005',
            name: 'Wade Warren2',
            image: 'profile_img_mail.png',
            grade: '2st Grade',
            title: 'Excuse from Assignment Submission',
            subtitle: 'Excuse from assignment submission.',
            date: 'Tue, Mar 7, 4:15 PM (Today)',
        },
        {
            id: '1006',
            name: 'Wade Warren2',
            image: 'profile_img_mail.png',
            grade: '2st Grade',
            title: 'Excuse from Assignment Submission',
            subtitle: 'Excuse from assignment submission.',
            date: 'Tue, Mar 7, 4:15 PM (Today)',
        },

    ]




    const[allEmailList,setAllEmailList]=useState([]);
    const [filteredEmailList, setFilteredEmailList] = useState([]);
    
    const[searchText,setSearchText]=useState(""); 
    const handleSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchTerm = searchValue.toLowerCase();
        const filteredData = allEmailList.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.title.toLowerCase().includes(searchTerm) ||
                item.subtitle.toLowerCase().includes(searchTerm)
            );
        });
        setFilteredEmailList(filteredData);
    }

    //get blog list start.
    const getBlogList = async () => {
        try {
            setIsLoading(true);
            let accessToken=getDataFromLocalStorage("access_token");
            
            if(!accessToken){
                toast.error("Need to Login", {
                    onClose: () => {
                      window.location.href = "/manageclass";
                    },
                    autoClose: 1000, // Dismiss the toast after 3 seconds (3000 milliseconds)
                  });
                return
            }
           
            const payload ={
                "accessToken": accessToken
            }

            const response = await getEmailListAPI(payload);
            if (response.code == '200') {
                console.log("data email:-",response);
                let data=response?.data?.data ?? [];
                // setAllEmailList(data);

                console.log("datadatadatadatadatadatadata:-",data);

                let finalData=[];
                data.forEach(message => {

                    let sender="";
                    if(message.payload.headers[0].name=="Delivered-To"){
                        //email is -send
                        sender=message.payload.headers.find(header => header.name === 'From').value;
                    }else{
                        //received -inbox
                        sender=message.payload.headers.find(header => header.name === 'To').value;
                    }
                    
                    // sender = message.payload.headers.find(header => header.name === 'From').value;
                    const date = message.payload.headers.find(header => header.name === 'Date').value;
                    const subject = message.payload.headers.find(header => header.name === 'Subject').value;

                    let obj=  {
                        id: message?.id,
                        name: sender ?? "Dummy Name",
                        // image: 'profile_img_mail.png',
                        // grade: '2st Grade',
                        title: subject ?? "Dummy Subject",
                        subtitle: message?.snippet ?? "Dummy Subtitle",
                        date: date ?? "dummy date",
                    }

                    finalData.push(obj);
               });
               setAllEmailList(finalData);
               setFilteredEmailList(finalData);
            } else {
                const msg = response?.message ?? response?.error ?? "Something Went Wrong.";
                toast.error(msg);
                // setLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            const msg = error?.message ?? "Something Went Wrong.";
            toast.error(msg);
            setIsLoading(false);
        }
    }
    //get blog list end.
    useEffect(()=>{getBlogList();},[])

    return (
        <Layout>
            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
                    {showReply &&
                        <>
                        <button onClick={() => setShowReply(false)} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-start items-center '>
                           <i className='pi pi-angle-double-left mr-2'></i>
                            Back to Mail
                        </button>
                        </>
                        }
                    <div className="3xl:text-[1.04vw] 2xl:text-[20px] text-[18px] font-semibold text-[#101828]">
                        My Mail
                    </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-[15px] xl:gap-[13px] 3xl:gap-[0.781vw]">
                        {!showReply &&
                        <>
                        <div>
                            <span className="p-input-icon-left custm-search custm-search">
                                <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
                                    <InputText
                                        value={searchText}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        placeholder="Search..."
                                        className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[200px] xl:w-[180px] 3xl:w-[10.417vw] inputbox-custom-sizes custhover"
                                    />
                            </span>
                        </div>
                        <div className="customDropdown">
                            <Dropdown
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                filter
                                options={AllGrade}
                                optionLabel="name"
                                placeholder="View All"
                                className="w-full md:w-[160px] xl:w-[140px] 3xl:w-[8.333vw]"
                            />
                        </div>
                        <div className="customDropdown">
                            <Dropdown
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                filter
                                options={Mails}
                                optionLabel="name"
                                placeholder="Inbox"
                                className="w-full md:w-[160px] xl:w-[140px] 3xl:w-[8.333vw]"
                            />
                        </div>
                        <div className="customDropdown">
                            <Dropdown
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                filter
                                options={MailDate}
                                optionLabel="name"
                                placeholder="Sort by Date"
                                className="w-full md:w-[160px] xl:w-[140px] 3xl:w-[8.333vw]"
                            />
                        </div>
                        </>
                        }
                        {showReply &&
                        <>
                        <button className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-start items-center  '>
                            <Image src="/images/highlight.svg" width="18" height="18" alt="AI Multi Choice Assessment" />
                            AI Email Responder
                        </button>
                        </>
                        }
                        <Link href="/composemail" className="flex 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-center items-center"
                        >
                            <i className="hexatoolplus mr-[8px]"></i>
                            Compose Mail
                        </Link>
                    </div>
                </div>

                <div className='mt-[55px] xl:mt-[60px] 3xl:mt-[3.594vw]'>
                    {showReply === true ?
                        <ReplyMail setShowReply={setShowReply} rowData={rowData}/>
                        :

                        isLoading ? <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div>
                            :
                            <AllMailTable setShowReply={setShowReply} data={filteredEmailList} setRowData={setRowData} />
                    }
                </div>
            </div>
        </Layout>
    )
}