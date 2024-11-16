import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import {createTopicApi, updateTopicApi} from "../../../../actions/TopicApi"
import { toast } from 'react-toastify';
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
export default function TopicPopup(props) {
    const {setActiveOption, tabId, getTopic,topicID,topicValue} = props;

    const [topic, setTopic] = useState('')
    const [error, setError] = useState({})

    const validate = () => {
      let err = {}
      let isErr = false;
      
      if (!topic || topic.trim()=== "") {
        err.topic = 'Please Enter The Topic.'
        isErr = true
      }
      setError(err)
      return isErr
    }

    useEffect(() => {
      if(topicID)
      setTopic(topicValue)
    }, [topicID])
    

    const handleCancel = () => {
        props.setVisible(false);
        props.setShowTopicPopup(false);
      };

      const handleSave = async () =>{
        try {
          if (validate()) {
            return
        }
          if (props.classIdValue) {
              let accessToken = getDataFromLocalStorage("access_token");
              const payload = {
                  "accessToken": accessToken,
                  "courseId" : props.classIdValue,
                  "name" : topic
              };
              if(topicID){

                const response = await updateTopicApi({...payload,topicId:topicID});
                if (response.success && response.data.data) {
                   toast.success('Updated Successfully!')
                   props.setVisible(false)
                   setTopic('')
                  //  setActiveOption(tabId)
                   getTopic()
                  
                } else {
                    console.error("Failed to fetch class list");
                    toast.error(response?.message)
                    setTopic('')
                }
              }else{

                const response = await createTopicApi(payload);
                if (response.success && response.data.data) {
                   toast.success('Created Successfully!')
                   props.setVisible(false)
                   setTopic('')
                   setActiveOption(tabId)
                   getTopic()
                   props.refreshList()
                  
                } else {
                    console.error("Failed to fetch class list");
                    toast.error(response?.message)
                    setTopic('')
                }
              }

          }
          else {
              
          }
      } catch (error) {
          console.error("Error fetching class list:", error);
          toast.error('Something went wrong');
      }
      }
     
  return (
    <div>
        <Dialog
        className="custom-popup"
        visible={props.visible}
        style={{ width: "35vw" }}
        onHide={handleCancel}
      >
        <div className="p-[15px] xl:p-[15px] 2xl:p-[0.781vw]">
         <p>Create New Topic</p>
          <div className="my-[24px] xl:my-[24px] 3xl:my-[1.25vw]">
            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
              Topic<span className="text-[red]">*</span>
            </label>
            <div className="flex gap-[8px]">
              <InputText
                type="text"
                className="w-full"
                placeholder="Enter The Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />    
            </div>
            {error.topic ? <span style={{ color: 'red' }}>{error.topic}</span> : <></>}
          </div>
          <div className="flex  gap-[12px] justify-end pt-[30px] min-w-[40px] xl:min-w-[1.042vw] 3xl:min-w-[1.042vw]">
            <Link
            onClick={handleCancel}
              href=""
              className=" flex justify-center items-center border px-[18px]  py-[10px] border-[#C6CBD2] rounded-lg text-[#344054] text-[16px] xl:text-[0.833vw] font-medium "
            >
              Cancel
            </Link>
            <button
             onClick={handleSave}
              href=""
              className=" flex justify-center text-[#fff] bg-[#1570EF] items-center border px-[18px] py-[10px] border-[#1570EF] rounded-lg shadow1 text-[16px] xl:text-[0.833vw] font-medium "
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
