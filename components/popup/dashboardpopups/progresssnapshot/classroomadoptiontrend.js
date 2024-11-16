import React, { useState } from 'react'
import HorizontalStackBarChart from '../../../charts/dasboardcharts/horizontalstackbarchart';
import { Dropdown } from 'primereact/dropdown';
import MultiplebarWithLineChart from '../../../charts/dasboardcharts/multiplebarwithlinechart';
import Topperformingschools from '../../../../components/charts/dasboardcharts/topperformingschools'
import Lessclassroomadoption from '../../../charts/dasboardcharts/lessclassroomadoption'
import { ScrollPanel } from 'primereact/scrollpanel';

export default function ClassroomAdoptionTrend() {
    const [SchoolType, setSchoolType] = useState(null);
    const SchoolTypeData = [
        { name: 'School 1', code: 'NY' },
        { name: 'School 2', code: 'RM' },
        { name: 'School 3', code: 'LDN' },
        { name: 'School 4', code: 'IST' },
        { name: 'School 5', code: 'PRS' }
    ];

    const MultipleBarChartData = {
        labels: ['department', 'Bar1', 'Bar2', 'Bar3', 'Bar4','Line'],
        values: [
          { department: 'July', Bar1: 50, Bar2: 10, Bar3: 20, Bar4: 40, Line:40},
          { department: 'August', Bar1: 55, Bar2: 20, Bar3: 35, Bar4: 52, Line:60},
          { department: 'September', Bar1: 40, Bar2: 20, Bar3: 35, Bar4: 52, Line:40},
          { department: 'October', Bar1: 30, Bar2: 20, Bar3: 35, Bar4: 52, Line:70},
          { department: 'November', Bar1: 40, Bar2: 20, Bar3: 35, Bar4: 52, Line:70 },
          { department: 'December', Bar1: 50, Bar2: 20, Bar3: 35, Bar4: 52, Line:70 },
          { department: 'January', Bar1: 60, Bar2: 20, Bar3: 35, Bar4: 52, Line:70 },
          { department: 'February', Bar1: 57, Bar2: 20, Bar3: 35, Bar4: 52, Line:70 },
          { department: 'March', Bar1: 55, Bar2: 30, Bar3: 35, Bar4: 40, Line:70 },
          { department: 'April', Bar1: 52, Bar2: 20, Bar3: 10, Bar4: 55, Line:70 },
          { department: 'May', Bar1: 56, Bar2: 20, Bar3: 20, Bar4: 60, Line:70 },
          { department: 'Jun', Bar1: 57, Bar2: 20, Bar3: 22, Bar4: 55, Line:70 },
        ]
      }
    return (
        <>
            <ScrollPanel style={{ width: '100%', height: '500px' }}>
            <div className='grid grid-cols-12'>
                <div className='lg:col-span-7 col-span-12 h-[69px] 3xl:h-[3.594vw]'>
                    <HorizontalStackBarChart
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
                        name={['0', '1-2', '3', '>3']}
                        color={['#FF4537', '#FEC84B', '#03DAC6', '#777DFF']}
                        data={[[63], [5], [5], [33.43]]}
                        barWidth={"70%"}
                        label1={{
                            show: true,
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
                        label3={{
                            show: false,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            position: 'insideLeft',
                            formatter: '{c}%',
                        }}
                        label4={{
                            show: true,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            position: 'insideLeft',
                            formatter: '{c}%',
                        }}
                    />
                </div>
            </div>
            <div className='h-[398px] 3xl:h-[20.729vw]'>
                <MultiplebarWithLineChart
                    grid={{ top: 50, left: 35, bottom:40,right:25 }}
                    xAxisName={""}
                    xAxisNameGap={""}
                    xAxisNamePosition={"middle"}
                    yAxisName={""}
                    yAxisNameGap={""}
                    yAxisNamePosition={"middle"}
                    legend={{
                        show: false,
                        bottom: 0,
                        left: 5,
                        itemHeight: 10,
                        itemWidth: 10,
                        textStyle: {
                            color: '#344054',
                        },
                    }}
                    color1={"#FF4537"} color2={"#FEC84B"} color3={"#03DAC6"} color4={'#777DFF'} color5={'#1570EF'}
                    yAxisLabel={{
                        color: '#344054',
                        fontSize: 10,
                        opacity:0.70,
                        formatter: '{value}'
                      }}
                    min={0}
                    max={100}
                    interval={20}
                    label={{
                        show: false,
                      }}
                    data={MultipleBarChartData} 
                    />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-[24px] 3xl:gap-[1.25vw] mb-10'>
                <div className='rounded-[8px] 3xl:rounded-[0.417vw] bg-white ChartShadow py-[24px] xl:py-[22px] 3xl:py-[1.25vw] px-[16px] xl:px-[14px] 3xl:px-[0.833vw]'>
                    <div className='flex flex-wrap items-center justify-between gap-2'>
                        <div className='text-[#344054] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-medium'>School Type - Classroom Adoption</div>
                        <div className='customDropdown customDropdownSmall'>
                            <Dropdown
                                value={SchoolType}
                                onChange={(e) => setSchoolType(e.target.value)}
                                filter
                                options={SchoolTypeData}
                                optionLabel="name"
                                placeholder="School Type"
                                className="w-full "
                            />
                        </div>
                    </div>
                    <div className='space-y-[24px] xl:space-y-[22px] 3xl:space-y-[1.25vw]'>
                        <div>
                            <div className='text-[#344054] text-[12px] 3xl:text-[0.625vw] mt-[19px] xl:mt-[17px] 3xl:mt-[0.99vw]'>Not Reported (41.18%)</div>
                            <div className='h-[46px] 3xl:h-[2.188vw]'>
                                <HorizontalStackBarChart
                                    legend={{
                                        show: false,
                                        icon: "roundRect",
                                        bottom: "-1",
                                        left: "0%",
                                        itemWidth: 10,
                                        itemHeight: 10
                                    }}
                                    grid={{
                                        top: "0",
                                        right: "1%",
                                        bottom: "0%",
                                        left: "1%",
                                        containLabel: true,
                                    }}
                                    name={['0', '1-2', '3', '>3']}
                                    color={['#FF4537', '#FEC84B', '#03DAC6', '#777DFF']}
                                    data={[[58.82], [5.88], [5.88], [29.41]]}
                                    barWidth={"70%"}
                                    label1={{
                                        show: true,
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
                                    label3={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                    label4={{
                                        show: true,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='text-[#344054] text-[12px] 3xl:text-[0.625vw] mt-[19px] xl:mt-[17px] 3xl:mt-[0.99vw]'>Elementary School (35.29%)</div>
                            <div className='h-[46px] 3xl:h-[2.188vw]'>
                                <HorizontalStackBarChart
                                    legend={{
                                        show: false,
                                        icon: "roundRect",
                                        bottom: "-1",
                                        left: "0%",
                                        itemWidth: 10,
                                        itemHeight: 10
                                    }}
                                    grid={{
                                        top: "0",
                                        right: "1%",
                                        bottom: "0%",
                                        left: "1%",
                                        containLabel: true,
                                    }}
                                    name={['0', '1-2', '3', '>3']}
                                    color={['#FF4537', '#FEC84B', '#03DAC6', '#777DFF']}
                                    data={[[63], [5], [5], [33.43]]}
                                    barWidth={"70%"}
                                    label1={{
                                        show: true,
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
                                    label3={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                    label4={{
                                        show: true,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='text-[#344054] text-[12px] 3xl:text-[0.625vw] mt-[19px] xl:mt-[17px] 3xl:mt-[0.99vw]'>Middle School (38.61%)</div>
                            <div className='h-[46px] 3xl:h-[2.188vw]'>
                                <HorizontalStackBarChart
                                    legend={{
                                        show: false,
                                        icon: "roundRect",
                                        bottom: "-1",
                                        left: "0%",
                                        itemWidth: 10,
                                        itemHeight: 10
                                    }}
                                    grid={{
                                        top: "0",
                                        right: "1%",
                                        bottom: "0%",
                                        left: "1%",
                                        containLabel: true,
                                    }}
                                    name={['0', '1-2', '3', '>3']}
                                    color={['#FF4537', '#FEC84B', '#03DAC6', '#777DFF']}
                                    data={[[63], [5], [5], [33.43]]}
                                    barWidth={"70%"}
                                    label1={{
                                        show: true,
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
                                    label3={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                    label4={{
                                        show: true,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='text-[#344054] text-[12px] 3xl:text-[0.625vw] mt-[19px] xl:mt-[17px] 3xl:mt-[0.99vw]'>High School (38.02%)</div>
                            <div className='h-[46px] 3xl:h-[2.188vw]'>
                                <HorizontalStackBarChart
                                    legend={{
                                        show: false,
                                        icon: "roundRect",
                                        bottom: "-1",
                                        left: "0%",
                                        itemWidth: 10,
                                        itemHeight: 10
                                    }}
                                    grid={{
                                        top: "0",
                                        right: "1%",
                                        bottom: "0%",
                                        left: "1%",
                                        containLabel: true,
                                    }}
                                    name={['0', '1-2', '3', '>3']}
                                    color={['#FF4537', '#FEC84B', '#03DAC6', '#777DFF']}
                                    data={[[63], [5], [5], [33.43]]}
                                    barWidth={"70%"}
                                    label1={{
                                        show: true,
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
                                    label3={{
                                        show: false,
                                        color: "#FFFFFF",
                                        fontWeight: 500,
                                        position: 'insideLeft',
                                        formatter: '{c}%',
                                    }}
                                    label4={{
                                        show: true,
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
                <div className='rounded-[8px] 3xl:rounded-[0.417vw] bg-white ChartShadow py-[24px] xl:py-[22px] 3xl:py-[1.25vw] px-[16px] xl:px-[14px] 3xl:px-[0.833vw]'>
                    <div className='text-[#344054] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-medium'>Top Performing Schools - Classroom Adoption</div>
                    <div className='h-[400px] xl:h-[27.083vw] 2xl:h-[22.396vw] 3xl:h-[17.448vw]'>
                    <Topperformingschools />
                        </div>
                </div>
                <div className='rounded-[8px] 3xl:rounded-[0.417vw] bg-white ChartShadow py-[24px] xl:py-[22px] 3xl:py-[1.25vw] px-[16px] xl:px-[14px] 3xl:px-[0.833vw]'>
                    <div className='text-[#344054] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-medium'>Schools with Less Classroom Adoption</div>
                    <div className='h-[400px] xl:h-[27.083vw] 2xl:h-[22.396vw] 3xl:h-[17.448vw]'>
                    <Lessclassroomadoption />
                        </div>
                </div>
            </div>
            </ScrollPanel>
        </>
    )
}
