import React, { useEffect, useState } from 'react'
import { ScrollPanel } from 'primereact/scrollpanel';
import { NoDataMsg } from '../../../../../common/NoDatamsg';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getTimeDifference } from '../../../../../../components/helper/timeDiffCalculator';
import { toast } from 'react-toastify';
import { getDataFromLocalStorage } from '../../../../../../components/helper/commonFunction';
import { deleteMaterial, getMaterials } from '../../../../../actions/materialApi';
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from 'primereact/dialog';

export default function Material(props) {
    const { classIdValue, topicId, refreshList } = props;
    const [loader, setLoader] = useState(false);
    const [materialList, setMaterialList] = useState();
    const [materialId, setMaterialId] = useState();
    const [dialogVisible, setDialogVisible] = useState(false)
    const [isView, setIsView] = useState(false);
    const [materialDetail, setMaterialDetail] = useState({})
    const accessToken = getDataFromLocalStorage("access_token");

    useEffect(() => {
        getMaterialList()
    }, [topicId]);

    const HeaderDatafordescription = () => {
        return (
            <div className="flex">
                {materialDetail?.title ?materialDetail?.title:'' }
            </div>
        )
    }
    const footerContentForView = (
        <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">


            <button onClick={() => setIsView(false)} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
                Ok
            </button>
        </div>
    );
    const getMaterialList = async () => {
        try {
            if (classIdValue) {
                setLoader(true);
                
                const body = {
                    accessToken: accessToken,
                    courseId: classIdValue,
                    topicId:topicId

                };

                const response = await getMaterials(body);
                if (response?.code == 200) {
                    let list = response?.data?.data?.publishedMaterials ?? [];
                    setMaterialList(list);
                    setLoader(false);
                }
                else if (response.code !== 200) {
                    toast.error(response.message || 'Something Went Wrong')
                    setMaterialList([]);
                    setLoader(false);
                }
            }
        }
        catch (error) {
            setLoader(false);
            toast.error("something went wrong");
        }
    };
    
    //Delete Confirmation

    const accept = async() => {
        try {
            if (classIdValue) {
              
                const body = {
                    accessToken: accessToken,
                    courseId: classIdValue,
                    id: materialId
                };

                const response = await deleteMaterial(body);
                if (response?.code == 200) {
                    toast.success("Material Deleted Successfully.")
                    getMaterialList();
                    setMaterialId();
                    setDialogVisible(false)
                  
                }
                else if (response.code !== 200) {
                    toast.error(response.message || 'Something Went Wrong')
                    setMaterialId();
                    setDialogVisible(false)
                   
                }
            }
        }
        catch (error) {
            setDialogVisible(false)
            toast.error("something went wrong");
        }
    }


    //Header for Delete Dialog
    const HeaderData = () => {
        return (
          <div className="flex">
            Confirmation
          </div>
        )
      }
      const footerContent = (
        <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
          <button onClick={() => setDialogVisible(false)} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>
      
    
          <button onClick={accept}  className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
            Yes
          </button>
        </div>
      );

    return (
        <div>
            <Dialog visible={dialogVisible} draggable={false} modal header={HeaderData} footer={footerContent} style={{ width: '35vw' }} onHide={() => setDialogVisible(false)} className='ConfirmDialog'>
                <p>
                    Do you want to Delete this record?
                </p>
            </Dialog>
            <ScrollPanel
                style={{ width: "100%", height: "500px" }}
                className="custombar2"
            >
                <div className="mb-5">
                    {
                        loader ?
                            (<div className="flex justify-center align-center">
                                <ProgressSpinner />
                            </div>)
                            :
                            (
                                materialList?.length ? (
                                    materialList?.map((item, index) => {
                                        return (
                                            <>
                                                <div key={index} className="border border-[#D4D4D4] p-[20px] xl:p-[18px] 3xl:p-[1.042vw] rounded-[10px] xl:rounded-[9px] 3xl:rounded- [0.521vw] relative mb-[10px]">
                                                    <Menu as="div" className=" absolute top-[17px] right-[17px] 3xl:top-[0.885vw] 3xl:right-[0.885vw] mr-2">
                                                        <Menu.Button >
                                                            <i
                                                                className="hexatoolthree-dots cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center">
                                                            </i>
                                                        </Menu.Button>
                                                        <Transition
                                                            // as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                                                                <ul>
                                                                    <li
                                                                        className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                        onClick={() => {
                                                                            props.setMaterialId(item?.id),
                                                                            props.setIsEditMaterial(true)
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </li>
                                                                    <li
                                                                        className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                                                                        onClick={()=>{setDialogVisible(true), setMaterialId(item?.id)}}
                                                                    >
                                                                        Delete
                                                                    </li>
                                                                </ul>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                    <div className="flex items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw]">
                                                        <div className=" items-center gap-[10px] xl:gap-[9px] 3xl:gap-[0.521vw] mb-[5px]">
                                                            <div className="text-[#101828] text-[16px] xl:text-[14px] 3xl:text-[0.833vw] font-semibold" style={{cursor:'pointer'}} onClick={()=>{setIsView(true);setMaterialDetail(item)}}>
                                                                {item.title}
                                                            </div>
                                                            <div className="text-[#667085] text-[12px] xl:text-[10px] 3xl:text-[0.625vw] font-normal">
                                                                {getTimeDifference(item.updateTime)}
                                                                {/* 5 Days ago */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })
                                ) : (
                                    <NoDataMsg />
                                ))
                    }

                </div>
                {/* <NoDataMsg /> */}
                {isView&& <Dialog visible={isView} draggable={false} modal header={HeaderDatafordescription}  style={{ width: '35vw' }} onHide={() => setIsView(false)} className='ConfirmDialog'>
             
                 <p>
                   {materialDetail?.description ?materialDetail?.description:'' }
                </p>
            </Dialog>}
            </ScrollPanel >
        </div >
    )
}
