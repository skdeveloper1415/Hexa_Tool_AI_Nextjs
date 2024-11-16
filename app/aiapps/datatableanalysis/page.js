"use client";
import React, { useRef, useState, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Image from "next/image";
import { BreadCrumb } from 'primereact/breadcrumb';
import Layout from "../../../layouts/pagelayout";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { GRADE, AppId, AppTitle, AppCategory } from '../../../components/helper/enum'
import Commonresponse from "../../common/commonResponse";
import CommonActionExempler from "../../common/CommonActionExempler";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { generateDataTableAnalysisApi } from "../../actions/dataTableAnalysisApi";
import { printKeyValuePairs } from "../../../components/helper/printKeyValuePairs";
import BackToAI from "../../../components/BackToAI";
import useExceedAttemptsPopup from '../../common/useExceedAttemptsPopup';
import getIpAddress from "../../../components/helper/commonFunction";
import { NoDataMsg } from "../../common/NoDatamsg";
import Note from "../../common/Note";
import BackToAIModified from "../../../components/BackToAIModified";

export default function Index() {

  const contentRef = useRef(null);
  const [isExVisible, setIsExVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formShow, setFormShow] = useState(true);
  const [formDataShow, setFormDataShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dataTableAnalysis, setDataTableAnalysis] = useState('')
  console.log('dataTableAnalysis:', dataTableAnalysis);
  const [error, setError] = useState({})
  const [isShowHide, setIsShowHide] = useState(false);

  const [dataTableAnalysisData, setDataTableAnalysisData] = useState({
    grade: '',
    text: '',
  })
  const items = [
    { label: `${AppTitle.datatableanalysis}`, url: '' }
  ];

  const appId = AppId.datatableanalysis;
  const attempt = process.env.NEXT_PUBLIC_NO_OF_ATTEMPT

  const [ip, setIp] = useState("");

  useEffect(() => { const fetchIpAddress = async () => { const ip = await getIpAddress(); setIp(ip); }; fetchIpAddress(); }, []);

  const { handleClickAttempt, renderPopup } = useExceedAttemptsPopup(attempt, ip, appId); // Change 3 to your desired maximum attempts

  const home = { label: "BrixAI Apps", url: "/aiapps" };

  const validate = () => {
    let err = {}
    let isErr = false;
    if (!dataTableAnalysisData.grade) {
      err.grade = 'Please Select Grade'
      isErr = true
    }
    if (!dataTableAnalysisData.text || dataTableAnalysisData.text.trim() === "") {
      err.text = 'Please Enter Criteria For Data Table'
      isErr = true
    }
    setError(err)
    return isErr
  }

  const HandleGenerate = async (e) => {
    e.preventDefault()
    if (validate()) {
      return
    }
    setLoader(true)
    try {
      const body = {
        grade: dataTableAnalysisData.grade ? dataTableAnalysisData.grade : '',
        text: dataTableAnalysisData.text ? dataTableAnalysisData.text : '',
      }
      const response = await generateDataTableAnalysisApi(body)
      if (response.data.code == '200') {
        // Halt form submission if attempts exceeded
        const attemptValid = handleClickAttempt();
        if (!attemptValid) {
          setLoader(false)
          return;
        }
        const dataArray = [];
        Object.entries(response?.data?.data?.data).forEach(([key, name]) => {
          dataArray.push({ key, name });
        });
        setDataTableAnalysis(dataArray)
        setFormDataShow(true)
        setFormShow(false)
        setIsShowHide(true);

      } else {
        console.log(response?.error);
        toast.error('Something went wrong.');
      }
      setLoader(false)
    } catch (error) {
      if(error.message!='Operation canceled by the user.'){
        setLoader(false)
        toast.error('Something went wrong.');
      }
    }
  }
const [val, setVal] = useState();
  const handleExample = () => {
    setDataTableAnalysisData({
      grade: "Grade 10",
      text: 'The top 5 fruits with the most calories with fruit in one column and calories in the other'
    });
    setVal({ name: "Grade 10", code: "12" })
    setError({})
    setFormDataShow(false)
    setFormShow(true)
  };


  // const handleResetAndClear = () => {
  //   setDataTableAnalysisData(
  //     {
  //       grade: '',
  //       text: ''
  //     }
  //   )
  //   setDataTableAnalysis('')
  //   setError({})
  // }

  const responsetoshow = (
    <>
      {dataTableAnalysis?.length > 0 ? (
        <div ref={contentRef}>
          <div className="">
            <div>
              <p className="font-[500] text-[16px]">{dataTableAnalysis[0]?.key}:</p>
            </div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Calories</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(dataTableAnalysis[0]?.name) ? (
                  dataTableAnalysis[0]?.name?.map(item => (
                    <tr key={item?.id}>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{item?.name}</td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>{item?.calories}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{dataTableAnalysis[0]?.name?.name}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{dataTableAnalysis[0]?.name?.calories}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-5">
              <p className="font-[500] text-[16px]">{dataTableAnalysis[1]?.key}:</p>
              <p>{dataTableAnalysis[1]?.name}</p>
            </div>
          </div>
        </div>
      ) : (
        <NoDataMsg />
      )}
    </>
  );
  


  const handleClear = () => {
    setFormShow(true);
    setIsShowHide(false);
    setFormDataShow(false);
    setDataTableAnalysisData({
      grade: '',
    text: '',
    })
  };


  return (
    <Layout>
      <div className="mx-auto 3xl:px-[2.771vw] 2xl:px-[60px] xl:px-[70px] px-[80px]">
        <BreadCrumb className='custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]' model={items} home={home} />
        <div className='grid grid-cols-12 gap-2'>
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
        <BackToAIModified isGenerate={loader}/>
        <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
            <button disabled={loader} className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full mb-[32px] xl:mb-[1.667vw] items-center ${loader == true ? "opacity-50 cursor-not-allowed" : "" }`}

              onClick={() => {
                if (formDataShow) {
                  setFormDataShow(false)
                  setFormShow(true)
                  handleClear();
                } else {
                  handleClear();
                }
                //   handleResetAndClear()
                // } else {
                //   handleResetAndClear()
                // }
              }}>
              <Image width="20" height="20" className='mr-[8px]' src="/images/resetclear.svg" alt="Reset and clear" />
              Reset and Clear
            </button>
            <button className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center w-full items-center ${loader == true ? "opacity-50 cursor-not-allowed" : "" }`}
              // onClick={() => { setIsExVisible(true), setVisible(true) }}
              // disabled={!dataTableAnalysis || loader}
              onClick={handleExample}

            >
              <Image width="20" height="20" className='mr-[8px]' src="/images/exemplar.svg" alt="Example" />
              Try New
            </button>
          </div>
        </div>
          <div className='xl:col-span-10 lg:col-span-10 col-span-12 bg-[#fff] border border-[#E4E7EC] xl:p-[1.25vw] p-[10px] xl:mx-[3.51vw] lg:mx-[40px] mx-0 rounded-lg shadow-lg'>
            {formShow &&
              <>
               <div className="flex justify-between items-center bg-[#F2F4F7] xl:px-[0.833vw] px-[16px] xl:py-[0.417vw] py-[8px] rounded-lg xl:mb-[1.25vw] mb-[18px]">
               <div className="xl:col-span-2">
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[14px] text-[#1570EF] font-medium"> {AppTitle.datatableanalysis}</h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">Generates tables for analysis of data of individual choice.</p>
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
                                        </button>:<div className="3xl:text-[0.938vw] 2xl:text-[16px] text-[12px] font-medium mb-10">Category: {AppCategory.Planning}</div>
                                    }
                                </div>
                {loader ? <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div>
                  : <form className="grid xl:gap-[1.25vw] gap-[18px]">
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Grade Level:<span className="text-[red] ml-1">*</span></label>
                      <Dropdown filter value={dataTableAnalysisData.grade ? GRADE.find((ele) => ele.name == dataTableAnalysisData.grade) : null} onChange={(e) => {
                        setDataTableAnalysisData({ ...dataTableAnalysisData, grade: e.value.name })
                        if (e.target.value) {
                          setError({ ...error, grade: '' })
                        }
                      }} options={GRADE} optionLabel="name"
                        placeholder="Select" className="w-full md:w-14rem" />
                      {error.grade ? <span style={{ color: 'red' }}>{error.grade}</span> : <></>}
                    </div>
                    <div>
                      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">Criteria For Data Table:<span className="text-[red] ml-1">*</span></label>
                      <div className="relative">
                        <div className="absolute left-[7px] top-[10px]">
                          <i className="hexatoolmic "></i>
                        </div>
                        <InputTextarea autoResize placeholder="The top 5 fruits the most calories with fruit in one column and calories in the other " value={dataTableAnalysisData.text} onChange={(e) => {
                          setDataTableAnalysisData({ ...dataTableAnalysisData, text: e.target.value })
                          if (e.target.value) {
                            setError({ ...error, text: '' })
                          }
                        }} rows={2} className="w-full pl-8" />
                        {error.text ? <span style={{ color: 'red' }}>{error.text}</span> : <></>}
                      </div>
                    </div>
                    <Note/>
                    <div>
                      <button className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full'
                        onClick={(e) => {
                          HandleGenerate(e);
                          // setFormDataShow(true)
                          // setFormShow(false)
                        }}>
                        Generate with BrixAI
                      </button>
                    </div>
                  </form>
                }
              </>
            }
            {formDataShow &&
              <Commonresponse
                title={`${AppTitle.datatableanalysis}`}
                onHide={() => {
                  setFormDataShow(false)
                  setFormShow(true)
                }}
                handleAction={() => { setVisible(true), setIsExVisible(false) }}
                response={responsetoshow}
                contentRef={contentRef}
                appLink={'/datatableanalysis'}

              />
            }
          </div>
         
        </div>

        <CommonActionExempler
          response={responsetoshow}
          setIsPopupVisible={setVisible}
          title={`Generated ${AppTitle.datatableanalysis}`}
          contentRef={contentRef}
          onClose={() => setVisible(false)}
          setVisible={setVisible}
          position={"top"}
          visible={visible}
          isExVisible={isExVisible}
          appLink={'/datatableanalysis'}
        />
      </div>
      {renderPopup()}
    </Layout>
  );
}
