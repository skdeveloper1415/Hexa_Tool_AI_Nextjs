"use client"
import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import Autogradingpopup2 from "./autogradingpopup2";
import { GRADE } from "../helper/enum";

export default function Autogradingpopup1({ onhide, visible, setVisible }) {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [assignment, setAssignment] = useState("");
    const [feedback, setFeedback] = useState("");
    const [autograding2, setAutograding2] = useState(false);
  const [error, setError] = useState({});

    const validate = () => {
        let err = {};
        let isErr = false;
        if (!selectedGrade || selectedGrade.name.trim() === "") {
          err.selectedGrade = "Please Select Grade Level.";
          isErr = true;
        }
        if (!assignment || assignment.trim() === "") {
          err.assignment = "Please Enter Assignment Description.";
          isErr = true;
        }
        if (!feedback || feedback.trim() === "") {
            err.feedback = "Please Enter Focus of Feedback/Rubric Categories.";
            isErr = true;
          }
        setError(err);
        return isErr;
      };

    const handleNext=(e)=>{
         e.preventDefault()
         if (validate()) {
            return;
          }
        setAutograding2(true)
        setVisible(false)
        setError({})
    }
    
    return (
        <div>
            <Dialog className="custom-popup w-[800px]  " header=" " visible={visible} style={{ width: '50vw' }} onHide={onhide}>
                <div className="p-[24px] 3xl:p-[1.25vw]  ">
                    <div className="flex flex-col">
                        <div className="gap-10">
                            <div className="text-[#101828] text-[18px] 3xl:text-[0.938vw] font-medium">Grading</div>
                            <div>
                                <p className="3xl:text-[0.625vw] font-normal text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                                    Based on the custom criteria, Al give grading for the student responses
                                </p>
                            </div>
                        </div>

                        <div className="grid xl:gap-[1.25vw] gap-[18px]">
                            <div>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                    Grade Level:<span className="text-[red]">*</span>
                                </label>
                                <Dropdown
                                    value={selectedGrade}
                                    onChange={(e) => {setSelectedGrade(e.value),
                                        setError((prevError) => ({
                                          ...prevError,
                                          selectedGrade: "", 
                                        }));}}
                                    options={GRADE}
                                    optionLabel="name"
                                    placeholder="Select"
                                    filter
                                    className="w-full md:w-14rem 3xl:text-[0.833vw] text-[16px]"
                                />
                                {error.selectedGrade ? (
                        <span style={{ color: "red" }}>{error.selectedGrade}</span>
                      ) : (
                        <></>
                      )}
                            </div>
                            <div>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                    Assignment Description:<span className="text-[red]">*</span>
                                </label>
                                <InputTextarea
                                    autoResize
                                    placeholder=""
                                    value={assignment}
                                    onChange={(e) => {setAssignment(e.target.value),
                                        setError((prevError) => ({
                                          ...prevError,
                                          assignment: "", 
                                        }));}}
                                    rows={3}
                                    className="w-full 3xl:text-[0.833vw] text-[16px]"
                                />
                                {error.assignment ? (
                        <span style={{ color: "red" }}>{error.assignment}</span>
                      ) : (
                        <></>
                      )}
                            </div>
                            <div>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                    Focus of Feedback/Rubric Categories:<span className="text-[red]">*</span>
                                </label>
                                <InputTextarea
                                    autoResize
                                    placeholder="Rubric of Assignment...."
                                    value={feedback}
                                    onChange={(e) => {setFeedback(e.target.value),
                                        setError((prevError) => ({
                                          ...prevError,
                                          feedback: "", 
                                        }));}}
                                    rows={3}
                                    className="w-full 3xl:text-[0.833vw] text-[16px] "
                                />
                                {error.feedback ? (
                        <span style={{ color: "red" }}>{error.feedback}</span>
                      ) : (
                        <></>
                      )}
                            </div>
                            <div>
                                <button onClick={ (e)=>                                   handleNext(e)                                }
                                    className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </Dialog>
            <Autogradingpopup2
                visible={autograding2}
                setVisible={setAutograding2}
                onhide={() => setAutograding2(false)}
            />
        </div>
    )
}

