import React, { useState } from 'react';
import '../App.css';

import { Routes, Route } from "react-router-dom";
import { Login } from "./users/SignIn";
import { SignUp } from "./users/SignUp";
import { Home } from "./Home";
import { HashRouter } from 'react-router-dom';
export function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="home/:username" element={<Home />} />
        <Route path="*" element={<div><h1>Error 404</h1></div>} />
      </Routes>
    </HashRouter >);

}
