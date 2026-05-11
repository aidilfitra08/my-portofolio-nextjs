import {
  faCalendarDays,
  faGraduationCap,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadPortfolioData } from "@/lib/portfolio";

interface Education {
  university: string;
  degree: string;
  gpa: string;
  startDate: string;
  endDate: string;
  location: string;
}

export default async function Education() {
  const data = await loadPortfolioData();
  const educationList: Education[] = Array.isArray(data?.education)
    ? data.education
    : data?.education
    ? [data.education]
    : [];

  return (
    <section className="py-4 px-4">
      <div className="w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-6 [data-theme=neobrutalism]:neo-section-header [data-theme=neobrutalism]:flex-col [data-theme=neobrutalism]:items-start">
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="text-2xl text-[#bd93f9] [data-theme=neobrutalism]:text-[var(--foreground)]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#bd93f9] [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-900">
            Education
          </h2>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {educationList.map((education, index) => (
            <div
              key={index}
              className="vintage-card dark:bg-[#1a1a1a] rounded-lg p-6 border-l-4 border-[#bd93f9] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-card [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-l-none [data-theme=neobrutalism]:border-3 [data-theme=neobrutalism]:border-t-none [data-theme=neobrutalism]:border-r-none [data-theme=neobrutalism]:border-b-3"
            >
              {/* University Name */}
              <h3 className="text-xl md:text-2xl font-bold text-[#00d9ff] mb-3 flex items-center gap-2 [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-900">
                <span className="text-[#ff6b6b] [data-theme=neobrutalism]:hidden">[</span>
                {education.university}
                <span className="text-[#ff6b6b] [data-theme=neobrutalism]:hidden]">]</span>
              </h3>

              {/* Degree & GPA */}
              <div className="flex items-start gap-2 mb-3">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="text-[#ffb000] mt-1 [data-theme=neobrutalism]:text-[var(--foreground)]"
                />
                <p className="text-base md:text-lg text-[var(--foreground)] font-semibold [data-theme=neobrutalism]:font-bold">
                  {education.degree}
                  <span className="ml-3 text-[#ffb000] [data-theme=neobrutalism]:text-[var(--foreground)]">
                    GPA: {education.gpa}
                  </span>
                </p>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm md:text-base text-[var(--foreground)] opacity-60">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-[#ff6b6b] [data-theme=neobrutalism]:text-[var(--foreground)]"
                />
                <span>
                  {education.startDate} - {education.endDate}
                </span>
                <span className="ml-2 text-accent-green [data-theme=neobrutalism]:text-[var(--foreground)]">●</span>
                <span>{education.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
