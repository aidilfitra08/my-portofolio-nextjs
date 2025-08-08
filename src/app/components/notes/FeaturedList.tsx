import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface FeatureItem {
  id: string;
  text: string;
}

interface FeatureListProps {
  features?: FeatureItem[];
  className?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    id: "1",
    text: "Problem-solving mindset",
  },
  {
    id: "2",
    text: "Effective communication",
  },
  {
    id: "3",
    text: "Collaborative teamwork",
  },
  {
    id: "4",
    text: "Continuous learning",
  },
  {
    id: "5",
    text: "Attention to detail",
  },
];

const FeatureList: React.FC<FeatureListProps> = ({
  features = defaultFeatures,
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-lg py-6 px-[2px] border border-orange-100 shadow-sm max-w-md ${className}`}
    >
      <div className="space-y-2 text-gray-800 text-xs">
        <h1 className="text-lg font-semibold pl-6">My soft skills</h1>
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-start space-x-3 border-b border-gray-300 px-6"
          >
            <div className="flex-shrink-0 mt-0.5 mr-2">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-green-500 w-4 h-4"
              />
            </div>
            <span className="text-gray-700 text-sm font-medium leading-relaxed">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute left-12 right-8 top-0 pt-1 opacity-30 h-full">
        {/* {Array.from({ length: 7 }).map((_, i) => ( */}
        <div
          // key={i}
          className="h-full border-l-2 border-red-500 "
        ></div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default FeatureList;
