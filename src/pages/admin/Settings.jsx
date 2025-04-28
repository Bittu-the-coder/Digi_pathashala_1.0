import React, { useState } from "react";
import { Save, Bell, Lock, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const { currentUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {/* Profile Settings */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Profile Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={currentUser.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={currentUser.email}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications about student activities
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`${
                    notifications ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                >
                  <span
                    className={`${
                      notifications ? "translate-x-5" : "translate-x-0"
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    Email Updates
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive email updates about your courses
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  className={`${
                    emailUpdates ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                >
                  <span
                    className={`${
                      emailUpdates ? "translate-x-5" : "translate-x-0"
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Lock className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Security</h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Change Password
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
