import AboutMe from "./components/aboutme/aboutme";
import Skill from "./components/skill/skill";
import Projects from "./components/projects/projects";

export default function Home() {
  return (
    <div>
      <AboutMe />
      <Skill />
      <Projects />
    </div>
  );
}
