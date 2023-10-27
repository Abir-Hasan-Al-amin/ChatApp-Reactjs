import React, { useState } from 'react'
import google from '../assets/google.png'
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onclickHandle = () => {
    console.log(email, password);
  };
  return (
    <div className=" bg-[#ABBCEA]  w-80 xl:w-[500px]  rounded-md shadow-md">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className=" text-4xl font-bold my-10">Chat App</h1>
        <input
          placeholder='Email'
          type="text"
          className=" outline-none w-60 xl:w-80 h rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Password'
          className=" outline-none h-10 w-60 xl:w-80 rounded-md px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder='Confirm Password'
          type="password"
          className=" outline-none h-10 w-60 xl:w-80 rounded-md px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={onclickHandle}
          className=" bg-[#A6E3E9]  h-11  w-60 xl:w-80 rounded-2xl shadow-md font-medium"
        >
          Sign Up
        </button>
        <p className="font-bold">or</p>
        <button
          onClick={onclickHandle}
          className=" bg-[#A6E3E9]  h-12  w-60 xl:w-80 rounded-2xl shadow-md font-medium flex gap-2 justify-center items-center"
        >
        <img  src={google} className="w-6"/>
          Sign Up  with Google
        </button>
        <p className=" text-sm mb-8">Already have an account? <span className="font-bold cursor-pointer" onClick={()=>navigate("/")}>Sign In</span></p>
      </div>
    </div>
  )
}

export default SignUp