import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function DoubleBarChart() {
    const option = {
        tooltip: { trigger: "axis" },
        legend: {
          show: true,
          left: '0%',
          bottom: 0,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 10,
            color: "#00000099",
            fontWeight: "400",
          },
        },
        grid: {
          left: "5%",
          right: "1%",
          top: "10%",
          bottom: "15%",
          containLabel: true,
        },
        xAxis: [
          {
            name: "Grades",
            nameLocation: "middle",
            nameGap: 25,
            nameTextStyle: {
            color: "#98A2B3",
            fontSize: 10,
            fontWeight:400,
            },
            type: "category",
            data: ["PK", "KG", "01" , "02", "03", "04", "05", "06", "07"],
            axisLabel: {
                color: "#667085",
                show: true,
                fontSize:9,
                fontWeight:400,
                lineHeight: 16,
                overflow: "truncate"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EAEDF3",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
                show: false
              },
          },
    
        ],
        yAxis: [
          {
            name: "Submission%",
            nameLocation: "middle",
            nameGap: 25,
            nameTextStyle: {
            color: "#98A2B3",
            fontSize: 10,
            fontWeight:400,
            },
            type: "value",
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: "{value}",
              color: "#667085",
                show: true,
                fontSize:10,
                fontWeight:400,
                overflow: "truncate"
            },
            axisLine: {
                show: false,
              lineStyle: { 
                color: "#EAEDF3" 
            },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#C6CBD2",
                type: "dashed"
              },
            },
          },
        ],
        series: [
          {
            name: "Assignments",
            data: [80, 39, 55, 85, 38, 45, 47, 55, 85],
            type: "bar",
            color: "#1B55AF",
            barWidth: '35%',
            barGap: '5%',
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
    
            },
          },
          {
            name: "Quizzes",
            data: [55, 60, 55, 78, 58, 50, 82, 65, 60],
            type: "bar",
            color: "#8DAAD7",
            barWidth: '35%',
            barGap: '5%',
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
    
            },
          },
        ],
      };

    return (
        <ReactEcharts
            option={option}
            style={{ height: '100%', width: '100%' }}
        />
    )
}
