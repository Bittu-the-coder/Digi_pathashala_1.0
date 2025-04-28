import React, { createContext, useContext, useState } from "react";

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teachers] = useState([
    // Move the teachers array from Teachers.jsx to here
    // ...existing teachers data...
  ]);

  const getTeacherById = (id) => {
    return teachers.find((teacher) => teacher.id === parseInt(id));
  };

  return (
    <TeacherContext.Provider value={{ teachers, getTeacherById }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeachers = () => useContext(TeacherContext);
