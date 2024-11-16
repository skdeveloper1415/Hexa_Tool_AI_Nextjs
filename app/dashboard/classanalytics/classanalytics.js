"use client"
import React, { useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Link from 'next/link';
import Image from 'next/image';
import AllSchools from './allschools';

export default function ClassAnalytics() {
    const [activeTab, setActiveTab] = useState(1);
    
    return (
        <div>
            <div className='mb-[18px] xl:mb-[1.25vw]'>
                <div class="text-[#101828] text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold">Summary Dashboard</div>
                <div class="text-[#667085] text-[16px] xl:text-[14px] 3xl:text-[0.729vw] font-normal mt-[8px] xl:mt-[0.417vw]">AI Classroom that enhances Google Classroom by providing AI powered classroom</div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-2 mb-[24px] xl:mb-[1.667vw]'>
                <div className='flex items-center'>
                    <div onClick={() => setActiveTab(1)}
                        className={`${activeTab === 1 ? 'border-b border-b-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#E4E7EC] text-[#667085] font-normal'}  px-[12px] xl:px-[0.833vw] py-[8px] xl:py-[0.417vw] cursor-pointer`}>
                        <div className='text-[14px] xl:text-[16px] 3xl:text-[0.833vw]'>
                        All Schools
                        </div>
                    </div>
                    <div onClick={() => setActiveTab(2)}
                        className={`${activeTab === 2 ? 'border-b border-b-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#E4E7EC] text-[#667085] font-normal'}  px-[12px] xl:px-[0.833vw] py-[8px] xl:py-[0.417vw] cursor-pointer`}>
                        <div className='text-[14px] xl:text-[16px] 3xl:text-[0.833vw]'>
                        Elementary
                        </div>
                    </div>
                    <div onClick={() => setActiveTab(3)}
                        className={`${activeTab === 3 ? 'border-b border-b-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#E4E7EC] text-[#667085] font-normal'}  px-[12px] xl:px-[0.833vw] py-[8px] xl:py-[0.417vw] cursor-pointer`}>
                        <div className='text-[14px] xl:text-[16px] 3xl:text-[0.833vw]'>
                        Middle
                        </div>
                    </div>
                    <div onClick={() => setActiveTab(4)}
                        className={`${activeTab === 4 ? 'border-b border-b-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#E4E7EC] text-[#667085] font-normal'}  px-[12px] xl:px-[0.833vw] py-[8px] xl:py-[0.417vw] cursor-pointer`}>
                        <div className='text-[14px] xl:text-[16px] 3xl:text-[0.833vw]'>
                        High
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {activeTab === 1 && <AllSchools /> }
                {activeTab === 2 && 'Elementary' }
                {activeTab === 3 && 'Middle' }
                {activeTab === 4 && 'High' }
            </div>
        </div>
    )
}
