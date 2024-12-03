import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Maps from "./Maps"

import  {DynamicFields } from "./DynamicFields";
import  DataTable  from "./DataTable";

const User=()=>{
    const navigate=useNavigate();
    const[data,setData]=useState(null);
   
    useEffect(()=>{
        const getData=()=>{
            axios.get("http://localhost:4000/api/auth/user",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }).then((res)=>{
                setData(res.data)
            }).catch((err)=>{
                console.log(err.message)
            })
        }
        getData()
    },[])
    
    return(
        <>
        <DataTable/>
       
        </>
    )
}

export default User;