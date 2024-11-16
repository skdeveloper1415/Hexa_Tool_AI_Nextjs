import axios from 'axios';
import https from 'https';
import { cookies } from 'next/headers'
import { toast } from 'react-toastify';
import ClientComponent from './clientComponent';
 
async function getUserList(authToken,user_id) {
    try {
      
        if(!authToken){
            return
        }

        const payload = {
            accessToken: authToken?.value,
            status: "All",
            searchTxt:'',
            userId: user_id?.value
        }
        
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_CLASSROOM_URL}classroom/class-room-api`,                
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken?.value}`                    
              },
              httpsAgent: new https.Agent({rejectUnauthorized: false
              })
            }
          );
        if (response?.data?.code == 200) {
          return {
            userData: response?.data?.data?.data,
            error: null
    };
        } else {
            return {
                userData:[],
                error: "Something went wrong"
        };
         
        }
      } catch (error) {
        return {
            userData:[],
            error: `${error.message}`
    };
      }
}
 
const MyPage = async (searchParams) => {  
  try{
    const cookieStore = cookies()
    let authToken = cookieStore.get('access_token');
    let user_id = cookieStore.get('user_id');
    const { userData, error } = await getUserList(authToken,user_id);

    if(userData){
      return (
        <div>
          <ClientComponent userData={userData} error={error} />
        </div>
      );
    }else{
      localStorage.clear();
      window.location.href = "/";
      toast.error("Session Expired")
    }
  
  }
 catch (error) {
}
 
};
 
export default MyPage;