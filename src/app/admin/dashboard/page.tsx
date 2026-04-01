"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, clearAuthToken, isAuthenticated } from "@/lib/auth";
import { loadPortfolioData, savePortfolioData } from "@/lib/portfolio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faTerminal,
  faDatabase,
  faSave,
  faRefresh,
  faCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import EditHeader from "../components/EditHeader";
import EditSkills from "../components/EditSkills";
import EditEducation from "../components/EditEducation";
import EditExperience from "../components/EditExperience";
import EditProjects from "../components/EditProjects";
// import EditHeader from "@/app/admin/components/EditHeader";
// import EditSkills from "@/app/admin/components/EditSkills";
// import EditEducation from "@/app/admin/components/EditEducation";
// import EditExperience from "@/app/admin/components/EditExperience";
// import EditProjects from "@/app/admin/components/EditProjects";

type TabType = "header" | "skills" | "education" | "experience" | "projects";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>("header");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [saveMessage, setSaveMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        router.push("/admin/login");
        return;
      }

      setIsAuthed(true);

      // Load portfolio data
      const portfolioData = await loadPortfolioData();
      if (portfolioData) {
        setData(portfolioData);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    clearAuthToken();
    router.push("/admin/login");
  };

  const handleSave = async () => {
    if (!data) return;

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const token = getAuthToken();
      const response = await fetch("/api/admin/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSaveStatus("success");
        setSaveMessage("Portfolio data saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
        setSaveMessage("Failed to save portfolio data");
      }
    } catch (error) {
      setSaveStatus("error");
      setSaveMessage("Error saving data");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDataChange = (section: string, newData: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: newData,
    }));
  };

  const listenScrollEvent = (e: Event) => {
    const window = e.currentTarget as Window;
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] flex items-center justify-center font-mono">
        <div className="text-center">
          <div className="text-4xl text-accent-green mb-4 animate-spin">⟳</div>
          <p className="text-[#2a2a2a] dark:text-[#e0e0e0]">
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthed || !data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] dark:bg-[#0d0d0d] text-[#2a2a2a] dark:text-[#e0e0e0] font-mono">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header Bar */}
        <div
          className={` border-b-2 border-accent-green shadow-lg sticky top-0 z-50 ${
            isScrolled ? "bg-[#f5f1e8] dark:bg-[#0d0d0d]" : "bg-transparent"
          } transition-all duration-100`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faTerminal}
                className="text-accent-green text-xl"
              />
              <h1 className="text-xl font-bold text-accent-green">
                PORTFOLIO ADMIN
              </h1>
              <span className="text-xs text-[#a0a0a0]">v1.0</span>
            </div>

            <div className="flex items-center gap-4">
              {saveStatus !== "idle" && (
                <div
                  className={`flex items-center gap-2 text-sm px-3 py-1 rounded ${
                    saveStatus === "success"
                      ? "bg-accent-green bg-opacity-20 text-gray-900"
                      : "bg-[#ff6b6b] bg-opacity-20 text-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={saveStatus === "success" ? faCheck : faX}
                    className="w-4 h-4"
                  />
                  {saveMessage}
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 text-accent-green font-bold rounded transition-all duration-200 disabled:opacity-50 border-2 border-accent-green hover:bg-accent-green hover:text-white hover:cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={isSaving ? faRefresh : faSave}
                  className={isSaving ? "animate-spin" : ""}
                />
                {isSaving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-[#ff6b6b] hover:bg-[#ff6b6b] border-2 border-[#ff6b6b] hover:bg-opacity-20 rounded transition-colors duration-200 hover:text-white hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faSignOut} className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="vintage-card dark:bg-[#1a1a1a] rounded-lg border-2 border-[#2a2a2a] dark:border-accent-green border-opacity-20 dark:border-opacity-20 overflow-hidden sticky top-20">
                <div className="p-4 border-b border-[#2a2a2a] dark:border-accent-green border-opacity-20">
                  <h3 className="text-sm font-bold text-accent-green flex items-center gap-2">
                    <FontAwesomeIcon icon={faDatabase} className="w-4 h-4" />
                    SECTIONS
                  </h3>
                </div>

                <nav className="space-y-0">
                  {[
                    { id: "header", label: "Header / About" },
                    { id: "skills", label: "Skills" },
                    { id: "education", label: "Education" },
                    { id: "experience", label: "Experience" },
                    { id: "projects", label: "Projects" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabType)}
                      className={`w-full text-left px-4 py-3 text-sm border-l-2 transition-all duration-200 ${
                        activeTab === item.id
                          ? "border-accent-green bg-accent-green bg-opacity-10 text-gray-700 font-bold"
                          : "border-transparent text-[#2a2a2a] dark:text-[#a0a0a0] hover:text-gray-700 hover:bg-accent-green hover:bg-opacity-5"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="vintage-card dark:bg-[#1a1a1a] rounded-lg border-2 border-[#2a2a2a] dark:border-accent-green border-opacity-20 dark:border-opacity-20 p-6">
                {activeTab === "header" && (
                  <EditHeader
                    data={data.header}
                    onChange={(updated) => handleDataChange("header", updated)}
                  />
                )}
                {activeTab === "skills" && (
                  <EditSkills
                    data={data.skills}
                    onChange={(updated) => handleDataChange("skills", updated)}
                  />
                )}
                {activeTab === "education" && (
                  <EditEducation
                    data={data.education}
                    onChange={(updated) =>
                      handleDataChange("education", updated)
                    }
                  />
                )}
                {activeTab === "experience" && (
                  <EditExperience
                    data={data.experience}
                    onChange={(updated) =>
                      handleDataChange("experience", updated)
                    }
                  />
                )}
                {activeTab === "projects" && (
                  <EditProjects
                    data={data.projects}
                    onChange={(updated) =>
                      handleDataChange("projects", updated)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
