'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputTextarea } from "primereact/inputtextarea";
import Studentsnapshot from '../../../components/popup/dashboardpopups/studentsnapshot/studentsnapshot';
import { useRouter } from 'next/navigation';
import HorizontalBarChart from '../../../components/charts/dasboardcharts/classroomataglancePopups/horizontalbarchart';
import VerticalBarChart from '../../../components/charts/dasboardcharts/classroomataglancePopups/verticalbarchar';
import PieChart from '../../../components/charts/dasboardcharts/classroomataglancePopups/piechart';
import DoubleBarChart from '../../../components/charts/dasboardcharts/classroomataglancePopups/doublebarchart';
import HorizontalBarChartOrange from '../../../components/charts/dasboardcharts/classroomataglancePopups/horizontalbarchartorange';
import GaugeChart from '../../../components/charts/dasboardcharts/classroomataglancePopups/gaugechart';
import LineWithSymbolChart from '../../../components/charts/dasboardcharts/classroomataglancePopups/linewithsymbolchart';
import HorizontalBarChartPurpul from '../../../components/charts/dasboardcharts/classroomataglancePopups/horizontalbarchartpurpul';
import QuizScoreSummaryHoizontalBarChart from '../../../components/charts/dasboardcharts/classroomataglancePopups/quickstorysummaryhorizontalbarchar';


export default function ClassroomAtaGlance() {
    const pathname = useRouter();
    const [value, setValue] = useState('');
    const [progressSnapshot, setProgressSnapshot] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <div className='text-[#101828] text-[20px] xl:text-[18px] 3xl:text-[1.042vw] font-semibold'>
            Classroom At a Glance
            </div>
            <div className='text-[#667085] text-[16px] xl:text-[14px] 3xl:text-[0.729vw] font-normal mt-[8px] xl:mt-[0.417vw]'>
                AI Classroom that enhances Google Classroom by providing AI powered classroom
            </div>
            <div className='mt-[22px] xl:mt-[1.146vw]'>
            <div className='flex items-center justify-end gap-5 mb-5 3xl:mb-[1.146vw]'>
                <div><Link href={'https://k12360-dashboard.innive.io/teacherdashboard/course_schedule.html'} target='_blank' className='box-shadow02 bg-[#1570EF] border border-[#1570EF] rounded-lg text-white text-xs font-medium leading-7 py-1.5 px-3 flex items-center gap-2'><i className='hexatoolduplicateuser'></i><span>Explore Whole Child</span></Link></div>
                <div>
                    <div className='text-[#667085] text-base flex items-center gap-2'>
                        <span ref={prevRef} className='border border-[#E4E7EC] w-[36px] h-[36px] flex items-center justify-center rounded-md cursor-pointer'><i className='hexatoolnavigate-left'></i></span>
                        <span  ref={nextRef} className='border border-[#E4E7EC] w-[36px] h-[36px] flex items-center justify-center rounded-md cursor-pointer'><i className='hexatoolnavigate-right'></i></span>
                    </div>
                </div>
            </div>
            <Swiper
            className='Swiper_shadow'
            modules={[Navigation]}
            navigation={false}
            loop={true}
            breakpoints={{
            // when window width is >= 320px
            320: {
            slidesPerView: 1,
            spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 100,
                },
                // when window width is >= 880px
                800: {
                    slidesPerView: 2,
                    spaceBetween: 150,
                    },
            // when window width is >= 1024px
            1024: {
            slidesPerView: 3,
            spaceBetween: 0,
            },
            // when window width is >= 1200px
            1280: {
                slidesPerView: 4,
                spaceBetween: 180,
                },
            // when window width is >= 1400px
            1455: {
                slidesPerView: 5,
                spaceBetween: 300,
                },
            // when window width is >= 1600px
            1600: {
                slidesPerView: 5,
                spaceBetween: 200,
                },
             // when window width is >= 1700px
             1700: {
                slidesPerView: 5,
                spaceBetween: 180,
                },
            // when window width is >= 2000px
            2000: {
                slidesPerView: 5,
                spaceBetween: 150,
                },
            }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
            setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
            });
            }}
            >
            <SwiperSlide>
            <div className='w-[300px] 3xl:w-[17.708vw] 3xl:p-[0.833vw] p-4 flex flex-col gap-2.5 3xl:gap-[0.521vw] bg-white border border-[#E4E7EC] rounded-lg'>
            <div className='flex items-center justify-between'>
                <div className='text-[#374151] text-base font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]'>Classrooms</div>
                <div><i className='hexatoolclassrooms text-[48px] 3xl:text-[2.5vw]'></i></div>
            </div>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Classrooms Handlings</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>8</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='w-[300px] 3xl:w-[17.708vw] 3xl:p-[0.833vw] p-4 flex flex-col gap-2.5 3xl:gap-[0.521vw] bg-white border border-[#E4E7EC] rounded-lg'>
            <div className='flex items-center justify-between'>
                <div className='text-[#374151] text-base font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]'>Assignments</div>
                <div><i className='hexatoolassignments text-[48px] 3xl:text-[2.5vw]'></i></div>
            </div>
            <div className='flex items-center justify-between'>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Created</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>48</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Per Week</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>2</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='w-[300px] 3xl:w-[17.708vw] 3xl:p-[0.833vw] p-4 flex flex-col gap-2.5 3xl:gap-[0.521vw] bg-white border border-[#E4E7EC] rounded-lg'>
            <div className='flex items-center justify-between'>
                <div className='text-[#374151] text-base font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]'>Popular Apps</div>
                <div><i className='hexatoolpopularapps text-[48px] 3xl:text-[2.5vw]'></i></div>
            </div>
            <div className='flex items-center justify-between'>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Apps Used</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>48</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Avg. Time Spend</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>2min</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='w-[300px] 3xl:w-[17.708vw] 3xl:p-[0.833vw] p-4 flex flex-col gap-2.5 3xl:gap-[0.521vw] bg-white border border-[#E4E7EC] rounded-lg'>
            <div className='flex items-center justify-between'>
                <div className='text-[#374151] text-base font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]'>Quizzes</div>
                <div><i className='hexatoolquizzes text-[48px] 3xl:text-[2.5vw]'></i></div>
            </div>
            <div className='flex items-center justify-between'>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Created</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>48</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Per Week</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>2</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='w-[300px] 3xl:w-[17.708vw] 3xl:p-[0.833vw] p-4 flex flex-col gap-2.5 3xl:gap-[0.521vw] bg-white border border-[#E4E7EC] rounded-lg'>
            <div className='flex items-center justify-between'>
                <div className='text-[#374151] text-base font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]'>Students</div>
                <div><i className='hexatoolschooler-student text-[48px] 3xl:text-[2.5vw]'></i></div>
            </div>
            <div className='flex items-center justify-between'>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Created</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>48</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Per Week</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>2</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            </div>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='w-[300px] 3xl:w-[17.708vw] 3xl:p-[0.833vw] p-4 flex flex-col gap-2.5 3xl:gap-[0.521vw] bg-white border border-[#E4E7EC] rounded-lg'>
            <div className='flex items-center justify-between'>
                <div className='text-[#374151] text-base font-semibold leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]'>Posts</div>
                <div><i className='hexatoolposts text-[48px] 3xl:text-[2.5vw]'></i></div>
            </div>
            <div className='flex items-center justify-between'>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Created</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>48</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='text-[#4B586E] text-xs font-normal leading-[18px] 3xl:text-[0.729vw] 3xl:leading-[0.938vw]'>Assignment Per Week</div>
                <div className='flex items-center gap-2'>
                    <div className='text-[#374151] text-xl font-semibold leading-7 3xl:text-[1.25vw] 3xl:leading-[1.458vw]'><p>2</p></div>
                    <div className='text-xs font-normal leading-[18px] space-x-1'><span className='text-[#12B76A]'>4%<i className='hexatoolrectangle-up px-0.5 text-[8px]'></i></span><span className='text-[#4B586E]'>LY Var</span></div>
                </div>
            </div>
            </div>
            </div>
            </SwiperSlide>

            </Swiper>
            </div>

            <div className='3xl:mt-4 mt-3.5'>
            <Swiper
            className='Swiper_shadow'
            modules={[Navigation]}
            navigation={false}
            loop={true}
            breakpoints={{
            // when window width is >= 320px
            320: {
            slidesPerView: 1,
            spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
            slidesPerView: 2,
            spaceBetween: 240,
            },
            // when window width is >= 880px
            800: {
                slidesPerView: 2,
                spaceBetween: 150,
                },
            // when window width is >= 1024px
            1024: {
            slidesPerView: 3,
            spaceBetween: 240,
            },
            // when window width is >= 1200px
            1280: {
                slidesPerView: 3,
                spaceBetween: 200,
                },
            // when window width is >= 1400px
            1455: {
                slidesPerView: 4,
                spaceBetween: 400,
                },
            // when window width is >= 1600px
            1600: {
                slidesPerView: 4,
                spaceBetween: 300,
                },
            // when window width is >= 1700px
            1700: {
                slidesPerView: 4,
                spaceBetween: 180,
                },
                  // when window width is >= 1920px
            1920: {
                slidesPerView: 4,
                spaceBetween: 20,
                },
            // when window width is >= 2000px
            2000: {
                slidesPerView: 5,
                spaceBetween: 400,
                },
            }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {
            setTimeout(() => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
            });
            }}
            >
            <SwiperSlide>
            {/*Students Participation*/}
            <button onClick={() => pathname.push('/dashboard/classroomataglance/studentsparticipation')}>
            <div className='w-[400px] 3xl:w-[20.313vw] bg-white border border-[#E4E7EC] rounded-[12px]'>
                    <Image src={'/images/dashboard/students_participation.png'} className='rounded-tl-[12px] rounded-tr-[12px] w-full h-[130px] object-cover' alt='students_participation' width={390} height={130} />
                    <div className='bg-[#1570EF] py-2.5 px-4 3xl:py-[0.521vw] 3xl:px-[0.833vw] text-white flex items-center justify-between'>
                        <div className='text-[18px] font-normal leading-6'>Students Participation</div>
                        <Link onClick={(e) => {e.stopPropagation(), setProgressSnapshot(true)}} href={''} className='text-xl'><i className='hexatoollink-export'></i></Link>
                    </div>
                    {/*scroll Start */}
                    <ScrollPanel style={{ width: '100%', height: '550px' }}>
                    <div className='3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                    {/*row*/}
                    <div className='flex items-center justify-between gap-3'>
                        <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw] w-full'>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Class Students</div>
                            <div className='flex items-center gap-1 text-[#070A3B] text-2xl font-bold leading-[34px]'><p>175</p><span className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4% LY Var.</span></span></div>
                        </div>
                        <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw] w-full'>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Avg. Students per Class</div>
                            <div className='flex items-center gap-1 text-[#070A3B] text-2xl font-bold leading-[34px]'><p>25</p><span className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4% LY Var.</span></span></div>
                        </div>
                    </div>
                    <div>
                    <div className='h-[88px]'>
                            <HorizontalBarChart />
                        </div>
                    </div>
                    {/*row*/}
                    </div>
                    {/*row*/}
                    <div className='bg-[#F2F4F7] 3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                        <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Students by Grade</div>
                        <div className='h-[130px]'>
                            <VerticalBarChart />
                        </div>
                    </div>
                    {/*row*/}
                    <div className='3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                        <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Students by Ethnicity</div>
                        <div className='flex justify-between'>
                        <div className='h-[130px] w-[130px]'>
                            <PieChart />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                           {/*col*/}
                           <div className='flex gap-1.5'>
                            <div className='text-[#051123]'><i className='hexatoolcircle-fill'></i></div>
                            <div className='flex flex-col items-start'>
                                <p className='text-[#344054] text-sm font-semibold leading-4'>120</p>
                                <span className='text-[#667085] text-xs font-normal leading-4'>Hispannic</span>
                            </div>
                            </div>
                            {/*col*/}
                            <div className='flex items-start gap-1.5'>
                            <div className='text-[#5F88C7]'><i className='hexatoolcircle-fill'></i></div>
                            <div className='flex flex-col items-start'>
                                <p className='text-[#344054] text-sm font-semibold leading-4'>170</p>
                                <span className='text-[#667085] text-xs font-normal leading-4'>White</span>
                            </div>
                            </div>
                            {/*col*/}
                            <div className='flex items-start gap-1.5'>
                            <div className='text-[#0D2A57]'><i className='hexatoolcircle-fill'></i></div>
                            <div className='flex flex-col items-start'>
                                <p className='text-[#344054] text-sm font-semibold leading-4'>40</p>
                                <span className='text-[#667085] text-xs font-normal leading-4'>Asian</span>
                            </div>
                            </div>
                            {/*col*/}
                            <div className='flex items-start gap-1.5'>
                            <div className='text-[#C9D8F6]'><i className='hexatoolcircle-fill'></i></div>
                            <div className='flex flex-col items-start'>
                                <p className='text-[#344054] text-sm font-semibold leading-4'>50</p>
                                <span className='text-[#667085] text-xs font-normal leading-4'>Others</span>
                            </div>
                            </div>
                            {/*col*/}
                            <div className='flex items-start gap-1.5'>
                            <div className='text-[#3166B7]'><i className='hexatoolcircle-fill'></i></div>
                            <div className='flex flex-col items-start'>
                                <p className='text-[#344054] text-sm font-semibold leading-4'>60</p>
                                <span className='text-[#667085] text-xs font-normal leading-4'>Black</span>
                            </div>
                            </div>
                            {/*col*/}
                        </div>
                        </div>
                    </div>
                    </ScrollPanel>
                    {/*scroll End */}
            </div>
            </button>
            {/*Students Participation*/}
            </SwiperSlide>
            <SwiperSlide>
            {/*Students Progress*/}
            <button onClick={() => pathname.push('/dashboard/classroomataglance/studentsparticipation')}  className='w-[400px] 3xl:w-[20.313vw] bg-white border border-[#E4E7EC] rounded-[12px]'>
                    <Image src={'/images/dashboard/02.png'} className='rounded-tl-[12px] rounded-tr-[12px] w-full h-[130px] object-cover' alt='students_participation' width={390} height={130} />
                    <div className='bg-[#1570EF] py-2.5 px-4 3xl:py-[0.521vw] 3xl:px-[0.833vw] text-white flex items-center justify-between'>
                        <div className='text-[18px] font-normal leading-6'>Students Progress</div>
                        <div onClick={(e) => {e.stopPropagation(), setProgressSnapshot(true)}} className='text-xl cursor-pointer'><i className='hexatoollink-export'></i></div>
                    </div>
                    {/*scroll Start */}
                    <ScrollPanel style={{ width: '100%', height: '550px' }}>
                    <div className='3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                    {/*row*/}
                    {/*col*/}
                    <div className='space-y-2'>
                    <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw]'>
                        <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>asgmt. Submission&#37;</div>
                            <div className='flex flex-col text-[#070A3B] text-2xl font-bold leading-normal'>
                            <div>86.5&#37;</div>
                            <div className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4&#37; LY Var.</span></div>
                            </div>
                        </div>
                        <div>
                            <div className='text-[#667085] text-xs font-normal leading-[18px]'>&#35; of Students summitted All</div>
                            <div className='flex flex-col items-end text-[#070A3B] text-2xl font-bold leading-normal'>
                            <div>175</div>
                            <div className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4&#37; LY Var.</span></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw]'>
                        <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Non Submission&#37;</div>
                            <div className='flex flex-col text-[#070A3B] text-2xl font-bold leading-normal'>
                            <div>26.5&#37;</div>
                            <div className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>5&#37; LY Var.</span></div>
                            </div>
                        </div>
                        <div>
                            <div className='text-[#667085] text-xs font-normal leading-[18px]'># of Students not submitted &#10095; 3</div>
                            <div className='flex flex-col items-end text-[#070A3B] text-2xl font-bold leading-normal'>
                            <div>24</div>
                            <div className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4&#37; LY Var.</span></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw]'>
                        <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Quiz Submission&#37;</div>
                            <div className='flex flex-col text-[#070A3B] text-2xl font-bold leading-normal'>
                            <div>86.5&#37;</div>
                            <div className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>5&#37; LY Var.</span></div>
                            </div>
                        </div>
                        <div>
                            <div className='text-[#667085] text-xs font-normal leading-[18px]'># of Students summitted All</div>
                            <div className='flex flex-col items-end text-[#070A3B] text-2xl font-bold leading-normal'>
                            <div>45</div>
                            <div className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4&#37; LY Var.</span></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/*col*/}
                    </div>
                    {/*row*/}
                    </div>
                    {/*row*/}
                    <div className='bg-[#F2F4F7] 3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw] mt-9 rounded-bl-xl rounded-br-xl'>
                        <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Grade Wise Submission%</div>
                        <div className='h-[180px]'>
                           <DoubleBarChart />
                        </div>
                    </div>
                    </ScrollPanel>
                    {/*Scroll End*/}
                    </button>
                    {/*Students Progress*/}
            </SwiperSlide>
            <SwiperSlide>
            {/*Students Engagement*/}
            <button onClick={() => pathname.push('/dashboard/classroomataglance/studentsparticipation')} className='w-[400px] 3xl:w-[20.313vw] bg-white border border-[#E4E7EC] rounded-[12px]'>
                    <Image src={'/images/dashboard/03.png'} className='rounded-tl-[12px] rounded-tr-[12px] w-full h-[130px] object-cover' alt='students_participation' width={390} height={130} />
                    <div className='bg-[#1570EF] py-2.5 px-4 3xl:py-[0.521vw] 3xl:px-[0.833vw] text-white flex items-center justify-between'>
                        <div className='text-[18px] font-normal leading-6'>Students Engagement</div>
                        <Link href={''} onClick={(e) => {e.stopPropagation(), setProgressSnapshot(true)}} className='text-xl'><i className='hexatoollink-export'></i></Link>
                    </div>
                    {/*scroll Start */}
                    <ScrollPanel style={{ width: '100%', height: '550px' }}>
                    <div className='3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                    {/*row*/}
                    <div className='flex items-center justify-between gap-3 mb-2.5'>
                        <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw] w-full'>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Student Comments</div>
                            <div className='flex items-center gap-1 text-[#070A3B] text-2xl font-bold leading-[34px]'><p>775</p><span className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4% LY Var.</span></span></div>
                        </div>
                        <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw] w-full'>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Avg. Comments per Student</div>
                            <div className='flex items-center gap-1 text-[#070A3B] text-2xl font-bold leading-[34px]'><p>12</p><span className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4% LY Var.</span></span></div>
                        </div>
                    </div>
                    <div className='h-[100px]'>
                    <HorizontalBarChartOrange />

                    </div>
                    {/*row*/}
                    <div className='border-t border-[#E4E7EC] border-dashed mt-2.5 flex items-center justify-between'>
                    <div>
                        <div className='text-[rgba(0,0,0,0.87)] text-xs font-medium leading-[18px]'>Avg. Time Spent per Student</div>
                        <div className='mt-[16px]'>
                            <div className='text-[#070A3B] text-2xl font-bold leading-[28px]'>45 Mins</div>
                            <div><span className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4% LY Var.</span></span></div>
                        </div>
                    </div>
                    <div className='h-[130px] w-[130px]'>
                           <GaugeChart />
                    </div>
                    </div>
                    </div>
                    {/*row*/}
                    <div className='bg-[#F2F4F7] 3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw] rounded-bl-xl rounded-br-xl'>
                        <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Engagement Trend - Comments</div>
                        <div className='h-[180px]'>
                            <LineWithSymbolChart />
                        </div>
                    </div>
                    </ScrollPanel>
                    {/*Scroll End*/}
                    </button>
                    {/*Students Engagement*/}
            </SwiperSlide>
            <SwiperSlide>
            {/*Students Proficiency*/}
            <button onClick={() => pathname.push('/dashboard/classroomataglance/studentsparticipation')} className='w-[400px] 3xl:w-[20.313vw] bg-white border border-[#E4E7EC] rounded-[12px]'>
                    <Image src={'/images/dashboard/04.png'} className='rounded-tl-[12px] rounded-tr-[12px] w-full h-[130px] object-cover' alt='students_participation' width={390} height={130} />
                    <div className='bg-[#1570EF] py-2.5 px-4 3xl:py-[0.521vw] 3xl:px-[0.833vw] text-white flex items-center justify-between'>
                        <div className='text-[18px] font-normal leading-6'>Students Proficiency</div>
                        <Link href={''} onClick={(e) => {e.stopPropagation(), setProgressSnapshot(true)}} className='text-xl'><i className='hexatoollink-export'></i></Link>
                    </div>
                    {/*scroll Start */}
                    <ScrollPanel style={{ width: '100%', height: '550px' }}>
                    <div className='3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                    {/*row*/}
                    <div className='flex items-center justify-between gap-3 pb-2.5 border-b border-[#E4E7EC] border-dashed'>
                        <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw] w-full'>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Avg. Assignment Score</div>
                            <div className='flex items-center gap-1 text-[#070A3B] text-2xl font-bold leading-[34px]'><p>77%</p><span className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4% LY Var.</span></span></div>
                        </div>
                        <div className='bg-[#F2F4F7] rounded-md p-2 3xl:p-[0.417vw] w-full'>
                            <div className='text-[rgba(0,0,0,0.87)] text-[11px] 3xl:text-[0.625vw] font-medium leading-[18px]'>Avg. Quiz Score</div>
                            <div className='flex items-center gap-1 text-[#070A3B] text-2xl font-bold leading-[34px]'><p>12%</p><span className='text-[#04B8AD] text-xs font-medium space-x-1'><i className='hexatoolrectangle-up text-[8px]'></i><span>4% LY Var.</span></span></div>
                        </div>
                    </div>
                    <div className='mt-[20px] space-y-[14px] pb-4 border-b border-[#E4E7EC] border-dashed'>
                    <div className='text-[rgba(0, 0, 0, 0.87)] text-xs font-medium leading-[18px]'>Assignment Score - Summary</div>
                    <div className='h-[150px]'>
                            <HorizontalBarChartPurpul />
                    </div>
                    </div>
                    <div className='mt-[20px] space-y-[14px]'>
                    <div className='text-[rgba(0, 0, 0, 0.87)] text-xs font-medium leading-[18px]'>Quiz Score - Summary</div>
                    <div className='h-[150px]'>
                           <QuizScoreSummaryHoizontalBarChart />
                    </div>
                    </div>
                    </div>
                    </ScrollPanel>
                    {/*Scroll End*/}
                    </button>
                    {/*Students Proficiency*/}
            </SwiperSlide>
            <SwiperSlide>
            {/*Leaderboard*/}
            <button onClick={() => pathname.push('/dashboard/classroomataglance/studentsparticipation')} className='w-[400px] 3xl:w-[20.313vw] bg-white border border-[#E4E7EC] rounded-[12px]'>
                    <Image src={'/images/dashboard/05.png'} className='rounded-tl-[12px] rounded-tr-[12px] w-full h-[130px] object-cover' alt='students_participation' width={390} height={130} />
                    <div className='bg-[#1570EF] py-2.5 px-4 3xl:py-[0.521vw] 3xl:px-[0.833vw] text-white flex items-center justify-between'>
                        <div className='text-[18px] font-normal leading-6'>Leaderboard</div>
                        <Link href={''} onClick={(e) => {e.stopPropagation(), setProgressSnapshot(true)}} className='text-xl'><i className='hexatoollink-export'></i></Link>
                    </div>
                    {/*scroll Start */}
                    <ScrollPanel style={{ width: '100%', height: '550px' }}>
                    <div className='3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                    {/*row*/}
                    <div className='flex flex-col gap-3'>
                        {/*col*/}
                        <div className='bg-[#F2F4F7] rounded-lg p-2.5 space-y-1'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#344054] text-xs font-medium leading-[18px]'>Assignment Top Scorer</div>
                                <div className='bg-[#039855] px-2 py-1 text-white text-xs font-semibold leading-[18px] rounded'>95%</div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div><Image src={'/images/dashboard/child-pic.png'} width={48} height={48} alt='child' /></div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-[#344054] text-lg font-semibold flex items-center gap-2'>
                                        <p className='leading-4'>Alan Watts</p><span className='text-[#98A2B3] text-xs font-medium leading-4'>ID:1234567</span>
                                    </div>
                                    <div className='bg-[#98A2B3] px-1.5 rounded text-white text-xs font-normal leading-6'>Grade 1</div>
                                </div>
                            </div>
                        </div>
                        {/*col*/}
                        <div className='bg-[#F2F4F7] rounded-lg p-2.5 space-y-1'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#344054] text-xs font-medium leading-[18px]'>Quiz Top Scorer</div>
                                <div className='bg-[#039855] px-2 py-1 text-white text-xs font-semibold leading-[18px] rounded'>95%</div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div><Image src={'/images/dashboard/child-pic.png'} width={48} height={48} alt='child' /></div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-[#344054] text-lg font-semibold flex items-center gap-2'>
                                        <p className='leading-4'>Ken Ash</p><span className='text-[#98A2B3] text-xs font-medium leading-4'>ID:1234567</span>
                                    </div>
                                    <div className='bg-[#98A2B3] px-1.5 rounded text-white text-xs font-normal leading-6'>Grade 2</div>
                                </div>
                            </div>
                        </div>
                        {/*col*/}
                        <div className='bg-[#F2F4F7] rounded-lg p-2.5 space-y-1'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#344054] text-xs font-medium leading-[18px]'>Top Commenter</div>
                                <div className='bg-[#039855] px-2 py-1 text-white text-xs font-semibold leading-[18px] rounded'>26 Comments</div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div><Image src={'/images/dashboard/child-pic.png'} width={48} height={48} alt='child' /></div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-[#344054] text-lg font-semibold flex items-center gap-2'>
                                        <p className='leading-4'>Andrina</p><span className='text-[#98A2B3] text-xs font-medium leading-4'>ID:1234567</span>
                                    </div>
                                    <div className='bg-[#98A2B3] px-1.5 rounded text-white text-xs font-normal leading-6'>Grade 2</div>
                                </div>
                            </div>
                        </div>
                        {/*col*/}
                        <div className='bg-[#F2F4F7] rounded-lg p-2.5 space-y-1'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#344054] text-xs font-medium leading-[18px]'>Top 5 Overall Performers</div>
                            </div>
                            <div className='space-y-[10px]'>
                            <div className='flex items-start gap-3'>
                                <div><Image src={'/images/dashboard/child-pic.png'} width={48} height={48} alt='child' /></div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-[#344054] text-lg font-semibold flex items-center gap-2'>
                                        <p className='leading-4'>Jane Cooper</p><span className='text-[#98A2B3] text-xs font-medium leading-4'>ID:1234567</span>
                                    </div>
                                    <div className='bg-[#98A2B3] px-1.5 rounded text-white text-xs font-normal leading-6'>Grade 2</div>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div><Image src={'/images/dashboard/child-pic.png'} width={48} height={48} alt='child' /></div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-[#344054] text-lg font-semibold flex items-center gap-2'>
                                        <p className='leading-4'>Kathryn Murphy</p><span className='text-[#98A2B3] text-xs font-medium leading-4'>ID:1234567</span>
                                    </div>
                                    <div className='bg-[#98A2B3] px-1.5 rounded text-white text-xs font-normal leading-6'>Grade 2</div>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div><Image src={'/images/dashboard/child-pic.png'} width={48} height={48} alt='child' /></div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-[#344054] text-lg font-semibold flex items-center gap-2'>
                                        <p className='leading-4'>Brooklyn Simmons</p><span className='text-[#98A2B3] text-xs font-medium leading-4'>ID:1234567</span>
                                    </div>
                                    <div className='bg-[#98A2B3] px-1.5 rounded text-white text-xs font-normal leading-6'>Grade 2</div>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div><Image src={'/images/dashboard/child-pic.png'} width={48} height={48} alt='child' /></div>
                                <div className='flex flex-col items-start gap-2'>
                                    <div className='text-[#344054] text-lg font-semibold flex items-center gap-2'>
                                        <p className='leading-4'>Brooklyn Simmons</p><span className='text-[#98A2B3] text-xs font-medium leading-4'>ID:1234567</span>
                                    </div>
                                    <div className='bg-[#98A2B3] px-1.5 rounded text-white text-xs font-normal leading-6'>Grade 2</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/*col*/}
                    </div>
                    {/*row*/}
                    </div>
                    </ScrollPanel>
                    {/*Scroll End*/}
                    </button>
                    {/*Leaderboard*/}
            </SwiperSlide>
            <SwiperSlide>
            {/*Classroom Insights*/}
            <button onClick={() => pathname.push('/dashboard/classroomataglance/studentsparticipation')} className='w-[400px] 3xl:w-[20.313vw] bg-white border border-[#E4E7EC] rounded-[12px]'>
                    <Image src={'/images/dashboard/06.png'} className='rounded-tl-[12px] rounded-tr-[12px] w-full h-[130px] object-cover' alt='students_participation' width={390} height={130} />
                    <div className='bg-[#1570EF] py-2.5 px-4 3xl:py-[0.521vw] 3xl:px-[0.833vw] text-white flex items-center justify-between'>
                        <div className='text-[18px] font-normal leading-6'>Classroom Insights</div>
                        <Link href={''} onClick={(e) => {e.stopPropagation(), setProgressSnapshot(true)}} className='text-xl'><i className='hexatoollink-export'></i></Link>
                    </div>
                    {/*scroll Start */}
                    <ScrollPanel style={{ width: '100%', height: '550px' }}>
                    <div className='3xl:py-[0.729vw] py-3.5 px-4 3xl:px-[0.833vw]'>
                    {/*row*/}
                    <div className='text-[#101828] text-sm font-medium leading-[14px] mb-2'>Generated Insights</div>
                    <ScrollPanel style={{ width: '100%', height: '300px' }}>
                    <div className='space-y-0.5'>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded px-3.5 py-2 text-[#344054] text-xs font-medium leading-[14px] space-y-[10px]'>
                        <p>3 students have accepted the class invite for Math Geometry Class for Grade 1</p>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded px-3.5 py-2 text-[#344054] text-xs font-medium leading-[14px] space-y-[10px]'>
                        <p>4 Student Assignments are due to be Graded by 17th May 2024</p>
                        <Link href={''} className='text-[#4C80E4] flex items-center gap-1.5'><i className='hexatoollink-export'></i><span>Arithmetic Assignment - 2</span></Link>
                        <Link href={''} className='text-[#4C80E4] flex items-center gap-1.5'><i className='hexatoollink-export'></i><span>Arithmetic Assignment - 2</span></Link>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded px-3.5 py-2 text-[#344054] text-xs font-medium leading-[14px]'>
                        <p>Math Geometry Class for Grade 1 is performing well with 75% Assignment Submission and 78% Score</p>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded px-3.5 py-2 text-[#344054] text-xs font-medium leading-[14px] space-y-[10px]'>
                        <p>John Evans has not submitted the past 4 Assignments</p>
                        <Link href={''} className='text-[#4C80E4] flex items-center gap-1.5'><i className='hexatoollink-export'></i><span>View John Evans Scorecard</span></Link>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded px-3.5 py-2 text-[#344054] text-xs font-medium leading-[14px] space-y-[10px]'>
                        <p>4 Quizzes are due to be Graded by 17th May 2024</p>
                        <Link href={''} className='text-[#4C80E4] flex items-center gap-1.5'><i className='hexatoollink-export'></i><span>Science Quiz - 2</span></Link>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded px-3.5 py-2 text-[#344054] text-xs font-medium leading-[14px] space-y-[10px]'>
                        <p>5 Quizzes are due to be Graded by 17th May 2024</p>
                        <Link href={''} className='text-[#4C80E4] flex items-center gap-1.5'><i className='hexatoollink-export'></i><span>Science Quiz - 2</span></Link>
                    </div>
                    {/*col*/}
                    <div className='bg-[#F2F4F7] rounded px-3.5 py-2 text-[#344054] text-xs font-medium leading-[14px] space-y-[10px]'>
                        <p>6 Quizzes are due to be Graded by 17th May 2024</p>
                        <Link href={''} className='text-[#4C80E4] flex items-center gap-1.5'><i className='hexatoollink-export'></i><span>Science Quiz - 2</span></Link>
                    </div>
                    {/*col*/}
                    </div>
                    </ScrollPanel>
                    <div className='space-y-2 flex flex-col justify-end items-end mt-3'>
                    <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={4} cols={30} placeholder='Write your query to generate the insights...' className='cutsm_InputTextarea placeholder:text-[#98A2B3] placeholder:text-xs placeholder:leading-normal placeholder:font-normal' />
                    <Link href={''} className='text-white text-sm leading-6 rounded-md pinkgradient px-3.5 py-2 flex items-center justify-center gap-2.5'><i className='hexatoolstart-plus'></i><span>Generate with BrixAI</span></Link>
                    </div>
                    </div>
                    </ScrollPanel>
                    {/*Scroll End*/}
                    </button>
                    {/*Classroom Insights*/}
            </SwiperSlide>

            </Swiper>
            </div>
            <Studentsnapshot visible={progressSnapshot} onHide={() => setProgressSnapshot(false)} />

        </>
    )
}
