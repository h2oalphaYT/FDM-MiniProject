import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SideBar from "./components/SideBar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SideBar />} />
      </Routes>
    </Router>
  );
};

export default App;
