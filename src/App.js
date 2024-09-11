import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TagsDashboard from "./components/TagsDashboard";
import ComponentDetail from "./components/ComponentDetail";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="main-content">
          <SideBar/>
          <div className="content"></div>
          <Routes>
            <Route path="/" element={<TagsDashboard />} />
            <Route path="/component/:name" element={<ComponentDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
