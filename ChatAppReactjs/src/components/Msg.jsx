import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { db } from "../config/firebase";
function Msg() {
  const location = useLocation();
  const { conversationID, name, photo, currentUserID,currentUserName } = location.state || {};
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    let unsubscribe;

    const fetchMessages = async () => {
      try {
        const conversationRef = collection(
          db,
          "conversations",
          conversationID,
          "messages"
        );
        const q = query(conversationRef, orderBy("timestamp"));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setMessages(data);
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    };

    fetchMessages();
  }, [conversationID]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        const conversationRef = collection(
          db,
          "conversations",
          conversationID,
          "messages"
        );
        await addDoc(conversationRef, {
          uid: currentUserID,
          msg: newMessage,
          timestamp: new Date().getTime(),
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  return (
    <div className="h-full w-full lg:w-[700px] lg:h-[90%] lg:rounded-xl bg-[#ABBCEA] flex flex-col">
      <div className="flex p-4 my-5 lg:p-3 gap-5 h-[10%]">
        <img src={photo} className="md:ml-10 w-12 h-12 rounded-full" />
        <p className=" font-medium text-3xl md:text-4xl ">{name}</p>
      </div>
      <div className=" rounded-t-xl  lg:rounded-xl flex flex-col h-[85%]">
        <div className=" bg-[#FFFFFF] rounded-t-xl h-[100%] overflow-y-scroll">
          {messages.length > 0 ? (
            <ul className="p-3">
              {messages.map((msg) => {
                return (
                  <li
                    key={msg.id}
                    className={`p-3 m-3 rounded-2xl ${
                      currentUserID === msg.uid ? "bg-[#CBF1F5]" : "bg-[#FBECB2]"
                    }`}
                  >
                    <p className={`font-medium md:text-xl ${
                      currentUserID === msg.uid ? "text-end" : "text-start"
                    }`}>{msg.msg}</p>
                    <p className={`${
                      currentUserID === msg.uid ? "text-end" : "text-start"
                    }  text-xs `}>{currentUserID === msg.uid ? "" : name}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p></p>
          )}
        </div>
        <div className=" flex items-center p-3 bg-[#8EACCD]  lg:rounded-b-xl justify-around">
          <input
            className="font-medium md:text-xl w-[80%] h-10 rounded-full outline-none p-3 shadow-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>
            <BsSend className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Msg;
