import React from "react";

const StatsCard = ({ title, value, icon, bgColor, textColor, bgImage }) => {
  return (
    <div
      className={`${bgColor} ${textColor} rounded-lg p-6 relative overflow-hidden transform transition-transform hover:scale-105`}
      style={{
        backgroundImage: bgImage
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bgImage}')`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <div className="rounded-full bg-white/20 p-2">{icon}</div>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
