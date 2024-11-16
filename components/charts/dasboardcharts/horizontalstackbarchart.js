import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function HorizontalStackBarChart({ legend, grid, name, color, data,barWidth,label1,label2,label3,label4 }) {
    const option = {
        legend: legend,
        grid: grid,
        xAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLine: { show: false, },
            axisLabel: { show: false, },
            axisTick: { show: false },
            splitLine: { show: false }
        },
        yAxis: [
            {
                type: 'category',
                interval: 8,
                show: false,
                axisLine: { show: false },
                axisLabel: { show: false },
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
            {
                name: name[2],
                type: 'bar',
                stack: 'total',
                color: color[2],
                barWidth: barWidth,
                label: label3,
                data: data[2],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },
            {
                name: name[3],
                type: 'bar',
                stack: 'total',
                color: color[3],
                barWidth: barWidth,
                label: label4,
                data: data[3],
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
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
