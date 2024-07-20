import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddCommentIcon from "@mui/icons-material/AddComment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Storage, auth, db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Button, Grid, LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import MyPost from "./MyPost";
import ChatUsers from "./ChatUsers";
import UserAllPost from "./UserAllPost";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashbord() {
  //   const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [profilebtn, setprofilebtn] = useState(false);
  const [post, setPost] = useState([]);
  const [postUsers, setPostUsers] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [profileUrl, setProfileUrl] = useState();
  const [uplodingStatus, setUploadingStatus] = useState(false);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const subscirbe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUserDetails(user);
      }
    });
    fetchUsers();
    // fetchPostFun();
  }, []);

  const fetchCurrentUserDetails = async (user) => {
    // const user = auth.currentUser;
    if (user) {
      const userData = await getDoc(doc(db, "Data", user.uid));
      console.log(`welcome dashboard   ${userData.data().name}`);
      console.log(`welcome dashboard   ${userData.data().profilepic}`);
      setUserDetails(userData.data());
    }
  };

  const hanldeLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("---->profileUrl", profileUrl);
    setUploadingStatus(true);
    const user = auth.currentUser;
    const storageRef = await ref(Storage, `profilepictures/${user.uid}`);
    // const storageRef = await ref(storage,`profilepictures/mypic`);
    await uploadBytes(storageRef, profileUrl);

    const downloadUrl = await getDownloadURL(storageRef);
    console.log("---> download URL ", downloadUrl);

    await updateDoc(doc(db, "Data", user.uid), {
      profilepic: downloadUrl,
    });

    const userData = await getDoc(doc(db, "Data", user.uid));
    setUserDetails(userData.data());

    // setUploadingStatus(false);
  };
  ///////////////////////function for fetching all the post
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
      // users[user - profile] = record.profilepic;
    });
    console.log("users : ", users);
    setPostUsers(users);
  };
  // const fetchPostFun = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Post"));
  //   const fetchPost = [];

  //   querySnapshot.forEach((doc) => {
  //     const record = doc.data();
  //     //console.log("record ",record);
  //     fetchPost.unshift({
  //       id: doc.id,
  //       title: record.title,
  //       description: record.description,
  //       image: record.image,
  //       userid: record.userid,
  //       time: timeAgo(record.createdAt),
  //       likes: record.likes || [],
  //     });
  //   });
  //   setPost(fetchPost);
  // };
  // const timeAgo = (timestamp) => {
  //   const now = Date.now();
  //   const seconds = Math.floor((now - timestamp) / 1000);

  //   let interval = Math.floor(seconds / 31536000);
  //   console.log(interval);
  //   if (interval > 1) {
  //     return `${interval} "years ago"`;
  //   }
  //   interval = Math.floor(seconds / 2592000);
  //   if (interval > 1) {
  //     return ` ${interval} months ago`;
  //   }
  //   interval = Math.floor(seconds / 86400);
  //   if (interval > 1) {
  //     return ` ${interval} days ago`;
  //   }
  //   interval = Math.floor(seconds / 3600);
  //   if (interval > 1) {
  //     return ` ${interval} hours ago`;
  //   }
  //   interval = Math.floor(seconds / 60);
  //   if (interval > 1) {
  //     return ` ${interval} minutes ago`;
  //   }
  //   return `${Math.floor(seconds)} seconds ago`;
  // };
  // const handleLike = async (postid) => {
  //   const speficPost = await getDoc(doc(db, "Post", post.id));

  //   const postDataLikeList = (await speficPost.data().likes) || [];

  //   const user = auth.currentUser;
  //   if (postDataLikeList.includes(user.uid)) return;

  //   console.log("likes");
  //   await updateDoc(doc(db, "Post", postid), {
  //     likes: [...postDataLikeList.user.uid],
  //   });

  //   const updatePost = await post.map((post) => (post.id === postid ? { ...post, likes: [...post.likes, user.uid] } : post));
  //   setPost(updatePost);
  // };
  return (
    <div className="dash-wrap-user">
      {userDetails ? (
        <div>
          {/* ////apppbar///// */}
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#222", left: "0", width: "84%" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {userDetails ? <h2>Welcome {userDetails.name}</h2> : <h2>Loading..</h2>}
                </Typography>
                {auth && (
                  <div>
                    <IconButton onClick={() => navigate("/newpost")}>
                      <AddCircleIcon sx={{ fontSize: "38px", color: "white" }} />
                    </IconButton>
                    <IconButton size="large" className="profile-icon">
                      {userDetails?.profilepic ? <img src={userDetails?.profilepic}></img> : <img src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"></img>}
                    </IconButton>
                    <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                      <MoreHorizIcon />
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={hanldeLogout}> Log Out</MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Box>
          {/* ////container//// */}
          <Grid container spacing={2}>
            {/* content */}
            <Grid item xs={10}>
              <CustomTabPanel value={value} index={0}>
                {/* {post ? (
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
                                <div className="like">
                                  <IconButton onClick={() => handleLike(singlePost.id)}>
                                    <FavoriteBorderIcon sx={{ color: "white" }} />
                                  </IconButton>
                                  <h3>Likes: {singlePost.likes?.length || 0}</h3>
                                  <IconButton>
                                    <AddCommentIcon sx={{ color: "white" }} />
                                  </IconButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <LinearProgress color="secondary" />
                )}
                ; */}
                <UserAllPost />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Box className="profile-wrap" sx={{ color: "white" }}>
                  <h2>Profile picture Upload</h2>
                  {userDetails?.profilepic ? <img src={userDetails?.profilepic} className="profile-img "></img> : <img src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png" className="profile-img "></img>}
                  {/* input */}
                  <div className="inp-wrap">
                    <input type="file" onChange={(e) => setProfileUrl(e.target.files[0])} className="file" />
                  </div>
                  <div>
                    <Button color="secondary" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleSubmit}>
                      Upload file
                    </Button>
                  </div>
                </Box>
                ;
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <MyPost />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <ChatUsers />
              </CustomTabPanel>
            </Grid>
            {/* tabs */}
            <Grid item xs={2} sx={{ backgroundColor: "#e0e1dd", height: "100vh", position: "fixed", top: "0px", right: "0", width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                orientation="vertical"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "white",
                    color: "white",
                  },
                }}
                inkBarStyle={{ backgroundColor: "white" }}
              >
                <Tab label="All Post" {...a11yProps(0)} />
                <Tab label="Edit Profile" {...a11yProps(1)} />
                <Tab label="My Post" {...a11yProps(2)} />
                <Tab label="Inbox" {...a11yProps(3)} />
              </Tabs>
            </Grid>
          </Grid>
        </div>
      ) : (
        // loaderrr
        <div className="loader-wrap">
          <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
          </div>
        </div>
      )}

      <IconButton sx={{ position: "fixed", bottom: "10px", right: "80px" }}>
        <HelpIcon sx={{ backgroundColor: "purple", height: "40px", width: "40px", borderRadius: "50%", color: "white" }} title="Help"></HelpIcon>
      </IconButton>
    </div>
  );
}
