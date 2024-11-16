"use client";

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import CompositeScore from './compositescore';
import Studentdemographic from './studentdemographic';
import Attendance from './attendence';
import Studentdoutcomes from './studentoutcomes';
import Collegeandcareerreadiness from './collegeandcareerreadiness';
import Collegepersistence from './collegepersistence';

export default function Allschoollevel(props) {

    const product = [
        {
          schooltype: 'East Africa',
          score: 53.4,
          totalschools: 209,
          nochange: 75,
          improving:88,
          decline:43
        },
        {
            schooltype: 'Egypt',
            score: 57.5,
            totalschools: 148,
            nochange: 60,
            improving:77,
            decline:11
          },
          {
            schooltype: 'FWN Africa',
            score: 52.1,
            totalschools: 32,
            nochange: 8,
            improving:5,
            decline:19
          },
          {
            schooltype: 'Kenya',
            score: 47.9,
            totalschools: 26,
            nochange: 7,
            improving:6,
            decline:13
          },
      
      ];
    const [activeTab, setActiveTab] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [metaKey, setMetaKey] = useState(true);


    return (
        <div className="bg-[#ffffff] rounded-md ">
            <div className='flex items-center justify-between border-b xl:px-[0.833vw] py-[0.625vw]'>
                <div className='text-[18px] xl:text-[0.938vw] text-[#101828] font-semibold '>
              All School Levels
                </div>
                <div className=' flex flex-wrap gap-[8px]'>
                    <button onClick={() => setActiveTab(1)} className={`${activeTab === 1 ?'bg-[#1570EF] text-[#fff] border border-[#1570EF] ':' border border-[#E4E7EC] ' } py-[8px] px-[12px] xl:py-[6px] xl:px-[9px] 3xl:py-[0.417vw] 3xl:px-[0.625vw] rounded-[4px]  text-[14px] xl:text-[12px] 3xl:text-[0.677vw] font-medium`}>Composite Score</button>
                    <button onClick={() => setActiveTab(2)} className={`${activeTab === 2 ?'bg-[#1570EF] text-[#fff] border border-[#1570EF] ':' border border-[#E4E7EC] ' } py-[8px] px-[12px] xl:py-[6px] xl:px-[9px] 3xl:py-[0.417vw] 3xl:px-[0.625vw] rounded-[4px]  text-[14px] xl:text-[12px] 3xl:text-[0.677vw] font-medium`}>Student Demographic</button>
                    <button onClick={() => setActiveTab(3)} className={`${activeTab === 3 ?'bg-[#1570EF] text-[#fff] border border-[#1570EF] ':' border border-[#E4E7EC] ' } py-[8px] px-[12px] xl:py-[6px] xl:px-[9px] 3xl:py-[0.417vw] 3xl:px-[0.625vw] rounded-[4px]  text-[14px] xl:text-[12px] 3xl:text-[0.677vw] font-medium`}>Attendance</button>
                    <button onClick={() => setActiveTab(4)} className={`${activeTab === 4 ?'bg-[#1570EF] text-[#fff] border border-[#1570EF] ':' border border-[#E4E7EC] ' } py-[8px] px-[12px] xl:py-[6px] xl:px-[9px] 3xl:py-[0.417vw] 3xl:px-[0.625vw] rounded-[4px]  text-[14px] xl:text-[12px] 3xl:text-[0.677vw] font-medium`}>Student Outcomes</button>
                    <button onClick={() => setActiveTab(5)} className={`${activeTab === 5 ?'bg-[#1570EF] text-[#fff] border border-[#1570EF] ':' border border-[#E4E7EC] ' } py-[8px] px-[12px] xl:py-[6px] xl:px-[9px] 3xl:py-[0.417vw] 3xl:px-[0.625vw] rounded-[4px]  text-[14px] xl:text-[12px] 3xl:text-[0.677vw] font-medium`}>College and Career Readiness</button>
                    <button onClick={() => setActiveTab(6)} className={`${activeTab === 6 ?'bg-[#1570EF] text-[#fff] border border-[#1570EF] ':' border border-[#E4E7EC] ' } py-[8px] px-[12px] xl:py-[6px] xl:px-[9px] 3xl:py-[0.417vw] 3xl:px-[0.625vw] rounded-[4px]  text-[14px] xl:text-[12px] 3xl:text-[0.677vw] font-medium`}>College Persistence</button>

                    
                </div>
            </div>
            {activeTab === 1 && <CompositeScore />}
            {activeTab === 2 && <Studentdemographic />}
            {activeTab === 3 && <Attendance/>}
            {activeTab === 4 && <Studentdoutcomes/>}
            {activeTab === 5 && <Collegeandcareerreadiness/>}
            {activeTab === 6 && <Collegepersistence/>}
        </div>
    );
}
             




