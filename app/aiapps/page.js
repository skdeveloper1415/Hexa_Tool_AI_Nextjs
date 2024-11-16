"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../layouts/pagelayout";
import Link from "next/link";
import Image from "next/image";
import { BreadCrumb } from "primereact/breadcrumb";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from "primereact/dropdown";
import { CATEGORIES } from "../common/Masters";
import { APPS } from "../common/Masters";
import { getDataFromLocalStorage } from "../../components/helper/commonFunction";

export default function Index() {
  const items = [
    { label: "BrixAI Apps", url: "" },
  ];
  const home = { label: "Home", url: "" };

  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  const [appsData, setAppsData] = useState(APPS);
  const [categories, setCategories] = useState(CATEGORIES);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCatTypes, setSelectedCatTypes] = useState([]);
  const [userName, setUserName] = useState("");
  const selectAllCategories = () => {
    if(selectedCategories.length == CATEGORIES.length){
      setSelectedCategories([]);
    }else{
      let allCatIds = CATEGORIES.map((cat) => cat.code);
      setSelectedCategories(allCatIds);
    }
  };

  const unselectAll = () => {
    setSearchText('')
    setSelectedCategories([]);
    setAppsData[APPS];
  };

  const handleSelectCategory = (categoryCode) => {
    setSearchText("");
    const index = selectedCategories.indexOf(categoryCode); // Check if category code is already present in array
    if (index == -1) {
      setSelectedCategories([...selectedCategories, categoryCode]);
    } else {
      let result = [...selectedCategories];
      result.splice(index, 1);
      setSelectedCategories(result);
    }
  };

  const searchResults = (text) => {
    const searchedResults = APPS.filter((app) => {
      return (
        app.title.toLowerCase().includes(text.toLowerCase().trim()) ||
        app.description.toLowerCase().includes(text.toLowerCase().trim())
      );
    });
    if (searchedResults.length > 0 && selectedCatTypes.length > 0) {
      const filteredResults = searchedResults.filter((result) =>
        selectedCatTypes.some((cat) => cat.name == result.category)
      );
      setAppsData(filteredResults);
    } else if (searchedResults.length > 0) {
      setAppsData(searchedResults);
    } else {
      setAppsData([]);
    }
  };

  useEffect(() => {
    if (searchText.length == 0) {
      searchResults("");
    }
  }, [searchText]);

  useEffect(() => {
    // Simulate fetching options from an API
    setTimeout(() => {
      const fetchedOptions = [
        { label: "BrixAI", value: "option1" },
        /* { label: "GenAI", value: "option2" },
        { label: "K12 ", value: "option3" }, */
      ];
      setOptions(fetchedOptions);
      setSelectedOption(fetchedOptions[0].value); // Select the first option
    }, 200); // Adjust the timeout as needed
  }, []);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      let filteredCategoryData = CATEGORIES.filter((category) =>
        selectedCategories.includes(category.code)
      );
      setSelectedCatTypes(filteredCategoryData);
      let filteredApps = APPS.filter((app) => {
        return filteredCategoryData.some((cat) => app.category === cat.name);
      });
      setAppsData(filteredApps);
    } else {
      setAppsData(APPS);
      setSelectedCatTypes([]);
    }
  }, [selectedCategories]);

  useEffect(() => {
    const storedUserData = getDataFromLocalStorage("user_data");
    setUserName(storedUserData ? JSON.parse(storedUserData) : null);
  }, []);

  return (
    <>
      <Layout>
        <div className="max-w-[1315px] mx-auto xl:px-[1.04vw] px-[20px] ">
          <div className="xl:mb-[1.667vw] mb-[20px]">
            <h1 className="text-[#101828] 3xl:text-[1.875vw] 2xl:text-[28px] text-[22px] xl:mb-[1.667vw] mb-[20px]">
                { userName? `Hi ${userName?.name},`: ""} 
              <span className="font-semibold"> Welcome to BrixAI Apps</span>
            </h1>
            <div className="lg:flex space-y-[18px] lg:space-y-[0] xl:gap-[1.25vw] gap-[18px] xl:mb-[1.667vw] mb-[20px]">
              <div className="keydropdown w-full lg:w-[17.5%]">
                <Dropdown
                  value={selectedOption}
                  options={options}
                  onChange={(e) => setSelectedOption(e.value)}
                />
              </div>
              <div className="relative custom-search w-full lg:w-[65%]">
                <button className="absolute left-[20px] top-[23px]">
                  <i className="hexatoolsearch mr-2 text-[20px] 3xl:text-[1.042vw] text-[#667085]"></i>
                </button>
                <InputText
                  value={searchText}
                  placeholder="Keywords"
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full rounded-full   s"
                  onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                      setSearchText(e.target.value);
                      searchResults(e.target.value);
                    }
                }}
                />
              </div>
              <button
                className="flex w-full lg:w-auto lg:min-w-fit 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-medium border border-[#1570EF] bg-[#1570EF] rounded-full xl:px-[2.08vw] px-[32px] xl:py-[0.573vw] py-[11px] justify-center items-center keyshadow  w-[17.5%]"
                onClick={() => {
                  searchResults(searchText);
                }}
              >
                Find AI Apps
              </button>
            </div>
            <div className="flex flex-wrap xl:gap-[0.625vw] gap-[10px]">
              <button
                className={
                  selectedCategories.length == CATEGORIES.length
                    ? "flex 3xl:text-[0.729vw] text-[14px] font-medium border border-[#fff] bg-[#1B55AF] text-[#fff] rounded-full xl:px-[0.938vw] px-[16px] xl:py-[0.417vw] py-[8px] justify-center items-center bg-"
                    : "flex 3xl:text-[0.729vw] text-[14px] text-[#3166B7] font-medium border border-[#1B55AF] rounded-full xl:px-[0.938vw] px-[16px] xl:py-[0.417vw] py-[8px] justify-center items-center"
                }
                onClick={() => {
                  selectAllCategories();
                }}
              >
                <i className="hexatoolbase mr-2 text-[20px] 3xl:text-[1.042vw]"></i>
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.code}
                  className={
                    selectedCategories.includes(cat.code)
                      ? "flex 3xl:text-[0.729vw] text-[14px] text-[#fff]  bg-[#1B55AF] font-medium border border-[#fff] rounded-full xl:px-[0.938vw] px-[16px] xl:py-[0.417vw] py-[8px] justify-center items-center"
                      : "flex 3xl:text-[0.729vw] text-[14px] text-[#3166B7] font-medium border border-[#1B55AF] rounded-full xl:px-[0.938vw] px-[16px] xl:py-[0.417vw] py-[8px] justify-center items-center"
                  }
                  onClick={() => {
                    handleSelectCategory(cat.code);
                  }}
                >
                  {cat.value}
                </button>
              ))}
              <button
                className="flex 3xl:text-[0.729vw] text-[14px] text-[#98A2B3] font-medium border border-[#98A2B3] rounded-full xl:px-[0.938vw] px-[16px] xl:py-[0.417vw] py-[8px] justify-center items-center"
                onClick={unselectAll}
              >
                <i className="hexatoolclose mr-2 text-[12px] 3xl:text-[0.625vw]"></i>
                Clear All
              </button>
            </div>
          </div>
        { appsData.length > 0 && <h4 className="text-[#667085] 3xl:text-[0.729vw] text-[14px] xl:mb-[0.833vw] mb-[12px]">
            Recommended AI Apps
          </h4>}
          <div className="grid xl:grid-cols-3 md:grid-cols-2  xl:gap-[0.833vw] gap-[10px]">
            {appsData.length == 0 ? (
              <div
                className="w-full flex justify-center text-center col-span-3"
                key={"nodata"}
              >
                <Image
                  className="w-[520px] h-[400px]"
                  width="520"
                  height="400"
                  src="/images/no-data-found.png"
                  alt="no data found"
                />
              </div>
            ) : (
              <>
                {appsData.map((app, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <Link
                          href={app.link}
                          className="h-full block border border-[#E4E7EC] rounded-lg xl:px-[0.930vw] px-[18px] xl:py-[0.625vw] py-[12px]"
                        >
                          <div className="flex relative">
                            <Image
                              width="64"
                              height="64"
                              className="xl:mr-[0.833vw] mr-[12px]"
                              src={app.src}
                              alt={app.alt}
                            />
                            <div>
                              <h3 className="text-[#101828] 3xl:text-[0.833vw] lg:text-[16px] text-[14px] font-semibold mb-[2px] flex">
                                {app.title}
                              </h3>
                              <p className="text-[#344054] 3xl:text-[0.625vw] text-[12px]">
                              {app.description.length > 70 ? `${app.description.slice(0, 90)}...` : app.description}
                              </p>
                            </div>
                            <div className="absolute right-0 top-0">
                              <i className="hexatoolstart-outline text-[16px] 3xl:text-[0.833vw] text-[#1570EF]"></i>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
