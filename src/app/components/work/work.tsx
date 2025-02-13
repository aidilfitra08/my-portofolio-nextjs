import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { dataExperience } from "../data/dataexperience";

export default function Work() {
  return (
    <div className="grid grid-cols-1 font-mono p-16 space-y-6 max-md:px-10">
      <p className="text-3xl col-span-1 font-extrabold">Experience</p>
      {dataExperience.map((pengalaman) => (
        <div key={pengalaman.id} className="col-span-1 grid grid-cols-4">
          <div className="col-span-1 max-md:col-span-4">
            <p className="text-md">{pengalaman.period}</p>
          </div>
          <div className="col-span-3 max-md:col-span-4">
            <p className="text-xl font-bold">{pengalaman.position}</p>
            <p className="text-base font-semibold">{pengalaman.perusahaan}</p>
            <p className="text-sm">{pengalaman.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
