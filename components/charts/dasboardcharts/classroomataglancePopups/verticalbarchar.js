import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function VerticalBarChart() {
    const option = {
        tooltip: { trigger: "axis" },
        legend: {
          show: false,
          left: 0,
          top: 0,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 12,
            color: "#00000099",
            fontWeight: "400",
          },
        },
        grid: {
          left: "5%",
          right: "1%",
          top: "10%",
          bottom: "10%",
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
            name: "Count",
            nameLocation: "middle",
            nameGap: 25,
            nameTextStyle: {
            color: "#98A2B3",
            fontSize: 10,
            fontWeight:400,
            },
            type: "value",
            min: 0,
            max: 80,
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
            name: "Teacher Usage",
            data: [70, 65, 40, 57, 60, 45, 57, 60, 60],
            type: "bar",
            color: "#4C80E4",
            barWidth: '60%',
            barGap: '5%',
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
    
            },
            label: {
              show: true,
              fontSize:10,
              position: "insideTop",
              color: "rgba(255, 255, 255, 1)",
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
