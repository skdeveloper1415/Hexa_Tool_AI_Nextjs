import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function HorizontalBarChart() {
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
        max: 100,
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
            'Male',
            'Female',],
    
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
        data: ['40','75'],
        axisLabel: {
            fontSize:12,
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
            name: 'Female',
            type: 'bar',
            stack: 'total',
            color: '#FF8C38',
            barWidth: "40%",
            showBackground: true,
            backgroundStyle: {
            color: '#ECECEC',
            borderRadius: [2, 2, 2, 2]
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
                    value: 40,
                    itemStyle: {
                    color: '#1B55AF'
                    }
                    },
                    {
                    value: 75,
                    itemStyle: {
                    color: '#1B55AF'
                    }
                    },
                ],
            itemStyle: {
                borderRadius: [2, 2, 2, 2],
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
