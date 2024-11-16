import React from 'react'
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'

export default function LineWithSymbolChart() {
    const option ={
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
          xAxis: {
            name: "Month",
            nameLocation: "middle",
            nameGap: 30,
            nameTextStyle: {
            color: "#98A2B3",
            fontSize: 10,
            fontWeight:400,
            },
            type: 'category',
            data: ['January', 'February', 'March'],
            axisLabel: {
            color: "#667085",
            show: true,
            fontSize:10,
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
          yAxis: {
            name: "Comments Count",
            nameLocation: "middle",
            nameGap: 30,
            nameTextStyle: {
            color: "#98A2B3",
            fontSize: 10,
            fontWeight:400,
            },
            type: 'value',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
            color: "#667085",
            show: true,
            fontSize:10,
            fontWeight:400,
            lineHeight: 16,
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
          series: [
            {
              data: [90, 70, 80],
              type: 'line',
              symbolSize: 10,
              itemStyle: {
              color: "#1570EF",
              borderColor: "rgba(144, 31, 31, 1)"
              },
              lineStyle: {
              color: "#1570EF"
              },
              label: {
              show: true,
              position: [10, 30],
              color: "rgba(255, 255, 255, 1)",
              backgroundColor: "rgba(127, 63, 0, 1)",
              padding: [4, 6, 4, 6],
              borderRadius: [4, 4, 4, 4],
              align: "center",
              verticalAlign: "middle"
              },
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(255, 127, 1, 0.30)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 0.00)'
                  }
                ])
              },
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
