"use client";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { dataProject } from "../data/dataproject";

export default function Projects() {
  // let dataProjects = dataProject;
  const [onlyImage, setOnlyImage] = useState({
    image1: dataProject[0].onlyImage,
    image2: dataProject[1].onlyImage,
  });
  return (
    <div
      className="grid grid-cols-1 h-fit py-16 px-10 space-y-6 justify-center font-mono"
      id="projects"
    >
      <p className="text-4xl font-extrabold col-span-1 text-center max-md:text-start">
        Recent Projects
      </p>
      <div className="col-span-1 flex flex-wrap gap gap-2 justify-center">
        {dataProject.map((project) => (
          <div
            key={project.id}
            className={` grid-cols-1 col-span-1 grid relative z-0 ease-in duration-300 w-96 h-56justify-self-center overflow-hidden`}
            onClick={() => {
              if (project.id == 0) {
                setOnlyImage({
                  image1: false,
                  image2: true,
                });
              } else if (project.id == 1) {
                setOnlyImage({
                  image1: true,
                  image2: false,
                });
              }
            }}
          >
            <div>
              <Image
                aria-hidden
                src={project.image}
                alt="project 1"
                width={1000}
                height={1000}
                className="w-96 h-56 object-cover"
                loading="lazy"
              />
            </div>
            <div
              className={` ${
                (
                  project.id == 0
                    ? onlyImage.image1
                    : project.id == 1
                    ? onlyImage.image2
                    : true
                )
                  ? "opacity-0"
                  : "opacity-100"
              }
              } col-span-1 absolute left-0 z-1 bg-black bg-opacity-70 h-full p-6 ease-in duration-300 transition-opacity space-y-2 overflow-scroll text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
            >
              <p
                className={`${
                  (
                    project.id == 0
                      ? onlyImage.image1
                      : project.id == 1
                      ? onlyImage.image2
                      : true
                  )
                    ? "hidden"
                    : "block"
                } text-xl font-bold`}
              >
                <Link className="" href={project.link}>
                  {project.namaProject}{" "}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    size="2xs"
                    className="pr-2"
                  />{" "}
                </Link>
              </p>
              <p className="text-sm">{project.detail}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <p className=" col-span-1 pt-4 text-center">
        <Link
          href="#"
          className=" bg-neutral-800 text-white p-3 px-10 hover:bg-white hover:text-black ease-in-out duration-300 "
        >
          Another Project
        </Link>
      </p> */}
    </div>
  );
}
