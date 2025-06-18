import React, { useState } from "react";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save profile to backend
    alert("Profile saved! (Integrate backend logic)");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        placeholder="Full Name"
        className="input"
      />
      <input
        name="bio"
        value={form.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="input"
      />
      <input
        name="birthday"
        value={form.birthday}
        onChange={handleChange}
        placeholder="Birthday"
        type="date"
        className="input"
      />
      {/* Avatar upload can be added here */}
      <button type="submit" className="btn-primary">
        Save Profile
      </button>
    </form>
  );
}
