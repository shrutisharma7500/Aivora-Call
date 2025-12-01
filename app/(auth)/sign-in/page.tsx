import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {SignInView} from "@/app/modules/auth/ui/views/sign-in-view";
const page= async()=>{
    const session=await auth.api.getSession({
      headers: await headers(),
      });
    
      if(!!session){
        redirect('/')
      }
    console.log("Sign In Page");
    return(
       
                <SignInView/>
                
    )
};
export default page;