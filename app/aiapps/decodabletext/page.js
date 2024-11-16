"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { AppCategory, AppId, AppTitle, GRADE } from "../../../components/helper/enum";
import BackToAI from "../../../components/BackToAI";
import { ProgressSpinner } from "primereact/progressspinner";
import { generateSocialStories } from "../../actions/socialStories";
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import getIpAddress from "../../../components/helper/commonFunction";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import { toast } from "react-toastify";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";


export default function Index() {
  const [loader, setLoader] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(null);
  const items = [{ label: `${AppTitle.decodabletext}`, url: "" }];
  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const Values = [
    { name: "1 m/m/am", code: "1" },
    { name: "2 t/t/at, mat", code: "2" },
    { name: "s/s/sat", code: "3" },
    { name: "p/p/sat, tap", code: "4" },
    { name: "l/l/sit, tip", code: "5" },
    { name: "f/f/fit, if", code: "6" },
    { name: "n/n/nip, tin", code: "7" },
    { name: "o/o/on, pot", code: "8" },
    { name: "d/d/mad, dim", code: "9" },
    { name: "r/r/rat, rid", code: "10" },
    { name: "u/u/pup, sum", code: "11" },
    { name: "c/k/cod, cub", code: "12" },
    { name: "g/g/gut, dig", code: "13" },
    { name: "b/b/ban, bib", code: "14" },
    { name: "e/e/set, bed", code: "15" },
    { name: "h/h/hem, hip", code: "16" },
    { name: "l/l/lid, lag", code: "17" },
    { name: "k/k/kid, kin", code: "18" },
    { name: "j/j/jug, jam", code: "19" },
    { name: "w/w/wag, wit", code: "20" },
  ];
  const [formShow, setFormShow] = useState(true);
  const [isExVisible, setIsExVisible] = useState(false);
  const [exempler, setExempler] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [visible1, setVisible1] = useState(false);
  const [isActionvisible, setIsActionvisible] = useState(false);

  const contentRef = useRef(null);

  const appId = AppId.socialstories;
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
  ); // Change 3 to your desired maximum attempts

  const handleExample = () => {
    setGradeLevel({ name: "1 m/m/am", code: "1" });
    setError({});
    setFormShow(true);
    setVisible1(false);
    setFormDataShow(false);
  };
  const handleAction = () => {
    // setFormDataShow(true);
    setIsActionvisible(true);
  };

  const handleClear = () => {
    setGradeLevel("");
    setError({});
    setFormShow(true);
    setVisible1(false);
    setIsShowHide(false);
    setFormDataShow(false);
  };

  const validate = () => {
    let err = {};
    let isErr = false;
    if (!gradeLevel) {
      err.gradeLevel = "Please Select Objective/Pattern/Example Word";
      isErr = true;
    } else {
      err.gradeLevel = ""; // Clear the error message if there's input
    }
    setError(err);
    return isErr;
  };

  const [isShowHide, setIsShowHide] = useState(false);
  const [formDataShow, setFormDataShow] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    const payload = {
      grade: gradeLevel.code,
      text: "contentType",
    };
    try {
      setIsLoading(true);
      const response = await generateSocialStories(payload);
      if (response.data.code === 200 && response.data !== null) {
        setData(response.data.data.data);
        setFormDataShow(true);
        setIsShowHide(true);
        setFormShow(false);
        setVisible1(true);
        setIsExVisible(true);
        setIsLoading(false);
        setShowExemplarButton(true);
      } else {
        setIsLoading(false);
        toast.error(response.error || 'Something went wrong');
      }
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setIsLoading(false);
        toast.error(error || 'Something went wrong')
      }
    }
  };

  const responseData = (
    data && <> {Object.keys(data).map((key) => (
      <div key={key} className="mb-2">
        <span className="font-bold  ">{key} : </span>
        {Array.isArray(data[key]) ? (
          <div className="ml-3 mb-2">
            <ul >
              {data[key].map((item, index) => (
                <li key={index} className="m-1">{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <span> {data[key]}</span>
        )}
      </div>
    ))}</>
  );

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]">
        <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        />
        <div className="grid grid-cols-12 gap-2">
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
          <BackToAIModified isGenerate={isLoading} />
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false);
                  setFormShow(true);

                  handleClear();
                } else {
                  handleClear();
                }
              }}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
              onClick={handleExample}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${isLoading == true ? "opacity-50 cursor-not-allowed" : ""}`}
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
                    <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                 {AppTitle.decodabletext}
                    </h3>
                    <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                    Create a decodable text grounded in the principles of the Science of Reading to aid early literacy development.
                    </p>
                  </div>

                  {
                    isShowHide && !loader ?
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                      onClick={() => {
                        setVisible1(true)
                        setFormShow(false);
                      }}
                    >
                      <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                      Hide  Prompt
                    </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.support}</div>
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
                        Objective/Pattern/Example Word:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        filter
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.value)}
                        options={Values}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.gradeLevel ? (
                        <span style={{ color: "red" }}>{error.gradeLevel}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                  <Note/>
                    <div>
                      <button
                        onClick={handleGenerate}
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                      >
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>)}
              </>
            )}
            {visible1 && (
              <Commonresponse
                title={`${AppTitle.decodabletext}`}
                visible={visible1}
                onHide={() => {
                  setVisible1(false), setFormShow(true);
                }}
                handleAction={handleAction}
                setIsExVisible={setIsExVisible}
                response={responseData}
                contentRef={contentRef}
                appLink={"/socialstories"}
              />
            )}
          </div>
         
        </div>
      </div>
      {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.decodabletext}`}
          response={responseData}
          visible={isActionvisible}
          position={"center"}
          setVisible={setIsActionvisible}
          appLink={"/decodabletext"}
        />
      )}
      {renderPopup()}
    </Layout>
  );
}
