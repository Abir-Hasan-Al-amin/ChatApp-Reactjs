import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { auth, db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Chat() {
  const [users, setUsers] = useState([]);
  const userCollection = collection(db, "users");
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(userCollection);
        const filterData = data.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((user) => user.id !== currentUser.uid);
        setUsers(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [currentUser]);
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="h-full w-full lg:w-[700px] lg:h-[90%] lg:rounded-xl bg-[#ABBCEA] flex flex-col">
      <div className="flex justify-between p-4 my-5 lg:p-3">
        <p className=" font-bold text-4xl md:text-5xl md:ml-10 ">Messages</p>
        <button className=" md:mr-10">
          <AiOutlineSearch className="w-7 h-7 lg:w-8 lg:h-8" />
        </button>
      </div>
      <div className=" bg-[#A6E3E9] flex-1 rounded-xl  lg:rounded-xl overflow-hidden overflow-y-scroll">
        <ul className="p-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center gap-3 p-3 m-3 bg-[#CBF1F5] rounded-3xl"
            >
              <img src={user.Profile} className=" w-12 h-12 rounded-full" />
              <p className="font-medium md:text-xl">{user.Name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex justify-center items-center p-3">
        <button
          onClick={logout}
          className="bg-[#C70039] text-white  h-12  w-60 xl:w-80 rounded-3xl shadow-md font-medium flex gap-2 justify-center items-center"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Chat;
