"use client"
import React, { useEffect, useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ChartWrapper from '../../../components/chartwrapper/page';
import Image from 'next/image';
import DemographybyAge from '../../../components/charts/demographybyage';
import Mulhorizontalbarchart from '../../../components/charts/mulhorizontalbarchart';
import Horizontalbarchartone from '../../../components/charts/horizontalbarchartone';
import FinancialDetails from '../../../components/charts/financialdetails';
export default function PopulationIncomeEmployment() {

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-[1.042vw]'>
                <div className='bg-[#fff] border border-[#E4E7EC] rounded-lg h-full pb-[20px] xl:pb-[1.042vw]'>
                    <div className="">
                        <ChartWrapper
                            title={"Population"}
                            ExportIcon={false}
                            bulbIcon={false}
                            infoIcon={false}
                            tabSection={false}
                            downloadIcon={false}
                            graphIcon={false}
                            className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
                        />
                    </div>
                    <div className='mx-[20px] mt-[20px]'>
                        <div className='bg-[#F2F4F7] rounded-lg p-[16px] xl:p-[0.833vw]'>
                            <div className='flex justify-between items-center '>
                                <div className='flex items-center gap-[12px] xl:gap-[0.625vw]'>
                                    <i className='hexatoolpopulation text-[72px] xl:text-[3.75vw] text-[#98A2B3]'></i>
                                    <div className='flex flex-col'>
                                        <div className='text-[14px] xl:text-[0.729vw] text-[#667085] font-medium'>Population</div>
                                        <div className='text-[32px] xl:text-[1.667vw] text-[#101828] font-bold'>50,812</div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex items-center gap-[7px] xl:gap-[0.365vw]'>
                                        <div className='text-[32px] xl:text-[1.667vw] font-medium text-[#000000DE]'>85% </div>
                                        <div><Image alt="updown" src="/images/up_down_icon.svg" width="14" height="30" /></div>
                                    </div>
                                    <div className='text-[14px] xl:text-[0.729vw] text-[#667085]'>2030</div>
                                </div>
                            </div>
                        </div>
                        <div className='my-[30px] xl:mt-[1.563vw] text-[16px] xl:text-[0.833vw] text-[#667085] font-normal'>Demography by Age</div>
                        <div className='h-[350px] xl:h-[19.271vw]'>
                            <DemographybyAge />
                        </div>
                    </div>


                </div>
                <div className='bg-[#fff] border border-[#E4E7EC] rounded-lg'>
                    <div className="">
                        <ChartWrapper
                            title={"Financial Details"}
                            ExportIcon={false}
                            bulbIcon={false}
                            infoIcon={false}
                            tabSection={false}
                            downloadIcon={false}
                            graphIcon={false}
                            className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
                        />
                    </div>
                    <div className='mx-[20px] mt-[20px]'>
                        <div className='h-[350px] xl:h-[18.229vw]'>
                            <div className='grid grid-cols-2 gap-[20px] xl:gap-[1.042vw]'>
                                <div >
                                    <FinancialDetails />
                                </div>

                                <div>
                                    <div className='bg-[#F2F4F7] rounded-lg pt-[8px] xl:pt-[0.417vw] px-[16px] xl:px-[0.833vw] pb-[16px] xl:pb-[0.833vw]'>
                                        <div className='flex flex-col gap-[7px] xl:gap-[0.365vw]'>
                                            <div className='text-[14px] xl:text-[0.729vw] text-[#667085] font-normal'>Total Headcount</div>
                                            <div className='flex items-center gap-[7px] xl:gap-[0.365vw]'>
                                                <div className='text-[32px] xl:text-[1.667vw] text-[#344054] font-bold'>4,533</div>
                                                <div className='flex flex-col gap-[2px] xl:gap-[0.104vw]'>
                                                    <div className='flex gap-[2px] xl:gap-[0.104vw]'>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                    </div>
                                                    <div className='flex gap-[2px] xl:gap-[0.104vw]'>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                        <i className='hexatoolman-outline text-[#667085] text-[15px] xl:text-[0.625vw]'></i>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className='mt-[30px] xl:mt-[1.563vw] ml-[16px] xl:ml-[0.833vw]'>
                                        <div className=''>
                                            <div className='flex items-center gap-[13px] xl:gap-[0.677vw]'>
                                                <div><i className='hexatoolowners text-[#123B7A] text-[60px] xl:text-[3.125vw]'></i></div>

                                                <div >
                                                    <div className='text-[30px] xl:text-[1.563vw] text-[#344054] font-bold'>3,543</div>
                                                    <div className='text-[20px] xl:text-[1.042vw] text-[#667085] font-normal'>Renters</div>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-[13px] xl:gap-[0.677vw] mt-[32px] xl:mt-[1.667vw]'>
                                                <div><i className='hexatoolowners text-[#447CD4] text-[60px] xl:text-[3.125vw]'></i></div>

                                                <div >
                                                    <div className='text-[30px] xl:text-[1.563vw] text-[#344054] font-bold'>987</div>
                                                    <div className='text-[20px] xl:text-[1.042vw] text-[#667085] font-normal'>Owners</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#F2F4F7] rounded-lg p-[16px] xl:p-[0.833vw]'>
                            <div className='flex justify-between items-center '>
                                <div className='flex items-center gap-[12px] xl:gap-[0.625vw]'>
                                    <div><i className='hexatoolhome-value text-[#98A2B3] text-[72px] xl:text-[3.75vw]'></i></div>

                                    <div className='flex flex-col'>
                                        <div className='text-[14px] xl:text-[0.729vw] text-[#667085] font-medium'>Median Home Value</div>
                                        <div className='text-[32px] xl:text-[1.667vw] text-[#101828] font-bold'>$273,470</div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex items-center gap-[7px] xl:gap-[0.365vw]'>
                                        <div className='text-[20px] xl:text-[1.042vw] font-medium text-[#000000DE]'>85% </div>
                                        <div><Image alt="updown" src="/images/up_down_icon.svg" width="14" height="30" /></div>
                                    </div>
                                    <div className='text-[14px] xl:text-[0.729vw] text-[#667085]'>LY var.</div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#F2F4F7] rounded-lg p-[16px] xl:p-[0.833vw] my-[20px] xl:my-[1.042vw]'>
                            <div className='flex justify-between items-center '>
                                <div className='flex items-center gap-[12px] xl:gap-[0.625vw]'>
                                    <div><i className='hexatoolmarket-rent text-[#98A2B3] text-[72px] xl:text-[3.75vw]'></i></div>

                                    <div className='flex flex-col'>
                                        <div className='text-[14px] xl:text-[0.729vw] text-[#667085] font-medium'>Average Market Rent</div>
                                        <div className='text-[32px] xl:text-[1.667vw] text-[#101828] font-bold'>$1,104/month</div>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='flex items-center gap-[7px] xl:gap-[0.365vw]'>
                                        <div className='text-[20px] xl:text-[1.042vw] font-medium text-[#000000DE]'>85% </div>
                                        <div><Image alt="updown" src="/images/up_down_icon.svg" width="14" height="30" /></div>
                                    </div>
                                    <div className='text-[14px] xl:text-[0.729vw] text-[#667085]'>LY var.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-[#fff] border border-[#E4E7EC] rounded-lg '>
                    <div className="">
                        <ChartWrapper
                            title={"Employment"}
                            ExportIcon={false}
                            bulbIcon={false}
                            infoIcon={false}
                            tabSection={false}
                            downloadIcon={false}
                            graphIcon={false}
                            className="text-[18px] xl:text-[0.938vw] font-medium pb-0"
                        />
                    </div>
                    <div className='mx-[20px] h-[400px] xl:h-[20.833vw]'>
                        <Mulhorizontalbarchart
                            tooltip={{
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }}
                            grid={{
                                top: '0%',
                                left: '2%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            }}
                            min={0}
                            max={100}
                            interval={20}

                            XaxisLabel={{
                                color: "#101828",
                                fontSize: 11,
                                formatter: "{value} %",
                            }}
                            XsplitLine={true}
                            XlineStyle={{
                                type: "dashed",
                                color: "#C8CBD0",
                            }}
                            YaxisLabel={{
                                color: "#24262D",
                                fontSize: 10,
                             
                            }}
                            YaxisTick={false}
                            YaxisLine={false}
                            YlineStyle={{
                                color: "#E4E7EC"
                            }}
                            dataYaxis={['Native Farmers', 'Factory Workers and \n Labors', 'Office Support \n Workers', 'Sales and Service \n Workers', 'Executives,Manager \n & Professionals']}
                            name={'language'}
                            label={{
                                show: true,
                                position: 'outside',
                                color: '#344054',
                                formatter: "{c} %",
                                fontSize: 12,
                            }}
                            itemstyle={{
                                color: "#4C80E4",
                                borderRadius: [0, 4, 4, 0]
                            }}
                            data={[20, 50, 60, 67, 70]}
                        />
                    </div>
                    <div className='mx-[20px] py-[20px] border-t border-[#E4E7EC]'>
                        <div className='grid grid-cols-2 gap-[20px] xl:gap-[1.042vw]'>
                            <div className=''>
                                <div className='text-[#667085] text-[14px] xl:text-[0.729vw] pb-[8px] xl:pb-[0.417vw] font-normal'>Per Capita Income</div>
                                <div className='h-[50px] xl:h-[2.604vw]'>
                                    <Horizontalbarchartone
                                        grid={
                                            {
                                                top: -15,
                                                bottom: 0,
                                                left: 0,
                                                right: 40
                                            }
                                        }
                                        legend={
                                            {
                                                data: ['28,412', '36,874'],
                                                orient: 'vertical',
                                                right: "-2%",
                                                itemWidth: 8,
                                                itemHeight: 8,
                                                textStyle: {
                                                    fontStyle: "normal",
                                                    fontWeight: "normal",
                                                    fontSize: 8,
                                                    color: "#667085",
                                                }
                                            }
                                        }
                                        XsplitLine={false}
                                        XaxisLabel={false}
                                        YaxisLabel={false}
                                        YaxisLine={false}
                                        YaxisTick={false}
                                        dataone={90}
                                        datatwo={30}
                                        nameone={"36,874"}
                                        nametwo={"28,412"}
                                        bargapone={0}
                                        bargaptwo={"-77%"}
                                        barwidthone={'50%'}
                                        barwidthtwo={"30%"}
                                        colorone={'#E4E7EC'}
                                        colortwo={'#1B55AF'}
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <div className='text-[#667085] text-[14px] xl:text-[0.729vw] pb-[8px] xl:pb-[0.417vw] font-normal'>Unemployed</div>
                                <div className='h-[50px] xl:h-[2.604vw]'>
                                    <Horizontalbarchartone
                                        grid={
                                            {
                                                top: -15,
                                                bottom: 0,
                                                left: 0,
                                                right: 40
                                            }
                                        }
                                        legend={
                                            {
                                                data: ['28,412', '36,874'],
                                                orient: 'vertical',
                                                right: "-2%",
                                                itemWidth: 8,
                                                itemHeight: 8,
                                                textStyle: {
                                                    fontStyle: "normal",
                                                    fontWeight: "normal",
                                                    fontSize: 8,
                                                    color: "#667085",
                                                },
                                                formatter: function(name) {
                                                    return `${name} %`; 
                                                }
                                            }
                                        }
                                        XsplitLine={false}
                                        XaxisLabel={false}
                                        YaxisLabel={false}
                                        YaxisLine={false}
                                        YaxisTick={false}
                                        dataone={90}
                                        datatwo={30}
                                        nameone={"36,874"}
                                        nametwo={"28,412"}
                                        bargapone={0}
                                        bargaptwo={"-77%"}
                                        barwidthone={'50%'}
                                        barwidthtwo={"30%"}
                                        colorone={'#E4E7EC'}
                                        colortwo={'#1B55AF'}
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <div className='text-[#667085] text-[14px] xl:text-[0.729vw] pb-[8px] xl:pb-[0.417vw] font-normal'>Median Household Income</div>
                                <div className='h-[50px] xl:h-[2.604vw]'>
                                    <Horizontalbarchartone
                                        grid={
                                            {
                                                top: -15,
                                                bottom: 0,
                                                left: 0,
                                                right: 40
                                            }
                                        }
                                        legend={
                                            {
                                                data: ['28,412', '36,874'],
                                                orient: 'vertical',
                                                right: "-2%",
                                                itemWidth: 8,
                                                itemHeight: 8,
                                                textStyle: {
                                                    fontStyle: "normal",
                                                    fontWeight: "normal",
                                                    fontSize: 8,
                                                    color: "#667085",
                                                }
                                            }
                                        }
                                        XsplitLine={false}
                                        XaxisLabel={false}
                                        YaxisLabel={false}
                                        YaxisLine={false}
                                        YaxisTick={false}
                                        dataone={90}
                                        datatwo={50}
                                        nameone={"36,874"}
                                        nametwo={"28,412"}
                                        bargapone={0}
                                        bargaptwo={"-77%"}
                                        barwidthone={'50%'}
                                        barwidthtwo={"30%"}
                                        colorone={'#E4E7EC'}
                                        colortwo={'#1B55AF'}
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <div className='text-[#667085] text-[14px] xl:text-[0.729vw] pb-[8px] xl:pb-[0.417vw] font-normal'>Poverty Index</div>
                                <div className='h-[50px] xl:h-[2.604vw]'>
                                    <Horizontalbarchartone
                                        grid={
                                            {
                                                top: -15,
                                                bottom: 0,
                                                left: 0,
                                                right: 40
                                            }
                                        }
                                        legend={
                                            {
                                                data: ['28,412', '36,874'],
                                                orient: 'vertical',
                                                right: "-2%",
                                                // bottom: "50%",
                                                itemWidth: 8,
                                                itemHeight: 8,
                                                textStyle: {
                                                    fontStyle: "normal",
                                                    fontWeight: "normal",
                                                    fontSize: 8,
                                                    color: "#667085",
                                                },
                                                formatter: function(name) {
                                                    return `${name} %`; 
                                                }
                                            }
                                        }
                                        XsplitLine={false}
                                        XaxisLabel={false}
                                        YaxisLabel={false}
                                        YaxisLine={false}
                                        YaxisTick={false}
                                        dataone={90}
                                        datatwo={50}
                                        nameone={"36,874"}
                                        nametwo={"28,412"}
                                        bargapone={0}
                                        bargaptwo={"-77%"}
                                        barwidthone={'50%'}
                                        barwidthtwo={"30%"}
                                        colorone={'#E4E7EC'}
                                        colortwo={'#1B55AF'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}