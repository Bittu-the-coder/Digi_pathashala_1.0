import React, { useState, useEffect } from "react";
import { useClass } from "../../context/ClassContext";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import classService from "../../services/classService";

const LiveClassEdit = () => {
  const { updateLiveClass } = useClass();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formClass, setFormClass] = useState({
    title: "",
    course: "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    meetingLink: "",
    instructor: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveClass = async () => {
      try {
        const liveClass = await classService.getLiveClassById(id);
        const date = new Date(liveClass.date);
        setFormClass({
          title: liveClass.title,
          course: liveClass.course,
          subject: liveClass.subject,
          date: date.toISOString().split("T")[0],
          time: date.toTimeString().slice(0, 5),
          duration: liveClass.duration,
          meetingLink: liveClass.meetingLink,
          instructor: liveClass.instructor,
        });
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching live class");
        setLoading(false);
      }
    };
    fetchLiveClass();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateLiveClass(id, formClass);
      if (result.success) {
        toast.success("Live class updated successfully!");
        navigate("/admin/live-classes");
      } else {
        toast.error(result.error || "Failed to update live class");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Edit Live Class</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Class Title
              </label>
              <input
                type="text"
                name="title"
                value={formClass.title}
                onChange={(e) =>
                  setFormClass({ ...formClass, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Course
              </label>
              <select
                name="course"
                value={formClass.course}
                onChange={(e) =>
                  setFormClass({ ...formClass, course: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="">Select a course</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formClass.subject}
                onChange={(e) =>
                  setFormClass({ ...formClass, subject: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formClass.date}
                onChange={(e) =>
                  setFormClass({ ...formClass, date: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formClass.time}
                onChange={(e) =>
                  setFormClass({ ...formClass, time: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (in minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formClass.duration}
                onChange={(e) =>
                  setFormClass({ ...formClass, duration: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meeting Link
              </label>
              <input
                type="url"
                name="meetingLink"
                value={formClass.meetingLink}
                onChange={(e) =>
                  setFormClass({ ...formClass, meetingLink: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructor
              </label>
              <input
                type="text"
                name="instructor"
                value={formClass.instructor}
                onChange={(e) =>
                  setFormClass({ ...formClass, instructor: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate("/admin/live-classes")}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Live Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveClassEdit;
