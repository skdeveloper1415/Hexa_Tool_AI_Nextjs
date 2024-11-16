import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import useDrivePicker from "react-google-drive-picker";
import { getDataFromLocalStorage } from "./helper/commonFunction";
import { createFormApi } from "../app/actions/createFrom/createForm";
import { toast } from "react-toastify";
import { Checkbox } from "primereact/checkbox";
import Image from "next/image";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { RadioButton } from "primereact/radiobutton";
import { ScrollPanel } from 'primereact/scrollpanel';


function AITools(props) {
  const [openPicker] = useDrivePicker();
  const [youtubeLinkVisibility, setYoutubeLinkVisibility] = useState(false);
  const [simpleLinkVisibility, setSimpleLinkVisibility] = useState(false);
  const [error, setError] = useState("");
  const [youtubeUrl, setyoutubeUrl] = useState('');
  const [addLinkUrl, setAddLinkUrl] = useState("");
  const [googleFormURL, setgoogleFormURL] = useState({
    formURL:''
  });
  const { quizAssignmentAttachment, attachmentLinks, queAttachbyID, tabId } =
    props;
  const [ingredients, setIngredients] = useState([]);
  const [visible, setVisible] = useState(false);
  const [qusans, setQusans] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isbuttondisable, setisbuttondisable] = useState(true)
  const cities = [
    { name: "100", code: "NY" },
    { name: "Ungraded", code: "RM" },
  ];
  const cities2 = [
    { name: "Assigned", code: "NY" },
    { name: "Graded", code: "RM" },
    { name: "Turned in", code: "LM" },
  ];
  const [ingredient, setIngredient] = useState("");
  const [value, setValue] = useState("");

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  const [googleDriveFile, setGoogleDriveFile] = useState({
    fileUrlType: "",
    fileUrl: "",
    docs: "",
  });
  const [fileAndType, setFileAndType] = useState({
    fileUrlType: "youtube_link",
    fileUrl: "",
    docs: "",
  });

  const [linkAndType, setLinkAndType] = useState({
    fileUrlType: "",
    fileUrl: "",
    docs: "",
  });

  useEffect(() => {
    if (quizAssignmentAttachment) {
      setLinks(quizAssignmentAttachment);
    } else if (attachmentLinks) {
      setLinks(attachmentLinks);
    } else if (queAttachbyID) {
      setLinks(queAttachbyID);
    }
  }, [quizAssignmentAttachment, attachmentLinks, queAttachbyID]);

  const setLinks = (data) => {
    data?.map((item) => {
      if (item?.youtubeVideo) {
        setyoutubeUrl(item?.youtubeVideo?.alternateLink);
      } else if (item?.link) {
        setAddLinkUrl(item?.link?.url);
      }
    });
  };

  const updateOrAddLink = (prevLinks, newLink) => {
    if (!Array.isArray(prevLinks)) {
      prevLinks = [];
    }
    const existingIndex = prevLinks.findIndex(
      (link) => link.fileType === newLink.fileType
    );
    if (existingIndex !== -1) {
      const updatedLinks = [...prevLinks];
      updatedLinks[existingIndex] = newLink;
      return updatedLinks;
    } else {
      return [...prevLinks, newLink];
    }
  };

  const validation = () => {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]+)/;
    let flag = false;
    if (!fileAndType.fileUrl || fileAndType.fileUrl == "") {
      setError("Please Enter Link");
      flag = true;
    }
    if (!fileAndType.fileUrl.match(youtubeRegex)) {
      setError("Please Enter Valid You Tube Link");
      flag = true;
    }
    if (!fileAndType.fileUrl.match(/^https:\/\/.*/)) {
      setError("Please Enter Valid You Tube Link");
      flag = true;
    }
    return flag;
  };

  const handleAddLink = () => {
    if (validation()) {
      return;
    }
    setyoutubeUrl(fileAndType?.fileUrl);
    setSimpleLinkVisibility(false);
    setYoutubeLinkVisibility(false);
    setError("");
    setFileAndType({
      fileUrlType: "youtube_link",
      fileUrl: "",
      docs: "",
    });
    const newLink = {
      fileType: "youtube_link", // google_drive, simple_link, youtube_link
      fileUrl: fileAndType?.fileUrl,
    };
    props.setMaterialLinks((prevLinks) => updateOrAddLink(prevLinks, newLink));
  };
  const validateUrl = (url) => {
    const urlRegex = /^(https?:\/\/)?([\w.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;
    let flag = false;
    if (!linkAndType.fileUrl || linkAndType.fileUrl == "") {
      setError("Please Enter Link");
      flag = true;
    }
    if (!linkAndType.fileUrl.match(urlRegex)) {
      setError("Please Enter Valid You Tube Link");
      flag = true;
    }
    if (!linkAndType.fileUrl.match(/^https:\/\/.*/)) {
      setError("Please Enter Valid You Tube Link");
      flag = true;
    }
    return flag;
  };

  const handlelink = () => {
    if (validateUrl()) {
      return;
    }
    setAddLinkUrl(linkAndType.fileUrl);
    setSimpleLinkVisibility(false);
    setError("");
    setLinkAndType({
      fileUrlType: "simple_link",
      fileUrl: "",
      docs: "",
    });

    const newLink = {
      fileType: "simple_link", // google_drive, simple_link, youtube_link
      fileUrl: linkAndType?.fileUrl,
    };

    props.setMaterialLinks((prevLinks) => updateOrAddLink(prevLinks, newLink));
  };

  const handleSimpleLink = () => {
    setSimpleLinkVisibility(!simpleLinkVisibility);
  };

  const handleYoutubeLink = () => {
    setYoutubeLinkVisibility(!youtubeLinkVisibility);
  };

  const handleGooglePicker = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_DEVELOPER_LEY,
      viewId: "DOCS",
      token: getDataFromLocalStorage("access_token"),
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      callbackFunction: (data) => {
        if (data.action === "picked") {
          setGoogleDriveFile({
            fileUrlType: "google_drive",
            fileUrl: data.docs[0].url,
            docs: data.docs[0],
          });

          const newLink = {
            fileType: "google_drive", // google_drive, simple_link, youtube_link
            fileUrl: data.docs[0].url,
          };
          props.setMaterialLinks((prevLinks) =>
            updateOrAddLink(prevLinks, newLink)
          );

          if (props.type == "Post") {
            props.setfileType({
              fileUrlType: "google_drive",
              fileUrl: data.docs[0].url,
              docs: data.docs[0],
            });
          }
        } else {
          setGoogleDriveFile({
            fileUrlType: "",
            fileUrl: "",
            docs: "",
          });
        }
      },
    });
  };
  useEffect(() => {
    if(props?.isGoogleFormCreated){
        handleGoogleForm()
    }
  }, [props?.isGoogleFormCreated])
  
  const handleGoogleForm = async () => {
    try {
      let accessToken = getDataFromLocalStorage("access_token");
      const payload = {
        accessToken: accessToken,
        formTitle: props.title ? props.title : "New title ",
        documentTitle: props.documentTitle
          ? props.documentTitle
          : "documentTitle",
        questions: props?.question?.length
          ? props?.question.map((ele) => {
              return {
                required: true,
                title: ele.question,
                options: Object.values(ele.options).map((value) => value),
              };
            })
          : [],
      };
      const response = await createFormApi(payload);
      if (response.code === 200) {
        // setVisible(true)
        // setSimpleLinkVisibility(true);
        // setLinkAndType({
        //   fileUrlType: "simple_link",
        //   fileUrl: response.data.data?.formURL,
        //   docs: "",
        // });
        // const newLink = {
        //     fileType: "simple_link", // google_drive, simple_link, youtube_link
        //     fileUrl:  response.data.data?.formURL,
        // };
        // props.setMaterialLinks(prevLinks => updateOrAddLink(prevLinks, newLink));
        setgoogleFormURL(response.data);
        const newLink = {
            fileType: "simple_link", // google_drive, simple_link, youtube_link
            fileUrl: response.data?.formURL,
          };
      
          props.setMaterialLinks((prevLinks) => updateOrAddLink(prevLinks, newLink));
        props?.setLoading(false)
        props?.setisGoogleFormCreated(false)
        console.log("response", response);
      } else {
        toast.error("something went wrong");
      }
    } catch (e) {
      console.log("e", e);
      toast.error("something went wrong");
    }
  };
  console.log("tabId", tabId);
  console.log("googleFormURL", googleFormURL);

  const handleGoogleForms = ()=>{
    const newLink = {
        fileType: "simple_link", // google_drive, simple_link, youtube_link
        fileUrl: googleFormURL?.formURL,
      };
  
      props.setMaterialLinks((prevLinks) => updateOrAddLink(prevLinks, newLink));
      setVisible(false)
      setisbuttondisable(false)
  }
  const copyToClipboard = () => {
    console.log('googleFormURL?.formURL', googleFormURL?.formURL)
    navigator.clipboard.writeText(googleFormURL?.formURL).then(
      () => {
        toast.success('Link copied!');
      },
      (err) => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy:!');
      }
    );
  };
  console.log('props?.materials', props?.materials)
  return (
    <>
      <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
        Tools
      </label>
      <div className="flex flex-wrap xl:gap-[0.26vw] gap-[5px]">
        {/* <span
          className="flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center cursor-pointer customicon"
          onClick={() => handleGooglePicker()}
        >
          <i className="hexatoolcamera-outline"></i>
        </span> */}
        <span
          className="flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center cursor-pointer customicon"
          onClick={() => handleGooglePicker()}
        >
          <i className="hexatoolgoogle-drive"></i>
        </span>
        <span
          className="flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center cursor-pointer customicon"
          onClick={() => handleYoutubeLink()}
        >
          <i className=" pi pi-youtube"></i>
        </span>
        {/* <span
          className="flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center cursor-pointer"
          onClick={() => handleGooglePicker()}
        >
          <i className="hexatoolupload-file"></i>
        </span> */}
        <span
          className="flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center cursor-pointer"
          onClick={() => handleSimpleLink()}
        >
          <i className="hexatoolfile-atteched"></i>
        </span>
     {/* { tabId == "2" &&   <span
          className={`flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center 
             ${
              props.isFormIconDisable ? "cursor-not-allowed" : "cursor-pointer"
            }
              customicon`}
          onClick={() => {
            !props.isFormIconDisable && 
            handleGoogleForm();
          }}
        >
          <i className="hexatoolcopy-link"></i>
        </span>}
       <span
          className={`flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center  ${
            isbuttondisable ? "cursor-not-allowed" : "cursor-pointer"
            } customicon`}
          onClick={() => setQusans(true)}
        >
          <i className="hexatoolcopy-link"></i>
        </span> */}
        {/* {tabId == "2" && (
          <span
            className={`flex xl:w-[3.438vw] w-[48px] xl:h-[3.438vw] h-[48px] 3xl:text-[1.563vw] 2xl:text-[24px] text-[24px] text-[#FFF] border border-[#FFF] bg-[#1570EF] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center ${
              props.isFormIconDisable ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              !props.isFormIconDisable && handleGoogleForm();
            }}
          >
            <i className="pi pi-plus"></i>
          </span>
        )} */}
      </div>

      {/* {youtubeUrl !== "" && (
        <div className="w-full">
          <ul>
            <li>
              {youtubeUrl ? (
                <strong className="text-[#1570ef]">
                  {fileAndType.fileUrlType.replace(/_/g, " ").toUpperCase()}
                </strong>
              ) : null}
              <br />
              <div style={{ display: "flex" }}>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {youtubeUrl}
                </a>
                {youtubeUrl ? (
                  <span
                    style={{
                      color: "red",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setyoutubeUrl("")}
                  >
                    <i className="pi pi-times"></i>
                  </span>
                ) : null}
              </div>
            </li>
          </ul>
        </div>
      )} */}
      {/* {googleDriveFile.fileUrl !== "" && (
        <div className="w-full">
          <ul>
            <li>
              <strong className="text-[#1570ef]">
                {googleDriveFile.fileUrlType.replace(/_/g, " ").toUpperCase()}
              </strong>
              <br />
              <div style={{ display: "flex" }}>
                <a
                  href={googleDriveFile.fileUrl}
                  target="_blank"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {googleDriveFile.fileUrl}
                </a>
                <span
                  style={{
                    color: "red",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setGoogleDriveFile({
                      fileUrlType: "",
                      fileUrl: "",
                      docs: "",
                    })
                  }
                >
                  <i className="pi pi-times"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      )} */}


      {/* {googleFormURL?.formURL && (
                <div className='w-full'>
                    <ul>
                        <li>
                            <strong className='text-[#1570ef]'>
                                GOOGLE FORM LINK
                            </strong>
                            <br />
                            <div style={{ display: 'flex' }}>

                                <a href={googleFormURL?.formURL} target="_blank"
                                    style={{ color: 'blue', textDecoration: 'underline', wordWrap: 'break-word', maxWidth: '100%' }}
                                >{googleFormURL?.formURL}</a>
                                <span style={{ color: 'red', marginRight: '5px', cursor: 'pointer' }} onClick={() => setgoogleFormURL({
                                })} >
                                    <i className='pi pi-times'></i>

                                </span>
                            </div>
                        </li>
                    </ul>

                </div>
            )} */}
      {/* {addLinkUrl !== "" && (
        <div className="w-full mt-4">
          <ul>
            <li>
              <strong className="text-[#1570ef]">
                {linkAndType.fileUrlType.replace(/_/g, " ").toUpperCase() ||
                  "Simple Link"}
              </strong>
              <br />
              <div style={{ display: "flex" }}>
                <a
                  href={addLinkUrl}
                  target="_blank"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {addLinkUrl}
                </a>
                <span
                  style={{
                    color: "red",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setAddLinkUrl("")}
                >
                  <i className="pi pi-times"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      )} */}

       { googleDriveFile.fileUrl !== "" && <div className="bg-[#F9FAFB] rounded-[12px] 3xl:rounded-[0.625vw] px-[12px] 3xl:px-[0.625vw] py-[8px] 3xl:py-[0.417vw] flex items-center justify-between w-full mt-[10px]">
            <div className="text-[#1570ef] text-[12px] 3xl:text-[0.645vw]">
              Google Drive : 
              <a
                  href={googleDriveFile?.fileUrl}
                  target="_blank"
                  style={{
                    color: "#1570ef",
                    // textDecoration: "underline",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {`${googleDriveFile?.fileUrl?.slice(0,33)}...`}
                </a>
            </div>
            <div className="col flex items-center space-x-[10px] 3xl:space-x-[0.521vw]">
              <Link href={googleDriveFile?.fileUrl}  target="_blank">
                <Image
                  className="w-[24px] h-[24px]"
                  width="24"
                  height="24"
                  src="/images/eye-bold.svg"
                  alt="eye"
                />
              </Link>
              <Link href={""} onClick={() => {setGoogleDriveFile({
                      fileUrlType: "",
                      fileUrl: "",
                      docs: "",
                    });props?.setMaterialLinks(props?.materials.filter((ele)=>ele?.fileType!="google_drive"))}}>
                <Image
                  className="w-[16px] h-[16px]"
                  width="16"
                  height="16"
                  src="/images/delete.svg"
                  alt="eye"
                />
              </Link>
            </div>
          </div>}
       { addLinkUrl !== "" && <div className="bg-[#F9FAFB] rounded-[12px] 3xl:rounded-[0.625vw] px-[12px] 3xl:px-[0.625vw] py-[8px] 3xl:py-[0.417vw] flex items-center justify-between w-full mt-[10px]">
            <div className="text-[#1570ef] text-[15px] 3xl:text-[0.645vw]">
             Simple Link : 
            <a
                  href={addLinkUrl}
                  target="_blank"
                  style={{
                    color: "#1570ef",
                    // textDecoration: "underline",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {`${addLinkUrl?.slice(0,33)}...`}
                </a>
            </div>
            <div className="col flex items-center space-x-[10px] 3xl:space-x-[0.521vw]">
              <Link href={addLinkUrl}  target="_blank">
                <Image
                  className="w-[24px] h-[24px]"
                  width="24"
                  height="24"
                  src="/images/eye-bold.svg"
                  alt="eye"
                />
              </Link>
              <Link href={""} onClick={() => {setAddLinkUrl("");props?.setMaterialLinks(props?.materials.filter((ele)=>ele?.fileType!="simple_link"))}}>
                <Image
                  className="w-[16px] h-[16px]"
                  width="16"
                  height="16"
                  src="/images/delete.svg"
                  alt="eye"
                />
              </Link>
            </div>
          </div>}
       { youtubeUrl !== "" && <div className="bg-[#F9FAFB] rounded-[12px] 3xl:rounded-[0.625vw] px-[12px] 3xl:px-[0.625vw] py-[8px] 3xl:py-[0.417vw] flex items-center justify-between w-full mt-[10px]">
            <div className="text-[#1570ef] text-[12px] 3xl:text-[0.645vw]">
              Youtube Link : 
              <a
                  href={youtubeUrl}
                  target="_blank"
                  style={{
                    color: "#1570ef",
                    // textDecoration: "underline",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {`${youtubeUrl?.slice(0,33)}...`}
                </a>
            </div>
            <div className="col flex items-center space-x-[10px] 3xl:space-x-[0.521vw]">
              <Link href={youtubeUrl}  target="_blank">
                <Image
                  className="w-[24px] h-[24px]"
                  width="24"
                  height="24"
                  src="/images/eye-bold.svg"
                  alt="eye"
                />
              </Link>
              <Link href={""} onClick={() => {setyoutubeUrl("");props?.setMaterialLinks(props?.materials.filter((ele)=>ele?.fileType!="youtube_link"))}}>
                <Image
                  className="w-[16px] h-[16px]"
                  width="16"
                  height="16"
                  src="/images/delete.svg"
                  alt="eye"
                />
              </Link>
            </div>
          </div>}
       { googleFormURL?.formURL !== "" && <div className="bg-[#F9FAFB] rounded-[12px] 3xl:rounded-[0.625vw] px-[12px] 3xl:px-[0.625vw] py-[8px] 3xl:py-[0.417vw] flex items-center justify-between w-full mt-[10px]">
            <div className="text-[#1570ef] text-[12px] 3xl:text-[0.645vw]">
              Simple Link : 
              <a
                  href={googleFormURL?.formURL}
                  target="_blank"
                  style={{
                    color: "#1570ef",
                    // textDecoration: "underline",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {`${googleFormURL?.formURL?.slice(0,33)}...`}
                </a>
            </div>
            <div className="col flex items-center space-x-[10px] 3xl:space-x-[0.521vw]">
              <Link href={googleFormURL?.formURL}  target="_blank">
                <Image
                  className="w-[24px] h-[24px]"
                  width="24"
                  height="24"
                  src="/images/eye-bold.svg"
                  alt="eye"
                />
              </Link>
              <Link href={""} onClick={() => {setgoogleFormURL({formURL:''});props?.setMaterialLinks(props?.materials.filter((ele)=>ele?.fileType!="simple_link"))}}>
                <Image
                  className="w-[16px] h-[16px]"
                  width="16"
                  height="16"
                  src="/images/delete.svg"
                  alt="eye"
                />
              </Link>
            </div>
          </div>}

      <Dialog
        className="custom-popup w-[800px]  "
        header=""
        visible={youtubeLinkVisibility}
        style={{ width: "50vw" }}
        onHide={() => {
          setYoutubeLinkVisibility(false);
          setError(false);
        }}
      >
        <div className="p-[15px] xl:p-[15px] 2xl:p-[0.781vw]">
          <p>Add Youtube Link</p>
          <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
              Youtube Link :<span className="text-[red]">*</span>
            </label>
            <div className="flex gap-[8px]">
              <InputText
                type="text"
                className="w-full"
                placeholder="Please Enter Youtube Link"
                onChange={(e) => {
                  setFileAndType({
                    fileUrlType: "youtube_link",
                    fileUrl: e.target.value,
                    docs: "",
                  });
                }}
              />
            </div>
            {error ? <span style={{ color: "red" }}>{error}</span> : <></>}
          </div>
          <div className="flex  gap-[12px] justify-end pt-[30px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
            <Link
              onClick={() => {
                //    setFileAndType({
                //         "fileUrlType": "",
                //         "fileUrl": "",
                //         "docs": ""
                //     })
                setYoutubeLinkVisibility(false);
                setError(false);
              }}
              href=""
              className="flex justify-center items-center border px-[18px] py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[20px] xl:text-[1.04vw] font-medium"
            >
              Cancel
            </Link>
            <button
              onClick={() => {
                handleAddLink();
              }}
              href=""
              className="flex justify-center text-[#fff] bg-[#1570EF] items-center border px-[18px] py-[10px] border-[#1570EF] rounded-lg shadow1 text-[20px] xl:text-[1.04vw] font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog
        className="custom-popup w-[800px]  "
        header=""
        visible={simpleLinkVisibility}
        style={{ width: "50vw" }}
        onHide={() => {
          setSimpleLinkVisibility(false);
          setError(false);
        }}
      >
        <div className="p-[15px] xl:p-[15px] 2xl:p-[0.781vw]">
          <p>Add Link</p>
          <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
              Link :<span className="text-[red]">*</span>
            </label>
            <div className="flex gap-[8px]">
              <InputText
                value={linkAndType?.fileUrl}
                type="text"
                className="w-full"
                placeholder="Please Enter Link"
                onChange={(e) => {
                  setLinkAndType({
                    fileUrlType: "simple_link",
                    fileUrl: e.target.value,
                    docs: "",
                  });
                }}
              />
            </div>
            {error ? <span style={{ color: "red" }}>{error}</span> : <></>}
          </div>
          <div className="flex  gap-[12px] justify-end pt-[30px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
            <Link
              onClick={() => {
                //    setFileAndType({
                //         "fileUrlType": "",
                //         "fileUrl": "",
                //         "docs": ""
                //     })
                setSimpleLinkVisibility(false);
                setError(false);
              }}
              href=""
              className="flex justify-center items-center border px-[18px] py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[20px] xl:text-[1.04vw] font-medium"
            >
              Cancel
            </Link>
            <button
              onClick={() => {
                handlelink();
              }}
              className="flex justify-center text-[#fff] bg-[#1570EF] items-center border px-[18px] py-[10px] border-[#1570EF] rounded-lg shadow1 text-[20px] xl:text-[1.04vw] font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
      value={googleFormURL?.formURL}
        visible={visible}
        className="custDialog headerHide w-[542px] 3xl:w-[28.229vw]"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="row">
          <div className="text-[#101828] text-[18px] 3xl:text-[0.938vw] font-medium text-center">
            Generate Link
          </div>
          <div className="mt-[32px] 3xl:mt-[1.667vw]">
            <div className="text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium mb-[6px] 3xl:mb-[0.313vw]">
              LINK
            </div>
            <di v className="flex items-center gap-[4px] 3xl:gap-[0.208vw]">
              <div className= "break-words bg-[#F2F4F7] w-full shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#C6CBD2] rounded-[8px] 3xl:rounded-[0.417vw] px-[14px] 3xl:px-[0.729vw] py-[10px] 3xl:py-[0.521vw] text-[16px] 3xl:text-[0.833vw] text-[#344054]">
                {/* Https://forms.gle/mkDXtShvQHitH1AQi6 */}
                {googleFormURL?.formURL}

              </div>
              <div className="col">
                <Link href={""} onClick={()=>copyToClipboard()}>
                  <Image
                    className="w-[30px] h-[30px]"
                    width="30"
                    height="30"
                    src="/images/link-copy.svg"
                    alt="Link"
                  />
                </Link>
              </div>
            </di>
            <div className="mt-[3px] 3xl:mt-[0.156vw] flex items-center gap-[8px] 3xl:gap-[0.417vw]">
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient1"
                  className="CustomCheckBox"
                  name="pizza"
                  value="Cheese"
                  onChange={onIngredientsChange}
                  checked={ingredients.includes("Cheese")}
                />
                <label
                  htmlFor="ingredient1"
                  className="ml-2 text-[#667085] text-[16px] 3xl:text-[0.833vw]"
                >
                  Shorter URL
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center mt-[32px] 3xl:mt-[1.667vw] gap-[12px] 3xl:gap-[0.625vw]">
              <div className="col">
                <Link
                  href={""}
                  className="inline-block shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white border border-[#C6CBD2] rounded-[8px] 3xl:rounded-[0.417vw] text-[#344054] text-[16px] 3xl:text-[0.833vw] py-[10px] 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw]"
                  onClick={() => {setVisible(false); setgoogleFormURL({formURL:''});setisbuttondisable(true)}}
                >
                  Cancel
                </Link>
              </div>
              <div className="col">
                <Link
                  href={""}
                  onClick={()=>{handleGoogleForms()}}
                  className="inline-block shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#1570EF] border border-[#1570EF] rounded-[8px] 3xl:rounded-[0.417vw] text-white text-[16px] 3xl:text-[0.833vw] py-[10px] 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw]"
                >
                  Attach Link in the Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row hidden">
          <div className="flex items-center justify-center mx-auto w-[48px] h-[48px] bg-[#BDE2FF] border-[8px] border-[#DAEEFF] rounded-full">
            <i className="hexatoolfile-atteched text-[#1570EF]"></i>
          </div>
          <div className="text-[18px] 3xl:text-[0.938vw] text-[#101828] font-medium text-center mt-[24px] 3xl:mt-[1.25vw]">
            Successfully you attach the link
          </div>
          <div className="flex items-center justify-center mt-[32px] 3xl:mt-[1.667vw]">
            <Link
              href={""}
              className="inline-block shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-[#1570EF] border border-[#1570EF] rounded-[8px] 3xl:rounded-[0.417vw] text-white text-[16px] 3xl:text-[0.833vw] py-[10px] 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw]"
            >
              Close
            </Link>
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={qusans}
        className="custDialog closeArrowTop w-[1000px] 3xl:w-[52.083vw]"
        onHide={() => {
          if (!qusans) return;
          setQusans(false);
        }}
      >
        <div>
          <div className="flex items-center">
            <div
              onClick={() => setActiveTab(1)}
              className={`${
                activeTab === 1
                  ? "border-b border-[#101828] text-[#101828] font-semibold"
                  : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
              }  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.573vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
            >
              <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                Questions
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className={`${
                activeTab === 2
                  ? "border-b border-[#101828] text-[#101828] font-semibold"
                  : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
              }  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.573vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
            >
              <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                Student answers
              </div>
            </div>
          </div>
          <div>
            {activeTab === 1 && (
              <>
                <div className="mt-[15px] 3xl:mt-[1.042vw]">
                  <div className="text-[#101828] text-[16px] 3xl:text-[0.833vw] font-medium">
                    Quiz Assignment
                  </div>
                  <div className="text-[#101828] text-[12px] 3xl:text-[0.625vw]">
                    HexaAI Demo - 1:18 PM
                  </div>
                  <div className="text-[#101828] text-[16px] 3xl:text-[0.833vw]">
                    <span className="font-bold">50</span> Points
                  </div>
                  {console.log('props?.quizInstruction', props?.quizInstruction)}
                  <div className="bg-[#F9FAFB] rounded-[16px] 3xl:rounded-[0.833vw] p-[24px] 3xl:p-[1.25vw] mt-[15px] 3xl:mt-[1.042vw]">
                    {/* {props?.quizInstruction ?props?.quizInstruction:'' } */}
                    {/* <div className="space-y-[15px] 3xl:space-y-[0.781vw]">
                      <div className="row text-[#344054] text-[14px] 3xl:text-[0.729vw] space-y-[5px]">
                        <span className="block">What is 2 + 2?</span>
                        <span className="block">A-3</span>
                        <span className="block">B-4</span>
                        <span className="block">C-5</span>
                        <span className="block">D-6</span>
                      </div>
                      <div className="row text-[#344054] text-[14px] 3xl:text-[0.729vw] space-y-[5px]">
                        <span className="block">What is 8 + 1?</span>
                        <span className="block">A-4</span>
                        <span className="block">B-5</span>
                        <span className="block">C-6</span>
                        <span className="block">D-7</span>
                      </div>
                      <div className="row text-[#344054] text-[14px] 3xl:text-[0.729vw] space-y-[5px]">
                        <span className="block">What is 8 + 1?</span>
                        <span className="block">A-4</span>
                        <span className="block">B-5</span>
                        <span className="block">C-6</span>
                        <span className="block">D-7</span>
                      </div>
                    </div> */}
                  </div>
                  <div className="mt-[24px] 3xl:mt-[1.25vw] flex justify-end">
                    <Link
                      href={""}
                      className="inline-block shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white border border-[#C6CBD2] rounded-[8px] 3xl:rounded-[0.417vw] text-[#344054] text-[16px] 3xl:text-[0.833vw] font-medium py-[10px] 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw]"
                      onClick={() => {}}
                    >
                      <Image
                        src="/images/link-copy2.svg"
                        width={20}
                        height={20}
                        className="inline-block mr-[6px] 3xl:mr-[0.313vw]"
                      />{" "}
                      Copy Link
                    </Link>
                  </div>
                </div>
              </>
            )}
            {activeTab === 2 && (
              <>
                <div className="flex justify-between mt-[20px] 3xl:mt-[1.042vw]">
                  <div className="flex items-center gap-[16px] 3xl:gap-[0.833vw]">
                    <div>
                      <Link
                        href={""}
                        className="inline-block bg-[#C6CBD2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[8px] 3xl:rounded-[0.417vw] border border-[#C6CBD2] px-[18px] 3xl:px-[0.938vw] py-[10px] 3xl:py-[0.521vw] text-white text-[16px] 3xl:text-[0.833vw] font-medium"
                      >
                        Return
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={""}
                        className="inline-flex items-center justify-center border border-[#FFD8B2] bg-[#FFFCF8] rounded-[6px] 3xl:rounded-[0.313vw] p-[8px] 3xl:p-[0.417vw]"
                      >
                        <i className="hexatoolmail text-[#FF8B1A] text-[25px] 3xl:text-[1.302vw]"></i>
                      </Link>
                    </div>
                    <div className="customDropdown clear-icon closeIcon">
                      <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cities}
                        optionLabel="name"
                        placeholder="100"
                        className="w-[152px] 3xl:w-[7.917vw]"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <Link href={""}>
                      <i className="hexatoolsetting text-[#667085] text-[30px] 3xl:text-[1.563vw]"></i>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] 3xl:gap-[1.042vw] mt-[20px] 3xl:mt-[1.042vw]">
                  <div className="col">
                    <div className="border border-[#C6CBD2] px-[16px] 3xl:px-[0.833vw] py-[24px] 3xl:py-[1.25vw] rounded-[8px] 3xl:rounded-[0.417vw] h-full">
                      <div className="customDropdown clear-icon closeIcon">
                        <Dropdown
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.value)}
                          options={cities2}
                          optionLabel="name"
                          placeholder="Assigned"
                          className="w-full"
                        />
                      </div>
                      <div className="grid grid-cols-3 mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="col">
                          <Link
                            href={""}
                            className="inline-block bg-[#FFF2E5] rounded-[8px] 3xl:rounded-[0.417vw] text-[#4C2600] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            All Students
                          </Link>
                        </div>
                        <div className="col">
                          <Link
                            href={""}
                            className="inline-block text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            Assigned
                          </Link>
                        </div>

                        <div className="col">
                          <Link
                            href={""}
                            className="inline-block text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            Graded
                          </Link>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="col">
                          <Link
                            href={""}
                            className="block text-center bg-[#FFF2E5] rounded-[8px] 3xl:rounded-[0.417vw] text-[#4C2600] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            All Students
                          </Link>
                        </div>
                      </div>
                      <div className="mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[8px] 3xl:gap-[0.417vw]">
                            <div className="col leading-none">
                              <Checkbox
                                inputId="ingredient1"
                                className="CustomCheckBox"
                                name="pizza"
                                value="Cheese"
                                onChange={onIngredientsChange}
                                checked={ingredients.includes("Cheese")}
                              />
                            </div>
                            <div className="col">
                              <div className="bg-[#FF7F01] rounded-full w-[28px] 3xl:w-[1.458vw] h-[28px] 3xl:h-[1.458vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                                S
                              </div>
                            </div>
                            <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                              Student Demo User
                            </div>
                          </div>
                          <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                            50
                          </div>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[8px] 3xl:gap-[0.417vw]">
                            <div className="col leading-none">
                              <Checkbox
                                inputId="ingredient1"
                                className="CustomCheckBox"
                                name="pizza"
                                value="Cheese"
                                onChange={onIngredientsChange}
                                checked={ingredients.includes("Cheese")}
                              />
                            </div>
                            <div className="col">
                              <div className="bg-[#1B55AF] rounded-full w-[28px] 3xl:w-[1.458vw] h-[28px] 3xl:h-[1.458vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                                R
                              </div>
                            </div>
                            <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                              Random Demo user
                            </div>
                          </div>
                          <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                            0
                          </div>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[8px] 3xl:gap-[0.417vw]">
                            <div className="col leading-none">
                              <Checkbox
                                inputId="ingredient1"
                                className="CustomCheckBox"
                                name="pizza"
                                value="Cheese"
                                onChange={onIngredientsChange}
                                checked={ingredients.includes("Cheese")}
                              />
                            </div>
                            <div className="col">
                              <div className="bg-[#1B55AF] rounded-full w-[28px] 3xl:w-[1.458vw] h-[28px] 3xl:h-[1.458vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                                R
                              </div>
                            </div>
                            <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                              Random Demo user
                            </div>
                          </div>
                          <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                            0
                          </div>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[8px] 3xl:gap-[0.417vw]">
                            <div className="col leading-none">
                              <Checkbox
                                inputId="ingredient1"
                                className="CustomCheckBox"
                                name="pizza"
                                value="Cheese"
                                onChange={onIngredientsChange}
                                checked={ingredients.includes("Cheese")}
                              />
                            </div>
                            <div className="col">
                              <div className="bg-[#FF7F01] rounded-full w-[28px] 3xl:w-[1.458vw] h-[28px] 3xl:h-[1.458vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                                S
                              </div>
                            </div>
                            <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                              Student Demo User
                            </div>
                          </div>
                          <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                            50
                          </div>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-[8px] 3xl:gap-[0.417vw]">
                            <div className="col leading-none">
                              <Checkbox
                                inputId="ingredient1"
                                className="CustomCheckBox"
                                name="pizza"
                                value="Cheese"
                                onChange={onIngredientsChange}
                                checked={ingredients.includes("Cheese")}
                              />
                            </div>
                            <div className="col">
                              <div className="bg-[#FF7F01] rounded-full w-[28px] 3xl:w-[1.458vw] h-[28px] 3xl:h-[1.458vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                                S
                              </div>
                            </div>
                            <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                              Student Demo User
                            </div>
                          </div>
                          <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                            50
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col relative">
                    {/* row */}
                    {/* <div className="bg-[#F9FAFB] rounded-[16px] 3xl:rounded-[0.833vw] p-[24px] 3xl:p-[1.25vw] h-full">
                      <div className="space-y-[24px] 3xl:space-y-[1.25vw]">
                        <div className="text-[20px] 3xl:text-[1.042vw] text-[#101828] font-medium">
                          Quiz Assignment
                        </div>
                        <div className="flex items-center custDivider">
                          <div className="col">
                            <div className="text-[#1570EF] text-[36px] 3xl:text-[1.875vw] font-semibold">
                              0
                            </div>
                            <div className="text-[#667085] text-[14px] 3xl:text-[0.729vw]">
                              Turned In
                            </div>
                          </div>
                          <Divider layout="vertical" />
                          <div className="col">
                            <div className="text-[#1570EF] text-[36px] 3xl:text-[1.875vw] font-semibold">
                              16
                            </div>
                            <div className="text-[#667085] text-[14px] 3xl:text-[0.729vw]">
                              Assigned
                            </div>
                          </div>
                          <Divider
                            layout="vertical"
                            className="text-[#E4E7EC]"
                          />
                          <div className="col">
                            <div className="text-[#1570EF] text-[36px] 3xl:text-[1.875vw] font-semibold">
                              10
                            </div>
                            <div className="text-[#667085] text-[14px] 3xl:text-[0.729vw]">
                              Graded
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-[16px] 3xl:text-[0.833vw] text-[#344054] font-semibold">
                          Accepting Submissions{" "}
                          <i className="hexatoolinfo-circule text-[#1570EF] text-[20px] 3xl:text-[1.042vw] ml-[10px] 3xl:ml-[0.521vw]"></i>
                        </div>
                        <div className="col space-y-[24px] 3xl:space-y-[1.25vw]">
                          <div className="bg-[#F2F4F7] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[8px] 3xl:px-[0.417vw] flex items-center justify-end relative overflow-hidden text-[14px] 3xl:text-[0.729vw] text-[#344054]">
                            2
                            <div className="absolute left-0 top-0 bottom-0 bg-[rgba(0,0,0,0.05)] px-[8px] 3xl:px-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw] flex items-center w-full max-w-[64px] 3xl:max-w-[3.333vw]">
                              A
                            </div>
                          </div>
                          <div className="bg-[#D1FADF] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[8px] 3xl:px-[0.417vw] flex items-center justify-end relative overflow-hidden text-[14px] 3xl:text-[0.729vw] text-[#344054]">
                            B
                            <div className="absolute left-0 top-0 bottom-0 bg-[rgba(0,0,0,0.05)] px-[8px] 3xl:px-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw] flex items-center w-full max-w-[64px] 3xl:max-w-[3.333vw]">
                              8
                            </div>
                          </div>
                          <div className="bg-[#F2F4F7] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[8px] 3xl:px-[0.417vw] flex items-center justify-end relative overflow-hidden text-[14px] 3xl:text-[0.729vw] text-[#344054]">
                            0
                            <div className="absolute left-0 top-0 bottom-0 px-[8px] 3xl:px-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw] flex items-center w-full max-w-[64px] 3xl:max-w-[3.333vw]">
                              C
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* row */}
                    <div className="bg-[#F9FAFB] rounded-[16px] 3xl:rounded-[0.833vw] p-[24px] 3xl:p-[1.25vw] h-full lg:max-h-[400px]">
                      <div className="flex items-center justify-between">
                        <div className="col">
                          <div className="text-[20px] 3xl:text-[1.042vw] font-medium text-[#101828]">
                            Student Demo User
                          </div>
                          <div className="text-[14px] 3xl:text-[0.729vw] text-[#667085]">
                            Graded (See history)
                          </div>
                        </div>
                        <div className="col">
                          <div className="text-[20px] 3xl:text-[1.042vw] font-medium text-[#101828]">
                            50/50
                          </div>
                        </div>
                      </div>
                      <div className="mt-[24px] 3xl:mt-[1.25vw]">
                      <ScrollPanel style={{ width: '100%', height: '250px' }}>
                        <div className="space-y-[32px] 3xl:space-y-[1.667vw]">
                          <div className="flex items-center custRadiobutton">
                            <RadioButton
                              inputId="ingredient1"
                              name="pizza"
                              value="Cheese"
                              onChange={(e) => setIngredient(e.value)}
                              checked={ingredient === "Cheese"}
                            />
                            <label
                              htmlFor="ingredient1"
                              className="ml-2 text-[24px] 3xl:text-[1.25vw] text-[#344054] font-semibold"
                            >
                              A
                            </label>
                          </div>
                          <div className="flex items-center custRadiobutton">
                            <RadioButton
                              inputId="ingredient2"
                              name="pizza"
                              value="Cheese"
                              onChange={(e) => setIngredient(e.value)}
                              checked={ingredient === "Cheese"}
                            />
                            <label
                              htmlFor="ingredient2"
                              className="ml-2 text-[24px] 3xl:text-[1.25vw] text-[#FF7F01] font-semibold"
                            >
                              B
                            </label>
                          </div>
                          <div className="flex items-center custRadiobutton">
                            <RadioButton
                              inputId="ingredient3"
                              name="pizza"
                              value="Cheese"
                              onChange={(e) => setIngredient(e.value)}
                              checked={ingredient === "Cheese"}
                            />
                            <label
                              htmlFor="ingredient3"
                              className="ml-2 text-[24px] 3xl:text-[1.25vw] text-[#344054] font-semibold"
                            >
                              C
                            </label>
                          </div>
                        </div>
                        </ScrollPanel>
                      </div>
                    </div>
                    <div className="lg:absolute left-0 right-0 bottom-0 pb-[30px] lg:pb-0">
                    <div className="flex items-center justify-between mt-[16px] 3xl:mt-[0.833vw] gap-[15px] 3xl:gap-[0.781vw]">
                      <div className="col">
                        <div className="bg-[#1B55AF] rounded-full w-[36px] 3xl:w-[1.875vw] h-[36px] 3xl:h-[1.875vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                          R
                        </div>
                      </div>
                      <div className="w-full">
                        <InputText
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          placeholder="Add Private Comment"
                          className="w-full"
                        />
                      </div>
                      <div className="col">
                        <Link href={""} className="inline-block">
                        <Image
                          className="w-[28px] h-[28px]"
                          width="28"
                          height="28"
                          src="/images/sendmsg.svg"
                          alt="Link"
                        />
                        </Link>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AITools;
