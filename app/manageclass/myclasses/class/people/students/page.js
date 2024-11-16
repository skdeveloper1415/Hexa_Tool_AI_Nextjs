"use client";
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { toast } from 'react-toastify';
import Image from 'next/image';
import { listOfStudent, removeStudent } from '../../../../../actions/studentListingApi';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getDataFromLocalStorage } from '../../../../../../components/helper/commonFunction';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';

export default function Students({classIdValue}) {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
  };
  const [grade, setGrade] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [action, setAction] = useState(null)
  const [RowData, setRowData] = useState()
  const [isDisabled, setIsDisabled] = useState(false)
  const [actionOption, setActionOption] = useState([ 
    { name: 'Email', code: 'Email' },
    { name: 'Delete', code: 'Delete' },
    { name: 'Mute', code: 'Mute' },
  ]);
 
  const dt = useRef(null);
  const status = [
    { name: 'Joined', code: 'NY' },
    { name: 'Pending', code: 'RM' }
  ];



  const [classStudentList, setStudentList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStudentList = async () => {
    
      try {
        
        if (classIdValue) {
          let accessToken = getDataFromLocalStorage("access_token");
          const payload = {
              "accessToken": accessToken,
              "courseId": classIdValue
          };
          setIsLoading(true);
          const response = await listOfStudent(payload);
          
          if (response.success && response.data) {
            setStudentList(response?.data?.data);
            setSelectedProducts(null)
          setIsLoading(false);
          } else {
            console.error("Failed to fetch class list");
          }
          setIsLoading(false);
        }
        else{
          setStudentList([]);
        }
      } catch (error) {
          console.error("Error fetching class list:", error);
          toast.error('Something went wrong vffgdfg');
          setIsLoading(false);
      }
      setIsLoading(false);
  };
  
  useEffect(() => {
    getStudentList();
  }, []);

  const handleAction =async (value) => {
    setAction(value)
    if(value.code === "Delete"){
      setDialogVisible(true)
    }
    if(value.code === "Email"){
      window.location.href = `mailto:${selectedProducts.length>1 ?selectedProducts.map((ele)=>ele.profile.emailAddress).join(',') :selectedProducts.map((ele)=>ele.profile.emailAddress)}`
    }
  }
  
  const handleStudentRemove =async (value) => {
      try {
        setIsDisabled(true)
        if (classIdValue) {
          let accessToken = localStorage.getItem("access_token");
          const payload = {
              "accessToken": accessToken,
              "courseId": classIdValue,
              "studentId":selectedProducts.length ?selectedProducts.map((ele)=>ele.profile.id) :[value],
          };
          // setIsLoading(true);
          const response = await removeStudent(payload);
          if (response.success && response.data) {
            setDialogVisible(false)
            getStudentList()
            setIsLoading(false);
            toast.success('Student remove successfully.')
          } else {
            setDialogVisible(false)
            toast.error('Something Went Wrong')
          }
          setIsDisabled(false)
          setIsLoading(false);
        }
      } catch (error) {
        setDialogVisible(false)
          toast.error('Something went wrong');
          setIsLoading(false);
          setIsDisabled(false)
      }
      setIsLoading(false);
  }

  

  const nameBodyTemplate = (rowData) => {
    
    return (
      <>
        <div className="">
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Name</div>
          <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.profile.name.givenName ? rowData.profile.name.givenName : "--"}</div>
        </div>
      </>
    );
  };
  const studentidBodyTemplate = (rowData) => {
    
    return (
      <>
        <div className="">
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Student id</div>
          <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.profile.id ? rowData.profile.id :  "--"}</div>
        </div>
      </>
    );
  };
  const emailidBodyTemplate = (rowData) => {
    
    return (
      <>
        <div className="">
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Email id</div>
          <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.profile.emailAddress ? rowData.profile.emailAddress :  "--"}</div>
        </div>
      </>
    );
  };
  const statusBodyTemplate = (rowData) => {
    switch (rowData.status) {
      case 'Joined':
        return <div>
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Status</div>
          <div className='flex text-[#039855] gap-[5px] font-medium 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px]'><Image alt="Active Status" src="/images/joined_logo.svg" width="20" height="20" />Joined</div>
        </div>;

      case 'Pending':
        return <div>
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Status</div>
          <div className='flex text-[#D92D20] gap-[5px] font-medium 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px]'><Image alt="Active Status" src="/images/pending_logo.svg" width="20" height="20" />Pending</div>
        </div>;
      default:
        return null;
    }
  };
  const items = [
    {
      icon: 'hexatoolthree-dots',
      items: [
        {
          template: () => {
            return <div  className="menu-items">
              <a href={`mailto:${RowData?.profile?.emailAddress}`}target='_blank' className="menu-items">Email</a>
            </div>
          }
        },
        {
          label: 'Remove',
          command: (e) => {
            setDialogVisible(true)
          }
        }
      ]
    }
  ];
  const menuLeft = useRef(null);
  const lastloginBodyTemplate = (rowData) => {
    return (
      <>
        <div className="flex justify-between p-[10px]">
          <div>
            <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Last Log In</div>
            <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.date}</div>
          </div>
            {/* <i className='hexatoolthree-dots'></i> */}
            <div className='text-[#98A2B3] top-1 left-2.5' style={{ width: '30px', height: '50px' , display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={(event) => { menuLeft.current.toggle(event); setRowData(rowData) }}>
              <i className='hexatoolthree-dots'  aria-controls="popup_menu_left" aria-haspopup ></i>
            </div>
          <Menu model={items} className="menu-items" popup ref={menuLeft} id="popup_menu_left" style={{ width: '100px',height:'max-content' }}/>
        </div>
      </>
    );
  };



  const header = (
    <div className='flex justify-between'>
      <div className="flex flex-wrap items-center xl:gap-[0.521vw] gap-2">
        <div className="font-medium 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]">
          All Students
        </div>
      </div>
     
      <div className='flex gap-[15px] 3xl:gap-[0.781vw]'>
      {/* <div className='customDropdown closeIcon'>
          <Dropdown
            value={action}
            onChange={(e) => handleAction(e.target.value)}
            filter
            options={actionOption}
            disabled={!selectedProducts?.length}
            optionLabel="name"
            placeholder="Action"
            className="w-full md:w-[200px] xl:w-[240px] 3xl:w-[13.334vw]"
            showClear
            // onClick={handleAction}
          />
        </div> */}
        <div>
          <span className="p-input-icon-left custm-search custm-search">
            <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
            <InputText
              placeholder="Search..."
              className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[300px] xl:w-[340px] 3xl:w-[23.75vw] inputbox-custom-sizes custhover"
            />
          </span>
        </div>
        <div className='customDropdown clear-icon closeIcon'>
          <Dropdown
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            filter
            options={status}
            optionLabel="name"
            placeholder="Status"
            className="w-full md:w-[300px] xl:w-[340px] 3xl:w-[18.542vw]"
            showClear
          />
        </div>
       
      </div>
    </div>
  );
 
  const footerContent =()=>{return (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
      <button onClick={() => setDialogVisible(false)} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>

      <button onClick={()=> {handleStudentRemove(RowData?.profile?.id)}} disabled={isDisabled} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  )};
  return (
    <>
      <div className="card cust_table border border-[#E4E7EC] rounded-lg custheader">
      {isLoading ? <div className='flex justify-between align-center'><ProgressSpinner/></div>:
        <DataTable ref={dt}
          value={classStudentList}
          // className='tableCust'
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="userId"
          emptyMessage={<div className="flex justify-center align-center">No Data Available</div>}
          paginator
          rows={5}
          globalFilter={globalFilter} header={header}>
            <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="code" body={nameBodyTemplate} style={{ minWidth: '10rem' }}></Column>
          <Column field="profile.name" body={studentidBodyTemplate} style={{ minWidth: '10rem' }}></Column>
          <Column field="emailAddress" body={emailidBodyTemplate} style={{ minWidth: '10rem' }}></Column>
          <Column field="inventoryStatus" body={statusBodyTemplate} style={{ minWidth: '10rem' }}></Column>
          <Column body={lastloginBodyTemplate} exportable={false} style={{ minWidth: '15rem' }}></Column>
        </DataTable>}

        {dialogVisible&&<Dialog visible={dialogVisible} modal header={'Confirmation remove'} footer={()=>footerContent()} style={{ width: '35vw' }} onHide={() => setDialogVisible(false)} className='ConfirmDialog'>
          <p className="m-0">
            Do you want to Remove this record?
          </p>
      </Dialog>}
      </div>
    </>
  )
}
