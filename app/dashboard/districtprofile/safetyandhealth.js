"use client"
import React, { useEffect, useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ChartWrapper from '../../../components/chartwrapper/page';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import HorizontalBarchart from '../../../components/charts/horizontalbarchart';
import Asthmarate from '../../../components/charts/dasboardcharts/asthmarate';



export default function SafetyandHealth() {
    const [products, setProducts] = useState([]);



    return (
        <>
            <div className='grid grid-cols-12 gap-5 xl:gap-[1.042vw]'>
                <div className='col-span-12 lg:col-span-6 xl:col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
                    <div className='flex items-center justify-between xl:pb-[0px]' >
                        <ChartWrapper
                            title={"Crimes"}
                            ExportIcon={false}
                            bulbIcon={false}
                            infoIcon={false}
                            tabSection={false}
                            downloadIcon={false}
                            graphIcon={false}
                            className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
                        />
                    </div>

                    <div className='card p-[20px] xl:p-[20px] 3xl:p-[1.25vw]'>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='rounded-lg'>
                                <div className='px-[15px] xl:px-[13px] 3xl:px-[0.781vw] py-[20px] xl:py-[20px] 3xl:py-[1.25vw]  flex flex-col justify-center items-center bg-[#F2F4F7] gap-[16px] xl:gap-[0.833vw] rounded-lg '>
                                    <div>
                                        <div className='flex justify-center items-center text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold '>Total Crime</div>
                                        <div className='flex justify-center items-center text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold ' >Index</div>
                                    </div>
                                    <div className='text-[30px] xl:text-[1.563vw] text-[#1B55AF] font-semibold'>11</div>
                                </div>
                            </div>
                            <div className='rounded-lg'>
                                <div className='px-[15px] xl:px-[13px] 3xl:px-[0.781vw] py-[20px] xl:py-[20px] 3xl:py-[1.25vw]  flex flex-col justify-center items-center bg-[#F2F4F7] gap-[16px] xl:gap-[0.833vw] rounded-lg '>
                                    <div>
                                        <div className='flex justify-center items-center text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold '>Violent Crime</div>
                                        <div className='flex justify-center items-center text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold ' >Index</div>
                                    </div>
                                    <div className='text-[30px] xl:text-[1.563vw] text-[#1B55AF] font-semibold'>3</div>
                                </div>
                            </div>
                            <div className='rounded-lg'>
                                <div className='px-[15px] xl:px-[13px] 3xl:px-[0.781vw] py-[20px] xl:py-[20px] 3xl:py-[1.25vw] flex flex-col justify-center items-center bg-[#F2F4F7] gap-[16px] xl:gap-[0.833vw] rounded-lg '>
                                    <div>
                                        <div className='flex justify-center items-center text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold '>Property Crime</div>
                                        <div className='flex justify-center items-center text-[14px] xl:text-[0.729vw] text-[#344054] font-semibold ' >Index</div>
                                    </div>
                                    <div className='text-[30px] xl:text-[1.563vw] text-[#1B55AF] font-semibold'>17</div>
                                </div>
                            </div>
                            
                        </div>

                        <div className="grid pt-[20px] xl:pt-[20px] 3xl:pt-[1.042vw] pb-[18px]" >
                            <div className=" text-[12px] xl:text-[12px] 3xl:text-[0.625vw]   leading-4 border border-1 rounded-lg cost-custom-table provision-table">


                                <table class="table auto custIcon  ">
                                    <thead>
                                        <tr>
                                            <th className="" style={{ backgroundColor: "#fff" }} scope="col" colspan="2"></th>

                                            <th
                                                className=" text-[14px] xl:text-[12px] 3xl:text-[0.729vw] text-[#344054] font-semibold items-center  py-[12px] xl:py-[12px] 3xl:py-[0.625vw] px-[20px] xl:px-[20px] 3xl:px-[1.25vw]"
                                                scope="col"
                                            >
                                                Violent
                                            </th>
                                            <th className="bg-[#EDF8F4]" scope="col"></th>
                                            <th
                                                className="bg-[#EDF8F4] text-[12px] xl:text-[12px] 3xl:text-[0.729vw] text-[#344054] font-semibold items-center  py-[12px] xl:py-[12px] 3xl:py-[0.625vw] px-[20px] xl:px-[20px] 3xl:px-[1.25vw]"
                                                scope="col"
                                            >
                                                Property
                                            </th>
                                            <th className="bg-[#EDF8F4]" scope="col"></th>
                                            <th
                                                className="bg-[#EDF8F4]  text-[12px] xl:text-[12px] 3xl:text-[0.729vw] text-[#344054] font-semibold items-center  py-[12px] xl:py-[12px] 3xl:py-[0.625vw] px-[20px] xl:px-[20px] 3xl:px-[1.25vw]"
                                                scope="col"
                                            >
                                                Total
                                            </th>
                                            {/* <th className="bg-[#EDF8F4]" scope="col"></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                className="w-full text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal text-[#4B586E] "
                                                scope="row"
                                                colSpan="2"
                                            >
                                                Number fo crimes
                                            </td>
                                            <td className=" text-[14px] xl:text-[12px] 3xl:text-[0.729vw] text-[#344054] font-normal">
                                                104
                                            </td>
                                            <td className="" scope="col"></td>
                                            <td className=" text-[14px] xl:text-[12px] 3xl:text-[0.729vw] text-[#344054] font-normal">
                                                239
                                            </td>
                                            <td className="]" scope="col"></td>
                                            <td className="text-[14px] xl:text-[12px] 3xl:text-[0.729vw] text-[#344054] font-normal">
                                                343
                                            </td>
                                            {/* <td className="" scope="col"></td> */}

                                        </tr>
                                        <tr>
                                            <td
                                                className="w-full text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal text-[#4B586E]"
                                                scope="row"
                                                colSpan="2"
                                            >
                                                Crime rate (per 1,00 residents)
                                            </td>
                                            <td className="text-[14px] xl:text-[12px] 3xl:text-[0.729vw] text-[##344054] font-normal">
                                                16.85
                                            </td>
                                            <td className="" scope="col"></td>
                                            <td className="text-[14px] xl:text-[12px] 3xl:text-[0.729vw] text-[##344054] font-normal">
                                                38.72
                                            </td>
                                            <td className="]" scope="col"></td>
                                            <td className="text-[14px] xl:text-[12px] 3xl:text-[0.729vw] text-[##344054] font-normal">
                                                55.57
                                            </td>
                                            {/* <td className="" scope="col"></td> */}

                                        </tr>

                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>

                </div>
                <div className='col-span-12 lg:col-span-6 xl:col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
                    <div className="">
                        <ChartWrapper
                            title={"Obesity and Overweight"}
                            ExportIcon={false}
                            bulbIcon={false}
                            infoIcon={false}
                            tabSection={false}
                            downloadIcon={false}
                            graphIcon={false}
                            className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
                        />
                    </div>
                    <div className='w-full h-[327px] xl:h-[365px] 2xl:h-[350px] 3xl:h-[16.427vw] p-[20px] xl:p-[20px] 3xl:p-[1.042vw]'> <HorizontalBarchart /></div>
                </div>
                <div className='col-span-12 lg:col-span-6 xl:col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
                    <div className="">
                        <ChartWrapper
                            title={"Asthma Rate by Age, Sex & Ethnicity"}
                            ExportIcon={false}
                            bulbIcon={false}
                            infoIcon={false}
                            tabSection={false}
                            downloadIcon={false}
                            graphIcon={false}
                            className="text-[18px] xl:text-[0.938vw] font-medium pb-0"
                        />

                        <div className='h-[350px] xl:h-[19.271vw]'>
                            <Asthmarate />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 pb-[20px] xl:pb-[20px] 3xl:pb-[1.042vw] px-[20px] xl:px-[20px] 3xl:px-[1.042vw] '>

                        <div className='p-[20px] xl:p-[20px]  3xl:p-[1.042vw] flex flex-col items-center bg-[#F2F4F7] border-r-2 border-[#E4E7EC] rounded-l'>
                            <div className='text-[14px] xl:text-[14px] 3xl:text-[0.729vw] text-[#344054] font-medium'> Below 18 Chronic Disease Rate</div>
                            <div className='text-[30px] xl:text-[30px] 3xl:text-[1.563vw] text-[#1B55AF] font-semibold'>11</div>
                        </div>
                        <div className='p-[20px] xl:p-[20px]  3xl:p-[1.042vw] flex flex-col items-center bg-[#F2F4F7] rounded-r'>
                            <div className='text-[14px] xl:text-[14px] 3xl:text-[0.729vw] text-[#344054] font-medium'>Adult Chronic Disease Rate</div>
                            <div className='text-[30px] xl:text-[30px] 3xl:text-[1.563vw] text-[#1B55AF] font-semibold'>3</div>
                        </div>
                    </div>

                </div>


            </div>


        </>
    )
}