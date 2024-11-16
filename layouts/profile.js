import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Image } from "primereact/image";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDataFromLocalStorage } from "../components/helper/commonFunction";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function Profile() {
  const [userData,setUserData]=useState(null)
  const router=useRouter()

  const handleLogout = () => {
    localStorage.clear()
    toast.success("Logged Out Successfully.")
    window.location.href='/'
  };
  
  useEffect(()=>{
    const storedUserData = getDataFromLocalStorage("user_data");
    setUserData(()=>{
      return storedUserData ? JSON.parse(storedUserData) : null;
    })
  },[])
  return (
    <div>
      <span className="flex flex-wrap flex-grow">
        {/* <div className="mr-3"> */}

        {/* </div> */}
        <Menu as="div" className="relative inline-block">
          <div className="flex items-center">
            <Menu.Button className="flex items-center">
              <div className="relative">
                <div className="flex items-center space-x-[10px] 3xl:space-x-[0.521vw]">
                  <div className="profileImg">
                    <Image
                      src={userData?.picture}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="text-start">
                    <div className="text-[#111111] text-[14px] 3xl:text-[0.729vw] font-semibold">
                    {userData?.name}
                    </div>
                    <div className="text-[#777777] text-[14px] 3xl:text-[0.729vw]">Instructor</div>
                  </div>
                </div>
              </div>
              <span className="pl-[20px] 3xl:pl-[1.042vw] text-[#000000]">
                {/* <i className="hexatooldown-arrow text-[12px] 3xl:text-[0.625vw]"></i> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-2 fill-current"
                >
                    {/* <path d="M7.41 7.41L6 6l-6 6 6 6 1.41-1.41L2.83 12z" /> */}
                    <path d="M12 16l-6-6h12z" />
                </svg>
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-full min-w-[250px] origin-top-right bg-white  p-[16px] xl:p-[0.833vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
              <div>
              <div className="text-[#000000] text-[18px] xl:text-[0.938vw] font-semibold">
              {userData?.name}
                </div>
                <div className="text-[#000000] text-[12px] xl:text-[0.729vw] opacity-60 leading-none">
                  Instructor Account
                </div>
                <ul className="headerProfile">
                  {/* <li>
                    <Link href={""}>
                      View profile
                    </Link>
                  </li>
                  <li>
                    <Link href={""}>
                      Change Password
                    </Link>
                  </li> */}
                  <li className="divide"></li>
                  <li className="divide"></li>
                  <li>
                    <button onClick={handleLogout}>Log out</button>
                      
                  </li>
                </ul>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </span>
    </div>
  );
}
