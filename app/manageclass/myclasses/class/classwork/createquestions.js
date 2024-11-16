"use client"
import React, { useEffect, useState } from 'react'
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { FileUpload } from 'primereact/fileupload';
import Image from 'next/image';
import { getTopicListApi } from '../../../../actions/TopicApi';
import { listOfActiveClassAPI } from '../../../../actions/activeClasses';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Calendar } from 'primereact/calendar';
import { toast } from 'react-toastify';
import { MultiSelect } from 'primereact/multiselect';
import QuillEditor from '../home/editorpage';
import AITools from '../../../../../components/AITools';
import { getDataFromLocalStorage } from '../../../../../components/helper/commonFunction';
import { listOfStudent } from '../../../../actions/studentListingApi';
import { questionCreateApi, questionGetByIdApi, questionUpdateApi } from '../../../../actions/questionApi';
import { questionFormat } from '../../../../../components/helper/enum';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import AIDBQ from '../../../../../components/aiDbq';

export default function CreateQuestions(props) {
    const { classIdValue, setShowQuestions, setActiveOption, tabId, idOfQuestion, courseIdOfQuestion, questionEditTab, setQuestionEditTab, dataFromReuse } = props;
    const [topicList, setTopicList] = useState([])
    const [topicName, setTopicName] = useState();
    const [questionType, setQuestionType] = useState("SHORT_ANSWER_QUESTION");
    const [selectedClass, setSelectedClass] = useState(null)
    const [classList, setClassList] = useState([])
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(null);
    const [points, setPoints] = useState("");
    const [title, setTitle] = useState("");
    const [instruction, setInstruction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [studentList, setStudentList] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [allSelect, setAllSelect] = useState(false);
    const [error, setError] = useState({})
    const [clickEventforSave, setClickEventforSave] = useState(false)
    const [clickEventforSaveAsDraft, setClickEventforSaveAsDraft] = useState(false)
    const [inputs, setInputs] = useState(['']);
    const accessToken = getDataFromLocalStorage("access_token");
    const [questionAttach, setQuestionsLinks] = useState([]);
    const [queAttachbyID, setQueAttachbyID] = useState()

    const clearError = () => {
        setError((prevError) => ({
            ...prevError,
            instruction: "", // Clear error message
        }));
    };

    //Getting data from ReusePost
    useEffect(() => {
        if (dataFromReuse?.id && dataFromReuse?.courseId) {
            getQuestionByID()
        }
    }, [dataFromReuse]);

    const handleAddInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index + 1, 0, '');
        setInputs(newInputs);
    };

    const handleRemoveInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
    };

    const handleChange = (index, event) => {
        const newInputs = inputs.map((input, i) => i === index ? event.target.value : input);
        setInputs(newInputs);
    };

    useEffect(() => {
        if (questionEditTab) {
            getQuestionByID()
        }
    }, [questionEditTab])

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

    const [mathstoryVisible, setMathStoryVisible] = useState(false);

    const handleMathStoryProblem = () => {
        setMathStoryVisible(true);
    }

    const fetchTopicList = async () => {
        try {

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

    const [response, setResponse] = useState(null);
    const [editorValue, setEditorValue] = useState(null);
    const [assignment, setAssignments] = useState({
        title: '',
    })
    const [isActionVisible, setisActionVisible] = useState(false)
    const [isFormIconDisable, setisFormIconDisable] = useState(true)

    const shoWData = () => {
        const formattedContent = response?.Content.join("\n");
        const editorValues = `${response?.Title}\n\n${formattedContent}`;
        setEditorValue(editorValues)
    }
    const removeAIdata = () => {
        setInstruction('')
        setisActionVisible(false)
    };


    const getStudentList = async () => {

        try {

            if (classIdValue) {

                const payload = {
                    "accessToken": accessToken,
                    "courseId": classIdValue
                };
                setIsLoading(true);
                const response = await listOfStudent(payload);

                if (response?.success && response?.data) {
                    const list = response?.data?.data.map((item) => {
                        return {
                            label: item.profile.name.fullName,
                            // value: item.profile.emailAddress,
                            value: item.profile.id
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
            // toast.error('Something went wrong');
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
            err.title = 'Please Enter Question.'
            isErr = true
        }
        if (instruction == "" || instruction.length == 0 || !instruction || instruction == null) {
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

    const saveQuestion = async (e, type) => {
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


        const payload = {
            accessToken: accessToken,
            courseId: classIdValue,
            questionType: questionType,
            title: title,
            description: instruction,
            state: type === 'Publish' ? 'PUBLISHED' : 'DRAFT',
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
            topicId: topicName,
            maxPoints: points,
            attachments: questionAttach
        }

        try {
            if (studentName.length > 0) {
                payload.studentIds = studentName

            } if (questionType === "MULTIPLE_CHOICE_QUESTION") {
                payload.choices = inputs ? inputs : ""
            }
            const response = await questionCreateApi(payload)

            if (response.code == 200) {
                toast.success("Question Created Successfully.")
                setShowQuestions(false);
                setActiveOption(3)
                setClickEventforSave(false)
                setClickEventforSaveAsDraft(false)
                setQuestionEditTab(false)
                setQuestionsLinks([])

            } else {
                setClickEventforSave(false)
                setClickEventforSaveAsDraft(false)
            }
        } catch (error) {
            setClickEventforSave(false)
            setClickEventforSaveAsDraft(false)
            console.log("error", error)
            toast.error("Something Went Wrong");
        }
        setDate(null)
        setTopicName(null)
        setPoints("")
        setTitle("")
        setInstruction("")
        setStudentName("")
    }

    useEffect(() => {
        if (classIdValue) {
            getClassList()
        }
        fetchTopicList()
        getStudentList();
    }, [])


    const getClassList = async () => {
        try {
            setLoading(true)

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

    const getQuestionByID = async () => {
        try {

            const payload = {
                "accessToken": accessToken,
                "courseId": questionEditTab ? courseIdOfQuestion : dataFromReuse?.courseId,
                "id": questionEditTab ? idOfQuestion : dataFromReuse?.id,
            };

            const response = await questionGetByIdApi(payload);
            if (response.success && response.data.data) {

                let rawData = response?.data?.data
                setPoints(rawData?.courseWork?.maxPoints)
                let year = rawData?.courseWork?.dueDate?.year
                let month = rawData?.courseWork?.dueDate?.month
                let day = rawData?.courseWork?.dueDate?.day
                let hours = rawData?.courseWork?.dueTime?.hours;
                let minutes = rawData?.courseWork?.dueTime?.minutes;
                let seconds = 0;

                setDate({
                    dueDate: { year, month, day },
                    dueTime: { hours, minutes, seconds }
                });

                setInputs(rawData?.courseWork?.multipleChoiceQuestion?.choices)
                setQuestionType(rawData?.courseWork?.workType)
                setStudentName(rawData?.courseWork?.individualStudentsOptions?.studentIds)
                setTopicName(rawData?.courseWork?.topicId)
                setTitle(rawData?.courseWork?.title)
                setInstruction(rawData?.courseWork?.description)
                setQueAttachbyID(rawData?.courseWork?.materials)
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error", error);
            toast.error('Something went wrong');

        }
    }

    const updateQuestion = async (e, type) => {
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

        const payload = {
            accessToken: accessToken,
            courseId: questionEditTab ? classIdValue : dataFromReuse?.courseId,
            questionType: questionType,
            title: title,
            description: instruction,
            state: type === 'Publish' ? 'PUBLISHED' : 'DRAFT',
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
            topicId: topicName,
            maxPoints: points,
            id: questionEditTab ? idOfQuestion : dataFromReuse?.id,
            attachments: questionAttach

        }

        try {
            if (studentName.length > 0) {
                payload.studentIds = studentName
            }
            if (questionType === "MULTIPLE_CHOICE_QUESTION") {
                payload.choices = inputs ? inputs : ""
            }

            const response = await questionUpdateApi(payload)

            if (response.code == 200) {

                toast.success("Questions Updated Successfully.")
                setShowQuestions(false);
                setActiveOption(3)
                setClickEventforSave(false)
                setClickEventforSaveAsDraft(false)
                setQuestionEditTab(false)
                props.handleEditChange(false)

            } else {
                setClickEventforSave(false)
                setClickEventforSaveAsDraft(false)
                props.handleEditChange(false)
            }
        } catch (error) {
            setClickEventforSave(false)
            setClickEventforSaveAsDraft(false)
            console.log("error", error)
            toast.error("Something Went Wrong");
            props.handleEditChange(false)
        }
        setDate(null)
        setTopicName(null)
        setPoints("")
        setTitle("")
        setInstruction("")
        setStudentName("")
        props.handleEditChange(false)
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
                                optionLabel="label"
                                optionValue="value"
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
                                    setTopicName(e.value),
                                        setError((prevError) => ({
                                            ...prevError,
                                            topicName: "", // Clear error message when a selection is made
                                        }))
                                }}
                                options={topicList}
                                optionLabel="name"
                                optionValue='topicId'
                                placeholder={topicList?.length === 0 || topicList === undefined ? "No topic" : "Select topic"}
                                className="w-full"
                            />
                            {error.topicName ? <span style={{ color: 'red' }}>{error.topicName}</span> : <></>}

                        </div>

                        <div className='lg:col-span-9 col-span-6'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Title<span className="text-[red]">*</span>
                            </label>
                            <InputTextarea
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
                                rows={1}

                            />
                            {error.title ? <span style={{ color: 'red' }}>{error.title}</span> : <></>}
                        </div>
                        <div className='lg:col-span-3 col-span-12'>
                            <Dropdown
                                filter
                                value={questionType}
                                onChange={(e) => setQuestionType(e.value)}
                                options={questionFormat}
                                optionLabel="name"
                                optionValue='code'
                                placeholder="Select Type"
                                className="w-full mt-[1.7rem]"
                            />
                        </div>

                        {questionType === "MULTIPLE_CHOICE_QUESTION" && inputs?.length ? (
                            inputs.map((input, index) => (
                                <div key={index} className="lg:col-span-9 col-span-12 flex items-center gap-2">
                                    <RadioButton disabled />
                                    <InputText
                                        className='borderQuestion w-full'
                                        value={input}
                                        onChange={(e) => handleChange(index, e)}
                                        placeholder="Add Option"
                                    />
                                    <i
                                        className={`pi ${inputs.length === 1 || index === inputs.length - 1 ? 'pi-plus' : 'pi-minus'}  cursor-pointer`}
                                        onClick={() => {
                                            if (inputs.length === 1 || index === inputs.length - 1) {
                                                handleAddInput(index);
                                            } else {
                                                handleRemoveInput(index);
                                            }
                                        }}
                                    >   </i>
                                </div>
                            ))
                        ) : null}

                        <div className='lg:col-span-12 col-span-12'>
                            <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                                Add Instruction and Template
                            </label>
                            <div>
                                <div className='custom-editor'>

                                    <QuillEditor value={instruction}
                                        onChange={(e) => { handleInstruction(e) }}
                                        onClearError={clearError}
                                        height={100}>
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
                        <button
                            onClick={() => { setShowQuestions(false) }}
                            className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            Cancel
                        </button>
                        {/* <button onClick={(e) => e.preventDefault()} className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            Add Rubric
                        </button> */}
                        <button disabled={clickEventforSave || clickEventforSaveAsDraft}
                            // onClick={(e)=> { e.preventDefault()}}
                            onClick={(e) => {
                                if (questionEditTab) {
                                    updateQuestion(e, 'Draft');
                                } else {
                                    saveQuestion(e, 'Draft')
                                }
                            }}
                            className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] font-medium  text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            {clickEventforSaveAsDraft ? "Please Wait..." : "Save As Draft"}
                        </button>

                        <button disabled={clickEventforSave || clickEventforSaveAsDraft}

                            onClick={(e) => {
                                if (questionEditTab) {
                                    updateQuestion(e, 'Publish');
                                } else {
                                    saveQuestion(e, 'Publish')
                                }
                                e.preventDefault()
                            }}
                            className='flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center items-center'>
                            {clickEventforSave ? "Please Wait..." : "Save"}
                        </button>


                    </div>
                </form>
            </div>
            <div className='xl:w-[35%] w-[100%] xl:pt-[1.04vw] pt-[16px] xl:pb-[1.823vw] pb-[28px] xl:px-[1.25vw] px-[16px] flex flex-col items-start xl:gap-[1.04vw] gap-[14px]'>
                <div className='w-full'>
                    <AITools setMaterialLinks={setQuestionsLinks} queAttachbyID={queAttachbyID} />
                    <div className='w-full'>
                        <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                            AI Tools
                        </label>
                        <div className='grid xl:gap-[0.625vw] gap-[8px] pr-[80px] xl:pr-[80px] 3xl:pr-[4.167vw]'>

                            <button onClick={handleMathStoryProblem} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center '>
                                <Image src="/images/highlight.svg" width="20" height="20" alt="AI Multi Choice Assessment" />
                                AI DBQ
                            </button>
                            {
                                isActionVisible ? (
                                    <button onClick={() => { removeAIdata(); setisFormIconDisable(true) }} className='flex xl:gap-[0.417vw] gap-[8px] 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-red-600 font-medium  xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-start items-center'>
                                        <i className="pi pi-minus-circle" style={{ color: 'red' }}></i>
                                        Remove Content
                                    </button>
                                ) : ("")
                            }
                        </div>
                    </div>
                </div>
            </div>
            <AIDBQ
                mathstoryVisible={mathstoryVisible}
                onhide={() => setMathStoryVisible(false)}
                setInstruction={setInstruction}
                setTitle={setTitle}
                shoWData={shoWData}
                setAssignments={setAssignments}
                isActionVisible={setisActionVisible}
            />
        </div>
    )
}
