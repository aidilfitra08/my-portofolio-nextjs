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
      color: "text-green-400",
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Flutter", "TypeScript"],
      color: "text-blue-400",
    },
    {
      category: "Database",
      items: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
      color: "text-yellow-400",
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "AWS", "Vercel"],
      color: "text-purple-400",
    },
    {
      category: "Others",
      items: ["RabbitMQ"],
      color: "text-pink-400",
    },
  ];

  return (
    <section className="py-6 px-4" id="skill">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-normal mb-4" style={{ fontSize: "16px" }}>
          <span className="text-pink-400">const</span>
          <span className="text-white"> skills </span>
          <span className="text-pink-400">=</span>
          <span className="text-white"> &#123;</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4 ml-4">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="bg-neutral-700 rounded-lg p-4 border border-gray-700"
            >
              <h3
                className={`text-sm font-normal mb-3 ${skillGroup.color}`}
                style={{ fontSize: "14px" }}
              >
                {skillGroup.category}:
              </h3>
              <div className="space-y-1">
                {skillGroup.items.map((skill, idx) => (
                  <div key={idx} className="flex items-center">
                    <span
                      className="text-pink-400 mr-2"
                      style={{ fontSize: "12px" }}
                    >
                      -
                    </span>
                    <span
                      className="text-green-300"
                      style={{ fontSize: "13px" }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <span className="text-white" style={{ fontSize: "16px" }}>
            &#125;
          </span>
        </div>
      </div>
    </section>
  );
}
