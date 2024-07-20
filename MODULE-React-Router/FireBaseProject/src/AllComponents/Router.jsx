import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Dashbord from "./Dashbord";
import AdminLogin from "./AdminLogin";
import AdminDash from "./AdminDash";
import NewPost from "./NewPost";
import ChatScreen from "./ChatScreen";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page1 />}></Route>
          <Route path="/login" element={<Page2 />}></Route>
          <Route path="/dashbord" element={<Dashbord />}></Route>
          <Route path="/adminLogin" element={<AdminLogin />}></Route>
          <Route path="/adminDash" element={<AdminDash />}></Route>
          <Route path="/newpost" element={<NewPost />}></Route>
          <Route path="/chatscreen/:uid" element={<ChatScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
