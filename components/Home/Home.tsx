"use client";

import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Services from "./Possibilities/Possibilities";
import Skills from "./Technology/Technology";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };

    initAOS();
  }, []);

  return ( 
    <div className="overflow-hidden">
      <Hero />
      <About />
      <Services />
      <Skills />
    </div>
  )
}

export default Home;