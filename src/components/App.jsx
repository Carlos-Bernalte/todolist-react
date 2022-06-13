import React from 'react';
import '../App.css';
import { Routes, Route } from "react-router-dom";
import { Login } from "./users/SignIn";
import { SignUp } from "./users/SignUp";
import { Home } from "./Home";

export function App() {
  return (
    <>
      <Routes>

        <Route exact path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </>
  );
}
