"use client";
import React, { useRef, useState , useEffect} from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ScrollPanel } from "primereact/scrollpanel";
import { toast } from "react-toastify";
import { GRADE, AppId, AppTitle, AppDesc, AppCategory } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { generateDokQuestions } from "../../actions/dokQuestions";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import { useSpeechRecognition } from "react-speech-kit";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";


export default function Index() {
  const [data, setData] = useState();
  const [multiStepData, setmultiStepData] = useState();
  const [contentType, setContentType] = useState();
  const [isExVisible, setIsExVisible] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [listenVisible, setListenVisible] = useState(false)
  const [exempler, setExempler] = useState(false);
  const [showExemplarButton, setShowExemplarButton] = useState(false);

  const items = [{ label: `${AppTitle.dokQuestion}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const contentRef = useRef(null);
  const [isShowHide, setIsShowHide] = useState(false); 

  const appId = AppId.dokQuestion;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;

  const { listen, listening, stop, transcript } = useSpeechRecognition({
    onResult: (result) => {
      // setresult(result)
      setContentType(contentType ? contentType + result : result);
    },
  });

  const handleListen = (e) => {
    e.preventDefault()
    console.log("handleListen: ");
    setListenVisible(true)
    try {
      listen();
    } catch (error) {
      console.error("Failed to start recognition:", error);
    }
  };

  const handleStop = () => {
    setListenVisible(false)
    stop();
  };

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts


  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [position, setPosition] = useState("center");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!multiStepData || multiStepData.name.trim() === "") {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!contentType || contentType.trim() === "") {
      err.contentType = "Please Enter Content Type.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const HandleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }

    const payload = {
      grade: multiStepData.name,
      text: contentType,
    };
    setIsLoading(true);
    try {
      const response = await generateDokQuestions(payload);
      if (response.data.code === 200) {
        const dataArray = [];
        Object.entries(response.data.data.data.Content).forEach(([key, value]) => {
          dataArray.push({ key, value });
        });
        setData(dataArray);
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setIsLoading(false)
          return;
        }
        setFormShow(false);
        setVisible1(true);
        setIsExVisible(true);
        setShowExemplarButton(true)
        setIsShowHide(true);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        console.error("Error occurred:", error);
        toast.error("Something went wrong")
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
  };


  const handleClear = () => {
    setVisible1(false), setFormShow(true);
    setmultiStepData("");
    setContentType("");
    setShowExemplarButton(false)
    setError({});
    setIsShowHide(false);
  };

  const setExamples = () => {
    setmultiStepData({name: 'Grade 7', code: '9'})
    setContentType('Forces and motion')
    setError({})
    setFormShow(true);
    setFormDataShow(false);
    setVisible(false);
    setIsExVisible(false);
    setVisible1(false);
  };

  const exemplarToShow = data ? (
    <div ref={contentRef}>
      <ScrollPanel style={{ width: "100%" }}>

        {data &&
          data.length > 0 &&
          data.map((elm, i) => {
            return (
              <div key={i} ref={contentRef}> 
                {" "}
                {/* Adding key prop here */}
                <div>
                  <p className="mb-2">DOK Level-{i + 1}</p>
                  {elm?.value?.Questions ? (
                    <>
                      {elm?.value?.Questions?.map(
                        (
                          item,
                          j // Using a unique identifier for nested map
                        ) => (
                          <ul
                            key={j} // Adding key prop here
                            className="3xl:text-[0.729vw] text-[14px] text-[#344054]"
                            style={{ listStyle: "inside" }}
                          >
                            <li>{item}</li>
                          </ul>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {elm?.value?.map(
                        (
                          item,
                          j // Using a unique identifier for nested map
                        ) => (
                          <ul
                            key={j} // Adding key prop here
                            className="3xl:text-[0.729vw] text-[14px] text-[#344054]"
                            style={{ listStyle: "inside" }}
                          >
                            <li>{item}</li>
                          </ul>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </ScrollPanel>
    </div>
  ) : ""

  const hideExemplerPopup = () => {
    setVisible1(false);
  };
  const handleAction = () => {
    setFormDataShow(true);
    setIsActionvisible(true);
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
              isGenerate={isLoading}
            />
            <button
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""
                } `}
              onClick={() => {
                handleClear();
              }}
              disabled={isLoading}
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
              disabled={isLoading}
              onClick={() => setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px]  xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isLoading ? "opacity-50 cursor-not-allowed" : ""
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
                      <b>{AppTitle.dokQuestion}</b>
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px] pt-[5px]">
                      {AppDesc.dokQuestion}
                    </p>
                  </div>
                {
                    isShowHide == true ?(isShowHide && !isLoading &&
                    <button className='flex w-[230px] xl:w-[220px] 3xl:w-[10.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setVisible1(true);
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>) :<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.ContentLibrary}</div>
                  }
                  </div>
                {isLoading == true ? (
                  <div className="flex justify-center items-center">
                    <ProgressSpinner />
                  </div>
                ) : (
                  <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Grade Level:<span className="text-[red] ml-2">*</span>
                      </label>
                      <Dropdown
                        value={multiStepData}
                        onChange={(e) => {
                          setmultiStepData(e.target.value),
                            setError((prevError) => ({
                              ...prevError,
                              grade: "", // Clear error message when a selection is made
                            }));
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
                        Topic, Standard, Text or Objective:
                        <span className="text-[red] ml-2">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Focus and motion"
                          value={contentType}
                          onChange={(e) => {
                            setContentType(e.target.value),
                              setError((prevError) => ({
                                ...prevError,
                                contentType: "", // Clear error message when a selection is made
                              }));
                          }}
                          rows={3}
                          cols={3}
                          className="w-full relative pl-[35px]"
                        />
                        {error.contentType ? (
                          <span style={{ color: "red" }}>
                            {error.contentType}
                          </span>
                        ) : (
                          <></>
                        )}

                        <Link href="#">
                         { listenVisible ?  (<div className="absolute top-[12px] left-[13px]"
                          onClick={handleStop}
                          // onMouseUp={handleStop}
                          >
                            <i className="hexatoolmic-mute"></i>
                          </div>) : (<div className="absolute top-[12px] left-[15px]"
                          onClick={(e)=> handleListen(e)}
                          // onMouseUp={handleStop}
                          >
                            <i className="hexatoolmic"></i>
                          </div>)}
                        </Link>
                        <div className="absolute top-[36px] left-[7px]">
                          <i
                            className="pi pi-paperclip"
                            style={{ fontSize: "1rem" }}
                          ></i>
                        </div>
                      </div>
                    </div>
                    {/* <Note/> */}
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
            {visible1 == true && (
              <Commonresponse
                title={`${AppTitle.dokQuestion}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), setFormShow(true)
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={exemplarToShow}
                contentRef={contentRef}
            appLink={"/dokQuestion"}

              />
            )}
          </div>
          {/* <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={isLoading ? true : false}
              onClick={
                () => {
                  if (formDataShow) {
                    setFormDataShow(false);
                    setFormShow(true);

                    handleClear();
                  } else {
                    handleClear();
                  }
                }

                }
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : "" }`}
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
              disabled={isLoading}
              // onClick={() => {
              //   showExemplerPopup("top"), setExempler(true);
              // }}
              onClick={() => setExamples()}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            contentRef={contentRef}
            onClose={() => {
              setVisible(false), setExempler(false);
            }}
            setIsPopupVisible={setVisible}
            position={"center"}
            visible={visible}
            isExVisible={isExVisible}
            title={`${AppTitle.dokQuestion}`}
            appLink={"/dokQuestion"}

            response={exemplarToShow}
          />
        )}
        {isActionvisible && (
          <CommonActionExempler
            title={`Generated ${AppTitle.dokQuestion}`}
            response={exemplarToShow}
            visible={isActionvisible}
            position={"top"}
            setVisible={setIsActionvisible}
            appLink={"/dokQuestion"}
            contentRef={contentRef}

          />
        )}
      </div>
      {renderPopup()}

    </Layout>
  );
}
