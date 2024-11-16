"use client";
import React, { useRef, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Image from "next/image";
import { ScrollPanel } from "primereact/scrollpanel";
import { getTimeDifference } from "../../../../../components/helper/timeDiffCalculator";
import { NoDataMsg } from "../../../../common/NoDatamsg";
import { Menu } from "primereact/menu";
import { Dialog } from "primereact/dialog";
import { PostDeleteApi } from "../../../../actions/postDeleteApi";
import { getDataFromLocalStorage } from "../../../../../components/helper/commonFunction";
import { toast } from "react-toastify";
import { Tooltip } from "primereact/tooltip";


export default function PostComp(props) {
  const { PostData, getPost, isTeacher, onEdit } = props;
  const menuLeft = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [postId, setPostId] = useState('');
  const [isView, setIsView] = useState(false);
  const [postDetail, setpostDetail] = useState({})

  const items = [
    {
      items: [
        {
          label: 'Edit',
          command: () => handleEdit(),
        },
        {
          label: 'Delete',
          command: () => setDialogVisible(true),
        }
      ]
    }
  ];

  const handleEdit = () => {
    onEdit(courseId, postId);
    props.editPost(true);
  };

  const handleDeletePopup = (rowData) => {
    setCourseId(rowData.courseId);
    setPostId(rowData.id);
  };

  const handleDelete = async () => {
    try {
      let accessToken = getDataFromLocalStorage("access_token");
      if (!accessToken) {
        return
      }
      const payload = {
        "accessToken": accessToken,
        "courseId": courseId,
        "postId": postId
      }

      const response = await PostDeleteApi(payload);
      if (response.code == '200') {
        setDialogVisible(false);
        toast.success("Post Deleted Successfully.");
        getPost();
      } else {
        toast.error(response.message || "Something Went Wrong");
      }
    } catch (error) {
      if (error.message) {
        toast.error("No Class Rooms Available");
      }
    }
  };


  const HeaderData = () => {
    return (
      <div className="flex">
        Confirmation
      </div>
    )
  }

  const HeaderDesData = () => {
    return (
      <div className="flex">
        Description:
      </div>
    )
  }

  const footerContent = (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
      <button onClick={() => setDialogVisible(false)} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>

      <button onClick={handleDelete} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  );

  const renderPost = (isComment, post, i) => {
    const createdData = post?.createrData ?? { photoUrl: '#', name: { fullName: '' } }
    return (
      <>
        {!isComment && <>{isTeacher && <div onClick={(event) => { handleDeletePopup(post); menuLeft.current.toggle(event) }} aria-controls="popup_menu_left" className="absolute top-[17px] right-[17px] 3xl:top-[0.885vw] cursor-pointer  3xl:right-[0.885vw]">
          <i className="hexatoolthree-dots  text-[#98A2B3] text-[20px] xl:text-[18px] 3xl:text-[0.9vw]"></i>
        </div>}
          <Menu model={items} className="menu-item" popup ref={menuLeft} id="popup_menu_left" style={{ width: '100px', height: 'max-content' }} />
        </>
        }
        <div className="flex items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw]">
          <div>
            <Image
              width={48}
              height={48}
              src={`https:${createdData.photoUrl}`}
              className="rounded-full h-[48px] xl:h-[48px] 3xl:h-[2.5vw] 3xl:w-[2.5vw]"
              alt="User"
            />
          </div>
          <div>
            <div className="flex items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw] mb-[5px]">
              <div className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold">
                {createdData.name.fullName}
              </div>
              <div className="text-[#667085] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-normal">
                {getTimeDifference(post.updateTime)}
              </div>
            </div>

            <div className="flex items-center">
              {!isComment && (
                <div className="flex items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw]">
                  {/* {post.assigneeMode == "ALL_STUDENTS" && (
                    <div className=" flex items-center  text-[#E57200] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-normal mb-[3px]">
                      {"me"}
                    </div>
                  )} */}
                  {/* {post.assigneeMode == "INDIVIDUAL_STUDENTS" && ( */}
                  {/* <div className=" flex items-center text-[#667085] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-normal cursor-pointer">
                      <i className="hexatooleye pr-[5px] "></i> <span>{"All"}</span>
                    </div> */}
                  {/* )} */}
                </div>
              )}
              {post?.state == "DRAFT" ? (
                <div className="ml-3">
                  <div className="text-[#E57200] bg-[#FFF2E5] font-medium text-[10px] xl:text-[11px] 3xl:text-[0.625vw] rounded-[16px] xl:rounded-[14px] 3xl:rounded-[0.833vw] py-[3px] px-[8px] ">
                    {post?.state}
                  </div>

                </div>
              ) :
                <div className=" flex items-center text-[#667085] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-normal cursor-pointer">
                  <i className="hexatooleye pr-[5px] "></i> <span>{"All"}</span>
                </div>}
            </div>
          </div>
        </div>
        <div className="mt-[20px] xl:mt-[18px] 2xl:mt-[16] 3xl:mt-[1.042vw]">
          {/* <div
            className={`truncated-text-${i} text-[#101828] text-[18px] xl:text-[18px] 2xl:text-[16px] 3xl:text-[0.9vw] `}
          >
            {post.text.length >= '620' ? (<div><span>{post.text.slice(0, 620)  }</span><span  onClick={() => { setIsView(true); setpostDetail(post) }}style={{color:'#1570EF',cursor:'pointer'}}>{' See More...'}</span></div>)  : post.text}


          </div> */}
          <div
            className={`truncated-text-${i} text-[#101828] text-[18px] xl:text-[18px] 2xl:text-[16px] 3xl:text-[0.9vw] `}
          >
            {post.text.length >= 620 ? (
              <div>
                <span dangerouslySetInnerHTML={{ __html: post.text.slice(0, 620) }} />
                <span 
                  onClick={() => { setIsView(true); setpostDetail(post); }} 
                  style={{ color: '#1570EF', cursor: 'pointer' }}
                >
                  {' See More...'}
                </span>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: post.text }} />
            )}
          </div>

        </div>
        {false && <div className="mt-[16px] xl:mt-[14px] 3xl:mt-[0.833vw]">
          <div className="flex items-center gap-[24px] xl:gap-[22px] 3xl:gap-[1.25vw]">
            <div className="flex items-center gap-[5px] text-[12px] xl:text-[11px] 3xl:text-[0.625vw] text-[#1B55AF]">
              <i className="hexatoolthumb-fill"></i>{" "}
              <div className="font-medium">24</div>
            </div>
            <div className="text-[12px] xl:text-[11px] 3xl:text-[0.625vw] text-[#1B55AF] font-medium">
              2 Comments
            </div>
          </div>
        </div>}
      </>
    );
  };

  const footerContentForView = (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">


      <button onClick={() => setIsView(false)} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Ok
      </button>
    </div>
  );

  return (
    <>
      {(
        <>
          <ScrollPanel
            style={{ width: "100%", height: "500px" }}
            className="custombar2"
          >
            <div className="mb-5">
              {PostData?.length ? (
                PostData?.map((post, i) => {
                  return (
                    <div key={post.id}  className="border border-[#D4D4D4] p-[20px] xl:p-[18px] 3xl:p-[1.042vw] rounded-[10px] xl:rounded-[9px] 3xl:rounded-[0.521vw] relative mb-[10px]" >
                      {renderPost(false, post, i + 1)}
                    </div>
                  );
                })
              ) : (
                <NoDataMsg />
              )}
              <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }} onHide={() => setDialogVisible(false)} className='ConfirmDialog'>
                <p>
                  Do you want to Delete this record?
                </p>
              </Dialog>
              {isView && <Dialog visible={isView} draggable={false} modal header={HeaderDesData}  style={{ width: '35vw' }} onHide={() => setIsView(false)} className='ConfirmDialog'>
                <p>
                  {postDetail?.text ? postDetail.text : ''}
                </p>
              </Dialog>}
            </div>
          </ScrollPanel>
        </>
      )}
    </>
  );
}
