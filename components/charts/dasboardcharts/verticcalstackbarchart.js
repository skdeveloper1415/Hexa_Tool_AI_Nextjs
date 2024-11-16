import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function VerticalStackBarChart({ legend, grid, name, color, data,barWidth,label1,label2,xAxisLabel }) {
    const option = {
        legend: legend,
        grid: grid,
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLine: { show: false, },
            axisLabel: { show: false, },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        xAxis: [
            {
                type: 'category',
                interval: 8,
                data: xAxisLabel,
                show: true,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { 
                    show: true,
                    color: "#667085",
                    interval:0,
                    fontSize:12
                },
                splitLine: { show: false }
            }
        ],
        series: [
            {
                name: name[0],
                type: 'bar',
                stack: 'total',
                color: color[0],
                barWidth: barWidth,
                label: label1,
                data: data[0],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },
            {
                name: name[1],
                type: 'bar',
                stack: 'total',
                color: color[1],
                barWidth: barWidth,
                label: label2,
                data: data[1],
                itemStyle: {
                    borderRadius: [0, 0, 0, 0],
                },
            },
           
        ]
    };

    return (
        <ReactEcharts
            option={option}
            style={{ height: '100%', width: '100%' }}
        />
    )
}
