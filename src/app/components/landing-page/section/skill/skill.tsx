import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faCode,
  faDatabase,
  faTools,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";

export default function Skill() {
  const skills = [
    {
      category: "Backend",
      items: [
        "Node.js",
        "Golang",
        "CodeIgniter",
        "Express.js",
        "Java",
        "Laravel",
      ],
      color: "text-accent-green",
      bgColor: "bg-accent-green",
      icon: faServer,
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Flutter", "TypeScript"],
      color: "text-[#00d9ff]",
      bgColor: "bg-[#00d9ff]",
      icon: faCode,
    },
    {
      category: "Database",
      items: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
      color: "text-[#ffb000]",
      bgColor: "bg-[#ffb000]",
      icon: faDatabase,
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "AWS", "Vercel"],
      color: "text-[#ff6b6b]",
      bgColor: "bg-[#ff6b6b]",
      icon: faTools,
    },
    {
      category: "Others",
      items: ["RabbitMQ"],
      color: "text-[#bd93f9]",
      bgColor: "bg-[#bd93f9]",
      icon: faCubes,
    },
  ];

  return (
    <section className="py-8 md:py-12 px-4" id="skill">
      <div className="max-w-7xl mx-auto">
        {/* Section header with code-style syntax */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-[#ff6b6b]">const</span>
            <span className="text-[#2a2a2a] dark:text-[#e0e0e0]"> skills </span>
            <span className="text-[#ff6b6b]">=</span>
            <span className="text-[#2a2a2a] dark:text-[#e0e0e0]"> &#123;</span>
          </h2>
        </div>

        {/* Skills grid - responsive and space-efficient */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 ml-0 md:ml-6">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="group vintage-card dark:bg-[#1a1a1a] rounded-lg p-5 border-2 border-[#2a2a2a] dark:border-accent-green border-opacity-20 dark:border-opacity-20 hover:border-opacity-100 dark:hover:border-opacity-60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Category header with icon */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#2a2a2a] dark:border-[#404040] border-opacity-20">
                <div
                  className={`w-10 h-10 rounded-lg ${skillGroup.bgColor} bg-opacity-20 flex items-center justify-center`}
                >
                  <FontAwesomeIcon
                    icon={skillGroup.icon}
                    className={`${skillGroup.color} text-lg`}
                  />
                </div>
                <h3
                  className={`text-base md:text-lg font-bold ${skillGroup.color}`}
                >
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-2">
                {skillGroup.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center group/item hover:translate-x-1 transition-transform duration-200"
                  >
                    <span className="text-[#ff6b6b] mr-3 text-xs">►</span>
                    <span className="text-sm md:text-base text-[#2a2a2a] dark:text-[#c0c0c0] group-hover/item:text-accent-green transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div
                className={`mt-4 pt-3 border-t border-[#2a2a2a] dark:border-[#404040] border-opacity-20`}
              >
                <div className="flex justify-end">
                  <span className="text-xs text-[#2a2a2a] dark:text-[#606060]">
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
          <span className="text-2xl md:text-3xl font-bold text-[#2a2a2a] dark:text-[#e0e0e0]">
            &#125;
          </span>
        </div>
      </div>
    </section>
  );
}
