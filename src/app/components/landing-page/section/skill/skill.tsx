import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faCode,
  faDatabase,
  faTools,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import { loadPortfolioData } from "@/lib/portfolio";

const iconMap: Record<string, any> = {
  faServer,
  faCode,
  faDatabase,
  faTools,
  faCubes,
};

interface SkillGroup {
  category: string;
  items: string[];
  color: string;
  bgColor: string;
  icon: string;
}

export default async function Skill() {
  const data = await loadPortfolioData();
  const skills: SkillGroup[] = data?.skills || [];

  return (
    <section className="py-8 md:py-12 px-4" id="skill">
      <div className="max-w-7xl mx-auto">
        {/* Section header with code-style syntax */}
        <div className="mb-8 [data-theme=neobrutalism]:neo-section-header">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 [data-theme=neobrutalism]:border-none [data-theme=neobrutalism]:padding-none">
            <span className="text-[#ff6b6b] [data-theme=neobrutalism]:text-[var(--foreground)]">const</span>
            <span className="text-[var(--foreground)]"> skills </span>
            <span className="text-[#ff6b6b] [data-theme=neobrutalism]:text-[var(--foreground)]">=</span>
            <span className="text-[var(--foreground)]"> &#123;</span>
          </h2>
        </div>

        {/* Skills grid - responsive and space-efficient */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 ml-0 md:ml-6">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="group vintage-card dark:bg-[#1a1a1a] rounded-lg p-5 border-2 border-[var(--border-color)] border-opacity-20 dark:border-opacity-20 hover:border-opacity-100 dark:hover:border-opacity-60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-[var(--background)] text-[var(--foreground)] [data-theme=neobrutalism]:neo-card [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:p-4 [data-theme=neobrutalism]:border-2"
            >
              {/* Category header with icon */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--border-color)] border-opacity-20">
                <div
                  className={`w-10 h-10 rounded-lg ${skillGroup.bgColor} bg-opacity-20 flex items-center justify-center [data-theme=neobrutalism]:neo-icon-box [data-theme=neobrutalism]:bg-[var(--background)] [data-theme=neobrutalism]:w-12 [data-theme=neobrutalism]:h-12 [data-theme=neobrutalism]:rounded-none [data-theme=neobrutalism]:margin-0`}
                >
                  <FontAwesomeIcon
                    icon={iconMap[skillGroup.icon] || faCode}
                    className={`${skillGroup.color} text-lg [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:text-2xl`}
                  />
                </div>
                <h3
                  className={`text-base md:text-lg font-bold ${skillGroup.color} [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:text-lg [data-theme=neobrutalism]:font-900`}
                >
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-2">
                {skillGroup.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center group/item hover:translate-x-1 transition-transform duration-200 [data-theme=neobrutalism]:neo-list-item [data-theme=neobrutalism]:padding-0 [data-theme=neobrutalism]:margin-2 [data-theme=neobrutalism]:border-l-3"
                  >
                    <span className="text-[#ff6b6b] mr-3 text-xs [data-theme=neobrutalism]:hidden">►</span>
                    <span className="text-sm md:text-base text-[var(--foreground)] group-hover/item:text-accent-green transition-colors [data-theme=neobrutalism]:text-[var(--foreground)] [data-theme=neobrutalism]:group-hover/item:text-[var(--foreground)]">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div
                className={`mt-4 pt-3 border-t border-[var(--border-color)] border-opacity-20 [data-theme=neobrutalism]:border-t-2`}
              >
                <div className="flex justify-end">
                  <span className="text-xs text-[var(--foreground)] opacity-60">
                    [{skillGroup.items.length} skill
                    {skillGroup.items.length > 1 ? "s" : ""}]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing brace */}
        <div className="mt-6">
          <span className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">
            &#125;
          </span>
        </div>
      </div>
    </section>
  );
}
