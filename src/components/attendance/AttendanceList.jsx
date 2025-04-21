import AttendanceItem from "./AttendanceItem";

const AttendanceList = ({ attendances }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      <div className="space-y-4">
        {attendances.map((attendance) => (
          <AttendanceItem key={attendance.id} attendance={attendance} />
        ))}
      </div>
    </div>
  );
};

export default AttendanceList;
