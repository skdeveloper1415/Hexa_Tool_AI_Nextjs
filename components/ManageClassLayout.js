'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getDataFromLocalStorage } from "./helper/commonFunction";

export default function ManagerClassAuthLayout({ children }) {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const checkTokenAndRedirect = async () => {
            if (typeof window !== 'undefined') { 
                const token = getDataFromLocalStorage('access_token');
                if (!token) {
                    if (pathName !== '/manageclass') {
                        router.push('/manageclass');
                    }
                }
            }
        };

        checkTokenAndRedirect();
    }, [router, pathName]);

    return (
        <>
            {children}
        </>
    );
}