"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/app/auth/AuthModal";
import ProfileTabsNav from "./ProfileTabsNav";
import ProfileInfo from "./ProfileInfo";
import ProfileEditForm from "./ProfileEditForm";
import VideoUpload from "./VideoUpload";

/**
 * Main Profile Tab component.
 * Handles authentication, tab navigation, and renders the correct profile section.
 */
const ProfileTab = () => {
  // Tabs: 'info', 'edit', 'upload'
  const [activeTab, setActiveTab] = useState("info");
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!user);

  // If not signed in, show the AuthModal
  if (!user) {
    return (
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    );
  }

  // If signed in, show the profile tabs
  return (
    <div className="max-w-2xl mx-auto w-full p-6 bg-background-light rounded-lg shadow-modal mt-8">
      <ProfileTabsNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        {activeTab === "info" && <ProfileInfo />}
        {activeTab === "edit" && <ProfileEditForm />}
        {activeTab === "upload" && <VideoUpload />}
      </div>
    </div>
  );
};

export default ProfileTab;
