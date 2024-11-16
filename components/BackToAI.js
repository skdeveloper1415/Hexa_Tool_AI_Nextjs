import Image from "next/image";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { cancelPendingRequests } from "../app/actions";

export default function BackToAI({ isGenerate }) {

    const router = useRouter();

    const handleConfirmation = () => {
        Swal.fire({
          title: '<span class="text-lg">Are you sure, You want to Go Back?</span>',
          text: 'If You Select Yes then data will be loss.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor:"Orange",
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
              router.push("/");
              cancelPendingRequests()
          }
        });
      };


    return (
        <div className="xl:col-span-2 lg:col-span-2 col-span-12">
            <button
                onClick={()=>{
                    if(isGenerate){
                        handleConfirmation();
                    }else{
                        router.push("/aiapps");
                    }
                }}
                className="flex items-center 3xl:text-[0.833vw] 2xl:text-[16px] text-[14px] text-[#1B55AF] font-medium border border-[#1B55AF] rounded-lg xl:px-[1.04vw] px-[16px] lg:px-[10px] xl:py-[0.573vw] py-[11px] justify-center"
            >
                <Image
                    width="20"
                    height="20"
                    className="mr-[8px]"
                    src="/images/left-double-arrow.svg"
                    alt="Arrow"
                />
                Back to AI Apps
            </button>
        </div>
    );
}