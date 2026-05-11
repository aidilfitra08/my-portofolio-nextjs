import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faHandshake, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ContactMe() {
  return (
    <section className="py-12 md:py-16 px-4 mb-8" id="contact-me">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-3 mb-6 [data-theme=neobrutalism]:neo-section-header [data-theme=neobrutalism]:flex-col [data-theme=neobrutalism]:justify-center">
          <FontAwesomeIcon
            icon={faHandshake}
            className="text-2xl md:text-3xl text-[#00d9ff] [data-theme=neobrutalism]:text-[var(--foreground)]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#00d9ff] [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-900 [data-theme=neobrutalism]:border-b-4 [data-theme=neobrutalism]:padding-b-5">
            Get In Touch
          </h2>
        </div>

        {/* Description */}
        <div className="vintage-card dark:bg-[#1a1a1a] rounded-lg p-8 border-2 border-[#00d9ff] border-opacity-30 mb-8 text-center bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-card [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-3">
          <p className="text-base md:text-lg text-[var(--foreground)] max-w-2xl mx-auto leading-relaxed">
            <span className="text-[#ff6b6b] font-bold [data-theme=neobrutalism]:hidden">&gt;&gt;</span> I&apos;m
            always interested in{" "}
            <span className="text-accent-green font-semibold [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-bold">
              new opportunities
            </span>{" "}
            and{" "}
            <span className="text-accent-green font-semibold [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-bold">
              collaborations
            </span>
            . Let&apos;s build something{" "}
            <span className="text-[#ffb000] font-semibold [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-bold">amazing</span>{" "}
            together!
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
          <Link
            href="mailto:aidil.fitra.work@gmail.com"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 vintage-card dark:bg-[#1a1a1a] hover:bg-[#00d9ff] dark:hover:bg-[#00d9ff] border-2 border-[#00d9ff] px-6 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-pill [data-theme=neobrutalism]:rounded-none"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-lg text-[#00d9ff] group-hover:text-[#1a1a1a] transition-colors [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:group-hover:text-[var(--background)]"
            />
            <span className="font-semibold text-[var(--foreground)] group-hover:text-[#1a1a1a] transition-colors [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:group-hover:text-[var(--background)]">
              Email Me
            </span>
          </Link>

          <Link
            href="https://github.com/aidilfitra08"
            target="_blank"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 vintage-card dark:bg-[#1a1a1a] hover:bg-[#2a2a2a] dark:hover:bg-[#2a2a2a] border-2 border-[#2a2a2a] dark:border-[#a0a0a0] px-6 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-pill [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-[var(--foreground)]"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-lg text-[var(--foreground)] group-hover:text-white transition-colors [data-theme=neobrutalism]:group-hover:text-[var(--background)]"
            />
            <span className="font-semibold text-[var(--foreground)] group-hover:text-white transition-colors [data-theme=neobrutalism]:group-hover:text-[var(--background)]">
              GitHub
            </span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/aidil-fitra"
            target="_blank"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 vintage-card dark:bg-[#1a1a1a] hover:bg-[#0077b5] dark:hover:bg-[#0077b5] border-2 border-[#0077b5] px-6 py-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-pill [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-[var(--foreground)]"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-lg text-[#0077b5] group-hover:text-white transition-colors [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:group-hover:text-[var(--background)]"
            />
            <span className="font-semibold text-[var(--foreground)] group-hover:text-white transition-colors [data-theme=neobrutalism]:group-hover:text-[var(--background)]">
              LinkedIn
            </span>
          </Link>
        </div>

        {/* Terminal-style footer */}
        <div className="mt-12 text-center text-sm text-[var(--foreground)] font-mono opacity-60 [data-theme=neobrutalism]:opacity-100">
          <span className="text-[#ff6b6b] [data-theme=neobrutalism]:text-[var(--foreground)]">$</span> echo "Looking forward to
          hearing from you!"
          <br />
          <span className="text-accent-green animate-pulse [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:animate-none">▊</span>
        </div>
      </div>
    </section>
  );
}
