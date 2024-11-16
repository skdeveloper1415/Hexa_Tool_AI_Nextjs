"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { AppCategory, AppId, AppTitle, GRADE } from "../../../components/helper/enum";
import { ProgressSpinner } from "primereact/progressspinner";
import { generateChoiceBoard } from "../../actions/choiceBoardApi";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [choiceboardData, setChoiceBoardData] = useState({
    grade: "",
    assignmentPrompt: "",
    choiceboard: "",
  });
  const items = [{ label: `${AppTitle.choiceboard}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);

  const appId = AppId.choiceboard;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

  const [ip, setIp] = useState("123.456.789.123");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!choiceboardData.grade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!choiceboardData.assignmentPrompt || choiceboardData.assignmentPrompt.trim() === "") {
      err.assignmentPrompt =
        "Please Enter Learning Goal, Standard, Objective, or Topic.";
      isErr = true;
    }
    if (!choiceboardData.choiceboard || choiceboardData.choiceboard.trim() === "") {
      err.choiceboard = "Please Enter Additional Detail for the Choice Board.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const handleClear = () => {
    setChoiceBoardData({
      grade: "",
      assignmentPrompt: "",
      choiceboard: "",
    });
    setError({});
    setFormDataShow(false);
    setFormShow(true);
    setIsExVisible(false);
    setIsShowHide(false);
  };

  const [content, setContent] = useState([]);
  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const body = {
      grade: choiceboardData.grade ? choiceboardData.grade : "",
      learning_details: choiceboardData.assignmentPrompt
        ? choiceboardData.assignmentPrompt
        : "",
      additional_details: choiceboardData.choiceboard
        ? choiceboardData.choiceboard
        : "",
    };
    setLoader(true);
    try {
      const response = await generateChoiceBoard(body);
      if (response.data.code === 200) {
         // Halt form submission if attempts exceeded
         const attemptValid = handleClickAttempt();
         if (!attemptValid) {
           setLoader(false)
           return;
         }
        const responseData = response.data.data.data;
        // const transformedResponse = stringResponseConvert(responseData);
        setContent(responseData);
        setFormDataShow(true);
        setIsExVisible(true);
        setFormShow(false);
        setLoader(false);
        setIsShowHide(true);
      } else {
        console.log("Error: ", response);
        setLoader(false);
        toast.error('Something went wrong.')
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.log("Error: ", error);
        toast.error('Something went wrong.')
      }
    }
  };

  const copyRef = useRef(null);

  const responsetoshow = (

    content? (
      
    <div ref={copyRef}>
    <h2 className="text-[#101828] 3xl:text-[0.938vw] 2xl:text-[18px] xl:text-[16px] font-semibold border-b border-[#C8CBD0] xl:pb-[1.04vw] pb-[20px] xl:mb-[1.04vw] mb-[20px]">
      Title: {content[0]}
    </h2>
    <div>
      {content?.length > 0 ? (
        <div class="mt-[20px] custTable">
          <table class="w-full">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Assignment Description</th>
              </tr>
            </thead>
            <tbody>
              {content?.map((row, index) => {
                  if (index > 3) { // Skip the first two rows as they are not part of the table
                      const [empty,title, description] = row.split('|').map(cell => cell.trim());
                      return (
                          <tr key={index}>
                              <td>{title}</td>
                              <td>{description}</td>
                          </tr>
                      );
                  } else {
                      return null; // Skip the first two rows
                  }
              })}
          </tbody>
          </table>
        </div>
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  </div>
    ) :
    (
      ""
    )

  );

  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);
  };

  const hideExemplerPopup = () => {
    setIsPopupVisible(false);
  };

  const handleAction = () => {
    setIsActionvisible(true);
  };

  const handleExample = () => {
    setChoiceBoardData(prevData => ({
      ...prevData,
      grade: "Grade 9",
      assignmentPrompt: "The phases of mitosis",
      choiceboard: "include a lot of diverse activities",
    }));
setFormDataShow(false);
setFormShow(true);
  }

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
        <BackToAIModified isGenerate={loader}/>
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
              onClick={handleClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50" : "" }`}
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
            disabled={loader}
              onClick={() => handleExample()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50" : ""}`}
            >
              <Image
                width="20"
                height="20"
                className="mr-[8px]"
                src="/images/exemplar.svg"
                alt="Example"
              />
              Try New
            </button>
          </div>
        </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
               <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div className="xl:col-span-2">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                {AppTitle.choiceboard}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Offers learning sytles and choices to diversify needs of students.
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setFormDataShow(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
                  }
                     </div>
                {loader ? (
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
                        filter
                        value={
                          choiceboardData.grade
                            ? GRADE.find(
                                (ele) => ele.name == choiceboardData.grade
                              )
                            : null
                        }
                        onChange={(e) => {
                          setChoiceBoardData({
                            ...choiceboardData,
                            grade: e.value.name,
                          });
                          if (e.target.value) {
                            setError({ ...error, grade: "" });
                          }
                        }}
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
                        Learning Goal, Standard, Objective, or Topic:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-[7px] top-[14px]">
                          <i className="hexatoolmic"></i>
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="The phases of mitosis"
                          value={choiceboardData.assignmentPrompt}
                          onChange={(e) => {
                            setChoiceBoardData({
                              ...choiceboardData,
                              assignmentPrompt: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, assignmentPrompt: "" });
                            }
                          }}
                          rows={3}
                          className="w-full pl-7"
                        />
                        {error.assignmentPrompt ? (
                          <span style={{ color: "red" }}>
                            {error.assignmentPrompt}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Detail for the Choice Board:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-[7px] top-[14px]">
                          <i className="hexatoolmic"></i>
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="include a lot of diverse activities"
                          value={choiceboardData.choiceboard}
                          onChange={(e) => {
                            setChoiceBoardData({
                              ...choiceboardData,
                              choiceboard: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, choiceboard: "" });
                            }
                          }}
                          rows={3}
                          className="w-full pl-7"
                        />
                        {error.choiceboard ? (
                          <span style={{ color: "red" }}>
                            {error.choiceboard}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  <Note/>
                    <div>
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          HandleGenerate(e);
                          // setFormDataShow(true)
                          // setFormShow(false)
                        }}
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
            {formDataShow && (
              <>
                <Commonresponse
                  title={`${AppTitle.choiceboard}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responsetoshow}
                  contentRef={copyRef}
                />
              </>
            )}
            {renderPopup()}
          </div>
          
        </div>

        {isPopupVisible && (
          <CommonActionExempler
            onClose={hideExemplerPopup}
            setIsPopupVisible={setIsPopupVisible}
            position={position}
            visible={visible}
            isExVisible={isExVisible}
            title={`Example for  ${AppTitle.choiceboard}`}
            contentRef={copyRef}
            response={responsetoshow}
            appLink={"/choiceboard"}
          />
        )}
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated  ${AppTitle.choiceboard}`}
            response={responsetoshow}
            visible={isActionvisible}
            position={position}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/choiceboard"}
          />
        )}
      </div>
    </Layout>
  );
}
