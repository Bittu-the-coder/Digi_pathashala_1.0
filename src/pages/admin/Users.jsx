import React, { useState } from "react";
import UserTable from "../../components/admin/UserTable";
import Button from "../../components/common/Button";
import { PlusIcon, SearchIcon } from "../../components/icons/Icons";
import { COURSE_CATEGORIES, USER_ROLES } from "../../utils/constants";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Sample user data for demonstration
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "student",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "student",
      status: "active",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      role: "teacher",
      status: "active",
    },
    {
      id: "4",
      name: "Mary Williams",
      email: "mary.w@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.b@example.com",
      role: "student",
      status: "inactive",
    },
  ];

  // Filter users based on search term and selected role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "" || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600"
            icon={<PlusIcon />}
          >
            Add New User
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value={USER_ROLES.ADMIN}>Admin</option>
                <option value={USER_ROLES.TEACHER}>Teacher</option>
                <option value={USER_ROLES.STUDENT}>Student</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <UserTable users={filteredUsers} />
        </div>
      </main>
    </div>
  );
};

export default Users;
