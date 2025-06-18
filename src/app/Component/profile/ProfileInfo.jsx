import React from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Displays the user's profile information.
 */
export default function ProfileInfo() {
  const { user } = useAuth();

  if (!user) return <div className="text-center text-error">Not logged in</div>;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mb-2">
        {/* If you have a user avatar, use <img src={user.avatar_url} ... /> */}
        <span className="text-3xl text-primary-600">{user.email[0].toUpperCase()}</span>
      </div>
      <div className="text-xl font-semibold text-text-dark">{user.email}</div>
      {/* Add more user info here if available */}
    </div>
  );
}
