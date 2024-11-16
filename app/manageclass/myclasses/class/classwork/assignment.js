"use client"
import React, { useEffect, useState } from 'react'
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/primereact.min.css";
import Image from 'next/image';
import AssignAndSend from '../../../../../components/popup/assignandsend';
import { Calendar } from 'primereact/calendar';
import { usePathname } from "next/navigation";
import { UpdateAssignmentbyID, createclassAssignment, getAssignment } from '../../../../actions/classowrkListing';
import { toast } from 'react-toastify';
import { listOfStudent } from '../../../../actions/studentListingApi';
import { getTopicList } from '../../../../actions/Topic';
import { listOfActiveClassAPI } from '../../../../actions/activeClasses';
import { ProgressSpinner } from 'primereact/progressspinner';
import MultiChoiceAssesment from '../../../../../components/multiChoiceAssessment';
import MultiStepAssessment from '../../../../../components/multiStepAssessment';
import MathSpiralView from '../../../../../components/mathSpiralView';
import MathStoryWordProblems from '../../../../../components/mathstorywordproblem';
import AIRubric from '../../../../../components/airubric';
import AITools from '../../../../../components/AITools';
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
import dynamic from 'next/dynamic';
import AIDBQ from '../../../../../components/aiDbq';
const QuillEditor = dynamic(() => import('../home/editorpage'))


export default function Assignment({ setShowAssignment, getAssignments, tabId, setActiveOption, courseIdNo, assignmentId, isEdit, handleEditChange, dataFromReuse }) {
    const [assignAndSendShow, setAssignAndSendShow] = useState();
    const [allStudent, setAllStudent] = useState([])
    const [instruction, setInstruction] = useState('');
    const [topics, setTopics] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const [classList, setClassList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [workType, setWorkType] = useState();
    const [id, setId] = useState(assignmentId)
    const [courseID, setCourseID] = useState(courseIdNo)
    const [assighmentAttach, setAssighmentAttachLinks] = useState([]);
    const [attachmentLinks, setAttachmentLinks] = useState()
    const [isFormIconDisable, setisFormIconDisable] = useState(true)
    const [question, setQuestion] = useState([])

    const [assignment, setAssignments] = useState({
        grade: '',
        student: '',
        type: '',
        dueDate: '',
        topic: '',
        title: '',
        instruction: '',
    })

    const [title, setTitle] = useState(assignment.title); 

    const [fileType, setfileType] = useState()

    //Getting data from ReusePost
    useEffect(() => {
        if (dataFromReuse?.id && dataFromReuse?.courseId) {
            getAssignmentByID();
        }
    }, [dataFromReuse]);



    const numericRegex = /^[0-9]*$/;
    const handleInputChange = (e) => {
        const { value } = e.target;
        if (numericRegex.test(value)) {
            setAssignments({ ...assignment, type: value });
            setError((prevError) => ({
                ...prevError,
                points: "",
            }))
        }
    };

    function handleInstruction(e) {
        setInstruction(e);
    }

    const pathname = usePathname();
    const parts = pathname.split("/");
    const courseId = parts[parts.length - 1];
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [isActionVisible, setisActionVisible] = useState(false)
    const [clickEventForSave, setClickEventForSave] = useState(false)
    const [clickEventForDraft, setClickEventForDraft] = useState(false)

    const shoWData = () => {
        const formattedContent = response?.Content.join("\n");
        const editorValues = `${response?.Title}\n\n${formattedContent}`;
        setInstruction(editorValues)
    }

    // useEffect(() => {

    //     if (instruction) {
    //         const topicRegex = /Topic:\s*<\/strong>\s*<span>(.+?)<\/span>/;
    //         const match = instruction.match(topicRegex);
    //         if (match && match.length > 1) {
    //             const extractedTopic = match[1].trim();
    //             setAssignments(prevAssignment => ({
    //                 ...prevAssignment,
    //                 title: extractedTopic // Update the topic in the assignment state
    //             }));
    //         } else {
    //             console.log("Topic not found in the response.");
    //         }
    //     }

    // }, [instruction]);


    useEffect(() => {
        if (isEdit) {
            getAssignmentByID()
        }
    }, [isEdit])


    useEffect(() => {
        if (courseId) {
            getClassList()
        }
        getStudent();
        getTopic()
    }, [])

    const getStudent = async () => {
        let accessToken = getDataFromLocalStorage("access_token");
        try {
            const body = {
                accessToken: accessToken,
                courseId: courseId,
            }
            const res = await listOfStudent(body)
            if (res.code == 200) {
                const response = res.data?.data?.length ? res.data.data.map((ele) => {
                    return {
                        name: ele.profile.name.fullName,
                        id: ele.profile.emailAddress
                    }
                }) : []
                setAllStudent(response)
                setAssignments({ student: response })
            }
            else if (res.code == 500) {
                toast.error(res.message || 'Something Went Wrong')
                setLoading(false);
            }
            else {
                toast.error(res.error || 'Something Went Wrong')
                setLoading(false);
            }


        } catch (error) {

            toast.error("something went wrong");
        }
    }

    const getTopic = async () => {
        let accessToken = getDataFromLocalStorage("access_token");
        try {
            const body = {
                accessToken: accessToken,
                courseId: courseId,
            }
            const res = await getTopicList(body)
            if (res.code == 200) {
                const response = res?.data?.data?.length ? res.data.data.map((ele) => {
                    return {
                        name: ele.name,
                        id: ele.topicId
                    }
                }) : []
                setTopics(response)
            }
            else if (response.code == 500) {
                toast.error(res.message || 'Something Went Wrong')
                setIsLoading(false);
            }
            else {
                toast.error(res.error || 'Something Went Wrong')
                setIsLoading(false);
            }

        } catch (error) {

            toast.error("something went wrong");
        }
    }

    const handleMultiChoice = () => {
        setVisible(true);
    };

    const handleMultiStep = () => {
        setVisible1(true);
    };

    const handleMathStoryProblem = () => {
        setVisible2(true);
    }

    const handleMathSpiralView = () => {
        setVisible3(true)
    }

    const handleLubric = () => {
        setVisible4(true)
    }

    const validate = () => {
        try {
            let error = {}
            let flag = false
            if (!selectedClass?.name) {
                error.grade = 'Please Select Grade'
                flag = true
            }
            if (!assignment.student) {
                error.student = 'Please Select student'
                flag = true
            }
            if (!assignment.type) {
                error.type = 'Please Enter Set Points'
                flag = true
            }
            if (!assignment.dueDate) {
                error.dueDate = 'Please Select Due Date'
                flag = true
            }
            if (!assignment.title) {
                error.title = 'Please Enter Title'
                flag = true
            }
            if (!assignment?.topic?.id) {
                error.topic = 'Please Select Topic'
                flag = true
            }
            setError(error)
            return flag
        } catch (error) {
            console.log('error:', error);

        }

    }

    const handleSave = async (e, type) => {
        e.preventDefault()
        if (validate()) {
            return
        }
        if (type == 'Publish') {
            setClickEventForSave(true)
        }
        if (type == 'Draft') {
            setClickEventForDraft(true)
        }

        const date = new Date(assignment.dueDate).getDate()
        const year = new Date(assignment.dueDate).getFullYear()
        const month = new Date(assignment.dueDate).getMonth() + 1
        const hours = new Date(assignment.dueDate).getHours();
        const minutes = new Date(assignment.dueDate).getMinutes();
        const seconds = new Date(assignment.dueDate).getSeconds();
        try {
            if (courseId) {

                let accessToken = getDataFromLocalStorage("access_token");
                const payload = {
                    "accessToken": accessToken,
                    "courseId": courseId,
                    "assignmentPayload": {
                        "workType": "ASSIGNMENT",
                        "title": assignment.title ? assignment.title : '',
                        "description": instruction ? instruction : '',
                        "state": type == 'Publish' ? 'PUBLISHED' : 'DRAFT',
                        "dueDate": {
                            "year": year,
                            "month": month,
                            "day": date
                        },
                        "dueTime": {
                            "hours": hours,
                            "minutes": minutes,
                            "seconds": seconds
                        },
                        "topicId": assignment.topic.id,
                        "maxPoints": Number(assignment.type ? assignment.type : 0),
                    },
                    attachments: assighmentAttach

                }
                if (assignment.student.length > 0) {
                    payload.assignmentPayload.assigneeMode = "INDIVIDUAL_STUDENTS";
                    payload.assignmentPayload.individualStudentsOptions = {
                        "studentIds": assignment.student.map((ele) => ele.id)
                    };
                }
                const response = await createclassAssignment(payload);
                if (response?.code == 200) {
                    toast.success("Assignment created successfully.");
                    setShowAssignment(false)
                    getAssignments()
                    clearFields();
                    clickEvents();
                    setActiveOption(tabId)
                }
            }
        } catch (error) {
            clickEvents();
            toast.error(error);
        }
    }

    const getClassList = async () => {
        try {
            setLoading(true)
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
                    return data.find((item) => item.code === courseId)
                })
                setClassList(data);
                setLoading(false)
            } else {
                console.error("Failed to fetch class list");
                setLoading(false)
            }


        } catch (error) {
            console.error("Error fetching class list:", error);
            toast.error('Something went wrong');
            setLoading(false)
        }

    }
    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center' }}><ProgressSpinner style={{ margin: 'auto' }} /></div>
    }

    const removeAIdata = () => {
        // const quill = document.querySelector('.ql-editor');
        // if (quill) {
        //     quill.innerHTML = '';
        // }
        setInstruction('')
        setisActionVisible(false)
    };
    const HandleDelete = (e) => {
        e.preventDefault()
        setShowAssignment(false)
        setActiveOption(tabId)
    }

    ////////////  Edit Assignment  ////////////////////////////////


    const getAssignmentByID = async () => {
        try {

            let accessToken = getDataFromLocalStorage("access_token");

            const payload = {
                "accessToken": accessToken,
                "courseId": isEdit ? courseID : dataFromReuse?.courseId,
                "assignmentId": isEdit ? id : dataFromReuse?.id,
            };
            const response = await getAssignment(payload);
            if (response.success && response.data.data) {

                let rawData = response?.data?.data;

                // const dueDate = new Date(rawData.dueDate.year, rawData.dueDate.month, rawData.dueDate.day,rawData?.dueDate?.hours, rawData?.dueDate?.minutes, rawData?.dueDate?.seconds ?rawData?.dueDate?.seconds:'00' );
                const dueDate = new Date(rawData.dueDate.year, rawData.dueDate.month, rawData.dueDate.day, rawData?.dueTime?.hours, rawData?.dueTime?.minutes, rawData?.dueTime?.seconds ? rawData?.dueTime?.seconds : '00');
                let selectedTopic = response?.data?.topic;

                const options = response?.data.studentList.map(student => ({
                    name: student.userProfile.name.fullName,
                    id: student.userProfile.emailAddress
                }));

                setAssignments({
                    ...assignment,
                    type: rawData.maxPoints,
                    dueDate: dueDate,
                    topic: { name: selectedTopic.name, id: selectedTopic.topicId },
                    title: rawData.title,
                    student: options
                })
                setAttachmentLinks(rawData.materials)
                setInstruction(rawData.description)
                setWorkType(rawData.workType)
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error", error);
            toast.error('Something went wrong');

        }
    }
    //Update Assignment
    const updateAssignment = async (e, type) => {
        e.preventDefault()
        if (validate()) {
            return
        }
        if (type == 'Publish') {
            setClickEventForSave(true)
        }
        if (type == 'Draft') {
            setClickEventForDraft(true)
        }

        const date = new Date(assignment.dueDate).getDate()
        const year = new Date(assignment.dueDate).getFullYear()
        const month = new Date(assignment.dueDate).getMonth() + 1
        const hours = new Date(assignment.dueDate).getHours();
        const minutes = new Date(assignment.dueDate).getMinutes();
        const seconds = new Date(assignment.dueDate).getSeconds();

        try {
            let accessToken = getDataFromLocalStorage("access_token");

            const payload = {
                "accessToken": accessToken,
                "courseId": courseID,
                "assignmentId": id,
                "assignmentPayload": {
                    "workType": workType,
                    "title": assignment.title ? assignment.title : '',
                    "description": instruction ? instruction : '',
                    "state": type == 'Publish' ? 'PUBLISHED' : 'DRAFT',
                    "dueDate": {
                        "year": year,
                        "month": month,
                        "day": date
                    },
                    "dueTime": {
                        "hours": hours,
                        "minutes": minutes,
                        "seconds": seconds
                    },
                    "topicId": assignment.topic.id,
                    "maxPoints": assignment.type ? assignment.type.toString() : 0,
                }
            }

            const response = await UpdateAssignmentbyID(payload);
            if (response?.code == 200) {
                toast.success("Assignment updated successfully.");
                setShowAssignment(false)
                getAssignments()
                clearFields()
                clickEvents();
                handleEditChange(false)
            } else {
                toast.error('Something went wrong ');
                console.error("Something went wrong ");
                clickEvents();
                setActiveOption(tabId)
                clearFields()

            }
        } catch (error) {
            console.error("Error", error);
            toast.error('Something went wrong ');

        }
    }

    const clearFields = () => {
        setAssignments({
            grade: '',
            student: '',
            type: '',
            dueDate: '',
            topic: '',
            title: '',
        })
        setInstruction('')
        setAssighmentAttachLinks([])
    }
    const clickEvents = () => {
        setClickEventForSave(false)
        setClickEventForDraft(false)
    }

    return (
        <>
            <div className='flex xl:flex-nowrap flex-wrap border border-[#C8CBD0] rounded-[6px]'>
                <div className='xl:w-[65%] w-[100%] xl:border-r border-[#C8CBD0] xl:pt-[1.25vw] pt-[20px] xl:pb-[1.823vw] pb-[28px] xl:px-[2.083vw] px-[20px]'>
                    <form className="inputText-667085">
                        <div className='grid grid-cols-12 xl:gap-[0.833vw] gap-[10px]'>
                            <div className='lg:col-span-9 col-span-12'>
                                <div className='grid sm:grid-cols-2 xl:gap-[1.25vw] gap-[16px]'>
                                    <div>
                                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium mb-[6px]">
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
                                        {error.grade ? <span style={{ color: 'red', fontSize: '14px' }}>{error.grade}</span> : <></>}
                                    </div>
                                    <div className='newClass1'>
                                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium mb-[6px]">
                                            Students
                                        </label>
                                        <MultiSelect
                                            filter
                                            // value={grade}
                                            // onChange={(e) => setGradeLevel(e.value)}
                                            options={allStudent}
                                            optionLabel="name"
                                            placeholder={allStudent?.length === 0 ? "No Student" : "All Student"}
                                            className="w-full"
                                            value={assignment.student}
                                            onChange={(e) => setAssignments({ ...assignment, student: e.value })}
                                        />
                                        {error.student ? <span style={{ color: 'red', fontSize: '14px' }}>{error.student}</span> : <></>}
                                    </div>
                                </div>
                            </div>

                            <div className='lg:col-span-3 col-span-12'>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[3px]">
                                    Set Points<span className="text-[red]">*</span>
                                </label>
                                <InputText
                                    value={assignment.type}
                                    keyfilter={numericRegex}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        if (e.target.value) {
                                            setError({ ...error, type: '' })
                                        }
                                    }}
                                    placeholder="Type here"
                                    className="w-full custinput"
                                />
                                {error.type ? <span style={{ color: 'red', fontSize: '14px' }}>{error.type}</span> : <></>}
                            </div>
                            <div className='lg:col-span-6 col-span-12'>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                    Due Date<span className="text-[red]">*</span>
                                </label>
                                <Calendar className="w-full" value={assignment.dueDate}
                                    minDate={new Date()}
                                    placeholder='Select Date'
                                    showTime hourFormat="24"

                                    onChange={(e) => {
                                        setAssignments({ ...assignment, dueDate: e.value })
                                        if (e.value) {
                                            setError({ ...error, dueDate: '' })
                                        }
                                    }} />
                                {error.dueDate ? <span style={{ color: 'red', fontSize: '14px' }}>{error.dueDate}</span> : <></>}
                            </div>
                            <div className='lg:col-span-6 col-span-12'>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                    Topic<span className="text-[red]">*</span>
                                </label>
                                <Dropdown
                                    filter
                                    value={assignment.topic}
                                    onChange={(e) => {
                                        setAssignments({ ...assignment, topic: e.value })
                                        if (e.value) {
                                            setError({ ...error, topic: '' })
                                        }
                                    }}
                                    options={topics}
                                    optionLabel="name"
                                    placeholder={topics.length === 0 ? "No topic" : "Select topic"}
                                    className="w-full"
                                />
                                {error.topic ? <span style={{ color: 'red', fontSize: '14px' }}>{error.topic}</span> : <></>}
                            </div>
                            <div className='lg:col-span-12 col-span-12'>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                    Title<span className="text-[red]">*</span>
                                </label>
                                <InputText
                                    placeholder="Type here"
                                    className="w-full"
                                    value={assignment.title}
                                    onChange={(e) => {
                                        setAssignments({ ...assignment, title: e.target.value })
                                        if (e.target.value) {
                                            setError({ ...error, title: '' })
                                        }
                                    }}
                                />
                                {error.title ? <span style={{ color: 'red', fontSize: '14px' }}>{error.title}</span> : <></>}
                            </div>
                            <div className='lg:col-span-12 col-span-12'>
                                <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                    Add Instruction and Template
                                </label>
                                <div>
                                    <div className='custom-editor'>
                                        {/* <Editor style={{ height: '120px' }}
                                            // onTextChange={(e)=>setAssignments({...assignment,instruction:e.htmlValue})}
                                            onTextChange={(e) => setInstruction(e.htmlValue)}
                                        /> */}
                                        {/* <QuillEditor value={'<table><tbody><tr><td data-row="row-9jmd"><br></td></tr><tr><td data-row="row-gh33"><br></td></tr><tr><td data-row="row-9jmd"><br></td></tr></tbody></table><p><br></p>'} onChange={(e) => { handleInstruction(e); }} height={300}> */}

                                        <QuillEditor value={instruction} onChange={(e) => { handleInstruction(e); }} height={300}>
                                        </QuillEditor>
                                    </div>
                                    <div className='flex flex-wrap gap-[5px] justify-between text-[#667085] 3xl:text-[0.625vw] text-[12px] xl:mt-[0.525vw] mt-[8px]'>
                                        <span>Auto saved at 11:30 am</span>
                                        <span>Word Count:: 150 words</span>
                                    </div>
                                </div>
                            </div >
                        </div >
                        <div className='xl:mt-[1.146vw] mt-[18px] flex flex-wrap justify-end xl:gap-[0.525vw] gap-[10px]'>

                            <button onClick={(e) => { HandleDelete(e) }} className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                                Cancel
                            </button>
                            {/* <button onClick={(e) => { e.preventDefault(); handleLubric() }} className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                                Add Rubric
                            </button> */}
                            <button disabled={clickEventForDraft || clickEventForSave} className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'
                                onClick={(e) => {
                                    if (isEdit) {
                                        updateAssignment(e, 'Draft');
                                    } else {
                                        handleSave(e, 'Draft')
                                    }
                                }}
                            >
                                {clickEventForDraft ? "Please Wait..." : " Save As Draft"}
                            </button>
                            <button disabled={clickEventForSave || clickEventForDraft} className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'
                                onClick={(e) => {
                                    if (isEdit) {
                                        updateAssignment(e, 'Publish');
                                    } else {
                                        handleSave(e, 'Publish')
                                    }
                                    // handleSave(e, 'Publish')
                                }}
                            >
                                {clickEventForSave ? "Please Wait..." : "Save"}
                            </button>

                        </div>
                    </form >
                </div >

                <></>

                <div className='xl:w-[35%] w-[100%] xl:pt-[1.04vw] pt-[16px] xl:pb-[1.823vw] pb-[28px] xl:px-[1.25vw] px-[16px] flex flex-col items-start xl:gap-[1.04vw] gap-[14px]'>
                    <div className='w-full'>
                        <AITools
                            tabId={tabId}
                            question={question}
                            isFormIconDisable={isFormIconDisable}
                            setMaterialLinks={setAssighmentAttachLinks}
                            attachmentLinks={attachmentLinks}
                        />
                    </div>

                    <div className='w-full'>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            AI Tools
                        </label>
                        <div className='grid xl:gap-[0.625vw] gap-[8px] pr-[80px] xl:pr-[80px] 3xl:pr-[4.167vw] '>
                            {/*  <button onClick={handleMultiChoice} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                                <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                                AI Blog Creator
                            </button> */}
                            <button onClick={handleMultiStep} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                                <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                                AI Assignment Builder
                            </button>
                            <button onClick={handleMathStoryProblem} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                                <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                                AI DBQ
                            </button>
                            {/*  <button onClick={handleMathSpiralView} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                                <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                                AI Brain Breaks
                            </button>
                            <button onClick={handleLubric} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                                <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />Classroom Lesson Planning
                            </button> */}
                            {
                                isActionVisible ? (
                                    <button onClick={() => { removeAIdata(); setisFormIconDisable(true) }} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-red-600 font-medium  xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                                        <i className="pi pi-minus-circle" style={{ color: 'red' }}></i>
                                        Remove Content
                                    </button>
                                ) : ("")
                            }

                        </div>
                    </div>
                </div>
                <AssignAndSend
                    visible={assignAndSendShow}
                    onhide={() => setAssignAndSendShow(false)}
                />
            </div >
            <MultiChoiceAssesment
                setisFormIconDisable={setisFormIconDisable}
                setQuestion={setQuestion}
                visible={visible}
                onhide={() => setVisible(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}
                multiStepAssessment={false}
            />
            <MultiStepAssessment
                visible={visible1}
                onhide={() => setVisible1(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}
                multiStepAssessment={true}
                setAssignments={setAssignments}
            />
            <MathSpiralView
                visible={visible3}
                onhide={() => setVisible3(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}
                multiStepAssessment={false}
            />
           {/*  <MathStoryWordProblems
                mathstoryVisible={visible2}
                onhide={() => setVisible2(false)}
                setInstruction={setInstruction}
                shoWData={shoWData}
                isActionVisible={setisActionVisible}
                multiStepAssessment={false}
            /> */}
            <AIDBQ 
            mathstoryVisible={visible2}
                onhide={() => setVisible2(false)}
                setInstruction={setInstruction}
                shoWData={shoWData}
                setTitle={setTitle}
                setAssignments={setAssignments}
                multiStepAssessment={false}></AIDBQ>

            <AIRubric
                Visible={visible4}
                onhide={() => setVisible4(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}
                multiStepAssessment={false}
            />
        </>
    )
}
