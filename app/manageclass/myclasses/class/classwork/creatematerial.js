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
import { createMaterial, getMaterialById, updateMaterial } from '../../../../actions/materialApi';

export default function CreateMaterial(props) {
    const { classIdValue, setActiveOption, setShowMaterial, materialId, isEditMaterial, dataFromReuse } = props;
    const [topicList, setTopicList] = useState([])
    const [topicName, setTopicNamne] = useState();
    const [assignAndSendShow, setAssignAndSendShow] = useState();
    const [selectedClass, setSelectedClass] = useState(null)
    const [classList, setClassList] = useState([])
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null);
    const [date, setDate] = useState(null);
    const [points, setPoints] = useState("");
    const [title, setTitle] = useState("");
    const [instruction, setInstruction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [studentList, setStudentList] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [allSelect, setAllSelect] = useState(false);
    const [error, setError] = useState({})
    const [isActionVisible, setisActionVisible] = useState(false)
    const [clickEventforSave, setClickEventforSave] = useState(false)
    const [clickEventforSaveAsDraft, setClickEventforSaveAsDraft] = useState(false)
    const accessToken = getDataFromLocalStorage("access_token");


         //Getting data from ReusePost
    useEffect(() => {
        if (dataFromReuse?.id && dataFromReuse?.courseId) {
            getEachMaterial()
        }
    }, [dataFromReuse]);

    useEffect(() => {
        if (isEditMaterial) {
            getEachMaterial()
        }
    }, [isEditMaterial])


    function handleInstruction(e) {
        setInstruction(e);
    }
    const [rubricVisible, setRubricVisible] = useState(false);
    const [multiChoiceVisible, setMultiChoiceVisible] = useState(false);
    const [multiStepVisible, setMultiStepVisible] = useState(false);
    const [mathsviewVisible, setMathsViewVisible] = useState(false);

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
    const [mathstoryVisible, setMathStoryVisible] = useState(false);
    const [editorValue, setEditorValue] = useState(null)

    const shoWData = () => {
        const formattedContent = response?.Content.join("\n");
        const editorValues = `${response?.Title}\n\n${formattedContent}`;
        setEditorValue(editorValues)
    }

    const getStudentList = async () => {

        try {

            if (classIdValue) {
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

    const validate = () => {
        let err = {}
        let isErr = false;

        if (studentName?.length == 0 || !studentName || studentName == null) {
            err.studentName = 'Please Select Students.'
            isErr = true
        }
        if (topicName?.length == 0 || !topicName || topicName == null) {
            err.topicName = 'Please Select Topics.'
            isErr = true
        }
        if (title?.length == 0 || !title || title == null) {
            err.title = 'Please Enter Title.'
            isErr = true
        }
        if (instruction?.length == 0 || !instruction || instruction == null) {
            err.instruction = 'Please Enter Description.'
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

        const payload = {
                accessToken: accessToken,
                courseId: classIdValue,
                title: title,
                description: instruction,
                state: type === 'Publish' ? 'PUBLISHED' : 'DRAFT',
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
                topicId: topicName?.topicId
        }

        try {
            if (studentName.length > 0) {
                payload.assigneeMode = "INDIVIDUAL_STUDENTS";
                payload.individualStudentsOptions = {
                    "studentIds": studentName
                };
            }
            const response = await createMaterial(payload)

            if (response.code == 200) {

                toast.success("New Material Added Successfully.")
                setShowMaterial(false);
                setActiveOption(4)
                clickEvents()
                // setActiveOption(tabId)
            } else {
                clickEvents()
            }
        } catch (error) {
            clickEvents()
            toast.error("Something Went Wrong from API");
        }
        clearFields();
    }

    useEffect(() => {
        if (classIdValue) {
            getClassList()
        }
        fetchTopicList()
        getStudentList();
    }, [])


    useEffect(() => {
        // Check if instruction is a string before calling match
        if (typeof instruction === 'string') {
            const topicRegex = /Topic:\s*(.+)/;
            const match = instruction.match(topicRegex);
            if (match && match.length > 1) {
                const extractedTopic = match[1].trim();
                setTitle(extractedTopic);
            } else {
                console.log("Topic not found in the response.");
            }
        } else {
            console.log("Instruction is not a string.");
        }
    }, [instruction]);


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

    const getEachMaterial = async () => {
        try {

            const payload = {
                "accessToken": accessToken,
                "courseId": isEditMaterial ?  classIdValue : dataFromReuse?.courseId,
                "id": isEditMaterial ? materialId : dataFromReuse?.id,
            };

            const response = await getMaterialById(payload);
            if (response.success && response.data) {

                let rawData = response?.data?.data?.courseWork;
                let topic = response?.data?.data?.topic;
                setTopicNamne(topic)
                setTitle(rawData?.title)
                setInstruction(rawData?.description)
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error", error);
            toast.error('Something went wrong');

        }
    }

    const editMaterial = async (e, type) => {
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
                id: materialId,
                title: title,
                description: instruction,
                state: type === 'Publish' ? 'PUBLISHED' : 'DRAFT',
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
                topicId: topicName?.topicId
          }

        try {
            if (studentName.length > 0) {
                payload.assigneeMode = "INDIVIDUAL_STUDENTS";
                payload.individualStudentsOptions = {
                    "studentIds": studentName
                };
            }
            const response = await updateMaterial(payload)

            if (response.code == 200) {
                toast.success("Material Updated Successfully.")
                setShowMaterial(false);
                setActiveOption(4)
                clickEvents();
                props.setIsEditMaterial(false)
                // setActiveOption(tabId)
                props.handleEditChange(false)
                clearFields();
            } else {
                clickEvents();
                props.handleEditChange(false)
                clearFields();
            }
        } catch (error) {
            clickEvents();
            console.log("error", error)
            toast.error("Something Went Wrong");
            props.handleEditChange(false)
        }
        props.handleEditChange(false)
        clearFields()
    }

    const clearFields = ()=>{
        setDate(null)
        setTopicNamne(null)
        setPoints("")
        setTitle("")
        setInstruction("")
        setStudentName("")
    }

    const clickEvents = ()=>{
        setClickEventforSave(false)
        setClickEventforSaveAsDraft(false)
    }

    const onClearError=()=>{
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
                                Add Instruction and Template
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

                        <button
                        // onClick={() => { setShowQuizAssignment(false), setActiveOption(2) }}
                        onClick={(e)=> { e.preventDefault()}}
                        className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            Cancel
                        </button>
                        {/* <button onClick={(e) => e.preventDefault()} className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            Add Rubric
                        </button> */}
                        <button disabled={clickEventforSave || clickEventforSaveAsDraft}
                            onClick={(e) => {
                                if (isEditMaterial) {
                                    editMaterial(e, 'Draft');
                                } else {
                                    handleSave(e, 'Draft')
                                }
                            }}
                            className='flex 3xl:text-[0.729vw] 2xl:text-[14px] text-[14px] font-medium  text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center xl:min-w-[6.25vw] min-w-[120px]'>
                            {clickEventforSaveAsDraft ? "Please Wait..." : "Save As Draft"}
                        </button>

                        <button disabled={clickEventforSave || clickEventforSaveAsDraft}
                            onClick={(e) => {
                                if (isEditMaterial) {
                                    editMaterial(e, 'Publish');
                                } else {
                                    handleSave(e, "Publish")
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
                    <AITools />
                </div>
               {/*  <div className='w-full'>
                    <label className="3xl:text-[0.729vw] text-[14px] text-[#344054] font-medium block mb-[6px]">
                         Items
                    </label>
                    <div className='file-upload border border-[#1570EF] border-dashed bg-[#1570EF] rounded-md relative xl:px-[0.521vw] px-[10px] xl:py-[0.833vw] py-[16px] text-center'>
                        {/* <i className='hexatoolupload-file text-[#FF8B1A] 3xl:text-[2.5vw] 2xl:text-[36px] '></i>public/images/browsefile.svg 
                        <Image src="/images/browsefile.svg" width="48" height="48" alt="Browse" className='inline-block' />
                        <div className='text-[#E57200] xl:text-[0.677vw] text-[13px] xl:mt-[0.833vw] mt-[16px]'>Click or Drag here to upload</div>
                        <div className='opacity-0 absolute left-0 top-0 bottom-0 right-0 '>
                            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} />
                        </div>
                    </div>
                </div> */}
            </div>
            <AssignAndSend
                visible={assignAndSendShow}
                onhide={() => setAssignAndSendShow(false)}
            />
            <MathStoryWordProblems
                mathstoryVisible={mathstoryVisible}
                onhide={() => setMathStoryVisible(false)}
                setInstruction={setInstruction}
                shoWData={shoWData}
                isActionVisible={setisActionVisible}
            />
            <AIRubric
                Visible={rubricVisible}
                onhide={() => setRubricVisible(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}

            />
            <MultiChoiceAssesment
                visible={multiChoiceVisible}
                onhide={() => setMultiChoiceVisible(false)}
                setInstruction={setInstruction}
                isActionVisible={setisActionVisible}
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
