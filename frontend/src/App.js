import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Navbar } from "./components/Navbar";
import { Users } from "./components/Users";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container p-4">
          <Navbar />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
