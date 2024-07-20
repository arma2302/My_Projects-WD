import { collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Viewpost() {
  const [post, setPost] = useState([]);
  const [postUser, setPostUser] = useState(null);
  useEffect(() => {
    fetchPostFun();
  }, []);
  const fetchusers = async () => {
    const querySnapshot = await getDocs(collection(db, "Student"));
    const users = {};
    querySnapshot.forEach((doc) => {
      const record = doc.data();
      users[doc.id] = record.name;
    });
    setPostUser(users);
  };
  const fetchPostFun = async () => {
    const querySnapshot = await getDoc(collection(db, "Post"));
    const fetchdata = [];

    querySnapshot.forEach((doc) => {
      const records = doc.data();
      console.log(records);

      fetchdata.push({
        id: doc.id,
        title: records.title,
        desc: records.desc,
        image: records.image,
        userid: records.userid,
      });
    });
    setPost(fetchdata);
  };
  return (
    <div>
      {post.map((singlePost, index) => {
        return (
          <div key={index}>
            <h2>{singlePost.title}</h2>
            <p>{singlePost.desc}</p>
            <img src={singlePost.image} alt={singlePost.title} />
            <h3>Posted by {postUser[singlePost.userid]}</h3>
          </div>
        );
      })}
    </div>
  );
}
