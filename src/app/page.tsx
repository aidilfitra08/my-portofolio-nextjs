import AboutMe from "./components/aboutme/aboutme";
import Skill from "./components/skill/skill";
import Projects from "./components/projects/projects";
import Work from "./components/work/work";

export default function Home() {
  return (
    <div>
      <AboutMe />
      <Skill />
      <Work />
      <Projects />
    </div>
  );
}
