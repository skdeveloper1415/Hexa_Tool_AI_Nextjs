import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function MultipleHorizontalBarChart({ grid, name1, name2, data, barGap, barWidth1, barWidth2, label, labelleft, itemStyle1,itemStyle2, data1, data2}) {
    const option = {   
        grid: grid,
        xAxis: {
          type: 'value',
          min: 0,
          max: 600,
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis:[ {
          type: 'category',
          data: data,
          axisLabel: {
            show: true,
            inside: true,
            color: "#000",
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
        },
      ],
        series: [
          {
            name: name1,
            type: 'bar',
            barWidth: barWidth1,
            itemStyle:itemStyle1,
            label: labelleft,
            emphasis: { 
              show: false
            },
            data: data1
          },
          {
            name: name2,
            type: 'bar',
            barGap: barGap,
            barWidth: barWidth2,
            label: label,
            itemStyle: itemStyle2,
            emphasis: { 
              show: false
            },
            data: data2
          }
        ]
      };

    return (
        <ReactEcharts
            option={option}
            style={{ height: '100%', width: '100%' }}
        />
    )
}
