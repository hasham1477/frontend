import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Maps from "./Maps"
import UserData from "./UserData";

const User=()=>{
    const navigate=useNavigate();
    const[data,setData]=useState(null);
    const handleLog=()=>{
        localStorage.removeItem("token")
        navigate("/login",{replace:true})
    }
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
        {
            data && <>
                <h1>{data.name}</h1>
                <h1>{data.username}</h1>
                <button className="border-2 px-3 py-1 mb-3" onClick={handleLog}>Logout</button>
            </>
            
        }
        <UserData/>

        </>
    )
}

export default User;