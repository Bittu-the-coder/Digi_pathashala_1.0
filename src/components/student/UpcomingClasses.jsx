const classes = [
  {
    id: 1,
    course: "Advanced Mathematics",
    topic: "Integration Techniques",
    time: "Today, 3:00 PM",
    duration: "1 hour",
  },
  {
    id: 2,
    course: "Physics Fundamentals",
    topic: "Thermodynamics",
    time: "Tomorrow, 11:00 AM",
    duration: "1.5 hours",
  },
];

const UpcomingClasses = () => {
  return (
    <div className="space-y-3">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          className="p-3 bg-indigo-50 rounded-lg border border-indigo-100"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {classItem.course}
              </h3>
              <p className="text-xs text-gray-600">{classItem.topic}</p>
            </div>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
              {classItem.time}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">{classItem.duration}</span>
            <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
              Join Class
            </button>
          </div>
        </div>
      ))}
      <div className="text-center">
        <button className="text-xs text-indigo-600 hover:text-indigo-800">
          View all upcoming classes
        </button>
      </div>
    </div>
  );
};

export default UpcomingClasses;
