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
    <footer id="footer">
      <div className="grid grid-cols-1 py-6 px-10 mt-12">
        <div className="col-span-1 grid-cols-2 grid">
          <div className="col-span-1">
            <p className="block mb-3 text-2xl">Contact me</p>
            <a className="" href="https://wa.me/6282388157890">
              {" "}
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="xl"
                className="pr-2"
              />{" "}
              +62-823-8815-7890
            </a>
            <br />
            <a className="" href="https://wa.me/6282388157890">
              {" "}
              <FontAwesomeIcon
                icon={faEnvelope}
                size="xl"
                className="pr-2"
              />{" "}
              aidil.fitra.work@gmail.com
            </a>
          </div>
          <div className="col-span-1">
            <p className="block mb-3 text-2xl">Let's Connect</p>
            <a className="" href="https://wa.me/6282388157890">
              {" "}
              <FontAwesomeIcon
                icon={faLinkedin}
                size="xl"
                className="pr-2"
              />{" "}
              LinkedIn
            </a>
            <br />
            <a className="" href="https://wa.me/6282388157890">
              {" "}
              <FontAwesomeIcon
                icon={faGithub}
                size="xl"
                className="pr-2"
              />{" "}
              Github
            </a>
          </div>
        </div>
      </div>
      <div className="col-span-2  border-b border-neutral-100 mx-10"></div>
      <div className="col-span-2 mx-10 my-4">
        <p>2025 Aidil Copyright. All Rights Reserve.</p>
      </div>
    </footer>
  );
}
