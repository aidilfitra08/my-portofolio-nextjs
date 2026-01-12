// "use client";
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
import { loadPortfolioData } from "@/lib/portfolio";

const Homepage = async () => {
  const data = await loadPortfolioData();
  const projects = data?.projects || [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] text-[#2a2a2a] dark:text-[#e0e0e0] font-mono relative">
        {/* Vintage scanline effect overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse"></div>
        </div>

        {/* Main content container with padding for full-width utilization */}
        <div className="relative z-10 pt-16 md:pt-20">
          {/* Header Section - Full width hero */}
          <div className="w-full">
            <PortofolioHeader data={data} />
          </div>

          {/* Main content grid - utilize full space */}
          <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 space-y-8 md:space-y-12">
            {/* Skills Section - Grid layout for better space usage */}
            <Skill />

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"> */}
            <Experience />
            <Education />
            {/* </div> */}

            {/* Projects Section - Full width with grid */}
            <Projects projects={projects} />

            {/* Blog Section */}
            <BlogPage />

            {/* Contact Section - Centered but full width background */}
            <ContactMe />
          </div>
        </div>

        {/* Vintage corner decorations */}
        <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-accent-green opacity-20 pointer-events-none"></div>
        <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent-green opacity-20 pointer-events-none"></div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
