import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      name: "DigimaLearn (Learning Management System)",
      tech: "React.js, Javascript, PosgreSQL, Express.js, AWS, Alibaba Cloud",
      description:
        "Final year project about Learning Management System for digital marketing training. This project aims to develop digital marketing for Universitas Padjadjaran students.",
      github: "https://github.com/aidilfitra08/lms-front-end",
      live: "http://digimalearn.online",
      image: "/lms.png",
    },
    {
      name: "Task Management App",
      tech: "React, Node.js, MongoDB",
      description:
        "Collaborative task management with real-time updates and team collaboration",
      github: "#",
      live: "#",
    },
    {
      name: "API Gateway Service",
      tech: "Golang, PostgreSQL, Redis",
      description:
        "High-performance API gateway with rate limiting and authentication",
      github: "#",
      live: "#",
    },
    {
      name: "Mobile Learning App",
      tech: "Flutter, Firebase, Node.js",
      description:
        "Cross-platform learning application with offline capabilities",
      github: "#",
      live: "#",
    },
  ];

  return (
    <section className="py-6 px-4" id="projects">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-normal mb-4">
          <span className="text-orange-400">Recent Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-neutral-700 rounded-lg border border-neutral-800 overflow-hidden hover:border-blue-500 transition-all duration-300 group"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <FontAwesomeIcon icon={faFolder} />
                  <div className="flex space-x-2">
                    <Link
                      href={project.github}
                      target="_blank"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </Link>
                    <Link
                      href={project.live}
                      target="_blank"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Link>
                  </div>
                </div>

                <h3
                  className="text-base font-normal mb-2 text-white group-hover:text-blue-400 transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  {project.name}
                </h3>
                {project.image && (
                  <div className="py-3">
                    <Image
                      aria-hidden
                      src={project.image}
                      alt="project 1"
                      width={1000}
                      height={1000}
                      className="w-full h-56 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                <p
                  className="text-gray-400 mb-2"
                  style={{ fontSize: "12px", lineHeight: "1.4" }}
                >
                  {project.description}
                </p>
                <div className="text-green-400" style={{ fontSize: "11px" }}>
                  {project.tech}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
