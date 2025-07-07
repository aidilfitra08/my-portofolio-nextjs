import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ContactMe() {
  return (
    <section className="py-6 px-4" id="contact-me">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-lg font-bold mb-4">
          <span className="text-cyan-900 dark:text-cyan-400">Get In Touch</span>
        </h2>

        <p className="text-neutral-900 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          I&apos;m always interested in new opportunities and collaborations.
          Let&apos;s build something amazing together!
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="mailto:aidil.fitra.work@gmail.com"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            style={{ fontSize: "12px" }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Email</span>
          </Link>
          <Link
            href="https://github.com/aidilfitra08"
            target="_blank"
            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            style={{ fontSize: "12px" }}
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/aidil-fitra"
            target="_blank"
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
            style={{ fontSize: "12px" }}
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span>LinkedIn</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
