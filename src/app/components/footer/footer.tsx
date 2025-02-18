import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-neutral-900 py-2 text-white font-mono">
      <div className="grid grid-cols-1 pb-6 px-10 mt-12">
        <div className="col-span-1 grid-cols-2 grid">
          <div className="col-span-1 space-y-2 max-md:col-span-2">
            <p className="block mb-6 text-2xl">Contact me</p>
            <p>
              <Link className="" href="https://wa.me/6282388157890">
                {" "}
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  size="xl"
                  className="pr-2"
                />{" "}
                +62-823-8815-7890
              </Link>
            </p>
            <p>
              <Link className="" href="https://wa.me/6282388157890">
                {" "}
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="xl"
                  className="pr-2"
                />{" "}
                aidil.fitra.work@gmail.com
              </Link>
            </p>
          </div>
          <div className="col-span-1 space-y-2 max-md:col-span-2 max-md:mt-10">
            <p className="block mb-6 text-2xl">Let&apos;s Connect</p>
            <p>
              <Link className="" href="https://www.linkedin.com/in/aidil-fitra">
                {" "}
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="xl"
                  className="pr-2"
                />{" "}
                LinkedIn
              </Link>
            </p>
            <p>
              <Link className="" href="https://github.com/aidilfitra08">
                {" "}
                <FontAwesomeIcon
                  icon={faGithub}
                  size="xl"
                  className="pr-2"
                />{" "}
                Github
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2  border-b dark:border-neutral-100 border-neutral-950 mx-10 mt-4"></div>
      <div className="col-span-2 mx-10 py-4">
        <p>2025 AidilDev Copyright. All Rights Reserve.</p>
      </div>
    </footer>
  );
}
