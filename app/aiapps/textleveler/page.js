"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { generateTextLeveler } from "../../actions/textleveler";
import { GRADE, AppId, AppTitle, AppCategory } from "../../../components/helper/enum";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const contentRef = useRef(null);
  const [isExVisible, setIsExVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [textLeveler, setTextLeveler] = useState("");
  const [isShowHide, setIsShowHide] = useState(false);
  const [error, setError] = useState({});
  const [textLevelerData, settextLevelerData] = useState({
    grade: "",
    text: "",
  });
  const items = [{ label: `${AppTitle.textleveler}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };
  const appId = AppId.textleveler;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;
  const [ip, setIp] = useState("123.456.789.123");

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

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!textLevelerData.grade) {
      err.grade = "Please Select Grade Level.";
      isErr = true;
    }
    if (!textLevelerData.text) {
      err.text = "Please Enter Original Text.";
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
    setLoader(true);
    try {
      const body = {
        grade: textLevelerData.grade ? textLevelerData.grade : "",
        text: textLevelerData.text ? textLevelerData.text : "",
      };
      const response = await generateTextLeveler(body);
      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }
        setTextLeveler(response.data.data.data);
        setFormDataShow(true);
        setFormShow(false);
      } else {
        console.log(response?.error);
        toast.error("Something went wrong");
      }
      setLoader(false);
      setIsShowHide(true)

    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false);
        let msg = error?.error ?? error?.message ?? "Something went wrong";
        toast.error("Something went wrong");
      }
    }
  };

  function printKeyValuePairs(obj, parentKey = "") {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        printKeyValuePairs(obj[key], parentKey ? `${parentKey}.${key}` : key);
      } else {
        return (
          <li>
            <h5 style={{ display: "inline" }}>{`${
              parentKey ? `${parentKey}.${key}` : key
            }`}</h5>{" "}
            : {obj[key]}
          </li>
        );
      }
    }
  }

  const handleResetAndClear = () => {
    settextLevelerData({
      grade: "",
      text: "",
    });
    setTextLeveler("");
    setError({});
  };

  const handleExample = () => {
    settextLevelerData((prevData) => ({
      ...prevData,
      grade: "Grade 11",
      text: `The Great Gatsby - Full Text
      Chapter 1
      My family have been prominent, well-to-do people in this middle-western city for three generations. The Carraways are something of a clan and we have a tradition that we're descended from the Dukes of Buccleuch, but the actual founder of my line was my grandfather's brother who came here in fifty-one, sent a substitute to the Civil War and started the wholesale hardware business that my father carries on today.
      I never saw this great-uncle but I'm supposed to look like him—with special reference to the rather hard-boiled painting that hangs in Father's office. I graduated from New Haven in 1915, just a quarter of a century after my father, and a little later I participated in that delayed Teutonic migration known as the Great War. I enjoyed the counter-raid so thoroughly that I came back restless. Instead of being the warm center of the world the middle-west now seemed like the ragged edge of the universe—so I decided to go east and learn the bond business. Everybody I knew was in the bond business so I supposed it could support one more single man. All my aunts and uncles talked it over as if they were choosing a prep-school for me and finally said, "Why—ye-es" with very grave, hesitant faces. Father agreed to finance me for a year and after various delays I came east, permanently, I thought, in the spring of twenty-two.
      The practical thing was to find rooms in the city but it was a warm season and I had just left a country of wide lawns and friendly trees, so when a young man at the office suggested that we take a house together in a commuting town it sounded like a great idea. He found the house, a weather beaten cardboard bungalow at eighty a month, but at the last minute the firm ordered him to Washington and I went out to the country alone. I had a dog, at least I had him for a few days until he ran away, and an old Dodge and a Finnish woman who made my bed and cooked breakfast and muttered Finnish wisdom to herself over the electric stove.
      It was lonely for a day or so until one morning some man, more recently arrived than I, stopped me on the road.
      "How do you get to West Egg village?" he asked helplessly.
      I told him. And as I walked on I was lonely no longer. I was a guide, a pathfinder, an original settler. He had casually conferred on me the freedom of the neighborhood.
      And so with the sunshine and the great bursts of leaves growing on the trees—just as things grow in fast movies—I had that familiar conviction that life was beginning over again with the summer.
      There was so much to read for one thing and so much fine health to be pulled down out of the young breath-giving air. I bought a dozen volumes on banking and credit and investment securities and they stood on my shelf in red and gold like new money from the mint, promising to unfold the shining secrets that only Midas and Morgan and Maecenas knew. And I had the high intention of reading many other books besides. I was rather literary in college—one year I wrote a series of very solemn and obvious editorials for the "Yale News"—and now I was going to bring back all such things into my life and become again that most limited of all specialists, the "well-rounded man." This isn't just an epigram—life is much more successfully looked at from a single window, after all.
    `,
    }));
    setFormDataShow(false)
    setFormShow(true)
  };

  const responsetoshow = textLeveler && Object.keys(textLeveler).length > 0 ?(
    <div ref={contentRef}>
      {
          Object.entries(textLeveler).map(([key, value]) => (
            <ul key={key}>
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:{"  "}</strong>
                {typeof value === 'object' ? (
                  <ul>
                    {Object.entries(value).map(([innerKey, innerValue]) => (
                      <li key={innerKey}>
                        <strong>{innerKey.charAt(0).toUpperCase() + innerKey.slice(1)}:</strong> {innerValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </li>
            </ul>
          ))}
    </div>
  ):"";

  return (
    <Layout>
      <div className=" mx-auto 3xl:px-[16.771vw]  2xl:px-[150px] xl:px-[100px] px-[20px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified isGenerate={loader} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);
                  handleResetAndClear();
                  setIsShowHide(false)
                } else {
                  setIsShowHide(false)
                  handleResetAndClear();
                }
              }}
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleExample()}
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
              <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg flex justify-between items-center xl:mb-[1.25vw] mb-[18px]">
                <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px]  text-[#1570EF] font-medium">
                   {AppTitle.textleveler}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Allows the content modification basing the grade (level) or skill of the individual.
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                          textLevelerData.grade
                            ? GRADE.find(
                                (ele) => ele.name == textLevelerData.grade
                              )
                            : null
                        }
                        onChange={(e) => {
                          settextLevelerData({
                            ...textLevelerData,
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
                      Original Text Passage:<span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-[7px] top-[10px]">
                          <i className="hexatoolmic "></i>
                        </div>
                        <InputTextarea
                          autoResize
                          placeholder="Comprehensions"
                          value={textLevelerData.text}
                          onChange={(e) => {
                            settextLevelerData({
                              ...textLevelerData,
                              text: e.target.value,
                            });
                            if (e.target.value) {
                              setError({ ...error, text: "" });
                            }
                          }}
                          rows={2}
                          className="w-full pl-8"
                        />
                        {error.text ? (
                          <span style={{ color: "red" }}>{error.text}</span>
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
              <Commonresponse
                title={`${AppTitle.textleveler}`}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                handleAction={() => {
                  setVisible(true), setIsExVisible(false);
                }}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={"/textleveler"}
              />
            )}
            {renderPopup()}
          </div>
         
        </div>

        <CommonActionExempler
          response={responsetoshow}
          setIsPopupVisible={setVisible}
          title={`Generated ${AppTitle.textleveler}`}
          contentRef={contentRef}
          onClose={() => setVisible(false)}
          setVisible={setVisible}
          position={"top"}
          visible={visible}
          isExVisible={isExVisible}
          appLink={"/textleveler"}
        />
      </div>
    </Layout>
  );
}
