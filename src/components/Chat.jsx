import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { auth, db } from "../config/firebase";
import { getDocs, collection} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Chat() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const userCollection = collection(db, "users");
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleConversationStart = async (selectedUser) => {
    try {
      if (currentUser) {
        const participants = [currentUser.uid, selectedUser.id];
        participants.sort();
        const conversationID = participants.join("-");
        navigate(`/Msg`, {
          state: {
            conversationID: conversationID,
            name: selectedUser.Name,
            photo: selectedUser.Profile,
            currentUserID: currentUser.uid,
          },
        });
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  const getUsers = async () => {
    try {
      const data = await getDocs(userCollection);
      const filterData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((user) => user.id !== currentUser?.uid);
      setUsers(filterData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getUsers();
    }
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

  if (!currentUser) {
    return <div></div>;
  }
  return (
    <div className="h-full w-full lg:w-[700px] lg:h-[90%] lg:rounded-xl bg-[#292F3F] text-[#F7F7F7] flex flex-col">
      <div className="flex justify-between p-4 my-5 lg:p-3">
        <p className=" font-bold text-4xl md:text-5xl md:ml-10 ">Messages</p>
        <button className=" md:mr-10">
          <AiOutlineSearch className="w-7 h-7 lg:w-8 lg:h-8" />
        </button>
      </div>
      <div className=" bg-[#373E4E] flex-1 rounded-xl  lg:rounded-xl overflow-y-scroll no-scrollbar">
        <ul className="p-3">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                handleConversationStart(user);
              }}
              className="flex items-center gap-3 p-3 m-3 bg-[#1B222C26] rounded-3xl"
            >
              <img
                src={
                  user.Profile ||
                  "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                }
                className=" w-12 h-12 rounded-full"
              />
              <p className="font-medium md:text-xl">{user.Name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className=" flex justify-center items-center p-3">
        <button
          onClick={logout}
          className="bg-[#F04C4D] text-white  h-12  w-60 xl:w-80 rounded-3xl shadow-md font-medium flex gap-2 justify-center items-center"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Chat;
