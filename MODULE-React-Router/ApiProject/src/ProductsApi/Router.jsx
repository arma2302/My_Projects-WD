import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDisplay from "./ProductDisplay";
import ProductDeatils from "./ProductDeatils";

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductDisplay />}></Route>
          <Route path="/products/:id" element={<ProductDeatils />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
