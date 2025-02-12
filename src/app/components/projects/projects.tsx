"use client";
import Image from "next/image";
import { useState } from "react";

export default function Projects() {
  const [onlyImage, setOnlyImage] = useState({
    image1: true,
    image2: true,
    image3: true,
  });
  return (
    <div
      className="grid grid-cols-1 h-fit py-16 px-16 space-y-6 justify-center"
      id="projects"
    >
      <p className="text-5xl font-extrabold col-span-1 text-center">
        Recent Projects
      </p>
      <div className="col-span-1 grid grid-cols-3 gap gap-x-8">
        <div
          className={` ${
            onlyImage.image1
              ? "grid-cols-1 justify-self-center overflow-hidden"
              : "grid-cols-1"
          } col-span-1 grid relative z-0 ease-in duration-300 `}
          onClick={() =>
            setOnlyImage({
              image1: !onlyImage.image1,
              image2: true,
              image3: true,
            })
          }
        >
          <div className={` ${onlyImage.image1 ? "" : "block"} col-span-1  `}>
            <Image
              aria-hidden
              src="/dummy.jpg"
              alt="project 1"
              width={1000}
              height={1000}
              className=""
            />
          </div>
          <div
            className={` ${
              onlyImage.image1 ? " opacity-0" : " opacity-100"
            } col-span-1 absolute left-0 z-1 bg-black bg-opacity-70 h-full p-10 ease-in duration-300 transition-opacity space-y-2 overflow-scroll text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
          >
            <p className="text-3xl font-bold">Project 1</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac
              sodales id, porttitor vitae est. Donec laoreet rutrum libero sed
              pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.
              Praesent non urna non mauris laoreet ultricies eget at enim.
              Phasellus lacus odio, ullamcorper ac ipsum in, tincidunt tincidunt
              massa. Suspendisse ut malesuada sapien, vitae mollis diam.
              Suspendisse tristique et ex non faucibus. Pellentesque a urna
              risus.
            </p>
          </div>
        </div>
        <div
          className={` ${
            onlyImage.image2
              ? "grid-cols-1 justify-self-center overflow-hidden"
              : "grid-cols-1"
          } col-span-1 grid relative z-0 ease-in duration-300 `}
          onClick={() =>
            setOnlyImage({
              image1: true,
              image2: !onlyImage.image2,
              image3: true,
            })
          }
        >
          <div className={` ${onlyImage.image2 ? "" : "block"} col-span-1  `}>
            <Image
              aria-hidden
              src="/dummy.jpg"
              alt="project 1"
              width={1000}
              height={1000}
              className=""
            />
          </div>
          <div
            className={` ${
              onlyImage.image2 ? " opacity-0" : " opacity-100"
            } col-span-1 absolute left-0 z-1 bg-black bg-opacity-70 h-full p-10 ease-in duration-300 transition-opacity space-y-2 overflow-scroll text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
          >
            <p className="text-3xl font-bold">Project 1</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac
              sodales id, porttitor vitae est. Donec laoreet rutrum libero sed
              pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.
              Praesent non urna non mauris laoreet ultricies eget at enim.
              Phasellus lacus odio, ullamcorper ac ipsum in, tincidunt tincidunt
              massa. Suspendisse ut malesuada sapien, vitae mollis diam.
              Suspendisse tristique et ex non faucibus. Pellentesque a urna
              risus.
            </p>
          </div>
        </div>
        <div
          className={` ${
            onlyImage.image3
              ? "grid-cols-1 justify-self-center overflow-hidden"
              : "grid-cols-1"
          } col-span-1 grid relative z-0 ease-in duration-300 `}
          onClick={() =>
            setOnlyImage({
              image1: true,
              image2: true,
              image3: !onlyImage.image3,
            })
          }
        >
          <div className={` ${onlyImage.image3 ? "" : "block"} col-span-1  `}>
            <Image
              aria-hidden
              src="/dummy.jpg"
              alt="project 1"
              width={1000}
              height={1000}
              className=""
            />
          </div>
          <div
            className={` ${
              onlyImage.image3 ? " opacity-0" : " opacity-100"
            } col-span-1 absolute left-0 z-1 bg-black bg-opacity-70 h-full p-10 ease-in duration-300 transition-opacity space-y-2 overflow-scroll text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
          >
            <p className="text-3xl font-bold">Project 1</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac
              sodales id, porttitor vitae est. Donec laoreet rutrum libero sed
              pharetra. Duis a arcu convallis, gravida purus eget, mollis diam.
              Praesent non urna non mauris laoreet ultricies eget at enim.
              Phasellus lacus odio, ullamcorper ac ipsum in, tincidunt tincidunt
              massa. Suspendisse ut malesuada sapien, vitae mollis diam.
              Suspendisse tristique et ex non faucibus. Pellentesque a urna
              risus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
