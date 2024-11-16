import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menubar } from "primereact/menubar";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { OverlayPanel } from "primereact/overlaypanel";
import Profile from "./profile";
import { usePathname } from "next/navigation";
import { getDataFromLocalStorage } from "../components/helper/commonFunction";

export default function Top({ ...pageProps }) {
  const notificatio = useRef(null);
  const [tokenValue,setTokenValue]=useState(null)
  let activeMenuItem = usePathname();

  const items = [
    {
      url: "/",
      label: "Home",
      className: activeMenuItem == '/' ? 'activemenu' : '',
    },
    {
      url: "/aiapps",
      label: "AI Apps",
      className: activeMenuItem.includes('/aiapps') ? 'activemenu' : '',
    },
    {
      url: "/manageclass",
      label: "Manage Class",
      // icon: 'pi pi-fw pi-envelope',
      className: activeMenuItem.includes('/manageclass') ? 'activemenu' : '',
    },
    {
      url: "/dashboard",
      label: "Dashboard",
      className: activeMenuItem.includes('/dashboard') ? 'activemenu' : '',
    },
    {
      url: "/mycalendar",
      label: "My Calendar",
      className: activeMenuItem.includes('/mycalendar') ? 'activemenu' : '',
    },
    {
      url: "/mymail",
      label: "My Mail",
      className: activeMenuItem.includes('/mymail') ? 'activemenu' : '',
    },
    {
      url: "/blog",
      label: "Blog",
      className: activeMenuItem.includes('/blog') ? 'activemenu' : '',
    },
    {
      url: "/library",
      label: "AI Library",
      className: activeMenuItem.includes('/library') ? 'activemenu' : '',
    },
  ];
  
  useEffect(() => {
    let  token = getDataFromLocalStorage("access_token");
    setTokenValue(token)
}, []);

  return (
    <>
      <div className="w-full text-gray-700 bg-white shadow-md shadow-gray-200 fixed top-0 z-10 px-4 py-3 xl:px-10 header-wrap justify-between">
        <div className="flex items-center justify-between">
          <div className="col">
            <Link className="cursor-pointer" href={"/"}>
              {" "}
              <Image
                width="176"
                height="42"
                src="/images/logo-new.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="col w-full">
            <div className="card flex justify-end lg:justify-center text-[#CFE2F3] menubg">
              <Menubar model={items} className="custmenu" />
            </div>
          </div>
          <div className="flex items-center gap-[15px] xl:gap-[40px] 3xl:gap-[2.083vw] min-w-fit">
            {/* <div className="col ">
              <span
                href={""}
                onClick={(e) => notificatio.current.toggle(e)}
                className="cursor-pointer inline-flex items-center justify-center rounded-full w-[48px] 3xl:w-[2.5vw] h-[48px] 3xl:h-[2.5vw] bg-[#FBF9F7] relative"
              >
                <i className="hexatoolnotification text-[16px] 3xl:text-[0.833vw] text-[#777777]"></i>
                <div className="absolute -right-[6px] 3xl:-right-[0.313vw] -top-[0.313vw] 3xl:-top-[6px]">
                  <span className="inline-flex items-center justify-center rounded-full w-[24px] 3xl:w-[1.25vw] h-[24px] 3xl:h-[1.25vw] bg-[#D6B664] text-[11px] 3xl:text-[0.573vw] text-white font-semibold">
                    3
                  </span>
                </div>
              </span>
            </div> */}
           {tokenValue && <div><Profile /></div>} 
          </div>
          <div></div>
        </div>
      </div>

      <OverlayPanel ref={notificatio}>
        <div className="">
          <div className="w-full min-w-[300px] 3xl:min-w-[15.625vw] origin-top-right bg-white box-shadow">
            <div className="flex items-center justify-between">
              <div className="text-[#101828] font-semibold text-[20px] 3xl:text-[1.042vw]">
                Notifications
              </div>
            </div>
            <SimpleBar className="pr-4" style={{ maxHeight: "300px" }}>
              <div
                className="divide-y divide-solid divide-[#D8D8D8] list-space"
                data-simplebar
              >
                <div className="flex items-start py-2">
                  <div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw] font-semibold">
                      New Order has been placed
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      Order #00000
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      11:15 am, 14th Feb.
                    </div>
                  </div>
                </div>
                <div className="flex items-start py-2">
                  <div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw] font-semibold">
                      New Order has been placed
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      Order #00000
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      11:15 am, 14th Feb.
                    </div>
                  </div>
                </div>
                <div className="flex items-start py-2">
                  <div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw] font-semibold">
                      New Order has been placed
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      Order #00000
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      11:15 am, 14th Feb.
                    </div>
                  </div>
                </div>
                <div className="flex items-start py-2">
                  <div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw] font-semibold">
                      New Order has been placed
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      Order #00000
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      11:15 am, 14th Feb.
                    </div>
                  </div>
                </div>
                <div className="flex items-start py-2">
                  <div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw] font-semibold">
                      New Order has been placed
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      Order #00000
                    </div>
                    <div className="text-[#101828] text-[14px] 3xl:text-[0.729vw]">
                      11:15 am, 14th Feb.
                    </div>
                  </div>
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </OverlayPanel>
    </>
  );
}
