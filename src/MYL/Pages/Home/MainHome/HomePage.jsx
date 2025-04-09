import React, { useState, useEffect } from "react";
import Hero from "../HomePage/Hero";
import About from "../HomePage/About";
import Process from "../HomePage/Process";
import Accomplishments from "../HomePage/Accomplishments";
import Services from "../HomePage/Services";
import Work from "../HomePage/Work";
import Pricing from "../HomePage/Pricing";
import FAQ from "../HomePage/FAQ";
import ThoughtspaceSection from "../HomePage/ThoughtSpace";
import ParallaxScroll from "../HomePage/WorkParallax/ParallaxScroll";
import { useLocation } from "react-router-dom";
import Progress from "../HomePage/Progress/Progress";
import Button from "../../../components/Button";

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const section = document.querySelector(location.hash);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: "smooth" });
                }, 300); // Slight delay for smooth transition
            }
        }
    }, [location]);


    return (
        <div>
            <>
                <Hero />
                <About id="about-section" />
                <Process />
                <Accomplishments />
                {/* <Services id="services-section"/> */}
                {/* <Work /> */}
                <ParallaxScroll id="parallax-section" />
                <Progress />
                <Pricing />
                {/* <ThoughtspaceSection /> */}
                <FAQ />
            </>
        </div>
    );
};

export default HomePage;
