"use client";
import React, { useState, useEffect } from 'react'
import Layout from '../../layouts/pagelayout'
import Image from 'next/image'
import Link from 'next/link'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { getDataFromLocalStorage, setDataIntoLocalStorage } from '../../components/helper/commonFunction';
import Cookies from 'js-cookie';
import { authorizedEmails } from '../../components/helper/enum';


export default function Page() {
 // console.log(localStorage.getItem("access_token"),"AJKDHAHDJAHDJAHD")

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const getUserInfo = async (data) => {

    const baseUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
    try {
      const response = await axios.get(baseUrl, {
        params: {
          access_token: data?.access_token
        }
      })
      if (response && response.status == 200) {
        const userData = response.data;
        const userEmail = userData?.email;
        const emailFound = authorizedEmails?.some(item => item.email === userEmail);
        if (emailFound) {
          setUserDetails(userData);
          Cookies.set('access_token', data?.access_token)
          Cookies.set('user_id', userData?.id)
          setDataIntoLocalStorage("user_data", JSON.stringify(userData));
          setDataIntoLocalStorage("access_token", data?.access_token);
          setIsAuthenticated(true);
        } else {
          toast.error("Unauthorized user");
          setTimeout(() => {
            localStorage.clear();
          }, 2000);
        }
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      const message = error?.message ?? "Something went wrong"
      toast.error(message)
    }
    
  }

  const onGoogleUpload = useGoogleLogin({
    flow: 'auth-code',
    "scope": "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/classroom.push-notifications https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/classroom.guardianlinks.students https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.topics.readonly https://www.googleapis.com/auth/forms.responses.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/forms.body.readonly https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/classroom.announcements.readonly", 
    // "scope": "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.topics.readonly https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly https://www.googleapis.com/auth/classroom.guardianlinks.students https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.push-notifications https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.announcements.readonly https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.student-submissions.me.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/forms.body.readonly https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/forms.responses.readonly",

  // "scope": "https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/forms.responses.readonly https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly https://www.googleapis.com/auth/classroom.guardianlinks.students https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.topics.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.student-submissions.students.readonly https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.announcements.readonly https://www.googleapis.com/auth/classroom.student-submissions.me.readonly https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/classroom.push-notifications https://www.googleapis.com/auth/forms.body.readonly",
    onSuccess: async (tokenResponse) => {

      try {
        setLoading(true)
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
          getUserInfo(response.data);
        } else if(response.code == 500){
          toast.error(response.message ||'Something Went Wrong')
          setLoading(false);
        }
        else {
          toast.error(response.error || 'Something Went Wrong')
          setLoading(false);
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

  useEffect(() => {
    let userData = getDataFromLocalStorage("user_data");
    userData=JSON.parse(userData);
    setUserDetails(userData)
    if (userData) {
      setIsAuthenticated(true);
    } 
  }, []);

  return (
    <Layout>
      <div className="mx-auto 3xl:px-[31.25vw] xl:px-[300px] lg:px-[200px] px-[20px] 3xl:mt-[5.365vw] 2xl:mt-[5.365vw] xl:mt-[100px] mt-[50px]">
        <div className='border border-[#E4E7EC] rounded-lg'>
          <div className='bg-[#F2F4F7] 3xl:py-[3.385vw] 2xl:py-[3.385vw] xl:py-[68px] py-[60px] 3xl:px-[8.594vw] 2xl:px-[8.594vw] xl:px-[165px] px-[160px] rounded-t-lg text-center'>

            <Image className="xl:w-[200px] xl:h-[125px] m-auto " width="200" height="125" src="/images/google_classroom_img.svg" alt="google_classroom_img" />

            <p className="text-[#344054] 3xl:text-[0.733vw] xl:text-[15px] lg:text-[15px] text-[14px] font-normal mt-[24px] leading-tight">Helping educators and students communicate, <br/>save time, and stay organized.</p>
          </div>

          {
            isAuthenticated ?
              <div className='bg-[#fff] 3xl:py-[3.125vw] 2xl:py-[3.125vw] xl:py-[60px] py-[60px] 3xl:px-[5.208vw] 2xl:px-[5.208vw] xl:px-[100px] px-[100px] rounded-b-lg text-center'>
                <p className="text-[#344054] 3xl:text-[1.042vw] xl:text-[20px] lg:text-[20px] text-[18px] font-normal 2xl:mb-[1.667vw] xl:mb-[32px] mb-[32px]">
                  Hi {userDetails?.name}, <br />Welcome to Google Classroom</p>
                <div className='flex items-center'>
                  <Link href='/manageclass/myclasses' className="flex items-center gap-2 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-normal border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[0.938vw] px-[18px] xl:py-[0.521vw] py-[10px] justify-center w-full">
                    Sync Google Classroom
                  </Link>
                  {/* <div className='3xl:text-[0.833vw] 2xl:text-[16px] text-[16px] text-[#667085] font-normal px-[1.25vw]'>or</div>
                  <Link href='' className="flex items-center gap-2 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#fff] font-normal border border-[#1570EF] bg-[#1570EF] rounded-lg xl:px-[0.938vw] px-[18px] xl:py-[0.521vw] py-[10px] justify-center w-full">
                    Roster Automation
                  </Link> */}
                </div>


              </div> :

              <div onClick={onGoogleUpload} className='bg-[#fff] 3xl:py-[3.125vw] 2xl:py-[3.125vw] xl:py-[60px] py-[60px] 3xl:px-[5.729vw] 2xl:px-[5.729vw] xl:px-[110px] px-[110px] rounded-b-lg text-center'>
                <Link href='' className="flex items-center gap-2 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#101828] font-semibold border border-[#E8F0F3] bg-[#FFF] rounded-lg xl:px-[1.04vw] px-[16px] xl:py-[0.573vw] py-[11px] justify-center w-full shadow1">
                  <Image className="xl:w-[20px] xl:h-[20px] " width="20" height="20" src="/images/google_logo.svg" alt="google_img" /> Sign in with Google
                </Link>
                <p className="text-[#667085] 3xl:text-[0.733vw] xl:text-[15px] lg:text-[15px] text-[14px] font-light mt-[24px] leading-tight">
                  By joining, you agree to share contact information <br />with people in your class.</p>
              </div>
          }

        </div>
      </div>

    </Layout>
  )
}
