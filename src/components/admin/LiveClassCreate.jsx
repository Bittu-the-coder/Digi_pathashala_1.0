import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import toast from "react-hot-toast";

const LiveClassCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    date: "",
    time: "",
    duration: "",
    meetingLink: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement live class creation logic
    toast.success("Live class scheduled successfully");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Schedule Live Class</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Add form fields */}
      </form>
    </div>
  );
};

export default LiveClassCreate;
