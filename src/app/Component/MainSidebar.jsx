"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Home, 
  Compass, 
  Users, 
  Upload, 
  User, 
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';
import SidebarItem from './ui/SidebarItem';
import MobileNav from './ui/MobileNav';
import AuthModal from '../auth/AuthModal';
import { toggleSidebar, setActiveItem, setMobile } from '@/store/slices/sidebarSlice';
import { useAuth } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';

const MainSidebar = () => {
  const dispatch = useDispatch();
  const { isOpen, activeItem, isMobile } = useSelector((state) => state.sidebar);
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setMobile(window.innerWidth < 768));
      if (window.innerWidth < 768) {
        dispatch(toggleSidebar(false));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(-100%)';
      sidebarRef.current.style.opacity = isOpen ? '1' : '0';
    }
  }, [isOpen]);

  const sidebarItems = [
    { icon: Home, label: "For You" },
    { icon: Compass, label: "Explore" },
    { icon: Users, label: "Following" },
    { icon: Upload, label: "Upload" },
    { icon: User, label: "Profile" },
  ];

  return (
    <>
      <Toaster position="top-center" />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="fixed top-4 left-4 z-sidebar p-2 rounded-button bg-primary-600 text-primary-600 md:hidden
          transition-all duration-button ease-button hover:bg-primary-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-background-light border-r border-secondary-200 p-4 flex flex-col
          transition-all duration-sidebar ease-sidebar z-sidebar shadow-sidebar justify-center items-center
          ${isMobile ? 'w-sidebar' : 'w-sidebar'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        <Image src="/IlmReel Logo.jpg" alt="logo" width={200} height={200}  className='bg-transparent  rounded-3xl w-24 h-24' />

        <div className="space-y-2 w-full mb-8">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeItem === item.label}
              onClick={() => {
                dispatch(setActiveItem(item.label));
                if (isMobile) dispatch(toggleSidebar());
              }}
            />
          ))}
        </div>

        {user ? (
          <button
            onClick={signOut}
            className="w-full py-3 bg-error text-white rounded-button font-medium mb-8
              transition-all duration-button ease-button hover:bg-error/90"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-3 bg-primary-600 text-white rounded-button font-medium mb-8
              transition-all duration-button ease-button hover:bg-primary-700"
          >
            Log in
          </button>
        )}

        <div className="mt-auto">
          <div className="text-xs text-text-light space-y-1">
            <p>Company</p>
            <p>Program</p>
            <p>Terms & Policies</p>
            <p className="mt-4">© 2025 TikTok</p>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        activeItem={activeItem}
        onItemClick={(item) => dispatch(setActiveItem(item))}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default MainSidebar; 