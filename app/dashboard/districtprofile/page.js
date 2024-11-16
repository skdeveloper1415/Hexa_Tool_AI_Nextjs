'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import PopulationIncomeEmployment from './populationincomeemployment';
import Demographics from './demographics';
import SafetyandHealth from './safetyandhealth';

export default function DistrictProfile() {
    const [activeTab, setActiveTab] = useState(1);


    return (
        <>
            <div className='text-[#101828] text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold'>
                District Area Profile
            </div>
            <div className='text-[#667085] text-[16px] xl:text-[14px] 3xl:text-[0.729vw] font-normal mt-[8px] xl:mt-[0.417vw]'>
                AI Classroom that enhances Google Classroom by providing AI powered classroom
            </div>
            <div className='mt-[34px] xl:mt-[1.771vw]'>
            <div className=''>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center'>
                        <div onClick={() => setActiveTab(1)}
                            className={`${activeTab === 1 ? 'border-b border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}>
                            <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                            Population, Income, Employment
                            </div>
                        </div>
                        <div onClick={() => setActiveTab(2)}
                            className={`${activeTab === 2 ? 'border-b border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}>
                            <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                            Demographics
                            </div>
                        </div>
                        <div onClick={() => setActiveTab(3)}
                            className={`${activeTab === 3 ? 'border-b border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}>
                            <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                            Safety & Health
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-[24px] xl:mt-[1.25vw]'>
                    {activeTab === 1 && < PopulationIncomeEmployment /> }
                    {activeTab === 2 && <Demographics/> }
                    {activeTab === 3 && < SafetyandHealth/>}
                </div>

            </div>
            </div>
          
        </>
    )
}
