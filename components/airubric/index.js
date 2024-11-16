"use client";
import React, { useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import { generateRubricAPI } from "../../app/actions/rubricGenerateApi";
import CommonAction from "../commonAction";
import Commonresponse from "../../app/common/commonResponse";
import { GRADE, QUESTIONS, AppId, AppTitle, AppDesc, } from "../helper/enum";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Image } from "primereact/image";
import { cancelPendingRequests } from "../../app/actions";

export default function AIRubric({ Visible, onhide, setInstruction, isActionVisible }) {

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [standardValue, setStandardValue] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDesc, setAssignmentDesc] = useState("");
  const [selectedPointScale, setSelectedPointScale] = useState(null);
  const [addCustomizationValue, setAddCustomizationValue] = useState("");
  const [isExVisible, setIsExVisible] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visibleRubricTable, setVisibleRubricTable] = useState(false);
  const [columns, setColumns] = useState([]);
  const [generatedRubricData, setGeneratedRubricData] = useState([]);
  const [generatedData, setGeneratedHeaderData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  const validate = () => {
    let err = {};
    let isErr = false;
    if (gradeLevel === null || gradeLevel.name.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (assignmentTitle === "" || assignmentTitle.trim() === "") {
      err.assignmentTitle = "Please Enter  Assignment Title.";
      isErr = true;
    }
    if (assignmentDesc === "" || assignmentDesc.trim() === "") {
      err.assignmentDesc = "Please Enter  Assignment Description.";
      isErr = true;
    }
    if (selectedPointScale === null || selectedPointScale.name.trim() === "") {
      err.selectedPointScale = "Please Select Point Scale.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };
  const handleGenerateRubric = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }

    if (standardValue === "" || standardValue.trim() === "") {
      toast.error('Please Enter Standard/Objective.')
      return;
    }

    setLoading(true);
    setShowExemplarButton(false);
    try {
      const payload = {
        grade: gradeLevel?.code,
        title: assignmentTitle,
        description: assignmentDesc,
        scale: selectedPointScale?.name,
        objective: standardValue
      };
      const response = await generateRubricAPI(payload);

      if (response.data.code == "200") {

        let responseData = response.data.data.data ;
        let rows = response.data?.data?.data?.result.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split('|').filter(cell => cell.trim() !== '').slice(0,25)
        rows=rows.filter((ele, index)=>index!=1)
        console.log('rows', rows)
        const bodyRows = [];
        for (let i = 1; i < rows?.length; i++) {
          const row = rows[i].split('|').filter(cell => cell.trim() !== '');
          const cells = row.map((cell, index) => (
            // <td key={index}>{cell.trim()}</td>
            <td key={index} data-row={`row-${i % 2 == 0 ?'9jmd': 'gh33'}`} style={{ border: '1px solid #FFD8B2', wordWrap:' break-word', padding: '24px',backgroundColor:index==0 ? '#FFFCF8':'#ffffff' }}><br />{cell.trim()}</td>
          ));
          bodyRows.push(<tr key={i}>{cells}</tr>);
        }
        setGeneratedHeaderData(headers)
        setGeneratedRubricData(bodyRows)
        // setGeneratedRubricData(responseData?.result)
        const result = Object.entries(responseData).map(
          ([Title, expectations]) => ({
            Title,
            ...expectations,
          })
        );
        // setGeneratedRubricData(result);

        const keysArray = result.map((obj) => Object.keys(obj));

        if (keysArray.length > 0) {
          const columns = keysArray[0].map((key) => ({
            field: key,
            header: key.replace(/\d+\s\((.*?)\)/, "$1"),
          }));
          setColumns(columns);
        }

        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
        setShowExemplarButton(true);
        setLoading(false);
      } else {
        const message =
          response?.message ?? response?.error ?? "Something went wrong";
        toast.error("Something Went Wrong");
        setLoading(false);
      }
    } catch (error) {
      if (error.message != "Operation canceled by the user.") {
        const message = error?.message ?? "Something went wrong";
        console.log("message", message, error);
        setLoading(false);
      }
    }
  };
  const contentRef = useRef(null);
  // const responseForPopup = generatedRubricData.length ? (
  //   <div ref={contentRef}>
  //     {columns.length > 0 ? (
  //       <div class="mt-[20px] custTable">
  //         <table class="w-full">
  //           <thead>
  //             <tr>
  //               {columns.map((col, i) => (
  //                 <th key={i}>
  //                   <div class="col">{col.header}</div>
  //                 </th>
  //               ))}
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {generatedRubricData.map((row, i) => (
  //               <tr key={i}>
  //                 {columns.map((col, j) => (
  //                   <td key={j} valign="top">
  //                     <div className="col">{row[col.field]}</div>
  //                   </td>
  //                 ))}
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     ) : (
  //       <div>No Data Found</div>
  //     )}
  //   </div>
  // ) : (
  //   ""
  // );

  const responseForPopup = (
    <>
      <table ref={contentRef} style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
        <tbody>
          <tr>
            {generatedData.map((header, i) => (
              <>
              <td key={i} data-row="row-9jmd" style={{ border: '1px solid #FFD8B2', padding: '24px', backgroundColor: '#FFF2E5', wordWrap: 'break-word' }}><br />{header.trim().replace(/\*/g, '')}</td>
              {/* <td key={i} data-row="row-9jmd" style={{ border: '1px solid black', padding: '5px' }}><br />1-5</td> */}
              {/* <td key={i} data-row="row-9jmd" style={{ border: '1px solid black', padding: '5px' }}><br />6-10</td> */}
              {/* <td key={i} data-row="row-9jmd" style={{ border: '1px solid black', padding: '5px' }}><br />10-15</td> */}
              </>
            ))}

          </tr>
          {generatedRubricData}
          {/* {generatedRubricData.map((row, i) => {
            return (
              columns.map((col, j) => {

                return (
                  <tr key={i}>
                    <td key={j} data-row={`row-${i % 2 === 0 ? 'gh33' : '9jmd'}`} style={{ border: '1px solid black', padding: '5px' }}><br />{row[col.field]}</td>
                  </tr>
                )
              })
            )
          }
          )} */}


          
          {/* <tr>
        <td data-row="row-gh33"style={{border: '1px solid black', padding: '5px'}}><br/>sdwsd</td>
        <td data-row="row-gh33"style={{border: '1px solid black', padding: '5px'}}><br/>sdwsd</td>
        <td data-row="row-gh33"style={{border: '1px solid black', padding: '5px'}}><br/>sdwsd</td>
        </tr> */}

        </tbody >
      </table >
      <p><br /></p>
    </>
  )




  // const responseForPopup = generatedRubricData ? (
  //   <div ref={contentRef}>
  //     <div class="mt-[20px] custTable">
  //      <RubricTable rubricData={generatedRubricData}></RubricTable>
  //     </div>
  //   </div>
  // ) : ""
  const HeaderData = () => {
    return (
      <div className="flex">
        Confirmation
      </div>
    )
  }

  const accept = () => {
    // setVisible(false)
    setLoading(false);
    cancelPendingRequests()
    onhide()
    setDialogVisible(false)
  }

  const footerContent = (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
      <button onClick={() => { setDialogVisible(false) }} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>

      <button onClick={accept} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  );

  const handleDiaglogHide = () => {
    if (loading == true) {
      setDialogVisible(true)
      // handleHide()
    } else {
      onhide();
    }
  }

  const handleHide = () => {
    setDialogVisible(false);
  }

  const handleClearAndHide = () => {
    handleDiaglogHide();
    setLoading(false);
    setGradeLevel(null);
    setStandardValue("");
    setAssignmentTitle("");
    setAssignmentDesc("");
    setSelectedPointScale(null);
    setAddCustomizationValue("");
    setError({});
    setIsShowHide(false);
  }

  return (
    <Dialog
      className="custom-popup w-[800px]  "
      header=" "
      visible={Visible}
      style={{ width: "50vw" }}
      onHide={handleClearAndHide}
      blockScroll
    >
      {formShow && (
        <>
          <div className="flex justify-between items-center">
            <div className="grid">
              <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium font-bold">
                <b>{AppTitle.rubricGenerator}</b>
              </h3>
              <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                {AppDesc.rubricGenerator}
              </p>
            </div>
            {
              isShowHide && !loading &&
              <button className='flex bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                onClick={() => {
                  setFormDataShow(true);
                  setFormShow(false);
                }}
              >
                <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                Hide  Prompt
              </button>
            }
          </div>


          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <ProgressSpinner />
            </div>
          ) : (
            <form className="grid xl:gap-[0.625vw] gap-[12px]">
              <div>
                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                  Grade Level:<span className="text-[red]">*</span>
                </label>
                <Dropdown
                  filter
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.value)}
                  options={GRADE}
                  optionLabel="name"
                  placeholder="Select"
                  className="w-full md:w-14rem"
                />
                {error.grade ? (
                  <span style={{ color: "red" }}>{error.grade}</span>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                  Standard/Objective:<span className="text-[red]">*</span>
                </label>
                <InputTextarea
                  autoResize
                  placeholder="Type..."
                  value={standardValue}
                  onChange={(e) => setStandardValue(e.target.value)}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div>
                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                  Assignment Title:
                  <span className="text-[red]">*</span>
                </label>
                <InputText
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  placeholder="Type..."
                  className="w-full"
                />
                {error.assignmentTitle ? (
                  <span style={{ color: "red" }}>
                    {error.assignmentTitle}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                  Assignment Description:
                  <span className="text-[red]">*</span>
                </label>
                <InputTextarea
                  autoResize
                  placeholder="Type..."
                  value={assignmentDesc}
                  onChange={(e) => setAssignmentDesc(e.target.value)}
                  rows={3}
                  className="w-full"
                />
                {error.assignmentDesc ? (
                  <span style={{ color: "red" }}>
                    {error.assignmentDesc}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                  Point Scale:<span className="text-[red]">*</span>
                </label>
                <Dropdown
                  filter
                  value={selectedPointScale}
                  onChange={(e) => setSelectedPointScale(e.value)}
                  options={QUESTIONS}
                  optionLabel="name"
                  placeholder="Select"
                  className="w-full md:w-14rem"
                />
                {error.selectedPointScale ? (
                  <span style={{ color: "red" }}>
                    {error.selectedPointScale}
                  </span>
                ) : (
                  <></>
                )}
              </div>

              <div>
                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                  Additional Customization for Rubric (optional):
                </label>
                <InputTextarea
                  autoResize
                  placeholder="Type..."
                  value={addCustomizationValue}
                  onChange={(e) =>
                    setAddCustomizationValue(e.target.value)
                  }
                  rows={3}
                  className="w-full"
                />
              </div>
              <div>
                <button
                  disabled={loading}
                  className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570ef] bg-[#1570ef] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                  onClick={(e) => {
                    setIsExVisible(false);
                    handleGenerateRubric(e);
                  }}
                >
                  {loading ? "Please Wait..." : "Generate with BrixAI"}
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {formDataShow && (
        <>
          <Commonresponse
            title={`${AppTitle.rubricGenerator}`}
            onHide={() => {
              setFormDataShow(false);
              setFormShow(true);
            }}
            handleAction={() => {
              setVisibleRubricTable(true);
            }}
            setIsExVisible={setIsExVisible}
            response={responseForPopup}
            contentRef={contentRef}
            appLink={"/rubricGenerator"}

          />
        </>
      )}
      {visibleRubricTable && (
        <CommonAction
          title={`Generated ${AppTitle.rubricGenerator}`}
          response={responseForPopup}
          visible={visibleRubricTable}
          contentRef={contentRef}
          setVisible={setVisibleRubricTable}
          appLink={"/rubricGenerator"}
          setDataEditor={setInstruction}
          onHide={() => {
            setFormDataShow(false);
            setFormShow(true);
            onhide()
            setVisibleRubricTable(false);
            handleClearAndHide();
          }}
          setBooleanValue={isActionVisible}
          isRubric = {true}

        />
      )}

      {dialogVisible == true ?
        <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }}
          // onHide={() => setDialogVisible(false)} 
          onHide={handleHide}
          className='ConfirmDialog'>
          <p className="m-0">
            Are you sure you want to close?
          </p>

        </Dialog> : null}
    </Dialog>
  );
}
