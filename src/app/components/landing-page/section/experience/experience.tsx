import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Experience() {
  return (
    <section className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-normal mb-4 ">
          <span className="text-yellow-700 dark:text-yellow-400">
            Experience
          </span>
        </h2>

        <div className="bg-neutral-700 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-normal text-blue-400">
              Back End Developer Intern
            </h3>
            <span className="text-gray-400" style={{ fontSize: "12px" }}>
              Feb 2022 - July 2022
            </span>
          </div>

          <div className="flex items-center mb-3">
            <FontAwesomeIcon icon={faBuilding} className="pr-3" />
            <span className="text-green-300" style={{ fontSize: "13px" }}>
              Vocasia - Indonesia
            </span>
          </div>

          <ul
            className="space-y-1 text-gray-300"
            style={{ fontSize: "12px", lineHeight: "1.4" }}
          >
            <li className="flex items-start">
              <span className="text-pink-400 mr-2" style={{ fontSize: "10px" }}>
                •
              </span>
              <span>
                Developed and integrated new 15 APIs for Vocasia's website and
                mobile applications using CodeIgniter 4 and MySQL
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2" style={{ fontSize: "10px" }}>
                •
              </span>
              <span>
                Resolved frontend API fetching issues for both React.js (web)
                and Flutter (mobile) applications
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2" style={{ fontSize: "10px" }}>
                •
              </span>
              <span>
                Debugged and fixed existing APIs, ensuring seamless
                functionality across platforms
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-400 mr-2" style={{ fontSize: "10px" }}>
                •
              </span>
              <span>
                Collaborated with the frontend team to ensure smooth integration
                between backend and frontend systems
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
