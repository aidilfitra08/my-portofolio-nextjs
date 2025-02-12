import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="pt-16 grid grid-cols-2  h-[700px] items-center font-mono">
      <div className="col-span-1 p-28">
        <p className="text-6xl font-bold">
          Hello, <br /> I am <span className="font-extrabold">Aidil</span>
        </p>
        <p>
          I&apos;m a Computer Science graduate with experience in backend, web,
          and mobile development. I&apos;m skilled in technologies like
          CodeIgniter, Flutter, Node.js, React, Golang, MySQL, and MongoDB.
        </p>
        {/* <div>My main skill</div> */}
        <p className="mt-6">
          <Link
            href="https://drive.google.com/file/d/1pqhiifwNNwLfHYseyYW-aAYH52E78ms3/view?usp=sharing"
            className=" bg-neutral-800 text-white p-3 hover:bg-white hover:text-black ease-in-out duration-300"
          >
            Curriculum Vitae
          </Link>
        </p>
      </div>
      <div className="col-span-1 object-fill overflow-hidden h-full">
        <Image
          aria-hidden
          src="/me.png"
          alt="Globe icon"
          width={1000}
          height={1000}
          className="mt-16"
        />
      </div>
    </div>
  );
}
