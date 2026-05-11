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
    <div className="group vintage-card dark:bg-[#1a1a1a] rounded-lg border-2 border-[var(--border-color)] border-opacity-20 dark:border-opacity-20 overflow-hidden hover:border-opacity-100 dark:hover:border-opacity-60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-card [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:overflow-visible">
      <div className="p-6 [data-theme=neobrutalism]:p-4">
        {/* Header with folder icon and links */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#ffb000] bg-opacity-20 flex items-center justify-center [data-theme=neobrutalism]:neo-icon-box [data-theme=neobrutalism]:bg-[var(--background)] [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:width-12 [data-theme=neobrutalism]:height-12">
              <FontAwesomeIcon
                icon={faFolder}
                className="text-[#ffb000] text-xl [data-theme=neobrutalism]:text-[var(--foreground)]"
              />
            </div>
            <span className="text-[var(--foreground)] text-sm opacity-60">
              project_{index + 1}
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              href={project.github}
              target="_blank"
              className="text-[var(--foreground)] hover:text-accent-green transition-colors transform hover:scale-110 duration-200 [data-theme=neobrutalism]:border-2 [data-theme=neobrutalism]:border-[var(--foreground)] [data-theme=neobrutalism]:w-8 [data-theme=neobrutalism]:h-8 [data-theme=neobrutalism]:rounded-full [data-theme=neobrutalism]:flex [data-theme=neobrutalism]:items-center [data-theme=neobrutalism]:justify-center [data-theme=neobrutalism]:hover:bg-[var(--foreground)] [data-theme=neobrutalism]:hover:text-[var(--background)]"
            >
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </Link>
            <Link
              href={project.live}
              target="_blank"
              className="text-[var(--foreground)] hover:text-[#00d9ff] transition-colors transform hover:scale-110 duration-200 [data-theme=neobrutalism]:border-2 [data-theme=neobrutalism]:border-[var(--foreground)] [data-theme=neobrutalism]:w-8 [data-theme=neobrutalism]:h-8 [data-theme=neobrutalism]:rounded-full [data-theme=neobrutalism]:flex [data-theme=neobrutalism]:items-center [data-theme=neobrutalism]:justify-center [data-theme=neobrutalism]:hover:bg-[var(--foreground)] [data-theme=neobrutalism]:hover:text-[var(--background)]"
            >
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-xl"
              />
            </Link>
          </div>
        </div>

        {/* Project name */}
        <h3 className="text-lg md:text-xl font-bold mb-3 text-[var(--foreground)] group-hover:text-accent-green transition-colors [data-theme=neobrutalism]:text-lg [data-theme=neobrutalism]:font-900 [data-theme=neobrutalism]:group-hover:text-[var(--foreground)]">
          <span className="text-[#ff6b6b] [data-theme=neobrutalism]:hidden">[</span>
          {project.name}
          <span className="text-[#ff6b6b] [data-theme=neobrutalism]:hidden]">]</span>
        </h3>

        {/* Project image carousel */}
        {displayImages.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden border-2 border-[var(--border-color)] border-opacity-20 relative group/carousel [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-3">
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 [data-theme=neobrutalism]:bg-[var(--foreground)] [data-theme=neobrutalism]:text-[var(--background)] [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-2 [data-theme=neobrutalism]:border-[var(--foreground)]"
                  aria-label="Previous image"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 [data-theme=neobrutalism]:bg-[var(--foreground)] [data-theme=neobrutalism]:text-[var(--background)] [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-2 [data-theme=neobrutalism]:border-[var(--foreground)]"
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
                      } [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:w-3 [data-theme=neobrutalism]:h-3 [data-theme=neobrutalism]:bg-[var(--foreground)]`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <p className="text-[var(--foreground)] mb-4 leading-relaxed text-sm md:text-base opacity-80">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="pt-3 border-t border-[var(--border-color)] border-opacity-20 [data-theme=neobrutalism]:border-t-2">
          <div className="flex items-start gap-2">
            <span className="text-[#ff6b6b] text-xs mt-1 shrink-0 [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-bold">TECH:</span>
            <div className="text-accent-green text-xs md:text-sm [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-bold">
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
        <div className="flex items-center gap-3 mb-8 [data-theme=neobrutalism]:neo-section-header [data-theme=neobrutalism]:flex-col [data-theme=neobrutalism]:items-start">
          <FontAwesomeIcon
            icon={faLaptopCode}
            className="text-2xl md:text-3xl text-[#ff6b6b] [data-theme=neobrutalism]:text-[var(--foreground)]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#ff6b6b] text-[var(--foreground)] [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-900 [data-theme=neobrutalism]:font-3xl [data-theme=neobrutalism]:border-b-4 [data-theme=neobrutalism]:padding-b-5 [data-theme=neobrutalism]:padding-b-20">
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
