"use client";
import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import { GRADE, AppId, AppTitle, AppCategory, AppDesc } from "../../../components/helper/enum";
import { STIMULUS } from "../../../components/helper/enum";
import { QUESTIONS } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import { generateThreeDSciAPI } from "../../actions/ThreeDAssesment";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import { stringResponseConvert } from "../../../components/helper/stringResponseConvert";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [isShowHide, setIsShowHide] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);
  const [responseContent, setResponseContent] = useState([]);
  const [responseTitle, setResponseTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const [error, setError] = useState({});
  const [content, setContent] = useState([]);
  const [textData,setTextData]=useState([]);
  const [headerline,setHeaderLine]=useState([]);
  const [headerColumns,setHeaderColumns]=useState([]);
  const [isTablePresent,setTablePresent]=useState(false)

  useEffect(()=>{

    if(content.length > 0){
      setHeaderLine(content[0]);
      const headerCols = content[0]?.split('|').map((cell) => cell.trim()).filter((cell) => cell !== '');
      setHeaderColumns(headerCols);
    }
  },[content])
  const responsetoshow = responseContent?.length > 0 ? (
    <div ref={contentRef}>
      <div>
      
        {!isTablePresent ? 
        <><h4 className="text-[16px] xl:text-[0.833vw]"> {responseTitle}</h4>
        <br></br>
        <ul className="text-[20px] xl:text-[0.933vw] mt-6">
          {responseContent.length > 0
            ? responseContent.map((item, i) => <><li key={i}>{item}</li><br></br></>)
            : null}
        </ul>
        </>:
    
      < >
    
      <div>
      <h2 className="text-[#101828] 3xl:text-[0.938vw] 2xl:text-[18px] xl:text-[16px] font-semibold border-b border-[#C8CBD0] xl:pb-[1.04vw] pb-[20px] xl:mb-[1.04vw] mb-[20px]">
        Title: {responseTitle}
      </h2>
      {<ul className="text-[20px] xl:text-[0.933vw] mt-6">
          {textData.length > 0
            ? textData.map((item, i) => <><li>{item}</li><br></br></>)
            : null}
        </ul>}
        {content?.length > 0 ? (
          <div class="mt-[20px] custTable">
            <table class="w-full">
              <thead>
                <tr>
                {headerColumns.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
                </tr>
              </thead>
              <tbody>
              {content?.map((row, index) => {
            // Skip the first two rows as they are not part of the table
            if (index > 1) {
              const dataColumns = row
                .split('|')
                .map((cell) => cell.trim())
                .filter((cell) => cell !== '');
              
              return row.includes('|') && (
                <tr key={index}>
                  {dataColumns.map((data, idx) => (
                    <td key={idx}>{data}</td>
                  ))}
                </tr>
              );
            } else {
              return null;
            }
                  
                })}
            </tbody>
            </table>
          </div>
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </>
      }
      </div>
    </div>
  ) : ""

  const appId = AppId.threeDimAssessment;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await getIpAddress();
      setIp(ip);
    };
    fetchIpAddress();
  }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(
    attempt,
    ip,
    appId
  );

  const [threeD_Data, set_threeD_Data] = useState({
    grade: "",
    ngss: "",
    stimulus: "",
    questions: "",
  });


  const items = [{ label: `${AppTitle.threeDimAssessment}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!threeD_Data.grade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }

    if (!threeD_Data.ngss || threeD_Data.ngss.trim().length == 0) {
      err.ngss = "Please Enter NGSS Standard";
      isErr = true;

      set_threeD_Data((prevState) => ({
        ...prevState,
        ngss: "",
      }));
    }

    if (!threeD_Data.stimulus) {
      err.stimulus = "Please Select Stimulus Type";
    }

    if (!threeD_Data.questions) {
      err.questions = "Please Select Number Of Questions";
    }
    setError(err);
    return isErr;
  };

  function checkDataTablePresence(array) {
    // Iterate through each element in the array
    for (const element of array) {
      // Convert the element to a string (in case it's not already)
      const elementString = String(element);
      // Check if the element includes the phrase "Data Table"
      if (elementString.includes("Data Table")) {
        return true; // Return true if the phrase is found
      }
    }
    return false; // Return false if the phrase is not found in any element
  }



function extractDataTable(inputArray) {
  const dataLines = [];
  let foundDataTable = false;
  
  for (let i = 0; i < inputArray.length; i++) {
      const line = inputArray[i];
      
      // Check if the line contains "Data Table:"
      if (line === "Data Table:") {
          foundDataTable = true;
          // Start collecting lines from the next line
          continue;
      }
      
      // If we're in the data table section, collect lines
      if (foundDataTable) {
          // If the line contains a ":" symbol (other than "Data Table:"), break the loop
          if (line.includes(':') && line !== "Data Table:") {
              break;
          }
          
          // Add the line to the dataLines array
          dataLines.push(line);
      }
  }
  
  // Return the array of collected data lines
  return dataLines;
}

function removeDataTableSection(inputArray) {
  const result = [];
  let skipDataTableSection = false;

  for (let i = 0; i < inputArray.length; i++) {
      const line = inputArray[i];

      // Check if the line contains "Data Table:"
      if (line.startsWith("Data Table:") || line.includes('|')) {
          skipDataTableSection = true;
          continue; // Start skipping lines from the next line
      }

      // If not skipping the Data Table section, add the line to the result array
      result.push(line);
  }

  // Return the array with the Data Table section removed
  return result;
}

  const HandleGenerate = async (e) => {
    e.preventDefault();

    if (validate()) {
      return;
    }
    setLoading(true);
    try {
      const payload = {
        grade: threeD_Data?.grade,
        standard: threeD_Data?.ngss,
        stimulus_type: threeD_Data?.stimulus,
        number_of_questions: threeD_Data?.questions,
      };
      const response = await generateThreeDSciAPI(payload);
      if (response.data.code == "200") {
        const responseData = response.data.data ?? [];
        const transformedResponse = stringResponseConvert(responseData);
        const responseString = JSON.stringify(transformedResponse);

        // Check if the phrase "Data Table" is included in the string
        if (responseString.includes("Data Table")) {
          // Extract the data table section from the response array
          const dataTable = extractDataTable(transformedResponse.Content);
          const text = removeDataTableSection(transformedResponse.Content);

          if(text){
            setTextData(text)
          }
          if(dataTable){
            setContent(dataTable);
            setTablePresent(true);
          }
        } else {
          console.log("The 'Data Table' key is not present.");
        }
        setResponseContent(transformedResponse?.Content);
        setResponseTitle(transformedResponse?.Title);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoading(false);
          return;
        }
        setFormDataShow(true);
        setFormShow(false);
        setIsExVisible(true);
        setShowExemplarButton(true);
        setLoading(false);
        setIsShowHide(true);
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        const message = error?.message ?? "Something went wrong";
        toast.error("Something went wrong");
        console.log("message", message);
        setLoading(false);
      }
    }
  };

  const clearStates = () => {
    set_threeD_Data({
      grade: "",
      ngss: "",
      stimulus: "",
      questions: "",
    });
    setError({});
    setFormDataShow(false);
    setFormShow(true);
    setShowExemplarButton(false);
    setIsShowHide(false);
  };

  const setExamples = () => {
    set_threeD_Data({
      grade: "Grade 9",
      ngss: "HS-PS1-1 Use the periodic table as a model to predict the relative properties of elements based on the patterns of electrons in the outermost energy level of atoms.",
      stimulus: 'Data Table',
      questions: "3",
    });
    setError({});
    setFormDataShow(false);
    setFormShow(true);
    setShowExemplarButton(false);
  };

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <BackToAIModified
              isGenerate={loading}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loading == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                clearStates();
              }}
              disabled={loading}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/resetclear.svg"
                alt="Reset and clear"
              />
              Reset and Clear
            </button>
            <button
              disabled={loading}
              onClick={() => setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Try Now"
              />
              Try Now
            </button>
          </div>

          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                <div className="flex justify-between items-center bg-[#F2F4F7]  xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                      <b>{AppTitle.threeDimAssessment}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                      {AppDesc.threeDimAssessment}
                    </p>
                  </div>

                  {
                    isShowHide == true ?(isShowHide && !loading &&
                    <button className='flex w-[330px] xl:w-[300px] 3xl:w-[14.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>):<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Assignment}</div>
                  }

                </div>


                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <ProgressSpinner style={{ margin: "auto" }} />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={
                          threeD_Data.grade
                            ? GRADE.find((ele) => ele.name == threeD_Data.grade)
                            : null
                        }
                        onChange={(e) => {
                          set_threeD_Data({
                            ...threeD_Data,
                            grade: e.value.name,
                          });
                          if (e.target.value) {
                            setError({ ...error, grade: "" });
                          }
                        }}
                        filter
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
                        NGSS Standard:<span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="HS-PS-1 Use the Periodic table as a model to predict..."
                        value={threeD_Data.ngss}
                        onChange={(e) => {
                          set_threeD_Data({
                            ...threeD_Data,
                            ngss: e.target.value,
                          });
                          if (e.target.value) {
                            setError({ ...error, ngss: "" });
                          }
                        }}
                        rows={1}
                        className="w-full"
                      />
                      {error.ngss ? (
                        <span style={{ color: "red" }}>{error.ngss}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Stimulus Type (Standard and description):
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={
                          threeD_Data.stimulus
                            ? STIMULUS.find(
                              (ele) => ele.name == threeD_Data.stimulus
                            )
                            : null
                        }
                        onChange={(e) => {
                          set_threeD_Data({
                            ...threeD_Data,
                            stimulus: e.value.name,
                          });
                          if (e.target.value) {
                            setError({ ...error, stimulus: "" });
                          }
                        }}
                        filter
                        options={STIMULUS}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.stimulus ? (
                        <span style={{ color: "red" }}>{error.stimulus}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Questions:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={
                          threeD_Data.questions
                            ? QUESTIONS.find(
                              (ele) => ele.code == threeD_Data.questions
                            )
                            : null
                        }
                        onChange={(e) => {
                          set_threeD_Data({
                            ...threeD_Data,
                            questions: e.value.code,
                          });
                          if (e.target.value) {
                            setError({ ...error, questions: "" });
                          }
                        }}
                        filter
                        options={QUESTIONS}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.questions ? (
                        <span style={{ color: "red" }}>{error.questions}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    {/* <Note/> */}
                    <div className="mt-[20px]">
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          {
                            setIsExVisible(false);
                            HandleGenerate(e);
                          }
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
              <Commonresponse
                title={`${AppTitle.threeDimAssessment}`}
                setFormDataShow={setFormDataShow}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => {
                  setVisible(true), setIsExVisible(false);
                }}
                response={responsetoshow}
                setVisible={setVisible}
                contentRef={contentRef}
                appLink={"/threeDimAssessment"}
              />
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              onClick={clearStates}
              disabled={loading}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg
            lg:px-[10px] xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center
             mb-5 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/resetclear.svg"
                alt="Reset and clear"
              />
              Reset and Clear
            </button>
            <button
              disabled={loading}
              onClick={() => setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF]
               font-medium border border-[#1B55AF] rounded-lg lg:px-[10px] xl:px-[1.04vw] px-[16px]
                xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Example"
              />
              Example
            </button>
          </div> */}
        </div>
        {visible && (
          <CommonActionExempler
            response={responsetoshow}
            setIsPopupVisible={setVisible}
            title={`Generated ${AppTitle.threeDimAssessment}`}
            contentRef={contentRef}
            onClose={() => setVisible(false)}
            setVisible={setVisible}
            position={"Center"}
            visible={visible}
            isExVisible={isExVisible}
            appLink={"/threeDimAssessment"}
          />
        )}
      </div>
      {renderPopup()}
    </Layout>
  );
}
