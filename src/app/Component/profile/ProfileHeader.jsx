// import React from "react";
// import { useSelector } from "react-redux";
// import { Cog, UserPlus } from "lucide-react";

// export default function ProfileHeader({ onEdit }) {
//   const profile = useSelector((state) => state.profile.data);

//   if (!profile) return null;

//   return (
//     <div className="flex flex-col md:flex-row items-center md:items-end gap-6 pb-6 border-b border-secondary-200">
//       {/* Avatar */}
//       <div className="relative">
//         <img
//           src={profile.avatar_url || "/default-avatar.png"}
//           alt="Avatar"
//           className="w-32 h-32 rounded-full object-cover border-4 border-primary-600 bg-background-light"
//         />
//         {/* Optionally, add an online indicator or edit icon here */}
//       </div>
//       {/* Info */}
//       <div className="flex-1 flex flex-col gap-2">
//         <div className="flex items-center gap-4">
//           <span className="text-2xl font-bold text-white">{profile.username}</span>
//           <button
//             onClick={onEdit}
//             className="bg-primary-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-primary-700 transition"
//           >
//             Edit profile
//           </button>
//           <button className="bg-secondary-800 text-white p-2 rounded-full hover:bg-secondary-700 transition">
//             <Cog size={20} />
//           </button>
//         </div>
//         <span className="text-lg text-secondary-200">{profile.display_name}</span>
//         <ProfileStats profile={profile} />
//         <div className="text-secondary-200">{profile.bio || "No bio yet."}</div>
//       </div>
//     </div>
//   );
// }

// // ProfileStats can be a separate component for followers, following, likes
// function ProfileStats({ profile }) {
//   return (
//     <div className="flex gap-6 mt-2">
//       <span>
//         <b>{profile.following || 0}</b> Following
//       </span>
//       <span>
//         <b>{profile.followers || 0}</b> Followers
//       </span>
//       <span>
//         <b>{profile.likes || 0}</b> Likes
//       </span>
//     </div>
//   );
// }













import React from "react";
import { useSelector } from "react-redux";
import { Cog, UserPlus } from "lucide-react";

export default function ProfileHeader({ onEdit }) {
  const profile = useSelector((state) => state.profile.data);

  if (!profile) return null;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 pb-6 border-b border-secondary-200">
      {/* Avatar */}
      <div className="relative">
        <img
          src={profile.avatar_url || "/default-avatar.png"}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary-600 bg-background-light"
        />
        {/* Optionally, add an online indicator or edit icon here */}
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-white">{profile.username}</span>
          <button
            onClick={onEdit}
            className="bg-primary-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-primary-700 transition"
          >
            Edit profile
          </button>
          <button className="bg-secondary-800 text-white p-2 rounded-full hover:bg-secondary-700 transition">
            <Cog size={20} />
          </button>
        </div>
        <span className="text-lg text-secondary-200">{profile.display_name}</span>
        <ProfileStats profile={profile} />
        <div className="text-secondary-200">{profile.bio || "No bio yet."}</div>
      </div>
    </div>
  );
}

// ProfileStats can be a separate component for followers, following, likes
function ProfileStats({ profile }) {
  return (
    <div className="flex gap-6 mt-2">
      <span>
        <b>{profile.following || 0}</b> Following
      </span>
      <span>
        <b>{profile.followers || 0}</b> Followers
      </span>
      <span>
        <b>{profile.likes || 0}</b> Likes
      </span>
    </div>
  );
}

