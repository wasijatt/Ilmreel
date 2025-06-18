"use client"
import dynamic from "next/dynamic"      
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import ProfileTab from "./Component/profile/ProfileTab"
import { fetchProfile } from "@/store/slices/profileSlice"
import { useAuth } from "@/hooks/useAuth"

const MainSidebar = dynamic(() => import("./Component/MainSidebar"), {
  ssr: true
})

/**
 * Main page layout.
 * Renders the sidebar and the main content area.
 * Shows ProfileTab when the Profile tab is active.
 * Fetches profile data globally for best performance.
 */
export default function Page() {
  const activeTab = useSelector((state) => state.sidebar.activeItem)
  const { user } = useAuth()
  const dispatch = useDispatch()

  // Fetch profile data globally when user logs in
  useEffect(() => {
    if (user) {
      dispatch(fetchProfile(user.id))
    }
  }, [user, dispatch])

  return (
    <div className="flex min-h-screen bg-background-light">
      <MainSidebar />
      <main className="flex-1 p-4">
        {activeTab === "Profile" && <ProfileTab />}
        {/* Add more tab/page renders here as your app grows */}
      </main>
    </div>
  )
}