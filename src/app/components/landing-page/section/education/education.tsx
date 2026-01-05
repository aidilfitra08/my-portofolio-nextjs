import {
  faCalendarDays,
  faGraduationCap,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadPortfolioData } from "@/lib/portfolio";

export default async function Education() {
  const data = await loadPortfolioData();
  const education = data?.education || {
    university: "Padjadjaran University",
    degree: "Bachelor of Computer Science",
    gpa: "3.60/4.00",
    startDate: "August 2019",
    endDate: "August 2024",
    location: "Indonesia",
  };

  return (
    <section className="py-4 px-4">
      <div className="w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="text-2xl text-[#bd93f9]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#bd93f9]">
            Education
          </h2>
        </div>

        {/* Education Card */}
        <div className="vintage-card dark:bg-[#1a1a1a] rounded-lg p-6 border-l-4 border-[#bd93f9] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* University Name */}
          <h3 className="text-xl md:text-2xl font-bold text-[#00d9ff] mb-3 flex items-center gap-2">
            <span className="text-[#ff6b6b]">[</span>
            {education.university}
            <span className="text-[#ff6b6b]">]</span>
          </h3>

          {/* Degree & GPA */}
          <div className="flex items-start gap-2 mb-3">
            <FontAwesomeIcon icon={faTrophy} className="text-[#ffb000] mt-1" />
            <p className="text-base md:text-lg text-[#2a2a2a] dark:text-accent-green font-semibold">
              {education.degree}
              <span className="ml-3 text-[#ffb000]">GPA: {education.gpa}</span>
            </p>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm md:text-base text-[#2a2a2a] dark:text-[#a0a0a0]">
            <FontAwesomeIcon icon={faCalendarDays} className="text-[#ff6b6b]" />
            <span>
              {education.startDate} - {education.endDate}
            </span>
            <span className="ml-2 text-accent-green">●</span>
            <span>{education.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
