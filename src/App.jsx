import React from "react";
import { Route, Routes } from "react-router-dom";
import Logo from "./components/Logo";
import UserInfo from "./Routes/UserInfo";
import Users from "./Routes/Users";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto py-3">
        <Logo />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:name" element={<UserInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
