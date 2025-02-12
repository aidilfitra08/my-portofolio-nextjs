export default function Skill() {
  return (
    <div className="grid grid-cols-2 font-mono font-medium bg-neutral-800 text-white">
      <div className="col-span-1 grid grid-cols-5 text-center gap-3 p-16 items-start h-fit">
        <p className="col-span-5 text-3xl">Skills</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">Node.js</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">React.js</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">Golang</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">MySQL</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">MongoDB</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">PostgreSQL</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">Codeigniter</p>
        <p className=" bg-neutral-700 p-2 rounded-lg">Next.js</p>
      </div>
      <div className="col-span-1 grid grid-cols-1 p-16 space-y-3">
        <p className="col-span-1 text-3xl">Education & Work Experience</p>
        <div className="col-span-1 grid grid-cols-1 ">
          <p className="col-span-1 text-xl">Education</p>
          <ul className="list-disc ml-5">
            <li>
              <p>
                Padjadjaran University - <span>Indonesia</span>
              </p>
              <p>
                Bachelor of Computer Science, <span>3.60/4.00</span>
              </p>
              <p>August 2019 - August 2024</p>
            </li>
          </ul>
        </div>
        <div className="col-span-1 grid grid-cols-1 mt-4">
          <p className="col-span-1 text-xl">Work Experience</p>
          <ul className="list-disc ml-5">
            <li>
              <p>
                Vocasia - <span>Indonesia</span>
              </p>
              <p>Back End Developer Intern</p>
              <p>February 2022 - July 2022</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
