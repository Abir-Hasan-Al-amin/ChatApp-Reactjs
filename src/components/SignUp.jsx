import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const onclickHandle = () => {
    if (password === conPassword && userName.trim() !=="") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            Name: userName,
            Email: email,
            Profile : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
          };
          const userDocRef = doc(collection(db, "users"), user.uid);
          setDoc(userDocRef, userData)
            .then(() => {
              return signOut(auth);
            })
            .then(() => {
              setEmail("");
              setPassword("");
              setUserName("");
              setConPassword("");
              alert("Register Completed");
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
              console.error("Error code:", error.code);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (error.code === "auth/email-already-in-use") {
            alert("User already exists");
          } else{
            console.error("Error adding document: ", errorCode,errorMessage);
          }
        });
    } else {
      alert("password Doesn't match or Name is Empty");
    }
  };
  return (
    <div className=" bg-[#292F3F]  w-80 xl:w-[500px] text-[#F7F7F7] rounded-md shadow-md">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className=" text-4xl font-bold my-10">Chat App</h1>
        <input
          placeholder="User Name"
          type="text"
          className=" outline-none w-60 xl:w-80 h rounded-md p-2  bg-[#7A8194]"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="text"
          className=" outline-none w-60 xl:w-80 h rounded-md p-2  bg-[#7A8194]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" outline-none h-10 w-60 xl:w-80 rounded-md px-2  bg-[#7A8194]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          className=" outline-none h-10 w-60 xl:w-80 rounded-md px-2  bg-[#7A8194]"
          value={conPassword}
          onChange={(e) => setConPassword(e.target.value)}
        />
        <button
          onClick={onclickHandle}
          className=" bg-[#289BD5]  h-11  w-60 xl:w-80 rounded-2xl shadow-md font-medium"
        >
          Sign Up
        </button>
        <p className=" text-sm mb-8">
          Already have an account?{" "}
          <span
            className="font-bold cursor-pointer text-[#289BD5]"
            onClick={() => navigate("/")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
