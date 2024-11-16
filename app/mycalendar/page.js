"use client"
import React, { useState, useEffect, useRef } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Layout from '../../layouts/pagelayout';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import Link from 'next/link';
import { BreadCrumb } from "primereact/breadcrumb";
import CreateNewEvent from '../../components/popup/mycalendar/createnewevent'
import { fetchCalendarList, fetchEventById, fetchEventList } from '../actions/Mycalendar';
import { toast } from 'react-toastify';
import { getDataFromLocalStorage } from '../../components/helper/commonFunction';


export default function Page() {
    const calendarRef = useRef(null);
  const overlayPanelRef = useRef(null);
  const initialDate = new Date();

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [events,setEvents] = useState([]);
  //[
  //   { title: 'Domino Addition', date: '2024-06-01', },
  //   { title: 'Addition', date: '2024-06-02', },
  //   { title: 'Count Money', date: '2024-06-11', },
  //   { title: 'Subtraction', date: '2024-06-22', }
  // ]);
  const [activeView, setActiveView] = useState('dayGridMonth'); // Track active view (Month, Week, Day)
  const [selectedEvent, setSelectedEvent] = useState(null);

  const months = [
    { name: 'All', code: 0 },
    { name: 'January', code: 1 },
    { name: 'February', code: 2 },
    { name: 'March', code: 3 },
    { name: 'April', code: 4 },
    { name: 'May', code: 5 },
    { name: 'June', code: 6 },
    { name: 'July', code: 7 },
    { name: 'August', code: 8 },
    { name: 'September', code: 9 },
    { name: 'October', code: 10 },
    { name: 'November', code: 11 },
    { name: 'December', code: 12 }
  ];

  const [selectedMonth, setSelectedMonth] = useState(
    months.find((month) => month.code === initialDate.getMonth() + 1)
  );

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { name: year.toString(), code: year };
  });

  const handleMonthChange = (e) => {
    const selectedCode = e?.value?.code;
    if (selectedCode === 0) {
      // Handle "All" selection
      setCurrentDate(initialDate);
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(selectedCode - 1);
      setCurrentDate(newDate);
    }
    setSelectedMonth(e.value);


  };

  const handleYearChange = (e) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(e.value.code);
    setCurrentDate(newDate);
  };


  const getCalendarList = async () => {
    try {
        // Retrieve access token from local storage
        let accessToken = getDataFromLocalStorage("access_token");

        if (!accessToken) {
            return;
        }

        const payload = {
            "accessToken": accessToken
        };

        // Fetch calendar list
        const response = await fetchCalendarList(payload);

        if (response.code === '200') {
            let data = response?.data?.data ?? [];

            console.log("Calendar data received:", data);

            // Extract the first calendar ID
            let calendarId = data.items.length > 0 ? data.items[0].id : null;

            console.log("Calendar ID:", calendarId);

            return calendarId;  // Return the first calendar ID

        } else {
            const msg = response?.message ?? response?.error ?? "Something Went Wrong.";
            toast.error(msg);
            return null;  // Return null in case of an error
        }

    } catch (error) {
        const msg = error?.message ?? "Something Went Wrong.";
        toast.error(msg);
        return null;  // Return null in case of an error
    }
};



const getEventList = async () => {
  try {

      // Retrieve access token from local storage
      let accessToken = getDataFromLocalStorage("access_token");

      if (!accessToken) {
          return;
      }

      let user_data = getDataFromLocalStorage("user_data");
      user_data = JSON.parse(user_data);
      const calendarId = user_data?.email
      if (!calendarId) {
        return;
      }

      const payload = {
          "accessToken": accessToken,
          "calendarId": calendarId,  // Use the passed calendarId
          "maxResults": 10
      };

      // Fetch event list
      const response = await fetchEventList(payload);
      //console.log("Event response:", response);
      if (response?.success) {
          let data = response?.data?.data ?? [];

          console.log("Event data received:", data);

          let eventData = response?.data?.data?.items ?? [];
          // Map the response data to the format required by FullCalendar
          let formattedEvents = eventData.map(event => ({
            id: event.id,
            title: event.summary,
            start: event.start.dateTime || event.start.date // Use dateTime if available, otherwise use date
          }));
          setEvents(formattedEvents);


      } else {
          const msg = response?.message ?? response?.error ?? "Something Went Wrong.";
          toast.error(msg);
          return null;  // Return null in case of an error
      }

  } catch (error) {
      const msg = error?.message ?? "Something Went Wrong.";
      toast.error(msg);

      return null;  // Return null in case of an error
  }
};

useEffect(() => {
getEventList();
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(currentDate);
    }
  }, [currentDate]);

  const handleViewChange = (view) => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      //console.log(view,"view")
      calendarApi.changeView(view);
      setActiveView(view); // Update active view
     // calendarRef.current.getApi().today()
      if (view === 'timeGridDay') {
        calendarApi.today();
      }

    }
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentDate(calendarApi.getDate());
      const findMonth = months.find((month) => month.code === calendarApi.getDate().getMonth() + 1)
      setSelectedMonth(findMonth)
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.next();
     // console.log(calendarApi.getDate(),"calendarApi.getDate()")
      setCurrentDate(calendarApi.getDate());
      const findMonth = months.find((month) => month.code === calendarApi.getDate().getMonth() + 1)
      setSelectedMonth(findMonth)
    }
  };

  const handleToday = () => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setCurrentDate(calendarApi.getDate());
      setActiveView(calendarApi.view.type); // Update active view
    }
  };


   // Function to fetch event details by ID
   const fetchEventDetails = async (accessToken, calendarId, eventId,info) => {
    try {
        const payload = {
            accessToken,
            calendarId,
            eventId
        };

        // Call fetchEventById API with event ID
        const response = await fetchEventById(payload);

        if (response?.success) {
            const eventData = response?.data?.data ?? {};
            console.log('Event details:', eventData);
            setSelectedEvent(eventData);
            // Open overlay panel
            overlayPanelRef.current.toggle(info.jsEvent)
        } else {
            const msg = response?.message ?? response?.error ?? 'Something Went Wrong.';
            toast.error(msg);
        }
    } catch (error) {
        const msg = error?.message ?? 'Something Went Wrong.';
        toast.error(msg);
    }
};


  const handleEventClick = (info) => {
    console.log(info,"info--")
   // setSelectedEvent(info.event);
    //overlayPanelRef.current.toggle(info.jsEvent);
    try{
      // Retrieve access token and user data from local storage
      let accessToken = getDataFromLocalStorage("access_token");
      let user_data = getDataFromLocalStorage("user_data");
      user_data = JSON.parse(user_data);
      const calendarId = user_data?.email;
      if (!accessToken || !calendarId) {
          return;
      }
      // Call function to fetch event details
      fetchEventDetails(accessToken, calendarId, info.event.id,info);
  } catch (error) {
      const msg = error?.message ?? 'Something Went Wrong.';
      toast.error(msg);
  }


  };



  const renderEventContent = (eventInfo) => (
    <div className="bg-[#F9FBFD] border border-[#E8EEF7] py-[2px] 3xl:py-[0.313vw] px-[2px] 3xl:px-[0.521vw] cursor-pointer flex items-center gap-2 3xl:gap-[0.417vw] ">
        <div className='text-[#3166B7] text-base w-[25px] h-[25px] flex items-center justify-center bg-[#E8EEF7] rounded-md 3xl:rounded-[0.313vw]'><i className='hexatoolassignment-doc'></i></div>
        <div className=''>
            <div className='text-[#1B55AF] text-xs 3xl:text-[0.625vw] font-semibold leading-[18px] 3xl:leading-[0.938vw]'>Assignment Due</div>
            <div className='text-[#3166B7] w-[92px] xl:w-[105px] lg:w-[100px] 3xl:w-[4.771vw] truncate text-xs 3xl:text-[0.625vw] font-semibold leading-[18px] 3xl:leading-[0.938vw]'>{eventInfo.event.title}</div>
        </div>
      {/* <strong>{eventInfo.timeText}</strong>
      <span>{eventInfo.event.title}</span> */}
    </div>
  );

  const [selectedCity, setSelectedCity] = useState(null);
  const [assignments, setAssignments] = useState(null);
    const Grade = [
        { name: 'All', code: 'NY' },
        { name: '2nd Grade Science', code: 'RM' },
        { name: '2nd Grade Art', code: 'LDN' },
        { name: '2nd Grade Math', code: 'IST' },
        { name: '2nd Grade Reading', code: 'PRS' },
        { name: 'School', code: 'PRS' }
    ];
    const Assignments = [
        { name: 'All', code: 'NY' },
        { name: 'Assignments', code: 'RM' },
        { name: 'Online Class', code: 'LDN' },
        { name: 'Parent/Instructor Meeting', code: 'IST' },
    ];

    const items = [
        { label: "My Calendar"},
      ];
    const home = { label: "Home", url: "/" };

    const [CreateNewEventShow, setCreateNewEventShow] = useState(false);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format


    return (
        <Layout>

            <div className='mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]'>
            <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='text-[#101828] text-[28px] font-semibold leading-[38px] 3xl:text-[1.563vw]'>My Calendar</div>
                    <div className='flex items-center gap-[14px] 3xl:gap-[0.781vw]'>
                        <div>
                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={Grade} optionLabel="name"
                placeholder="2nd Grade Math" checkmark={true} className="w-full md:w-14rem h-[44px] 3xl:h-[2.292vw] text-[#101828] text-sm 3xl:text-[0.833vw] font-normal placeholder:text-[#101828] placeholder:text-sm placeholder:3xl:text-[0.833vw] placeholder:font-normal custm_dropwon" panelClassName='cust_panelDropdown' />
                        </div>
                        <div>
                        <Dropdown value={assignments} onChange={(e) => setAssignments(e.value)} options={Assignments} optionLabel="name"
                placeholder="Assignments" checkmark={true} className="w-full md:w-14rem h-[44px] 3xl:h-[2.292vw] text-[#101828] text-sm 3xl:text-[0.833vw] font-normal placeholder:text-[#101828] placeholder:text-sm placeholder:3xl:text-[0.833vw] placeholder:font-normal custm_dropwon" panelClassName='cust_panelDropdown' />
                        </div>
                        <div><Link href={''} className='text-white text-base 3xl:text-[0.833vw] font-medium leading-6 3xl:leading-[1.25vw] bg-[#1570EF] border border-[#1570EF] rounded-lg h-[44px] 3xl:h-[2.292vw] px-4 3xl:px-[0.938vw] flex items-center justify-center gap-2 3xl:gap-[0.417vw]' onClick={() => { setCreateNewEventShow(true) }}><i className='hexatoolplus'></i><span>Create New Event</span></Link></div>
                    </div>
                </div>

        {/*FullCalendar*/}
        <div className='bg-white border border-[#C8CBD0] rounded-lg px-7 3xl:px-[1.667vw] py-[18px] 3xl:py-[1.042vw] mt-8 3xl:mt-[1.927vw]'>
        <div className="flex items-center justify-between flex-wrap max-lg:gap-y-5">
        {/*Left Side*/}
        <div className='flex items-center gap-4 3xl:gap-[0.833vw]'>
        <div className="flex items-center bg-[#E8EEF7] border border-[#E8EEF7] rounded-md p-1">
            <div className={activeView === 'dayGridMonth' ? 'text-white text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-[#1570EF] rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer' : 'text-[#1570EF] text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-transparent rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer'} onClick={() => handleViewChange('dayGridMonth')}>Month</div>
            <div className={activeView === 'timeGridWeek' ? 'text-white text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-[#1570EF] rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer' : 'text-[#1570EF] text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-transparent rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer'} onClick={() => handleViewChange('timeGridWeek')}>Week</div>
            <div className={activeView === 'timeGridDay' ? 'text-white text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-[#1570EF] rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer' : 'text-[#1570EF] text-sm 3xl:text-[0.729vw] leading-[14px] font-bold bg-transparent rounded py-2.5 px-3 3xl:py-[0.521vw] 3xl:px-[0.677vw] cursor-pointer'} onClick={() => {handleViewChange('timeGridDay'); calendarRef.current.getApi().today()}}>Today</div>
        </div>
        <div className="text-[#101828] text-base 3xl:text-[0.938vw] font-semibold leading-7 3xl:leading-[1.458vw]">
            <h2>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h2>
        </div>
        </div>
        {/*Left Side*/}
        {/*Right Side*/}
        <div className='flex items-center gap-3.5 3xl:gap-[0.781vw]'>
        <div className="flex items-center gap-3.5 3xl:gap-[0.781vw]">

            <Dropdown
            value={years.find((year) => year.code === currentDate.getFullYear())}
            options={years}
            onChange={handleYearChange}
            optionLabel="name"
            placeholder="Select a Year"
            checkmark={true}
            className="w-full md:w-[180px] md:h-[44px] 3xl:h-[2.292vw] custm_dropwon"
            panelClassName='cust_panelDropdown'
            />
             <Dropdown
            value={selectedMonth}
            options={months}
            onChange={handleMonthChange}
            optionLabel="name"
            placeholder="Select a Month"
            checkmark={true}
            className="w-full md:w-[180px] md:h-[44px] 3xl:h-[2.292vw] custm_dropwon"
            panelClassName='cust_panelDropdown'
            />
        </div>
        <div className="flex items-center gap-3.5 3xl:gap-[0.781vw]">
            <div onClick={handlePrev} className='bg-white border border-[#C8CBD0] rounded-md w-[44px] 3xl:w-[2.292vw] h-[44px] 3xl:h-[2.292vw] flex items-center justify-center text-[#98A2B3] text-xl 3xl:text-[1.25vw] cursor-pointer'><i className='hexatoolleft-arrow'></i></div>
            <div onClick={handleNext} className='bg-white border border-[#C8CBD0] rounded-md w-[44px] 3xl:w-[2.292vw] h-[44px] 3xl:h-[2.292vw] flex items-center justify-center text-[#98A2B3] text-xl 3xl:text-[1.25vw] cursor-pointer'><i className='hexatoolright-arrow'></i></div>
            {/* <button onClick={handleToday}>Today</button> */}
        </div>
        </div>
        {/*Right Side*/}

        </div>
        <div className='mt-[18px] 3xl:mt-[0.938vw] Calendar_Ui'>
        <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={false} // Disable default header
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        initialDate={today}


        views={{
          timeGridDay: {
            titleFormat: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'long' },  // Correct format for the dayGridDay view title
            dayHeaderFormat: { weekday: 'long', day: '2-digit' , year: 'numeric', month: 'short',},  // Format the header to show day and date


          }
        }}

        />
        </div>
        </div>
        {/*FullCalendar*/}
            </div>


        <OverlayPanel ref={overlayPanelRef} className='calender_OverlayPanel' style={{width:'600px'}}>
        <div className='bg-white shadow-lg rounded-lg p-5 3xl:p-[1.042vw] space-y-[18px] 3xl:space-y-[1.042vw]'>
        <div className='flex items-center gap-2.5 3xl:gap-[0.521vw]'>
            <div className='text-[#000000] text-lg 3xl:text-[1.042vw] font-medium leading-7 3xl:leading-[1.563vw]'>{selectedEvent?.summary}</div>
            <div className='bg-[#98A2B3] rounded p-1.5 3xl:p-[0.313vw] text-white text-xs 3xl:text-[0.625vw] font-normal leading-[18px] 3xl:leading-[0.938vw]'>20 Points</div>
        </div>
        {/*col*/}
        <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col p-2.5 3xl:p-[0.521vw] gap-2.5 3xl:gap-[0.521vw] bg-[#FFFCF8] border border-[#E8EEF7] rounded-lg'>
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#344054] flex items-center gap-1 3xl:gap-[0.26vw] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                        <i className='hexatoolthumb-circule-fill text-xl 3xl:text-[1.25vw]'></i>
                        <span>Assigned To</span>
                    </div>
                    <div className='bg-[#344054] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>25</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#039855] flex items-center gap-1 3xl:gap-[0.26vw] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                        <i className='hexatoolright-tick-ouline text-xl 3xl:text-[1.25vw]'></i>
                        <span>Submitted</span>
                    </div>
                    <div className='bg-[#039855] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>20</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#D92D20] flex items-center gap-1 3xl:gap-[0.26vw] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                        <i className='hexatoolclose-circule text-xl 3xl:text-[1.25vw]'></i>
                        <span>Not Submitted</span>
                    </div>
                    <div className='bg-[#D92D20] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>5</div>
                </div>
                {/*col*/}
            </div>
            {/*col*/}
            <div className='flex flex-col p-2.5 3xl:p-[0.521vw] gap-2.5 3xl:gap-[0.521vw] bg-[#FFFCF8] border border-[#E8EEF7] rounded-lg'>
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#344054] flex items-center gap-1 3xl:gap-[0.26vw] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                        <span>Submitted Status</span>
                    </div>
                    <div className='bg-[#344054] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white invisible'>25</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#039855] flex items-center gap-1 3xl:gap-[0.26vw] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                        <i className='hexatoolright-tick-ouline text-xl 3xl:text-[1.25vw]'></i>
                        <span>Approved</span>
                    </div>
                    <div className='bg-[#039855] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>15</div>
                </div>
                {/*col*/}
                <div className='bg-[#F9FAFB] border border-[#C8CBD0] rounded-md flex items-center justify-between py-2 3xl:py-[0.417vw] px-2.5 3xl:px-[0.521vw]'>
                    <div className='text-[#DC6803] flex items-center gap-1 3xl:gap-[0.26vw] text-sm font-medium leading-6 3xl:text-[0.729vw] 3xl:leading-[1.25vw]'>
                        <i className='hexatoolclose-circule text-xl 3xl:text-[1.25vw]'></i>
                        <span>Waiting Approval</span>
                    </div>
                    <div className='bg-[#DC6803] rounded p-2 3xl:p-[0.417vw] w-[34px] 3xl:w-[1.875vw] h-[34px] 3xl:h-[1.875vw] flex items-center justify-center text-white'>5</div>
                </div>
                {/*col*/}
            </div>
        </div>
        {/*col*/}
        <div className='3xl:pt-[] pt-5 border-t border-[#E4E7EC]'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 3xl:gap-[1.042vw]'>
                    <div className='text-[#344054] text-sm font-normal leading-6 3xl:text-[0.833vw] 3xl:leading-[1.25vw]'><p>Group: <span className='text-[#667085]'>Numbers</span></p></div>
                    <div className='text-[#344054] text-sm font-normal leading-6 3xl:text-[0.833vw] 3xl:leading-[1.25vw]'><p>Folder: <span className='text-[#667085]'>Activities</span></p></div>
                </div>
                <div><Link href={selectedEvent?.htmlLink}  target="_blank" rel="noopener noreferrer"  className='text-[#1B55AF] text-sm 3xl:text-[0.833vw] font-medium leading-5 3xl:leading-[1.25vw] border border-[#1B55AF] py-2.5 3xl:py-[0.521vw] px-4 3xl:px-[0.938vw] rounded-lg 3xl:rounded-[0.417vw]'>View Details</Link></div>
            </div>
        </div>
        </div>
        </OverlayPanel>

        <CreateNewEvent
        visible={CreateNewEventShow}
        onHide={() => { setCreateNewEventShow(false) }}
        getEventList={()=> {getEventList()}}
      />
        </Layout>
    )
}
