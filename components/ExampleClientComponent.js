
"use client"
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { msalConfig } from "../app/authConfig";
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const interFont = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
  });

const msalInstance = new PublicClientApplication(msalConfig);


export default function ExampleClientComponent({ children }) {
    const pathname = usePathname();
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ;

    useEffect(() => {
      if (pathname.includes('/dashboard')) {
        document.body.classList.add("dashboardcolor");
      } else {
        document.body.classList.remove("dashboardcolor");
      }
    }, [pathname]);

    return (
      <>
        <html lang="en">
       
          <body className={interFont.className}>
          <NextTopLoader
                color="#1570EF"
                initialPosition={0.3}
                crawlSpeed={200}
                height={3}
                crawl={true}
                easing="ease"
                speed={200}
                showSpinner={false}
                shadow="0 0 10px #1570EF,0 0 5px #1570EF"
                zIndex={100000}
              />
          <MsalProvider instance={msalInstance}>
            <GoogleOAuthProvider clientId={clientId}>
              
              {children}
            </GoogleOAuthProvider>
            </MsalProvider>
          </body>
        </html>
      </>
    );
  }