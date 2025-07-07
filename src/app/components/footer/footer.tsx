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
    <footer
      id="footer"
      className="bg-neutral-800 py-2 text-white font-mono  mx-auto"
    >
      {/* <div className="col-span-2  border-b dark:border-neutral-100 border-neutral-950 mx-10 mt-4"></div> */}
      <div className="col-span-2 mx-10 py-4 text-center text-xs">
        <p>2025 AidilDev Copyright. All Rights Reserve.</p>
      </div>
    </footer>
  );
}
