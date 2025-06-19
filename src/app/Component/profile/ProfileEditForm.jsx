import React, { useState, useRef } from "react";
import AvatarInput from "@/app/Component/ui/AvatarInput";
/**
 * Form for editing/creating the user's profile.
 * Includes avatar, bio, and birthday.
 */
export default function ProfileEditForm() {
  const [form, setForm] = useState({
    full_name: "",
    bio: "",
    birthday: "",
    avatar_url: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatar_url: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save profile to backend, including avatar upload logic
    alert("Profile saved! (Integrate backend logic)");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Avatar Edit Section */}
      <div className="flex flex-col items-center mb-4">
        <div
          className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-600 cursor-pointer group"
          onClick={handleAvatarClick}
        >
          <AvatarInput
        value={form.avatar_url}
        onChange={(file) => setForm({ ...form, avatar_url: file })}
        size={96}
      />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-xs font-semibold">Change</span>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="Full Name"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
      />
      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-none"
        rows={3}
      />
      <input
        name="birthday"
        value={form.birthday}
        onChange={handleChange}
        placeholder="Birthday"
        type="date"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
      />
      <button
        type="submit"
        className="bg-primary-600 text-white rounded-lg py-2 font-semibold hover:bg-primary-700 transition"
      >
        Save Profile
      </button>
    </form>
  );
}
