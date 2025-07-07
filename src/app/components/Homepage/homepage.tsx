"use client";
import React from "react";
import PortofolioHeader from "../landing-page/section/header/portofolioHeader";
import Education from "../landing-page/section/education/education";
import Experience from "../landing-page/section/experience/experience";
import ContactMe from "../landing-page/section/contact-me/contactMe";
import Projects from "../landing-page/section/projects/projects";
import BlogPage from "../blog/blog";
import Skill from "../landing-page/section/skill/skill";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg bg-neutral-200 dark:bg-neutral-800 text-gray-100 font-mono pt-12">
        {/* Header */}
        <PortofolioHeader />

        {/* Skill Section */}
        <Skill />
        {/* Education Section */}
        <Education />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Medium post */}
        <BlogPage />
        {/* Contact Section */}
        <ContactMe />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
