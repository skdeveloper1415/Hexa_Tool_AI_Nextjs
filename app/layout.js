
import ExampleClientComponent from "../components/ExampleClientComponent";
import "../styles/globals.css";
import "../styles/common.css";
import "../styles/systyle.css";
import 'primeicons/primeicons.css';
import { ToastContainer } from "react-toastify";       


export const metadata = {
  title: "K12Brix.ai",
  description: "Welcome to K12Stag",
  icons: {
    icon: [{ url: "/hexa-favicon.png" }],
  },
};


export default function RootLayout({ children }) {
  return (
    <>
      <ExampleClientComponent>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </ExampleClientComponent>
    </>
  )
}
