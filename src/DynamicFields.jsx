import {useFieldArray,useForm} from "react-hook-form"
import { axiosRequest } from "./axiosRequest"
import { useState } from "react"
export const DynamicFields=({handlePop,id,set,details})=>{
    const[count,setCount]=useState(details.length+1);
    const[selected,setSelected]=useState(details)
    const[bbb,setBB]=useState([])
    const{register,control,formState:{errors,isDirty},handleSubmit,watch,setValue}=useForm({
        defaultValues:{education:[{emp_id:id}] ,mode: "onChange",}
    })
    const{fields,append,remove}=useFieldArray({control,name:"education"})

    const submitForm=async(data)=>{
        try {
            await axiosRequest("POST","http://localhost:4000/api/edu/add",data.education).then(res=>{
                set(data)
                handlePop(false)
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    const courseDetails={
        Graduation:"Graduation",
        PostGraduation:"PostGraduation",
        Intermediate:"Intermediate",
        SSC:"10TH"
    }
    
    const co=selected.map((ii)=>ii.course);
    const bb=Object.values(courseDetails).filter((ii)=>!co.includes(ii))
    
   
    
    return(
        <>
        <div className="h-screen w-screen before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:-z-10 isolate before:inset-0 before:opacity-30 absolute top-0 left-0 flex justify-center items-center">
            <div className="bg-white w-1/3">
            <div className="flex justify-end gap-5 pr-10 pt-1">
                {
                    Array.isArray(details) && details.length!==4 && <button type="button" onClick={()=>{
                        
                       
                        if(count!==4){
                            append({emp_id:id});
                            setCount((p)=>p+1);
                        }
                    } }disabled={Object.keys(errors).length > 0}>Add</button>
                }
                    
                    <button type="button" onClick={()=>handlePop((p)=>!p)}><i className="fa-solid fa-xmark text-xl"></i></button>
            </div>
            <form action="" className="w-full " onSubmit={handleSubmit(submitForm)}>
                {
                    fields.map((item,i)=>{
                       console.log(fields)
                        return <div className=" flex w-full px-5 py-4  gap-3" key={item.id}>
                            <div className="flex flex-col w-full space-y-3">
                            <div className="w-full flex">
                            <select  name="" id=""{...register(`education.${i}.course`,{required:{message:"Please Select",value:true}})} className=" py-1 border-[1px] border-black  w-full">
                                <option value="">Select..</option>
                                {
                                    bb.map((ccd,i)=>(
                                        <option value={ccd} key={i}>{ccd}</option>
                                    ))
                                }
                            </select>
                            {
                                watch(`education.${i}.course`)==="Graduation" && <select className=" py-1 border-[1px] border-black  w-full" name="" id=""{...register(`education.${i}.degree`,{required:{message:"Please Select",value:true}})}>
                                <option value="">Select..</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="B.Com">B.Com</option>
                                <option value="B.Sc">B.Sc</option>
                            </select>
                            }
                            </div>
                            
                            <input placeholder="Enter Institute Name" type="text" className="px-2 py-1 border-[1px] border-black " {...register(`education.${i}.institute`,{required:{message:"Please Select",value:true}})} />
                            <input type="number" placeholder="Enter passout Year (2023)" className="px-2 py-1 border-[1px] border-black " {...register(`education.${i}.cyear`,{required:{message:"Please Select",value:true},maxLength:4,minLength:4})} />
                            <input type="number" placeholder="Enter CGPA (6.44)" className="px-2 py-1 border-[1px] border-black " {...register(`education.${i}.cgpa`,{required:{message:"Please Select",value:true}})} />
                            </div>
                            
                                
                                      <button type="button" onClick={()=>{i!==0 && remove(i) ;setCount((p)=>p-1)}} disabled={i===0}><i class="fa-solid fa-trash"></i></button>
                                
                            
                        </div>
                    })
                }
                <button type="submit" className="ml-12 mb-3 border-[1px] px-5 py-1">Submit</button>
            </form>
            </div>
        </div>
        </>
    )
}

export const EditEduPop=({data,handlePop,set})=>{
    
    const{register,formState:{errors,isDirty},handleSubmit}=useForm({
        defaultValues:data[0]
    })
    console.log(isDirty)
    const submitForm=(dd)=>{
        axiosRequest("PUT",`http://localhost:4000/api/edu/update/${data[0].id}`,dd).then((res)=>{
            console.log(res);
            handlePop(false)
            set(dd)
        })
    }
    return(
        <>
        <div className="h-screen w-screen before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:-z-10 isolate before:inset-0 before:opacity-30 absolute top-0 left-0 flex justify-center items-center">
            <div className="bg-white w-1/3 relative p-5">
            
                <button onClick={()=>handlePop(false)} type="button" className="text-3xl text-red-400 absolute top-3 right-5"><i className="fa-solid fa-xmark text-xl"></i></button>
            
                <form action="" className="flex w-full flex-col" onSubmit={handleSubmit(submitForm)}>
                    <input className="py-2 px-4 border-[1px] focus:outline-none" type="text" {...register("course",{disabled:true})} />
                    <input className="py-2 px-4 border-[1px] focus:outline-none" type="text" {...register("institute",{required:true})} />
                    <input className="py-2 px-4 border-[1px] focus:outline-none" type="number" {...register("cyear",{required:true,maxLength:4,minLength:4})} />
                    <input className="py-2 px-4 border-[1px] focus:outline-none" type="number" {...register("cgpa",{required:true,pattern:{message:"cgpa should be in floating number",value:/^[0-9](\.\d{1,2})?$/}})} />
                    <button type="submit" className={`w-full border-2 py-2 text-xl font-semibold opacity-40 ${isDirty && 'bg-black text-white opacity-100'}`} disabled={!isDirty}>Save</button>
                </form>
            </div>
        </div>
        </>
    )

}

export const DeleteEduPop=({data,handlePop,set})=>{
    
    const handelDelete=()=>{
        axiosRequest("DELETE",`http://localhost:4000/api/edu/del/${data[0].id}`).then((res)=>{
            console.log(res)
            handlePop(false)
            set({});
        })
    }

    return (
        <>
            <div className="h-screen w-screen before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:-z-10 isolate before:inset-0 before:opacity-30 absolute top-0 left-0 flex justify-center items-center">
                <div className="w-1/3 bg-white p-5">
                    <p>Are You Sure Want To Delete ?</p>
                    <p>{data[0].course}</p>
                    <p>{data[0].institute}</p>
                    <div>
                        <button onClick={()=>handlePop(false)}>Cancel</button>
                        <button onClick={handelDelete} className="bg-red-400 px-4 py-1">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}