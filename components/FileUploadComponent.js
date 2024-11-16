import { Checkbox } from 'primereact/checkbox'
import { FileUpload } from 'primereact/fileupload'
import React, { useState } from 'react'
import ChooseFile from './popup/choosefilepopup';

export default function FileUploadComponent() {
    const [checked, setChecked] = useState(false);
    const [chooseFileShow, setChooseFileShow] = useState(false);
    return (
        <div>
            <FileUpload
                className="w-full cust_file_upload"
                chooseLabel="Choose a file or Drag it here"
                mode="basic"
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
            />
            <div onClick={() => setChooseFileShow(true)} className='flex justify-end items-center gap-2 mt-[12px] xl:mt-[0.625vw]'>
                <Checkbox
                    inputId="ingredient1"
                    className="CustomCheckBox"
                    name="pizza"
                    value="Cheese"
                    onChange={e => setChecked(e.checked)}
                    checked={checked}
                />
                <div className='text-[#344054] text-[14px] xl:text-[13px] 3xl:text-[0.829vw] font-medium cursor-pointer'>Choose from Library</div>
            </div>

            <ChooseFile
                visible={chooseFileShow}
                onhide={() => setChooseFileShow(false)}
            />
        </div>
    )
}
