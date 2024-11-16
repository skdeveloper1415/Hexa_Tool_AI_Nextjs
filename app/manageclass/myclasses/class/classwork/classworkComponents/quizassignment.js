import React, { useEffect, useState, Fragment, useRef } from "react";
import { NoDataMsg } from "../../../../../common/NoDatamsg";
import moment from "moment";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";
import { toast } from "react-toastify";
import { getDataFromLocalStorage } from "../../../../../../components/helper/commonFunction";
import { Menu, Transition } from "@headlessui/react";
import { deletequizApi, quizListApi } from "../../../../../actions/createQuiz/createQuize";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { getgoogleFormApi, getgoogleFormQueAndAnsApi } from "../../../../../actions/createFrom/createForm";
import { listOfStudent } from "../../../../../actions/studentListingApi";
import { usePathname } from "next/navigation";

export default function Quizassignment(props) {
  const [quizassignment, setQuizAssignment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Popuploading, setpopupLoading] = useState(false);
  const { quizEdit, courseId, id } = props;
  const [popupData, setpopupData] = useState({})
  // const pathname = usePathname();
  //   const parts = pathname.split("/");
  //   const courseId = parts[parts.length - 1];
  //   console.log('courseId', courseId)
  const [activeTab, setActiveTab] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [qusans, setQusans] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [questionsData, setQuestionsData] = useState([])
  const [allStudent, setAllStudent] = useState([])
  const [turnedInSubmissions, setturnedInSubmissions] = useState([])
  const [assignedSubmissions, setassignedSubmissions] = useState([])
  const [gradedSubmissions, setgradedSubmissions] = useState([])
  const [formQueAndAns, setformQueAndAns] = useState([])
  const [status, setStatus] = useState({ name: "Assigned", code: "NY" })
  const cities = [
    { name: "100", code: "NY" },
    { name: "Ungraded", code: "RM" },
  ];
  const cities2 = [
    { name: "Assigned", code: "NY" },
    { name: "Graded", code: "RM" },
    { name: "Turned in", code: "LM" },
  ];
  const [ingredient, setIngredient] = useState("");
  const [value, setValue] = useState("");

  const onIngredientsChange = (id, e) => {
    // let _ingredients = [...ingredients];
    // if (_ingredients?.find((ele, index) => ele.id == id)) {
    //   const remove = _ingredients.filter((ele) => ele.id != id)
    //   setIngredients(remove);
    // } else {
    //   const body = {
    //     id: id,
    //     value: true
    //   }
    //   _ingredients.push(body)
    //   setIngredients(_ingredients);
    // }
    // console.log('ingredients', ingredients)
    setIngredients([{ id: id, value: e.checked }]);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(popupData?.materials[0]?.form?.formUrl).then(
      () => {
        toast.success('Link copied!');
      },
      (err) => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy:!');
      }
    );
  };
  const getQuizListApi = async () => {
    try {
      setLoading(true);
      const accessToken = getDataFromLocalStorage("access_token");
      let getRole = getDataFromLocalStorage("userRole")
      const payload = {
        accessToken: accessToken,
        courseId: props.classIdValue,
        status: ["PUBLISHED", "DRAFT"],
        // "role" : getRole,
        topicId: props.topicId
      };

      const response = await quizListApi(payload);
      if (response.code == 200) {
        setQuizAssignment(response?.data?.data);

        setLoading(false);
      } else if (response.code == 500) {
        toast.error(response.message || 'Something Went Wrong')
        setLoading(false);
      }
      else {
        toast.error(response.error || 'Something Went Wrong')
        setLoading(false);
      }
    } catch (error) {
      toast.error(error || "Something went wrong")
      setLoading(false);
    }
  };
  const contentRef = useRef()
  const createResponseForSetInstuction = questionsData ? (
    <div
      ref={contentRef}
      className="generate-content 3xl:text-[0.729vw] text-[14px] text-[#344054]"
    >
      {questionsData &&
        questionsData?.map((item, index) => (

          <div key={index}>
            <h4>
              {index + 1}.{item.title}
            </h4>
            <ul>
              {Object.entries(item.questionItem?.question?.choiceQuestion?.options).map(([key, value]) => (
                <li key={+key + 1}>
                  {+key + 1}-{value.value}
                </li>
              ))}
            </ul>
            <br />
          </div>


        ))}

    </div>
  ) : ""
  const getGoogleFormuestionApi = async (FormId) => {
    try {
      // setLoading(true);
      setpopupLoading(true)

      const accessToken = getDataFromLocalStorage("access_token");
      const payload = {
        // "accessToken": "ya29.a0AXooCgsHGfsFE-7pQ8B2qiRcQKX0peNEK33XmaQMC3Be8958OzqYPPSJaj1p69izbEzVpg3Zj-ARlTlib2k5PxQy6E1gHcBXZQ0T_TCQXqyWBjHjHOYJo-6TVNqn7uHBMBzZ0Bl99wiVakZscF4uxxSOk-zwSH7vsPq-aCgYKAVYSARASFQHGX2MigHLmQxkKsMAuuIztjFdRJQ0171",
        'accessToken': accessToken,
        "formId": FormId
        // "formId": "1zmuOckwgvYs5U80A63mBnh7lKszdm-qxUqurg40Fmbs"
      };

      const response = await getgoogleFormApi(payload);
      console.log('responseQuizz:', response);
      if (response.code == 200) {
        setQuestionsData(response?.data?.data);
        setpopupLoading(false)
        // setLoading(false);
      } else if (response.code == 500) {
        toast.error(response.message || 'Something Went Wrong')
        // setLoading(false);
      }
      else {
        toast.error(response.error || 'Something Went Wrong')
        // setLoading(false);
        setpopupLoading(false)
      }
    } catch (error) {
      toast.error(error || "Something went wrong")
      // setLoading(false);
      setpopupLoading(false)
    }
  };


  useEffect(() => {
    if (status?.code == 'LM') {

      const turnedInSubmissions = popupData?.assignedStudents?.filter(
        (item) => item.state === "TURNED_IN"
      );
      console.log('turnedInSubmissions', turnedInSubmissions)
      setAllStudent(turnedInSubmissions)
    }
    if (status?.code == 'NY') {

      const assignedSubmissions = popupData?.assignedStudents?.filter(
        (item) => item.state === "CREATED"
      );
      console.log('assignedSubmissions', assignedSubmissions)
      setAllStudent(assignedSubmissions)
    }
    if (status?.code == 'RM') {

      const gradedSubmissions = popupData?.assignedStudents?.filter(
        (item) => item.state === "RETURNED"
      );
      setAllStudent(gradedSubmissions)
    }
    setIngredients([])
  }, [status, popupData])

  const getGoogleFormQueAndnsAApi = async (FormId) => {
    try {
      // setLoading(true);
      const accessToken = getDataFromLocalStorage("access_token");
      const payload = {
        'accessToken': accessToken,
        "formId": FormId
      };

      const response = await getgoogleFormQueAndAnsApi(payload);
      console.log('responseQuizz:', response);
      if (response.code == 200) {
        // setQuestionsData(response?.data?.data);
        setformQueAndAns(response?.data?.data)
        // setLoading(false);
      } else if (response.code == 500) {
        toast.error(response.message || 'Something Went Wrong')
        // setLoading(false);
      }
      else {
        toast.error(response.error || 'Something Went Wrong')
        // setLoading(false);
      }
    } catch (error) {
      toast.error(error || "Something went wrong")
      // setLoading(false);
    }
  };


  const handleOpen = (e, value) => {
    e.preventDefault()
    setpopupData(value)
    const turnedInSubmissions = value?.assignedStudents?.filter(
      (item) => item.state === "TURNED_IN"
    );
    setturnedInSubmissions(turnedInSubmissions)
    const assignedSubmissions = value?.assignedStudents?.filter(
      (item) => item.state === "CREATED"
    );
    setassignedSubmissions(assignedSubmissions)
    const gradedSubmissions = value?.assignedStudents?.filter(
      (item) => item.state === "RETURNED"
    );
    setgradedSubmissions(gradedSubmissions)
    // e.preventDefault()
    console.log('value', value)
    if (value?.materials?.length) {

      const url = value?.materials[0]?.form?.formUrl?.split('/');
      console.log('url', url)
      const FormId = url?.length && url[url?.length - 2]
      console.log('FormId', FormId)
      if (FormId) {
        getGoogleFormuestionApi(FormId)
        getGoogleFormQueAndnsAApi(FormId)
      }

      console.log('materials',)
    } else {
      setQuestionsData([])
      setformQueAndAns([])
    }

  }

  useEffect(() => {
    getQuizListApi();
  }, [props.topicId]);

  const dueDate = (dateObj) => {
    if (dateObj) {
      const { year, month, day } = dateObj;

      const date = moment({ year: year, month: month - 1, day: day });

      const formattedDate = date.format("MMM DD");

      return "Due " + formattedDate;
    } else {
      return "-";
    }
  };
  const capitalizeFirstChar = (str) => {
    if (!str || typeof str !== "string") {
      return "";
    }

    str = str.replace(/_/g, " ");

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleDelete = async (id) => {
    const accessToken = getDataFromLocalStorage("access_token");
    try {

      const payload = {
        accessToken: accessToken,
        courseId: props.classIdValue,
        id: id,
      }
      const response = await deletequizApi(payload);
      if (response.code == 200) {
        getQuizListApi()
        setQusans(false)
        toast.success('Deleted Successfully')
      } else if (response.code == 500) {
        toast.error(response.message || 'Something Went Wrong')
      }
      else {
        toast.error(response.error || 'Something Went Wrong')
      }
    } catch (e) {
      console.log('e', e)
      toast.error(error || "Something went wrong")
    }

  }


  return (
    <div className='grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 xl:gap-[1.042vw] gap-[12px]'>
      {loading ? (
        <div className="xl:p-[0.833vw] p-[10px] border border-[#C8CBD0] rounded-lg flex flex-col col-span-3 text-center">
          <div className="flex justify-center align-center">
            <ProgressSpinner />
          </div>
        </div>
      ) : quizassignment?.length > 0 ? (
        quizassignment.map((v) => {

          return (
            <>
              <div className="xl:p-[0.833vw] p-[10px] border border-[#C8CBD0] rounded-lg flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-[10px] xl:mb-[0.781vw]">
                  <h4 className="3xl:text-[0.729vw] text-[14px] text-[#98A2B3]">
                    Quiz Assignment
                  </h4>
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button >
                      <i
                        className="hexatoolthree-dots cursor-pointer 3xl:text-[1.25vw] text-[20px] text-[#98A2B3] 3xl:w-[1.25vw] w-[20px] 3xl:h-[1.25vw] h-[20px] text-center">
                      </i>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 min-h-[30px] origin-top-right bg-white py-0 p-[10px] xl:p-[0.633vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                        <ul>
                          <li
                            className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                            onClick={() => { quizEdit(true); courseId(v.courseId), id(v.id) }}>
                            Edit
                          </li>
                          <li Edit
                            className='3xl:text-[0.833vw] 2xl:text-[15px] text-[14px] text-[#101828] xl:py-[0.313vw] py-[6px] cursor-pointer hover:text-blue-500'
                            onClick={() => { handleDelete(v.id) }}>
                            Delete
                          </li>
                        </ul>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="xl:pb-[2.604vw] pb-[30px] border-b border-[#C8CBD0] grow">
                  <h3 className="3xl:text-[1.04vw] 2xl:text-[18px] text-[16px] text-[#000] font-medium mb-[10px] xl:mb-[0.781vw]">
                    {v?.title}
                  </h3>
                  <div className="flex flex-wrap gap-[8px]">
                    {/* <div className="flex 3xl:text-[0.833vw] 2xl:text-[12px] text-[12px] text-[#1B55AF] border border-[#1B55AF] bg-[#FCFCFD] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center">
                      {dueDate(v?.dueDate)}
                    </div> */}
                    <div className='flex 3xl:text-[0.677vw] 2xl:text-[12px] text-[12px] text-[#fff] border border-[#7BADFF] bg-[#7BADFF] rounded-md xl:py-[0.521vw] py-[8px]  justify-center items-center' style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                      {dueDate(v?.dueDate)}
                    </div>
                    <div className="flex 3xl:text-[0.677vw] 2xl:text-[12px] text-[12px] text-[#667085] border border-[#E4E7EC] bg-[#FCFCFD] rounded-md xl:px-[0.521vw] px-[5px] xl:py-[0.521vw] py-[8px] justify-center items-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    Turned In: {v?.pendingCount  ??  "-"}
                    </div>
                    <div className="flex 3xl:text-[0.0.677vw] 2xl:text-[12px] text-[12px] text-[#667085] border border-[#E4E7EC] bg-[#FCFCFD] rounded-md xl:px-[0.521vw] px-[10px] xl:py-[0.521vw] py-[8px] justify-center items-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    Assigned:  {v?.assignedStudents  ? v.assignedStudents.length : "-"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 xl:mt-[1.25vw] mt-[16px]">
                  {/* <button className="flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#344054] font-medium border border-[#C6CBD2] bg-[#FFF] rounded-lg xl:px-[0.938vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center">
                    View Instructions
                  </button> */}
                  <Link href={''} onClick={(e) => { setQusans(true); handleOpen(e, v) }}
                    // <Link href={`${materialsUrl}`} target="_blank"
                    className={`flex 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.521vw] py-[8px] justify-center items-center ${v.alternateLink ? "" : "pointer-events-none opacity-[0.7]"}`}

                  >
                    Open
                  </Link>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div className="xl:p-[0.833vw] p-[10px] border border-[#C8CBD0] rounded-lg flex flex-col col-span-3 text-center">
          <NoDataMsg />
        </div>
      )}
      <Dialog
        visible={qusans}
        className="custom-popup closeArrowTop w-[1000px] 3xl:w-[52.083vw]"
        onHide={() => {
          if (!qusans) return;
          setQusans(false);
          setQuestionsData([])
          setformQueAndAns([])
          setActiveTab(1)
        }}
        blockScroll
      >
        <div>
          <div className="flex items-center">
            <div
              onClick={() => setActiveTab(1)}
              className={`${activeTab === 1
                ? "border-b border-[#101828] text-[#101828] font-semibold"
                : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                }  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.573vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
            >
              <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                Questions
              </div>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className={`${activeTab === 2
                ? "border-b border-[#101828] text-[#101828] font-semibold"
                : "border-b border-b-[#C8CBD0] text-[#667085] font-normal"
                }  px-[20px] xl:px-[18px] 3xl:px-[1.042vw] py-[11px] xl:py-[9px] 3xl:py-[0.573vw] rounded-t-[5px] 3xl:rounded-t-[0.521vw] cursor-pointer`}
            >
              <div className="text-[16px] xl:text-[14px] 3xl:text-[0.833vw]">
                Student Answers
              </div>
            </div>
          </div>
          <div>
            {activeTab === 1 && (
              <>
                {!Popuploading ? <>
                  <div className="mt-[15px] 3xl:mt-[1.042vw]">
                    <div className="text-[#101828] text-[16px] 3xl:text-[0.833vw] font-medium">
                      Quiz Assignment
                    </div>
                    <div className="text-[#101828] text-[12px] 3xl:text-[0.625vw]">
                      HexaAI Demo - 1:18 PM
                    </div>
                    <div className="text-[#101828] text-[16px] 3xl:text-[0.833vw]">
                      <span className="font-bold">50</span> Points
                    </div>
                    {console.log('props?.quizInstruction', props?.quizInstruction)}
                    <div className="bg-[#F9FAFB] rounded-[16px] 3xl:rounded-[0.833vw] p-[24px] 3xl:p-[1.25vw] mt-[15px] 3xl:mt-[1.042vw]">
                      {createResponseForSetInstuction ? createResponseForSetInstuction : ''}
                      {/* <div className="space-y-[15px] 3xl:space-y-[0.781vw]">
                      <div className="row text-[#344054] text-[14px] 3xl:text-[0.729vw] space-y-[5px]">
                        <span className="block">What is 2 + 2?</span>
                        <span className="block">A-3</span>
                        <span className="block">B-4</span>
                        <span className="block">C-5</span>
                        <span className="block">D-6</span>
                      </div>
                      <div className="row text-[#344054] text-[14px] 3xl:text-[0.729vw] space-y-[5px]">
                        <span className="block">What is 8 + 1?</span>
                        <span className="block">A-4</span>
                        <span className="block">B-5</span>
                        <span className="block">C-6</span>
                        <span className="block">D-7</span>
                      </div>
                      <div className="row text-[#344054] text-[14px] 3xl:text-[0.729vw] space-y-[5px]">
                        <span className="block">What is 8 + 1?</span>
                        <span className="block">A-4</span>
                        <span className="block">B-5</span>
                        <span className="block">C-6</span>
                        <span className="block">D-7</span>
                      </div>
                    </div> */}
                    </div>
                    <div className="mt-[24px] 3xl:mt-[1.25vw] flex justify-end">
                      <Link
                        href={""}
                        className="inline-block shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white border border-[#C6CBD2] rounded-[8px] 3xl:rounded-[0.417vw] text-[#344054] text-[16px] 3xl:text-[0.833vw] font-medium py-[10px] 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] me-[10px]"
                        onClick={() => { quizEdit(true); courseId(popupData.courseId), id(popupData.id) }}
                      >
                        <Image
                          src="/images/edit.svg"
                          width={20}
                          height={20}
                          className="inline-block mr-[6px] 3xl:mr-[0.313vw]"
                        />{" "}
                        Edit
                      </Link>
                      <Link
                        href={""}
                        className="inline-block shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white border border-[#C6CBD2] rounded-[8px] 3xl:rounded-[0.417vw] text-[#344054] text-[16px] 3xl:text-[0.833vw] font-medium py-[10px] 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw] me-[10px]"
                        onClick={() => { handleDelete(popupData.id) }}
                      >
                        {/* <Image
                          src="/images/delete_icon.svg"
                          width={20}
                          height={20}
                          className="inline-block mr-[6px] 3xl:mr-[0.313vw]"
                        />{" "} */}
                       <i className="pi pi-trash text-[22px] mr-1 " style={{ color: 'dark'}}></i>
                        Delete
                      </Link>
                      <Link
                        href={""}
                        className="inline-block shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] bg-white border border-[#C6CBD2] rounded-[8px] 3xl:rounded-[0.417vw] text-[#344054] text-[16px] 3xl:text-[0.833vw] font-medium py-[10px] 3xl:py-[0.521vw] px-[18px] 3xl:px-[0.938vw]"
                        onClick={() => { copyToClipboard() }}
                      >
                        <Image
                          src="/images/link-copy2.svg"
                          width={20}
                          height={20}
                          className="inline-block mr-[6px] 3xl:mr-[0.313vw]"
                        />{" "}
                        Copy Link
                      </Link>
                    </div>
                  </div>
                </> : <div className="flex justify-center align-center">
                  <ProgressSpinner />
                </div>}
              </>
            )}
            {activeTab === 2 && (
              <>
                <div className="flex justify-between mt-[20px] 3xl:mt-[1.042vw]">
                  <div className="flex items-center gap-[16px] 3xl:gap-[0.833vw]">
                    <div>
                      <Link
                        href={""}
                        className="inline-block bg-[#C6CBD2] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[8px] 3xl:rounded-[0.417vw] border border-[#C6CBD2] px-[18px] 3xl:px-[0.938vw] py-[10px] 3xl:py-[0.521vw] text-white text-[16px] 3xl:text-[0.833vw] font-medium"
                      >
                        Return
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={""}
                        className="inline-flex items-center justify-center border border-[##1570ee] bg-[##1570ee] rounded-[6px] 3xl:rounded-[0.313vw] p-[8px] 3xl:p-[0.417vw]"
                      >
                        <i className="hexatoolmail text-[#1570ee] text-[25px] 3xl:text-[1.302vw]"></i>
                      </Link>
                    </div>
                    <div className="customDropdown clear-icon closeIcon">
                      <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={cities}
                        optionLabel="name"
                        placeholder="100"
                        className="w-[152px] 3xl:w-[7.917vw]"
                      />
                    </div>
                  </div>
                  <div className="col">
                    {/* <Link href={""}>
                      <i className="hexatoolsetting text-[#667085] text-[30px] 3xl:text-[1.563vw]"></i>
                    </Link> */}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] 3xl:gap-[1.042vw] mt-[20px] 3xl:mt-[1.042vw]">
                  <div className="col">
                    <div className="border border-[#C6CBD2] px-[16px] 3xl:px-[0.833vw] py-[24px] 3xl:py-[1.25vw] rounded-[8px] 3xl:rounded-[0.417vw] h-full">
                      <div className="customDropdown clear-icon closeIcon">
                        <Dropdown
                          value={status}
                          onChange={(e) => setStatus(e.value)}
                          options={cities2}
                          optionLabel="name"
                          placeholder="Assigned"
                          className="w-full"
                        />
                      </div>
                      {/* <div className="grid grid-cols-3 mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="col">
                          <Link
                            href={""}
                            className="inline-block bg-[#FFF2E5] rounded-[8px] 3xl:rounded-[0.417vw] text-[#4C2600] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            All Students
                          </Link>
                        </div>
                        <div className="col">
                          <Link
                            href={""}
                            className="inline-block text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            Assigned
                          </Link>
                        </div>

                        <div className="col">
                          <Link
                            href={""}
                            className="inline-block text-[#344054] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            Graded
                          </Link>
                        </div>
                      </div> */}
                      {/* <div className="grid grid-cols-1 mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="col">
                          <Link
                            href={""}
                            className="block text-center bg-[#FFF2E5] rounded-[8px] 3xl:rounded-[0.417vw] text-[#4C2600] text-[14px] 3xl:text-[0.729vw] font-medium px-[18px] 3xl:px-[0.938vw] py-[8px] 3xl:py-[0.417vw]"
                          >
                            All Students
                          </Link>
                        </div>
                      </div> */}
                      <div className="mt-[16px] 3xl:mt-[0.833vw]">

                        {allStudent?.length ? allStudent.map((ele, i) => {
                          return (
                            <>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-[8px] 3xl:gap-[0.417vw]">
                                  <div className="col leading-none">
                                    <Checkbox
                                      inputId="ingredient1"
                                      className="CustomCheckBox"
                                      name="pizza"
                                      value="Cheese"
                                      onChange={(e) => onIngredientsChange(i + 1, e)}
                                      checked={ingredients.find((ele) => ele.id == (i + 1))?.value ? ingredients.find((ele) => ele.id == (i + 1))?.value : false}
                                    />
                                  </div>
                                  <div className="col">
                                    <div className="bg-[#1570ee] rounded-full w-[28px] 3xl:w-[1.458vw] h-[28px] 3xl:h-[1.458vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                                      {ele?.studentName?.charAt(0)}

                                    </div>
                                  </div>
                                  <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                                    {ele?.studentName}
                                  </div>
                                </div>
                                <div className="text-[16px] 3xl:text-[0.833vw] text-[#344054] font-medium">
                                  50
                                </div>
                              </div>
                              <Divider />
                            </>
                          )
                        }) : <></>}

                      </div>
                    </div>
                  </div>
                  <div className="col relative">
                    {!ingredients?.length ? <div className="bg-[#F9FAFB] rounded-[16px] 3xl:rounded-[0.833vw] p-[24px] 3xl:p-[1.25vw] h-full">
                      <div className="space-y-[24px] 3xl:space-y-[1.25vw]">
                        <div className="text-[20px] 3xl:text-[1.042vw] text-[#101828] font-medium">
                          Quiz Assignment
                        </div>
                        <div className="flex items-center custDivider">
                          <div className="col">
                            <div className="text-[#1570EF] text-[36px] 3xl:text-[1.875vw] font-semibold">
                              {turnedInSubmissions?.length}
                            </div>
                            <div className="text-[#667085] text-[14px] 3xl:text-[0.729vw]">
                              Turned In
                            </div>
                          </div>
                          <Divider layout="vertical" />
                          <div className="col">
                            <div className="text-[#1570EF] text-[36px] 3xl:text-[1.875vw] font-semibold">
                              {assignedSubmissions?.length}
                            </div>
                            <div className="text-[#667085] text-[14px] 3xl:text-[0.729vw]">
                              Assigned
                            </div>
                          </div>
                          <Divider
                            layout="vertical"
                            className="text-[#E4E7EC]"
                          />
                          <div className="col">
                            <div className="text-[#1570EF] text-[36px] 3xl:text-[1.875vw] font-semibold">
                              {gradedSubmissions?.length}
                            </div>
                            <div className="text-[#667085] text-[14px] 3xl:text-[0.729vw]">
                              Graded
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-[16px] 3xl:text-[0.833vw] text-[#344054] font-semibold">
                          Accepting Submissions{" "}
                          <i className="hexatoolinfo-circule text-[#1570EF] text-[20px] 3xl:text-[1.042vw] ml-[10px] 3xl:ml-[0.521vw]"></i>
                        </div>
                        <div className="col space-y-[24px] 3xl:space-y-[1.25vw]">
                          <div className="bg-[#F2F4F7] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[8px] 3xl:px-[0.417vw] flex items-center justify-end relative overflow-hidden text-[14px] 3xl:text-[0.729vw] text-[#344054]">
                            2
                            <div className="absolute left-0 top-0 bottom-0 bg-[rgba(0,0,0,0.05)] px-[8px] 3xl:px-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw] flex items-center w-full max-w-[64px] 3xl:max-w-[3.333vw]">
                              A
                            </div>
                          </div>
                          <div className="bg-[#cce1ff] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[8px] 3xl:px-[0.417vw] flex items-center justify-end relative overflow-hidden text-[14px] 3xl:text-[0.729vw] text-[#344054]">
                            B
                            <div className="absolute left-0 top-0 bottom-0 bg-[rgba(0,0,0,0.05)] px-[8px] 3xl:px-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw] flex items-center w-full max-w-[64px] 3xl:max-w-[3.333vw]">
                              8
                            </div>
                          </div>
                          <div className="bg-[#F2F4F7] rounded-[8px] 3xl:rounded-[0.417vw] py-[12px] 3xl:py-[0.625vw] px-[8px] 3xl:px-[0.417vw] flex items-center justify-end relative overflow-hidden text-[14px] 3xl:text-[0.729vw] text-[#344054]">
                            0
                            <div className="absolute left-0 top-0 bottom-0 px-[8px] 3xl:px-[0.417vw] rounded-[8px] 3xl:rounded-[0.417vw] flex items-center w-full max-w-[64px] 3xl:max-w-[3.333vw]">
                              C
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      :
                      (formQueAndAns?.length ? formQueAndAns.map((ele) => {
                        return (
                          <>
                            <div className="bg-[#F9FAFB] rounded-[16px] 3xl:rounded-[0.833vw] p-[24px] 3xl:p-[1.25vw] h-full lg:max-h-[400px]">
                              <div className="flex items-center justify-between">
                                <div className="col">
                                  <div className="text-[20px] 3xl:text-[1.042vw] font-medium text-[#101828]">
                                    {ele?.formInfo?.title}
                                  </div>
                                  <div className="text-[14px] 3xl:text-[0.729vw] text-[#667085]">
                                    Graded (See history)
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="text-[20px] 3xl:text-[1.042vw] font-medium text-[#101828]">
                                    50/50
                                  </div>
                                </div>
                              </div>
                              <div className="mt-[24px] 3xl:mt-[1.25vw] h-[320px] mb-5">
                                <ScrollPanel style={{ width: '100%', height: '250px' }} className="mb-[30px]">
                                  {ele?.responses?.length ? ele?.responses?.map((item,index) => {
                                    return (
                                      <>
                                        <div className="space-y-[32px] 3xl:space-y-[1.667vw]">
                                          <div className="mt-5 ml-2 text-[16px]"><strong>{index+1} .</strong><b>{item?.question}</b> </div>
                                          {item?.choices?.length ? item?.choices.map((items) => {
                                            return (
                                              <>
                                                <div className="flex items-center custRadiobutton">
                                                  <RadioButton
                                                   className="custRadio"
                                                    inputId="ingredient1"
                                                    name="pizza"
                                                    value="Cheese"
                                                    // onChange={(e) => setIngredient(e.value)}
                                                    checked={items==item?.answer}
                                                  />  
                                                  <label
                                                    htmlFor="ingredient1"
                                                    className={`ml-2 text-[15px] 3xl:text-[16px] ${items==item?.answer ?'text-[#1570ee]': 'text-[#344054]'} font-semibold`}
                                                  >
                                                    {items}
                                                  </label>
                                                </div>
                                              </>
                                            )
                                          }) : <></>}
                                          {/* <div className="flex items-center custRadiobutton">
                                            <RadioButton
                                              inputId="ingredient2"
                                              name="pizza"
                                              value="Cheese"
                                              onChange={(e) => setIngredient(e.value)}
                                              checked={ingredient === "Cheese"}
                                            />
                                            <label
                                              htmlFor="ingredient2"
                                              className="ml-2 text-[24px] 3xl:text-[1.25vw] text-[#FF7F01] font-semibold"
                                            >
                                              B
                                            </label>
                                          </div>
                                          <div className="flex items-center custRadiobutton">
                                            <RadioButton
                                              inputId="ingredient3"
                                              name="pizza"
                                              value="Cheese"
                                              onChange={(e) => setIngredient(e.value)}
                                              checked={ingredient === "Cheese"}
                                            />
                                            <label
                                              htmlFor="ingredient3"
                                              className="ml-2 text-[24px] 3xl:text-[1.25vw] text-[#344054] font-semibold"
                                            >
                                              C
                                            </label>
                                          </div> */}
                                        </div>
                                      </>
                                    )
                                  })
                                    : <></>}
                                </ScrollPanel>
                              </div>
                            </div>
                            <div className="lg:absolute left-0 right-0 bottom-0 pb-[30px] lg:pb-0 ">
                              <div className="flex items-center justify-between mt-[16px] 3xl:mt-[0.833vw] gap-[15px] 3xl:gap-[0.781vw]">
                                <div className="col">
                                  <div className="bg-[#1570ee] rounded-full w-[36px] 3xl:w-[1.875vw] h-[36px] 3xl:h-[1.875vw] flex items-center justify-center text-white text-[16px] 3xl:text-[0.833vw] font-medium">
                                    R
                                  </div>
                                </div>
                                <div className="w-full">
                                  <InputText
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder="Add Private Comment"
                                    className="w-full"
                                  />
                                </div>
                                <div className="col">
                                  <Link href={""} className="inline-block">
                                    <i className="pi pi-send text-[22px] mt-1" style={{ color: '#708090'}}></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })
                        : <></>)
                    }
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
