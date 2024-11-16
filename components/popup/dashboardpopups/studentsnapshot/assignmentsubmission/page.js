"use client";
import React, { useState } from "react";
import HorizontalStackBarChart from "../../../../charts/dasboardcharts/horizontalstackbarchart";
import MultiplebarWithLineChart from "../../../../charts/dasboardcharts/multiplebarwithlinechart";



export default function Assignmentsubmission() {
  
  const MultipleBarChartData = {
    labels: ['department', 'Bar1', 'Bar2', 'Bar3', 'Bar4','Line'],
    values: [
      { department: '02/01/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:40},
      { department: '09/01/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:60},
      { department: '16/01/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:40},
      { department: '23/01/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:70},
      { department: '30/01/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:70 },
      { department: '06/02/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:70 },
      { department: '13/02/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:70 },
      { department: '20/02/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:70 },
      { department: '27/02/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:70 },
      { department: '06/03/2022', Bar1: 20, Bar2: 10, Bar3: 70, Bar4: 30, Line:70 },
    ]
  }

  return (
    <>
    <div className='grid grid-cols-12'>
    <div className='lg:col-span-6 col-span-12 h-[69px] 3xl:h-[3.594vw]'>
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
                        name={["-4", "3-4","0-2","Submitted All"]}
                        color={['#FF4537', '#FEC84B', '#01A39D', '#777DFF']}
                        data={[[22.48], [7.95], [49.12], [20.43]]}
                        barWidth={"70%"}
                        label1={{
                            show: true,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            position: 'inside',
                            formatter: '{c}%',
                        }}
                        label2={{
                            show: true,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            position: 'inside',
                            formatter: '{c}%',
                        }}
                        label3={{
                            show: true,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            position: 'inside',
                            formatter: '{c}%',
                        }}
                        label4={{
                            show: true,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            position: 'inside',
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
                    color1={"#FF4537"} color2={"#FEC84B"} color3={"#01A39D"} color4={'#777DFF'} color5={'#1570EF'}
                    yAxisLabel={{
                        color: '#344054',
                        fontSize: 10,
                        opacity:0.70,
                        formatter: '{value}%'
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
      
    </>
  );
}
