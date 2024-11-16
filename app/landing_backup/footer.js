"use client";
import Link from "next/link";
import Image from "next/image";
import { Roboto } from "next/font/google";

const myRoboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Page() {
  return (
    <>
    <div className={`${myRoboto.className}`}>
      <div className="footer mt-[15px] lg:mt-[30px] xl:mt-[50px] 3xl:mt-[2.604vw]">
        <div className="bg-[#1B55AF] text-white px-[15px] lg:px-[30px] xl:px-[70px] 3xl:px-[3.646vw] py-[15px] lg:py-[23px] 3xl:py-[1.198vw]">
          <div className="lg:flex items-center justify-between">
            <div className="col">
              <div className="lg:flex items-center text-center lg:text-start space-y-[5px] lg:space-y-0 gap-[15px] lg:gap-[26px] 3xl:gap-[1.354vw] text-[14px] 3xl:text-[0.729vw]">
                <Link href={""} className="block">
                  Conditions of Use
                </Link>
                <Link href={""} className="block">
                  Privacy Notice
                </Link>
                <Link href={""} className="block">
                  @2014-2020, Innive Inc. Copyrighted
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="flex items-center justify-center lg:justify-end gap-[15px] lg:gap-[30px] xl:gap-[70px] 3xl:gap-[3.646vw] mt-3 lg:mt-0">
                <div className="col w-full lg:w-auto logo">
                  <Image
                    src={"images/landing/footer-logo.svg"}
                    className="mx-auto pl-[45px] lg:pl-0"
                    width={"174"}
                    height={"55"}
                    alt="footer logo"
                  />
                </div>
                <div className="col">
                  <Link
                    href={""}
                    className="inline-flex items-center justify-center text-[#2F2326] bg-[#F0F3F8] w-[30px] lg:w-[50px] 3xl:w-[2.604vw] h-[30px] lg:h-[50px] 3xl:h-[2.604vw] text-[16px] 3xl:text-[0.833vw] text-[#2F2326]"
                  >
                    <i className="hexatoolup-line-arrow"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
