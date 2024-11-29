import axios from "axios";
import { useEffect, useState } from "react";
import { axiosRequest } from "./axiosRequest";
import { DataTable } from "./DataTable";


const UserData=()=>{

    const[empDetails,setEmpDetails]=useState([]);

    useEffect(()=>{
        const fetch=async()=>{
            await axiosRequest('GET',"http://localhost:4000/api/allEmp").then((res)=>{
                setEmpDetails(res);
            }).catch((err)=>{
                console.log(err.message)
            })
        }
        fetch()
        
    },[])
    
   

    return(
        <>  
        <div>
        <DataTable data={empDetails}/>
        </div>
            
        </>
    )
}


export default UserData;