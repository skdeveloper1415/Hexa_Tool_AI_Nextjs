"use client";
import Image from "next/image";
import React, { useRef, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import Layout from "../../layouts/pagelayout";
import { Dropdown } from "primereact/dropdown";
import { Menu, Transition } from "@headlessui/react";
import { Paginator } from "primereact/paginator";
import { BreadCrumb } from "primereact/breadcrumb";
import { OverlayPanel } from "primereact/overlaypanel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Blogdetails from "../../components/popup/blogdetails";
import CreateFolder from "../../components/popup/createfolder";
import Uploadfile from "../../components/popup/uploadfile";
import { toast } from "react-toastify";
import FileCommanComponent from "../../components/popup/FileCommanComponent";

export default function Page() {
  const [createFolder, setCreateFolder] = useState(false);
  const [uploadFiles, setUploadFiles] = useState(false);
  const [topicValue, setTopicvalue] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleCopy = (link) => {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = link;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copy command was ' + msg);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error('Unable to copy', err);
      toast.error("Failed to copy Link!");
    }
    document.body.removeChild(tempTextarea);
  };

  const topics = [
    { name: "All", code: "NY" },
    { name: "Approved", code: "RM" },
    { name: "Approval Pending", code: "LDN" },
  ];
  const aiGeneraedOutput = [
    { folderName: "Images", size: "18 MB", type: "I", image:'folder_icon.svg' },
    { folderName: "Files", size: "20 MB", type: "O", image:'folder_icon.svg' },
    { folderName: "Photos", size: "150 MB", type: "I", image:'folder_icon.svg' },
    { folderName: "Videos", size: "300 MB", type: "O", image:'folder_icon.svg' },
];

  const aiGeneraedOutput2 = [
    { folderName: "Images", size: "18 MB" , type: "O", image:'text_line_jpg.svg'},
    { folderName: "Files", size: "20 MB", type: "O", image:'text_line_files.svg'},
    { folderName: "PDF", size: "150 MB" , type: "O", image:'text_line_pdf.svg'},
    { folderName: "Videos", size: "300 MB" , type: "O" , image:'text_line_mp4.svg'},
    { folderName: "Audio", size: "300 MB" , type: "O" , image:'text_line_mp3.svg'},
    { folderName: "Excel", size: "300 MB" , type: "O" , image:'text_line_xls.svg'},
    { folderName: "GIF", size: "300 MB" , type: "O" , image:'text_line_gif.svg'},
    { folderName: "SVG", size: "300 MB" , type: "O" , image:'text_line_svg.svg'},
    { folderName: "PNG", size: "300 MB" , type: "O" , image:'text_line_png.svg'},
  ];

  const HeaderData = () => {
    return (
      <div className="flex">
        Confirmation
      </div>
    )
  }

  const footerContent = (
    <div  className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
      <button onClick={() => setDialogVisible(false)} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>

      <button
      //  onClick={handleDelete}
        className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  );


  // const items = [
  //     { label: "Blog"},
  //   ];
  // const home = { label: "Home", url: "/" };
  return (
    <Layout>
      <div className="mx-auto 3xl:px-[16.771vw] 2xl:px-[150px] xl:px-[100px] px-[20px]">
        {/* <BreadCrumb
          className="custom-breadcrumb 3xl:text-[0.729vw] text-[14px] xl:mb-[2.083vw] mb-[30px]"
          model={items}
          home={home}
        /> */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-[20px] xl:gap-[18px] 3xl:gap-[1.042vw]">
            <div className="text-[#101828] text-[30px] xl:text-[25px] 3xl:text-[1.563vw] font-semibold">
              Ai Library
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="p-input-icon-left custm-search">
              <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
              <InputText
                placeholder="Search"
                className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[400px] xl:w-[330px] 3xl:w-[17.188vw] custhover xl:h-[2.24vw] 
                                lg:h-[43px] 3xl:h-[2.24vw]"
              />
            </span>
            <div className="customDropdown clear-icon closeIcon">
              <Dropdown
                filter
                value={topicValue}
                onChange={(e) => setTopicvalue(e.target.value)}
                options={topics}
                optionLabel="name"
                placeholder="All"
                className="w-full md:w-[165px] xl:w-[170px] 3xl:w-[9.375vw]"
                showClear
              />
            </div>
            {/* <Link href="/composemail" className="flex 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#1570EF] font-medium border border-[#1570EF]  rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-center items-center xl:h-[2.24vw] 
                                lg:h-[43px] 3xl:h-[2.24vw]"
                        >
                            <i className="hexatoolplus"></i>
                            
                        </Link>
                        <Link href="/composemail" className="flex 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#1570EF] font-medium border border-[#1570EF]  rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-center items-center xl:h-[2.24vw] 
                                lg:h-[43px] 3xl:h-[2.24vw]"
                        >
                            <i className="hexatoolplus"></i>
                            
                        </Link> */}
            <Link
              href="" onClick={() => setCreateFolder(true)}
              className="flex 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#1570EF] font-normal border border-[#1570EF]  rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-center items-center"
            >
              <i className="hexatoolplus mr-[8px]"></i>
              Create Folder
            </Link>
            <Link
              href="" onClick={() => setUploadFiles(true)}
              className="flex 3xl:text-[0.733vw] xl:text-[12px] text-[16px] text-[#fff] font-normal border border-[#1570EF] bg-[#1570EF] rounded-lg xl:rounded-[6px] 3xl:rounded-[0.417vw] xl:px-[1.04vw] px-[16px] py-[9px] xl:py-[9px] 3xl:py-[0.521vw] justify-center items-center"
            >
              <i className="hexatoolupload-file mr-[8px]"></i>
              Upload file
            </Link>
          </div>
        </div>

        <div className="pt-[38px] 3xl:pt-[1.979vw]">
          <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-4 3xl:grid-cols-4 gap-[15px] 3xl:gap-[0.781vw]">
            <div className="bg-white border border-[#E4E7EC] rounded-[10px]  xl:rounded-[0.533vw] p-[18px] xl:p-[0.938vw] relative">
              <div className="flex justify-between items-center">
                <div className="flex gap-[16px] xl:gap-[0.833vw] items-center">
                  <div>
                    <Image
                      src={"/images/files_icon/images_count_img.svg"}
                      width={"56"}
                      height={"56"}
                      alt="icon"
                    />
                  </div>
                  <div>
                    <div className="text-[#344054] text-[16px] xl:text-[0.833vw] 3xl:text-[0.833vw] font-normal">
                      Image
                    </div>
                    <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] font-semibold">
                      132 Files{" "}
                      <span className="font-light  text-[11px] xl:text-[11px] 3xl:text-[0.573vw]">
                        120.06 MB
                      </span>
                    </div>
                  </div>
                </div>
                <Menu as="div" className='absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw]'>
                  <Menu.Button >
                    <i className="hexatoolthree-dots cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"></i>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[160px] border">
                      <ul>
                        <li
                          className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                          onClick={() => {handleCopy("http://localhost:3000/library") }}
                        >
                          Copy URL Link
                        </li>
                        <li
                          className='3xl:text-[0.625vw] 2xl:text-[12px] text-[12px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                          onClick={() => setDialogVisible(true)}
                        >
                          Delete
                        </li>

                      </ul>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="bg-white border border-[#E4E7EC] rounded-[10px]  xl:rounded-[0.533vw] p-[18px] xl:p-[0.938vw]">
              <div className="flex justify-between items-center">
                <div className="flex gap-[16px] xl:gap-[0.833vw] items-center">
                  <div>
                    <Image
                      src={"/images/files_icon/document_count_img.svg"}
                      width={"56"}
                      height={"56"}
                      alt="icon"
                    />
                  </div>
                  <div>
                    <div className="text-[#344054] text-[16px] xl:text-[0.833vw] 3xl:text-[0.833vw] font-normal">
                      Documents
                    </div>
                    <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1vw] font-semibold">
                      642 Files{" "}
                      <span className="font-light  text-[11px] xl:text-[11px] 3xl:text-[0.573vw]">
                        120.06 MB
                      </span>
                    </div>
                  </div>
                </div>
                <i className="hexatoolthree-dots cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"></i>
              </div>
            </div>
            <div className="bg-white border border-[#E4E7EC] rounded-[10px]  xl:rounded-[0.533vw] p-[18px] xl:p-[0.938vw]">
              <div className="flex justify-between items-center">
                <div className="flex gap-[16px] xl:gap-[0.833vw] items-center">
                  <div>
                    <Image
                      src={"/images/files_icon/audio_count_img.svg"}
                      width={"56"}
                      height={"56"}
                      alt="icon"
                    />
                  </div>
                  <div>
                    <div className="text-[#344054] text-[16px] xl:text-[0.833vw] 3xl:text-[0.833vw] font-normal">
                      Audios
                    </div>
                    <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1vw] font-semibold">
                      40 Files{" "}
                      <span className="font-light  text-[11px] xl:text-[11px] 3xl:text-[0.573vw]">
                        120.06 MB
                      </span>
                    </div>
                  </div>
                </div>
                <i className="hexatoolthree-dots cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"></i>
              </div>
            </div>
            <div className="bg-white border border-[#E4E7EC] rounded-[10px]  xl:rounded-[0.533vw] p-[18px] xl:p-[0.938vw]">
              <div className="flex justify-between items-center">
                <div className="flex gap-[16px] xl:gap-[0.833vw] items-center">
                  <div>
                    <Image
                      src={"/images/files_icon/video_count_img.svg"}
                      width={"56"}
                      height={"56"}
                      alt="icon"
                    />
                  </div>
                  <div>
                    <div className="text-[#344054] text-[16px] xl:text-[0.833vw] 3xl:text-[0.833vw] font-normal">
                      Videos
                    </div>
                    <div className="text-[#101828] text-[20px] xl:text-[20px] 3xl:text-[1vw] font-semibold">
                      120 Files{" "}
                      <span className="font-light  text-[11px] xl:text-[11px] 3xl:text-[0.573vw]">
                        120.06 MB
                      </span>
                    </div>
                  </div>
                </div>
                <i className="hexatoolthree-dots cursor-pointer 3xl:text-[0.833vw] text-[16px] text-[#98A2B3] text-center"></i>
              </div>
            </div>
          </div>
          <div className="mt-[32px] 3xl:mt-[1.667vw]">
            <FileCommanComponent
              aiGeneraedOutput={aiGeneraedOutput}
              aiGeneraedOutput2={aiGeneraedOutput2}
            />
          </div>
        </div>

        <div className="card custTabview pt-[20px] 3xl:pt-[1.042vw]">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={30}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }} onHide={() => setDialogVisible(false)} className='ConfirmDialog'>
                <p>
                  Do you want to Delete this folder?
                </p>
              </Dialog>
             
      <CreateFolder
        visible={createFolder}
        setTopicvalue={setCreateFolder}
        onhide={() => setCreateFolder(false)}
      />
      <Uploadfile
        visible={uploadFiles}
        setTopicvalue={setUploadFiles}
        onhide={() => setUploadFiles(false)}
      />
    </Layout>
  );
}
