
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import {  Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { Home } from "./pages/Home";
import ProfileProtect from "./components/ProfileProtect";
import { Profile } from "./pages/Profile";
import LoginProtected from "./components/LoginPortected"
import SignupProtect from "./components/SignupProtect";
import { MovieDetails } from "./pages/MovieDetails";
import { Search } from "./pages/Search";

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginProtected><Login /></LoginProtected>} />
          <Route path="/sign-up" element={<SignupProtect><SignUp /></SignupProtect>} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/profile" element={<ProfileProtect><Profile /></ProfileProtect>} />
          <Route path="/search" element={<Search />} />
        </Routes>
    </>
  );
}

export default App;
