import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { color } from 'echarts';
export default function Topperformingschools
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
          max:590,
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
                value:600,
                name:'306',
              },
              {
              value:600,
               name:'372'
              },
              {
                value:600,
                name:'579',
                label: { show: true, color: '#FFF' }
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
                value:306,
                name:'Blazier Elementary '
              },
              {
              value:372,
              name:'International High'
              },
              {
                value:579,
                name:'Early Referral Center'
              }
              ],
            type: 'bar',
            color:'#021C7A',
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
