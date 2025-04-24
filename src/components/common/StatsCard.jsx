import React from "react";

const StatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center">
        <div
          className={`flex-shrink-0 ${bgColor} bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3`}
        >
          <span className="text-lg text-white">{icon}</span>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
