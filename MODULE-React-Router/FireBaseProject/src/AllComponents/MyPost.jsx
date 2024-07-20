/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function MyPost() {
  const [post, setPost] = useState([]);
  const [postUsers, setPostUsers] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchPostFun();
  }, []);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "Data"));
    const users = {};
    // key : value
    // 784asd : Anjali
    querySnapshot.forEach((doc) => {
      const record = doc.data();
      console.log("======> Record ", record);
      // users[doc.id] = record.name;
      console.log("---> doc id : ", doc.id);
      users[doc.id] = record.name;
    });
    console.log("users : ", users);
    setPostUsers(users);
  };

  const fetchPostFun = async () => {
    const current_user = auth.currentUser;
    const querySnapshot = await getDocs(collection(db, "Post"));
    const fetchPost = [];

    querySnapshot.forEach((doc) => {
      const record = doc.data();
      //console.log("record ",record);
      if (record.userid === current_user.uid) {
        fetchPost.push({
          id: doc.id,
          title: record.title,
          description: record.description,
          image: record.image,
          userid: record.userid,
          time: timeAgo(record.createdAt),
        });
      }
    });
    setPost(fetchPost);
  };

  //////timestamp

  const timeAgo = (timestamp) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    let interval = Math.floor(seconds / 31536000);
    console.log(interval);
    if (interval > 1) {
      return `${interval} "years ago"`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return ` ${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return ` ${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return ` ${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return ` ${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };
  const handleDelete = async (docid) => {
    console.log("---> delete ", docid);
    await deleteDoc(doc(db, "Post", docid));
    setPost(post.filter((item) => item.id !== docid));

    // navigate("/dashboard",{replace:true})
  };
  return (
    <Box sx={{ margin: "0 auto" }}>
      {post.map((singlePost, index) => {
        return (
          <Card sx={{ maxWidth: 850, marginBottom: "20px" }} key={index}>
            <CardMedia sx={{ height: 340 }} image={singlePost.image} title="Post" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {singlePost.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {singlePost.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {singlePost.time}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleDelete(singlePost.id)} variant="contained" color="secondary">
                Delete
              </Button>
              <Button size="small" variant="contained" color="secondary">
                share
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
