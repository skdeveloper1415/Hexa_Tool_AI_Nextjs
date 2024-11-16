"use client"
import React, { useEffect, useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ChartWrapper from '../../../components/chartwrapper/page';
import ReactEcharts from 'echarts-for-react';
import Horizontalbarchartone from '../../../components/charts/horizontalbarchartone';
import Mulhorizontalbarchart from '../../../components/charts/mulhorizontalbarchart';
import Piechart from '../../../components/charts/piechart';

export default function Demographics() {



  return (
    <>
      <div className='grid grid-cols-4 lg:grid-cols-8 2xl:grid-cols-12 gap-5 xl:gap-[1.042vw]'>
        <div className='col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
          <div className="">
            <ChartWrapper
              title={"Language spoken - Top 5"}
              ExportIcon={false}
              bulbIcon={false}
              infoIcon={false}
              tabSection={false}
              downloadIcon={false}
              graphIcon={false}
              className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
            />
          </div>
          <div className='h-[436] xl:h-[22.708vw]'>
            <Mulhorizontalbarchart
              legend={{
                data: ['language'],// Define legends for the series
                bottom: -5,
                left: 20
              }}
              tooltip={{
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              }}
              grid={{
                top: '0%',
                left: '10%',
                right: '10%',
                bottom: '10%',
                containLabel: true
              }}
              min={0}
              max={100}
              interval={20}

              XaxisLabel={{
                color: "#101828",
                fontSize: 11,
                formatter: "{value} %",
              }}
              XsplitLine={true}
              XlineStyle={{
                type: "dashed",
                color: "#C8CBD0",
              }}
              YaxisLabel={{
                color: "#24262D",
                fontSize: 10,

              }}
              YaxisTick={false}
              YaxisLine={false}
              YlineStyle={{
                color: "#E4E7EC"
              }}
              dataYaxis={['Arabic',  'African', 'Portuguese', 'Spanish', 'English' ]}
              name={'language'}
              label={{
                show: true,
                position: 'outside',
                color: '#344054',
                formatter: "{c} %",
                fontSize: 12,
              }}
              itemstyle={{
                color: "#1B55AF",
                borderRadius: [0, 4, 4, 0]
              }}
              data={[1.2, 2.8, 3, 27, 58]}
              nametextstyle={{
                color: "#667085",
                align: "center",
                verticalAlign: "top",
                lineHeight: -130
              }}
              Yaxisname={"language"}
              Yaxislocation={"middle"}
            />

          </div>


        </div>
        <div className='col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
          {/* <div className="">
            <ChartWrapper
              title={"Degree11111"}
              ExportIcon={false}
              bulbIcon={false}
              infoIcon={false}
              tabSection={false}
              downloadIcon={false}
              graphIcon={false}
              className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
            />
          </div> */}
          {/* <div className='mx-[20px]'>
            <div className='text-[#344054] text-[12px] pb-[10px]'>Percentage with collee Degree</div>
            <div className='h-[200px] xl:h-[10.417vw]'>
              <Horizontalbarchartone
                grid={
                  {
                    top: -50,
                    bottom: 90,
                    left: 0,
                    right: 0
                  }
                }
                legend={
                  {
                    data: ['28,412','36,874'],
                    bottom: 80,
                    left: 0,
                    top: 50,
                  }
                }
                XsplitLine={false}
                XaxisLabel={false}
                YaxisLabel={false}
                YaxisLine={false}
                YaxisTick={false}
                dataone={503}
                datatwo={358}
                nameone={"36,874"}
                nametwo={"28,412"}
                bargapone={0}
                bargaptwo={"-77%"}
                barwidthone={'60%'}
                barwidthtwo={"40%"}
                colorone={'#BACCE7'}
                colortwo={'#1B55AF'}
              /></div>
            <div className='text-[#344054] text-[12px] pb-[10px]'>Percentage with Advance Degree</div>
            <div className='h-[200px] xl:h-[10.417vw]'>
            <Horizontalbarchartone
              grid={
                {
                  top: -50,
                  bottom: 90,
                  left: 0,
                  right: 0
                }
              }
              legend={
                {
                  data: [ '57,412', '39,819'],
                  left: 0,
                  top: 50,
                }
              }
              XsplitLine={false}
              XaxisLabel={false}
              YaxisLabel={false}
              YaxisLine={false}
              YaxisTick={false}
              dataone={503}
              datatwo={447}
              nameone={"39,819"}
              nametwo={"57,412"}
              bargapone={0}
              bargaptwo={"-75%"}
              barwidthone={'60%'}
              barwidthtwo={"40%"}
              colorone={'#BACCE7'}
              colortwo={'#1B55AF'}
            />
            </div>
          </div> */}
          <div className='col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
          <div className="">
            <ChartWrapper
              title={"Degree"}
              ExportIcon={false}
              bulbIcon={false}
              infoIcon={false}
              tabSection={false}
              downloadIcon={false}
              graphIcon={false}
              className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
            />
          </div>
          <div className='mx-[20px]'>
            <div className='text-[#344054] text-[12px] pb-[10px]'>Percentage with collee Degree</div>
            <div className='h-[200px] xl:h-[10.417vw]'>
              <Horizontalbarchartone
                grid={
                  {
                    top: -50,
                    bottom: 90,
                    left: 0,
                    right: 0
                  }
                }
                legend={
                  {
                    data: ['28,412','36,874' ],// Define legends for the series
                    bottom: 80,
                    left: 0
                  }
                }
                XsplitLine={false}
                XaxisLabel={false}
                YaxisLabel={false}
                YaxisLine={false}
                YaxisTick={false}
                dataone={503}
                datatwo={358}
                nameone={"36,874"}
                nametwo={"28,412"}
                bargapone={0}
                bargaptwo={"-77%"}
                barwidthone={'60%'}
                barwidthtwo={"40%"}
                colorone={'#BACCE7'}
                colortwo={'#1B55AF'}
              /></div>
            <div className='text-[#344054] text-[12px] pb-[10px]'>Percentage with Advance Degree</div>
            <div className='h-[200px] xl:h-[10.417vw]'>
            <Horizontalbarchartone
              grid={
                {
                  top: -50,
                  bottom: 90,
                  left: 0,
                  right: 0
                }
              }
              legend={
                {
                  data: ['39,819','57,412'],// Define legends for the series
                  bottom: 80,
                  left: 0
                }
              }
              XsplitLine={false}
              XaxisLabel={false}
              YaxisLabel={false}
              YaxisLine={false}
              YaxisTick={false}
              dataone={503}
              datatwo={447}
              nameone={"57,412"}
              nametwo={ "39,819"}
              bargapone={0}
              bargaptwo={"-75%"}
              barwidthone={'60%'}
              barwidthtwo={"40%"}
              colorone={'#BACCE7'}
              colortwo={'#1B55AF'}
            />
            </div>
          </div>
        </div>
        </div>
        <div className='col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
          <div className="">
            <ChartWrapper
              title={"Ethnicity Mix"}
              ExportIcon={false}
              bulbIcon={false}
              infoIcon={false}
              tabSection={false}
              downloadIcon={false}
              graphIcon={false}
              className="text-[18px] xl:text-[0.938vw] font-medium pb-0"
            />
          </div>
          <div className='mx-[20px] h-[436] xl:h-[22.708vw]'>
            <Mulhorizontalbarchart
              legend={{
                data: ['Ethnicity'],// Define legends for the series
                bottom: -5,
                left: 20
              }}
              tooltip={{
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              }}
              grid={{
                top: '0%',
                left: '2%',
                right: '4%',
                bottom: '10%',
                containLabel: true
              }}
              min={0}
              max={100}
              interval={20}

              XaxisLabel={{
                color: "#101828",
                fontSize: 11,
                formatter: "{value} %",
              }}
              XsplitLine={true}
              XlineStyle={{
                type: "dashed",
                color: "#C8CBD0",
              }}
              YaxisLabel={{
                color: "#24262D",
                fontSize: 10,

              }}
              YaxisTick={false}
              YaxisLine={false}
              YlineStyle={{
                color: "#E4E7EC"
              }}
              dataYaxis={['Hispanic or Latino', 'Other Race/2 or\n more races', 'Native Hawaiian', 'Asian', 'American Indian \nand Alaska Native', 'Black or African', 'White']}
              name={'Ethnicity'}
              label={{
                show: true,
                position: 'outside',
                color: '#344054',
                formatter: "{c} %",
                fontSize: 12,
              }}
              itemstyle={{
                color: "#1B55AF",
                borderRadius: [0, 4, 4, 0]
              }}
              data={[34, 2.3, 0.2, 1.9, 0.9, 19.1, 41]}
              nametextstyle={{
                color: "#667085",
                align: "center",
                verticalAlign: "top",
                lineHeight: -130
              }}
            />
          </div>
        </div>


      </div>
      {/* second row */}
      <div className='grid grid-cols-4 lg:grid-cols-8 2xl:grid-cols-12 gap-5 xl:gap-[1.042vw] mt-[24px]'>
        <div className='col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
          <div className="">
            <ChartWrapper
              title={"Age Distribution"}
              ExportIcon={false}
              bulbIcon={false}
              infoIcon={false}
              tabSection={false}
              downloadIcon={false}
              graphIcon={false}
              className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
            />
          </div>
          <div className=''>
            <Piechart
              tooltip={{
                trigger: 'item'
              }}
              legend={{
                orient: 'vertical',
                left: 'left',
                show: false
              }}
              data={[
                { value: 600, name: '5to7 \n 18%', itemStyle: { color: '#BACCE7' } },
                { value: 1500, name: '18to29 \n 18%', itemStyle: { color: '#1B55AF' } },
                { value: 600, name: '30to44 \n 18%', itemStyle: { color: '#101828' } },
                { value: 400, name: '45to64 \n 18%', itemStyle: { color: '#0D2A57' } },
                { value: 500, name: '46to64 \n 12%', itemStyle: { color: '#184C9D' } },
                { value: 550, name: '65 Years and over \n 12%', itemStyle: { color: '#3166B7' } },
                { value: 600, name: 'Under 5 years \n 12% ', itemStyle: { color: '#5F88C7' } }
              ]}
              itemStyle={{
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }}
              radius={["10%", "50%"]}
            />

          </div>


        </div>
        <div className='col-span-4 bg-[#fff] border border-[#E4E7EC] rounded-lg'>
          <div className="">
            <ChartWrapper
              title={"Age Distribution"}
              ExportIcon={false}
              bulbIcon={false}
              infoIcon={false}
              tabSection={false}
              downloadIcon={false}
              graphIcon={false}
              className="text-[18px] xl:text-[0.938vw] font-medium pb-[20px] xl:pb-[1.042vw]"
            />
          </div>
          <div className='mx-[20px]'>
          <Piechart
              tooltip={{
                trigger: 'item'
              }}
              legend={{
                orient: 'vertical',
                left: 'left',
                show: false
              }}
              data={[
                { value: 55, name: 'Single \n 51.2%', itemStyle: { color: '#0F192D' } },
        { value: 15, name: 'Married \n 18%', itemStyle: { color: '#123B7A' } },
        { value: 20, name: 'Divorced \n 18%', itemStyle: { color: '#3166B7' } },
        { value: 15, name: 'Wildowed \n 8.7%', itemStyle: { color: '#4E85E0' } }
              ]}
              itemStyle={{
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }}
              radius={["10%", "50%"]}
            />

          </div>
        </div>



      </div>
    </>
  )
}