"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/app/auth/AuthModal";
import ProfileTabsNav from "./ProfileTabsNav";
import ProfileInfo from "./ProfileInfo";
import ProfileEditModal from "@/app/Component/modals/ProfileEditModal";
import VideoUpload from "./VideoUpload";
import { Heart, Video ,BookHeart ,  Settings, Share } from "lucide-react";
import AvatarInput from "@/app/Component/ui/AvatarInput";

/**
 * Main Profile Tab component.
 * Handles authentication, tab navigation, and renders the correct profile section.
 */
const ProfileTab = () => {
  // Tabs: 'videos', 'favorites', 'liked'
  const [activeTab, setActiveTab] = useState("videos");
  const [sortBy, setSortBy] = useState("latest");
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!user);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Mock user data - replace with real user data
  const userData = {
    username: user?.username || "muhammad.wasim508",
    displayName: user?.displayName || "Muhammad Wasim",
    avatar: user?.avatar || "",
    following: user?.following || 0,
    followers: user?.followers || 2,
    likes: user?.likes || 0,
    bio: user?.bio || "No bio yet.",
    hasVideos: false // This would come from your data
  };

  // Avatar state, initialized from userData.avatar or default
  const [avatar, setAvatar] = useState(userData.avatar || "/default-avatar.png");

  // Update avatar state if user changes (e.g., after login or profile update)
  useEffect(() => {
    setAvatar(userData.avatar || "/default-avatar.png");
  }, [userData.avatar]);

  const tabs = [
    { id: "videos", label: "Videos", icon: <Video/> },
    { id: "favorites", label: "Favorites", icon: <BookHeart /> },
    { id: "liked", label: "Liked", icon: <Heart/> }
  ];

  const sortOptions = [
    { id: "latest", label: "Latest" },
    { id: "popular", label: "Popular" },
    { id: "oldest", label: "Oldest" }
  ];

  // If not signed in, show the AuthModal
  if (!user) {
    return (
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    );
  }

  // If showing edit profile
  if (showEditProfile) {
    return (
      <div className="min-h-screen ">
        <div className="max-w-2xl mx-auto">
          <ProfileEditModal isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#212121] ">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="px-4 py-6 md:px-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-600 overflow-hidden flex-shrink-0">
                <AvatarInput
                  value={avatar}
                  onChange={setAvatar}
                  size={128}
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {/* Username and Actions */}
              <div className="flex flex-col   gap-4 mb-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">
                    {userData.username}
                  </h1>
                  <h2 className="text-lg  mt-1">
                    {userData.displayName}
                  </h2>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-center md:justify-start gap-3">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700  font-semibold rounded-md transition-colors"
                  >
                    Edit profile
                  </button>
                  <button className="p-2 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="p-2 rotate-90 hover:bg-gray-800 hover:text-white rounded-md transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-6 mb-4">
                <div className="text-center md:text-left">
                  <span className="text-lg font-bold">{userData.following}</span>
                  <span className=" ml-1">Following</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-lg font-bold">{userData.followers}</span>
                  <span className=" ml-1">Followers</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="text-lg font-bold">{userData.likes}</span>
                  <span className=" ml-1">Likes</span>
                </div>
              </div>

              {/* Bio */}
              <p className=" text-sm md:text-base">
                {userData.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-800">
          <div className="flex justify-between items-center px-4 md:px-6">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-primary-600"
                      : "text-primary-700 "
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 " />
                  )}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex bg-gray-800 rounded-lg overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    sortBy === option.id
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-4 py-8 md:px-6">
          {activeTab === "videos" && !userData.hasVideos && (
            <div className="text-center py-16">
             
                <VideoUpload/>
              
            </div>
          )}

          {activeTab === "videos" && userData.hasVideos && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
           <Profile/>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔖</span>
              </div>
              <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
              <p className="text-gray-400">Videos you favorite will appear here</p>
            </div>
          )}

          {activeTab === "liked" && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <Heart className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">No liked videos yet</h3>
              <p className="text-gray-400">Videos you like will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;