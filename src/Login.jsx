import {useForm} from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate()
    const{register,handleSubmit,formState:{errors}}=useForm();

    const SubmitForm=async(data)=>{
        try {
            axios.post("http://localhost:4000/api/auth/login",data).then((res)=>{
                if(res.status===200){
                    localStorage.setItem("token",res.data.token)
                    navigate("/",{replace:true})
                }
            }).catch((err)=>alert(err.response.data.message))
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <>
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[25%] border-2 py-10 px-5">
            <h5 className="text-center mb-3">User Login</h5>
            <form className="w-full flex flex-col space-y-3" action="" onSubmit={handleSubmit(SubmitForm)}>
                <input className={`border-2 px-3 py-2 focus:outline-none ${errors.username && 'border-red-400'}`} placeholder="Enter UserName" type="text" {...register("username",{required:{message:"Enter Username",value:true}})}/>
                <input className={`border-2 px-3 py-2 focus:outline-none ${errors.password && 'border-red-400'}`} placeholder="Enter Password" type="password" {...register("password",{required:{message:"Enter Password",value:true}})}/>
                <button className="border-2 before:content-[' '] before:w-full before:-z-10  before:h-full relative before:absolute before:top-0 before:-left-full hover:before:left-0 overflow-hidden before:transition-all before:duration-500 before:bg-green-100 py-2 font-bold text-xl" type="submit">Login</button>
            </form>
        </div>
        </div>
        </>
    )
}


export default Login;