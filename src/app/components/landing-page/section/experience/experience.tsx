import {
  faBuilding,
  faBriefcase,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadPortfolioData } from "@/lib/portfolio";

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export default async function Experience() {
  const data = await loadPortfolioData();
  const experiences: Experience[] = data?.experience || [];

  return (
    <section className="py-6 px-4">
      <div className="w-full">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-6 [data-theme=neobrutalism]:neo-section-header [data-theme=neobrutalism]:flex-col [data-theme=neobrutalism]:items-start">
          <FontAwesomeIcon
            icon={faBriefcase}
            className="text-2xl text-[#ffb000] [data-theme=neobrutalism]:text-[var(--foreground)]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#ffb000] [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-900">
            Experience
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="vintage-card dark:bg-[#1a1a1a] rounded-lg p-6 border-l-4 border-[#ffb000] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-card [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:border-l-none [data-theme=neobrutalism]:border-3 [data-theme=neobrutalism]:border-t-none [data-theme=neobrutalism]:border-r-none [data-theme=neobrutalism]:border-b-3"
            >
              {/* Header with title and date */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#00d9ff] flex items-center gap-2 [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:font-900">
                  <span className="text-[#ff6b6b] [data-theme=neobrutalism]:hidden">&gt;&gt;</span>
                  {exp.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--foreground)] opacity-60">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="text-[#ff6b6b] [data-theme=neobrutalism]:text-[var(--foreground)]"
                  />
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
              </div>

              {/* Company */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[var(--border-color)] border-opacity-20 [data-theme=neobrutalism]:border-b-2">
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="text-accent-green [data-theme=neobrutalism]:text-[var(--foreground)]"
                />
                <span className="text-base md:text-lg font-semibold text-[var(--foreground)] [data-theme=neobrutalism]:font-bold">
                  {exp.company} - {exp.location}
                </span>
              </div>

              {/* Responsibilities */}
              <ul className="space-y-3 text-sm md:text-base text-[var(--foreground)]">
                {exp.responsibilities.map((responsibility, respIndex) => (
                  <li
                    key={respIndex}
                    className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-200 [data-theme=neobrutalism]:neo-list-item [data-theme=neobrutalism]:padding-0 [data-theme=neobrutalism]:margin-2"
                  >
                    <span className="text-[#ff6b6b] font-bold mt-1 shrink-0 [data-theme=neobrutalism]:hidden">
                      ►
                    </span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
