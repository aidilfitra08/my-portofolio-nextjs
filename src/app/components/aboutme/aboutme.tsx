import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="pt-16 grid grid-cols-2  h-[700px] items-center font-mono relative max-md:h-[600px] overflow-hidden">
      <div className="z-10 col-span-1 p-28 grid grid-cols-1 max-md:col-span-2 max-md:px-10 max-md:py-16 ">
        <p className="text-6xl font-bold col-span-1 max-md:text-5xl">
          Hello, <br /> I am <span className="font-extrabold">Aidil</span>
        </p>
        <p className="col-span-1 mt-6">
          I&apos;m a Computer Science graduate with experience in backend, web,
          and mobile development. I&apos;m skilled in technologies like
          CodeIgniter, Flutter, Node.js, React, Golang, MySQL, and MongoDB.
        </p>
        {/* <div>My main skill</div> */}
        <p className=" col-span-1 mt-8">
          <Link
            href="https://drive.google.com/file/d/1pqhiifwNNwLfHYseyYW-aAYH52E78ms3/view?usp=sharing"
            className=" bg-neutral-800 text-white p-3 hover:bg-white hover:text-black ease-in-out duration-300"
          >
            Curriculum Vitae
          </Link>
        </p>
        <div className="col-span-1 flex mt-8 space-x-2">
          <Link className="" href="https://www.linkedin.com/in/aidil-fitra">
            {" "}
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2xl"
              className="pr-2"
            />{" "}
          </Link>
          <Link className="" href="https://github.com/aidilfitra08">
            {" "}
            <FontAwesomeIcon icon={faGithub} size="2xl" className="pr-2" />{" "}
          </Link>
        </div>
      </div>
      <div className="z-0 col-span-1 object-fill overflow-hidden h-full max-md:absolute max-md:top-[165px]">
        <Image
          aria-hidden
          src="/me.png"
          alt="Globe icon"
          width={1000}
          height={1000}
          className="mt-16 max-md:opacity-20"
          priority={true}
        />
      </div>
    </div>
  );
}
