import React from "react";
import { useNavigate } from "react-router-dom";

import Hero from "./Hero/Hero";
import "./Home.css";
import Visit from "../Visit/Visit";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <Hero />
      </div>
      <Visit />

     
    </div>
  );
}

export default Home;
