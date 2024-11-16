import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function GaugeChart() {
    const option ={
        tooltip: {
            formatter: '{a} <br/>{c} : {c}%'
          },
          series: [
            {
              name: 'Pressure',
              type: 'gauge',
              detail: {
                formatter: '{value} Min',
                fontSize: 12,
                color:'#667085',
                fontWeight:500,
                offsetCenter: ["0", "90%"]
              },
              axisLine: {
                lineStyle: {
                  width: 15,
                  color: [
                    [0.3, '#FF0000'],
                    [0.7, '#F2B20C'],
                    [1, '#59BC49']
                  ]
                }
              },
                pointer: {
                icon: 'image:///images/dashboard/Union.svg',
                length: '100%',
                width: 30,
                offsetCenter: ['-10%', '10%'],
                itemStyle: {
                        color:'#606060',
                    }
                },
              axisTick: {
                distance:0,
                length: 0,
              },
              splitLine: {
                distance: 0,
                length: 0,
                lineStyle: {
                  width: 0
                }
              },
              axisLabel: {
                show:false,
              },
              data: [
                {
                  value: 40,
                }
              ]
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
