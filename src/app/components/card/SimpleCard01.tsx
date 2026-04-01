import Image from "next/image";

interface SimpleCard01Props {
  imageSrc?: string;
  leftTopTitle?: string;
  rightTopTitle?: string;
  leftBottomTitle?: string;
  rightBottomTitle?: string;
  title?: string;
  description?: string;
  tags?: string[];
  links?: { label: string; url: string }[];
  bgColor?: string;
}

export default function SimpleCard01({
  imageSrc,
  leftTopTitle,
  rightTopTitle,
  leftBottomTitle,
  rightBottomTitle,
  title,
  description,
  tags,
  links,
  bgColor,
}: SimpleCard01Props) {
  return (
    <div className={bgColor || "bg-white"}>
      <div id="image" className="relative p-4">
        <Image
          src={imageSrc || "/dummy.jpg"}
          alt="Simple Card 01"
          width={400}
          height={300}
          className="w-full h-auto object-cover"
        />
        <p
          id="left-top-title"
          className={`absolute top-0 left-0 m-4 p-2 uppercase font-bold ${bgColor}`}
          hidden={!leftTopTitle}
        >
          {leftTopTitle}
        </p>
        <p
          id="right-top-title"
          className={`absolute top-0 right-0 m-4 p-2 uppercase font-bold ${bgColor}`}
          hidden={!rightTopTitle}
        >
          {rightTopTitle}
        </p>
        <p
          id="left-bottom-title"
          className={`absolute bottom-0 left-0 m-4 p-2 uppercase font-bold ${bgColor}`}
          hidden={!leftBottomTitle}
        >
          {leftBottomTitle}
        </p>
        <p
          id="right-bottom-title"
          className={`absolute bottom-0 right-0 m-4 p-2 uppercase font-bold ${bgColor}`}
          hidden={!rightBottomTitle}
        >
          {rightBottomTitle}
        </p>
      </div>
      <div id="title" className="p-4" hidden={!title}>
        {title && <h3 className="text-xl font-bold">{title}</h3>}
      </div>
      <div id="description" className="p-4" hidden={!description}>
        {description && <p className="text-justify">{description}</p>}
      </div>
      <div id="tags" className="p-4" hidden={!tags || tags.length === 0}>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div id="links" className="p-4" hidden={!links || links.length === 0}>
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
