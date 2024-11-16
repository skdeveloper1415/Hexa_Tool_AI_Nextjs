"use client"
import React, { useState, useEffect, useRef } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Link from 'next/link';
import Image from 'next/image';
import { GRADE } from '../../../components/helper/enum';
import { Dropdown } from 'primereact/dropdown';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ProgressBar } from 'primereact/progressbar';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Checkbox } from 'primereact/checkbox';
import GeoMap from "../../../components/geoMap";
import { useTheme } from "next-themes";





export default function AutomationDashboard() {

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  /************Geo Map *******************/
  const mapProps = {
    center: [1, 17],
    zoom: 3,
    // currentTheme: currentTheme == 'light' ? 'dark' : 'light',
    currentTheme: currentTheme == "light" ? "light" : "light",
    themeConfig: {
      dark: {
        layerSwitcher: {
          primary: "",
          secondary: "",
          fontColor: "",
        },
        legend: {
          primary: "",
          secondary: "",
          fontColor: "",
        },
        baseMap:
          "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
      },
      light: {
        layerSwitcher: {
          primary: "red",
          secondary: "blue",
          fontColor: "purple",
        },
        legend: {
          primary: "green",
          secondary: "pink",
          fontColor: "purple",
        },
        mapControls: {
          primary: "green",
          secondary: "pink",
        },
        baseMap:
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      },
    },
    baseMapConfig: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    },
    layers: [
      {
        name: "layer1",
        title: "Core Countries",
        type: "geojson",
        show: false,
        opacity: 100,
        enabled: true,
        featureLabelField: "ADMIN",
        renderer: {
          type: "custom",
          config: {
            color: {
              field: "metric",
              breaks: [
                {
                  start: 0,
                  end: 9,
                  color: "",
                },
                {
                  start: 10,
                  end: 19,
                  color: "",
                },
                {
                  start: 20,
                  end: 29,
                  color: "",
                },
              ],
            },
          },
        },
      },
      {
        name: "layer2",
        title: "Core Countries",
        type: "geojson",
        opacity: 100,
        enabled: true,
        selectable: false,
      },
    ],
    geoSources: {
      layer1: {
        url: "https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson",
      },
      layer2: {
        url: "https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson",
      },
      layer3: {
        url: "https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson",
      },
    },
    dataSources: {
      layer1: {
        geoKeys: ["ISO_A3"],
        dataKeys: ["ISO_A3"],
        data: [
          {
            ISO_A3: "DZA",
            metric: 15,
            metric2: 10,
            metric3: 10,
          },
          {
            ISO_A3: "LBY",
            metric: 25,
            metric2: 20,
            metric3: 10,
          },
          {
            ISO_A3: "EGY",
            metric: 15,
            metric2: 30,
            metric3: 20,
          },
          {
            ISO_A3: "TUR",
            metric: 5,
            metric2: 40,
            metric3: 30,
          },
          {
            ISO_A3: "IRQ",
            metric: 5,
            metric2: 30,
            metric3: 40,
          },
          {
            ISO_A3: "SAU",
            metric: 25,
            metric2: 20,
            metric3: 30,
          },
          {
            ISO_A3: "ZAF",
            metric: 25,
            metric2: 10,
            metric3: 20,
          },
        ],
      },
      layer2: {
        geoKeys: ["ISO_A3"],
        dataKeys: ["ISO_A3"],
        data: [
          {
            ISO_A3: "DZA",
            metric: 15,
            metric2: 10,
            metric3: 10,
          },
          {
            ISO_A3: "LBY",
            metric: 25,
            metric2: 20,
            metric3: 10,
          },
          {
            ISO_A3: "EGY",
            metric: 15,
            metric2: 30,
            metric3: 20,
          },
          {
            ISO_A3: "TUR",
            metric: 5,
            metric2: 40,
            metric3: 30,
          },
          {
            ISO_A3: "IRQ",
            metric: 5,
            metric2: 30,
            metric3: 40,
          },
          {
            ISO_A3: "SAU",
            metric: 25,
            metric2: 20,
            metric3: 30,
          },
          {
            ISO_A3: "ZAF",
            metric: 25,
            metric2: 10,
            metric3: 20,
          },
        ],
      },
      layer3: {
        geoKeys: ["ISO_A3"],
        dataKeys: ["ISO_A3"],
        data: [
          {
            ISO_A3: "NGA",
            metric: 15,
          },
          {
            ISO_A3: "CMR",
            metric: 25,
          },
          {
            ISO_A3: "KEN",
            metric: 15,
          },
        ],
      },
    },
  };
  /************Geo Map *******************/

    const [grade, setGrade] = useState();
    const [checked, setChecked] = useState(false);

    const leftTitleRef = useRef(null);
    const pictorialBar1 = {
      grid: {
        containLabel: true,
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
      },
      yAxis: [
        {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      },
      {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      }
    ],
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: '2015',
          id: 'bar1',
          type: 'pictorialBar',
          label: {
            show: false,
            position: 'right',
            offset: [10, 0],
            fontSize: 16
          },
          symbolRepeat: true,
          symbolSize: ['80%', '60%'],
          barCategoryGap: '40%',

          data: [
            {
              value: 37,
              symbol: 'roundRect',
              symbolSize: 10,
            },
          ],
          itemStyle: {
            color: '#039855'
          },
        },
      ]
    };
    const pictorialBar2 = {
      grid: {
        containLabel: true,
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
      },
      yAxis: [
        {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      },
      {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      }
    ],
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: '2015',
          id: 'bar1',
          type: 'pictorialBar',
          label: {
            show: false,
            position: 'right',
            offset: [10, 0],
            fontSize: 16
          },
          symbolRepeat: true,
          symbolSize: ['80%', '60%'],
          barCategoryGap: '40%',

          data: [
            {
              value: 55,
              symbol: 'roundRect',
              symbolSize: 10,
            },
          ],
          itemStyle: {
            color: '#e57200'
          },
        },
      ]
    };
    const pictorialBar3 = {
      grid: {
        containLabel: true,
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
      },
      yAxis: [
        {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      },
      {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      }
    ],
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: '2015',
          id: 'bar1',
          type: 'pictorialBar',
          label: {
            show: false,
            position: 'right',
            offset: [10, 0],
            fontSize: 16
          },
          symbolRepeat: true,
          symbolSize: ['80%', '60%'],
          barCategoryGap: '40%',

          data: [
            {
              value: 8,
              symbol: 'roundRect',
              symbolSize: 10,
            },
          ],
          itemStyle: {
            color: '#d92d20'
          },
        },
      ]
    };
    const pictorialBar4 = {
      grid: {
        containLabel: true,
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
      },
      yAxis: [
        {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      },
      {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      }
    ],
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: '2015',
          id: 'bar1',
          type: 'pictorialBar',
          label: {
            show: false,
            position: 'right',
            offset: [10, 0],
            fontSize: 16
          },
          symbolRepeat: true,
          symbolSize: ['80%', '60%'],
          barCategoryGap: '40%',

          data: [
            {
              value: 37,
              symbol: 'roundRect',
              symbolSize: 10,
            },
          ],
          itemStyle: {
            color: '#1b55af'
          },
        },
      ]
    };
    const pictorialBar5 = {
      grid: {
        containLabel: true,
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
      },
      yAxis: [
        {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      },
      {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      }
    ],
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: '2015',
          id: 'bar1',
          type: 'pictorialBar',
          label: {
            show: false,
            position: 'right',
            offset: [10, 0],
            fontSize: 16
          },
          symbolRepeat: true,
          symbolSize: ['80%', '60%'],
          barCategoryGap: '40%',

          data: [
            {
              value: 55,
              symbol: 'roundRect',
              symbolSize: 10,
            },
          ],
          itemStyle: {
            color: '#1b55af'
          },
        },
      ]
    };
    const pictorialBar6 = {
      grid: {
        containLabel: true,
        left: 0,
        bottom: 0,
        top: 0,
        right: 0,
      },
      yAxis: [
        {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      },
      {
        data: ['reindeer'],
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          margin: 30,
          fontSize: 14,
          show: false
        },
        axisPointer: {
          label: {
            show: true,
            margin: 30
          }
        }
      }
    ],
      xAxis: {
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
      series: [
        {
          name: '2015',
          id: 'bar1',
          type: 'pictorialBar',
          label: {
            show: false,
            position: 'right',
            offset: [10, 0],
            fontSize: 16
          },
          symbolRepeat: true,
          symbolSize: ['80%', '60%'],
          barCategoryGap: '40%',

          data: [
            {
              value: 8,
              symbol: 'roundRect',
              symbolSize: 10,
            },
          ],
          itemStyle: {
            color: '#1b55af'
          },
        },
      ]
    };

    const valueTemplate = () =>{
      return ''
    }
    const accordionHeaderTemplate = () =>{
      return <>
        <Checkbox onChange={e => setChecked(e.checked)} checked={checked} className='xl:mr-[0.417vw] mr-[8px]'></Checkbox>
        <span className='p-accordion-header-text'>Show CESA</span>
      </>
    }

    const [activeTab, setActiveTab] = useState(1);

    return (
        <div>
            <div className='mb-[18px] xl:mb-[1.25vw] flex flex-wrap justify-between gap-[10px] items-start'>
                <div>
                    <div class="text-[#101828] text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold">Automation Dashboard</div>
                    <div class="text-[#667085] text-[16px] xl:text-[14px] 3xl:text-[0.729vw] font-normal mt-[8px] xl:mt-[0.417vw]">AI Classroom that enhances Google Classroom by providing AI powered classroom</div>
                </div>
                <div className='flex justify-end gap-[1.04vw] gap-[12px] xl:pt-[0.26vw] pt-[5px] items-center'>
                    <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#E57200] font-medium justify-center items-center gap-[8px] xl:gap-[0.417vw] self-end'>
                        <i className='hexatoolrefresh'></i>
                        Reset Filter
                    </button>
                    <Dropdown
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        filter
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Session"
                        className="w-full md:w-[231px] xl:w-[220px] 3xl:w-[12.031vw]"
                    />
                    <Dropdown
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        filter
                        options={GRADE}
                        optionLabel="name"
                        placeholder="School Year"
                        className="w-full md:w-[231px] xl:w-[220px] 3xl:w-[12.031vw]"
                    />
                    <Dropdown
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        filter
                        options={GRADE}
                        optionLabel="name"
                        placeholder="Term"
                        className="w-full md:w-[231px] xl:w-[220px] 3xl:w-[12.031vw]"
                    />
                    <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#E57200] font-medium border border-[#E57200] bg-[#fff] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center gap-[8px] xl:gap-[0.417vw]'>
                        <i className='hexatoolfilter'></i>
                        More Filter
                    </button>
                </div>
            </div>

            <div className='flex flex-wrap xl:flex-nowrap border border-b border-[#E4E7EC] rounded-lg'>
                <div className='3xl:w-[40%] xl:w-[656px] w-[100%] bg-[#fff] rounded-bl-lg'>
                    <h4 ref={leftTitleRef}  className='bg-[#1570EF] text-[#fff] text-[16px] xl:text-[16px] 3xl:text-[0.938vw] font-medium flex justify-between items-center px-[12px] xl:px-[0.833vw] py-[6px] xl:py-[0.313vw] rounded-tl-lg'>
                        <span>District/ School Lookup</span>
                        <i className='hexatoolcompass'></i>
                    </h4>
                    <ScrollPanel style={{ width: '100%', height: '718px' }}>
                      <div className='px-[12px] xl:px-[0.833vw] py-[16px] xl:py-[1.563vw]'>
                          <div className='flex xl:px-[0.417vw] xl:gap-[0.729vw] gap-[14px] xl:mb-[1.25vw] mb-[16px]'>
                              <div>
                                  <i className='hexatoolinfo-circule-2 3xl:text-[2.08vw] text-[40px] text-[#E57200]'></i>
                              </div>
                              <div className='text-[#344054] xl:text-[0.729vw] text-[14px]'>You are looking to the state view. All the information is aggregated for the whole state. You can drill down to see more details for any school district</div>
                          </div>
                          <h5 className='text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium xl:mb-[0.417vw] mb-[8px]'>Classroom Automation Overview</h5>
                          <div className='grid sm:grid-cols-3 grid-cols-2 xl:gap-[0.417vw] gap-[8px] xl:mb-[1.25vw] mb-[16px]'>
                            <div className='grid xl:gap-[0.417vw] gap-[8px] text-center'>
                              <div className='grid xl:gap-[0.104vw] gap-[2px]'>
                                <div>
                                  <Image src="/images/chalkboard.png" alt="Total Classrooms" className='inline' width={50} height={50} />
                                </div>
                                <div className='text-[#344054] xl:text-[0.729vw] text-[14px]'>Total Classrooms</div>
                              </div>
                              <div className='bg-[#F2F4F7] xl:py-[0.208vw] py-[4px] xl:px-[0.417vw] px-[8px] rounded-lg'>
                                <div className='text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-bold'>24,250</div>
                                <div className='text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]'>Elementary</div>
                              </div>
                              <div className='bg-[#F2F4F7] xl:py-[0.208vw] py-[4px] xl:px-[0.417vw] px-[8px] rounded-lg'>
                                <div className='text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-bold'>86,400</div>
                                <div className='text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]'>Secondary</div>
                              </div>
                            </div>
                            <div className='grid xl:gap-[0.417vw] gap-[8px] text-center'>
                              <div className='grid xl:gap-[0.104vw] gap-[2px]'>
                                <div>
                                  <Image src="/images/automation.png" alt="Out of Automation" className='inline' width={50} height={50} />
                                </div>
                                <div className='text-[#344054] xl:text-[0.729vw] text-[14px]'>Out of Automation</div>
                              </div>
                              <div className='bg-[#F2F4F7] xl:py-[0.208vw] py-[4px] xl:px-[0.417vw] px-[8px] rounded-lg'>
                                <div className='text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-bold'>8,425</div>
                                <div className='text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]'>Elementary</div>
                              </div>
                              <div className='bg-[#F2F4F7] xl:py-[0.208vw] py-[4px] xl:px-[0.417vw] px-[8px] rounded-lg'>
                                <div className='text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-bold'>12,415</div>
                                <div className='text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]'>Secondary</div>
                              </div>
                            </div>
                            <div className='grid xl:gap-[0.417vw] gap-[8px] text-center'>
                              <div className='grid xl:gap-[0.104vw] gap-[2px]'>
                                <div>
                                  <Image src="/images/goal.png" alt="Target Conversion" className='inline' width={50} height={50} />
                                </div>
                                <div className='text-[#344054] xl:text-[0.729vw] text-[14px]'>Target Conversion</div>
                              </div>
                              <div className='bg-[#F2F4F7] xl:py-[0.208vw] py-[4px] xl:px-[0.417vw] px-[8px] rounded-lg'>
                                <div className='text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-bold'>15,825</div>
                                <div className='text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]'>Elementary</div>
                              </div>
                              <div className='bg-[#F2F4F7] xl:py-[0.208vw] py-[4px] xl:px-[0.417vw] px-[8px] rounded-lg'>
                                <div className='text-[#344054] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-bold'>73,985</div>
                                <div className='text-[#667085] text-[12px] xl:text-[12px] 3xl:text-[0.625vw]'>Secondary</div>
                              </div>
                            </div>
                          </div>
                          <h5 className='text-[#667085] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium xl:mb-[0.417vw] mb-[8px]'>Other Metrics</h5>
                          <table className='w-full'>

                            <tbody>
                              <tr>
                                <th className='w-[40%]'></th>
                                <th className='w-[30%] text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal xl:pr-[0.417vw] pr-[8px] text-left'>Elementary</th>
                                <th className='w-[30%] text-[#98A2B3] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] font-normal text-left'>Secondary</th>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>Automated Conversion</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>15,100</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] border-[E4E7EC] border-b'>68,452</td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>Conversion%</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>
                                  <div className='flex w-full items-center'>
                                    <div className='w-[40%] pr-[4px]'>95% </div>
                                    <div className='w-[60%]'>
                                      <ProgressBar color={'#1B55AF'} value={85} displayValueTemplate={valueTemplate} className='xl:h-[0.521vw] h-[10px] rounded-lg bg-[#BACCE7] w-[60px]' ></ProgressBar>
                                    </div>
                                  </div>
                                </td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] border-[E4E7EC] border-b'>
                                  <div className='flex w-full items-center'>
                                    <div className='pr-[8px]'>93% </div>
                                    <div className=''>
                                      <ProgressBar color={'#1570EF'} value={83} displayValueTemplate={valueTemplate} className='xl:h-[0.521vw] h-[10px] rounded-lg bg-[#FFD8B2] w-[60px]' ></ProgressBar>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>SIS Classes created Manually</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>285</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] border-[E4E7EC] border-b'>4,412</td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>In Google Classroom</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>440</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] border-[E4E7EC] border-b'>1,121</td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>Classes in google Classroom</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>425</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] border-[E4E7EC] border-b'>5,544</td>
                              </tr>
                              <tr>
                                <td colSpan={3} className='text-[#101828] text-[16px] xl:text-[16px] 3xl:text-[0.833vw] font-medium xl:pt-[1.25vw] pt-[16px] xl:pb-[0.208vw] pb-[4px] xl:pr-[0.417vw] pr-[8px]'>District Level Overview</td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>Districts Automating Classroom</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[E4E7EC] border-b'>382</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.469vw] py-[9px] border-[E4E7EC] border-b'>
                                  <div className='flex w-full items-center'>
                                    <div className='pr-[8px]'>91% </div>
                                    <div className=''>
                                      <ProgressBar color={'#1B55AF'} value={81} displayValueTemplate={valueTemplate} className='xl:h-[0.521vw] h-[10px] rounded-lg bg-[#BACCE7] w-[60px]' ></ProgressBar>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:pt-[0.417vw] pt-[8px] xl:pb-[0.104vw] pb-[2px] xl:pr-[0.417vw] pr-[8px]'>Automation Completion</td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px]'>{'>95%'}</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px] '>425</td>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px]'>
                                  <div className='xl:h-[0.521vw] h-[10px]'>
                                      <ReactEcharts
                                          option={pictorialBar1}
                                          style={{ height: "100%", width: "100%" }}
                                      />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px]'>{'85-95%'}</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px] '>206</td>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px]'>
                                  <div className='xl:h-[0.521vw] h-[10px]'>
                                      <ReactEcharts
                                          option={pictorialBar2}
                                          style={{ height: "100%", width: "100%" }}
                                      />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px]'>{'<85%'}</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px] '>31</td>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px]'>
                                  <div className='xl:h-[0.521vw] h-[10px]'>
                                      <ReactEcharts
                                          option={pictorialBar3}
                                          style={{ height: "100%", width: "100%" }}
                                      />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className='border-[E4E7EC] border-b'></td>
                              </tr>
                              <tr>
                                <td colSpan={3} className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:pt-[0.417vw] pt-[8px] xl:pb-[0.104vw] pb-[2px] xl:pr-[0.417vw] pr-[8px]'>School Automating Classroom</td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px]'>Elementary School</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px] '>1433</td>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px]'>
                                  <div className='xl:h-[0.521vw] h-[10px]'>
                                      <ReactEcharts
                                          option={pictorialBar4}
                                          style={{ height: "100%", width: "100%" }}
                                      />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px]'>Elementary/ Secondary ...</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px] '>145</td>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px]'>
                                  <div className='xl:h-[0.521vw] h-[10px]'>
                                      <ReactEcharts
                                          option={pictorialBar5}
                                          style={{ height: "100%", width: "100%" }}
                                      />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px]'>Middle School</td>
                                <td className='text-[#101828] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] font-semibold xl:py-[0.104vw] py-[2px] xl:pr-[0.417vw] pr-[8px] '>358</td>
                                <td className='text-[#344054] text-[12px] xl:text-[12px] 3xl:text-[0.625vw] xl:py-[0.104vw] py-[2px]'>
                                  <div className='xl:h-[0.521vw] h-[10px]'>
                                      <ReactEcharts
                                          option={pictorialBar6}
                                          style={{ height: "100%", width: "100%" }}
                                      />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className='border-[E4E7EC] border-b'></td>
                              </tr>
                            </tbody>
                          </table>
                      </div>
                    </ScrollPanel>
                </div>
                <div className='3xl:w-[60%] xl:w-[calc(100%-656px)] w-[100%] rounded-tr-lg rounded-br-lg overflow-hidden relative'>
                    {/* <Image src="/images/automationdashboard-map.png" alt="Automation dashboard" width={1200} height={758} /> */}
                    <div className="h-[758px] target-element z-[1]" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }}>
                      <GeoMap mapProps={mapProps} onClick={() => {}} />
                    </div>
                    <div className='absolute z-[999] xl:right-[1.25vw] right-[16px] xl:top-[1.25vw] top-[16px] flex justify-end xl:gap-[0.833vw] gap-[14px]'>
                      <button className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#E57200] font-medium border border-[#E57200] bg-[#fff] rounded-lg xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] justify-center items-center gap-[8px] xl:gap-[0.417vw]'>
                          <i className='hexatoolrefresh'></i>
                          Compare
                      </button>
                      <div className='border border-[#E4E7EC] rounded-lg inline-flex overflow-hidden'>
                        <button className={`${activeTab === 1 ? 'bg-[#E57200]' : 'bg-white'} w-[2.708vw] w-[52px] xl:h-[2.083vw] h-[40px] flex items-center justify-center rounded-l-lg`}
                          onClick={() => setActiveTab(1)}
                        >
                          <i className={`${activeTab == 1 ? "text-[#fff]" : "text-[#E57200]"} hexatoolglobe 3xl:text-[1.04vw] text-[20px] `}></i>
                        </button>
                        <button className={`${activeTab === 2 ? 'bg-[#E57200]' : 'bg-white'} w-[2.708vw] w-[52px] xl:h-[2.083vw] h-[40px] flex items-center justify-center rounded-r-lg`}
                          onClick={() => setActiveTab(2)}
                        >
                          <i className={`${activeTab == 2 ? "text-[#fff]" : "text-[#E57200]"} hexatoolhamburg 3xl:text-[0.729vw] text-[14px]`}></i>
                        </button>
                      </div>
                    </div>
                    <div className='absolute z-[999] xl:left-[1.25vw] left-[16px] 3xl:bottom-[1.25vw] xl:bottom-[70px] bottom-[60px] w-[266px]'>
                      <div className='bg-[#E4E7EC] flex justify-between items-center xl:px-[0.833vw] px-[12px] xl:py-[0.313vw] py-[6px] rounded-t-lg'>
                        <span className='text-[#101828] 3xl:text-[0.938vw] 2xl:text-[16px] text-[16px]'>Layers</span>
                        <i className='hexatoolclose text-[#101828] cursor-pointer'></i>
                      </div>
                      <div className='bg-[white] xl:p-[0.833vw] p-[12px] border border-[#E4E7EC] rounded-b-lg'>
                        <div className='border border-[#E4E7EC] rounded-lg inline-flex overflow-hidden xl:mb-[0.833vw] mb-[12px]'>
                          <button className={`${activeTab === 1 ? 'bg-[#1B55AF]' : ''} w-[2.5vw] w-[48px] xl:h-[1.875vw] h-[36px] flex items-center justify-center rounded-l-lg`}
                            onClick={() => setActiveTab(1)}
                          >
                            <Image src={activeTab == 1 ? "/images/map-white.svg" : "/images/map-blue.svg"} alt="Map" width={20} height={20} />
                          </button>
                          <button className={`${activeTab === 2 ? 'bg-[#1B55AF]' : ''} w-[2.5vw] w-[48px] xl:h-[1.875vw] h-[36px] flex items-center justify-center rounded-r-lg`}
                            onClick={() => setActiveTab(2)}
                          >
                            <Image src={activeTab == 2 ? "/images/circle-layer-white.svg" : "/images/circle-layer-blue.svg"} alt="Map" width={20} height={20} />
                          </button>
                        </div>
                        {activeTab === 1 &&
                          <div className='custom-accordion'>
                            <Accordion activeIndex={0}>
                              <AccordionTab header="Automation Completion">
                                  <table className='w-full'>
                                    <tbody>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#039855] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'> 95%'}</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#DC6803] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>85%-95%</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#D92D20] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'<85%'}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                              </AccordionTab>
                              <AccordionTab header="Show CESA" headerTemplate={accordionHeaderTemplate}>
                                  <table className='w-full'>
                                    <tbody>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#039855] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'> 95%'}</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#DC6803] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>85%-95%</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#D92D20] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'<85%'}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                              </AccordionTab>
                            </Accordion>
                          </div>
                        }
                        {activeTab === 2 &&
                          <div className='custom-accordion'>
                            <Accordion activeIndex={0}>
                              <AccordionTab header="Automation Completion">
                                  <table className='w-full'>
                                    <tbody>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#039855] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'> 95%'}</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#DC6803] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>85%-95%</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#D92D20] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'<85%'}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                              </AccordionTab>
                              <AccordionTab header="Show CESA" headerTemplate={accordionHeaderTemplate}>
                                  <table className='w-full'>
                                    <tbody>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#039855] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'> 95%'}</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#DC6803] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>85%-95%</td>
                                      </tr>
                                      <tr>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[10%]'>
                                          <i className='bg-[#D92D20] xl:w-[0.833vw] w-[16px] xl:h-[0.833vw] h-[16px] rounded-[3px] block'></i>
                                        </td>
                                        <td className='text-[#344054] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] xl:py-[0.469vw] py-[9px] xl:pr-[0.417vw] pr-[8px] border-[#E4E7EC] border-b w-[75%]'>{'<85%'}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                              </AccordionTab>
                            </Accordion>
                          </div>
                        }
                      </div>
                    </div>
                    <div className='absolute z-[999] xl:right-[3.646vw] right-[70px] xl:bottom-[1.25vw] bottom-[16px] flex justify-end xl:gap-[0.833vw] gap-[14px]'>
                      <div className='rounded-lg inline-flex overflow-hidden bg-[#35599F]'>
                        <button className=" 3xl:text-[0.521vw] text-[10px] text-[#fff] font-medium xl:px-[0.729vw] px-[14px] xl:py-[0.417vw] py-[8px]">
                          <i className='hexatoolup-arrow'></i>
                        </button>
                        <button className=" 3xl:text-[0.729vw] text-[14px] text-[#fff] font-medium bg-[#4C80E4] xl:px-[0.729vw] px-[14px] xl:py-[0.417vw] py-[8px]">
                          Automation Completion
                        </button>
                        <button className=" 3xl:text-[0.729vw] text-[14px] text-[#fff] font-medium xl:px-[0.729vw] px-[14px] xl:py-[0.417vw] py-[8px]">
                          Other Metric 1
                        </button>
                        <button className=" 3xl:text-[0.729vw] text-[14px] text-[#fff] font-medium xl:px-[0.729vw] px-[14px] xl:py-[0.417vw] py-[8px]">
                          Other Metric 2
                        </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
