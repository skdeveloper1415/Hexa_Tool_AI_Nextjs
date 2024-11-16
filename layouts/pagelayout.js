"use client";
import Head from "next/head";
import { Inter } from 'next/font/google'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Top from "../layouts/top";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const myInter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: "swap",
})



export default function Layout({ children, ...pageProps }) {
  const [topShow, setTopShow] = useState(true);
  const pathname = usePathname();

  // useEffect(() => {
  //   if(pathname.includes('/dashboard') ){
  //     setTopShow(false);
  //   } else {
  //     setTopShow(true);
  //   }
  // }, [])
  
  return (
    <>
      <Head>
        <title>{pageProps.pageTitle ? pageProps.pageTitle : "Loading..."} | Hexa Tool</title>
        <meta name="description" content={pageProps.description ? pageProps.description : ""} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <>

      {topShow === true ? 
      <Top topTab={pageProps.topTab} pageTitle={pageProps.pageTitle} pageName={pageProps.pageName} parentPageName={pageProps.parentPageName} />         
      : null
      }

        {/* <Left /> */}
        <div className={`${myInter.className} pb-6 xl:pb-[1.25vw] pt-[110px] `}>
          <main>            
            {children}
          </main>
        </div>
      </>
    </>
  );
}
