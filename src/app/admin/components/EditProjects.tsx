"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Project {
  name: string;
  tech: string;
  description: string;
  github: string;
  live: string;
  image: string;
}

interface EditProjectsProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function EditProjects({ data, onChange }: EditProjectsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAddProject = () => {
    const newProject: Project = {
      name: "New Project",
      tech: "Technology Stack",
      description: "Project description",
      github: "#",
      live: "#",
      image: "",
    };
    onChange([...data, newProject]);
  };

  const handleRemoveProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updated = [...data];
    (updated[index] as any)[field] = value;
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-[#ff6b6b] text-xl" />
        <h2 className="text-2xl font-bold text-[#ff6b6b]">Edit Projects</h2>
      </div>

      <div className="space-y-4 mb-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="border-l-4 border-[#ff6b6b] rounded-r-lg overflow-hidden bg-[#f5f1e8] dark:bg-[#0a0a0a]"
          >
            <div className="flex items-center justify-between hover:bg-black hover:bg-opacity-5 transition-colors duration-200">
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="flex-1 p-4 flex items-center justify-between  transition-colors duration-200 text-left"
              >
                <div>
                  <p className="font-bold text-[#00d9ff]">{project.name}</p>
                  <p className="text-xs text-[#a0a0a0]">
                    {project.tech.split(",")[0]}
                  </p>
                </div>
              </button>
              <div className="p-4">
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="p-2 text-[#ff6b6b] hover:bg-[#ff6b6b] hover:bg-opacity-20 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedIndex === index
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 pb-4 border-t border-black border-opacity-10 dark:border-white dark:border-opacity-10">
                <div className="space-y-4 pt-4">
                  {/* Project Name */}
                  <div>
                    <label className="text-xs font-bold text-[#00d9ff]">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        handleFieldChange(index, "name", e.target.value)
                      }
                      className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#00d9ff]"
                    />
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className="text-xs font-bold text-accent-green">
                      Technology Stack
                    </label>
                    <input
                      type="text"
                      value={project.tech}
                      onChange={(e) =>
                        handleFieldChange(index, "tech", e.target.value)
                      }
                      className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-accent-green"
                      placeholder="React.js, Node.js, MongoDB"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-bold text-[#ffb000]">
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        handleFieldChange(index, "description", e.target.value)
                      }
                      rows={3}
                      className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#ffb000] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* GitHub Link */}
                    <div>
                      <label className="text-xs font-bold text-[#ff6b6b]">
                        GitHub URL
                      </label>
                      <input
                        type="text"
                        value={project.github}
                        onChange={(e) =>
                          handleFieldChange(index, "github", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#ff6b6b]"
                      />
                    </div>

                    {/* Live Demo Link */}
                    <div>
                      <label className="text-xs font-bold text-[#00d9ff]">
                        Live Demo URL
                      </label>
                      <input
                        type="text"
                        value={project.live}
                        onChange={(e) =>
                          handleFieldChange(index, "live", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#00d9ff]"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="text-xs font-bold text-[#bd93f9]">
                      Image Path (e.g. /project/vitour.png)
                    </label>
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) =>
                        handleFieldChange(index, "image", e.target.value)
                      }
                      className="w-full mt-1 px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#bd93f9]"
                    />
                    {project.image && (
                      <div className="mt-2 p-2 rounded bg-black bg-opacity-5">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="max-w-full h-auto max-h-48 rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddProject}
        className="w-full py-3 px-4 border-2 border-dashed border-[#ff6b6b] text-[#ff6b6b] rounded font-bold hover:bg-[#ff6b6b] hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}
