const LiveClassCard = ({ classItem }) => {
  const isUpcoming = true; // You would determine this based on the current time

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800">{classItem.title}</h2>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {isUpcoming ? "Upcoming" : "Completed"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Instructor: {classItem.instructor}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {classItem.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {classItem.participants} participants
          </div>
        </div>

        {isUpcoming ? (
          <a
            href={classItem.meetingLink}
            className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Class
          </a>
        ) : (
          <button className="w-full bg-gray-200 text-gray-700 text-center font-medium py-2 px-4 rounded-lg cursor-not-allowed">
            Class Ended
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveClassCard;
