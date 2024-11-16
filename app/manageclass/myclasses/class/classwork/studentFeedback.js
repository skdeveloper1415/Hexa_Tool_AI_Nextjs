"use client";
import React, { useState, useRef } from 'react'
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
import { toast } from 'react-toastify';
import { GRADE, AppTitle, AppDesc } from "../../../../../components/helper/enum";
import { generateStudentWorkFeedbackAPI } from "../../../../actions/studentWorkFeedback";
import CommonAction from "../../../../../components/commonAction";
import Commonresponse from "../../../../common/commonResponse";

export default function StudentFeedback(props) {
  

    const [grade, setGrade] = useState({})
    const [error, setError] = useState({})
    const [assignment, setAssignment] = useState('')
    const [category, setCategory] = useState('')
    const [studFeedback, setStudFeedback] = useState('')
    const [loading, setLoading] = useState(false)
    const [formDataShow, setFormDataShow] = useState(false)
    const [formShow, setFormShow] = useState(true);
    const [studFeedbackData, setStudFeedbackData] = useState([])
    const [visibleRubricTable, setVisibleRubricTable] = useState(false);
    const [isStudentFeedback, setIsStudentFeedback] = useState(false)

    const onhide = () => {
      setVisibleRubricTable(false);
      props.setVisible(false)
      };
      const renderContent = (key, value) => {
        if (typeof value === 'string') {
          return (
            <div key={key}>
              <h3 className="font-bold">{key} : {value}</h3>
              
            </div>
          );
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          // Render object data with subcategories
          return (
            <div key={key}>
              <h3 className="font-bold">{key}</h3>
              {Object.entries(value).map(([subKey, subValue]) => (
                <p key={subKey}>
                  <strong>{subKey}: </strong>
                  {subValue}
                </p>
              ))}
            </div>
          );
        } else if (Array.isArray(value)) {
          // Render array data as list items
          return (
            <div key={key}>
              <h3 className="font-bold">{key}</h3>
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }
        return null; // Default return
      };
      const contentRef = useRef(null);
      const responseForPopup = studFeedbackData && (
        <div>
          <div ref={contentRef}>
          { Object.entries(studFeedbackData).map(([key, value]) => renderContent(key, value))}
          </div>
        </div>
      );

      
 
    const validate = () => {
      let err = {}
      let isErr = false;
      
      if (!grade.code) {
        err.grade = 'Please Select Grade Level.'
        isErr = true
      }
      if(!assignment || assignment.trim()==='') {
        err.assignment = 'Please Enter Assignment Description.'
      }
      if(!studFeedback || studFeedback.trim() === '') {
        err.studFeedback = 'Please Enter Student Work To Give Feedback On.'
      }
      if(!category || category.trim() === '') {
        err.category = 'Please Enter Focus of Feedback/Rubric Categories.'
      }
      setError(err)
      return isErr
    }

    const handleCancel = () => {
        props.setVisible(false);
        setError({})
      };

      const handleGenerate = async () =>{
        try {
            if (validate()) {
                return
            }
            setLoading(true)
            const payload = {
              grade: grade.name,
              description: assignment,
              focus_feedback: category,
              student_work_feedback: studFeedback,
            };
            const response = await generateStudentWorkFeedbackAPI(payload);
            
            if (response.data.code === 200) {
              let responseData = response.data.data.data ?? [];
              setStudFeedbackData(responseData)
              setGrade({});
              setAssignment('');
              setCategory('');
              setStudFeedback('');
              setLoading(false)
              setFormDataShow(true)
              setFormShow(false)
              setIsStudentFeedback(true)
            } else {
              const message =
                response?.message ?? response?.error ?? "Something went wrong";
              toast.error("Something went wrong");
              
              setLoading(false);
            }
          } catch (error) {
              const message = error?.message ?? "Something went wrong";
              setLoading(false)
              
        
          }
      }
     
  return (
    <div>
        <Dialog
        className="custom-popup"
        visible={props.visible}
        style={{ width: "45vw" }}
        onHide={handleCancel}
      >
          {formShow && (
              <div className="p-[15px] xl:p-[15px] 2xl:p-[0.781vw]">
                  <div>
                      <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#101828] font-medium">
                          {AppTitle.studentworkfeedback} 
                      </h3>
                      <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.aiStudentworkfeedback} </p>                
                  </div>
                  <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                          Grade Level :<span className="text-[red]">*</span>
                      </label>
                      <div className="flex gap-[8px]">
                          <Dropdown
                              value={
                                  grade
                              }
                              onChange={(e) =>
                                  setGrade(e.target.value,
                                  )
                              }
                              filter
                              options={GRADE}
                              optionLabel="name"
                              placeholder="Select"
                              className="w-full md:w-14rem"
                          />
                      </div>
                      {error.grade ? <span style={{ color: 'red' }}>{error.grade}</span> : <></>}
                  </div>
                  <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                         Assignment Description :<span className="text-[red]">*</span>
                      </label>
                      <div className="flex gap-[8px]">
                      <InputTextarea placeholder='Type...' value={assignment} onChange={(e) => setAssignment(e.target.value)} rows={3} cols={55} />
                      </div>
                      {error.assignment ? <span style={{ color: 'red' }}>{error.assignment}</span> : <></>}
                  </div>
                  <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Focus of Feedback/Rubric Categories:<span className="text-[red]">*</span>
                      </label>
                      <div className="flex gap-[8px]">
                      <InputTextarea placeholder='Type...' value={category} onChange={(e) => setCategory(e.target.value)} rows={3} cols={55} />
                      </div>
                      {error.category ? <span style={{ color: 'red' }}>{error.category}</span> : <></>}
                  </div>
                  <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Student Work to Give Feedback On :<span className="text-[red]">*</span>
                      </label>
                      <div className="flex gap-[8px]">
                      <InputTextarea placeholder='Type...' value={studFeedback} onChange={(e) => setStudFeedback(e.target.value)} rows={3} cols={55} />
                      </div>
                      {error.studFeedback ? <span style={{ color: 'red' }}>{error.studFeedback}</span> : <></>}

                  </div>
                  <div>
                    <button
                      className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      onClick={(e) => {
                        handleGenerate(e);
                      }}
                    >
                      {
                        loading ? "Please Wait..." : "Generate with BrixAI"
                      }
                    </button>
                  </div>
              </div>)}

              {formDataShow && (
        <>
          <Commonresponse
            title= 'Generated Student Work feedback'
            onHide={() => {
              setFormDataShow(false);
              setFormShow(true);
            }}
            handleAction={() => {
              setVisibleRubricTable(true);
            }}
            response={responseForPopup}
            contentRef={contentRef}
            appLink={"/aiapps/studentworkfeedback"}
          />
        </>
      )}
      {visibleRubricTable && (
        <CommonAction
        title= 'Generated Student Work feedback'
          response={responseForPopup}
          visible={visibleRubricTable}
          contentRef={contentRef}
          setVisible={setVisibleRubricTable}
          appLink={"/aiapps/studentworkfeedback"}
          setDataEditor={props.setContent}
          isStudentFeedback={isStudentFeedback}
          setIsStudentFeedback={setIsStudentFeedback}
          onHide={() => {
            setFormDataShow(false);
            setFormShow(false);
            onhide()
            setVisibleRubricTable(false);
            setIsStudentFeedback(false);
          }}
        />
      )}
        
          </Dialog>
      </div>
  )
}
