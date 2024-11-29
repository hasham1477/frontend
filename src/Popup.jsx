import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { axiosRequest } from "./axiosRequest";

export const EditPopUp=({formType,handlePop,empDetails})=>{
    
    const{register,handleSubmit,setValue,formState:{errors,isDirty}}=useForm({defaultValues:empDetails});
    const[loading,setLoading]=useState(false)
    const submitForm = async (data) => {
        setLoading(true);
        try {
          const url = formType === "edit" 
            ? `http://localhost:4000/api/updateEmp/${data.id}` 
            : "http://localhost:4000/api/addEmp";
    
          const method = formType === "edit" ? "PUT" : "POST";
          const res = await axiosRequest(method, url, data);
          alert(res);
          handlePop(false);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    
  
    return(
        <>
        <div className="h-screen w-screen before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:-z-10 isolate before:inset-0 before:opacity-30 absolute top-0 left-0 flex justify-center items-center">
            <form action="" onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4 w-1/3 bg-white px-5 py-5 relative">
               
                <div className="relative">
                <input className="border-[1px] w-full border-black px-3 py-2  focus:outline-none" type="text" {...register("name",{required:{message:"Enter Name",value:true}})} placeholder="Enter FullName"/>
                {errors.name && <p className="text-red-500 text-[0.8rem] absolute bottom-[-20]">{errors.name.message}</p>}
                </div>
                <div className="relative">
                <input className="border-[1px] w-full border-black px-3 py-2 focus:outline-none" type="text" {...register("username",{required:{message:"Enter UserName",value:true}})} placeholder="Enter UserName"/>
                {errors.username && <p className="text-red-500 text-[0.8rem] absolute bottom-[-20]">{errors.username.message}</p>}
                </div>
                <div className="relative">
                <input className="border-[1px] w-full border-black px-3 py-2 focus:outline-none" type="email" {...register("email",{required:{message:"Enter Email",value:true}})} placeholder="Enter Email"/>
                {errors.email && <p className="text-red-500 text-[0.8rem] absolute bottom-[-20]">{errors.email.message}</p>}
                </div>
                <div className="relative">
                <input className="border-[1px] w-full border-black px-3 py-2 focus:outline-none" type="number" {...register("mobile",{required:{message:"Enter Mobile Number",value:true},maxLength:{message:"max length 10",value:10},minLength:{message:"min length 10",value:10}})} placeholder="Enter Mobile No"/>
                {errors.mobile && <p className="text-red-500 text-[0.8rem] absolute bottom-[-20]">{errors.mobile.message}</p>}
                </div>
                <div className="flex flex-col relative">
                <label htmlFor="">Select Location</label>
                <select className="border-[1px] border-black px-2 py-2 focus:outline-none" name="" id=""{...register("location",{required:{message:"Select Location",value:true}})}>
                    <option value="">Select...</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Guntur">Guntur</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Goa">Goa</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Mumbai">Mumbai</option>
                </select>
                {errors.location && <p className="text-red-500 text-[0.8rem] absolute bottom-[-40px]">{errors.location.message}</p>}
                </div>
                <div className=" relative">
                    <div>
                    <input type="radio" value="Male" id="m"{...register("gender",{required:{message:"please Select Gender",value:true}})} /> <label htmlFor="m">Male</label>
                    </div>
                    <div>
                    <input type="radio" value="Female" id="f"{...register("gender",{required:{message:"please Select Gender",value:true}})} /> <label htmlFor="f">Female</label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-[0.8rem] absolute bottom-[-20]">{errors.gender.message}</p>}
                </div>
               {
                formType==="edit"?
                <div>
                <button type="submit" className="w-full border-2 py-2 text-xl font-semibold">Save</button>
            </div>:
                <div>
                    <button type="submit" className="w-full border-2 py-2 text-xl font-semibold">{loading ? "Adding...": "Add Details"}</button>
                </div>
               }


                <div className="absolute top-1 right-5 text-rose-400 text-2xl" onClick={()=>handlePop((p)=>!p)}><i class="fa-solid fa-xmark"></i></div>
            </form>
        </div>
        </>
    )
}


export const DeletePop=({empDetails,handlePop})=>{
    
    const handeldelEmp = async () => {
        
        if (!empDetails || !empDetails.id) {
          console.error("Invalid employee details");
          return; 
        }
    
        try {
          
          await axiosRequest("DELETE", `http://localhost:4000/api/del/${empDetails.id}`);
          handlePop(false); 
        } catch (error) {
          console.error("Error deleting employee", error);
        }
      };
    return(
        <>
          <div className="h-screen w-screen before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:-z-10 isolate before:inset-0 before:opacity-30 absolute top-0 left-0 flex justify-center items-center">
             <div className="w-1/3 px-14 py-6 bg-white">
                <h6>Are You Sure to Delete</h6>
                {
                    empDetails && <div>
                        <p>{empDetails.name}</p>
                    </div>
                }
                <div>
                <button className="px-5 py-2 border-[1px] pr-4" onClick={()=>handlePop(false)}>Cancel</button>
                <button className="px-5 py-2 bg-red-400" onClick={()=>handeldelEmp()}>Delete</button>
             </div>
             </div>
             
          </div>
        </>
    )
}