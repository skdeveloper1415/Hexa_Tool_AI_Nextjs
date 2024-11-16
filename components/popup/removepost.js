import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Image from "next/image";
import 'primeicons/primeicons.css';
import { Checkbox } from "primereact/checkbox";

function RemovePost({ visible, setRemovepost }) {
    const [checked, setChecked] = useState(false);
    const onHide =()=>{
        setRemovepost(false)
    }
  return (
    <>
      <Dialog
        header=""
        visible={visible}
        className="customdialog customremove  3xl:w-[28vw] xl:w-[35vw] w-[450px]"
        draggable={false}
      >
        <div>

          <div className="flex justify-center items-center pt-[30px]">
            <i className=" pi pi-trash text-[#D92D20] text-[20px] xl:text-[20px] 3xl:text-[1.042vw] bg-[#FEE4E2]  p-[10px] xl:p-[10px] 3xl:p-[0.521vw] rounded-full"></i>
          </div>
          <div className="flex justify-center items-center text-[18px] xl:text-[18px] 3xl:text-[0.938vw] font-medium text-[#101828]  pt-[14px] xl:pt-[14px] 3xl:pt-[0.729vw] ">
          Are you sure you want to remove this post
          </div>
          <div className="flex justify-center items-center py-[20px] xl:py-[20px] 3xl:py-[1.042vw] text-[14px]  xl:text-[14px] 3xl:text-[0.729vw] text-[#667085]">
          Are you sure you want to delete this post? This action cannot be undone.
          </div>
          <div className="flex justify-between">

<div className="flex items-center">
<div>
<Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
</div>
<div className="text-[14px] xl:text-[14px] 3xl:text-[0.729vw] pl-[10px] xl:pl-[10px] 3xl:pl-[0.521vw]">Don’t show again</div>
</div>


<div className="flex justify-between gap-6">

    <div className="px-[16px] xl:px-[16px] 3xl:px-[0.833vw] py-[8px] xl:py-[8px] 3xl:py-[0.417vw] border border-[#C6CBD2] rounded-[6px] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] text-[#344054] cursor-pointer" onClick={onHide}>Cancel</div>
    <div className="px-[16px] xl:px-[16px] 3xl:px-[0.833vw] py-[8px] xl:py-[8px] 3xl:py-[0.417vw] border rounded-[6px] bg-[#D92D20] text-[white] text-[14px] xl:text-[14px] 3xl:text-[0.729vw] cursor-pointer" onClick={onHide}>Remove</div>
</div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default RemovePost;
