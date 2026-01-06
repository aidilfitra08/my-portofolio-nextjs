"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faFolder,
  faLaptopCode,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Project {
  name: string;
  tech: string;
  description: string;
  github: string;
  live: string;
  image: string;
  images?: string[];
  visible?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const displayImages =
    project.images && project.images.length > 0
      ? project.images
      : project.image
      ? [project.image]
      : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="group vintage-card dark:bg-[#1a1a1a] rounded-lg border-2 border-[#2a2a2a] dark:border-accent-green border-opacity-20 dark:border-opacity-20 overflow-hidden hover:border-opacity-100 dark:hover:border-opacity-60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="p-6">
        {/* Header with folder icon and links */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#ffb000] bg-opacity-20 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faFolder}
                className="text-[#ffb000] text-xl"
              />
            </div>
            <span className="text-[#2a2a2a] dark:text-[#606060] text-sm">
              project_{index + 1}
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              href={project.github}
              target="_blank"
              className="text-[#2a2a2a] dark:text-[#a0a0a0] hover:text-accent-green dark:hover:text-accent-green transition-colors transform hover:scale-110 duration-200"
            >
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </Link>
            <Link
              href={project.live}
              target="_blank"
              className="text-[#2a2a2a] dark:text-[#a0a0a0] hover:text-[#00d9ff] dark:hover:text-[#00d9ff] transition-colors transform hover:scale-110 duration-200"
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-xl"
              />
            </Link>
          </div>
        </div>

        {/* Project name */}
        <h3 className="text-lg md:text-xl font-bold mb-3 text-[#2a2a2a] dark:text-[#00d9ff] group-hover:text-accent-green dark:group-hover:text-accent-green transition-colors">
          <span className="text-[#ff6b6b]">[</span>
          {project.name}
          <span className="text-[#ff6b6b]">]</span>
        </h3>

        {/* Project image carousel */}
        {displayImages.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden border-2 border-[#2a2a2a] dark:border-[#404040] border-opacity-20 relative group/carousel">
            <Image
              aria-hidden
              src={displayImages[currentImageIndex]}
              alt={`${project.name} ${currentImageIndex + 1}`}
              width={1000}
              height={1000}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200"
                  aria-label="Previous image"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200"
                  aria-label="Next image"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                </button>

                {/* Image indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {displayImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        idx === currentImageIndex
                          ? "bg-accent-green w-4"
                          : "bg-white bg-opacity-50"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <p className="text-[#2a2a2a] dark:text-[#c0c0c0] mb-4 leading-relaxed text-sm md:text-base">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="pt-3 border-t border-[#2a2a2a] dark:border-[#404040] border-opacity-20">
          <div className="flex items-start gap-2">
            <span className="text-[#ff6b6b] text-xs mt-1 shrink-0">TECH:</span>
            <div className="text-accent-green text-xs md:text-sm">
              {project.tech}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }: ProjectsProps) {
  // Filter only visible projects (default to true if not specified)
  const visibleProjects = projects.filter(
    (project) => project.visible !== false
  );

  return (
    <section className="py-8 md:py-12 px-4" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <FontAwesomeIcon
            icon={faLaptopCode}
            className="text-2xl md:text-3xl text-[#ff6b6b]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#ff6b6b]">
            Recent Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
