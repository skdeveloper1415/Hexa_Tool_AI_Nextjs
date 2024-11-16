"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { toast } from "react-toastify";
import { useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import CommonActionExempler from "../../common/CommonActionExempler";
import Commonresponse from "../../common/commonResponse";
import { teamBuilderAPI } from "../../actions/teamBuilderApi";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from "../../common/useExceedAttemptsPopup";
import getIpAddress from "../../../components/helper/commonFunction";
import { AppCategory, AppId, AppTitle } from "../../../components/helper/enum";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {
  const [context, setContext] = useState("");
  const [NoOfParticipants, setNoOfParticipants] = useState("");
  const [setting, setSetting] = useState(null);
  const [materialRequirement, setMaterialRequirementLevel] = useState(null);
  const [assignment, setAssignment] = useState("");
  const [isActionvisible, setIsActionvisible] = useState(false);
  const [isExVisible, setIsExVisible] = useState(false);
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const contentRef = useRef(null);
  const [position, setPosition] = useState("center");
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const items = [{ label: `${AppTitle.teambuilder}`, url: "" }];
  const appId = AppId.teambuilder;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT;

  const [isShowHide, setIsShowHide] = useState(false);


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

  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const materialReq = [
    { name: "No Materials", code: "1" },
    { name: "Have material to use", code: "2" },
  ];

  const settings = [
    { name: "in-person", code: "1" },
    { name: "virtual", code: "2" },
  ];

  const response =assignment && Object.keys(assignment).length > 0 ? (
    <>
      <div ref={contentRef}>
        {formDataShow && (
          <div className="mb-[16px]">
            <div>
            <div className="text-[14px] font-semibold text-[#101828] mt-2 mb-[6px]">
                    Requirement : {assignment?.requirements}
                  </div>
              {assignment?.team_building_activities.map((activity, index) => (
                <div key={activity.option}>
                  <div className="text-[14px] font-semibold text-[#101828] mt-2 mb-[6px]">
                    Option {index + 1}: {activity.option}
                  </div>
                  <div className="text-[14px] font-semibold text-[#101828] mb-[4px]">
                    Instructions:
                  </div>
                  <div className="text-[14px] text-[#101828] mb-[4px]">
                    {" "}
                    {activity?.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  ):"";

  const validate = () => {
    let err = {};
    let isErr = false;
    if (setting === null) {
      err.setting = "Please Select Setting.";
      isErr = true;
    }
    if (materialRequirement === null) {
      err.materialRequirement = "Please Select Material Requirement.";
      isErr = true;
    }
    if (NoOfParticipants === "") {
      err.NoOfParticipants = "Please Enter Number Of Participants.";
      isErr = true;
    }
    if (context === "" || context.trim() === "") {
      err.context = "Please Enter Context.";
      isErr = true;
    }
    setError(err);
    return isErr;
  };

  const resetAndClear = () => {
    setNoOfParticipants("");
    setSetting(null);
    setContext("");
    setMaterialRequirementLevel(null);
    setFormShow(true);
    setIsExVisible(false);
    setError({});
    setFormDataShow(false);
    setIsShowHide(false);
  };

  const showExemplerPopup = (position) => {
    setPosition(position);
    setVisible(true);
    setIsPopupVisible(true);
  };

  const generateTeamBuilder = async (e) => {
    e.preventDefault();
    if (validate()) {
      return;
    }
    setLoader(true);

    try {
      const payload = {
        setting: setting?.code,
        material_required: materialRequirement?.code,
        no_participants: NoOfParticipants,
        text: context,
      };
      const response = await teamBuilderAPI(payload);

      if (response.data.code == "200") {
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false);
          return;
        }

        setAssignment(response?.data?.data?.data);
        setFormDataShow(true);
        setFormShow(false);
        setIsShowHide(true);
        setIsExVisible(true);
        setLoader(false);
      } else {
        const message =
          response?.message ?? response?.error ?? "Something went wrong";
        toast.error(message);
      }
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        const message = error?.message ?? "Something went wrong";
        toast.error(message);
      }
    }
  };

  const handleExample = () => {
    setSetting({ name: "in-person", code: "1" });
    setMaterialRequirementLevel({ name: "No Materials", code: "1" });
    setNoOfParticipants("25");
    setContext("Beginning of the year staff meeting ");
    setError({});

    setFormShow(true);
    setIsExVisible(false);
    setFormDataShow(false);
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
          <BackToAIModified isGenerate={loader}/>
          <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
              disabled={loader}
              onClick={resetAndClear}
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] lg:px-[10px] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
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
              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${
                loader == true ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
              <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg xl:mb-[1.25vw] mb-[18px]">
              <div className="xl:col-span-2">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium">
                   {AppTitle.teambuilder}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                Allows to make interactions in personal or virtual meetings, to cope up in groups & as a team.
                </p>
                </div>
                {
                    isShowHide && !loader ?
                    <button className='flex w-[225px] xl:w-[212px] 3xl:w-[12.854vw]  bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
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
                  <div className="h-[100px] flex justify-center">
                    <ProgressSpinner />{" "}
                  </div>
                ) : (
                  <form className="grid grid-cols-12 xl:gap-[1.25vw] gap-[18px]">
                    <div className="col-span-4">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Setting:<span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={setting}
                        onChange={(e) => {
                          setSetting(e.target.value);
                          if (e.target.value) {
                            setError({ ...error, setting: "" });
                          }
                        }}
                        filter
                        options={settings}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.setting ? (
                        <span style={{ color: "red" }}>{error.setting}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-span-4">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Materials Required:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <Dropdown
                        value={materialRequirement}
                        onChange={(e) => {
                          setMaterialRequirementLevel(e.target.value);
                          if (e.target.value) {
                            setError({ ...error, materialRequirement: "" });
                          }
                        }}
                        filter
                        options={materialReq}
                        optionLabel="name"
                        placeholder="Select"
                        className="w-full md:w-14rem"
                      />
                      {error.materialRequirement ? (
                        <span style={{ color: "red" }}>
                          {error.materialRequirement}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-span-4">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Number of Participants:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputText
                          type="number"
                          placeholder="Number of Participants"
                          value={NoOfParticipants}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value) && value >= 0) {
                              setNoOfParticipants(value);
                            }
                            if (e.target.value) {
                              setError({ ...error, NoOfParticipants: "" });
                            }
                          }}
                          className="w-full relative pl-[35px]"
                        />
                        {error.NoOfParticipants ? (
                          <span style={{ color: "red" }}>
                            {error.NoOfParticipants}
                          </span>
                        ) : (
                          <></>
                        )}
                        <div className="absolute top-[12px] left-[15px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        Additional Context:
                        <span className="text-[red] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <InputTextarea
                          placeholder="Additional Context"
                          value={context}
                          onChange={(e) => {
                            setContext(e.target.value);
                            if (e.target.value) {
                              setError({ ...error, context: "" });
                            }
                          }}
                          rows={5}
                          cols={5}
                          className="w-full relative pr-[40px]"
                        />
                        {error.context ? (
                          <span style={{ color: "red" }}>{error.context}</span>
                        ) : (
                          <></>
                        )}

                        <div className="absolute bottom-[25px] right-[29px] xl:right-[32px]">
                          <i className="hexatoolmic"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12">
                    <Note/>
                    </div>
                    <div className="col-span-12">
                      <button
                        className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                        onClick={(e) => {
                          generateTeamBuilder(e);
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
                title={`${AppTitle.teambuilder}`}
                handleAction={() => setIsActionvisible(true)}
                response={response}
                onHide={() => {
                  setFormDataShow(false);
                  setFormShow(true);
                }}
                setIsExVisible={setIsExVisible}
                contentRef={contentRef}
                url={process.env.NEXT_PUBLIC_BASE_URL + "/aiapps/teambuilder"}
              />
            )}
            {isPopupVisible && (
              <CommonActionExempler
                onClose={() => setIsPopupVisible(false)}
                setIsPopupVisible={setIsPopupVisible}
                position={position}
                visible={visible}
                isExVisible={isExVisible}
                setVisible={setIsActionvisible}
                contentRef={contentRef}
                title={`Example for ${AppTitle.teambuilder}`}
                response={response}
              />
            )}
          </div>
        
        </div>
      </div>
      {isActionvisible && (
        <CommonActionExempler
          title={`generated ${AppTitle.teambuilder}`}
          response={response}
          contentRef={contentRef}
          visible={isActionvisible}
          position={position}
          setVisible={setIsActionvisible}
          appLink={"/teambuilder"}
        />
      )}

      {renderPopup()}
    </Layout>
  );
}
