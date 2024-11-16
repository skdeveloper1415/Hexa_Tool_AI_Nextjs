"use client"
import React, { useEffect, useState } from 'react'
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { FileUpload } from 'primereact/fileupload';
import Image from 'next/image';
import AssignAndSend from '../../../../../components/popup/assignandsend';
import { getTopicListApi } from '../../../../actions/TopicApi';
import { listOfActiveClassAPI } from '../../../../actions/activeClasses';
import { ProgressSpinner } from 'primereact/progressspinner';
import MathStoryWordProblems from '../../../../../components/mathstorywordproblem';
import { Calendar } from 'primereact/calendar';
import { createAssignmentQuizApi, getQuizAssignment, updateQuizAssignment } from '../../../../actions/createQuiz/createQuize';
import { toast } from 'react-toastify';
import { MultiSelect } from 'primereact/multiselect';
import AIRubric from '../../../../../components/airubric';
import MultiChoiceAssesment from '../../../../../components/multiChoiceAssessment';
import MultiStepAssessment from '../../../../../components/multiStepAssessment';
import MathSpiralView from '../../../../../components/mathSpiralView';
import QuillEditor from '../home/editorpage';
import AITools from '../../../../../components/AITools';
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
import { listOfStudent } from '../../../../actions/studentListingApi';
import AIDBQ from '../../../../../components/aiDbq';
import Link from "next/link";

export default function QuizAssignment(props) {
    const { classIdValue, setShowQuizAssignment, setActiveOption, tabId, idOfQuize, courseIdOfQuize, isQuizEdit, dataFromReuse } = props;
    const [topicList, setTopicList] = useState([])
    const [topicName, setTopicNamne] = useState();
    const [assignAndSendShow, setAssignAndSendShow] = useState();
    const [selectedClass, setSelectedClass] = useState(null)
    const [classList, setClassList] = useState([])
    const [quizAssignmentAttachment, setQuizAssignmentAttachment] = useState([])
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null);
    const [date, setDate] = useState(null);
    const [points, setPoints] = useState("");
    const [title, setTitle] = useState(""); 
    const [instruction, setInstruction] = useState('');
    const [materials, setMaterialLinks] = useState([ ]);
    const [isLoading, setIsLoading] = useState(false);
    const [studentList, setStudentList] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [allSelect, setAllSelect] = useState(false);
    const [error, setError] = useState({})
    const [isActionVisible, setisActionVisible] = useState(false)
    const [clickEventforSave, setClickEventforSave] = useState(false)
    const [clickEventforSaveAsDraft, setClickEventforSaveAsDraft] = useState(false)
    const [isFormIconDisable, setisFormIconDisable] = useState(true)
    const [question, setQuestion] = useState([])
    const [documentTitle, setDocumentTitle] = useState('')
    const [quizInstruction, setquizInstruction] = useState('')
    const [isGoogleFormCreated, setisGoogleFormCreated] = useState(false)
    const [assignment, setAssignments] = useState({
        title: '',
    })

    useEffect(() => {
        if (isQuizEdit) {
            getQuizAssignmentByID()
        }
    }, [isQuizEdit])

       //Getting data from ReusePost
    useEffect(() => {
        if (dataFromReuse?.id && dataFromReuse?.courseId) {
            getQuizAssignmentByID();
        }
        
    }, [dataFromReuse]);

    const numericRegex = /^[0-9]*$/;
    const handleInputChange = (e) => {
        const { value } = e.target;
        if (numericRegex.test(value)) {
            setPoints(e.target.value);
            setError((prevError) => ({
                ...prevError,
                points: "",
            }))
        }
    };

    function handleInstruction(e) {
        setInstruction(e);
    }
    const [rubricVisible, setRubricVisible] = useState(false);
    const [multiChoiceVisible, setMultiChoiceVisible] = useState(false);
    const [multiStepVisible, setMultiStepVisible] = useState(false);
    const [mathsviewVisible, setMathsViewVisible] = useState(false);

    const fetchTopicList = async () => {
        try {
            let accessToken = getDataFromLocalStorage("access_token");
            const payload = {
                accessToken: accessToken,
                courseId: classIdValue,
            }
            const response = await getTopicListApi(payload)
            if (response?.code == 200) {
                setTopicList(response.data.data)
            }
        } catch (error) {

        }
    }
    const [mathstoryVisible, setMathStoryVisible] = useState(false);

    const handleMultiChoice = () => {
        setMultiChoiceVisible(true);
    };

    const handleMultiStep = () => {
        setMultiStepVisible(true);
    };

    const handleMathSpiralView = () => {
        setMathsViewVisible(true)
    }

    const handleMathStoryProblem = () => {
        setMathStoryVisible(true);
    }

    const handleAIRubric = () => {
        setRubricVisible(true);
    }

    const [editorValue, setEditorValue] = useState(null)
    const shoWData = () => {
        const formattedContent = response?.Content.join("\n");
        const editorValues = `${response?.Title}\n\n${formattedContent}`;
        setEditorValue(editorValues)
    }


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
                    const list = response?.data?.data.map((item) => {
                        return {
                            label: item.profile.name.fullName,
                            value: item.profile.emailAddress
                        };
                    })
                    setStudentList(list)
                    let studName = list.map((data, i) => {
                        return data.value;
                    });
                    setStudentName(studName);
                    setIsLoading(false);
                } else {
                    console.error("Failed to fetch class list");
                }
                setIsLoading(false);
            }
            else {
                setStudentList([]);
            }
        } catch (error) {
            console.error("Error fetching class list:", error);
            toast.error('Something went wrong');
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    const handleDateTimeChange = (e) => {
        const selectedDateTime = e.value;

        if (selectedDateTime && selectedDateTime > new Date()) {
            const year = selectedDateTime.getFullYear();
            const month = selectedDateTime.getMonth() + 1;
            const day = selectedDateTime.getDate();
            const hours = selectedDateTime.getHours();
            const minutes = selectedDateTime.getMinutes();
            const seconds = selectedDateTime.getSeconds();

            setDate({
                dueDate: { year, month, day },
                dueTime: { hours, minutes, seconds }
            });

            setError((prevError) => ({
                ...prevError,
                date: "", // Clear error message when a valid selection is made
            }));
        } else {
            // If the selected date is null or not in the future, clear the date and time
            setDate(null);

            setError((prevError) => ({
                ...prevError,
                date: "Please select a future date and time.", // Set error message for invalid selection
            }));
        }
    };


    const validate = () => {
        let err = {}
        let isErr = false;
        // if (studentName.length == 0) {
        //     err.studentName = 'Please Select Atleast One Student.'
        //     isErr = true
        // }
        if (points.length == 0 || !points) {
            err.points = 'Please Enter Set Points.'
            isErr = true
        }
        if (date == null) {
            err.date = 'Please Select Due Date.'
            isErr = true
        }
        if (topicName?.length == 0 || !topicName || topicName == null) {
            err.topicName = 'Please Select Topic.'
            isErr = true
        }
        if (title.length == 0 || !title) {
            err.title = 'Please Enter Title.'
            isErr = true
        }
        if (instruction.length == 0 || !instruction ) {
            err.instruction = 'Please Enter Instruction.'
            isErr = true
        }

        setError(err)
        return isErr
    }

    const handleStudentName = (e) => {
        setStudentName(e.value)
        if (e.value.length === studentList.length) {
            setAllSelect(true)
        }

        setError((prevError) => ({
            ...prevError,
            studentName: "", // Clear error message when a selection is made
        }))
    }

    const handleSave = async (e, type) => {
        e.preventDefault();

        if (validate()) {
            return
        }
        if (type === "Publish") {
            setClickEventforSave(true)
        }
        if (type === "Draft") {
            setClickEventforSaveAsDraft(true)
        }
        let accessToken = localStorage?.getItem("access_token");

        const payload = {
            accessToken: accessToken,
            courseId: classIdValue,
            quizPayload: {
                title: title,
                description: instruction == "<p><br></p>" ? '' : instruction,
                state: type === 'Publish' ? 'PUBLISHED' : 'DRAFT',
                workType:'MULTIPLE_CHOICE_QUESTION',
                // workType: "ASSIGNMENT",
                multipleChoiceQuestion: {
                    choices: ['Turn In'], 
                },
                dueDate: {
                    year: date.dueDate.year,
                    month: date.dueDate.month,
                    day: date.dueDate.day
                },
                dueTime: {
                    hours: date.dueTime.hours,
                    minutes: date.dueTime.minutes,
                    seconds: date.dueTime.seconds
                },
                maxPoints: points,
                topicId: topicName?.topicId,
            },
            attachments : materials
        }
      
        try {
            if (studentName.length > 0) {
                payload.quizPayload.assigneeMode = "INDIVIDUAL_STUDENTS";
                payload.quizPayload.individualStudentsOptions = {
                    "studentIds": studentName
                };
            }
           
            const response = await createAssignmentQuizApi(payload)

            if (response.code == 200) {

                toast.success("New Quiz Assignment Created Successfully.")
                setShowQuizAssignment(false);
                setActiveOption(2)
                clickEvents();
                setActiveOption(tabId)
                clearFields();
            } else {
                clickEvents();
                // clearFields();
            }
        } catch (error) {
            clickEvents();
            console.log("error", error)
            toast.error("Something Went Wrong");
        }
      
    }

    useEffect(() => {
        if (classIdValue) {
            getClassList()
        }
        fetchTopicList()
        getStudentList();
    }, [])


    // useEffect(() => {
    //     // Check if instruction is a string before calling match
    //     if (typeof instruction === 'string') {
    //         const topicRegex = /Topic:\s*(.+)/;
    //         const match = instruction.match(topicRegex);
    //         if (match && match.length > 1) {
    //             const extractedTopic = match[1].trim();
    //             setTitle(extractedTopic);
    //         } else {
    //             console.log("Topic not found in the response.");
    //         }
    //     } else {
    //         console.log("Instruction is not a string.");
    //     }
    // }, [instruction]);



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
                    return data.find((item) => item.code === classIdValue)
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
        setInstruction('')
        setisActionVisible(false)
    };

    const getQuizAssignmentByID = async () => {
        try {

            let accessToken = getDataFromLocalStorage("access_token");

            const payload = {
                "accessToken": accessToken,
                "courseId": isQuizEdit?  courseIdOfQuize : dataFromReuse?.courseId,
                "id": isQuizEdit?  idOfQuize : dataFromReuse?.id,
            };

            const response = await getQuizAssignment(payload);
            if (response.success && response.data.data) {

                let rawData = response?.data?.data;
                setPoints(rawData?.maxPoints)
                let year =  rawData?.dueDate?.year
                let month =  rawData?.dueDate?.month
                let day =  rawData?.dueDate?.day
                let hours =  rawData?.dueTime?.hours;
                let minutes =  rawData?.dueTime?.minutes;
                let seconds =  0;

                setDate({
                    dueDate: { year, month, day },
                    dueTime: { hours, minutes, seconds }
                });
               
                setTopicNamne(response?.data?.topic)
                setTitle(rawData?.title)
                setInstruction(rawData?.description)
                setQuizAssignmentAttachment(response?.data?.data?.materials)
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error", error);
            toast.error('Something went wrong');

        }
    }

    const editQuizAssign = async (e, type) => {
        e.preventDefault();
        
        if (validate()) {
            return
        }
        if (type === "Publish") {
            setClickEventforSave(true)
        }
        if (type === "Draft") {
            setClickEventforSaveAsDraft(true)
        }
        let accessToken = localStorage?.getItem("access_token");

        const payload = {
            accessToken: accessToken,
            courseId: courseIdOfQuize,
            id: idOfQuize,
            quizPayload: {
                title: title,
                description: instruction,
                state: type === 'Publish' ? 'PUBLISHED' : 'DRAFT',
                workType: "MULTIPLE_CHOICE_QUESTION",
                multipleChoiceQuestion: {
                    choices: [
                        "A",
                        "B",
                        "C",
                        "D"
                    ]
                },
                dueDate: {
                    year: date?.dueDate?.year,
                    month: date?.dueDate?.month,
                    day: date?.dueDate?.day
                },
                dueTime: {
                    hours: date?.dueTime?.hours,
                    minutes: date?.dueTime?.minutes,
                    seconds: date?.dueTime?.seconds
                },
                maxPoints: points,
                topicId: topicName?.topicId
            }

        }
      
        try {

            const response = await updateQuizAssignment(payload)

            if (response.code == 200) {

                toast.success("Quiz Assignment Updated Successfully.")
                setShowQuizAssignment(false);
                setActiveOption(2)
                clickEvents();
                setActiveOption(tabId)
                props.handleEditChange(false)
                clearFields();
            } else {
                props.handleEditChange(false)
            }
        } catch (error) {
            clickEvents();
            console.log("error", error)
            toast.error("Something Went Wrong");
            props.handleEditChange(false)
        }
    }

    const clearFields =()=>{
        setDate(null)
        setTopicNamne(null)
        setPoints("")
        setTitle("")
        setInstruction("")
        setStudentName("")
        setMaterialLinks([])
    }
    const clickEvents =()=>{
        setClickEventforSave(false)
        setClickEventforSaveAsDraft(false)
    }
    const onClearError =()=>{
        setError((prevError) => ({
            ...prevError,
            instruction: "", // Clear error message when a selection is made
        }))
    }

    return (
        <div className='flex xl:flex-nowrap flex-wrap border border-[#C8CBD0] rounded-[6px]'>
            <div className='xl:w-[65%] w-[100%] xl:border-r border-[#C8CBD0] xl:pt-[1.25vw] pt-[20px] xl:pb-[1.823vw] pb-[28px] xl:px-[2.083vw] px-[20px]'>
                <form className="inputText-667085">
                    <div className='grid grid-cols-12 xl:gap-[0.833vw] gap-[10px]'>
                        <div className='lg:col-span-4 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                For<span className="text-[red] ">*</span>
                            </label>
                            <div className=''>
                                <div>
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
                        </div>
                        <div className='lg:col-span-4 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Students
                            </label>
                            <MultiSelect value={studentName} onChange={handleStudentName} options={studentList}
                                placeholder={studentList === null ? "No Student" : "All Student"} className="w-full" />
                            {error.studentName ? <span style={{ color: 'red' }}>{error.studentName}</span> : <></>}

                        </div>
                        <div className='lg:col-span-4 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Set Points<span className="text-[red] ">*</span>
                            </label>
                            <InputText
                                value={points}
                                keyfilter={numericRegex}
                                onChange={handleInputChange}
                                placeholder="Type here"
                                className="w-full"
                            />
                            {error.points ? <span style={{ color: 'red' }}>{error.points}</span> : <></>}

                        </div>
                        <div className='lg:col-span-6 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Due Date<span className="text-[red] ">*</span>
                            </label>
                            <Calendar id="calendar-24h" className='w-full' placeholder='Select Date'
                                minDate={new Date()}
                                value={date ? new Date(date?.dueDate?.year, date?.dueDate?.month - 1, date?.dueDate?.day, date?.dueTime?.hours, date?.dueTime?.minutes, date?.dueTime?.seconds) : null}
                                // value={date}
                                // onChange={(e) => setDate(e.value)}
                                onChange={handleDateTimeChange}
                                showTime hourFormat="24" />
                            {error.date ? <span style={{ color: 'red' }}>{error.date}</span> : <></>}

                        </div>
                        <div className='lg:col-span-6 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Topic<span className="text-[red] ">*</span>
                            </label>
                            <Dropdown
                                filter
                                value={topicName}
                                onChange={(e) => {
                                    setTopicNamne(e.value),
                                        setError((prevError) => ({
                                            ...prevError,
                                            topicName: "", // Clear error message when a selection is made
                                        }))
                                }}
                                options={topicList}
                                optionLabel="name"
                                placeholder={topicList?.length === 0 || topicList === undefined ? "No topic" : "Select topic"}
                                className="w-full"
                            />
                            {error.topicName ? <span style={{ color: 'red' }}>{error.topicName}</span> : <></>}

                        </div>
                        <div className='lg:col-span-12 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Title<span className="text-[red]">*</span>
                            </label>
                            <InputText
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value),
                                        setError((prevError) => ({
                                            ...prevError,
                                            title: "", // Clear error message when a selection is made
                                        }))
                                }}
                                placeholder="Type here"
                                className="w-full"
                            />
                            {error.title ? <span style={{ color: 'red' }}>{error.title}</span> : <></>}

                        </div>
                       
                        <div className='lg:col-span-12 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Add Instruction and Template<span className="text-[red] ">*</span>
                            </label>
                            <div>
                                <div className='custom-editor'>
                                    <QuillEditor value={instruction}
                                        onChange={(e) => {
                                            handleInstruction(e);
                                        }}
                                        
                                        onClearError={onClearError}
                                        height={300}>
                                    </QuillEditor>
                                    {error.instruction ? <span style={{ color: 'red' }}>{error.instruction}</span> : <></>}

                                </div>
                                <div className='flex flex-wrap gap-[5px] justify-between text-[#667085] 3xl:text-[0.625vw] text-[12px] xl:mt-[0.525vw] mt-[8px]'>
                                    <span>Auto saved at 11:30 am</span>
                                    <span>Word Count:: 150 words</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='xl:mt-[1.146vw] mt-[18px] flex flex-wrap justify-end xl:gap-[0.525vw] gap-[10px]'>

                        <button onClick={() => { setShowQuizAssignment(false), setActiveOption(2) }} className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            Cancel
                        </button>
                        {/* <button onClick={(e) => e.preventDefault()} className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            Add Rubric
                        </button> */}
                        <button disabled={clickEventforSave || clickEventforSaveAsDraft}
                            onClick={(e) => {
                                if (isQuizEdit) {
                                    editQuizAssign(e, 'Draft');
                                } else {
                                    handleSave(e, 'Draft')
                                }
                            }}
                            className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] font-medium  text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            {clickEventforSaveAsDraft ? "Please Wait..." : "Save As Draft"}
                        </button>

                        <button disabled={clickEventforSave || clickEventforSaveAsDraft}
                            onClick={(e) => {
                                if (isQuizEdit) {
                                    editQuizAssign(e, 'Publish');
                                } else {
                                    handleSave(e, 'Publish')
                                }
                            }}
                            className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'>
                            {clickEventforSave ? "Please Wait..." : "Save"}
                        </button>


                    </div>
                </form>
            </div>
            <div className='xl:w-[35%] w-[100%] xl:pt-[1.04vw] pt-[16px] xl:pb-[1.823vw] pb-[28px] xl:px-[1.25vw] px-[16px] flex flex-col items-start xl:gap-[1.04vw] gap-[14px]'>
                <div className='w-full'>
                    <AITools  
                    setLoading={setLoading}
                    setisGoogleFormCreated={setisGoogleFormCreated}
                    isGoogleFormCreated={isGoogleFormCreated}
                       documentTitle={documentTitle}
                       quizInstruction={quizInstruction}
                       title={title}
                    tabId={tabId}  question={question}
                        isFormIconDisable={isFormIconDisable} materials={materials} setMaterialLinks={setMaterialLinks} quizAssignmentAttachment={quizAssignmentAttachment}   />
                    
                </div>
               {/*  <div className='w-full'>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#fff] font-medium block mb-[6px]">
                        Uploaded Items
                    </label>
                    <div className='file-upload border border-[#1570EF] border-dashed bg-[#1570EF] rounded-md relative xl:px-[0.521vw] px-[10px] xl:py-[0.833vw] py-[16px] text-center'>
                       
                        <Image src="/images/browsefile.svg" width="48" height="48" alt="Browse" className='inline-block' />
                        <div className='text-[#fff] xl:text-[0.677vw] text-[13px] xl:mt-[0.833vw] mt-[16px]'>Click or Drag here to upload</div>
                        <div className='opacity-0 absolute left-0 top-0 bottom-0 right-0 '>
                            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} />
                        </div>
                    </div>
                </div> */}
                {/* <div className="bg-[#F9FAFB] rounded-[12px] 3xl:rounded-[0.625vw] px-[12px] 3xl:px-[0.625vw] py-[8px] 3xl:py-[0.417vw] flex items-center justify-between w-full">
            <div className="text-[#344054] text-[12px] 3xl:text-[0.625vw]">
              Link Attached
            </div>
            <div className="col flex items-center space-x-[10px] 3xl:space-x-[0.521vw]">
              <Link href={""}>
                <Image
                  className="w-[24px] h-[24px]"
                  width="24"
                  height="24"
                  src="/images/eye-bold.svg"
                  alt="eye"
                />
              </Link>
              <Link href={""}>
                <Image
                  className="w-[16px] h-[16px]"
                  width="16"
                  height="16"
                  src="/images/delete.svg"
                  alt="eye"
                />
              </Link>
            </div>
          </div> */}
                <div className='w-full'>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                        AI Tools
                    </label>
                    <div className='grid xl:gap-[0.625vw] gap-[8px] pr-[80px] xl:pr-[80px] 3xl:pr-[4.167vw]'>
                        <button onClick={handleMultiChoice} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center  '>
                            <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                            AI Quiz Creator
                        </button>
                       {/*  <button onClick={handleMultiStep} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center'>
                            <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                            AI Assignment Builder
                        </button> */}
                        <button onClick={handleMathStoryProblem} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                            <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                            AI DBQ
                        </button>
                        {/* <button onClick={handleMathSpiralView} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                            <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                            AI Brain Breaks 
                        </button>
                        <button onClick={handleAIRubric} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                            <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />Classroom Lesson Planning
                        </button> */}
                        {
                            isActionVisible ? (
                                <button onClick={() => { removeAIdata();setisFormIconDisable(true) }} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-red-600 font-medium  xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center'>
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
           {/*  <MathStoryWordProblems
                mathstoryVisible={mathstoryVisible}
                onhide={() => setMathStoryVisible(false)}
                setInstruction={setInstruction}
                shoWData={shoWData}
                isActionVisible={setisActionVisible}
            /> */}
            <AIDBQ
                mathstoryVisible={mathstoryVisible}
                onhide={() => setMathStoryVisible(false)}
                setInstruction={setInstruction}
                setTitle={setTitle}
                shoWData={shoWData}
                setAssignments={setAssignments}
                isActionVisible={setisActionVisible}
            />

            <AIRubric
                Visible={rubricVisible}
                onhide={() => setRubricVisible(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}

            />
            <MultiChoiceAssesment
            setLoadings={setLoading}
            setisGoogleFormCreated={setisGoogleFormCreated}
              setisFormIconDisable={setisFormIconDisable}
              setQuestion={setQuestion}
                visible={multiChoiceVisible}
                isMultiChoiceVisible={multiChoiceVisible}
                setDocumentTitle={setDocumentTitle}
                onhide={() => setMultiChoiceVisible(false)}
                setInstruction={setInstruction}
                instruction={instruction}
                isActionVisible={setisActionVisible}
                setquizInstruction={setquizInstruction}
            />
            <MultiStepAssessment
                visible={multiStepVisible}
                onhide={() => setMultiStepVisible(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}
            />
            <MathSpiralView
                visible={mathsviewVisible}
                onhide={() => setMathsViewVisible(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}

            />
        </div>
    )
}
