import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function MultiplebarWithLineChart({ data, xAxisName, yAxisName, legend, grid, color1, color2, color3, color4, color5, lenght,yAxisLabel,min,max,interval,label }) {

  const myarray = [
    {
      type: 'bar',
      label: label,
      color: color1
    },
    {
      type: 'bar',
      label: label,
      color: color2
    },
    {
      type: 'bar',
      label: label,
      color: color3
    },
    {
      type: 'bar',
      label: label,
      color: color4
    },
    {
      type: 'line',
      label: label,
      color: color5,
      symbolSize: 10,
    },
  ]

  if (lenght === 5) {
    myarray.push(
      {
        type: 'bar',
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
        },
        label: {
          show: true,
          position: 'top',
        color: "black"

        },
        color: color4
      },
      {
        type: 'bar',
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
        },
        label: {
          show: true,
          position: 'top',
        color: "black"

        },
        color: color5
      },
    )
  }

  const multiplebarChart = {
    legend: legend,
    grid: grid,
    dataset: {
      dimensions: data.labels,
      source: data.values
    },
    xAxis: {
      name: xAxisName,
      type: 'category',
      axisTick: { show: false },
      labels: {
        // show: true,
        // position: 'outside',
        formatter: '{c}'
      },
      axisTick: { show: false },
      nameTextStyle: {
        color: "#344054"
      },
      axisLabel: {
        interval: 0,
        color: '#344054',
        fontSize: 8,
        fontWeight: 400
      },
      axisLine: {
        lineStyle: {
        color: "#E0E0E0",
        }
      },
      axisLabel: {
        color: '#344054',
        fontSize: 10,
        opacity:0.70,
        align: "center"
      }
    },

    yAxis: {
      name: yAxisName,
      min:min,
      max:max,
      interval:interval,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'line',
          color: "#E0E0E0",
      }
      },
      axisLine :{show: false},
      axisLabel: yAxisLabel,
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: myarray
  };

  return (
    <>
      <ReactEcharts
        option={multiplebarChart}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </>
  );
}