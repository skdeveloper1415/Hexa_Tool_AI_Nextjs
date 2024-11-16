import React from 'react'
import * as echarts from 'echarts';
import ReactEcharts from "echarts-for-react";
function DemographybyAge() {
 const  option = {
        tooltip: { trigger: "axis" },
        legend: {
          show: true,
          bottom: "bottom",
          left: "left",
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: [4, 4, 0, 0],
          textStyle: {
            color:"#667085",
            fontSize: 12,
          },
          data: [
            { name: 'Current', icon: 'roundRect' },
            { name: '2030 Increase', icon: 'roundRect' },
            { name: '2030 Decrease', icon: 'roundRect', itemStyle: { color: '#9496E3' } },
        ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          top: "3%",
          containLabel: true,
        },
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
              fontSize: 10,
            },
            data: ["Under 18", "13 to 17", "5 to 12", "Under 5 "],
    
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 20,
            interval: 5,
            axisLabel: {
              color:"#6C768B",
              fontSize: 10,
              formatter: "{value} K",
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
          name: 'Current',
          type: 'bar',
            label: {
            show: true,
            position: 'outside',
            color: '#344054',
            fontSize: 12
          },
            // barWidth: 40,
            stack: "Ad",
            itemStyle: {
              color: "#1B55AF",
              borderRadius:[4,4,0,0],
            
            },
          data: [14.8, 3.8, 6, 4.8]
        },
        {
          name: '2030 Increase',
          type: 'bar',
            label: {
            show: true,
            position: 'outside',
            color: '#344054', 
            fontSize: 12
          },
            // barWidth: 40,
            
            itemStyle: {
              color: "#A5BFF1",
              borderRadius:[4,4,0,0]
            },
          data: [16.3, {value: 3.6, itemStyle: {color: "#9496E3"}}, 7.4, 5.5]
        },
           {
          name: '2030 Decrease',
          type: 'line',
        },
        ],
      };
  return (
   <ReactEcharts
        option={option}
        style={{ height: "100%", width: "100%" }}
    />
  )
}

export default DemographybyAge;