import { Box } from "@mui/material";
import React from "react";

export default function AllUsers(props) {
  return (
    <Box className="usersCard">
      {props.allusers.map((user, index) => {
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
              <button class="card__btn card__btn-solid" onClick={props.delete}>
                Delete This User's Acc
              </button>
            </div>
          </div>
        );
      })}
    </Box>
  );
}
