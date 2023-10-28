import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsUpload, BsSend } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { db } from "../config/firebase";
function Msg() {
  const location = useLocation();
  const { conversationID, name, photo, currentUserID } = location.state || {};
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState("");
  const fetchMessages = async () => {
    try {
      const conversationRef = collection(
        db,
        "conversations",
        conversationID,
        "messages"
      );
      const querySnapshot = await getDocs(conversationRef);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [conversationID]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        const conversationRef = collection(db, "conversations", conversationID, "messages");
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
      <div className="flex p-4 my-5 lg:p-3 gap-5">
        <img src={photo} className="md:ml-10 w-12 h-12 rounded-full" />
        <p className=" font-medium text-3xl md:text-4xl ">{name}</p>
      </div>
      <div className="flex-1 rounded-t-xl  lg:rounded-xl flex flex-col">
        <div className=" bg-[#FFFFFF] h-20 flex-1 rounded-t-xl">
          {messages.length > 0 ? (
            <ul className="p-3">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className="flex items-center w-min gap-3 p-3 m-3 bg-[#CBF1F5] rounded-2xl"
                >
                  <p className="font-medium md:text-xl">{msg.msg}</p>
                </li>
              ))}
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
