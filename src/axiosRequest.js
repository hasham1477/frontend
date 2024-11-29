import axios from "axios"


export const axiosRequest=async(method,url,data=null)=>{
   try{
    const res= await axios({method,url,data})
    return res.data
   }catch(error){
    return error
   }
}