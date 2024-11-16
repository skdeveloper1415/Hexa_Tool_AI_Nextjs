"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from "primereact/inputtextarea";
import { ScrollPanel } from 'primereact/scrollpanel';
import { getDataFromLocalStorage } from '../../helper/commonFunction';
import { toast } from 'react-toastify';
import { creatEventApi, createEventApi } from '../../../app/actions/Mycalendar';

const CreateNewEvent = ({ visible, onHide,getEventList }) => {
    const [value, setValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');

    const Type = [
        { name: 'All', code: 'NY' },
        { name: 'Assignments', code: 'RM' },
        { name: 'Online Class', code: 'LDN' },
        { name: 'Parent/Instructor Meeting', code: 'IST' },
    ];
    const typeclass = [
        { name: 'All', code: 'NY' },
        { name: '2nd Grade Science', code: 'RM' },
        { name: '2nd Grade Art', code: 'LDN' },
        { name: '2nd Grade Math', code: 'IST' },
        { name: '2nd Grade Reading', code: 'IST' },
        { name: 'School', code: 'IST' },
    ];

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState('');

        // Date and Time Validation
        useEffect(() => {
            if (startDate && endDate && startTime && endTime) {
                // Combine startDate and startTime to get startDateTime
                const startDateTime = new Date(startDate);
                startDateTime.setHours(startTime.getHours());
                startDateTime.setMinutes(startTime.getMinutes());
    
                // Combine endDate and endTime to get endDateTime
                const endDateTime = new Date(endDate);
                endDateTime.setHours(endTime.getHours());
                endDateTime.setMinutes(endTime.getMinutes());
    
                // Check if the end date-time is before or the same as start date-time
                if (startDateTime >= endDateTime) {
                    if (startDate.getTime() === endDate.getTime() && startTime.getTime() >= endTime.getTime()) {
                        toast.error('End time must be after start time');
                        setEndTime(null);
                    } else {
                        toast.error('End date and end time must be after start date and start time');
                        setEndDate(null);
                        setEndTime(null);
                    }
                } else {
                    //setErrors('');
                }
            }else if(startDate && endDate){
                if (startDate > endDate) {
                    toast.error('End date and end time must be after start date and start time');
                    setEndDate(null);
                }

            }
        }, [startTime, endTime, startDate, endDate]);
    



   const  validate = () => {
        let err = {};
        let hasErr = false;

        if (!title) {
            err.title = "Title is required";
            hasErr = true;
        }
        if (!selectedType) {
            err.selectedType = "Type is required";
            hasErr = true;
        }
        if (!selectedClass) {
            err.selectedClass = "Class is required";
            hasErr = true;
        }
        if (!startDate) {
            err.startDate = "Date is required";
            hasErr = true;
        }
        if (!endDate) {
            err.endDate = "Due Date is required";
            hasErr = true;
        }
        if (!startTime) {
            err.startTime = "Start Time is required";
            hasErr = true;
        }
        if (!endTime) {
            err.endTime = "End Time is required";
            hasErr = true;
        }
        if (!value) {
            err.description = "Description is required";
            hasErr = true;
        }

        setErrors(err);
        return hasErr;
    };


    const handleCreateEvent = async () => {
        if(validate()){
            return
        }

        if (!title || !selectedType || !selectedClass || !startDate  || !endDate  || !startTime || !endTime) {
           // toast.error('Please fill in all required fields.');
           // return;
        }
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




      const startDateTime = new Date(startDate);
      startDateTime.setHours(startTime?.getHours());
      startDateTime.setMinutes(startTime?.getMinutes());

      const endDateTime = new Date(endDate);
      endDateTime.setHours(endTime?.getHours());
      endDateTime.setMinutes(endTime?.getMinutes());


      try {
        const payload = {
            accessToken: accessToken,
            calendarId: calendarId,
            summary: title,
            description: value,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            // extendedProperties: {
            //     private: {
            //         type: selectedType?.name,  // Add selectedType to extendedProperties
            //         class: selectedClass?.name,  // Add selectedClass to extendedProperties
            //     }
            // },    

            // attachments: [
            //     {
            //         fileUrl: "https://static.cricbuzz.com/a/img/v1/300x170/i1/c391999/rcb-have-had-a-topsy-turvy-rid.jpg",
            //         title: "Project Plan.jpg"
            //     }
            // ]
        };
		
		//console.log(payload,"payload--")
         
        // Call fetchEventById API with event ID
        const response = await createEventApi(payload);

        if (response?.success) {
            const eventData = response?.data?.data ?? {};
            console.log('Event:', eventData);

            toast.success("Event Created Successfully!");
            getEventList()
            handleClose()
             
        } else {
            const msg = response?.message ?? response?.error ?? 'Something Went Wrong.';
            toast.error(msg);
            handleClose()
        }
    } catch (error) {
        const msg = error?.message ?? 'Something Went Wrong.';
        toast.error(msg);
    }
	
	
	}


    const handleClose = () => {
        setTitle('');
        setSelectedType(null);
        setSelectedClass(null);
        setStartDate('');
        setEndDate('');
        setStartTime(null);
        setEndTime(null);
        setValue('');
        setErrors('');
        onHide();
    };


    const customHeader = () => (
        <div className="p-d-flex p-jc-between p-ai-center p-p-2">
          <span className="p-calendar-label">Select Time</span>
        </div>
      );
    return (
        <div>
            <Dialog showHeader={false} className="createNewevent" visible={visible} style={{ width: '40vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} onHide={handleClose} blockScroll={true}>
                <div className="3xl:p-[2.083vw] p-8 flex flex-col justify-between gap-6 3xl:gap-[1.667vw]">
                <div className="text-[#101828] text-lg font-medium leading-7 3xl:text-[0.938vw] 3xl:leading-[1.458vw]">Create New Event</div>
                {/*col*/}
                <ScrollPanel style={{ width: '100%', height: 'clamp(300px, 26.042vw, 900px)' }}>
                <div className="grid grid-cols-2 gap-y-[18px] 3xl:gap-y-[1.042vw] gap-x-2 3xl:gap-x-[0.521vw]">
                    <div className="col-span-2">
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">Title<span className="text-red-500">*</span></label>
                    <InputText id="username" aria-describedby="username-help" placeholder="Type here" className='custm_InputText'  onChange={(e)=> setTitle(e.target.value)} />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                    
                    </div>
                    </div>
                    {/*col 2*/}
                    <div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">Type<span className="text-red-500">*</span></label>
                    <Dropdown value={selectedType} checkmark={true} onChange={(e) => setSelectedType(e.value)} options={Type} optionLabel="name"
                placeholder="Select here" className="w-full" panelClassName='cust_panelDropdown' />
                    {errors.selectedType && <span className="text-red-500 text-sm">{errors.selectedType}</span>}
                    
                    </div>
                    </div>
                    {/*col*/}
                    <div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">Class<span className="text-red-500">*</span></label>
                    <Dropdown value={selectedClass} checkmark={true} onChange={(e) => setSelectedClass(e.value)} options={typeclass} optionLabel="name"
                placeholder="Select here" className="w-full" panelClassName='cust_panelDropdown' />
                    {errors.selectedClass && <span className="text-red-500 text-sm">{errors.selectedClass}</span>}
                    
                    </div>
                    </div>
                    {/*col*/}
                    <div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">Date<span className="text-red-500">*</span></label>
                    <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} className='custm_InputText' placeholder='Select here' />
                    {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate}</span>}
                    
                    </div>
                    </div>
                    {/*col*/}
                    <div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">Due Date<span className="text-red-500">*</span></label>
                    <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} className='custm_InputText' placeholder='Select here' />
                    {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate}</span>}
                    
                    </div>
                    </div>
                    {/*col*/}
                    <div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">Start Time<span className="text-red-500">*</span></label>
                    <Calendar
                    id="startTime"
                    placeholder='Select here'
                    value={startTime}
                    onChange={(e) => setStartTime(e.value)}
                    timeOnly
                    showTime
                    hourFormat="12"
                    className='custm_InputText'
                    panelClassName='cust_panel_cal'
                    headerTemplate={customHeader}
                    />
                    {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime}</span>}
                    
                    </div>
                    </div>
                    {/*col*/}
                    <div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">End Time<span className="text-red-500">*</span></label>
                    <Calendar
                    id="endTime"
                    placeholder='Select here'
                    value={endTime}
                    onChange={(e) => setEndTime(e.value)}
                    timeOnly
                    showTime
                    hourFormat="12"
                    className='custm_InputText'
                    panelClassName='cust_panel_cal'
                    />
                    {errors.endTime && <span className="text-red-500 text-sm">{errors.endTime}</span>}
                    
                    </div>
                    </div>
                    {/*col*/}
                    <div className='col-span-2'>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#344054] text-sm font-medium leading-5 3xl:text-[0.729vw] 3xl:leading-[1.042vw]">Description<span className="text-red-500">*</span></label>
                    <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} placeholder='Enter a description...' className='custm_InputTextarea' />
                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                    
                    </div>
                    </div>
                    {/*col 2*/}
                </div>
                </ScrollPanel>
                {/*col*/}
                <div className='flex justify-end gap-3 3xl:gap-[0.625vw]'>
                <Link href={''} className='text-[#344054] text-sm font-medium leading-6 3xl:text-[0.833vw] 3xl:leading-[1.25vw] bg-white border border-[#C6CBD2] rounded-lg shadowxs py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw]' onClick={handleClose}>Cancel</Link>
                <Link href={''} className='text-[#FFFFFF] text-sm font-medium leading-6 3xl:text-[0.833vw] 3xl:leading-[1.25vw] bg-[#1570EF] border border-[#1570EF] rounded-lg shadowxs py-2.5 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw]'  onClick={handleCreateEvent }>Create</Link>
                </div>
                </div>
            </Dialog>
        </div>
    );
};

export default CreateNewEvent;
