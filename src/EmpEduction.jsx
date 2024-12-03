import { useEffect, useState } from "react"
import { DynamicFields ,DeleteEduPop, EditEduPop} from "./DynamicFields"
import { axiosRequest } from "./axiosRequest"



export const EmpEduction=({empDetails,handlePop,id})=>{
    const[dynamic,setDynamic]=useState(false)
    const[eduDetails,setDetails]=useState([])
    const[Details,setOneDetail]=useState([])
    const[deletePop,setDeletePop]=useState(false)
    const[editPop,setEditPop]=useState(false)
    useEffect(()=>{
        const fetchEducation=async()=>{
            await axiosRequest("GET",`http://localhost:4000/api/edu/${id}`).then((res)=>{
                setDetails(res)
            })
        }
        fetchEducation()
    },[Details])

    const fetchOneDetails=async(eid)=>{
        await axiosRequest("GET",`http://localhost:4000/api/edu/one/${eid}`).then((res)=>{
            setOneDetail(res)
        })
    }
    
    return(
        <>
          <div className="h-screen w-screen before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:-z-10 isolate before:inset-0 before:opacity-30 absolute top-0 left-0 flex justify-center items-center">
            <div className="bg-white w-1/2 p-14 relative">
               <div className=" flex justify-between items-center">
               <h6>Name: <span>{empDetails.name}</span></h6>
               {
                Array.isArray(eduDetails) && eduDetails.length!==4 && <button onClick={()=>setDynamic(true)} className=" border-[1px] px-5 py-2 hover:bg-black hover:text-white"><i class="fa-solid fa-plus"></i></button>
               }
               </div>
                <table className="w-full">
                    <thead>
                        <tr className="h-14 bg-gray-300 text-center">
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Degree</th>
                            <th>Institute Name</th>
                            <th>Passout Year</th>
                            <th>CGPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(eduDetails) && eduDetails.length!==0 ?
                            eduDetails.map((item,i)=>{
                                return <tr className="text-center h-14 relative " key={i}>
                                <td>{item.id}</td>
                                <td>{item.course}</td>
                                <td>{item.degree}</td>
                                <td>{item.institute}</td>
                                <td>{item.cyear}</td>
                                <td>{item.cgpa}</td>
                                <td>
                                    <div className="flex justify-center gap-3 items-center">
                                        <button onClick={async(e)=>{
                                            e.stopPropagation()
                                            await fetchOneDetails(item.id)
                                            setEditPop(true)
                                        }}><i className="fa-solid fa-pen"></i></button>
                                        <button onClick={async(e)=>{
                                            e.stopPropagation()
                                            await fetchOneDetails(item.id)
                                            setDeletePop(true)
                                        }} ><i className="fa-solid fa-xmark text-xl"></i></button>
                                    </div>
                                </td>
                            </tr>
                            }) : <tr className="text-center h-14"><td colSpan={6}>No Data</td></tr>
                        }
                    </tbody>
                </table>
               
                <div className="absolute top-1 right-5 text-rose-400 text-2xl" onClick={()=>handlePop(false)}><i className="fa-solid fa-xmark"></i></div>
                
            </div>
            {
                dynamic && <DynamicFields handlePop={setDynamic} id={empDetails.id} details={eduDetails} set={setOneDetail}/>
            }
            {
                deletePop && <DeleteEduPop data={Details} handlePop={setDeletePop} set={setOneDetail}/>
            }
            {
                editPop && <EditEduPop handlePop={setEditPop} data={Details} set={setOneDetail}/>
            }
          </div>
          
        </>
    )
    
}