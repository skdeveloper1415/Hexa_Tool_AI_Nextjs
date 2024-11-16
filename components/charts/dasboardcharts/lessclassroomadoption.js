import React from 'react'
import ReactEcharts from 'echarts-for-react';
export default function Lessclassroomadoption
() {
  const  option = {
    grid:{
        top: '8%',
        left: '3%',
        right: '4%',
        bottom: '0%',
        containLabel: true
        },
        xAxis: {
          type: 'value',
          max:940,
          axisLabel:{show:false},
          axisLine:{show:false,},
          splitLine: { show: false },
          axisTick: { show: false },
        },
        yAxis: {
          type: 'category',
          data: ['Blazier Elementary', 'International High', 'Early Referral Center',],
          axisLabel:{show:false},
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine:{show:false,},
        },
        series: [
          
          {
            data: [
              {
                value:940,
                name:'919',
                label: { show: true, color: '#FFF' }
              },
              {
              value:940,
               name:'490'
              },
              {
                value:940,
              name:'295'
              },
              ],
            type: 'bar',
            color:'#BACCE7',
            barWidth:'80%',
            barGap:"-85%",
            itemStyle:{
              borderRadius: [0, 4, 4, 0],
            },
            label:{
              show:true,
              position: "insideRight",
              padding:20,
              fontSize:12,
              fontWeight:'500',
              color:'#101828',
              formatter: '{b}',
          },
          },
          {
            data: [
              {
                value:919,
                name:'Northeast High'
              },
              {
              value:490,
              name:'Akins High'
              },
              {
                value:295,
                name:'Navarro High'
              }
              ],
            type: 'bar',
            color:'#1B55AF',
            barWidth:'60%',
            itemStyle:{
              borderRadius: [0, 4, 4, 0],
            },
            label:{
              show:true,
              position: "insideLeft",
              formatter: '{b}',
              padding:20,
              fontSize:12,
              fontWeight:'500', 
              color:'#fff',
            },
          },
        ]
      };
    return (
    
        <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />

)
}
