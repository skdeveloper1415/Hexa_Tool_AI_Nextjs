import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function Horizontalbarchartone({grid,legend,XsplitLine,XaxisLabel,YaxisLabel,YaxisLine,YaxisTick,dataone,datatwo,nameone,nametwo,bargapone,bargaptwo,barwidthone,barwidthtwo,colorone,colortwo}) {
    const degreechartone = {
        grid:grid,
            legend:legend,
          xAxis: {
            type: 'value',
               splitLine:{
              show:XsplitLine
            },
             axisLabel:{
              show:XaxisLabel
            }
          },
          yAxis: {
            
            type: 'category',
            data: ['Mon'],
            axisLabel:{
              show:YaxisLabel
            },
            axisLine:{
              show:YaxisLine
            },
            axisTick:{
              show:YaxisTick
            },
         
            
          },
          series: [
            {
              name:nameone,
              data: [dataone],
              type: 'bar',
               barGap: bargapone, 
               
              barWidth:barwidthone, // Adjust the width of the bars
              itemStyle: {
                color: colorone ,// Adjust the color of the first bar
                barBorderRadius: [0, 4, 4, 0]
              }
            },
            {
               name:nametwo,
              data: [datatwo],
              type: 'bar',
              
               barGap: bargaptwo, 
              barWidth: barwidthtwo, // Adjust the width of the bars
              itemStyle: {
                color: colortwo, // Adjust the color of the second bar
                barBorderRadius: [0, 4, 4, 0]
              }
            }
          ]
        };
  return (
    
                    <ReactEcharts option={degreechartone} style={{ height: '100%', width: '100%' }} />
          
  )
}
