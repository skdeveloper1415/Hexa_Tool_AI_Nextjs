"use client"
import React, { useEffect, useState, useRef } from 'react'
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { createPostApi, postByID, updatePostByID } from '../../../../actions/createPostApi';
import { toast } from 'react-toastify';
import { listOfActiveClassAPI } from '../../../../actions/activeClasses';
import { ProgressSpinner } from 'primereact/progressspinner';
import { listOfStudent } from '../../../../actions/studentListingApi';
import { MultiSelect } from 'primereact/multiselect';
import AITools from '../../../../../components/AITools';
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
import dynamic from 'next/dynamic';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
const QuillEditor = dynamic(() => import('../home/editorpage'))

export default function CreatePost(props) {
    const {editData, isEditPost} = props;
    const [postAttachement, setPostAttachement] = useState([]); 
    const quillRef = useRef(null);
    const [grade, setGrade] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null)
    const [classList, setClassList] = useState([])
    const [ingredient, setIngredient] = useState('');
    const [datetime12h, setDateTime12h] = useState(new Date());
    const [classStudentList, setStudentList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDraft, setDraft] = useState(false)
    const [instruction, setInstruction] = useState("")
    const [fileType, setfileType] = useState()
    const [disabled, setDisabled] = useState(false)
    const [attachmentLinks, setAttachmentLinks] = useState()


    const [error, setError] = useState({})
    const [disableDate, setdisableDate] = useState(false);
    useEffect(()=>{
        if(editData && isEditPost ){
            getPostById()
        }
    },[editData])

    useEffect(() => {
        if (props.instruction !== undefined && props.instruction !== '') {
            setInstruction(props.instruction)
        }
    }, [props.instruction])
    function handleInstruction(e) {

        setInstruction(e);
    }

    const getStudentList = async () => {
        try {

            if (props.classIdValue) {
                let accessToken = getDataFromLocalStorage("access_token");
                const payload = {
                    "accessToken": accessToken,
                    "courseId": props.classIdValue
                };

                const response = await listOfStudent(payload);
                if (response.success && response.data.data) {
                    let rawData = response.data.data;
                    let data = rawData.map((student) => { return { name: student.profile.name.fullName, code: student.profile.emailAddress }; })
                    setStudentList(data);
                    setGrade(data);
                } else {
                    console.error("Failed to fetch class list");
                }
            }
            else if (res.code == 500) {
                toast.error(res.message || 'Something Went Wrong')
                setLoading(false);
                setStudentList([]);
            }
            else {
                toast.error(res.error || 'Something Went Wrong')
                setLoading(false);
                setStudentList([]);
            }

        } catch (error) {
            console.error("Error fetching class list:", error);
            toast.error('Something went wrong vffgdfg');
        }
    };

    const getClassList = async () => {
        try {
            setLoading(true)
            if (props.classIdValue) {
                let accessToken = getDataFromLocalStorage("access_token");
                let user_data = JSON.parse(getDataFromLocalStorage("user_data"));
                const payload = {
                    "accessToken": accessToken,
                    "status": 'Active',
                    "userId": user_data.id
                };

                const response = await listOfActiveClassAPI(payload);
                if (response.success && response.data.data) {
                    let rawData = response.data.data;
                    let data = rawData.map((elem) => { return { name: elem.name, code: elem.id }; })
                    setSelectedClass((prev) => {
                        return data.find((item) => item.code === props.classIdValue)
                    })
                    setClassList(data);
                    setLoading(false)
                } else {
                    console.error("Failed to fetch class list");
                    setLoading(false)
                }
            }
            else {
                setClassList([])
                setLoading(false)

            }
        } catch (error) {
            toast.error('Something went wrong', error);
            setLoading(false)
        }
        finally {

        }
    }

    const getAlllStudents = (studentsData) => {
        let onlyEmailsArray = studentsData.map((student) => {
            return student.code
        })
        return onlyEmailsArray;
    }

    const getScheduledTime = (time) => {
        const date = new Date(time);

        if (isNaN(date.getTime())) {
            console.error('Invalid date format');
            return null;
        }

        return date.toISOString();
    }

    

    const validate = (valueDraft) => {
        let err = {}
        let isErr = false;
        if (!selectedClass) {
            err.selectedClass = 'Please Select For/Classroom.'
            isErr = true
        }
        if (!grade || grade == null) {
            err.grade = 'Please Select Students.'
            isErr = true
        }
        if (!instruction || instruction== "<p><br></p>") {
            err.instruction = 'Please Add Instruction and Template.'
            isErr = true
        }
        if (!valueDraft) {
            if (!ingredient || (ingredient === 'SelectDate' && !datetime12h)) {
                err.ingredient = 'Please Schedule Post.'
                isErr = true
            }
        }
       
        // if(fileType == undefined && fileType == null ){
        //     err.fileType = 'Please upload File.'
        //     isErr = true 
        // }
        setError(err)
        
        return isErr
    }
    const handleCreate = async (e,valueDraft) => {
        e.preventDefault()
        if (validate(valueDraft)) {
            return
        }

        try {
            setLoading(true)
            setDisabled(true)
            if (props.classIdValue) {
                let accessToken = getDataFromLocalStorage("access_token");
                const payload = {
                    "accessToken": accessToken,
                    "courseId": selectedClass?.code || classIdValue,
                    "text": instruction,
                    "state": ingredient === 'SelectDate' || valueDraft == "valueDraft" ? "Draft" : "PUBLISHED",
                    "studentIds": grade == null ? getAlllStudents(classStudentList) : getAlllStudents(grade),
                    "attachments": postAttachement,
                }
                if (datetime12h && datetime12h !== '' && ingredient === 'SelectDate') {
                    payload.scheduledTime = getScheduledTime(datetime12h)
                }



                const response = await createPostApi(payload);
                if (response.success && response?.data?.data) {
                    toast.success("Created new Post");
                    props.getPost();
                    props.setCeateNewShow(false);
                    props.setCreatePost(false);
                    props.handleClear()
                    setDisabled(false);

                } else {
                    toast.error(response?.message);
                }
            }

        } catch (error) {
            const message = error?.message ?? 'something went wrong';
            toast.error(message);
        }
        finally {
            setLoading(false);
            setDraft(false);
        }
    }

    useEffect(() => {
        getStudentList();
        getClassList();
        setdisableDate(false)
    }, [])


  
    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div>
    }

    const clearError = () => {
        setError((prevError) => ({
            ...prevError,
            instruction: "", // Clear error message
        }));
    };
    const clearData=()=>{
        setStudentList();
        setGrade();
        setInstruction("")
    }
    ///EDIT POST 
    const getPostById = async () => {
        try {

            let accessToken = getDataFromLocalStorage("access_token");

            const payload = {
                "accessToken": accessToken,
                "courseId": editData?.courseId,
                "postId" : editData?.postId,
            };

            const response = await postByID(payload);
            if (response.success && response.data.data) {

                let rawData = response?.data?.data;
                let data = rawData?.studentList?.map((student) => { return { name: student.name.fullName, code: student.emailAddress }; })
                setStudentList(data);
                setGrade(data);
                setInstruction(rawData.text)
                setSelectedClass({ name: rawData.courseId?.name, code: rawData.courseId?._id });
                setAttachmentLinks(rawData.materials)

                if (rawData?.scheduledTime) {
                    let scheduledTime = new Date(rawData?.scheduledTime);
                    if (!isNaN(scheduledTime.getTime())) {
                        setDateTime12h(scheduledTime);
                        setIngredient("SelectDate");
                    } 
                } 
                else{
                    setIngredient("immediately")
                    setdisableDate(true)
                }

                
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error", error);
            toast.error('Something went wrong');

        }
    }

    const UpdatePost = async (e,valueDraft) => {
        e.preventDefault()
        if (validate()) {
            return
        }

        try {
            setLoading(true)
            setDisabled(true)

                let accessToken = getDataFromLocalStorage("access_token");
                const payload = 
                {
                    "accessToken": accessToken,
                    "courseId":  editData?.courseId,
                    "postId": editData?.postId,
                    "text": instruction,
                    // "state": valueDraft === "valueDraft" ? "DRAFT" : "PUBLISHED",
                    // "state": "DRAFT" ,

                    "individualStudentsOptions": {
                        "studentIds": grade == null ? getAlllStudents(classStudentList) : getAlllStudents(grade),
                    },
                    // "creatorUserId": "",
                    "attachments": postAttachement
                }
                if(datetime12h && datetime12h !== '' && ingredient === 'SelectDate'){
                    payload.scheduledTime = getScheduledTime(datetime12h)
                    payload.state = "DRAFT"
                    // payload.isDraft = true
                }
                if (ingredient === 'immediately') {
                     payload.state = "PUBLISHED"
                }

         
                // if (datetime12h && datetime12h !== '' && ingredient === 'SelectDate') {
                //     payload.scheduledTime = getScheduledTime(datetime12h)
                // }

                const response = await updatePostByID(payload);
                if (response.success && response?.data?.data) {
                    toast.success("Post Updated Successfully");
                    props.getPost();
                    props.setCeateNewShow(false);
                    props.setCreatePost(false);
                    props.handleClear()
                    setDisabled(false);
                    clearData()

                } else {
                    toast.error(response?.message);
                    clearData()
                }
           
        } catch (error) {
            const message = error?.message ?? 'something went wrong';
            toast.error(message);
        }
        finally {
            setLoading(false);
            setDraft(false);
            setDisabled(false);
            props.setEditPost(false)
            clearData() 
            setdisableDate(false)
        }
    }


    return (
        <div className='flex xl:flex-nowrap flex-wrap border border-[#C8CBD0] rounded-[6px]'>
            <div className='xl:w-[65%] w-[100%] xl:border-r border-[#C8CBD0] xl:pt-[1.25vw] pt-[20px] xl:pb-[1.823vw] pb-[28px] xl:px-[2.083vw] px-[20px]'>
                <form className="inputText-667085">
                    <div className='grid grid-cols-12 xl:gap-[0.833vw] gap-[10px]'>
                        <div className='lg:col-span-6 col-span-6'>

                            {/* <div className='grid sm:grid-cols-2 xl:gap-[1.25vw] gap-[16px]'> */}
                                <div>
                                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                        For<span className="text-[red]">*</span>
                                    </label>
                                    <Dropdown
                                        filter
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.value)}
                                        options={classList}
                                        optionLabel="name"
                                        placeholder="Select Class"
                                        className="w-full"
                                    />
                                </div>
                                </div>
                                {error.selectedClass ? <span style={{ color: 'red' }}>{error.selectedClass}</span> : <></>}
                                <div className='lg:col-span-6 col-span-6'>
                                <div>
                                    {/* <Dropdown
                                        filter
                                        value={grade}
                                        onChange={(e) => setGrade(e.value)}
                                        options={classStudentList || []}
                                        optionLabel="name"
                                        placeholder="All student"
                                        className="w-full"
                                    /> */}
                                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                        Students
                                    </label>
                                    <MultiSelect
                                        filter
                                        value={grade}
                                        onChange={(e) => setGrade(e.value)}
                                        options={classStudentList || []}
                                        optionLabel="name"
                                        placeholder="All student"
                                        className="w-full" />
                                </div>
                                {error.grade ? <span style={{ color: 'red' }}>{error.grade}</span> : <></>}
                              
                            {/* </div> */}
                        </div>
                    </div>


                    <div className='grid grid-cols-12 xl:gap-[0.833vw] gap-[10px] mt-2'>
                        <div className='lg:col-span-12 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px]  text-[#344054] font-medium block mb-[6px]">
                                Add Instruction and Template<span className="text-[red]">*</span>
                            </label>
                            <div>
                                <div className='custom-editor'>
                                    <QuillEditor value={instruction}
                                        onChange={(e) => { handleInstruction(e)}}
                                        onClearError={clearError}
                                        height={300}>
                                    </QuillEditor>
                                    {/* <Editor
                                        ref={quillRef}
                                        value={instruction}
                                        headerTemplate={header}
                                        onTextChange={(e) => {setInstruction(e),,"YUDA")}}
                                        style={{ height: "300px" }}
                                        source
                                        textValue
                                    /> */}
                                    {error.instruction ? <span style={{ color: 'red' }}>{error.instruction}</span> : <></>}

                                </div>
                                <div className='flex flex-wrap gap-[5px] justify-between text-[#667085] 3xl:text-[0.625vw] text-[12px] xl:mt-[0.525vw] mt-[8px]'>
                                    <span>Auto saved at 11:30 am</span>
                                    <span>Word Count:: 150 words</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[20px] xl:pt-[1.042vw]'>
                        <div className="flex flex-wrap items-center gap-[30px] xl:gap-[1.563vw]">
                            <div className='3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#344054] font-medium'>Schedule {isDraft && <span className="text-[red]">*</span>}</div>
                            <div className="flex items-center ">
                                <RadioButton
                                    className='custCreatePost custRadio'
                                    inputId="ingredient1" name="Immediately" value="immediately"
                                    onChange={(e) => {setIngredient(e.value);
                                        setError((prevError) => ({
                                            ...prevError,
                                            ingredient: "", // Clear error message when a selection is made
                                       }))
                                    }}
                                    checked={ingredient === 'immediately'}
                                />
                                <label htmlFor="ingredient1" className="ml-2 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#344054] font-medium">Immediately</label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <div className="flex items-center ">
                                    <RadioButton
                                        className='custCreatePost custRadio'
                                        inputId="ingredient2" name="SelectDate" value="SelectDate"
                                        onChange={(e) => {setIngredient(e.value);
                                            setError((prevError) => ({
                                                ...prevError,
                                                ingredient: "", // Clear error message when a selection is made
                                           }))
                                        }}
                                        checked={ingredient === 'SelectDate'}
                                        disabled={disableDate}
                                    />
                                    <label htmlFor="ingredient1" className="ml-2 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#344054] font-medium">Select Date</label>
                                </div>
                                <Calendar
                                    id="calendar-12h"
                                    placeholder='Select Date & Time'
                                    minDate={new Date()}
                                    value={datetime12h}
                                    onChange={(e) => {setDateTime12h(e.value);
                                        setError((prevError) => ({
                                            ...prevError,
                                            ingredient: "", // Clear error message when a selection is made
                                       }))
                                    }}
                                    showTime hourFormat="12"
                                    className='timeCalendar w-[12rem] '
                                    disabled={ingredient === 'immediately' &&  disableDate}
                                />

                            </div>

                        </div>
                    </div>
                    {error.ingredient ? <span style={{ color: 'red' }}>{error.ingredient}</span> : <></>}

                    {/* <div className='pt-[20px] xl:pt-[1.042vw]'>
                        <div className='flex items-center gap-[30px] xl:gap-[1.563vw]'>
                            <div className='flex items-center 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#E57200] font-medium cursor-pointer'>
                                <i className='hexatooltag mr-[8px]'></i> Tag Students
                            </div>
                            <div className='flex items-center 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#E57200] font-medium cursor-pointer'>
                                <i className='hexatooleye mr-[8px]'></i> Set Visibility
                            </div>
                            <div className='flex items-center 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#E57200] font-medium cursor-pointer'>
                                <i className='hexatoolclock mr-[8px]'></i> Time Limit
                            </div>

                        </div>
                    </div> */}
                    <div className='mt-[40px] xl:mt-[2.083vw] flex flex-wrap justify-end xl:gap-[0.525vw] gap-[10px] '>
                        <div className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px] cursor-pointer' onClick={() => {
                            if (props.CeateNewShow == true) {
                                props.setCeateNewShow(false)
                            }
                        }}>
                            Cancel
                        </div>
                        <div
                        //  onClick={() => { setDraft(true); handleDraft() }}
                        onClick={(e) => {
                            if (isEditPost) {
                                UpdatePost(e,"valueDraft")
                            }else{
                                handleCreate(e,"valueDraft") 
                            }
                        }}
                         className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px] cursor-pointer'>
                            Save as Draft
                        </div>
                        <div onClick={(e) => {
                                if (isEditPost) {
                                    UpdatePost(e)
                                }else{
                                     handleCreate(e) 
                                }
                             }}
                              className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center cursor-pointer ${disabled ? "pointer-events-none" : null} `}>
                            Post
                        </div>

                    </div>
                </form>
            </div>

            <div className='xl:w-[35%] w-[100%] xl:pt-[1.04vw] pt-[16px] xl:pb-[1.823vw] pb-[28px] xl:px-[1.25vw] px-[16px] flex flex-col items-start xl:gap-[1.04vw] gap-[14px]'>
                <div className='w-full'>
                    <AITools   attachmentLinks={attachmentLinks}   setMaterialLinks={setPostAttachement}  setfileType={setfileType} type={"Post"} />
                    {error.fileType ? <span style={{ color: 'red' }}>{error.fileType}</span> : <></>}
                </div>
            </div>
        </div>
    )
}
