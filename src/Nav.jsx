import { useNavigate } from "react-router-dom"



const Nav=()=>{
    const navigate=useNavigate()
    const handleLog=()=>{
        localStorage.removeItem("token")
        navigate("/login",{replace:true})
    }

    return(
        <>
        <div className="flex justify-between px-16 h-20 border-b-2 items-center">
            <h1 className=" font-bold text-[#fc8406]">J<span className="text-black">star</span></h1>
            <button onClick={handleLog} className="text-xl hover:text-[#fc8406] font-bold"><i class="fa-solid fa-power-off"></i></button>
        </div>
        </>
    )
}

export default Nav