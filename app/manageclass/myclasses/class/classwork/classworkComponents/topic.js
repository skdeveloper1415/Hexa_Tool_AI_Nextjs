import React, { Fragment, useEffect, useState } from 'react'
import { ScrollPanel } from 'primereact/scrollpanel';
import { deleteTopicApi, getTopicList } from '../../../../../actions/getAllTopicsList';
import { NoDataMsg } from '../../../../../common/NoDatamsg';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getTimeDifference } from '../../../../../../components/helper/timeDiffCalculator';
import { toast } from 'react-toastify';
import { getDataFromLocalStorage } from '../../../../../../components/helper/commonFunction';
import { Menu, Transition } from "@headlessui/react";
import TopicPopup from '../topicPopup';

export default function Topic(props) {
    const { classIdValue, topicId, refreshList } = props;
    const [loader, setLoader] = useState(false);
    const [topicList, setTopicList] = useState();
    const [visible, setvisible] = useState(false)
    const [topicID, settopicID] = useState('')
    const [topicValue, settopicValue] = useState('')
    const [showTopicPopup, setShowTopicPopup] = useState(false);


    useEffect(() => {
        getTopics()
    }, [topicId, refreshList]);

    const getTopics = async () => {
        try {
            if (classIdValue) {
                setLoader(true);
                let accessToken = getDataFromLocalStorage("access_token");
                if (!accessToken) {

                }
                const body = {
                    accessToken: accessToken,
                    courseId: classIdValue,
                    topicId: topicId
                };

                const response = await getTopicList(body);
                if (response?.code == 200) {
                    const postList = response?.data?.data ?? [];
                    setTopicList(postList);
                    setLoader(false);
                }
                else if (response.code == 500) {
                    toast.error(response.message || 'Something Went Wrong')
                    setTopicList([]);
                    setLoader(false);
                }
                else {
                    toast.error(response.error || 'Something Went Wrong')
                    setLoader(false);
                    setTopicList([]);
                }

            }
        }
        catch (error) {
            setLoader(false);

            toast.error("something went wrong");
        }
    };

    const handleDelete = async (topicID, courseID) => {
        let accessToken = getDataFromLocalStorage("access_token");

        const body = {
            accessToken: accessToken,
            courseId: courseID,
            topicId: topicID
        };
        console.log('body', body)
        const response = await deleteTopicApi(body);

        console.log('response', response)
        if (response?.code == 200) {
            toast.success("Topic Deleted Succuessfully");
            getTopics()
        }
    }
    const handleEdit = async (topicID, name) => {
        settopicID(topicID)
        settopicValue(name)
        setvisible(true)
    }
    console.log('topicList', topicList)
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
                                topicList?.length ? (
                                    topicList?.map((item, index) => {
                                        return (
                                            <>
                                                <div key={index + 1} className="border border-[#D4D4D4] p-[20px] xl:p-[18px] 3xl:p-[1.042vw] rounded-[10px] xl:rounded-[9px] 3xl:rounded- [0.521vw] relative mb-[10px]">
                                                    {/* <div className="absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]"    onClick={(e) => {handleDelete(e,item.topicId, item.courseId)}}>
                                                <i className="hexatoolthree-dots text-[#98A2B3] text-[20px] xl:text-[18px] 3xl:text-[0.9vw]"></i>
                                            </div> */}
                                                    <Menu as="div" className="absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]">
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
                                                                        onClick={() => { handleEdit(item.topicId, item.name) }}
                                                                    >
                                                                        Edit
                                                                    </li>
                                                                    <li
                                                                        className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                        onClick={() => { handleDelete(item.topicId, item.courseId) }}
                                                                    >
                                                                        Delete
                                                                    </li>
                                                                </ul>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                    <div className="flex items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw]">
                                                        <div className=" items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw] mb-[5px]">
                                                            <div className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold">

                                                                {item.name}
                                                            </div>
                                                            <div className="text-[#667085] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-normal">
                                                                {getTimeDifference(item.updateTime)}
                                                                {/* 5 Days ago */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })
                                ) : (
                                    <NoDataMsg />
                                ))
                    }
                    {visible && <TopicPopup tabId={6} getTopic={getTopics} classIdValue={classIdValue} visible={visible} setVisible={setvisible} topicID={topicID} setShowTopicPopup={setShowTopicPopup} topicValue={topicValue} />}
                </div>
                {/* <NoDataMsg /> */}
            </ScrollPanel >
        </div >
    )
}
