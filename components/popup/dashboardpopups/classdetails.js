"use client"
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import Image from "next/image";
import { MeterGroup } from "primereact/metergroup";
import VerticalStackBarChart from "../../charts/dasboardcharts/verticcalstackbarchart";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';


function ClassDetails({ onHides, visible, }) {
    const [activeTab, setActiveTab] = useState(0);
    const [SchoolType, setSchoolType] = useState(null);
    const SchoolTypeData = [
        { name: 'School 1', code: 'NY' },
        { name: 'School 2', code: 'RM' },
        { name: 'School 3', code: 'LDN' },
        { name: 'School 4', code: 'IST' },
        { name: 'School 5', code: 'PRS' }
    ];


    const products = [
        {
            studentID: 12445,
            studentname: 'Jane Cooper',
            schoolname: 'Acequia Madre Elementary',
            schooltype: 'Elementary School',
            gender: 'Male',
            grade: 'GT1',
            ethnicity: 'American',
            city: 'San Francisco',
            deviceinuse: 'Desktop',
            noofsubmissions: '24',

            nooflatesubmissions: '10',
            noofmissedsubmissions: '10'
        },
        {
            studentID: 12445,
            studentname: 'Jane Cooper',
            schoolname: 'Acequia Madre Elementary',
            schooltype: 'Elementary School',
            gender: 'Male',
            ethnicity: 'American',
            city: 'San Francisco',
            deviceinuse: 'Desktop',
            noofsubmissions: '24'
        },
        {
            studentID: 12445,
            studentname: 'Jane Cooper',
            schoolname: 'Acequia Madre Elementary',
            schooltype: 'Elementary School',
            gender: 'Male',
            ethnicity: 'American',
            city: 'San Francisco',
            deviceinuse: 'Desktop',
            noofsubmissions: '24'
        },
        {
            studentID: 12445,
            studentname: 'Jane Cooper',
            schoolname: 'Acequia Madre Elementary',
            schooltype: 'Elementary School',
            gender: 'Male',
            ethnicity: 'American',
            city: 'San Francisco',
            deviceinuse: 'Desktop',
            noofsubmissions: '24'
        },
        {
            studentID: 12425,
            studentname: 'Jane Cooper',
            schoolname: 'Acequia Madre Elementary',
            schooltype: 'Elementary School',
            gender: 'Male',
            ethnicity: 'American',
            city: 'San Francisco',
            deviceinuse: 'Desktop',
            noofsubmissions: '24'
        },
        {
            studentID: 1255,
            studentname: 'Jane Cooper',
            schoolname: 'Acequia Madre Elementary',
            schooltype: 'Elementary School',
            gender: 'Male',
            ethnicity: 'American',
            city: 'San Francisco',
            deviceinuse: 'Desktop',
            noofsubmissions: '24'
        },
        {
            studentID: 12445,
            studentname: 'Jane Cooper',
            schoolname: 'Acequia Madre Elementary',
            schooltype: 'Elementary School',
            gender: 'Male',
            ethnicity: 'American',
            city: 'San Francisco',
            deviceinuse: 'Desktop',
            noofsubmissions: '24'
        },
    ]

    const StudentNameBody = (rawData) => {
        return (
            <div className='flex items-center gap-[8px] 3xl:gap-[0.433vw]'><Image src={'/images/dashboard/table_profile_img.svg'} width={40} height={40} className='h-[40px] w-[40px] 3xl:h-[2.083vw] 3xl:w-[2.083vw] rounded-full' alt='' />{rawData.studentname}</div>
        )
    }

    const bar1 = [{ color: "#3166B7", value: 93.1 }];

    const SubmissionsBody = (rawData) => {
        return (
            <div className="flex items-center gap-[16px]">
                <div className="col w-full meterGroup">
                    <MeterGroup values={bar1} />
                </div>
                <div className="">
                    93.1
                </div>
            </div>
        )
    }


    // const header = () => {
    //     return (
    //         <div className="flex justify-end bg-[#F9FAFB]">

    //             <div className="border-x w-[200px] flex justify-center">Assignment</div>
    //             <div>Quizzes</div>
    //         </div>
    //     );
    // };

    const headerGroup = (
        <ColumnGroup className="">
            <Row >
                <Column header="" colSpan={9}/>
                <Column header="Assignment" colSpan={5} />
                <Column header="Quizzes" colSpan={5} />
            </Row>
          
            <Row>
                <Column header="Student ID" field="studentID" />
                <Column header="Student Name" sortable field="studentname" />
                <Column header="School Name" field="schoolname" />
                <Column header="School Type" field="schooltype" />
                <Column header="Gender"  field="gender" />
                <Column header="Grade"  field="grade" />
                <Column header="Ethnicity"  field="ethnicity" />
                <Column header="City"  field="city" />
                <Column header="Device In Use"  field="deviceinuse" />
                <Column header="No.of Submissions"  field="noofsubmissions" />
                <Column header="No.of Late Submissions"  field="nooflatesubmissions" />
                <Column header="No.of Missed Submissions" field="noofmissedsubmissions" />
                <Column header="Submissions Rate"  field="submissionsrate" />
                <Column header="Overall Grade"  field="overallgrade" />
                <Column header="No.of Submissions" field="noofsubmissions" />
                <Column header="No.of Late Submissions" field="nooflatesubmissions" />
                <Column header="No.of Missed Submissions"  field="noofmissedsubmissions" />
                <Column header="Submissions Rate"  field="submissionsrate" />
                <Column header="Overall Grade" field="overallgrade" />

            </Row>
        </ColumnGroup>
    );



    return (
        <Sidebar
            visible={visible}
            onHide={onHides}
            position="right"
            blockScroll={true}
            className="w-[90%] 3xl:w-[85%] custSidebar rounded-tl-[16px] 3xl:rounded-tl-[0.833vw] rounded-bl-[16px] 3xl:rounded-bl-[0.833vw]"
        >
            <div className="flex justify-between items-center bg-[#0D2A57] px-[24px] xl:px-[22px] 3xl:px-[1.25vw] py-[20px] xl:py-[18px] 3xl:py-[0.938vw]">
                <div className="w-full">
                    <div className="  text-[#FFFFFF] font-medium text-[24px] 
            xl:text-[22px] 3xl:text-[1.25vw]  rounded-tl-[16px] 3xl:rounded-tl-[0.833vw]  mb-[16px] xl:mb-[16px] 3xl:mb-[0.833vw]">ELA Math Class</div>
                    <div className="flex gap-3">
                        <Image
                            width={40}
                            height={40}
                            src="/images/user_img1.png"
                            className="h-[40px] xl:w-[40px] 3xl:h-[2.083vw] 3xl:w-[2.083vw]"
                            alt="profile"
                        />
                        <div>
                            <p className="text-[#BACCE7] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-light">Created by</p>
                            <h6 className="text-[#FFF] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-medium"> Darrell Steward</h6>
                        </div>
                    </div>

                </div>
                <div className="flex justify-between w-full items-center">
                    <div className="flex w-full gap-[30px]">
                        <div>
                            <p className="text-[#F9FBFD] text-[26px] xl:text-[28px] 3xl:text-[1.563vw] font-semibold">15</p>
                            <h6 className="text-[#BACCE7] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-light">Students</h6>
                        </div>
                        <div>
                            <p className="text-[#F9FBFD] text-[26px] xl:text-[28px] 3xl:text-[1.563vw] font-semibold">5</p>
                            <h6 className="text-[#BACCE7] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-light">Assignments</h6>
                        </div>
                        <div>
                            <p className="text-[#F9FBFD] text-[26px] xl:text-[28px] 3xl:text-[1.563vw] font-semibold">2</p>
                            <h6 className="text-[#BACCE7] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-light">Quizzes</h6>
                        </div>
                        <div>
                            <p className="text-[#F9FBFD] text-[26px] xl:text-[28px] 3xl:text-[1.563vw] font-semibold">15</p>
                            <h6 className="text-[#BACCE7] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-light">Posts</h6>
                        </div>
                    </div>

                    <div className="px-[24px] xl:px-[22px] 3xl:px-[1.25vw] py-[8px] xl:py-[8px] 3xl:py-[0.417vw] bg-[#3166B7] rounded-lg text-center h-auto">
                        <h6 className="text-[#fff] text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-light leading-8">Score</h6>
                        <p className="text-[#F9FBFD] text-[26px] xl:text-[28px] 3xl:text-[1.563vw] font-semibold leading-tight">27</p>
                    </div>
                </div>
            </div>


            <div className="px-[24px] xl:px-[22px] 3xl:px-[1.25vw] pb-[24px] xl:pb-[22px] 3xl:pb-[1.25vw]">
                <div className="mt-[30px] xl:mt-[28px] 3xl:mt-[1.563vw]">
                    <div className="grid grid-cols-2 gap-[120px] 3xl:gap-[6.25vw]">
                        <div>
                            <div className="flex flex-wrap items-center justify-between mb-[24px] xl:mb-[22px] 3xl:mb-[1.25vw]">
                                <div>
                                    <div className="text-black font-medium text-[16px] xl:text-[14px] 3xl:text-[0.833vw] opacity-[0.8]">Assignment Submission Rate</div>
                                    <div className="text-black font-medium text-[24px] xl:text-[22px] 3xl:text-[1.25vw] opacity-[0.8]">62.76%</div>
                                </div>
                                <div>
                                    <div className="text-black font-medium text-[16px] xl:text-[14px] 3xl:text-[0.833vw] opacity-[0.8]">Class Average</div>
                                    <div className="text-black text-end font-medium text-[24px] xl:text-[22px] 3xl:text-[1.25vw] opacity-[0.8]">100</div>
                                </div>
                            </div>
                            <div className="h-[158px] 3xl:h-[8.229vw]">
                                <VerticalStackBarChart
                                    legend={{
                                        show: true,
                                        icon: "roundRect",
                                        bottom: "-1",
                                        left: "0%",
                                        itemWidth: 10,
                                        itemHeight: 10
                                    }}
                                    grid={{
                                        top: "0",
                                        right: "1%",
                                        bottom: "20%",
                                        left: "1%",
                                        containLabel: true,
                                    }}
                                    name={['Assignments Submitted', 'Assignments Not Submitted']}
                                    color={['#1570EF', '#3166B7']}
                                    data={[[70, 50, 60, 50, 40, 30], [30, 50, 40, 50, 60, 70]]}
                                    xAxisLabel={['2020-09-27', '2020-10-04', '2020-10-11', '2020-10-18', '2020-10-25', '2020-10-25']}
                                    barWidth={"70%"}
                                    label1={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                    label2={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}

                                />
                            </div>

                        </div>
                        <div>
                            <div className="flex flex-wrap items-center justify-between mb-[24px] xl:mb-[22px] 3xl:mb-[1.25vw]">
                                <div>
                                    <div className="text-black font-medium text-[16px] xl:text-[14px] 3xl:text-[0.833vw] opacity-[0.8]">Quiz Submission Rate</div>
                                    <div className="text-black font-medium text-[24px] xl:text-[22px] 3xl:text-[1.25vw] opacity-[0.8]">58.82%</div>
                                </div>
                                <div>
                                    <div className="text-black font-medium text-[16px] xl:text-[14px] 3xl:text-[0.833vw] opacity-[0.8]">Class Average</div>
                                    <div className="text-black text-end font-medium text-[24px] xl:text-[22px] 3xl:text-[1.25vw] opacity-[0.8]">100</div>
                                </div>
                            </div>
                            <div className="h-[158px] 3xl:h-[8.229vw]">
                                <VerticalStackBarChart
                                    legend={{
                                        show: true,
                                        icon: "roundRect",
                                        bottom: "-1",
                                        left: "0%",
                                        itemWidth: 10,
                                        itemHeight: 10
                                    }}
                                    grid={{
                                        top: "0",
                                        right: "1%",
                                        bottom: "20%",
                                        left: "1%",
                                        containLabel: true,
                                    }}
                                    name={['Quizzes Submitted', 'Quizzes Not Submitted']}
                                    color={['#1570EF', '#3166B7']}
                                    data={[[70, 50, 60, 50, 40], [30, 50, 40, 50, 60]]}
                                    xAxisLabel={['2020-09-27', '2020-10-04', '2020-10-11', '2020-10-18', '2020-10-25']}
                                    barWidth={"70%"}
                                    label1={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                    label2={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}

                                />
                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-[30px] xl:mt-[28px] 3xl:mt-[1.563vw]">
                    <div className='border border-[#E4E7EC] rounded-[6px] 3xl:rounded-[0.313vw] ChartShadow pb-[13px] mb-10'>
                        <div className='text-[#101828] font-bold text-[18px] xl:text-[16px] 3xl:text-[0.938vw] p-[20px] 3xl:p-[1.042vw]'>Student Details</div>

                        <div className="popupTable custpopuptable card w-full">
                            <DataTable
                                value={products}
                                headerColumnGroup={headerGroup}
                                scrollable
                                responsiveLayout="scroll"
                                stripedRows
                                className="w-full "
                                tableStyle={{ minWidth: '50rem' }}>
                                <Column
                                    field="studentID"
                                    style={{ minWidth: '8rem' }}>
                                </Column>
                                <Column
                                    sortable
                                    body={StudentNameBody}
                                    field="studentname"
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="schoolname"                             
                                    style={{ minWidth: '20rem' }}>
                                </Column>
                                <Column
                                    field="schooltype"
                                  
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="gender"
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="grade"
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="ethnicity"
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="city"
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="deviceinuse"
                                    style={{ minWidth: '13rem' }}>
                                </Column>

                                <Column
                                    field="noofsubmissions"
                                    style={{ minWidth: '15rem' }}>
                                </Column>
                                <Column
                                    field="nooflatesubmissions"
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="noofmissedsubmissions"                                   
                                    style={{ minWidth: '15rem' }}>
                                </Column>
                                <Column
                                    field="submissionsrate"                                   
                                    body={SubmissionsBody}
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="overallgrade"                                    
                                    body={SubmissionsBody}
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="noofsubmissions"                                
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="nooflatesubmissions"                                    
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="noofmissedsubmissions"                                
                                    style={{ minWidth: '15rem' }}>
                                </Column>
                                <Column
                                    field="submissionsrate"
                                    body={SubmissionsBody}
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                                <Column
                                    field="overallgrade"
                                    body={SubmissionsBody}
                                    style={{ minWidth: '13rem' }}>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>

            </div>
        </Sidebar>
    )
}

export default ClassDetails
