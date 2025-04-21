const classes = [
  {
    id: 1,
    course: "Advanced Mathematics",
    topic: "Differential Equations",
    time: "Today, 2:00 PM",
    instructor: "Dr. Smith",
  },
  {
    id: 2,
    course: "Physics Fundamentals",
    topic: "Quantum Mechanics",
    time: "Tomorrow, 10:00 AM",
    instructor: "Prof. Johnson",
  },
  {
    id: 3,
    course: "Computer Science",
    topic: "Data Structures",
    time: "Wed, 1:00 PM",
    instructor: "Dr. Lee",
  },
];

const UpcomingClasses = () => {
  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          className="p-3 bg-blue-50 rounded-lg border border-blue-100"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800">{classItem.course}</h3>
              <p className="text-sm text-gray-600">{classItem.topic}</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {classItem.time}
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-gray-500">
              Instructor: {classItem.instructor}
            </span>
            <button className="ml-auto text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
              Join
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingClasses;
