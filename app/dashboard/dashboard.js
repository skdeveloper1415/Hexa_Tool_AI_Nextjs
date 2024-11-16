"use client";
import React, { useState } from "react";
import AutomationDashboard from "./automationdashboard/automationdashboard";
import DistrictAtaGlance from "./districtataglance/page";
import ClassroomAtaGlance from "./classroomataglance/page";
import DistrictProfile from "./districtprofile/page";
import DistrictPerformance from "./districtperformance/page";

export default function Dashboard(props) {
    const [activeTab, setActiveTab] = useState(props.activeTab);

    const tabs = [
        { id: 1, label: 'Automation Dashboard', component: <AutomationDashboard /> },
        { id: 2, label: 'District At a Glance', component: <DistrictAtaGlance /> },
        { id: 3, label: 'Classroom At a Glance', component: <ClassroomAtaGlance /> },
        // { id: 4, label: 'Class Analytics', component: <ClassAnalytics /> },
        { id: 5, label: 'District Profile', component: <DistrictProfile /> },
        { id: 6, label: 'District Performance', component: <DistrictPerformance /> }
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className='mx-auto 3xl:px-[6.771vw] xl:px-[100px] px-[20px] bg-[#F9FAFB]'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex items-center'>
                    {tabs.map(tab => (
                        <div key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`${activeTab === tab.id ? 'border-l border-t border-r border-[#101828] text-[#101828] font-semibold' : 'border-b border-b-[#C8CBD0] text-[#667085] font-normal'}  px-[20px] xl:px-[18px] 3xl:px-[0.942vw] py-[11px] xl:py-[9px] 3xl:py-[0.473vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}>
                            <div className='text-[16px] xl:text-[14px] 3xl:text-[0.833vw]'>
                                {tab.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-[24px] xl:mt-[1.25vw]'>
                {tabs.find(tab => tab.id === activeTab)?.component}
            </div>
        </div>
    );
}
