"use client"
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";

export default function Autogradingpopup2({ onhide, visible, setVisible }) {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [topic, setTopic] = useState("");
    const [criteria, setCriteria] = useState("");
    const [className, SetClassName] = useState('');
    const [show, setShow] = useState(false);

    const GRADE = [
        { name: 'Pre K', code: '1' },
        { name: 'Kindergarten', code: '2' },
        { name: 'Grade 1', code: '3' },
        { name: 'Grade 2', code: '4' },
        { name: 'Grade 3', code: '5' },
        { name: 'Grade 4', code: '6' },
        { name: 'Grade 5', code: '7' },
        { name: 'Grade 6', code: '8' },
        { name: 'Grade 7', code: '9' },
        { name: 'Grade 8', code: '10' },
        { name: 'Grade 9', code: '11' },
        { name: 'Grade 10', code: '12' },
        { name: 'Grade 11', code: '13' },
        { name: 'Grade 12', code: '14' },
        { name: 'University', code: '15' },
        { name: 'Year 1', code: '16' },
        { name: 'Year 2', code: '17' },
        { name: 'Year 3', code: '18' },
        { name: 'Year 4', code: '19' },
        { name: 'Year 5', code: '20' },
        { name: 'Year 6', code: '21' },
        { name: 'Year 7', code: '22' },
        { name: 'Year 8', code: '23' },
        { name: 'Year 9', code: '24' },
        { name: 'Year 10', code: '25' },
        { name: 'Year 12', code: '26' },
        { name: 'Year 13', code: '27' },
    ];

    return (
        <div>
            <Dialog className="customHeader customm w-[800px]  " header=" " visible={visible} style={{ width: '50vw' }} onHide={onhide}>
                <div className="p-[24px] 3xl:p-[1.25vw]  ">
                    <div className="flex flex-col">
                        <div className="gap-8 xl:gap-7 3xl:gap-[1.667vw] border-b border-b-[#C8CBD0]">
                            <div className="text-[#101828] text-[18px] 3xl:text-[0.938vw] font-medium pb-[5px] 3xl:pb-[0.26vw]">Grading</div>
                            <div>
                                <p className="3xl:text-[0.625vw] font-normal text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                                    Based on the custom criteria, Al give grading for the student responses
                                </p>
                            </div>
                        </div>

                        <div className="grid xl:gap-[1.25vw] gap-[18px] pt-[16px] 3xl:pt-[0.833vw]">
                            <div className="grid grid-cols-2 border border-[#E4E7EC] rounded-lg">
                                <div className="border-r border-r-[#E4E7EC] p-[16px] 3xl:pt-[0.833vw] gap-4">
                                    <div className="font-semibold text-[#101828] text-[14px] 3xl:text-[0.729vw]">Question 1: <span className="font-normal text-[14px] 3xl:text-[0.729vw]">What is the numeral for the number one?</span></div>
                                    <div>
                                        <div className="font-semibold text-[#101828] text-[14px] 3xl:text-[0.729vw]">A: <span className="font-normal text-[14px] 3xl:text-[0.729vw]">2</span></div>
                                        <div className="font-semibold text-[#101828] text-[14px] 3xl:text-[0.729vw]">B: <span className="font-normal text-[14px] 3xl:text-[0.729vw]">1</span></div>
                                        <div className="font-semibold text-[#101828] text-[14px] 3xl:text-[0.729vw]">C: <span className="font-normal text-[14px] 3xl:text-[0.729vw]">3</span></div>
                                        <div className="font-semibold text-[#101828] text-[14px] 3xl:text-[0.729vw]">D: <span className="font-normal text-[14px] 3xl:text-[0.729vw]">4</span></div>
                                        <div className="font-semibold text-[#101828] text-[14px] 3xl:text-[0.729vw]">Answer: <span className="font-normal text-[14px] 3xl:text-[0.729vw]">B</span></div>
                                    </div>
                                </div>

                                <div className="p-[16px] 3xl:pt-[0.833vw] gap-8 xl:gap-7 3xl:gap-[1.667vw]">
                                    <div className="grid grid-cols-12 custgrid1">
                                        <div className="col-span-3 text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium">Max points</div>
                                        <div className="col-span-9">
                                            <div className="card flex justify-content-center  ">
                                                <InputText className="w-full rounded-lg"
                                                    placeholder="2" value={className}
                                                    onChange={(e) => SetClassName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 custgrid pt-[10px] 3xl:pt-[0.521vw]">
                                        <div className="col-span-3 text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium pr-3px">Correct Answers</div>
                                        <div className="col-span-5">
                                            <div className="card flex justify-content-center  ">
                                                <Dropdown
                                                    value={selectedGrade}
                                                    onChange={(e) => setSelectedGrade(e.value)}
                                                    options={GRADE}
                                                    optionLabel="name"
                                                    placeholder="B"
                                                    filter
                                                    className="w-full md:w-14rem 3xl:text-[0.833vw] text-[16px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <div className="card flex justify-content-center  ">
                                                <InputText className="w-full"
                                                    placeholder="2" value={className}
                                                    onChange={(e) => SetClassName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 custgrid pt-[10px] 3xl:pt-[0.521vw]">
                                        <div className="col-span-3 text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium pr-3px">Wrong Answerss</div>
                                        <div className="col-span-5">
                                            <div className="card flex justify-content-center  ">
                                                <Dropdown
                                                    value={selectedGrade}
                                                    onChange={(e) => setSelectedGrade(e.value)}
                                                    options={GRADE}
                                                    optionLabel="name"
                                                    placeholder="--"
                                                    filter
                                                    className="w-full md:w-14rem 3xl:text-[0.833vw] text-[16px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <div className="card flex justify-content-center  ">
                                                <InputText className="w-full "
                                                    placeholder="-1" value={className}
                                                    onChange={(e) => SetClassName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="">
                                {show==false?(<div>
                                    <button onClick={(e) => setShow(true)}
                                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full disabled:opacity-40"
                                    >
                                        Generate with BrixAI
                                    </button>
                                </div>):(
                                    null
                                )}
                                
                                {show ? (
                                    <div className="grid grid-cols-2 gap-[15px] 3xl:gap-[0.781vw]">
                                        <div>
                                            <button onClick={(e) => setVisible(false)}
                                                className="text-[#1B55AF] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] font-medium bg-white border border-[#1B55AF] box-shadow02 rounded-lg 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full flex items-center gap-2 3xl:gap-[0.417vw]">
                                                Submit
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={(e) => setVisible(false)}
                                                className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full disabled:opacity-40"
                                            >
                                                Submit All
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>


                        </div>

                    </div>
                </div>
            </Dialog>
        </div>
    )
}

