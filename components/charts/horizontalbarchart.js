import React from 'react'
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

function HorizontalBarchart() {


    const options = {
        color: ["#BACCE7", "#1B55AF"],


        grid: {
            left: '3%',
            right: '10%',
            bottom: '0%',
            top: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            // boundaryGap: [0, 0.01],
            axisLabel: {
                color: "#101828",
                fontSize: 12,
                formatter: "{value} %",
            },
            axisLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: "#EAEDF3"
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#E4E7EC",
                },
                axisLabel: {
                    color: "#101828",
                    fontSize: 12,
                    formatter: "{value} %",
                },
            },

        },
        yAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    color: "##344054"
                }
            },
            data: ['Other', 'Infant \n overweight', 'Infant \n obesity', 'Adolescents \n overweight', 'Adolescents \n obesity',],


        },
        series: [
            {
                name: '2011',
                type: 'bar',
                data: [7, 11, 10, 10, 25],
                barGap: "7%",
                barCategoryGap: "25%",
                label: {
                    show: true,

                    position: 'outside',
                    color: '#344054',
                    formatter: "{c} %",
                    fontSize: 12,
                },
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            },
            {
                name: '2012',
                type: 'bar',
                data: [8, 13, 12, 12, 39],
                barGap: "7%",
                barCategoryGap: "25%",
                label: {
                    show: true,

                    position: 'outside',
                    color: '#344054',
                    formatter: "{c} %",
                    fontSize: 12,
                },
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
            }
        ]
    };
    return (
        <>
            <ReactEcharts
                echarts={echarts}
                option={options}
                // opts={{ renderer: 'svg' }}
                style={{ width: '100%', height: '100%' }}
            />
        </>
    )
}

export default HorizontalBarchart
