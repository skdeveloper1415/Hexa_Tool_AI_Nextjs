import React, { useEffect, useState, Fragment } from "react";
import { ScrollPanel } from 'primereact/scrollpanel';
import { NoDataMsg } from '../../../../../common/NoDatamsg';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getTimeDifference } from '../../../../../../components/helper/timeDiffCalculator';
import { toast } from 'react-toastify';
import { getDataFromLocalStorage } from '../../../../../../components/helper/commonFunction';
import { questionDeleteApi, questionListApi } from '../../../../../actions/questionApi';
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "primereact/dialog";

export default function Questions(props) {
    const { classIdValue, topicId, refreshList, courseId, id, quetionEdit } = props;
    const [loader, setLoader] = useState(false);
    const [questionList, setQuestionList] = useState();
    const [deleteid, setDeleteId] = useState();
    const [deleteCourseId, setDeletecCourseId] = useState();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isView, setIsView] = useState(false);
    const [questionDetail, setQuestionDetail] = useState({})
    const accessToken = getDataFromLocalStorage("access_token");

    const HeaderData = () => {
        return (
            <div className="flex">
                Confirmation
            </div>
        )
    }
    const HeaderDatafordescription = () => {
        return (
            <div className="flex">
                {questionDetail?.title ?questionDetail?.title:'' }
            </div>
        )
    }
    
    const deleteQuestion = async () => {
        try {
            let payload = {
                accessToken: accessToken,
                "courseId": deleteCourseId,
                "id": deleteid
            }
            const response = await questionDeleteApi(payload)
            if (response.code === 200 && response.success === true) {
                setDialogVisible(false);
                QuestionList()
                toast.success("Question deleted successfully")
            }
        } catch (err) {
            toast.error("Something wend wrong")
            setDialogVisible(false);
        }
    }

    const footerContent = (
        <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
            <button onClick={() => setDialogVisible(false)} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>


            <button onClick={() => deleteQuestion(false)} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
                Yes
            </button>
        </div>
    );
    const footerContentForView = (
        <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">


            <button onClick={() => setIsView(false)} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
                Ok
            </button>
        </div>
    );

    useEffect(() => {
        QuestionList()
    }, [topicId, refreshList]);

    const QuestionList = async () => {
        try {
            if (classIdValue) {
                setLoader(true);
                const body = {
                    topicId:topicId,
                    accessToken: accessToken,
                    courseId: classIdValue,
                };

                const response = await questionListApi(body);
                if (response?.code == 200) {
                    const postList = response?.data?.data ?? [];
                    setQuestionList(postList);
                    setLoader(false);
                }
                else if (response.code == 500) {
                    toast.error(response.message || 'Something Went Wrong')
                    setQuestionList([]);
                    setLoader(false);
                }
                else {
                    toast.error(response.error || 'Something Went Wrong')
                    setLoader(false);
                    setQuestionList([]);
                }

            }
        }
        catch (error) {
            setLoader(false);

            toast.error("something went wrong");
        }
    };
    return (
        <div>
            <ScrollPanel
                style={{ width: "100%", height: "500px" }}
                className="custombar2"
            >
                <div className="mb-5">
                    {
                        loader ?
                            (<div className="flex justify-center align-center">
                                <ProgressSpinner />
                            </div>)
                            :
                            (
                                questionList?.length ? (
                                    questionList?.map((item, index) => {
                                        console.log("item", item.submissionModificationMode);
                                        return (
                                            <>
                                                <div key={index} className="border border-[#D4D4D4] p-[20px] xl:p-[18px] 3xl:p-[1.042vw] rounded-[10px] xl:rounded-[9px] 3xl:rounded- [0.521vw] relative mb-[10px] flex justify-between">

                                                    <div className="flex items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw]">
                                                        <div className=" items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw] mb-[5px]">
                                                            <div className="flex gap-2">
                                                            <div className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold" style={{cursor:'pointer'}} onClick={()=>{setIsView(true);setQuestionDetail(item)}}>
                                                                {item?.title}
                                                            </div>
                                                            {
                                                                item?.state === "DRAFT" ?
                                                                <div class="text-[#E57200] bg-[#FFF2E5] font-medium text-[10px] xl:text-[11px] 3xl:text-[0.625vw] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw] py-[3px] px-[8px] ">
                                                                {item?.state}
                                                              </div> : null
                                                            }
                                                           
                  </div>
                                                            <div className="text-[#667085] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-normal">
                                                                {getTimeDifference(item?.updateTime)}
                                                                {/* 5 Days ago */}
                                                            </div>
                                                            <div className="">
                  
                 
                </div>
                                                        </div>
                                                    </div>
                                                    {item?.submissionModificationMode === "MODIFIABLE_UNTIL_TURNED_IN" ?
                                                        <Menu as="div" className="relative inline-block">
                                                            <Menu.Button >
                                                                <i
                                                                    className="hexatoolthree-dots cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center">
                                                                </i>
                                                            </Menu.Button>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                                                                    <ul>
                                                                        <li
                                                                            className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                            onClick={() => { quetionEdit(true); courseId(item.courseId), id(item.id) }}
                                                                        >
                                                                            Edit
                                                                        </li>
                                                                        <li
                                                                            className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                            onClick={() => { setDialogVisible(true); setDeletecCourseId(item.courseId), setDeleteId(item.id) }}
                                                                        >
                                                                            Delete
                                                                        </li>
                                                                    </ul>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                        :
                                                        ""
                                                    }
                                                </div>

                                            </>
                                        );
                                    })
                                ) : (
                                    <NoDataMsg />
                                ))
                    }

                </div>
                {/* <NoDataMsg /> */}

            </ScrollPanel >
            <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }} onHide={() => setDialogVisible(false)} className='ConfirmDialog'>
                <p>
                    Do you want to Delete this record?
                </p>
            </Dialog>
           {isView&& <Dialog visible={isView} draggable={false} modal header={HeaderDatafordescription} footer={footerContentForView} style={{ width: '35vw' }} onHide={() => setIsView(false)} className='ConfirmDialog'>
           <h1 style={{fontWeight:'bold'}}>
              Description:
              </h1>
                 <p>
                   {questionDetail?.description ?questionDetail?.description:'' }
                </p>
            </Dialog>}
        </div >

    )
}
