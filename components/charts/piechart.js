import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function Piechart({legend,tooltip,radius,itemstyle,data,}) {
    const piechart = {
        
        tooltip:tooltip,
        legend:legend,
        series: [
          {
            type: 'pie',
            radius: radius,
            data:data,
            emphasis: {
              itemStyle:itemstyle
            }
          }
        ]
      };
      
  return (
    <div className='h-[500px]'>
        <ReactEcharts option={piechart} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}
