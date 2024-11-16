import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Image from 'next/image';
import { classListPostApi, reusePostApi } from '../../../../actions/reusePostApi';
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
import moment from 'moment';

export default function ReusePostPopup(props) {

    const [checked, setChecked] = useState(false);
    const [classList, setClassList] = useState(false);
    const accessToken = localStorage?.getItem("access_token");
    const user_data = JSON.parse(getDataFromLocalStorage("user_data"));
    const [selectedRow, setSelectedRow] = useState(null);
    const [showClassDetails, setShowClassDetails] = useState(false);
    const [classDetails, setClassDetails] = useState()
    const [loading1, setloading1] = useState(false) // ClassList View
    const [loading2, setloading2] = useState(false)  //Detail View
    const [enableReuse, setEnableReuse] = useState(false) //Reuse Button
  
    const handleCancel = () => {
        props.setVisible(false);
        props.setShowTopicPopup(false);
        setShowClassDetails(false);
    };


    const classLists = async () => {
        setloading1(true)
        const payload = {
            accessToken: accessToken,
            userId: user_data?.id
        }

        const response = await reusePostApi(payload)
        if (response.code === 200 && response.success === true) {
            setClassList(response?.data?.data)
            setloading1(false)
        } else {
            setloading1(false)
        }
    }


    const classPostLists = async (courseId) => {
        setloading2(true)
        const payload = {
            accessToken: accessToken,
            courseId: courseId
        }

        const response = await classListPostApi(payload)
        if (response.code === 200 && response.success === true) {
            setSelectedRow(response?.data?.data);
            setloading2(false)
        }
        else {
            setloading2(false)
        }
    }

    useEffect(() => {
        classLists();
    }, []);


    const onRowClick = (e) => {
        setShowClassDetails(true);
        classPostLists(e?.data?.id)
    };


    //Reuse Functionality below
    const onRowClassDetailesClick = (e) => {
        console.log("detailes", e);
        setClassDetails(e.data);
        setEnableReuse(true)
    };

    const commanUseFun = () =>{
        props.setShowReusePost(false);
        props.setDataFromReuse(classDetails);
        setEnableReuse(false)
    }

    const handleReuse = () => {
        if (classDetails?.workType === "ASSIGNMENT") {
            props.setShowAssignment(true);
            commanUseFun();
        }
        else if (classDetails?.workType === "MULTIPLE_CHOICE_QUESTION") {
            props.setShowQuizAssignment(true);
            commanUseFun();

        }
        else if (classDetails?.workType === "SHORT_ANSWER_QUESTION") {     
            props.setShowQuestions(true);
            commanUseFun();

        }
        else if (classDetails?.workType ===  "MATERIAL") {      
        props.setShowMaterial(true);
        commanUseFun();

    }
    }


    const rowClassName = (rowData) => {
        return classDetails && classDetails.id === rowData.id ? 'bg-slate-100' : '';
    };

    const buttonClass = ` ${enableReuse ? 'text-[#fff] bg-[#1570EF]' : 'text-[#000] font-light'} 3xl:text-[0.833vw] 2xl:text-[16px]
    text-[14px] rounded-lg xl:px-[0.64vw] px-[6px] xl:py-[0.273vw] py-[5px] justify-center items-center`;


    const representativeBodyTemplate = (rowData) => (
        <div className="flex align-items-center gap-4">
            <Image alt="Class Image" src="/images/google_classroom_img.svg" width="32" height="32" />
            <div>
                <div>{rowData?.name}</div>
                <div className='text-[13px]'>{rowData?.section}</div>
            </div>

        </div>
    );

    const teacherTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <span>{rowData?.creatorName}</span>
        </div>
    );

    const createdTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <span>{moment(rowData?.creationTime).format('MMMM D')}</span>
        </div>
    );
    
    function truncateHTML(html, wordLimit) {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        const words = text.split(/\s+/).slice(0, wordLimit).join(' ');
        return words + (words.length < text.length ? '...' : '');
    }
    

    const bodyTemplateForTitle = (rowData) => {
        const truncatedDescription = truncateHTML(rowData?.description, 7); 
        return (
            <div>
                <div>{rowData?.title}</div>
                <div className="text-[13px]" dangerouslySetInnerHTML={{ __html: truncatedDescription }}></div>
            </div>
        );
    };
    

    const teacherTemplateForDetailview = (rowData) => (
        <div className="flex align-items-center gap-2">
            <span>{rowData?.teacher}</span>
        </div>
    );



    return (
        <div>
            <Dialog
                className="custom-popup"
                visible={props.visible}
                style={{ width: "90vw", maxWidth: "850px" }}
                onHide={handleCancel}
            >
                {!showClassDetails ? (
                    <div className="p-4">
                        <p className='text-xl text-[#101828] font-semibold mb-4'>Select class</p>
                        <DataTable
                            value={classList}
                            paginator
                            rows={5}
                            onRowClick={onRowClick}
                            selectionMode="single"
                            dataKey="id"
                            stateStorage="session"
                            stateKey="dt-state-demo-local"
                            emptyMessage="No Class Details Found."
                            tableStyle={{ minWidth: '100%' }}
                            // rowClassName={rowClassName}
                            className="custom-datatable"
                            loading={loading1}
                        >
                            <Column
                                header="Class"
                                body={representativeBodyTemplate}
                                style={{ width: '50%' }}
                            />
                            <Column
                                header="Teacher"
                                field='creatorName'
                                style={{ width: '25%' }}
                            />
                            <Column
                                header="Created"
                                body={createdTemplate}
                                style={{ width: '25%' }}
                            />
                        </DataTable>
                    </div>
                ) : (
                    <div className="p-4">
                        <div className='flex items-center mb-4'>
                            <i onClick={() => { setShowClassDetails(false), setEnableReuse(false) }}
                                className="pi pi-arrow-left cursor-pointer"
                                style={{ fontSize: '1.3rem', color: '#101828', marginRight: "15px" }}></i>
                            <p className='text-xl text-[#101828] font-semibold'>Class Details</p>
                        </div>
                        <DataTable
                            value={selectedRow}
                            paginator
                            rows={5}
                            selectionMode="single"
                            dataKey="id"
                            stateStorage="session"
                            stateKey="dt-state-demo-local"
                            emptyMessage="No Details found."
                            tableStyle={{ minWidth: '100%' }}
                            onRowClick={onRowClassDetailesClick}
                            rowClassName={rowClassName}
                            loading={loading2}
                            className="custom-datatable"
                        >
                            <Column
                                header="Title"
                                body={bodyTemplateForTitle}
                                field='title'
                                style={{ width: '50%' }}
                            />
                            <Column
                                header="Teacher"
                                field='creator.name.fullName'
                                style={{ width: '25%' }}
                            />
                            <Column
                                header="Post Date"
                                body={createdTemplate}
                                style={{ width: '25%' }}
                            />
                        </DataTable>
                        <div className='mt-2 flex justify-between items-center'>
                            <div className='flex items-center'>
                                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                                <p className='ml-1'>Create new copies of all attachments</p>
                            </div>
                            <button  className={buttonClass}
                                onClick={() => { handleReuse() }}
                            >
                                Reuse
                            </button>

                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
