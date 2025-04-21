const activities = [
  {
    id: 1,
    type: "course",
    action: "created",
    title: "Advanced Physics",
    time: "2 hours ago",
    user: "Dr. Smith",
  },
  {
    id: 2,
    type: "user",
    action: "registered",
    title: "New student",
    time: "5 hours ago",
    user: "John Doe",
  },
  {
    id: 3,
    type: "assignment",
    action: "submitted",
    title: "Calculus Homework",
    time: "1 day ago",
    user: "Emma Johnson",
  },
  {
    id: 4,
    type: "payment",
    action: "completed",
    title: "Course fee",
    time: "2 days ago",
    user: "Robert Chen",
  },
];

const RecentActivities = () => {
  const getIcon = (type) => {
    switch (type) {
      case "course":
        return "📚";
      case "user":
        return "👤";
      case "assignment":
        return "📝";
      case "payment":
        return "💰";
      default:
        return "🔔";
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
        >
          <div className="text-xl mr-3 mt-1">{getIcon(activity.type)}</div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">
                {activity.user} {activity.action} {activity.title}
              </h3>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {activity.type === "course" &&
                "New course available for enrollment"}
              {activity.type === "user" && "New student registration completed"}
              {activity.type === "assignment" &&
                "Assignment submitted for grading"}
              {activity.type === "payment" && "Payment processed successfully"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivities;
