"use client"
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import Assignmentsuccessfully from "./assignmentsuccessfully";


function AssignAndSend({ onhide, visible, }) {

    const [assignAndSendShow, setAssignAndSendShow] = useState();

    const [chooseClass, setChooseClass] = useState(null);
    const ChooseClassdData = [
        { name: 'Class 1', code: 'NY' },
        { name: 'Class 2', code: 'RM' },
        { name: 'Class 3', code: 'LDN' },
        { name: 'Class 4', code: 'IST' },
        { name: 'Class 5', code: 'PRS' }
    ];
    const [date, setDate] = useState('');
    const [checked, setChecked] = useState(false);
    return (
        <div>
            <Dialog
                className="custom-popup w-full mx-2 lg:w-[800px] 3xl::w-[52.083vw]"
                visible={visible}
                onHide={onhide}
            >
                <div>
                    <div className="text-[#101828] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] font-semibold border-b border-b-[#C8CBD0] pb-[32px] xl:pb-[30px] 3xl:pb-[1.667vw] pt-[16px] xl:pt-[14px] 3xl:pt-[0.625vw]">
                        Assign and Send
                    </div>
                    <div className="pt-[22px] xl:pt-[20px] 3xl:pt-[0.8vw] h-[400px] overflow-auto">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]">
                            <div>
                                <label className="text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.729vw] font-medium">Choose Class</label>
                                <div className='customDropdown mt-[6px] xl:mt-[4px] 3xl:mt-[0.313vw]'>
                                    <Dropdown
                                        value={chooseClass}
                                        onChange={(e) => setChooseClass(e.target.value)}
                                        filter
                                        options={ChooseClassdData}
                                        optionLabel="name"
                                        placeholder="Select here"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.729vw] font-medium">Choose Students</label>
                                <div className='customDropdown mt-[6px] xl:mt-[4px] 3xl:mt-[0.313vw]'>
                                    <Dropdown
                                        value={chooseClass}
                                        onChange={(e) => setChooseClass(e.target.value)}
                                        filter
                                        options={ChooseClassdData}
                                        optionLabel="name"
                                        placeholder="Select here"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.729vw] font-medium">Choose Folder</label>
                                <div className='customDropdown mt-[6px] xl:mt-[4px] 3xl:mt-[0.313vw]'>
                                    <Dropdown
                                        value={chooseClass}
                                        onChange={(e) => setChooseClass(e.target.value)}
                                        filter
                                        options={ChooseClassdData}
                                        optionLabel="name"
                                        placeholder="Select here"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.729vw] font-medium">Choose Group</label>
                                <div className='customDropdown mt-[6px] xl:mt-[4px] 3xl:mt-[0.313vw]'>
                                    <Dropdown
                                        value={chooseClass}
                                        onChange={(e) => setChooseClass(e.target.value)}
                                        filter
                                        options={ChooseClassdData}
                                        optionLabel="name"
                                        placeholder="Select here"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw] mt-[20px] xl:mt-[15px] 3xl:mt-[1.042vw]">
                            <div className="col-span-5">
                                <label className="text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.729vw] font-medium">Due Date</label>
                                <div className="customCalendar">
                                    <Calendar
                                        value={date}
                                        onChange={(e) => setDate(e.value)}
                                        placeholder="Select Date"
                                        showIcon
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2 ">
                                <div className="flex items-center gap-2 pt-10">
                                    <Checkbox
                                        onChange={e => setChecked(e.checked)}
                                        checked={checked}
                                        className="customCheckBox"
                                    />
                                    <label className="text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.729vw] font-medium">Immediately</label>
                                </div>

                            </div>
                            <div className="col-span-5">
                                <div className="flex gap-2 ">
                                    <Checkbox
                                        onChange={e => setChecked(e.checked)}
                                        checked={checked}
                                        className="customCheckBox pt-10"
                                    />
                                    <div className="w-full">
                                        <label className="text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.729vw] font-medium">Schedule Date</label>
                                        <div className="customCalendar">
                                            <Calendar
                                                value={date}
                                                onChange={(e) => setDate(e.value)}
                                                placeholder="Select Date"
                                                showIcon
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='flex justify-center items-center 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#344054] font-medium border border-[#C6CBD2] bg-[#ff] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] mt-[32px] xl:mt-[30px] 3xl:mt-[1.667vw]'>
                            <i className='hexatoolplus mr-[8px]'></i>
                            Add Field
                        </button>
                    </div>
                    <div className="flex justify-end items-center gap-[10px] xl:gap-[8px] 3xl:gap-[0.521vw]">
                        <button onClick={onhide} className='3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#344054] font-medium border border-[#C6CBD2] bg-[#ff] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw]'>
                            Cancel
                        </button>
                        <button onClick={() => setAssignAndSendShow(true)} className=' 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] '>
                            Assign & Send 
                        </button>
                    </div>
                </div>
            </Dialog>
            <Assignmentsuccessfully
             visible={assignAndSendShow}
             onhide={() => setAssignAndSendShow(false)}
            
            />
        </div>
    )
}

export default AssignAndSend
