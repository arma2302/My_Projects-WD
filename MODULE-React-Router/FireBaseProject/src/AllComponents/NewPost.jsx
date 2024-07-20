/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { auth, db, Storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState();

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const user = auth.currentUser;
    const storageRef = await ref(Storage, `post/${user.uid}/${Date.now()}`);
    await uploadBytes(storageRef, imageLink);
    const downloadUrl = await getDownloadURL(storageRef);

    await setDoc(doc(db, "Post", `${Date.now()}`), {
      title: title,
      description: description,
      image: downloadUrl,
      userid: user.uid,
      createdAt: Date.now(),
    });

    navigate("/dashbord", { replace: true });
  };

  return (
    <>
      <div className="new-post-wrap">
        <div className="img-wrap">
          <img src="./src/images/new-post.png" alt="" />
        </div>
        <div className="new-post">
          <h1>Add New Post</h1>
          <input type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}></input>
          <br></br>
          <textarea placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}></textarea>
          <br></br>
          <Button component="label" role={undefined} variant="text" tabIndex={-1} startIcon={<CloudUploadIcon />} sx={{ color: "black" }}>
            Upload file
            <VisuallyHiddenInput type="file" onChange={(e) => setImageLink(e.target.files[0])} />
          </Button>
          <br></br>
          <Button variant="contained" endIcon={<SendIcon />} color="secondary" onClick={(e) => handleSubmit(e)}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
