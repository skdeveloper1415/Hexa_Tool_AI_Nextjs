import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function Mulhorizontalbarchart({legend,tooltip,grid,min,max,interval,XaxisLabel,XsplitLine,XlineStyle,YaxisLabel,YaxisTick,YaxisLine,YlineStyle,dataYaxis,name,label,itemstyle,data,nametextstyle,Yaxisname,Yaxislocation}) {
    const mulbarchart = {
        legend:legend,
         tooltip: tooltip,
         grid: grid,
         xAxis: {
           type: 'value',
               min: min,
               max: max,
               interval: interval,
            axisLabel:XaxisLabel,
                  splitLine: {
                 show: XsplitLine,
                 lineStyle:XlineStyle,
               },

         },
         yAxis: {
           type: 'category',
           axisLabel:YaxisLabel,
           axisTick:{
             show:YaxisTick
           },
           axisLine:{
             show: YaxisLine,
               lineStyle:YlineStyle,
           },
           data: dataYaxis,
           name:Yaxisname,
           nameLocation:Yaxislocation,
           nameTextStyle: nametextstyle
         },
         series: [
           {
             name: name,
             type: 'bar',
                 label:label,
              itemStyle:itemstyle,
             data:data
           }
         ]
       };
  return (
   
        <ReactEcharts option={mulbarchart} style={{ height: '100%', width: '100%' }} />
 
  )
}
