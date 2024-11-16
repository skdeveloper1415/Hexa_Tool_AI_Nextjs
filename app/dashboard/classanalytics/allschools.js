"use client"
import React, { useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Link from 'next/link';
import Image from 'next/image';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import { useTheme } from 'next-themes';

export default function AllSchools() {
    
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const option = {
        legend: {
            show: false,
            icon: "roundRect",
            bottom: "0%",
            left: "0%",
            itemWidth: 10,
            itemHeight: 10
        },
        grid: {
            top: "0%",
            right: "1%",
            bottom: "0%",
            left: "1%",
            containLabel: true,
        },
        xAxis: {
         
            type: 'value',
            min: 0,
            max: 324,
            axisLine: {
                show: false,
                lineStyle: {
                    color: currentTheme === 'dark' ? '#2A2C32' : "#EAEDF3"
                }
            },
            axisLabel: {
                show: false,
                color: "#00000099",
                fontSize: 8,
                interval: 0
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
            type: 'category',
            interval: 8,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#EAEDF3",
                }
            },
            
            data: ['Login everyday',
            'Once in 3 days',
            'Once in a week login',
            ">1 week to 'No usage'",],
            
            axisLabel: {
                color: "#53565A",
                show: true,
                fontSize:10,
                lineHeight: 16,
                width: 70,
                overflow: "truncate"
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "rgba(219, 212, 212, 1)"
                }
            }
        },
        {
            type: 'category',
            data: ['42','19','21','18'],
            axisLabel: {
              color: "#53565A",
              formatter: '{value} %',
              show: true,
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
            }
        ],
        series: [
            {
                name: 'Clean',
                type: 'bar',
                stack: 'total',
                color: '#FF8C38',
                barWidth: "70%",
                showBackground: true,
                backgroundStyle: {
                color: '#ECECEC',
                borderRadius: [0, 2, 2, 0]
                },
                label: {
                    show: false,
                    color: currentTheme === 'dark' ? '#FFFFFF' : "#FFFFFF",
                    fontWeight:'bold',
                    position: 'insideRight',
                },
                emphasis: {
                    focus: 'series'
                },
                data: [       
                    {
                      value: 42,
                        itemStyle: {
                        color: '#1C22B4'
                        }
                      },
                      {
                      value: 19,
                        itemStyle: {
                        color: '#F2C94C'
                        }
                      },
                      {
                      value: 21,
                        itemStyle: {
                        color: '#01A39D'
                        }
                      },
                      {
                      value: 18,
                        itemStyle: {
                        color: '#777DFF'
                        }
                      },
                  ],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },

        ]
    };
    const teacher1 = {
        legend: {
            show: true,
            icon: "roundRect",
            top: "-1",
            left: "0%",
            itemWidth: 10,
            itemHeight: 10
        },
        grid: {
            top: "35%",
            right: "1%",
            bottom: "0%",
            left: "1%",
            containLabel: true,
        },
        xAxis: {
         
            type: 'value',
            min: 0,
            max: 100,
            axisLine: {
                show: false,
                lineStyle: {
                    color: currentTheme === 'dark' ? '#2A2C32' : "#EAEDF3"
                }
            },
            axisLabel: {
                show: false,
                color: "#00000099",
                fontSize: 8,
                interval: 0
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
            type: 'category',
            interval: 8,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#EAEDF3",
                }
            },
            
            axisLabel: {
                color: "#53565A",
                show: false,
                fontSize:10,
                lineHeight: 16,
                width: 70,
                overflow: "truncate"
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "rgba(219, 212, 212, 1)"
                }
            }
        }
        ],
        series: [
            {
                name: 'Non-graded assignments',
                type: 'bar',
                stack: 'total',
                color: '#777DFF',
                barWidth: "70%",
                showBackground: true,
                backgroundStyle: {
                color: '#777DFF',
                borderRadius: [0, 2, 2, 0]
                },
                label: {
                    show: true,
                    color: currentTheme === 'dark' ? '#FFFFFF' : "#FFFFFF",
                    fontWeight:'bold',
                    position: 'insideLeft',
                    formatter: '{c}%',
                },
                emphasis: {
                    focus: 'series'
                },
                data: [    
                      {
                      value: 63,
                        itemStyle: {
                        color: '#777DFF'
                        }
                      }
                  ],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },

            {
                name: 'Graded Assignments',
                type: 'bar',
                stack: 'total',
                color: '#02BEB2',
                barWidth: "70%",
                showBackground: true,
                backgroundStyle: {
                color: '#02BEB2',
                borderRadius: [0, 2, 2, 0]
                },
                label: {
                    show: true,
                    color: currentTheme === 'dark' ? '#FFFFFF' : "#FFFFFF",
                    fontWeight:'bold',
                    position: 'insideLeft',
                    formatter: '{c}%',
                },
                emphasis: {
                    focus: 'series'
                },
                data: [    
                      {
                      value: 37,
                        itemStyle: {
                        color: '#02BEB2'
                        }
                      }
                  ],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },
        ]
    };
    const teacher2 = {
        legend: {
            show: true,
            icon: "roundRect",
            top: "-1",
            left: "0%",
            itemWidth: 10,
            itemHeight: 10
        },
        grid: {
            top: "35%",
            right: "1%",
            bottom: "0%",
            left: "1%",
            containLabel: true,
        },
        xAxis: {
         
            type: 'value',
            min: 0,
            max: 100,
            axisLine: {
                show: false,
                lineStyle: {
                    color: currentTheme === 'dark' ? '#2A2C32' : "#EAEDF3"
                }
            },
            axisLabel: {
                show: false,
                color: "#00000099",
                fontSize: 8,
                interval: 0
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
            type: 'category',
            interval: 8,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#EAEDF3",
                }
            },
            
            data: [],
            
            axisLabel: {
                color: "#53565A",
                show: false,
                fontSize:10,
                lineHeight: 16,
                width: 70,
                overflow: "truncate"
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "rgba(219, 212, 212, 1)"
                }
            }
        }
        ],
        series: [
            {
                name: 'Personalized Assignments',
                type: 'bar',
                stack: 'total',
                color: '#F2C94C',
                barWidth: "70%",
                showBackground: true,
                backgroundStyle: {
                color: '#ECECEC',
                borderRadius: [0, 2, 2, 0]
                },
                label: {
                    show: true,
                    color: currentTheme === 'dark' ? '#FFFFFF' : "#FFFFFF",
                    fontWeight:'bold',
                    position: 'insideLeft',
                    formatter: '{c}%',
                },
                emphasis: {
                    focus: 'series'
                },
                data: [    
                      {
                      value: 33,
                        itemStyle: {
                        color: '#F2C94C'
                        }
                      },
                  ],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },

        ]
    };
    const participation = {
        legend: {
            show: true,
            icon: "roundRect",
            top: "-1",
            left: "0%",
            itemWidth: 10,
            itemHeight: 10
        },
        grid: {
            top: "35%",
            right: "1%",
            bottom: "0%",
            left: "1%",
            containLabel: true,
        },
        xAxis: {
         
            type: 'value',
            min: 0,
            max: 100,
            axisLine: {
                show: false,
                lineStyle: {
                    color: currentTheme === 'dark' ? '#2A2C32' : "#EAEDF3"
                }
            },
            axisLabel: {
                show: false,
                color: "#00000099",
                fontSize: 8,
                interval: 0
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
            type: 'category',
            interval: 8,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#EAEDF3",
                }
            },
            
            data: [],
            
            axisLabel: {
                color: "#53565A",
                show: false,
                fontSize:10,
                lineHeight: 16,
                width: 70,
                overflow: "truncate"
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "rgba(219, 212, 212, 1)"
                }
            }
        },
        {
            type: 'category',
            data: ['85'],
            axisLabel: {
              color: "#53565A",
              formatter: '{value} %',
              show: true,
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
        }
        ],
        series: [
            {
                name: 'Participation Rate',
                type: 'bar',
                stack: 'total',
                color: '#02BEB2',
                barWidth: "70%",
                showBackground: true,
                backgroundStyle: {
                color: '#ECECEC',
                borderRadius: [0, 2, 2, 0]
                },
                label: {
                    show: false,
                    color: currentTheme === 'dark' ? '#FFFFFF' : "#FFFFFF",
                    fontWeight:'bold',
                    position: 'insideLeft',
                    formatter: '{c}%',
                },
                emphasis: {
                    focus: 'series'
                },
                data: [    
                      {
                      value: 85,
                        itemStyle: {
                        color: '#02BEB2'
                        }
                      },
                  ],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },

        ]
    };
    const absent = {
        legend: {
            show: true,
            icon: "roundRect",
            top: "-1",
            left: "0%",
            itemWidth: 10,
            itemHeight: 10
        },
        grid: {
            top: "35%",
            right: "1%",
            bottom: "0%",
            left: "1%",
            containLabel: true,
        },
        xAxis: {
         
            type: 'value',
            min: 0,
            max: 100,
            axisLine: {
                show: false,
                lineStyle: {
                    color: currentTheme === 'dark' ? '#2A2C32' : "#EAEDF3"
                }
            },
            axisLabel: {
                show: false,
                color: "#00000099",
                fontSize: 8,
                interval: 0
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
            type: 'category',
            interval: 8,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#EAEDF3",
                }
            },
            
            data: [],
            
            axisLabel: {
                color: "#53565A",
                show: false,
                fontSize:10,
                lineHeight: 16,
                width: 70,
                overflow: "truncate"
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "rgba(219, 212, 212, 1)"
                }
            }
        },
        {
            type: 'category',
            data: ['15'],
            axisLabel: {
              color: "#53565A",
              formatter: '{value} %',
              show: true,
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
        }
        ],
        series: [
            {
                name: 'Personalized Assignments',
                type: 'bar',
                stack: 'total',
                color: '#777DFF',
                barWidth: "70%",
                showBackground: true,
                backgroundStyle: {
                color: '#ECECEC',
                borderRadius: [0, 2, 2, 0]
                },
                label: {
                    show: false,
                    color: currentTheme === 'dark' ? '#FFFFFF' : "#FFFFFF",
                    fontWeight:'bold',
                    position: 'insideLeft',
                    formatter: '{c}%',
                },
                emphasis: {
                    focus: 'series'
                },
                data: [    
                      {
                      value: 15,
                        itemStyle: {
                        color: '#777DFF'
                        }
                      },
                  ],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },

        ]
    };
    /***Popular Material Sources*** */
  const material = {
    tooltip: { trigger: "axis" },
    legend: {
      show: true,
      left: 0,
      top: 0,
      data: [
        { name: "Teacher Usage", icon: "rect" },
        { name: "Student adoption", icon: "rect" },
      ],
      itemWidth: 8,
      itemHeight: 8,
      textStyle: {
        fontSize: 12,
        color: "#00000099",
        fontWeight: "400",
      },
    },
    grid: {
      left: "1%",
      right: "1%",
      top: "25%",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        name: "",
        type: "category",
        data: ["Khan Academy", "Youtube", "Google Doc"],
        axisLabel: {
            color: "#00000061",
            show: true,
            fontSize:10,
            lineHeight: 16,
            width: 70,
            overflow: "truncate"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#EAEDF3",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
            show: false
          },
      },

    ],
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: "{value} %",
          color: "#00000061",
            show: true,
            fontSize:10,
            overflow: "truncate"
        },
        axisLine: {
            show: false,
          lineStyle: { 
            color: currentTheme == "dark" ? "#2A2C32" : "#EAEDF3" 
        },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: currentTheme == "dark" ? "#2A2C32" : "#EAEDF3",
          },
        },
      },
    ],
    series: [
      {
        name: "Teacher Usage",
        data: [80, 89, 89],
        type: "bar",
        color: "#777DFF",
        barWidth: '35%',
        barGap: '5%',
        itemStyle: {
          borderRadius: [0, 0, 0, 0],

        },
        label: {
          show: false,
          position: "insideTop",
          color: "rgba(255, 255, 255, 1)",
        },
      },
      {
        name: "Student adoption",
        data: [50, 85, 40],
        type: "bar",
        color: "#02BEB2",
        barWidth: '35%',
        barGap: '5%',
        itemStyle: {
          borderRadius: [0, 0, 0, 0],
        },
        label: {
          show: false,
          position: "insideTop",
          color: "rgba(255, 255, 255, 1)",
        },
      },
    ],
  };
    
    return (
        <div>
            <div className='mb-[24px] xl:mb-[2.08vw]'>
                <h3 className='text-[16px] xl:text-[18px] 3xl:text-[1.04vw] text-[#000000DE] font-medium mb-[12px] xl:mb-[0.625vw]'>Teacher Activity</h3>
                <div className='grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-[10px] xl:gap-[0.833vw]'>
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.938vw] mb-[14px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Google Classroom adoption</div>
                                <div class="text-[#00000099] text-[10px] xl:text-[12px] 3xl:text-[0.625vw] font-light">(% Teachers using Google Classroom)</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">85%</div>
                                <Image src="/images/sort.svg" alt="sort" width="15" height="18" />
                            </div>
                        </div>
                        <div className='xl:h-[8.333vw] h-[160px]'>
                            <ReactEcharts
                                option={option}
                                style={{ height: "100%", width: "100%" }}
                                opts={{ renderer: 'svg' }}
                            />
                        </div>
                    </div> 
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.625vw] mb-[12px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Popular Material Sources</div>
                                <div class="text-[#00000099] text-[10px] xl:text-[12px] 3xl:text-[0.625vw] font-light">(Used by more than 60% of teachers)</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">14</div>
                            </div>
                        </div>
                        <div className='xl:h-[8.333vw] h-[160px]'>
                            <ReactEcharts
                              option={material}
                              style={{ height: "100%", width: "100%" }}
                            />
                        </div>
                    </div> 
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.938vw] mb-[14px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Assignments per Teacher</div>
                                <div class="text-[#00000099] text-[10px] xl:text-[12px] 3xl:text-[0.625vw] font-light">(% Teachers using Google Classroom)</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">
                                    24
                                    <div className='text-[#00000099] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] mt-[-5px]'>Students</div>
                                </div>
                            </div>
                        </div>
                        <div className='xl:h-[3.385vw] h-[65px] mt-[24px] xl:mt-[1.25vw]'>
                            <ReactEcharts
                                option={teacher1}
                                style={{ height: "100%", width: "100%" }}
                                opts={{ renderer: 'svg' }}
                            />
                        </div>
                        <div className='xl:h-[3.385vw] h-[65px] mt-[16px] xl:mt-[0.833vw]'>
                            <ReactEcharts
                                option={teacher2}
                                style={{ height: "100%", width: "100%" }}
                                opts={{ renderer: 'svg' }}
                            />
                        </div>
                    </div> 
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.938vw] mb-[14px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Meetings per week per Classroom</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">
                                    6
                                    <div className='text-[#00000099] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] mt-[-5px]'>Total</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between gap-[10px]'>
                            <div className='border-r border-r-[#0000001F] w-[40%] text-center pr-[15px]'>
                                <Image src="/images/fast-time.svg" className='inline-block' width={'59'} height={'59'} alt="time" />
                                <div className='text-[#00000099] text-[18px] xl:text-[20px] 3xl:text-[1.25vw]'>45</div>
                                <div className='text-[#00000061] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] mt-[-5px] leading-[1.1]'>Instruction minutes per Teacher per Week </div>
                            </div>
                            <div className='w-[60%]'>
                                <div className='xl:h-[3.385vw] h-[65px]'>
                                    <ReactEcharts
                                        option={participation}
                                        style={{ height: "100%", width: "100%" }}
                                        opts={{ renderer: 'svg' }}
                                    />
                                </div>
                                <div className='xl:h-[3.385vw] h-[65px] mt-[10px] xl:mt-[0.525vw]'>
                                    <ReactEcharts
                                        option={absent}
                                        style={{ height: "100%", width: "100%" }}
                                        opts={{ renderer: 'svg' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <div>
                <h3 className='text-[16px] xl:text-[18px] 3xl:text-[1.04vw] text-[#000000DE] font-medium mb-[12px] xl:mb-[0.625vw]'>Student Engagement</h3>
                <div className='grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-[10px] xl:gap-[0.833vw]'>
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.938vw] mb-[14px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Student Login</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">85%</div>
                                <Image src="/images/sort.svg" alt="sort" width="15" height="18" />
                            </div>
                        </div>
                        <div className='xl:h-[8.333vw] h-[160px]'>
                            <ReactEcharts
                                option={option}
                                style={{ height: "100%", width: "100%" }}
                                opts={{ renderer: 'svg' }}
                            />
                        </div>
                    </div> 
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.938vw] mb-[14px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Student Engagement</div>
                                <div class="text-[#00000099] text-[10px] xl:text-[12px] 3xl:text-[0.625vw] font-light">(% of students creating posts or using drive)</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">85%</div>
                                <Image src="/images/sort.svg" alt="sort" width="15" height="18" />
                            </div>
                        </div>
                        <div className='xl:h-[8.333vw] h-[160px]'>
                            <ReactEcharts
                                option={option}
                                style={{ height: "100%", width: "100%" }}
                                opts={{ renderer: 'svg' }}
                            />
                        </div>
                    </div> 
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.938vw] mb-[14px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Assignment Submissions</div>
                                <div class="text-[#00000099] text-[10px] xl:text-[12px] 3xl:text-[0.625vw] font-light">submitted all the assignments in current week</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">85%</div>
                                <Image src="/images/sort.svg" alt="sort" width="15" height="18" />
                            </div>
                        </div>
                        <div className='xl:h-[8.333vw] h-[160px]'>
                            <ReactEcharts
                                option={option}
                                style={{ height: "100%", width: "100%" }}
                                opts={{ renderer: 'svg' }}
                            />
                        </div>
                    </div> 
                    <div className='bg-white px-[16px] xl:px-[1.04vw] py-[16px] xl:py-[1.04vw] border border-[#C8CBD0] rounded-lg'>
                        <div className='flex justify-between gap-[10px] border-b border-b-[#00000014] xl:pb-[0.417vw] pb-[8px] xl:mb-[0.938vw] mb-[14px]'>
                            <div className=' w-[calc(100%-110px)]'>
                                <div class="text-[#000000DE] text-[14px] xl:text-[16px] 3xl:text-[0.938vw]">Overall Grade</div>
                            </div>
                            <div className='flex justify-end w-[110px] gap-[8px] items-center'>
                                <div class="text-[#000000DE] text-[18px] xl:text-[20px] 2xl:text-[26px] 3xl:text-[1.667vw] font-medium ">76%</div>
                                <Image src="/images/sort.svg" alt="sort" width="15" height="18" />
                            </div>
                        </div>
                        <div className='xl:h-[8.333vw] h-[160px]'>
                            <ReactEcharts
                                option={option}
                                style={{ height: "100%", width: "100%" }}
                                opts={{ renderer: 'svg' }}
                            />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}
