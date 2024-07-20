/* eslint-disable no-unused-vars */
import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import AddCommentIcon from "@mui/icons-material/AddComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Box, Button, IconButton, LinearProgress, TextField } from "@mui/material";

export default function UserAllPost() {
  const [post, setPost] = useState([]);
  const [postUsers, setPostUsers] = useState(null);
  const [isReact, setIsReact] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [comment, setcomment] = useState(false);

  const navigate = useNavigate();
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
    const querySnapshot = await getDocs(collection(db, "Post"));
    const fetchPost = [];

    querySnapshot.forEach((doc) => {
      const record = doc.data();
      //console.log("record ",record);
      fetchPost.push({
        id: doc.id,
        title: record.title,
        description: record.description,
        image: record.image,
        userid: record.userid,
        likes: record.likes || [],
        comments: record.comments || [],
        createdAt: timeAgo(record.timestamp),
      });
    });
    setPost(fetchPost);
  };

  const timeAgo = (timestamp) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  const handleDelete = async (docid) => {
    console.log("---> delete ", docid);
    await deleteDoc(doc(db, "Post", docid));
    setPost(post.filter((item) => item.id !== docid));

    // navigate("/dashboard",{replace:true})
  };

  const handleLike = async (postid) => {
    setIsReact(!isReact);
    const specific_post = await getDoc(doc(db, "Post", postid));

    const postDataLikeList = (await specific_post.data().likes) || [];

    console.log("---> postdata ", postDataLikeList);

    const user = auth.currentUser;

    if (postDataLikeList.includes(user.uid)) return;

    console.log("----> adding 1 like");

    await updateDoc(doc(db, "Post", postid), {
      likes: [...postDataLikeList, user.uid],
    });

    const updatePost = await post.map((post) => (post.id === postid ? { ...post, likes: [...post.likes, user.uid] } : post));

    setPost(updatePost);
  };

  const handleComment = async (postid) => {
    const user = auth.currentUser;
    console.log("---> postid ", postid);
    const newCommentObj = {
      text: newComment,
      userid: user.uid,
      timestamp: Date.now(),
    };
    await updateDoc(doc(db, "Post", postid), {
      comments: arrayUnion(newCommentObj),
    });
    setNewComment("");
    const updateCommentPost = await post.map((post) => (post.id === postid ? { ...post, comments: [...post.comments, newCommentObj] } : post));

    setPost(updateCommentPost);

    console.log("---->>> NEWPOST : ", post);
  };

  return (
    <div>
      {post ? (
        <div className="posts-wrap">
          {post.map((singlePost, index) => {
            return (
              <div class="card-post" key={index}>
                <div class="card-header">
                  <img src={singlePost.image} alt="" />
                </div>
                <div class="card-body">
                  <h4>{singlePost.title}</h4>
                  <p>{singlePost.description}</p>
                  <div class="user">
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <img src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png" alt="" />

                      <div class="user-info">
                        <h5>{postUsers[singlePost.userid]}</h5>
                        <small>{singlePost.time}</small>
                      </div>
                    </Box>
                    <div>
                      <Box className="like" sx={{ display: "flex", alignItems: "start", justifyContent: "start", gap: "10px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: { margin: "0" }, flexDirection: "column" }}>
                          <IconButton onClick={() => handleLike(singlePost.id)}>
                            {/* <FormControlLabel control={<Checkbox checked={isReact} icon={<FavoriteBorder />} onChange={(e) => setIsReact(!isReact)} checkedIcon={<Favorite />} sx={{ fill: "red" }} />} label="React" sx={{ m: 2 }} /> */}
                            {isReact == isReact ? <Favorite sx={{ fill: "red" }}></Favorite> : <FavoriteBorder />}
                          </IconButton>
                          <p>{singlePost.likes?.length || 0},likes</p>
                        </Box>
                        <Box>
                          <IconButton onClick={() => setcomment(true)}>
                            <AddCommentIcon sx={{ color: "white" }} />
                          </IconButton>
                          <p>{singlePost.comments?.length || 0},Comments</p>
                        </Box>
                      </Box>
                    </div>
                  </div>
                </div>

                <Box className="card-footer" sx={{ input: { border: "none", color: "white", outline: "none" }, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
                  {/* <h3>Comment Sections : </h3> */}
                  <TextField type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add your Comment" variant="standard" inputProps={{ disableUnderline: "true" }} />

                  <Button onClick={() => handleComment(singlePost.id)} variant="text" color="primary" size="small" sx={{ color: "#dfdfdf", textTransform: "capitalize" }}>
                    Add
                  </Button>
                </Box>
                {comment && (
                  <Box sx={{ color: "white" }}>
                    {singlePost.comments?.length > 0 ? (
                      singlePost.comments.map((comment, index) => {
                        return (
                          <Box key={index} sx={{ display: "flex", justifyContent: "space-between", padding: "10px", color: "white" }}>
                            <p>
                              By : {postUsers[comment.userid]} :- {comment.text}
                            </p>
                            <p> AT : {timeAgo(comment.timestamp)}</p>
                          </Box>
                        );
                      })
                    ) : (
                      <p>No Comments Found</p>
                    )}
                  </Box>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <LinearProgress color="secondary" />
      )}
      ;
    </div>
  );
}
