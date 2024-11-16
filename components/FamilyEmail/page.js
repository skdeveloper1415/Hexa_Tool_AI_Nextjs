"use client"
import { Dialog } from "primereact/dialog";
import Note from "../../app/common/Note";
import { AppTitle } from "../helper/enum";
import Image from "next/image";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Commonresponse from "../../app/common/commonResponse";
import CommonAction from "../commonAction";
import { getDataFromLocalStorage } from "../helper/commonFunction";
import { generateEmailFamily } from "../../app/actions/E-mailFamilyApi";
const FamilyEmail = ({ visible, onHide,setInstruction }) => {

  const contentRef = useRef(null);

  const [loader, setLoader] = useState(false);

  const [formDataShow, setFormDataShow] = useState(false);
  const [isShowHide, setIsShowHide] = useState(false);

  const [error, setError] = useState({});
  const [authorName, setAuthorName] = useState("");
  const [Content, setContent] = useState("");
  const [resultResponse, setResult] = useState({
    subject: "",
    content: "",
  });


  const validate = () => {
    let err = {};
    let isErr = false;
    if (authorName === "" || authorName.trim() === "") {
      err.authorName = "Please Enter Author Name. ";
      isErr = true;
    }
    if (Content === "" || Content.trim() === "") {
      err.Content = "Please Enter Content to include .";
      isErr = true;
    }
    setError(err);
    return isErr;
  };
  const handleGenerate = async () => {
    if (validate()) {
      return;
    }
    setLoader(true);
    try {
      let payload = {
        author: authorName,
        content: Content,
      };
      let response = await generateEmailFamily(payload);
      if (response?.data.code == 200) {
        // const attemptValid = handleClickAttempt();
        // if (!attemptValid) {
        //   setLoader(false);
        //   return;
        // }
        setResult({
          ...resultResponse,
          subject: response?.data?.data?.subject,
          content: response?.data?.data?.content,
        });
        setFormDataShow(true);
        // setVisibleRubricTable(true);
        // setShowExemplarButton(true);
        setIsShowHide(true);
      } else {
        console.log(response?.error);
        toast.error("Something Went Wrong");
      }
      setLoader(false);
    } catch (error) {
      if (error.message != 'Operation canceled by the user.') {
        setLoader(false);
        let msg = response?.error ?? response?.message ?? "Something went wrong";
        toast.error(msg);
      }
    }
  };

  const [isActionvisible, setIsActionvisible] = useState(false);

  const handleAction = () => {
    // setVisible(true)
    // setTitle(`Generated ${AppTitle.professionalEmail}`);
    setIsActionvisible(true);
  };
  const response = (
    resultResponse? 
    (
      <div ref={contentRef}>
      {resultResponse?.subject && (
        <h3>
          <b>Subject: </b>
          {resultResponse?.subject}
        </h3>
      )}
      {resultResponse?.content && (
        <h3>
          {resultResponse.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </h3>
      )}
    </div>
    ):(
      ""
    )
   
  );


  useEffect(()=>{
    let userInfo = getDataFromLocalStorage('user_data') ? JSON.parse(getDataFromLocalStorage('user_data')) : ''
    setAuthorName(userInfo?.name ?? "");
  },[])

  return (
    <Dialog className='custom-popup custom-popup1' visible={visible} style={{ width: '50vw' }} onHide={onHide}>

      <div>
        {!formDataShow && (
          <div>
            <div className="flex justify-between items-center gap-1">
              <div>
                <h3 className="3xl:text-[0.938vw] 2xl:text-[16px] text-[18px] text-[#101828] font-medium"> 
                  Start E-mail Family
                  {/* {AppTitle.EmailFamily} */}
                </h3>
                <p className="3xl:text-[0.625vw] text-[12px] text-[#344054] xl:mb-[1.25vw] mb-[18px]">
                  Generate a Professional e-mail communication to families
                  and translate into multiple languages.
                </p>
              </div>
              {
                isShowHide && !loader &&
                <button className='flex w-[191px] xl:w-[180px] 3xl:w-[12.854vw] bg-[#fff] 3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] rounded-lg  xl:py-[0.573vw] py-[11px] justify-center items-center'
                  onClick={() => {
                    setFormDataShow(true);
                  }}
                >
                  <Image width="20" height="20" className='mr-[8px]' src="/images/edit.svg" alt="Edit" />
                  Hide  Prompt
                </button>
              }
            </div>
            {loader ? (
              <div className="flex justify-center h-[300px] items-center">
                <ProgressSpinner />{" "}
              </div>
            ) : (
              <div>
                <form className="grid xl:gap-[1.25vw] gap-[18px]">
                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Author Name:
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <InputText
                      value={authorName}
                      placeholder="Type..."
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full"
                    />
                    {error.authorName ? (
                      <span style={{ color: "red" }}>
                        {error.authorName}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                      Content to include :
                      <span className="text-[red] ml-1">*</span>
                    </label>
                    <InputTextarea
                      autoResize
                      placeholder="Type..."
                      value={Content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      className="w-full"
                    />
                    {error.Content ? (
                      <span style={{ color: "red" }}>
                        {error.Content}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
                <Note />
                <div className="mt-[20px]">
                  <button
                    className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full"
                    onClick={() => {
                      handleGenerate();
                    }}
                  >
                    Generate with BrixAI
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {formDataShow && (
                <Commonresponse
                title={"Generating E-mail Family"}
                //   title={`Generating ${AppTitle.professionalEmail}`}
                  onHide={() => {
                    setFormDataShow(false);
                  }}
                  handleAction={handleAction}
                  response={response}
                  contentRef={contentRef}
                  handleEdit={()=>setFormDataShow(false)}
                  appLink={"/professionalEmail"}
                />
              )}

{/* {isActionvisible && (
        <CommonActionExempler
          title={`Generated ${AppTitle.professionalEmail}`}
          response={response}
          visible={isActionvisible}
          position={"top"}
          setVisible={setIsActionvisible}
          contentRef={contentRef}
          appLink={"/professionalEmail"}
        />
      )} */}


{/* {isActionvisible && (
          <CommonActionExempler
            contentRef={contentRef}
            onClose={() => {
              setIsActionvisible(false);
            }}
            setIsPopupVisible={setIsActionvisible}
            position={"center"}
            visible={isActionvisible}
            isExVisible={false}
            title={`${AppTitle.blogCreater}`}
            response={response}
            setVisible={setIsActionvisible}
            appLink={"/professionalEmail"}
          />
        )} */}

{isActionvisible && (
         <CommonAction
            title={`Generated ${AppTitle.professionalEmail}`}
            response={response}
            visible={isActionvisible}
            contentRef={contentRef}
            appLink={"/professionalEmail"}
            aiSocialStories={true}
            setVisible={setIsActionvisible}
            setDataEditor={setInstruction}
            onHide={() => {
             // setVisible1(false)
              setFormDataShow(false);
              // setFormShow(false);
              onHide()
              setIsActionvisible(false);
            }}
            // setBooleanValue={isActionVisible}        
          />
)}
      </div>

    </Dialog>
  );
}

export default FamilyEmail;