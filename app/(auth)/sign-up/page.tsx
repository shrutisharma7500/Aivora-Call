import {SignUpView } from "@/app/modules/auth/ui/views/sign-up-view";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
const page=async ()=>{
    const session=await auth.api.getSession({
          headers: await headers(),
          });
        
          if(!!session){
            redirect('/')
          }
    console.log("Sign up Page");
  
    return(

       
               <SignUpView/>
                
    )
};
export default page;