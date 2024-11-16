import React from 'react'
import ReactEcharts from 'echarts-for-react';
import { color } from 'echarts';
export default function Asthmarate() {
  const  option = {
        xAxis: [
          {
              type: "category",
              splitLine: { show: false },
              axisTick: { show: false },
              axisLine: { 
                show: true,
                lineStyle: { color:  "#EAEDF3" },
                },
              axisLabel: {
                color:"#344054",
                fontSize: 12,
                interval: 0
              },
              data: ["Age", "Sex", "Race/Ethnicity"],
      
            },
        ],
        yAxis: [
         {
              type: "value",
              min: 6,
              max: 20,
              interval: 2,
              axisLabel: {
                color:"#6C768B",
                fontSize: 10,
                
              },
              axisLine: {
                show: false,
                lineStyle: { color:  "#EAEDF3" },
                formatter: '{value} %',
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                  color: "#EAEDF3",
                },
              },
            },
        ],
        series: [
          {
            name: "Child",
            type: 'bar',
            barWidth: '30%',
            barGap:0,
            data: [
              { value: 16, name: "Child" },
              { value: 13, name: "Male" },
              { value: 12, name: "White" }
            ],
            itemStyle: {
             color: "#1B55AF",
               
              borderColor: "#BACCE7",
              borderWidth: 5,
              borderRadius: [4, 4, 0, 0]
            },
            label: {
              show: true,
              fontSize:12,
              fontWeight:'300',
              color:'#fff',
              formatter: '{b}',
              rotate: 90
            },
          },
          {
            name: "Adult",
            type: 'bar',
            barWidth: '30%',
            barGap:0,
            data: [
              { value: 10, name: "Adult" },
              { value: 18, name: "Female" },
              { value: 17, name: "Black" }
            ],
            itemStyle: {
              color: "#1B55AF", 
              borderColor: "#BACCE7",
              borderWidth: 5,
              borderRadius: [4, 4, 0, 0]
            },
            label: {
              show: true,
              formatter: '{b}',
              rotate: 90,
              fontSize:12,
              fontWeight:'300',
              color:'#fff',
            },
          },
          {
            name: "Adult",
            type: 'bar',
            barWidth: '30%',
            barGap:0.2,
            data: [
              {},
              {},
              { value: 13, name: "Hispanic",
              itemStyle: {
              borderColor: "#BACCE7",
              borderWidth: 5,
              borderRadius: [4, 4, 0, 0]
              }
                
              }
            ],
            itemStyle: {
              color: "#1B55AF", 
              borderColor: "#BACCE7",
              borderWidth: 5,
              borderRadius: [4, 4, 0, 0]
            },
            label: {
              show: true,
              formatter: '{b}',
              rotate: 90,
              fontSize:12,
              fontWeight:'300',
              color:'#fff',
            },
          },
        ],
      };
    return (
    
        <ReactEcharts option={option} style={{ height: '100%', width: '100%' }} />

)
}
