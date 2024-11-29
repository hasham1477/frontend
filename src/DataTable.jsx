import { useState } from "react"
import { DeletePop, EditPopUp } from "./Popup"
import { axiosRequest } from "./axiosRequest"


export const DataTable=({data})=>{
    const[editPop,setEditPop]=useState(false)
    const[addPop,setAddPop]=useState(false)
    const[delPop,setDelPop]=useState(false)
    const[EmpData,setEmpData]=useState({})
    const handleEdit = async (id) => {
        try {
            const res = await axiosRequest('GET', `http://localhost:4000/api/emp/${id}`);
            setEmpData(res[0]); 
        } catch (error) {
            console.error("Error fetching employee data", error);
        }
    };
   
    
    return(
        <>
            <div className="w-[75%] mx-[auto]">
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
                        Array.isArray(data) && data.length!=0 
                        ? data.map((details,index)=>{
                            return <tr key={index} className="text-center h-14">
                                <td>{details.id}</td>
                                <td>{details.name}</td>
                                <td>{details.username}</td>
                                <td>{details.email}</td>
                                <td>{details.mobile}</td>
                                <td>{details.location}</td>
                                <td>{details.gender}</td>
                                <td>
                                    <div className=" flex gap-4 items-center justify-center">
                                        <button onClick={async()=>{
                                            await handleEdit(details.id)
                                            setEditPop(true)
                                        }} className="text-green-200 text-xl"><i class="fa-solid fa-pen"></i></button>
                                        <button className="text-rose-400 text-2xl" onClick={async()=>{
                                            await handleEdit(details.id)
                                            setDelPop(true)
                                        }}><i class="fa-solid fa-xmark"></i></button>
                                    </div>
                                </td>
                            </tr>
                        }): <tr><td>No Data Found</td></tr>
                    }
                    </tbody>
                </table>
            </div>
            {
                editPop && <EditPopUp formType="edit" handlePop={setEditPop} empDetails={EmpData}/>
            }
            {
                addPop && <EditPopUp handlePop={setAddPop}/>
            }
            {
                delPop && <DeletePop empDetails={EmpData} handlePop={setDelPop}/>
            }
        </>
    )
}