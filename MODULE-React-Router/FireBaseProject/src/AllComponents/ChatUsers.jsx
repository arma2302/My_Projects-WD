import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import MessageIcon from "@mui/icons-material/Message";
import { Box, Button, Typography } from "@mui/material";

export default function ChatUsers() {
  const [cutterUserRecord, setCurrentUserRecord] = useState();
  const [users, setUsers] = useState([]);
  const [currentId, setUid] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const subscirbe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCurrentUserDetails(user);
      }
    });
  }, []);

  useEffect(() => {
    if (currentId) {
      fetchAllusers();
    }
  }, [currentId]);
  const fetchCurrentUserDetails = async (user) => {
    if (user) {
      const userData = await getDoc(doc(db, "Data", user.uid));
      setCurrentUserRecord(userData.data());
      setUid(userData.id);
    }
  };

  const fetchAllusers = async () => {
    const querySnapshot = await getDocs(collection(db, "Data"));
    // console.log("----> QuerySnapshot",querySnapshot);

    const allusers = [];

    querySnapshot.forEach((doc) => {
      if (doc.id !== currentId) {
        allusers.push({ uid: doc.id, ...doc.data() });
        console.log(allusers);
      }
    });

    setUsers(allusers);
  };
  //   return (
  //     <div>
  //       {cutterUserRecord ? <p>Logged In By {cutterUserRecord.name}</p> : <p>Loading</p>}

  //       <table border={2}>
  //         <thead>
  //           <tr>
  //             <th>SR. NO</th>
  //             <th>IMAGE</th>
  //             <th>Name</th>
  //             <th>EMAIL</th>
  //             <th colSpan={2}>Action</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {users ? (
  //             users.map((user, index) => {
  //               return (
  //                 <tr key={index}>
  //                   <td>{index + 1}</td>
  //                   <td>
  //                     {user.profilepic ? (
  //                       <img src={user.profilepic} height={50} width={50} />
  //                     ) : (
  //                       <img src="https://img.freepik.com/premium-photo/3d-icon-cartoon-person-profile-avatar-user-profile-3d-render-illustration_276199-401.jpg" height={50} width={50} />
  //                     )}
  //                   </td>
  //                   <td>{user.name}</td>
  //                   <td>{user.email}</td>
  //                   <td>
  //                     <button onClick={() => navigate(`/chat/${user.uid}`)}> Message</button>
  //                   </td>
  //                 </tr>
  //               );
  //             })
  //           ) : (
  //             <h1>No Users Found</h1>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   );

  return (
    <Box>
      <Typography variant="h5" sx={{ color: "white", textAlign: "center", fontFamily: "Gill Sans MT" }}>
        {"Chat With  Your Friends"}
      </Typography>
      {users ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexDirection: "column",
            margin: "10px",
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: " rgba(255, 255, 255, 0.326) 0px 7px 29px 0px",
          }}
        >
          {users.map((singleUser, index) => {
            return (
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: "20px", alignItems: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "start", gap: "20px", alignItems: "center" }}>
                  <Box className="profile">
                    {singleUser.profilepic ? <img src={singleUser.profilepic}></img> : <img src="https://img.freepik.com/premium-photo/3d-icon-cartoon-person-profile-avatar-user-profile-3d-render-illustration_276199-401.jpg"></img>}
                  </Box>
                  <Box>
                    <Typography className="name" sx={{ fontSize: "20px" }}>
                      {singleUser.name}
                    </Typography>
                    <Typography className="name" sx={{ fontSize: "14px", opacity: "0.5" }}>
                      {singleUser.email}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  endIcon={<MessageIcon />}
                  sx={{ backgroundColor: "#fff", boxShadow: "rgb(255 255 255 / 26%) 1px 2px 8px 0px;", color: "#222" }}
                  color="secondary"
                  onClick={() => navigate(`/chatscreen/${singleUser.uid}`)}
                >
                  Message
                </Button>
              </Box>
            );
          })}
          :
        </Box>
      ) : (
        <h2>Loading</h2>
      )}
    </Box>
  );
}
