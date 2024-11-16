import React from 'react'
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'

export default function HorizontalBarChartPurpul() {
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
            max: 60,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#EAEDF3"
                }
            },
            axisLabel: {
                show: false,
                color: "#101828",
                fontSize: 12,
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
          
            data: [
                '>90%',
                '75% - 90%',
                '60% - 75%',
                '<60%',],
          
            axisLabel: {
                color: "#53565A",
                show: true,
                fontSize:12,
                fontWeight:400,
                lineHeight: 16,
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
            data: ['10%','24%','45%', '21%'],
            axisLabel: {
                fontSize:12,
                color: "#53565A",
                formatter: '{value}',
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
                name: 'Female',
                type: 'bar',
                stack: 'total',
                color: '#FF8C38',
                barWidth: "70%",
                showBackground: true,
                backgroundStyle: {
                color: '#E8EEF7',
                borderRadius: [4, 4, 4, 4]
                },
                label: {
                    show: false,
                    color: "#FFFFFF",
                    fontWeight:'bold',
                    position: 'insideRight',
                    fontSize:'12px'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [
                        {
                        value: 10,
                        itemStyle: {
                        color: '#7F3F00'
                        }
                        },
                        {
                        value: 24,
                        itemStyle: {
                        color: '#7F3F00'
                        }
                        },
                        {
                        value: 45,
                        itemStyle: {
                        color: '#7F3F00'
                        }
                        },
                        {
                        value: 21,
                        itemStyle: {
                        color: '#7F3F00'
                        }
                        },
                    ],
                itemStyle: {
                    borderRadius: [4, 4, 4, 4],
                },
            },
          
            ],
      };

    return (
        <ReactEcharts
            option={option}
            style={{ height: '100%', width: '100%' }}
        />
    )
}
