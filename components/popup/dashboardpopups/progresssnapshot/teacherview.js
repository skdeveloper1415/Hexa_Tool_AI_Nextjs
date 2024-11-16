import React from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import Image from 'next/image'
import { ScrollPanel } from 'primereact/scrollpanel'

export default function TeacherView() {

  const products = [
    {
      teacherID: 12445,
      teachername: 'Jane Cooper',
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      studentenrollment: '5000',
      coursecreated: '10',
    },
    {
      teacherID: 12445,
      teachername: 'Jane Cooper',
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      studentenrollment: '5000',
      coursecreated: '10',
    },
    {
      teacherID: 12445,
      teachername: 'Jane Cooper',
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      studentenrollment: '5000',
      coursecreated: '10',
    },
    {
      teacherID: 12445,
      teachername: 'Jane Cooper',
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      studentenrollment: '5000',
      coursecreated: '10',
    },
    {
      teacherID: 12425,
      teachername: 'Jane Cooper',
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      studentenrollment: '5000',
      coursecreated: '10',
    },
    {
      teacherID: 1255,
      teachername: 'Jane Cooper',
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      studentenrollment: '5000',
      coursecreated: '10',
    },
    {
      teacherID: 12445,
      teachername: 'Jane Cooper',
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      studentenrollment: '5000',
      coursecreated: '10',
    },
  ]

  const TeacherNameBody = (rawData) => {
    return (
      <div className='flex items-center gap-[8px] 3xl:gap-[0.433vw]'><Image src={'/images/dashboard/table_profile_img.svg'} width={40} height={40} className='h-[40px] w-[40px] 3xl:h-[2.083vw] 3xl:w-[2.083vw] rounded-full' alt='' />{rawData.teachername}</div>
    )
  }

  return (
    <ScrollPanel style={{ width: '100%', height: '400px' }}>
    <div className='border border-[#E4E7EC] rounded-[6px] 3xl:rounded-[0.313vw] ChartShadow pb-[13px] mb-10'>
      <div className='text-[#101828] font-bold text-[18px] xl:text-[16px] 3xl:text-[0.938vw] p-[20px] 3xl:p-[1.042vw]'>Teacher View</div>
      <div className="popupTable card w-full">
        <DataTable
          value={products}
          scrollable
          stripedRows
          tableStyle={{ width: '100%' }}>
          <Column
            sortable
            field="teacherID"
            header="Teacher ID"
            style={{ minWidth: '15%' }}>
          </Column>
          <Column
            sortable
            body={TeacherNameBody}
            field="teachername"
            header="Teacher Name"
            style={{ minWidth: '15%' }}>
          </Column>
          <Column
            sortable
            field="schoolname"
            header="School Name"
            style={{ minWidth: '15%' }}>
          </Column>
          <Column
            sortable
            field="schooltype"
            header="School Type"
            style={{ minWidth: '15%' }}>
          </Column>
          <Column
            sortable
            field="studentenrollment"
            header="Student Enrollment"
            style={{ minWidth: '15%' }}>
          </Column>
          <Column
            sortable
            field="coursecreated"
            header="Course Created"
            style={{ minWidth: '15%' }}>
          </Column>
        </DataTable>
      </div>
    </div>
    </ScrollPanel>
  )
}
