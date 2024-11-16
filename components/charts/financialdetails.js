import React from 'react'
import ReactEcharts from "echarts-for-react";


function FinancialDetails() {
 const  option = {
    series: [
      {
        name: "Asset Aging",
        type: "pie",
        radius: ["40%", "100%"],
        avoidLabelOverlap: false,
        center: ["50%", "50%"],
        color: ["#123B7A", "#447CD4"],
        label: {
          show: true,
          position: "inside",
          fontSize: 15,
          fontWeight: 700, 
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 32,
            name: "32%",
            itemStyle: {
              borderRadius: [ 0, 0, 15, 15], 
            },
           
          },
         { 
            value: 68, 
            name: "68%",
            itemStyle: {
              borderWidth: '8',
              borderColor: '#fff'
          
            },
          },
        ],
      },
    ],
  };
  
  return (
   <div className='h-full'>
   <ReactEcharts
        option={option}
        style={{ height: "100%", width: "100%" }}
    />
   </div>
  )
}

export default FinancialDetails;