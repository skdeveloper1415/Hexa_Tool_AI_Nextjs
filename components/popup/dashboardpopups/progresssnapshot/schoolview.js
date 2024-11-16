import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ScrollPanel } from 'primereact/scrollpanel'
import React from 'react'

export default function SchoolView() {
  const products = [
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '63.29',
      min: '35.71',
      interval:'7.14',
    },
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '20.29',
      min: '35.71',
      interval:'7.14',
    },
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '80.29',
      min: '35.71',
      interval:'7.14',
    },
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '5.29',
      min: '35.71',
      interval:'7.14',
    },
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '5.29',
      min: '35.71',
      interval:'7.14',
    },
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '5.29',
      min: '35.71',
      interval:'7.14',
    },
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '5.29',
      min: '35.71',
      interval:'7.14',
    },
    {
      schoolname: 'Acequia Madre Elementary',
      schooltype: 'Elementary School',
      gradeconfiguration: 'KG-1',
      studentenrollment: '5000',
      adoptionrate: '5.29',
      min: '35.71',
      interval:'7.14',
    },
  ]

  const AdoptionRateBody = (rawData) => {
    if(rawData.adoptionrate <= 33){
      return (
        <div className='flex items-center gap-[8px] 3xl:gap-[0.433vw]'><div className='h-3 w-3 3xl:h-[0.625vw] 3xl:w-[0.625vw] rounded-full bg-[#FDA29B]'></div>{rawData.adoptionrate}%</div>
      )
    } else if(rawData.adoptionrate <= 66) {
      return (
      <div className='flex items-center gap-[8px] 3xl:gap-[0.433vw]'><div className='h-3 w-3 3xl:h-[0.625vw] 3xl:w-[0.625vw] rounded-full bg-[#FEC84B]'></div>{rawData.adoptionrate}%</div>
      )
    } else {
      return (
      <div className='flex items-center gap-[8px] 3xl:gap-[0.433vw]'><div className='h-3 w-3 3xl:h-[0.625vw] 3xl:w-[0.625vw] rounded-full bg-[#6CE9A6] '></div>{rawData.adoptionrate}%</div>
      )
    }
  }

  const MinRateRateBody = (rawData) => {
      return (
        <div className='flex items-center gap-[8px] 3xl:gap-[0.433vw]'><div className='h-3 w-3 3xl:h-[0.625vw] 3xl:w-[0.625vw] rounded-full bg-[#FDA29B]'></div>{rawData.min}</div>
      )
  }

  const IntervalBody = (rawData) => {
      return (
        <div className='flex items-center gap-[8px] 3xl:gap-[0.433vw]'><div className='h-3 w-3 3xl:h-[0.625vw] 3xl:w-[0.625vw] rounded-full bg-[#FEC84B]'></div>{rawData.interval}</div>
      )
  }

  return (
    <ScrollPanel style={{ width: '100%', height: '400px' }}>
    <div className='border border-[#E4E7EC] rounded-[6px] 3xl:rounded-[0.313vw] ChartShadow pb-[13px] w-full mb-10'>
      <div className='text-[#101828] font-bold text-[18px] xl:text-[16px] 3xl:text-[0.938vw] p-[20px] 3xl:p-[1.042vw]'>School View</div>
      <div className="popupTable card w-full">
        <DataTable
          value={products}
          scrollable
          stripedRows
          tableStyle={{ width: '100%' }}>
            
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
            field="gradeconfiguration"
            header="Grade Configuration"
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
            field="adoptionrate"
            header="Adoption Rate (%)"
            body={AdoptionRateBody}
            style={{ minWidth: '15%' }}>
          </Column>
          <Column
            sortable
            field="min"
            body={MinRateRateBody}
            header="0 (in%)"
            style={{ minWidth: '15%' }}>
          </Column>
          <Column
            sortable
            field="interval"
            body={IntervalBody}
            header="1 to 2 (in%)"
            style={{ minWidth: '15%' }}>
          </Column>
        </DataTable>
      </div>
    </div>
    </ScrollPanel>
  )
}
