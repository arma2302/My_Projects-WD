import { Box, Button, Typography } from "@mui/material";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function ChatScreen() {
  const { uid } = useParams();
  const [currentUser, setCurrentUser] = useState();
  const [cid, setcid] = useState();
  const [chatUser, setChatuser] = useState();
  const [chatuserId, setChatuserid] = useState();
  const [newMessage, setChatMessage] = useState();
  const [allmsgs, setAllmsgs] = useState([]);
  const [dp, setDp] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDetails(user);
      }
    });
  }, []);
  useEffect(() => {
    fetchAllMessages();
  }, [cid, chatuserId]);

  const fetchUserDetails = async (user) => {
    const currentuserData = await getDoc(doc(db, "Data", user.uid));
    setCurrentUser(currentuserData.data().name);
    setcid(user.uid);

    const chatperson = await getDoc(doc(db, "Data", uid));
    setChatuser(chatperson.data().name);
    setDp(chatperson.data().profilepic);
    console.log("dataaaaaaaaaaaa", chatperson.data());
    setChatuserid(uid);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMessageObj = {
      senderId: cid,
      reciverId: chatuserId,
      content: newMessage,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "Chats"), newMessageObj);
    setChatMessage("");
  };

  const fetchAllMessages = async () => {
    if (!cid || !chatuserId) return;

    const q = query(collection(db, "Chats"));
    where("senderId", "in", [cid, chatuserId]);
    where("reciverId", "in", [cid, chatuserId]);
    where("timestamp", "asc");

    const querysnapshot = await getDocs(q);
    const fetchmessages = [];

    querysnapshot.forEach((msg) => {
      fetchmessages.push(msg.data());
    });
    setAllmsgs(fetchmessages);
    fetchAllMessages();
  };
  return (
    <div>
      <div className="chat-wrap">
        {/* <h2>{currentUser} You can start Messaging Now</h2> */}
        <Typography sx={{ margin: "15px" }}>{`${currentUser} You can Start Messaging ${chatUser} Now !!`}</Typography>
        <div class="chat-container">
          <div className="chat-user-profile">
            {dp ? <img src={dp}></img> : <img src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png" alt="" />}

            <p>Chat with {chatUser}</p>
          </div>
          <div class="chat-box">
            {allmsgs ? (
              allmsgs.map((msg, index) => {
                return (
                  <div key={index} className={msg.senderId == cid ? "from-me chat-message" : "from-them chat-message"}>
                    <span class="message">{msg.content}</span>
                  </div>
                );
              })
            ) : (
              <h1>No Msgs yet</h1>
            )}
            {/* <div class="chat-message from-them">
            <span class="message">Hey! How are you?</span>
          </div>
          <div class="chat-message from-me">
            <span class="message">Hi! I'm good, thanks!</span> */}
          </div>
          <div class="input-box">
            <input type="text" placeholder="Type a message..." onChange={(e) => setChatMessage(e.target.value)} value={newMessage} />
            <Button color="secondary" size="small" variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </div>
          {/* <!-- More chat messages can be added here --> */}
        </div>
      </div>
    </div>
  );
}
