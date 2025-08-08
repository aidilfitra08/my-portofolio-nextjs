import Link from "next/link";
import Notes from "../components/notes/notes";

const playgroundLinks = [
  { name: "Clock Playground", url: "/playground/clock", icon: "🕒" },
  { name: "Favicon Test", url: "/playground/favicon-test", icon: "🖼️" },
  { name: "IP Checker", url: "/playground/ip-checker", icon: "🌐" },
  { name: "Trial Input Box", url: "/playground/trial-input-box", icon: "🔲" },
  { name: "VSCode Clone", url: "/playground/vscode-clone", icon: "💻" },
  { name: "Simple Ai Agent", url: "/playground/simple-ai-agent", icon: "🤖" },
];

export default function PlaygroundIndex() {
  return (
    <main className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Playground Index</h1>
      <ul className="space-y-4">
        {playgroundLinks.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              prefetch={true}
              className="block px-4 py-3 rounded bg-blue-100 dark:bg-neutral-500 text-blue-800 dark:text-neutral-200 font-semibold shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {link.icon} {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Notes />
    </main>
  );
}
