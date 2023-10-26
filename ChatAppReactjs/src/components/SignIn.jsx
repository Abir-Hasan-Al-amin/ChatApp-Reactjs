import React, { useState } from "react";
import google from '../assets/google.png'
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onclickHandle = () => {
    console.log(email, password);
  };
  const hi=()=>{
    console.log("h1");
  }
  return (
    <div className=" bg-[#CBF1F5] w-80  rounded-md shadow-md">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className=" text-4xl font-bold my-10">Chat App</h1>
        <input
          type="text"
          className=" outline-none w-60 h rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className=" outline-none h-8 w-60 rounded-md px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={onclickHandle}
          className=" bg-[#A6E3E9]  h-11  w-60 rounded-2xl shadow-md font-medium"
        >
          Sign In  
        </button>
        <p className="font-bold">or</p>
        <button
          onClick={onclickHandle}
          className=" bg-[#A6E3E9]  h-12  w-60 rounded-2xl shadow-md font-medium flex gap-2 justify-center items-center"
        >
        <img  src={google} className="w-6"/>
          Sign In  with Google
        </button>
        <p className=" text-sm mb-8">Don't have an account? <span className="font-bold cursor-pointer" onClick={hi}>Sign Up</span></p>
      </div>
    </div>
  );
}

export default SignIn;