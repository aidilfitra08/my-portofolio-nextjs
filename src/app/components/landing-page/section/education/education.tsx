import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Education() {
  return (
    <section className="py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-normal mb-4">
          <span className="text-purple-700 dark:text-purple-400">
            Education
          </span>
        </h2>

        <div className="text-lg bg-neutral-700 rounded-lg p-4 border border-gray-700">
          <h3 className=" font-normal text-blue-400 mb-1">
            Padjadjaran University - Indonesia
          </h3>
          <p className="text-green-300 mb-1" style={{ fontSize: "13px" }}>
            Bachelor of Computer Science, 3.60/4.00
          </p>
          <div
            className="flex items-center text-gray-400"
            style={{ fontSize: "12px" }}
          >
            <FontAwesomeIcon icon={faCalendarDays} className="pr-3" />
            <span>August 2019 - August 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
