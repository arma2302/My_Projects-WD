import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainComp from "./MainComp";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComp></MainComp>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
