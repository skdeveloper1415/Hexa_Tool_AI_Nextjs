import { DataView } from 'primereact/dataview'
import React, { useState } from 'react'
import { Checkbox } from "primereact/checkbox";
import Image from 'next/image';
import { Avatar } from 'primereact/avatar';
import { getDataFromLocalStorage } from '../helper/commonFunction';

export default function AllMailTable({ data, setShowReply,setRowData }) {

  //let userInfo = getDataFromLocalStorage('user_data') ? JSON.parse(getDataFromLocalStorage('user_data')) : ''

  console.log("data email:-",data);

  // const [checked, setChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log("selectedRows :-", selectedRows);

  const itemTemplate = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div onClick={(e) => {setRowData(product);setShowReply(true);}} className='px-[15px] 3xl:px-[0.781vw] py-[10px] xl:py-[0.521vw] border-b border-b-[#E4E7EC] cursor-pointer'>
          <div className='grid grid-cols-12 content-center'>
            <div className='col-span-3'>
              <div className='inline-flex items-center gap-[15px] xl:gap-[12px] 3xl:gap-[0.781vw]'>
                {/* <Checkbox className='CustomCheckBox'
                  onChange={e => setChecked(e.checked)}
                  onClick={(e) => e.stopPropagation()}
                  checked={checked}
                ></Checkbox> */}
                <Checkbox
                  checked={selectedRows.includes(product)}
                  onChange={(e) => handleRowSelect(product, e.checked)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div>
                  {/* <Image 
                  src={`/images/${product.image}`}
                    width={42} height={42}
                    className='h-[42px] xl:h-[40px] 3xl:h-[2.188vw] w-[42px] xl:w-[40px] 3xl:w-[2.188vw]  rounded-full'
                    alt='' /> */}
                    <Avatar label={product?.name.charAt(0).toUpperCase()} shape="circle" style={{ backgroundColor: '#2196F3', color: '#ffffff' }}/>
                </div>
                <div>
                  <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#101828]">
                  {/* Wade Warren2 */}
                  {
                    product?.name                    
                  }
                  </div>
                  <div className="3xl:text-[0.625vw] xl:text-[10px] text-[12px] font-normal text-[#667085]">
                    {/* {product.grade} */}
                    2st Grade
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-6'>
              <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#101828]">
                {product.title}
                {/* {product.snippet} */}

              </div>
              <div className="3xl:text-[0.625vw] xl:text-[10px] text-[12px] font-normal text-[#667085]">
                {product.subtitle}
              </div>
            </div>
            <div className='col-span-2 flex items-center'>
              <div className="3xl:text-[0.729vw] xl:text-[12px] text-[14px] font-normal text-[#667085]">
                {product.date}
                {/* Tue, Mar 7, 4:15 PM (Today) */}
              </div>
            </div>
            <div className='col-span-1 place-self-center flex items-center'>
              <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#667085] flex items-center gap-[20px] xl:gap-[22px] 3xl:gap-[1.042vw]">
                <button><i className='hexatoolstart-outline'></i></button>
                <button><i className='hexatooltag'></i></button>
                <button><i className='hexatoolthree-dots'></i></button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product, index) => {
      return itemTemplate(product, index);
    });

    return <div className="grid grid-nogutter border-[1px] border-[#C8CBD0] rounded-b-[8px]">{list}</div>;
  };

  const header = () => {
    return (
      <div className='relative'>
        {selectedRows.length>0 &&
          <div className='absolute -top-8'>
            <div className='flex items-center gap-[16px] xl:gap-[18px] 3xl:gap-[1.042vw]'>
              <button onClick={() => setSelectedRows([])}>
                <Image src={'/images/checkbox_minus.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
              </button>
              <button className='flex items-center gap-2'>
                <Image src={'/images/archive_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Archived</div>
              </button>
              <button className='flex items-center gap-2'>
                <Image src={'/images/book_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Read</div>
              </button>
              <button className='flex items-center gap-2'>
                <Image src={'/images/book_unread_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Unread</div>
              </button>
              <button className='flex items-center gap-2'>
                <Image src={'/images/delete_icon.svg'} width={12} height={12} className='w-[12px] xl:w-[14px] 3xl:w-[0.625vw] h-[12px] xl:h-[14px] 3xl:h-[0.625vw]' alt=''></Image>
                <div className='text-[14px] xl:text-[13px] 3xl:text-[0.729vw] text-[#1570EF] font-medium'>Delete</div>
              </button>
            </div>
          </div>
        }

        <div className='inline-flex items-center gap-[15px] xl:gap-[12px] 3xl:gap-[0.781vw] px-[24px] xl:px-[22px] 3xl:px-[1.25vw] py-[12px] xl:py-[10px] 3xl:py-[0.625vw] border-b-[3px] border-b-[#1570EF] cursor-pointer'>
          {/* <div className='h-[42px] xl:h-[40px] 3xl:h-[2.188vw] w-[42px] xl:w-[40px] 3xl:w-[2.188vw] bg-[#1570EF] flex items-center justify-center rounded-full text-[#FFF] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] '>
            A
          </div> */}
          {/* <Avatar label={userInfo?.picture} size='large' shape="circle" style={{ backgroundColor: '#2196F3', color: '#ffffff' }}/> */}
          {/* <Avatar label={<img src={userInfo?.picture} alt="U" />} size='large' shape="circle" style={{ backgroundColor: '#2196F3', color: '#ffffff' }}/> */}

          <div>
            <div className='flex items-center gap-[5px]'>
              <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-medium text-[#101828]">
                All Mail
              </div>
              <div>
                <div className='bg-[#1570EF] text-[#FFF] 3xl:text-[0.729vw] xl:text-[12px] text-[14px] font-medium px-[6px] py-[2px] rounded-[6px]'>2 New</div>
              </div>
            </div>
            <div className="3xl:text-[0.625vw] xl:text-[10px] text-[12px] font-normal text-[#667085]">
              All Mail
            </div>
          </div>
        </div>
        {selectedRows.length>0 &&
          <>
            <div className='inline-flex items-center gap-[15px] xl:gap-[12px] 3xl:gap-[0.781vw] px-[24px] xl:px-[22px] 3xl:px-[1.25vw] py-[12px] xl:py-[10px] 3xl:py-[0.625vw] cursor-pointer'>
              <div className='h-[42px] xl:h-[40px] 3xl:h-[2.188vw] w-[42px] xl:w-[40px] 3xl:w-[2.188vw] border border-[#1570EF] bg-[#a2c5f8] flex items-center justify-center rounded-full text-[#1570EF] text-[18px] xl:text-[16px] 3xl:text-[0.938vw]'>
                A
              </div>
              <div>
                <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#101828]">
                  Admin
                </div>
                <div className="3xl:text-[0.625vw] xl:text-[10px] text-[12px] font-normal text-[#667085]">
                  Admin Messages
                </div>
              </div>
            </div>
            <div className='inline-flex items-center gap-[15px] xl:gap-[12px] 3xl:gap-[0.781vw] px-[24px] xl:px-[22px] 3xl:px-[1.25vw] py-[12px] xl:py-[10px] 3xl:py-[0.625vw] cursor-pointer'>
              <div className='h-[42px] xl:h-[40px] 3xl:h-[2.188vw] w-[42px] xl:w-[40px] 3xl:w-[2.188vw] border border-[#1570EF] bg-[#a2c5f8] flex items-center justify-center rounded-full text-[#1570EF] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] '>
                P
              </div>
              <div>
                <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#101828]">
                  Students
                </div>
                <div className="3xl:text-[0.625vw] xl:text-[10px] text-[12px] font-normal text-[#667085]">
                  Students Messages
                </div>
              </div>
            </div>
            <div className='inline-flex items-center gap-[15px] xl:gap-[12px] 3xl:gap-[0.781vw] px-[24px] xl:px-[22px] 3xl:px-[1.25vw] py-[12px] xl:py-[10px] 3xl:py-[0.625vw] cursor-pointer'>
              <div className='h-[42px] xl:h-[40px] 3xl:h-[2.188vw] w-[42px] xl:w-[40px] 3xl:w-[2.188vw] border border-[#1570EF] bg-[#a2c5f8] flex items-center justify-center rounded-full text-[#1570EF] text-[18px] xl:text-[16px] 3xl:text-[0.938vw] '>
                P
              </div>
              <div>
                <div className="3xl:text-[0.833vw] xl:text-[14px] text-[16px] font-normal text-[#101828]">
                  Family
                </div>
                <div className="3xl:text-[0.625vw] xl:text-[10px] text-[12px] font-normal text-[#667085]">
                  Family Messages
                </div>
              </div>
            </div>
          </>
        }
      </div>
    );
  };


  const handleRowSelect = (item, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, item]);
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== item));
    }
  };

  return (
    <DataView
      className='custTabview'
      value={data}
      header={header()}
      listTemplate={listTemplate}
      paginator
      rows={5}
    />
  )
}
