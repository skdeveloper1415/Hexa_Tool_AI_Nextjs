"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Editor } from "primereact/editor";
import moment from 'moment';
import StudentFeedback from '../../studentFeedback';
import Autogradingpopup1 from '../../../../../../../components/popup/autogradingpopup1';
import { InputNumber } from 'primereact/inputnumber';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";


export default function Studentsubmission({ rowdata, studentInfo }) {

    const [text, setText] = useState('');
    const [value, setValue] = useState('')
    const [ingredients, setIngredients] = useState([]);
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState('')
    const [autograding1, setAutograding1] = useState(false);

    const dueDate = (dateObj) => {
        if (dateObj) {
            const { year, month, day } = dateObj;

            const date = moment({ year: year, month: month - 1, day: day });

            const formattedDate = date.format('DD MMM, YYYY');

            return formattedDate;
        } else {
            return '-'
        }

    }
console.log('rowdata', rowdata)
    return (
        <>
            <div className=''>
                {/*row*/}
                <div className='bg-white border border-[#C8CBD0] rounded-lg 3xl:rounded-[0.417vw] 3xl:py-[0.99vw] py-[19px] 3xl:px-[1.042vw] px-5'>
                    <div className='flex items-center gap-5 3xl:gap-[1.042vw]'>
                        <div className='flex flex-col items-center bg-[#F2F4F7]  rounded-md 3xl:py-[0.781vw] py-4 3xl:px-[1.042vw] px-5 gap-3 3xl:gap-[0.677vw] text-[#344054] text-sm font-normal leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                            <Image src={`https:${studentInfo?.userProfile?.photoUrl}`} width={88} height={88} alt='profile' />
                            <span>{studentInfo?.userProfile?.name?.fullName}</span>
                        </div>
                        <div className='flex flex-col gap-5 3xl:gap-[1.042vw] grow'>
                            <div className='flex flex-wrap items-center justify-between'>
                                <div className='flex items-center gap-2.5 3xl:gap-[0.521vw]'>
                                    <div className='text-[#000000] text-xl font-medium leading-8 3xl:text-[1.042vw] 3xl:leading-[1.563vw]'>{rowdata?.assignment?.title}</div>
                                    <div className='bg-[#98A2B3] rounded 3xl:rounded-[0.208vw] p-1.5 3xl:p-[0.313vw] text-[#FFFFFF] text-xs font-normal leading-[18px] 3xl:text-[0.625vw] 3xl:leading-[0.938vw]'>Total Points {rowdata?.assignment?.maxPoints}</div>
                                </div>
                                <div className='text-[#98A2B3] text-sm font-normal leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                                    <div>Due Date: {dueDate(rowdata?.assignment?.dueDate)}</div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center gap-1 flex-wrap'>
                                {/*col*/}
                                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] px-2.5 py-2 3xl:py-[0.417vw] 3xl:px-[0.521vw] flex flex-col items-center gap-1 3xl:gap-[0.208vw] 3xl:w-[11.094vw] w-[180px]'>
                                    <div className='text-[#667085] text-sm font-medium leading-6 -tracking-[0.28px]'>Assigned</div>
                                    <div className='text-[#344054] text-base font-semibold leading-6 -tracking-[0.32px]'>{moment(rowdata?.assignment?.creationTime).format("MM/DD/YYYY")}</div>
                                </div>
                                {/*col*/}
                                {/*col*/}
                                <div className='flex items-center grow max-lg:hidden'>
                                    <div className='bg-[#FF8B1A] outline outline-4 outline-[#FFF2E5] w-[18px] h-[18px] rounded-full grow'></div>
                                    <div className='bg-[#FF8B1A] h-0.5 w-full'></div>
                                </div>
                                {/*col*/}
                                {/*col*/}
                                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] px-2.5 py-2 3xl:py-[0.417vw] 3xl:px-[0.521vw] flex flex-col items-center gap-1 3xl:gap-[0.208vw] 3xl:w-[11.094vw] w-[180px]'>
                                    <div className='text-[#667085] text-sm font-medium leading-6 -tracking-[0.28px]'>Turned In</div>
                                    {/* <div className='text-[#344054] text-base font-semibold leading-6 -tracking-[0.32px]'>{moment(rowdata?.assignment?.updateTime).format("MM/DD/YYYY")}</div> */}
                                    <div className={`${studentInfo?.state=="RETURNED"|| studentInfo?.state=="TURNED_IN" ? 'text-[green]':'text-[red]'} text-base font-semibold leading-6 -tracking-[0.32px]`}>{studentInfo?.state=="CREATED" ? "In Progress":"Completed"}</div>
                                </div>
                                {/*col*/}
                                {/*col*/}
                                <div className='flex items-center grow max-lg:hidden'>
                                    <div className='bg-[#FF8B1A] outline outline-4 outline-[#FFF2E5] w-[18px] h-[18px] rounded-full grow'></div>
                                    <div className='bg-[#FF8B1A] w-full outline-dashed outline-1 outline-[#FF8B1A]'></div>
                                </div>
                                {/*col*/}
                                {/*col*/}
                                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md 3xl:rounded-[0.313vw] px-2.5 py-2 3xl:py-[0.417vw] 3xl:px-[0.521vw] flex flex-col items-center gap-1 3xl:gap-[0.208vw] 3xl:w-[11.094vw] w-[180px]'>
                                    <div className='text-[#667085] text-sm font-medium leading-6 -tracking-[0.28px]'>Graded</div>
                                    <div className={`${studentInfo?.state=="RETURNED"|| studentInfo?.state=="TURNED_IN" ? 'text-[green]':'text-[red]'} text-base font-[400] font-semibold leading-6 -tracking-[0.32px]`}>{studentInfo?.state=="TURNED_IN" ? "Submitted" : studentInfo?.state=="RETURNED" ? "Completed" : "In Progress"}</div>
                                </div>
                                {/*col*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/*row*/}
                <div className='3xl:mt-[1.563vw] mt-[30px] bg-white border border-[#C8CBD0] rounded-lg 3xl:rounded-[0.417vw] 3xl:p-[0.729vw] p-3.5'>
                    <Tabs className={'studenttabview'}>
                        <div className='flex justify-between items-center'>
                            <div>
                                <TabList>
                                    <Tab>Student Submission  </Tab>
                                    <Tab>Instructions</Tab>
                                </TabList>
                            </div>
                            <div className='text-[#98A2B3] text-sm'>
                                <i className='hexatoolthree-dots'></i>
                            </div>
                        </div>

                        <div className='3xl:mt-[0.521vw] mt-2.5'>
                            <TabPanel>
                                <ScrollPanel style={{ width: '100%', height: 'clamp(200px, 11.354vw, 500px)' }}>
                                    {
                                        content ? (
                                            content
                                        ) : (
                                            studentInfo && studentInfo.assignmentSubmission && studentInfo.assignmentSubmission.attachments && studentInfo.assignmentSubmission.attachments.length > 0 ? (
                                                studentInfo.assignmentSubmission.attachments.map((attachment, index) => (
                                                    <div key={index}>
                                                        <b>Assignment:</b> {index + 1} <br />
                                                        <b>URL:</b>
                                                        <a href={attachment?.link?.url || attachment?.driveFile?.alternateLink} target="_blank" style={{ color: 'blue', textDecoration: 'underline',marginLeft : "5px" }}>
                                                            {attachment?.link?.url || attachment?.driveFile?.alternateLink}
                                                        </a><br />
                                                        <b>Title:</b> {attachment?.link?.title || attachment?.driveFile?.title} <br />
                                                        <b>Thumbnail Url:</b> <a href={attachment?.link?.thumbnailUrl || attachment?.driveFile?.thumbnailUrl} style={{ color: 'blue', textDecoration: 'underline',marginLeft : "5px" }} target="_blank">{attachment?.link?.thumbnailUrl || attachment?.driveFile?.thumbnailUrl}</a> <br />
                                                        <br />
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No Assignments found</div>
                                            ))
                                    }


                                </ScrollPanel>
                                <div className='flex items-center justify-between flex-wrap'>
                                    <div className='flex items-center gap-5 3xl:gap-[1.042vw]'>
                                        {/* <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolthumb-outline'></i><span>Like</span></div>
                                        <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolcomments'></i><span>Comment</span></div>
                                        <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolinvisible'></i><span>Instructor Notes</span></div>
                                        <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolfolder'></i><span>Add to Folder</span></div> */}
                                    </div>
                                    <div className='flex items-center gap-3 3xl:gap-[0.625vw]'>
                                        <div className='flex items-center gap-3 number-custom'>
                                            <div>Points Scored</div>
                                            <div className='text-[#344054] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                                                <InputNumber value={value} onChange={(e) => setValue(e.value)} min={0} max={100} /> /{rowdata?.assignment?.maxPoints}</div>
                                        </div>
                                        {/* <div><Link href={''}
                                            onClick={() => setVisible(true)}
                                            className='text-[#1B55AF] text-base font-medium leading-6 bg-white border border-[#1B55AF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolbase-close'></i><span>Student Feedback</span></Link></div> */}
                                        {/* <div onClick={() => setAutograding1(true)}><Link href={''} className='text-[#1B55AF] text-base font-medium leading-6 bg-white border border-[#1B55AF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolbase-close'></i><span>Grading</span></Link></div> */}
                                        {/* <div><Link href={''} className='text-white text-base font-medium leading-6 bg-[#1570EF] border border-[#1570EF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] inline-block'>Submit</Link></div> */}
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <ScrollPanel style={{ width: '100%', height: 'clamp(200px, 11.354vw, 500px)' }}>
                                    {/* {rowdata?.assignment?.description} */}
                                    {/* <div dangerouslySetInnerHTML={{ __html: rowdata?.assignment?.description }} /> */}
                                    {/* {rowdata?.assignment?.description && rowdata?.assignment?.description?.split('\n')?.map((line, index) => (
                                    <span key={index}>{line}<br /></span>
                                ))} */}
                                    {rowdata?.assignment?.description && (
                                        <>
                                            {rowdata.assignment.description.split('\n').map((line, index) => (
                                                <div key={index}>  {/* Add key prop here */}
                                                    <div dangerouslySetInnerHTML={{ __html: line }} />
                                                    <br />
                                                </div>
                                            ))}
                                        </>
)}

                                </ScrollPanel>
                                <div className='flex items-center justify-between flex-wrap'>
                                    <div className='flex items-center gap-5 3xl:gap-[1.042vw]'>
                                        {/* <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolthumb-outline'></i><span>Like</span></div>
                                        <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolcomments'></i><span>Comment</span></div>
                                        <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolinvisible'></i><span>Instructor Notes</span></div>
                                        <div className='text-[#E57200] text-xs font-medium leading-5 3xl:text-[0.625vw] 3xl:leading-[1.042vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolfolder'></i><span>Add to Folder</span></div> */}
                                    </div>
                                    <div className='flex items-center gap-3 3xl:gap-[0.625vw]'>
                                        <div className='flex items-center gap-3  number-custom'>
                                            <div>Points Scored</div>
                                            <div className='text-[#344054] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                                                <InputNumber value={value} onChange={(e) => setValue(e.value)} min={0} max={100} /> /{rowdata?.assignment?.maxPoints}</div>
                                            
                                        </div>
                                        {/* <div><Link href={''} className='text-[#1B55AF] text-base font-medium leading-6 bg-white border border-[#1B55AF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolbase-close'></i><span>Student Feedback</span></Link></div>
                                        <div><Link href={''} className='text-[#1B55AF] text-base font-medium leading-6 bg-white border border-[#1B55AF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] flex items-center gap-2 3xl:gap-[0.417vw]'><i className='hexatoolbase-close'></i><span>Grading</span></Link></div>
                                        <div><Link href={''} className='text-white text-base font-medium leading-6 bg-[#1570EF] border border-[#1570EF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] inline-block'>Submit</Link></div> */}
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
                {/*row*/}
                <div className='3xl:mt-[3.854vw] mt-14'>
                    <div className='text-[#000000] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>Add Comments</div>
                    <div className='bg-white border border-[#C7C7C7] rounded-lg 3xl:rounded-[0.417vw]'>
                        <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '150px' }} className='custmEditor' />
                    </div>
                    <div className='flex justify-end items-center gap-2.5 3xl:gap-[0.521vw] 3xl:pt-[0.729vw] pt-3.5'>
                        <div><Link href={''} className='text-[#1B55AF] text-base font-medium leading-6 bg-white border border-[#1B55AF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] inline-block'><span>Delete</span></Link></div>
                        <div><Link href={''} className='text-[#1B55AF] text-base font-medium leading-6 bg-white border border-[#1B55AF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] inline-block'><span>Send for Revision</span></Link></div>
                        <div><Link href={''} className='text-white text-base font-medium leading-6 bg-[#1570EF] border border-[#1570EF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] inline-block'>Approve</Link></div>
                    </div>
                </div>
                {
                    visible &&
                    <StudentFeedback visible={visible} setVisible={setVisible} setContent={setContent}>
                    </StudentFeedback>
                }
            </div>

            <Autogradingpopup1
                visible={autograding1}
                setVisible={setAutograding1}
                onhide={() => setAutograding1(false)}
            />
        </>
    )
}
