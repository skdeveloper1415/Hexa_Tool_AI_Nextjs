"use client";
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "react-toastify/dist/ReactToastify.css";
import { MultiSelect } from 'primereact/multiselect';
import { Image } from 'primereact/image';
import { removeTeacher, teachersListing } from '../../../../../actions/TeachersListing';
import { usePathname } from 'next/navigation';
import { STATUS } from '../../../../../../components/helper/enum';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getDataFromLocalStorage } from '../../../../../../components/helper/commonFunction';
import { Menu } from 'primereact/menu';
import { toast } from 'react-toastify';
import { Dialog } from 'primereact/dialog';

export default function Teachers() {


  const [dialogVisible, setDialogVisible] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [teachersList, setTeachersList] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [UserData, setUserData] = useState(null)
  const [RowData, setRowData] = useState()
  const [isDisabled, setIsDisabled] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null);

  const dt = useRef(null);
  const [grade, setGrade] = useState();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const classId = parts[parts.length - 1];
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = searchQuery.length !== 0 && teachersList.filter((item) => {
    const fullName = `${item.profile.name.givenName} ${item.profile.name.fullName}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  
 



  const [representatives] = useState([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
  ]);
  const getTeacherListing = async () => {
    try {
        let accessToken = getDataFromLocalStorage("access_token");
        const payload = {
            "accessToken": accessToken,
            "courseId": classId 
        }
        setIsLoading(true);
        const response = await teachersListing(payload);
        if (response.success && response.data) {
          setTeachersList(response.data.data)
        setIsLoading(false);
        }else if(response.code == 500){
          toast.error(response.message ||'Something Went Wrong')
          setIsLoading(false);
        }
        else {
          toast.error(response.error || 'Something Went Wrong')
          setIsLoading(false);
        }   
    } catch (error) {
      toast.error("Error fetching class list:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTeacherListing()
    
    const userData =JSON.parse(getDataFromLocalStorage("user_data"));
    setUserData(userData)
  }, [])

  const handleRemoveTeacher = async (TeacherId) => {
    
    setIsDisabled(true);
    const accessToken = localStorage.getItem("access_token");
    try {
      const payload = {
        "accessToken": accessToken,
        "courseId": classId,
        "teacherId": [TeacherId]
      }
      const response = await removeTeacher(payload);
      if (response.success && response.data) {
        setDialogVisible(false)
        getTeacherListing()
        toast.success('Teacher remove successfully.')
      } else {
        setDialogVisible(false)
        toast.error('Something Went Wrong')
        setIsLoading(false);
      }
      setIsDisabled(false);
    } catch (error) {
      setDialogVisible(false)
      toast.error('Something Went Wrong')
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  
  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <Image alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" height="32" />
        <span>{option.name}</span>
      </div>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    return (
      <div>
        <div className="flex align-items-center gap-2">
          <Image  className='mt-1.5' alt={rowData.profile.name.fullName} src={`https:${rowData.profile.photoUrl}`} width="48" height="48" />
          <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.profile.name.fullName}
            <div className="flex align-items-center gap-2">
              {/* <span className='border border-[#FFA54D] text-[#FFA54D] text-[12px] px-[8px] py-[3px] rounded'>{rowData.gender}</span>/ */}
              <span className='border border-[#1570EF] text-[#1570EF] text-[12px] px-[8px] py-[3px] rounded'>{rowData.userId}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const representativeRowFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
        style={{ minWidth: '14rem' }}
      />
    );
  };
  const footerContent =()=>{return (
    <div className="flex gap-[5px] justify-end min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
      <button onClick={() => setDialogVisible(false)} className="flex justify-center items-center border-2 px-[15px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[18px] xl:text-[0.933vw] font-medium ">No</button>

      <button onClick={()=> handleRemoveTeacher(RowData?.profile?.id)} disabled={isDisabled} className="flex justify-center bg-[#1570EF] items-center border-2 px-[20px] py-[10px] rounded-lg text-[#fff]  text-[18px] xl:text-[0.933vw] font-medium">
        Yes
      </button>
    </div>
  )};
  const nameBodyTemplate = (rowData) => {
    console.log('rowData.profile.emailAddress', rowData.profile.emailAddress)
    return (
      <>
        <div className="">
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Email</div>
          <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.profile.emailAddress ? rowData.profile.emailAddress  : "--"}</div>
        </div>
      </>
    );
  };
  const studentidBodyTemplate = (rowData) => {
    console.log('rowData', rowData)
    return (
      <>
        <div className="">
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Phone No.</div>
          <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.phone ?rowData.phone : "--"}</div>
        </div>
      </>
    );
  };
  const emailidBodyTemplate = (rowData) => {
    return (
      <>
        <div className="">
          <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Last Activity</div>
          <div className='font-normal 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]'>{rowData.lastactivity ?rowData.lastactivity  : "--"}</div>
        </div>
      </>
    );
  };
console.log('UserData', UserData)
  const items = [
    {
      icon: 'hexatoolthree-dots',
      items: [
        {
          template: () => {
            return <div >
              <a href={`mailto:${RowData?.profile?.emailAddress}`} target='_blank'  className="menu-items"> Email</a>
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
  const statusBodyTemplate = (rowData) => {
    switch (rowData.inventoryStatus) {
      case 'Active':
        return <div className='flex justify-between items-center'>
          <div className='border-l p-[10px]'>
            <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Instructor Status</div>
            <div className='flex text-[#039855] gap-[5px]'><Image alt="Active Status" src="/images/activelogo.svg" width="20" height="20" />Active</div>

          </div>
          <div className='flex text-[#039855] gap-[5px] cursor-pointer'><Image alt="Active Status" src="/images/3dots.svg" width="20" height="20" /></div>
        </div>;

      case 'Inactive':
        return <div className='flex justify-between items-center'>
          <div className='border-l p-[10px]'>
            <div className='font-normal 3xl:text-[0.625vw] text-[12px] 3xl:leading-[0.938vw] leading-[18px] text-[#98A2B3]'>Instructor Status</div>
            <div className='flex text-[#D92D20] gap-[5px]'><Image alt="Active Status" src="/images/inactivelogo.svg" width="20" height="20" />Inactive</div>

          </div>
          <div className='flex text-[#039855] gap-[5px] cursor-pointer'><Image alt="Active Status" src="/images/3dots.svg" width="20" height="20" /></div>
        </div>


          ;
      default:
        return <>

        {rowData.profile.emailAddress==UserData?.email ? null : <div className="flex justify-between p-[10px]">
          <div className='text-[#98A2B3] top-1 left-2.5' style={{cursor:'pointer' , width: '30px', height: '50px' , display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={(event) => { menuLeft.current.toggle(event); setRowData(rowData) }}>
            <i className='hexatoolthree-dots'  aria-controls="popup_menu_left" aria-haspopup ></i>
          </div>
          <Menu model={items} className="menu-items" popup ref={menuLeft} id="popup_menu_left" style={{ width: '100px',height:'max-content' }} />
        </div> }
       
        
        </> ;
    }

  };


  const header = (
    <div className='flex justify-between'>
      <div className="flex flex-wrap items-center xl:gap-[0.521vw] gap-2">
        <div className="font-medium 3xl:text-[0.729vw] text-[14px] 3xl:leading-[1.25vw] leading-[24px] text-[#101828]">
          All Teachers
        </div>
      </div>
      <div className='flex gap-[15px] 3xl:gap-[0.781vw]'>
      
        {/* <div className='customDropdown'>
                      <Dropdown
                          value={grade}
                          onChange={(e) => handleAction(e.target.value)}
                          filter
                          options={action}
                          optionLabel="name"
                          placeholder="Action"
                          className="w-full md:w-[300px] xl:w-[340px] 3xl:w-[18.542vw]"
                      />
                  </div> */}
        <div>
          <span className="p-input-icon-left custm-search">
            <i className="hexatoolsearch text-[18px] xl:text-[16px] 3xl:text-[0.938vw] text-[#84878D] cursor-pointer pl-[5px]" />
            <InputText
              placeholder="Search"
              className="placeholder:text-[#888888] placeholder:font-normal w-full md:w-[300px] xl:w-[340px] 3xl:w-[23.75vw] inputbox-custom-sizes custhover"
              value={searchQuery}
              onChange={handleSearch}
            />
          </span>
        </div> <div className='customDropdown clear-icon closeIcon'>
          <Dropdown
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            filter
            options={STATUS}
            optionLabel="name"
            placeholder="All Status"
            className="w-full md:w-[300px] xl:w-[340px] 3xl:w-[18.542vw]"
            showClear
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="card custheader border-x rounded-lg">
        {isLoading ? <div className='flex justify-between align-center'><ProgressSpinner /></div> :

          <DataTable
            ref={dt}
            value={searchQuery.length >= 1 ? filteredData : teachersList}
            emptyMessage={<div className="flex justify-center align-center">No Data Available</div>}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="userId"
            rows={10}
            globalFilter={globalFilter}
            header={header}
          >
            <Column selectionMode="multiple"  exportable={false} ></Column>
            <Column
              header="Agent"
              filterField="representative"
              showFilterMenu={false}
              filterMenuStyle={{ width: '14rem' }}
              style={{ minWidth: '14rem' }}
              body={representativeBodyTemplate}
              filter
              filterElement={representativeRowFilterTemplate}
            />
            <Column field="code" body={nameBodyTemplate} style={{ minWidth: '10rem' }}></Column>
            <Column field="name" body={studentidBodyTemplate} style={{ minWidth: '10rem' }}></Column>
            <Column field="email" body={emailidBodyTemplate} style={{ minWidth: '10rem' }}></Column>
            <Column field="inventoryStatus" body={statusBodyTemplate} style={{ minWidth: '10rem' }}></Column>
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
