import React, { useState } from "react";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, collection, getDocs, query, where, doc } from "firebase/firestore";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);
  const logIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/Chat");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          alert("User not found. Please check your email and Password.");
        } else {
          console.error(error.message);
        }
      });
  };
  const googleLogIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("Email", "==", user.email));
        getDocs(userQuery)
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              const userData = {
                Name: user.displayName,
                Email: user.email,
                Profile : user.photoURL,
              };
              const userDocRef = doc(userRef, user.uid);
              setDoc(userDocRef, userData)
                .then(() => {
                  navigate("/Chat");
                })
                .catch((error) => {
                  console.error("Error adding user: ", error);
                });
            } else {
              navigate("/Chat");
            }
          })
          .catch((error) => {
            console.error("Error checking user: ", error);
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <div className=" bg-[#292F3F]  w-80 xl:w-[500px] text-[#F7F7F7] rounded-md shadow-md">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className=" text-4xl font-bold my-10">Chat App</h1>
        <input
          type="text"
          placeholder="Email"
          className=" outline-none h-10 w-60 xl:w-80  bg-[#7A8194] rounded-md px-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" outline-none h-10 w-60 xl:w-80 rounded-md bg-[#7A8194] px-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={logIn}
          className="bg-[#289BD5]  h-12  w-60 xl:w-80 rounded-2xl shadow-md font-medium flex gap-2 justify-center items-center"
        >
          Sign In
        </button>
        <p className="font-bold">or</p>
        <button
          onClick={googleLogIn}
          className=" bg-[#1e5478]  h-12  w-60 xl:w-80 rounded-2xl shadow-md font-medium flex gap-2 justify-center items-center"
        >
          <img src={google} className="w-6" />
          Sign In with Google
        </button>
        <p className=" text-sm mb-8">
          Don't have an account?{" "}
          <span
            className="font-bold cursor-pointer text-[#289BD5]"
            onClick={() => navigate("/SignUp")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
