"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faTrash,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";
import AccordionItem from "./AccordionItem";

interface Project {
  name: string;
  tech: string;
  description: string;
  github: string;
  live: string;
  image: string;
  images?: string[];
  visible?: boolean;
}

interface EditProjectsProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function EditProjects({ data, onChange }: EditProjectsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});

  const handleAddProject = () => {
    const newProject: Project = {
      name: "New Project",
      tech: "Technology Stack",
      description: "Project description",
      github: "#",
      live: "#",
      image: "",
      visible: true,
    };
    onChange([...data, newProject]);
  };

  const handleRemoveProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleToggleVisibility = (index: number) => {
    const updated = [...data];
    updated[index].visible = !updated[index].visible;
    onChange(updated);
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updated = [...data];
    (updated[index] as any)[field] = value;

    // If manually entering image path and it's not in images array, add it
    if (field === "image" && value) {
      const images = updated[index].images || [];
      if (!images.includes(value)) {
        updated[index].images = [value, ...images];
      }
    }

    onChange(updated);
  };

  const handleImageUpload = async (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading({ ...uploading, [index]: true });

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const result = await response.json();
        return result.path;
      });

      const uploadedPaths = await Promise.all(uploadPromises);
      const updated = [...data];
      const currentImages = updated[index].images || [];
      updated[index].images = [...currentImages, ...uploadedPaths];

      // Set first image as main image if not set
      if (!updated[index].image && uploadedPaths.length > 0) {
        updated[index].image = uploadedPaths[0];
      }

      onChange(updated);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading({ ...uploading, [index]: false });
    }
  };

  const handleRemoveImage = async (
    projectIndex: number,
    imageIndex: number
  ) => {
    const updated = [...data];
    const images = updated[projectIndex].images || [];
    const removedImage = images[imageIndex];

    // Delete image from server if it's in /project folder
    if (removedImage.startsWith("/project/")) {
      try {
        await fetch("/api/admin/delete-image", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imagePath: removedImage }),
        });
      } catch (error) {
        console.error("Failed to delete image from server:", error);
      }
    }

    images.splice(imageIndex, 1);
    updated[projectIndex].images = images;

    // Update main image if it was removed
    if (updated[projectIndex].image === removedImage) {
      updated[projectIndex].image = images[0] || "";
    }

    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faEdit} className="text-[#ff6b6b] text-xl" />
        <h2 className="text-2xl font-bold text-[#ff6b6b]">Edit Projects</h2>
      </div>

      <div className="space-y-4 mb-6">
        {data.map((project, index) => {
          // Ensure images array includes the main image
          const displayImages = project.images || [];
          if (project.image && !displayImages.includes(project.image)) {
            displayImages.unshift(project.image);
          }

          return (
            <AccordionItem
              key={index}
              isExpanded={expandedIndex === index}
              onToggle={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
              onDelete={() => handleRemoveProject(index)}
              borderColor="border-[#ff6b6b]"
              header={
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1">
                    <p className="font-bold text-[#00d9ff]">{project.name}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1.5 ${
                      project.visible !== false
                        ? "bg-accent-green bg-opacity-20 text-gray-900"
                        : "bg-[#a0a0a0] bg-opacity-20 "
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={project.visible !== false ? faEye : faEyeSlash}
                      className="w-3 h-3"
                    />
                    {project.visible !== false ? "Visible" : "Hidden"}
                  </span>
                </div>
              }
              subtitle={project.tech.split(",")[0]}
              showChevron={false}
            >
              <div className="space-y-4">
                {/* Visibility Toggle */}
                <div className="pb-4 border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10">
                  <button
                    onClick={() => handleToggleVisibility(index)}
                    className={`w-full px-4 py-2 rounded font-bold transition-all duration-200 flex items-center justify-center gap-2 hover:cursor-pointer ${
                      project.visible !== false
                        ? "bg-[#a0a0a0] bg-opacity-10 hover:bg-opacity-20 border-2 border-[#a0a0a0] border-opacity-30"
                        : "bg-accent-green bg-opacity-10 text-gray-900 hover:bg-opacity-20 border-2 border-accent-green border-opacity-30"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={project.visible !== false ? faEyeSlash : faEye}
                      className="w-4 h-4"
                    />
                    {project.visible !== false
                      ? "Hide Project from Portfolio"
                      : "Show Project in Portfolio"}
                  </button>
                </div>

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

                {/* Images */}
                <div>
                  <label className="text-xs font-bold text-[#bd93f9] block mb-2">
                    Project Images
                  </label>

                  {/* Upload Button */}
                  <div className="mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(index, e.target.files)}
                      className="hidden"
                      id={`image-upload-${index}`}
                      disabled={uploading[index]}
                    />
                    <label
                      htmlFor={`image-upload-${index}`}
                      className={`inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#bd93f9] text-[#bd93f9] rounded cursor-pointer hover:bg-[#bd93f9] hover:bg-opacity-10 transition-all duration-200 ${
                        uploading[index] ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      {uploading[index] ? "Uploading..." : "Upload Images"}
                    </label>
                    <p className="text-xs text-[#a0a0a0] mt-1">
                      Upload images to /public/project folder
                    </p>
                  </div>

                  {/* Image Gallery */}
                  {displayImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {displayImages.map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative group border-2 border-[#bd93f9] border-opacity-30 rounded overflow-hidden"
                        >
                          <Image
                            src={img}
                            alt={`${project.name} ${imgIndex + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3Ctext fill='%23666' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EError%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <button
                            onClick={() => handleRemoveImage(index, imgIndex)}
                            className="absolute top-1 right-1 p-1 bg-[#ff6b6b] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            title="Remove image"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="w-3 h-3"
                            />
                          </button>
                          {project.image === img && (
                            <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-accent-green text-[#0a0a0a] text-xs rounded font-bold">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Manual Image Path Input (fallback) */}
                  <div className="mt-3">
                    <label className="text-xs text-[#a0a0a0] block mb-1">
                      Or enter image path manually:
                    </label>
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) =>
                        handleFieldChange(index, "image", e.target.value)
                      }
                      className="w-full px-3 py-1 text-sm bg-[#ffffff] dark:bg-[#1a1a1a] border border-black dark:border-white border-opacity-20 rounded focus:outline-none focus:border-[#bd93f9]"
                      placeholder="/project/image.png"
                    />
                  </div>
                </div>
              </div>
            </AccordionItem>
          );
        })}
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
