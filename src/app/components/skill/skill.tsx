export default function Skill() {
  return (
    <div className="grid grid-cols-2 font-mono font-medium bg-neutral-800 text-white">
      <div className="col-span-1 grid grid-cols-3 text-center gap-3 p-16 max-md:px-10 items-start h-fit max-md:col-span-2 max-md:grid-cols-3 ">
        <p className="col-span-3 text-3xl font-bold text-start">Skills</p>
        <div className="col-span-3 flex gap-x-2 gap-y-2 align-middle max-md:w-[280px] flex-wrap">
          <p className=" bg-neutral-700 p-2 rounded-lg">Node.js</p>
          <p className=" bg-neutral-700 p-2 rounded-lg">React.js</p>
          <p className=" bg-neutral-700 p-2 rounded-lg">Golang</p>
          <p className=" bg-neutral-700 p-2 rounded-lg">MySQL</p>
          <p className=" bg-neutral-700 p-2 rounded-lg">MongoDB</p>
          <p className=" bg-neutral-700 p-2 rounded-lg">PostgreSQL</p>
          <p className=" bg-neutral-700 p-2 rounded-lg">Codeigniter</p>
          <p className=" bg-neutral-700 p-2 rounded-lg">Next.js</p>
        </div>
      </div>
      <div className="col-span-1 grid grid-cols-1 p-16 max-md:pt-0 space-y-3 max-md:col-span-2 max-md:px-10">
        <p className="col-span-1 text-3xl font-bold">Education</p>
        <div className="col-span-1 grid grid-cols-1 ">
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
      </div>
    </div>
  );
}
