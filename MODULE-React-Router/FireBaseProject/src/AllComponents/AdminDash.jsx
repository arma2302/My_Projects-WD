import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Storage, auth, db } from "../firebaseConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

export default function AdminDash() {
  const [value, setValue] = React.useState(0);
  const [post, setPost] = useState([]);
  const [postUsers, setPostUsers] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profilebtn, setprofilebtn] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [userDetails, setUserDetails] = useState(null);
  const [profileUrl, setProfileUrl] = useState();

  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const subscirbe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUserDetails(user);
      }
    });
    fetchAllusers();
    fetchUsers();
    fetchPostFun();
  }, []);
  // deatils
  const fetchCurrentUserDetails = async (user) => {
    // const user = auth.currentUser;
    if (user) {
      const userData = await getDoc(doc(db, "Data", user.uid));
      console.log(`welcome dashboard   ${userData.data().name}`);
      console.log(`welcome dashboard   ${userData.data().profilepic}`);
      setUserDetails(userData.data());
    }
  };
  // delete
  const deleteUser = async (userid) => {
    console.log("--->delete User", userid);
    await deleteDoc(doc(db, "Data", userid)); // it will remove from firestore

    // remove from array
    const newArray = allUsers.filter((user) => user.uid !== userid);
    setAllUsers(newArray);
    console.log(newArray);
  };
  // all Users
  const fetchAllusers = async () => {
    const current_user = auth.currentUser;
    const querySnapshot = await getDocs(collection(db, "Data"));
    // console.log("----> QuerySnapshot",querySnapshot);

    const users = [];

    querySnapshot.forEach((doc) => {
      const record = doc.data();
      console.log(record);

      if (record.userId != current_user.uid) {
        users.push({ uid: doc.id, ...doc.data() });
      }
    });

    setAllUsers(users);
    // setAllUsers(allUsers.filter((item) => item.id == users.uid));
    console.log("----> users", users);
  };
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

  const fetchPostFun = async () => {
    const querySnapshot = await getDocs(collection(db, "Post"));
    const fetchPost = [];

    querySnapshot.forEach((doc) => {
      const record = doc.data();
      //console.log("record ",record);
      fetchPost.unshift({
        id: doc.id,
        title: record.title,
        description: record.description,
        image: record.image,
        userid: record.userid,
        time: timeAgo(record.createdAt),
      });
    });
    setPost(fetchPost);
  };

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
  }; //   logout
  const hanldeLogout = async () => {
    await signOut(auth);
    navigate("/adminLogin", { replace: true });
  };
  // profileBox
  const handlprofile = () => {
    setprofilebtn(true);
  };
  // submit
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

  return (
    <div className="dash-wrap">
      {userDetails ? (
        //app bar
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: "#000" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {userDetails ? <h2>Welcome {userDetails.name}</h2> : <h2>Loading..</h2>}
                </Typography>
                {auth && (
                  <div>
                    <IconButton color="inherit" className="profile-icon ">
                      {userDetails?.profilepic ? <img src={userDetails?.profilepic} className="profile-icon "></img> : <img src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"></img>}
                    </IconButton>
                    <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
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
                      <MenuItem onClick={handlprofile}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={hanldeLogout}> Log Out</MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Box>
          {/* profile card */}
          {profilebtn && (
            <Box className="profile-wrap">
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
          )}
          {/* //all users */}
          <Box sx={{ width: "100%", backgroundColor: "transparent", marginTop: "60px" }}>
            <Box sx={{ borderBottom: 2, borderColor: "divider", backgroundColor: "transparent", boxShadow: "box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{ display: "flex", flexDirection: "column" }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#222",
                  },
                }}
                textColor="action"
                // orientation="vertical"
              >
                <Tab label="All Users" {...a11yProps(0)} />
                <Tab label="All Post" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Box>
              <CustomTabPanel value={value} index={0}>
                <Box className="usersCard">
                  {allUsers.map((user, index) => {
                    return (
                      <div class="card" key={index}>
                        <div class="card__img">
                          <img src="https://i.pinimg.com/564x/d2/90/25/d29025ddce2984fb8c0fae8d2884cff9.jpg" alt="" />
                        </div>
                        <div class="card__avatar">
                          {user.profilepic ? <img src={user.profilepic} className="profile-img "></img> : <img src="https://tse1.mm.bing.net/th?id=OIP.8li1g3WASRlQCpV6X54VCQHaHa&pid=Api&P=0&h=180" className="profile-img "></img>}
                        </div>
                        <div class="card__title">{user.name}</div>
                        <div class="card__subtitle">{user.email}</div>
                        <div class="card__wrapper">
                          <button class="card__btn card__btn-solid" onClick={() => deleteUser(user.uid)}>
                            Delete This User's Acc
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                {post ? (
                  <div className="cards">
                    {post.map((singlePost, index) => {
                      return (
                        <a href="" class="card-admin-allPost" key={index}>
                          <img src={singlePost.image} class="card__image" alt="" />
                          <div class="card__overlay">
                            <div class="card__header">
                              <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                <path />
                              </svg>
                              <img class="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                              <div class="card__header-text">
                                <h3 class="card__title">{singlePost.title}</h3>
                                <span class="card__status">
                                  Posted By :{postUsers[singlePost.userid]} {singlePost.time}
                                </span>
                              </div>
                            </div>
                            <p class="card__description">{singlePost.description}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <LinearProgress color="secondary" />
                )}
              </CustomTabPanel>
            </Box>
          </Box>
        </div>
      ) : (
        <div className="loader-wrap">
          <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
          </div>
        </div>
      )}
    </div>
  );
}
