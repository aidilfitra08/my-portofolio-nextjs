import {
  faBuilding,
  faBriefcase,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Experience() {
  return (
    <section className="py-6 px-4">
      <div className="w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon
            icon={faBriefcase}
            className="text-2xl text-[#ffb000]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#ffb000]">
            Experience
          </h2>
        </div>

        {/* Experience Card */}
        <div className="vintage-card dark:bg-[#1a1a1a] rounded-lg p-6 border-l-4 border-[#ffb000] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* Header with title and date */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#00d9ff] flex items-center gap-2">
              <span className="text-[#ff6b6b]">&gt;&gt;</span>
              Back End Developer Intern
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#2a2a2a] dark:text-[#a0a0a0]">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="text-[#ff6b6b]"
              />
              <span>Feb 2022 - July 2022</span>
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#2a2a2a] dark:border-[#404040] border-opacity-20">
            <FontAwesomeIcon icon={faBuilding} className="text-accent-green" />
            <span className="text-base md:text-lg font-semibold text-[#2a2a2a] dark:text-accent-green">
              Vocasia - Indonesia
            </span>
          </div>

          {/* Responsibilities */}
          <ul className="space-y-3 text-sm md:text-base text-[#2a2a2a] dark:text-[#c0c0c0]">
            <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200">
              <span className="text-[#ff6b6b] font-bold mt-1 shrink-0">►</span>
              <span>
                Developed and integrated{" "}
                <span className="text-accent-green dark:text-accent-green  font-semibold">
                  15 new APIs
                </span>{" "}
                for Vocasia&apos;s website and mobile applications using{" "}
                <span className="text-[#00d9ff] font-semibold">
                  CodeIgniter 4
                </span>{" "}
                and <span className="text-[#00d9ff] font-semibold">MySQL</span>
              </span>
            </li>
            <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200">
              <span className="text-[#ff6b6b] font-bold mt-1 shrink-0">►</span>
              <span>
                Resolved frontend API fetching issues for both{" "}
                <span className="text-[#00d9ff] font-semibold">React.js</span>{" "}
                (web) and{" "}
                <span className="text-[#00d9ff] font-semibold">Flutter</span>{" "}
                (mobile) applications
              </span>
            </li>
            <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200">
              <span className="text-[#ff6b6b] font-bold mt-1 shrink-0">►</span>
              <span>
                Debugged and fixed existing APIs, ensuring seamless
                functionality across platforms
              </span>
            </li>
            <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200">
              <span className="text-[#ff6b6b] font-bold mt-1 shrink-0">►</span>
              <span>
                Collaborated with the frontend team to ensure smooth integration
                between backend and frontend systems
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
