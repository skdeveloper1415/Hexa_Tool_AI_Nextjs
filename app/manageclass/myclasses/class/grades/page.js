"use client";

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { getGrades } from '../../../../actions/classowrkListing';
import { toast } from "react-toastify";
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
import { ProgressSpinner } from 'primereact/progressspinner';
import Image from 'next/image';

export default function Grades(props) {
    useEffect(() => { props.setShowBack(true) }, [])
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });


    const representativeBodyTemplate = (rowData) => {
        const student_name = rowData?.name;
        const photoUrl = rowData?.photoUrl;

        return (
            <div className="flex align-items-center gap-2">
                <Image alt={student_name} src={`https:${photoUrl}`} width="32" height="25" />
                <span>{student_name}</span>
            </div>
        );
    };

    const { classIdValue } = props;
    const [loading, setLoading] = useState(false);
    const [arrayFromAPI, setArrayFromAPI] = useState()
    useEffect(() => {

        getGradedsList();

    }, [classIdValue])


    const getGradedsList = async () => {

        try {
            setLoading(true)
            if (classIdValue) {
                let accessToken = getDataFromLocalStorage("access_token");

                const payload = {
                    "accessToken": accessToken,
                    "courseId": classIdValue,
                }

                const response = await getGrades(payload);
                if (response?.success && response?.data?.data) {
                    setArrayFromAPI(response.data.data)
                }
            }
            else if (response.code == 500) {
                toast.error(response?.message || 'Something Went Wrong')
                setLoading(false);
            }
            else {
                // setAssignments([]);
                toast.error(response?.error || 'Something Went Wrong')
                setLoading(false);
            }

        } catch (error) {

            toast.error('something went wrong');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (arrayFromAPI) {
            // transformedData;
            getTransformedData();
        }
    }, [arrayFromAPI])

    const [columnList, setColumnList] = useState([]);
    const [finalData, setFinalData] = useState([]);

    const getTransformedData = async () => {

        const transformedData = arrayFromAPI?.map(entry => {
            return {
                userProfile: {
                    id: entry?.userProfile?.id,
                    fullName: entry?.userProfile?.name?.fullName,
                    photoUrl: entry?.userProfile?.photoUrl,
                },
                studentSubmissions: entry?.studentSubmissions?.map(submission => {

                    let maxValue = '';
                    for (let i = 0; i < submission?.submissionHistory?.length; i++) {
                        let item = submission?.submissionHistory[i];
            
                        if (item?.gradeHistory) {
                            maxValue = item?.gradeHistory?.maxPoints;
                            break;
                        }
                    }



                    return {
                        assignmentName: submission?.assignmentName,
                        draftGrade: submission.draftGrade,
                        maxValue:maxValue
                    };
                })
            };
        });
        let firstObject = transformedData[0];
        let studentSubmissionsData = firstObject?.studentSubmissions;
        const columnList = studentSubmissionsData?.map((item) => {
            return { draftGrade: item?.assignmentName, assignmentName: item?.assignmentName }
        })
        setColumnList(columnList);

        const dd = transformedData.map((item) => {

            let obj = { name: item.userProfile.fullName, photoUrl: item?.userProfile?.photoUrl }

            for (let j = 0; j < item.studentSubmissions.length; j++) {
                obj[`${item.studentSubmissions[j].assignmentName}`] = `${item.studentSubmissions[j].draftGrade ?? 0} / ${item.studentSubmissions[j].maxValue == "" ? 0 : item.studentSubmissions[j].maxValue}`;
            }

            return obj;
        })
        setFinalData(dd);
    }
    

    const renderHeader = () => {
        return (
            <div className='text-[18px] xl:text-[0.938vw] text-[#101828] font-semibold '>
                Student Grades<span className='text-[12px] xl:text-[0.625vw] xl:text-[0.625vw] text-[#667085] font-normal ml-[5px] xl:ml-[0.26vw]'>{`Total ${columnList?.length} Assignments`}</span>
            </div>

        );
    };
    const header = renderHeader();

    return (
        <div className = "bg-[#ffffff] rounded-md shadow-lg customTable custpaginator subheader whitespace-nowrap">
            {loading ? <div className='flex justify-between align-center'><ProgressSpinner /></div> :

                <DataTable scrollable  value={finalData} paginator rows={5} stripedRows header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                    // selection={selectedCustomer}  ={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                    stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="No Students found." tableStyle={{ minWidth: '50rem' }}>
                    <Column
                        frozen 
                        field="name"
                        header="Sort by Last names" sortable
                        body={representativeBodyTemplate}
                        style={{ minWidth: '200px' }}>
                    </Column>

                    {columnList?.map((col, i) => (
                        <Column key={col?.assignmentName} field={col?.assignmentName} header={col?.assignmentName} style={{ width:'10%' }} />
                    ))}
                </DataTable>}
        </div>
    );
}





