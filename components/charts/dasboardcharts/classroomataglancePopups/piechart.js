import React from 'react'
import ReactEcharts from 'echarts-for-react';

export default function PieChart() {
    const option = {
        series: [
            {
              name: "Asset Aging",
              type: "pie",
              radius: ["35%", "90%"],
              avoidLabelOverlap: false,
              center: ["50%", "50%"],
              color: ["#051123", "#0D2A57", "#3166B7", "#5F88C7", "#C9D8F6" ],
              label: {
                show: false,
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
                  value: 120,
                  itemStyle: {
                    borderRadius: [ 0, 0, 4, 4], 
                  },
                 
                },
               { 
                  value: 40, 
                  itemStyle: {
                    borderWidth: '4',
                    borderColor: '#fff'
                
                  },
                },
                { 
                  value: 60, 
                  itemStyle: {
                    borderWidth: '4',
                    borderColor: '#fff'
                
                  },
                },
                { 
                  value: 170, 
                  itemStyle: {
                    borderWidth: '4',
                    borderColor: '#fff'
                
                  },
                },
                { 
                  value: 50, 
                  itemStyle: {
                    borderWidth: '4',
                    borderColor: '#fff'
                
                  },
                },
              ],
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
