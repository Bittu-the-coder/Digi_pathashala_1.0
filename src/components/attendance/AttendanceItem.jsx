const AttendanceItem = ({ attendance }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{attendance.courseName}</h3>
          <p className="text-sm text-gray-500">{attendance.date}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            attendance.present
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {attendance.present ? "Present" : "Absent"}
        </span>
      </div>
    </div>
  );
};

export default AttendanceItem;
