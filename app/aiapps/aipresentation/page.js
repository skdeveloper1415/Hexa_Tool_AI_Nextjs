"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import {  AppCategory, AppId, AppTitle, CARDS, LANGUAGE } from "../../../components/helper/enum";
import CommonActionExempler from "../../common/CommonActionExempler";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import { TabMenu } from 'primereact/tabmenu';
import { TabView, TabPanel } from 'primereact/tabview';
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const items = [{ label: `${AppTitle.aiPresentation}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const appId = AppId.studentworkfeedback;
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

  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [error, setError] = useState({});
  const [prompt, setPrompt] = useState("Want a presentation on solar system")
  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const [lang, setLang] = useState();
  const [assignmentDesc, setAssignmentDesc] = useState("");
  const [
    studentFeedbackOrRubricCategories,
    setStudentFeedbackOrRubricCategories,
  ] = useState("");
  const [studentWorkFeedback, setStudentWorkFeedback] = useState("");
  const [responseData, setResponseData] = useState([]);
  const [responseDataAreaOfStrength, setResponseDataAreaOfStrength] = useState(
    []
  );
  const [responseDataAreaOfGrowth, setResponseDataAreaOfGrowth] = useState([]);
  const [
    responseDataAreaOfGeneralFeedback,
    setResponseDataAreaOfGeneralFeedback,
  ] = useState([]);
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const validate = () => {
    let err = {};
    let isErr = false;

    if (gradeLevel === null || gradeLevel.name.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (assignmentDesc === "" || assignmentDesc.trim() === "") {
      err.assignmentDesc = "Please Enter  Assignment Description.";
      isErr = true;
    }
    if (
      studentFeedbackOrRubricCategories === "" ||
      studentFeedbackOrRubricCategories.trim() === ""
    ) {
      err.studentFeedbackOrRubricCategories =
        "Please Enter Focus of Feedback/Rubric Categories.";
      isErr = true;
    }
    if (studentWorkFeedback === "" || studentWorkFeedback.trim() === "") {
      err.studentWorkFeedback =
        "Please Enter Student Work to Give Feedback On.";
      isErr = true;
    }

    setError(err);
    return isErr;
  };

  const copyRef = useRef(null);

  const handleSubmit = async (e) => {
    setLoading(false);
    setIsExVisible(true);
    setFormDataShow(true);
    setFormShow(false);
    // e.preventDefault();
    // if (validate()) {
    //   return;
    // }
    // setIsExVisible(false);
    // setLoading(true);
    // try {
    //   const payload = {
    //     grade: gradeLevel?.code,
    //     description: assignmentDesc,
    //     focus_feedback: studentFeedbackOrRubricCategories,
    //     student_work_feedback: studentWorkFeedback,
    //   };
    //   const response = await generateStudentWorkFeedbackAPI(payload);

    //   if (response.code == "200") {
    //     let responseData = response.data.data ?? [];
    //     setResponseData(responseData);
    //     setResponseDataAreaOfStrength(responseData?.Areas_of_Strength);
    //     setResponseDataAreaOfGrowth([...responseData?.Areas_for_Growth]);
    //     setResponseDataAreaOfGeneralFeedback([
    //       ...responseData?.General_Feedback_on_Writing_Mechanics,
    //     ]);
    //     setShowExemplarButton(true);
    //     const attemptValid = handleClickAttempt();
    //     if (!attemptValid) {
    //       setLoading(false);
    //       return;
    //     }
    //     setLoading(false);
    //     setIsExVisible(true);
    //     setFormDataShow(true);
    //     setFormShow(false);
    //   } else {
    //     const message =
    //       response?.message ?? response?.error ?? "Something went wrong";
    //       toast.error("Something went wrong")
    //     console.log("message", message);
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   const message = error?.message ?? "Something went wrong";
    //   toast.error("Something went wrong")
    //   console.log("message", message);
    //   setLoading(false);
    // }
  };

  const handleClear = () => {
    setGradeLevel(null);
    setAssignmentDesc("");
    setStudentFeedbackOrRubricCategories("");
    setStudentWorkFeedback("");
    setError({});
    setLang();
    setShowExemplarButton(false);
  };

  const setExamples = () => {
    setGradeLevel({ name: '1 Cards', code: '1 Cards' });
    setLang({ name: 'English', code: 'Russian' })
    setAssignmentDesc(
      `Analyze imagery in "Of Mice and Men" by including at least three examples of imagery from the text `
    );
    setStudentFeedbackOrRubricCategories(
      `Accurate analysis of the use of imagery and appropriate examples of imagery. correct grammar and spelling `
    );
    setStudentWorkFeedback(`In "Of Mice and Men," John Steinbeck uses lots of pictures in words to show the hard life during the Great Depression. The pictures help us feel what it was like for the characters, and they make the book more interesting. One big example of this is when George talks about the dream ranch he wants with Lennie.

    In the book, George says, "O.K. Someday—we're gonna get the jack together and we're gonna have a little house and a couple of acres an' a cow and some pigs..." This picture George paints makes us see a nice, calm place where they can live happy. The house, the acres, and the animals give us a good feeling. It's like a movie in our mind, and we can see it clear.

    Another picture is when George talks about the rabbits Lennie wants to take care of. George says, "We'll have a big vegetable patch and a rabbit hutch and chickens. And when it rains in the winter, we'll just say the hell with going' to work, and we'll build up a fire in the stove and set around it an' listen to the rain comin' down on the roof." This makes us see a cozy place where they can relax. The rain, the fire, and the rabbits give us a warm feeling. It's like a happy painting in our head.

    The pictures in words make "Of Mice and Men" more real, and we can feel what the characters feel. It's like we're right there with them, seeing everything they see. The author uses these pictures to help us understand the story better and to make us care about the characters.`);
    setError({});
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
  };

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
    setVisible(true);
  };

  const responseToShow = (
    <div>
      <div ref={copyRef}>
        <h4 className="text-[16px] xl:text-[0.833vw]">
          {" "}
          <b>{responseData?.Title}:</b>
        </h4>

        {formDataShow && (
          <div>
            <div>
            <h5><b>Areas of Strength:</b></h5>
              <ul
                className="text-[16px] xl:text-[0.833vw]"
                style={{ listStyle: "inside" }}
              >
                {responseDataAreaOfStrength &&
                  Object.entries(responseDataAreaOfStrength).map(
                    ([key, value], index) => {
                      return (
                        <li key={index}>
                          <span className="font-bold">{key}</span>
                          <p>{value}</p>
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
            <div>
              <h4><b>Areas for Growth</b></h4>
              <ul
                className="text-[16px] xl:text-[0.833vw]"
                style={{ listStyle: "inside" }}
              >
                {responseDataAreaOfGrowth.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
            <div>
              <h4>General Feedback on Writing Mechanics:</h4>
              <ul
                className="text-[16px] xl:text-[0.833vw]"
                style={{ listStyle: "inside" }}
              >
                {responseDataAreaOfGeneralFeedback.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const itemsForTab = [
    { label: 'Brief' },
    { label: 'Medium' },
    { label: 'Detailed' },

  ];
  const itemsForTab2 = [
    { label: 'AI Image' },
    { label: 'Web Image Search' },

  ];
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  const [cardItems, setCardItems] = useState([
    { id: 1, value: 'Introdunction to the solar system' },
    { id: 2, value: 'The sun and its charecteristics' },
    { id: 3, value: 'The planets of the solar systems' }]);

  const handleChange = (index, value) => {
    const updatedItems = [...cardItems];
    updatedItems[index].value = value;
    setCardItems(updatedItems);
  };

  const handleAddCard = () => {
    const newItem = {
      id: cardItems.length + 1,
      value: ''
    };
    setCardItems([...cardItems, newItem]);
  };

  const handleRemoveCard = (index) => {
    const updatedItems = [...cardItems];
    updatedItems.splice(index, 1);
    setCardItems(updatedItems);
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
          <BackToAIModified isGenerate={loading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loading}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  setIsExVisible(false);
                  
                  handleClear();
                } else {
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[12px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] ${loading == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => setExamples()}
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
            {isPopupVisible && (
              <CommonActionExempler
                onClose={hideExemplerPopup}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                contentRef={copyRef}
                title={`${AppTitle.studentworkfeedback}`}
                response={responseToShow}
                appLink={"/studentworkfeedback"}
              />
            )}
          </div>
          </div>
          <div className="xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg">
            {formShow && (
              <>
                 <div className="bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                  <div className="xl:col-span-2">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                   {AppTitle.aiPresentation}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                  Based on a custom criteria, have AI give areas of strength &
                  areas for growth on student work.
                </p>
                </div>
                <div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.instructionalDesign}</div>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid grid-cols-12 xl:gap-[1.25vw] gap-[18px]">
                    <div className="col-span-6">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Card: <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={gradeLevel}
                        onChange={(e) => {
                          setGradeLevel(e.value);
                        }}
                        options={CARDS}
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
                    <div className="col-span-6">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Language: <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={lang}
                        onChange={(e) => {
                          setLang(e.value);
                        }}
                        options={LANGUAGE}
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
                    <div className="col-span-12">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Description:{" "}
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={assignmentDesc}
                        onChange={(e) => {
                          setAssignmentDesc(e.target.value);
                        }}
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
                    <div className="col-span-12">
                    <Note/>
                    </div>
                    <div className="col-span-12">
                      <button
                        onClick={handleSubmit}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      >
                        Generate outline with K12Gpt
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
            {formDataShow && (
              <>
                {/* <Commonresponse
                  title={`${AppTitle.studentworkfeedback}`}
                  onHide={() => {
                    setFormDataShow(false);
                    setFormShow(true);
                  }}
                  handleAction={handleAction}
                  setIsExVisible={setIsExVisible}
                  response={responseToShow}
                  contentRef={copyRef}
                  appLink={"/studentworkfeedback"}
                /> */}
                <div className="">
                  <div className="container mx-auto space-y-6">
                    <div>
                      <h5 className="text-[#101828] text-base font-medium leading-7">Prompt</h5>
                      <InputTextarea
                        autoResize
                        placeholder="Type..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.value)}
                        rows={1}
                        className="w-full"
                      />

                      <h5 className="text-[#101828] text-base font-medium leading-7">Outline</h5>
                      <div className="grid grid-cols-1  gap-4">
                        {cardItems.map((item, index) => (
                          <div key={item.id} className="flex gap-2">
                            <label className="text-[16px] py-2 px-4 text-[#FF8B1A] bg-[#FFF2E5] rounded-lg flex items-center justify-center">{item.id}</label>
                            <InputTextarea
                              autoResize
                              placeholder="Type..."
                              value={item.value}
                              onChange={(e) => handleChange(index, e.target.value)}
                              rows={1}
                              className="w-full"
                            />
                            <button className="bg-[#1570EF] hover:text-[#1570EF] hover:bg-[#FFF2E5] text-sm text-white font-medium p-3 rounded-lg" onClick={() => handleRemoveCard(index)}>Remove</button>
                          </div>

                        ))}
                      </div>
                    </div>

                    <button className="bg-[#1570EF] text-white text-sm font-medium leading-6 rounded-lg py-3 w-full" onClick={handleAddCard}>Add Cards</button>
                    <div>
                      <h5 className="text-[#101828] text-base font-medium leading-7">Settings</h5>
                      <h6 className="text-xs font-normal text-[#344054]">Amount of Text per Card</h6>
                    </div>
                    <div>
                      <TabView className={'tabviewui'}>
                        <TabPanel header="Brief">
                          <div className="mb-4">
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                              Please Enter Brief:

                          </label>
                          <InputTextarea
                            autoResize
                            placeholder="Type..."
                            value={assignmentDesc}
                            onChange={(e) => {
                              setAssignmentDesc(e.target.value);
                            }}
                            rows={1}
                            className="w-full"
                          />
                        </div>
                      </TabPanel>
                      <TabPanel header="Medium">
                        <div>
                          <h5 className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Image Source</h5>
                          <div className="p-grid p-justify-center">
                            <div className="p-col w-full">
                              <TabMenu model={itemsForTab2} className={'tabmenuui'} />
                            </div>
                          </div>
                          <h6 className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Image license</h6>
                          <div className="card flex justify-content-center">
                            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                              placeholder="Select a City" className="w-full md:w-14rem" />
                          </div>
                          </div>
                        </TabPanel>
                        <TabPanel header="Detailed">
                          <p className="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                            quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                          </p>
                        </TabPanel>
                      </TabView>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
         
        </div>
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.studentworkfeedback}`}
            response={responseToShow}
            visible={isActionvisible}
            contentRef={copyRef}
            setVisible={setIsActionvisible}
            appLink={"/studentworkfeedback"}
          />
        )}
      </div>
      {renderPopup()}
    </Layout>
  );
}
