import React from "react";
import { X } from "lucide-react";
import ProfileEditForm from "@/app/Component/profile/ProfileEditForm";

export default function ProfileEditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-600 hover:text-primary-700 transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <ProfileEditForm />
      </div>
    </div>
  );
}