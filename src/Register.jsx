

const Register =()=>{


    return (
        <>
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[25%] border-2 py-10 px-5">
            <h5 className="text-center mb-3">User Login</h5>
            <form className="w-full flex flex-col space-y-3" action="" onSubmit={handleSubmit(SubmitForm)}>
                <input className={`border-2 px-3 py-2 focus:outline-none ${errors.name && 'border-red-400'}`} placeholder="Enter FullName" type="text" {...register("username",{required:{message:"Enter Username",value:true}})}/>
                <input className={`border-2 px-3 py-2 focus:outline-none ${errors.username && 'border-red-400'}`} placeholder="Enter Password" type="password" {...register("password",{required:{message:"Enter Password",value:true}})}/>
                <input className={`border-2 px-3 py-2 focus:outline-none ${errors.email && 'border-red-400'}`} placeholder="Enter Password" type="password" {...register("password",{required:{message:"Enter Password",value:true}})}/>
                <input className={`border-2 px-3 py-2 focus:outline-none ${errors.password && 'border-red-400'}`} placeholder="Enter Password" type="password" {...register("password",{required:{message:"Enter Password",value:true}})}/>
                <input className="border-2 bg-green-200 py-2 font-bold text-xl" type="submit" value="Login" />
            </form>
        </div>
        </div>
        </>
    )
}