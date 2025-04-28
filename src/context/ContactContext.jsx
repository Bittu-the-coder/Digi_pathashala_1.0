import React, { createContext, useContext, useState } from "react";
import {
  submitContactForm,
  getContactSubmissions,
} from "../services/contactService";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export const ContactProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const { currentUser } = useAuth();

  // Send a contact form submission
  const sendContactForm = async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitContactForm(contactData);
      if (result.success) {
        toast.success(result.message || "Message sent successfully!");
        return { success: true, data: result.data };
      } else {
        setError(result.message);
        toast.error(result.message || "Failed to send message");
        return { success: false, message: result.message };
      }
    } catch (err) {
      const errorMsg =
        err.message || "An error occurred while sending your message";
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Get all contact form submissions (admin only)
  const fetchSubmissions = async () => {
    if (!currentUser || !["admin"].includes(currentUser.role)) {
      return { success: false, message: "Unauthorized" };
    }

    setLoading(true);
    setError(null);
    try {
      const result = await getContactSubmissions();
      if (result.success) {
        setSubmissions(result.data);
        return { success: true, data: result.data };
      } else {
        setError(result.message);
        toast.error(result.message || "Failed to fetch submissions");
        return { success: false, message: result.message };
      }
    } catch (err) {
      const errorMsg =
        err.message || "An error occurred while fetching submissions";
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    submissions,
    sendContactForm,
    fetchSubmissions,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
