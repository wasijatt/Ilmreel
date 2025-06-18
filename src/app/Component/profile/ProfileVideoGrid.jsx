"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import ProfileTabsNav from "./ProfileTabsNav";
import ProfileVideoGrid from "./ProfileVideoGrid";
import ProfileEditForm from "./ProfileEditForm";
import VideoUpload from "./VideoUpload";

export default function ProfileTab() {
  const [activeTab, setActiveTab] = useState("videos");
  const [editing, setEditing] = useState(false);
  const profile = useSelector((state) => state.profile.data);

  if (!profile) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto w-full p-6 bg-black rounded-lg shadow-modal mt-8">
      <ProfileHeader onEdit={() => setEditing(true)} />
      <ProfileTabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        {activeTab === "videos" && <ProfileVideoGrid />}
        {activeTab === "favorites" && <div className="text-white">Favorites coming soon!</div>}
        {activeTab === "liked" && <div className="text-white">Liked videos coming soon!</div>}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-background-light p-8 rounded-lg w-full max-w-lg">
            <ProfileEditForm onClose={() => setEditing(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
