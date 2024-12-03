import { useEffect, useState } from "react"
import { DeletePop, EditPopUp } from "./Popup"
import { axiosRequest } from "./axiosRequest"
import { EmpEduction } from "./EmpEduction"


export const DataTable=()=>{
    const[editPop,setEditPop]=useState(false)
    const[addPop,setAddPop]=useState(false)
    const[delPop,setDelPop]=useState(false)
    const[EmpData,setEmpData]=useState({})
    const[eduPop,setEdupop]=useState(false)
    const[UserId,setUserId]=useState(null)
    const handleEdit = async (id) => {
        try {
            const res = await axiosRequest('GET', `http://localhost:4000/api/emp/${id}`);
            setEmpData(res[0]); 
        } catch (error) {
            console.error("Error fetching employee data", error);
        }
    };
    const[empDetails,setEmpDetails]=useState([]);
    const[oneData,setOneData]=useState({})
    useEffect(()=>{
        console.log("calledd.........")
        const fetch=async()=>{
            await axiosRequest('GET',"http://localhost:4000/api/allEmp").then((res)=>{
                setEmpDetails(res);
            }).catch((err)=>{
                console.log(err.message)
            })
        }
        fetch()
        
    },[oneData])

    
    
    return(
        <>
            <div className="w-[75%] mx-[auto] mt-14">
                <div>
                    <button className="border-[1px] px-3 py-2 hover:bg-black hover:text-white" onClick={()=>setAddPop(true)}>ADD <i class="fa-solid fa-plus"></i></button>
                </div>
                <table className="w-full">
                    <thead>
                    <tr className="text-center h-12 bg-gray-300">
                        <th>id</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Location</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(empDetails) && empDetails.length!==0 
                        ? empDetails.map((details,index)=>{
                            return <tr key={index} className="text-center h-14" onClick={async()=>{
                                await handleEdit(details.id)
                                setUserId(details.id)
                                setEdupop(true)
                            }}>
                                <td>{details.id}</td>
                                <td>{details.name}</td>
                                <td>{details.username}</td>
                                <td>{details.email}</td>
                                <td>{details.mobile}</td>
                                <td>{details.location}</td>
                                <td>{details.gender}</td>
                                <td>
                                    <div className=" flex gap-4 items-center justify-center">
                                        <button onClick={async(e)=>{
                                             e.stopPropagation()
                                            await handleEdit(details.id)
                                            setEditPop(true)
                                        }} className="text-green-200 text-xl"><i className="fa-solid fa-pen"></i></button>
                                        <button className="text-rose-400 text-2xl" onClick={async(e)=>{
                                             e.stopPropagation()
                                            await handleEdit(details.id)
                                            setDelPop(true)
                                        }}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </td>
                            </tr>
                        }): <tr><td>No Data Found</td></tr>
                    }
                    </tbody>
                </table>
            </div>
            {
                editPop && <EditPopUp formType="edit" handlePop={setEditPop} set={setOneData} empDetails={EmpData}/>
            }
            {
                addPop && <EditPopUp handlePop={setAddPop} set={setOneData}/>
            }
            {
                delPop && <DeletePop empDetails={EmpData} set={setOneData} handlePop={setDelPop}/>
            }
            {
                eduPop && <EmpEduction empDetails={EmpData} handlePop={setEdupop} id={UserId}/>
            }
        </>
    )
}

export default DataTable