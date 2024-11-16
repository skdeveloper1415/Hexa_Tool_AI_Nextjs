import React, { use, useEffect, useState } from "react";
import Image from 'next/image'
import { Dialog } from 'primereact/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { renderToString } from 'react-dom/server';
import { uploadContentApi, uploadContentOneDriveApi } from "../../app/actions/uploadApi";
import { toast } from "react-toastify";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

const UploadPopup = (props) => {

  const isMicrosoftAuthenticated = useIsAuthenticated();
  const {instance, accounts} = useMsal();

  const uploadFileOnDrive = async (tokenData) => {
    try {
      const payload = {
        file_type: "application/pdf",
        content: renderToString(props.response),
        refreshToken: tokenData.refresh_token,
        accessToken: tokenData.access_token,
        appName: props.appName,
      };
      const response = await uploadContentApi(payload);
      if (response?.data?.code == 200) {
        const url = response.data?.data?.url;
        if (url) {
          props.onHides()
          window.open('https://drive.google.com/drive/my-drive', "_blank");
        }
        toast.success("Uploaded Successfully");
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      const message = error?.message ?? 'Something went wrong'
      toast.error(message)
    }
  }
 
  const uploadFileOnSharePoint = async (res) => {
    try {
      const payload = {
        file_type: "text/plain",
        content: renderToString(props.response),
        refreshToken: "",
        accessToken: res?.accessToken
      };
      const response = await uploadContentOneDriveApi(payload);
      if (response?.code == 200) {
        const url = response.data.url;
        if (url) {
          props.onHides()
          window.open('https://hexalytics.sharepoint.com/_layouts/15/sharepoint.aspx', "_blank");
        }
        toast.success("Uploaded Successfully");
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      const message = error?.message ?? 'Something went wrong'
      toast.error(message)
    }
  }
  
const onSharePointUpload = async () => {
  try{
    const res = await instance.loginPopup({
      scopes: ['openid', 'profile', 'offline_access','Files.ReadWrite']
    })
  } catch (error) {
    const message = error?.message ?? 'Something went wrong'
    toast.error(message)
  }
}

const getTokenSilently = async () => {
  try {
    const msalResponse = await instance.acquireTokenSilent({
      account: accounts[0],
      scopes: ['openid', 'profile', 'offline_access','Files.ReadWrite']
    });
    if(msalResponse){
      uploadFileOnSharePoint(msalResponse)
    }
  } catch (error) {
    console.error("Error acquiring token silently:", error);
  }
}

useEffect (()=>{
  if(accounts.length > 0) {
    getTokenSilently()
  }
},[accounts])

  const onGoogleUpload = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/drive',
    onSuccess: async (tokenResponse) => {
      try {
        const code = tokenResponse?.code;
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const clientSec = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
        const tokenurl = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const redirectUrl = process.env.NEXT_PUBLIC_REDIRECT_URL;      
        const response = await axios
          .post(tokenurl, {
            code: code,
            client_id: clientId,
            client_secret: clientSec,
            grant_type: 'authorization_code',
            redirect_uri: redirectUrl
          }
          )
        if (response) {
          uploadFileOnDrive(response.data)
        }
      }
      catch (error) {
        const message = error?.message ?? "Something went wrong"
        toast.error(message)
      }
    },
    onFailure: error => {
      const message = error?.message ?? "Something went wrong"
      toast.error(message)
    }
  });

  return (
    <div>
      <Dialog header="Upload" showHeader={false} className="custom_dialog" style={{ width: '31.25vw' }} breakpoints={{ '768px': '75vw', '1200px': '45vw', '641px': '100vw' }} visible={props.visible} onHide={() => props.onHide(false)}>
        <div>
        <div className="flex justify-end -mt-4 -mr-4 3xl:-mr-[1.042vw] 3xl:-mt-[1.042vw] z-10 relative cursor-pointer"> <div onClick={() => { props.onHides(false); }} className="3xl:w-[2.083vw] 3xl:h-[2.083vw] w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#b2cef6] border border-[#b2cef6] text-[#1570EF] text-xs 3xl:text-[0.729vw]"><i className="hexatoolclose"></i></div>
        </div>
        <div className="3xl:pt-[1.042vw] pt-4 3xl:pb-[1.25vw] pb-6 3xl:px-[2.083vw] px-9 flex flex-col gap-5 3xl:gap-[1.25vw]">
        <div className="text-[#101828] 3xl:text-[1.042vw] text-xl font-semibold leading-[30px] 3xl:leading-[1.563vw]">Upload</div>
        <div className="flex flex-col gap-4 3xl:gap-[0.833vw]">
          <div className="flex items-center justify-center gap-4 3xl:gap-[0.781vw] text-[#101828] text-base 3xl:text-[0.833vw] font-semibold leading-6 3xl:leading-[1.25vw] -tracking-[0.32px] bg-white border border-[#E8F0F3] rounded-lg 3xl:rounded-[0.521vw] box-shadow01 3xl:py-[0.781vw] py-3.5 3xl:px-[1.042vw] px-5 cursor-pointer" onClick={onGoogleUpload}><Image src={'/images/google_logo.svg'} width={20} height={20} alt="Google" className="3xl:w-[1.042vw] 3xl:h-[1.042vw]" /><span>Upload with Google Drive</span></div>
          <div className="flex items-center justify-center gap-4 3xl:gap-[0.781vw] text-[#101828] text-base 3xl:text-[0.833vw] font-semibold leading-6 3xl:leading-[1.25vw] -tracking-[0.32px] bg-white border border-[#E8F0F3] rounded-lg 3xl:rounded-[0.521vw] box-shadow01 3xl:py-[0.781vw] py-3.5 3xl:px-[1.042vw] px-5 cursor-pointer" onClick={onSharePointUpload}><Image src={'/images/sharepoint-icon.svg'} width={20} height={20} alt="Google" className="3xl:w-[1.042vw] 3xl:h-[1.042vw]" /><span>Upload with Share Point</span></div>
          <div className="pb-6 flex items-center justify-center gap-4 3xl:gap-[0.781vw] text-[#101828] text-base 3xl:text-[0.833vw] font-semibold leading-6 3xl:leading-[1.25vw] -tracking-[0.32px] bg-white border border-[#E8F0F3] rounded-lg 3xl:rounded-[0.521vw] box-shadow01 3xl:py-[0.781vw] py-3.5 3xl:px-[1.042vw] px-5 cursor-pointer"><Image src={'/images/logo1.svg'} width={20} height={20} alt="Google" className="3xl:w-[1.042vw] 3xl:h-[1.042vw]" /><span>Save to Hexa Library</span></div>   
        </div>
        </div>
        {/* <div className="flex items-center justify-center gap-3 3xl:gap-[1.25vw] pb-6 3xl:pb-[1.25vw]">
          <div className="text-[#344054] text-base 3xl:text-[0.833vw] font-medium leading-6 3xl:leading-[1.25vw] bg-white border border-[#C6CBD2] rounded-lg 3xl:rounded-[0.417vw] box-shadow02 3xl:py-[0.521vw] py-2.5 3xl:px-[0.938vw] px-4 cursor-pointer" onClick={() => { props.onHides(false); }}>Cancel</div>
          <div className="text-white text-base 3xl:text-[0.833vw] font-medium leading-6 3xl:leading-[1.25vw] bg-[#1570EF] border border-[#1570EF] rounded-lg 3xl:rounded-[0.417vw] box-shadow02 3xl:py-[0.521vw] py-2.5 3xl:px-[0.938vw] px-4 cursor-pointer" onClick={() => { props.onHides(false); }}>Close</div>
        </div> */}
                </div>
            </Dialog>
    </div>
  );
};

export default UploadPopup;
